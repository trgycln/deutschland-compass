#!/usr/bin/env python3
"""
Deutschlandcompass — Gurbet Kalemleri Telegram Senkronizasyon Motoru

ANONIMLESTIRME POLITIKASI (.agents/rules/veri-gizliligi-ve-anonimlik.md):
- Hicbir gercek isim / soyisim veritabanina yazilmaz.
- Yazar adi yalnizca bas harfler (initials) veya 'Anonim Kalem' olabilir.
- Metin icerigindeki telefon, e-posta, @kullanici, IBAN, TC kimlik anonimlestirilir.
- Link paylasimi ALINMAMAKTADIR (tamamen devre disi).
"""

import os
import sys
import re
import json
import asyncio
from datetime import datetime, timedelta
from pathlib import Path

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from dotenv import load_dotenv
from telethon import TelegramClient
from supabase import create_client, Client

try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

ROOT_DIR  = Path(__file__).resolve().parent.parent
env_path  = ROOT_DIR / '.env.local'
load_dotenv(dotenv_path=env_path)

API_ID        = os.getenv('TELEGRAM_API_ID',  '24803923')
API_HASH      = os.getenv('TELEGRAM_API_HASH', '2ff1b47427181c0022d48074d0d0eb3f')
SUPABASE_URL  = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY  = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
GEMINI_KEY    = os.getenv('GEMINI_API_KEY')

SESSION_FILE  = Path(__file__).resolve().parent / 'telegram_session'
STATE_FILE    = Path(__file__).resolve().parent / 'sync_state.json'

LITERARY_CHANNEL_ID    = -1001670380624
LITERARY_CHANNEL_TITLE = "KENDI YAZDIGINIZ YAZILAR SIIRLER"
STATE_KEY              = "kendi-yazdiginiz-yazilar"
MESSAGE_MERGE_WINDOW_MINUTES = 10

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_state(state):
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, ensure_ascii=False, indent=2)

# ─── Anonimlesme Fonksiyonlari (.agents/rules/veri-gizliligi-ve-anonimlik.md) ───

def anonymize_author(sender) -> str:
    """
    Telegram sender nesnesinden YALNIZCA bas harfler (initials) uretir.
    Tam isim / soyisim asla doğrudan kullanilmaz (proje politikasi geregi).
    """
    if sender is None:
        return "Anonim Kalem"
    first = (getattr(sender, 'first_name', '') or '').strip()
    last  = (getattr(sender, 'last_name',  '') or '').strip()
    initials = ""
    if first:
        initials += first[0].upper() + "."
    if last:
        initials += last[0].upper() + "."
    return initials if initials else "Anonim Kalem"


def anonymize_text(text: str) -> str:
    """
    Metin icindeki tum kisisel verileri anonimlestirir.
    Kural: telefon, e-posta, @kullanici, IBAN, TC kimlik, URL icindeki @ler.
    """
    if not text:
        return ""
    # Telefon numaralari
    text = re.sub(r'(\+?\d{1,3}[\-.\s]?)?\(?\d{3}\)?[\-.\s]?\d{3}[\-.\s]?\d{4}', '[Telefon]', text)
    # E-posta
    text = re.sub(r'[\w.\-]+@[\w.\-]+\.\w+', '[E-posta]', text)
    # Telegram kullanici adlari
    text = re.sub(r'@\w+', '[Kullanici]', text)
    # IBAN
    text = re.sub(r'\b[A-Z]{2}\d{2}[\s]?(\d{4}[\s]?){4,7}\b', '[Hesap No]', text)
    # TC Kimlik (11 hane rakam)
    text = re.sub(r'\b\d{11}\b', '[Kimlik No]', text)
    return text.strip()

# URL_RE: yalnizca metin icindeki linkleri tespit edip metinden cikarmak icin
URL_RE = re.compile(r'https?://\S+')

async def analyze_literary_content(text, author):
    if not GEMINI_KEY or not HAS_GEMINI:
        first_line = text.splitlines()[0][:80].strip()
        return {"title": first_line or "Isimsiz Eser", "type": "duz_yazi", "tags": ["gurbet"], "is_duplicate_hint": False}

    genai.configure(api_key=GEMINI_KEY)
    model = genai.GenerativeModel("models/gemini-2.0-flash")
    prompt = f"""Sen Gurbet Kalemleri edebiyat antolojisi icin icerik editorusun.
Asagidaki metni analiz et ve SADECE gecerli bir JSON objesi dondur.
YAZAR: {author}
METIN:
{text[:2000]}

JSON formati (aciklama YAZMA, sadece JSON):
{{"title": "Eserin basligi (maks 60 karakter)", "type": "siir | duz_yazi | deneme | hikaye | makale", "tags": ["gurbet", "ozlem"], "is_duplicate_hint": false}}

Kurallar:
- type: siir formati (kisa satirlar, uyak) -> "siir"; uzun paragraflar -> "duz_yazi"
- tags: lowercase ASCII, 2-6 adet: gurbet, ozlem, hasret, umut, yalnizlik, sevda, vatan, anne, ayrilik, dostluk, aile, veda, aci, iyilesme, dua, sehir, cocukluk, gece, sabah, yol, ask, hatira
- is_duplicate_hint: true eger metin edebiyat degil (selamlama, duyuru vb)
"""
    for attempt in range(3):
        try:
            response = model.generate_content(prompt)
            raw = response.text.strip()
            if raw.startswith("```"):
                raw = re.sub(r'^```\w*\n?', '', raw)
                raw = re.sub(r'\n?```$', '', raw)
            return json.loads(raw)
        except Exception as e:
            if "429" in str(e):
                await asyncio.sleep(20 * (attempt + 1))
            else:
                break
    first_line = text.splitlines()[0][:80].strip()
    return {"title": first_line or "Isimsiz Eser", "type": "duz_yazi", "tags": ["gurbet"], "is_duplicate_hint": False}

async def summarize_link(url, caption, webpage_title, webpage_description, author):
    if not GEMINI_KEY or not HAS_GEMINI:
        return {"title": webpage_title or caption[:80] or url, "description": webpage_description[:300] if webpage_description else (caption[:300] if caption else "")}

    genai.configure(api_key=GEMINI_KEY)
    model = genai.GenerativeModel("models/gemini-2.0-flash")
    raw_info = f"URL: {url}\nBaslik: {webpage_title or '(yok)'}\nAciklama: {webpage_description or '(yok)'}\nPaylasan notu: {caption or '(yok)'}\nPaylasan: {author}"
    prompt = f"""Bu baglantiyi Gurbet Kalemleri edebiyat toplulugumuzda bir uye paylasti. Turkce baslik ve aciklama yaz.
{raw_info}
JSON dondur (baska sey yazma):
{{"title": "Kisa baslik (maks 80 karakter)", "description": "2-3 cumlelik Turkce aciklama (maks 300 karakter)"}}
"""
    for attempt in range(2):
        try:
            response = model.generate_content(prompt)
            raw = response.text.strip()
            if raw.startswith("```"):
                raw = re.sub(r'^```\w*\n?', '', raw)
                raw = re.sub(r'\n?```$', '', raw)
            return json.loads(raw)
        except Exception as e:
            if "429" in str(e):
                await asyncio.sleep(20)
            else:
                break
    return {"title": webpage_title or caption[:80] or url, "description": webpage_description[:300] if webpage_description else (caption[:300] if caption else "")}

def work_exists(supabase, author, title):
    try:
        res = supabase.table('literary_works').select('id').eq('author', author).ilike('title', f"%{title[:30]}%").execute()
        return len(res.data or []) > 0
    except Exception:
        return False

async def sync_gurbet_kalemler(external_client=None, target_dialog=None):
    print("=" * 65)
    print("Gurbet Kalemleri Senkronizasyon Motoru Baslatiliyor...")
    print("=" * 65)

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    state = load_state()
    last_id = state.get(STATE_KEY, 0)

    own_client = False
    if external_client is None:
        if not SESSION_FILE.with_suffix('.session').exists():
            print("HATA: Telegram oturumu bulunamadi. Once 'npm run telegram:qr-login' calistirin.")
            return
        client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)
        await client.connect()
        if not await client.is_user_authorized():
            print("HATA: Telegram oturumu yetkili degil.")
            return
        own_client = True
    else:
        client = external_client

    target_entity = target_dialog if target_dialog is not None else LITERARY_CHANNEL_ID
    target_name = getattr(target_dialog, 'name', LITERARY_CHANNEL_TITLE)
    print(f"Kanal taranıyor: {target_name}")
    print(f"   Kaldigi yer (min_id): {last_id}\n")

    raw_messages = []
    max_id_seen  = last_id

    try:
        async for msg in client.iter_messages(target_entity, limit=200, min_id=last_id, reverse=True):
            if msg.id > max_id_seen:
                max_id_seen = msg.id
            sender = await msg.get_sender()
            # KURAL: Tam isim asla alinmaz — yalnizca bas harfler (initials)
            author = anonymize_author(sender)
            raw_messages.append({
                "id": msg.id,
                "date": msg.date,
                "author": author,
                "text": msg.text or "",
            })
    except Exception as e:
        print(f"   Mesaj okuma hatasi: {e}")

    print(f"   {len(raw_messages)} mesaj cekildi.")

    # Gruplama: yalnizca metinler; linkler artik alinmiyor (proje politikasi)
    grouped = []
    for msg in raw_messages:
        # URL'leri metinden temizle (icerige dahil etme)
        urls_in_msg = URL_RE.findall(msg["text"])
        text_part = msg["text"]
        for url in urls_in_msg:
            text_part = text_part.replace(url, "").strip()

        # Yalnizca link olan mesajlari atla
        if not text_part.strip():
            continue

        # KURAL: Metin anonimlestirilir
        text_part = anonymize_text(text_part)

        if text_part:
            if (grouped
                    and grouped[-1]["author"] == msg["author"]
                    and (msg["date"] - grouped[-1]["last_date"]) <= timedelta(minutes=MESSAGE_MERGE_WINDOW_MINUTES)):
                grouped[-1]["text"] += "\n" + text_part
                grouped[-1]["last_date"] = msg["date"]
                grouped[-1]["message_count"] += 1
            else:
                grouped.append({
                    "author": msg["author"],
                    "date": msg["date"],
                    "last_date": msg["date"],
                    "text": text_part,
                    "message_count": 1,
                })

    print(f"   {len(grouped)} edebi metin grubu (anonimlestirilmis, birlestirme sonrasi)")
    print(f"   NOT: Link paylasimi artik alinmamaktadir (proje politikasi).\n")

    added_works   = 0
    skipped_works = 0

    for item in grouped:
        text = item["text"]
        if len(text) < 50:
            skipped_works += 1
            continue
        author   = item["author"]
        date_str = item["date"].strftime("%Y-%m-%d")
        print(f"   Analiz ediliyor -> [{author}] ({len(text)} karakter)")
        analysis = await analyze_literary_content(text, author)
        if analysis and analysis.get("is_duplicate_hint"):
            print(f"      Edebi icerik degil, atlandi.")
            skipped_works += 1
            continue
        title     = (analysis or {}).get("title") or text.splitlines()[0][:80].strip() or "Isimsiz Eser"
        work_type = (analysis or {}).get("type", "duz_yazi")
        tags      = (analysis or {}).get("tags", ["gurbet"])
        if work_exists(supabase, author, title):
            print(f"      Zaten mevcut, atlandi: {title[:50]}")
            skipped_works += 1
            continue
        try:
            supabase.table('literary_works').insert({
                "title": title,
                "author": author,       # initials veya "Anonim Kalem"
                "date": date_str,
                "type": work_type,
                "tags": tags,
                "content": text,        # anonymize_text() gecmis icerik
                "is_approved": True,
                "submitted_by": "telegram_sync"
            }).execute()
            print(f"      Eklendi: [{work_type}] {title[:60]}")
            added_works += 1
        except Exception as db_err:
            print(f"      DB hatasi: {db_err}")
        await asyncio.sleep(1)


    if max_id_seen > last_id:
        state[STATE_KEY] = max_id_seen
        save_state(state)
        print(f"\n   State guncellendi. Yeni min_id: {max_id_seen}")

    if own_client:
        await client.disconnect()

    print("\n" + "=" * 65)
    print(f"Gurbet Kalemleri Senkronizasyonu Tamamlandi!")
    print(f"   Eklenen eser  : {added_works}")
    print(f"   Atlanan       : {skipped_works}")
    print(f"   Politika      : Link paylasimi alinmiyor (anonim platform kurali)")
    print("=" * 65)

if __name__ == '__main__':
    asyncio.run(sync_gurbet_kalemler())