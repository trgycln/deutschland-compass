#!/usr/bin/env python3
"""
Deutschlandcompass — Gurbet Kalemleri Telegram Senkronizasyon Motoru

POLİTİKALAR:
1. ANONİMLEŞTİRME:
   - Yazar isimleri tek harfli karmaşaya yol açmadan temizlenir (örn: 'Canan S.', 'Tuba', 'Zehra').
   - Metin içerisindeki telefon, e-posta, @kullanıcı, IBAN, kimlik numaraları maskelenir.
2. SIKI EDEBİYAT VE KALİTE FİLTRESİ:
   - Reklam, ürün/kitap satışı, 'kitabımız çıktı', 'satın alma linki', '5 puan verin' vb. ticari içerikler KESİNLİKLE ALINMAZ.
   - Telegram/WhatsApp grup listeleri, akademi duyuruları, Zoom/söyleşi davetleri KESİNLİKLE ALINMAZ.
   - Yalnızca gerçek edebi niteliği olan şiir, deneme, kısa öykü, edebiyat hatıratı kabul edilir.
3. ÇOK KANALLI İÇERİK ALIMI:
   - Metin mesajları (edebi nitelik teyidi ile).
   - Resim olarak paylaşılan şiirler/yazılar (Gemini OCR ile edebi metin tespiti).
   - Paylaşılan linklerdeki edebi yazılar (Web scraping + Gemini analizi).
"""

import os
import sys
import io
import re
import json
import asyncio
import unicodedata
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
from PIL import Image
import httpx
from bs4 import BeautifulSoup

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
GEMINI_KEY    = os.getenv('GEMINI_API_KEY') or os.getenv('GEMINI_KEY')

SESSION_FILE  = Path(__file__).resolve().parent / 'telegram_session'
STATE_FILE    = Path(__file__).resolve().parent / 'sync_state.json'

LITERARY_CHANNEL_ID    = -1001670380624
LITERARY_CHANNEL_TITLE = "KENDI YAZDIGINIZ YAZILAR SIIRLER"
STATE_KEY              = "kendi-yazdiginiz-yazilar"
MESSAGE_MERGE_WINDOW_MINUTES = 10

MODELS_TO_TRY = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest']

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

# ─── Anonimleştirme Fonksiyonları ───

def anonymize_author(sender) -> str:
    """
    Gurbet Kalemleri edebiyat antolojisi için yazar adı tespiti.
    İlk ismi korur, soyadı varsa baş harfini ekler (örn: Canan S., Tuba, Zehra).
    Özel ve gotik sembolleri latin harflerine dönüştürür.
    """
    if sender is None:
        return "Anonim Kalem"
    first = (getattr(sender, 'first_name', '') or '').strip()
    last  = (getattr(sender, 'last_name',  '') or '').strip()
    
    if first:
        first = unicodedata.normalize('NFKD', first)
    if last:
        last = unicodedata.normalize('NFKD', last)
    
    first = re.sub(r'[^\w\s\.-]', '', first).strip()
    last  = re.sub(r'[^\w\s\.-]', '', last).strip()
    
    if not first and not last:
        return "Anonim Kalem"
    if first and last:
        return f"{first} {last[0].upper()}."
    return first or last

def anonymize_text(text: str) -> str:
    """
    Metin içindeki kişisel verileri anonimleştirir.
    """
    if not text:
        return ""
    text = re.sub(r'(\+?\d{1,3}[\-.\s]?)?\(?\d{3}\)?[\-.\s]?\d{3}[\-.\s]?\d{4}', '[Telefon]', text)
    text = re.sub(r'[\w.\-]+@[\w.\-]+\.\w+', '[E-posta]', text)
    text = re.sub(r'@\w+', '[Kullanıcı]', text)
    text = re.sub(r'\b[A-Z]{2}\d{2}[\s]?(\d{4}[\s]?){4,7}\b', '[Hesap No]', text)
    text = re.sub(r'\b\d{11}\b', '[Kimlik No]', text)
    return text.strip()

URL_RE = re.compile(r'https?://\S+')

# ─── Edebi Nitelik ve Reklam Ön Filtresi (Kural Tabanlı) ───

def is_promotional_or_non_literary(text: str) -> bool:
    """
    Reklam, ticari tanıtım, grup listesi, zoom daveti ve sohbet mesajlarını
    Gemini çağrısı yapmadan önce hızla tespit edip eler.
    """
    if not text or len(text.strip()) < 50:
        return True
        
    lower = text.lower()
    
    # 1. Ticari / Satış / Tanıtım kalıpları
    sales_patterns = [
        'satın al', 'satın alma', 'kaufen', '5 puan ver', 'puan vermek elinizde',
        'fırsatı kaçırmayın', 'sipariş ver', 'siparis ver', 'kitabımız çıktı',
        'kitabimiz cikti', 'kitabı çıktı', 'kitabi cikti', 'kitabım çıktı',
        'ücretsiz indir', 'ucretsiz indir', 'pdf indir', 'e-book', 'satışta',
        'satista', 'fiyatı', 'fiyati', 'kampanya', 'indirim', 'yayımlandı!'
    ]
    if any(p in lower for p in sales_patterns):
        return True
        
    # 2. Grup ve kanal listeleri
    group_patterns = [
        'ideal akademi', 'grup listesi', 'ikinci branş', 'obas /pe',
        'abone olabilirsiniz', 'youtube kanalımıza', 'kanal linki'
    ]
    if any(p in lower for p in group_patterns):
        return True
    if len(re.findall(r'\bgru\w+', lower)) >= 3:
        return True
        
    # 3. Zoom / Söyleşi / Toplantı davetleri
    event_patterns = [
        'zoom link', 'zoomda hangi', 'söyleşi kanal', 'soylesi kanal',
        'söyleşimize bekleriz', 'webinar', 'canlı yayınımız'
    ]
    if any(p in lower for p in event_patterns):
        return True
        
    # Temel uzunluk ve yapı kontrolü: Çok kısaysa ve hiç satır atlaması yoksa, muhtemelen düz bir cümledir (şiir değil).
    if len(text.strip()) < 100 and '\n' not in text:
        return True

    return False

# ─── Gemini Çoklu Model Yardımcısı ───

def call_gemini_models(contents):
    """
    Tanımlı modelleri sırayla dener (429/404 durumunda otomatik fallback).
    """
    if not GEMINI_KEY or not HAS_GEMINI:
        return None
        
    genai.configure(api_key=GEMINI_KEY)
    
    for model_name in MODELS_TO_TRY:
        try:
            model = genai.GenerativeModel(f"models/{model_name}")
            resp = model.generate_content(contents)
            raw = resp.text.strip()
            if raw.startswith("```"):
                raw = re.sub(r'^```\w*\n?', '', raw)
                raw = re.sub(r'\n?```$', '', raw)
            return json.loads(raw)
        except Exception as e:
            err_str = str(e)
            if "429" in err_str or "quota" in err_str.lower() or "404" in err_str:
                continue
            return None
    return None

# ─── Edebi İçerik Analizi (Metin) ───

async def analyze_literary_content(text, author):
    """
    Metnin edebi değerini inceler; reklam ve duyuruları kesin olarak reddeder.
    """
    if is_promotional_or_non_literary(text):
        return {"is_literary": False, "rejection_reason": "kural_tabanli_reklam_veya_duyuru"}

    prompt = f"""Sen Gurbet Kalemleri edebiyat antolojisi için baş editörsün.
Görev: Bir metnin GERÇEK BİR EDEBİ ESER (şiir, edebi deneme, kısa öykü, edebiyat hatıratı) olup olmadığını tespit etmektir. 
Sadece bağımsız, kendi başına edebi bir değer taşıyan, sanatsal bir üslupla yazılmış eserleri kabul etmelisin. 

Eğer metin:
- Günlük bir sohbet, yorum, teşekkür veya taziye mesajıysa,
- Bir duyuru, haber, reklam veya bilgilendirme metniyse,
- Edebi bir derinliği olmayan sıradan, anlık bir ifadeyse,
KESİNLİKLE REDDET ("is_literary": false).

YAZAR: {author}
METİN:
{text[:2500]}

SADECE aşağıdaki JSON formatında yanıt ver:
{{
  "is_literary": true | false,
  "rejection_reason": null | "edebi_degil_sohbet" | "edebi_degil_duyuru" | "edebi_nitelik_yetersiz",
  "title": "Eserin başlığı (maks 60 karakter)",
  "type": "siir | deneme | hikaye | aforizma | ani",
  "tags": ["gurbet", "ozlem"]
}}

Kurallar:
- KABUL İÇİN TEK KRİTER: Metnin bariz bir şekilde edebi bir üslupla yazılmış gerçek bir eser (şiir, öykü vb.) olmasıdır.
- tags: lowercase ASCII, 2-6 adet (gurbet, ozlem, hasret, umut, yalnizlik, sevda, vatan, anne, dostluk vb.)
"""
    result = call_gemini_models(prompt)
    if result and isinstance(result, dict):
        return result

    # Fallback: Eğer API geçici kapalıysa ve kural filtresinden geçmişse
    first_line = text.splitlines()[0][:60].strip()
    return {
        "is_literary": True,
        "title": first_line or "İsimsiz Eser",
        "type": "duz_yazi",
        "tags": ["gurbet"]
    }

# ─── Resim İçindeki Şiir / Edebi Yazıyı Çıkarma (OCR) ───

async def extract_literary_from_image(img_bytes: bytes, caption: str = "", author: str = ""):
    """
    Resimdeki edebi eseri (şiir, yazı) Gemini multimodal ile tespit ve OCR eder.
    Afiş, duyuru, kitap kapağı reklamı vb. ise reddeder.
    """
    try:
        pil_img = Image.open(io.BytesIO(img_bytes))
    except Exception:
        return None

    prompt = f"""Sen Gurbet Kalemleri edebiyat antolojisi editörüsün.
Ekli görseli incele:
1. Bu görselde bir şiir, edebi yazı, deneme veya öykü metni var mı?
2. Eğer bu sadece bir kitap kapağı, reklam afişi, etkinlik duyurusu, tebrik kartı veya edebi olmayan bir görsel ise 'is_literary': false döndür.
3. Eğer gerçek bir edebi şiir veya edebi yazı ise: Görseldeki şiiri/yazıyı eksiksiz şekilde metne dönüştür (OCR).

Paylaşan: {author}
Ek Not: {caption}

SADECE geçerli bir JSON döndür:
{{
  "is_literary": true | false,
  "rejection_reason": null | "afis_veya_reklam" | "edebi_metin_yok",
  "title": "Eser başlığı",
  "content": "Görselden okunan tam edebi metin (satır satır)",
  "type": "siir | deneme | hikaye",
  "tags": ["gurbet", "siir"]
}}
"""
    result = call_gemini_models([prompt, pil_img])
    if result and isinstance(result, dict) and result.get("is_literary") and len(result.get("content", "")) >= 40:
        return result
    return None

# ─── Paylaşılan Linkteki Edebi Yazıyı Çıkarma ───

async def fetch_clean_web_text(url: str) -> str:
    """
    Verilen URL'den temiz makale/şiir metnini çeker.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    try:
        async with httpx.AsyncClient(timeout=15.0, follow_redirects=True, headers=headers) as client:
            resp = await client.get(url)
            if resp.status_code != 200:
                return ""
            soup = BeautifulSoup(resp.text, 'html.parser')
            for tag in soup(['script', 'style', 'nav', 'header', 'footer', 'aside', 'iframe', 'form', 'noscript']):
                tag.decompose()
            container = soup.find('article') or soup.find('main') or soup.find('div', class_=re.compile(r'content|post|entry|article', re.I))
            target = container if container else soup.body
            if not target:
                return ""
            paras = [p.get_text().strip() for p in target.find_all(['p', 'h1', 'h2', 'h3', 'blockquote'])]
            text = "\n\n".join([p for p in paras if len(p) > 20])
            return text.strip()
    except Exception:
        return ""

async def extract_literary_from_url(url: str, author: str = ""):
    """
    Linkteki web sayfasını inceler, edebi eserse içeriğini alır.
    """
    web_text = await fetch_clean_web_text(url)
    if not web_text or len(web_text) < 120:
        return None

    if is_promotional_or_non_literary(web_text):
        return None

    prompt = f"""Aşağıdaki web sayfası metnini incele.
Bu metin edebi bir eser (şiir, edebi deneme, kısa öykü, edebiyat makalesi) mi?
Yoksa ticari haber, reklam, ürün satışı, teknik kılavuz veya genel duyuru mu?

URL: {url}
METİN:
{web_text[:2500]}

SADECE geçerli bir JSON döndür:
{{
  "is_literary": true | false,
  "title": "Eserin başlığı",
  "content": "Temiz edebi metin içeriği",
  "type": "siir | deneme | hikaye",
  "tags": ["gurbet", "deneme"]
}}
"""
    result = call_gemini_models(prompt)
    if result and isinstance(result, dict) and result.get("is_literary") and len(result.get("content", "")) >= 60:
        return result
    return None

# ─── Mükerrer Kontrolü ───

def work_exists(supabase, author, title, content=""):
    try:
        res = supabase.table('literary_works').select('id').eq('author', author).ilike('title', f"%{title[:30]}%").execute()
        if len(res.data or []) > 0:
            return True
        clean_content = content.strip().replace("\n", " ")[:60]
        if len(clean_content) >= 30:
            res_content = supabase.table('literary_works').select('id').ilike('content', f"%{clean_content[:40]}%").execute()
            if len(res_content.data or []) > 0:
                return True
        return False
    except Exception:
        return False

# ─── Ana Senkronizasyon Akışı ───

async def sync_gurbet_kalemler(external_client=None, target_dialog=None):
    print("=" * 65)
    print("Gurbet Kalemleri Senkronizasyon Motoru Başlatılıyor...")
    print("  - Reklam / Satış / Tanıtım / Grup Listeleri Sıkı Şekilde Engellenir")
    print("  - Resimli Şiirler (OCR) ve Edebi Linkler Desteklenir")
    print("=" * 65)

    supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    state = load_state()
    last_id = state.get(STATE_KEY, 0)

    own_client = False
    if external_client is None:
        if not SESSION_FILE.with_suffix('.session').exists():
            print("HATA: Telegram oturumu bulunamadı. Önce 'npm run telegram:qr-login' çalıştırın.")
            return
        client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)
        await client.connect()
        if not await client.is_user_authorized():
            print("HATA: Telegram oturumu yetkili değil.")
            return
        own_client = True
    else:
        client = external_client

    target_entity = target_dialog if target_dialog is not None else LITERARY_CHANNEL_ID
    target_name = getattr(target_dialog, 'name', LITERARY_CHANNEL_TITLE)
    print(f"Kanal taranıyor: {target_name}")
    print(f"   Kaldığı yer (min_id): {last_id}\n")

    added_works   = 0
    skipped_works = 0
    max_id_seen   = last_id

    raw_text_messages = []

    try:
        async for msg in client.iter_messages(target_entity, limit=200, min_id=last_id, reverse=True):
            if msg.id > max_id_seen:
                max_id_seen = msg.id

            sender = await msg.get_sender()
            author = anonymize_author(sender)
            date_str = msg.date.strftime("%Y-%m-%d")

            # 1. KANAL: Resim İçeren Mesaj (Şiir / Edebi Yazı OCR)
            has_photo = bool(msg.photo or (msg.media and hasattr(msg.media, 'photo')))
            if has_photo:
                try:
                    img_bytes = await client.download_media(msg, file=bytes)
                    if img_bytes:
                        print(f"   [Görsel] İnceleniyor -> Yazar: {author}")
                        extracted = await extract_literary_from_image(img_bytes, caption=msg.text or "", author=author)
                        if extracted and extracted.get("is_literary"):
                            title = extracted.get("title") or "İsimsiz Eser"
                            content = anonymize_text(extracted.get("content", ""))
                            work_type = extracted.get("type", "siir")
                            tags = extracted.get("tags", ["gurbet"])
                            
                            if not work_exists(supabase, author, title, content):
                                supabase.table('literary_works').insert({
                                    "title": title,
                                    "author": author,
                                    "date": date_str,
                                    "type": work_type,
                                    "tags": tags,
                                    "content": content,
                                    "is_approved": True,
                                    "submitted_by": "telegram_image_ocr"
                                }).execute()
                                print(f"      + Eklendi (Görselden): [{work_type}] {title[:60]}")
                                added_works += 1
                                continue
                            else:
                                print(f"      Zaten mevcut: {title[:50]}")
                                skipped_works += 1
                                continue
                        else:
                            print(f"      Görsel edebi eser değil veya reklam/afiş, atlandı.")
                            skipped_works += 1
                except Exception as img_err:
                    print(f"      Görsel işleme hatası: {img_err}")

            # 2. KANAL: Link İçeren Mesaj (Web Scraping)
            urls = URL_RE.findall(msg.text or "")
            text_without_urls = msg.text or ""
            for u in urls:
                text_without_urls = text_without_urls.replace(u, "").strip()

            # Eğer mesaj sadece bir linkten veya çok kısa bir başlıktan ibaretse linke git
            if urls and len(text_without_urls) < 60:
                for url in urls:
                    try:
                        print(f"   [Link] Taranıyor -> {url[:60]}")
                        extracted_link = await extract_literary_from_url(url, author=author)
                        if extracted_link and extracted_link.get("is_literary"):
                            title = extracted_link.get("title") or "İsimsiz Eser"
                            content = anonymize_text(extracted_link.get("content", ""))
                            work_type = extracted_link.get("type", "deneme")
                            tags = extracted_link.get("tags", ["gurbet"])

                            if not work_exists(supabase, author, title, content):
                                supabase.table('literary_works').insert({
                                    "title": title,
                                    "author": author,
                                    "date": date_str,
                                    "type": work_type,
                                    "tags": tags,
                                    "content": content,
                                    "is_approved": True,
                                    "submitted_by": "telegram_link_scraper"
                                }).execute()
                                print(f"      + Eklendi (Web Linkinden): [{work_type}] {title[:60]}")
                                added_works += 1
                                break
                            else:
                                print(f"      Zaten mevcut: {title[:50]}")
                                skipped_works += 1
                                break
                        else:
                            print(f"      Link edebi eser içermiyor, atlandı.")
                            skipped_works += 1
                    except Exception as url_err:
                        print(f"      Link çekme hatası: {url_err}")
                continue

            # 3. KANAL: Düz Metin Mesajı
            if text_without_urls:
                raw_text_messages.append({
                    "id": msg.id,
                    "date": msg.date,
                    "author": author,
                    "text": text_without_urls,
                })

    except Exception as e:
        print(f"   Mesaj okuma hatası: {e}")

    # Metin Mesajlarını Gruplama (Aynı yazarın peş peşe attığı bölümleri birleştir)
    grouped = []
    for msg in raw_text_messages:
        text_part = anonymize_text(msg["text"])
        if not text_part:
            continue
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

    print(f"\n   {len(grouped)} adet edebi metin grubu inceleniyor...")

    # Metin Gruplarını Analiz Et ve Ekle
    for item in grouped:
        text = item["text"]
        author = item["author"]
        date_str = item["date"].strftime("%Y-%m-%d")

        # 1. Hızlı kural bazlı filtre (reklam, satış, grup listeleri)
        if is_promotional_or_non_literary(text):
            print(f"   Atlandı (Reklam/Duyuru tespit edildi) -> [{author}]")
            skipped_works += 1
            continue

        print(f"   İnceleniyor -> [{author}] ({len(text)} karakter)")
        analysis = await analyze_literary_content(text, author)
        
        if not analysis or not analysis.get("is_literary"):
            reason = (analysis or {}).get("rejection_reason", "edebi_degil")
            print(f"      Reddedildi ({reason}), atlandı.")
            skipped_works += 1
            continue

        title     = analysis.get("title") or text.splitlines()[0][:60].strip() or "İsimsiz Eser"
        work_type = analysis.get("type", "duz_yazi")
        tags      = analysis.get("tags", ["gurbet"])

        if work_exists(supabase, author, title, text):
            print(f"      Zaten mevcut, atlandı: {title[:50]}")
            skipped_works += 1
            continue

        try:
            supabase.table('literary_works').insert({
                "title": title,
                "author": author,
                "date": date_str,
                "type": work_type,
                "tags": tags,
                "content": text,
                "is_approved": True,
                "submitted_by": "telegram_sync"
            }).execute()
            print(f"      + Eklendi: [{work_type}] {title[:60]}")
            added_works += 1
        except Exception as db_err:
            print(f"      DB hatası: {db_err}")
        await asyncio.sleep(1)

    if max_id_seen > last_id:
        state[STATE_KEY] = max_id_seen
        save_state(state)
        print(f"\n   State güncellendi. Yeni min_id: {max_id_seen}")

    if own_client:
        await client.disconnect()

    print("\n" + "=" * 65)
    print("Gurbet Kalemleri Senkronizasyonu Tamamlandı!")
    print(f"   Eklenen eser  : {added_works}")
    print(f"   Atlanan       : {skipped_works}")
    print("=" * 65)

if __name__ == '__main__':
    asyncio.run(sync_gurbet_kalemler())