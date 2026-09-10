#!/usr/bin/env python3
"""
Deutschlandcompass - Telegram Veri Çekme ve Yapay Zeka Özetleme Pipeline'ı

Bu script:
1. Telegram hesabınıza 'telegram_session' üzerinden güvenle bağlanır (SADECE OKUMA).
2. Belirtilen gruplardaki (veya pilot gruptaki) son paylaşılan mesajları çeker.
3. Çöp/spam/selamlaşma mesajlarını eler, kişisel bilgileri (isim, telefon vb.) anonimleştirir.
4. Anlamlı tecrübeleri Google Gemini AI ile özetleyip başlık, etiket ve kategoriye böler.
5. Sonuçları Supabase 'community_updates' tablosuna otomatik olarak kaydeder.
"""

import os
import sys
import re
import json
import time
import asyncio
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Telethon
from telethon import TelegramClient
from telethon.tl.types import Channel, Chat

# Supabase
from supabase import create_client, Client

# Gemini AI
try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

# 1. Ortam Değişkenlerini Yükle
ROOT_DIR = Path(__file__).resolve().parent.parent
env_path = ROOT_DIR / '.env.local'
load_dotenv(dotenv_path=env_path)

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

SESSION_FILE = Path(__file__).resolve().parent / 'telegram_session'
STATE_FILE = Path(__file__).resolve().parent / 'sync_state.json'

# Temel Eşleştirme Sözlüğü (Telegram Grup ID -> Site Kategori Slug & Adı)
TARGET_GROUPS = [
    {
        "id": "busfahrer",
        "telegram_id": -1001388213286,
        "name": "BUSFAHRER/IN GRUBU",
        "category_slug": "otobus-soforlugu",
        "category_title": "Otobüs Şoförlüğü"
    },
    {
        "id": "lokfuhrer",
        "telegram_id": -1001485828423,
        "name": "LOKFÜHRER/IN (MAKİNİSTLİK) GRUBU",
        "category_slug": "lokfuhrer",
        "category_title": "Makinistlik (Lokführer)"
    },
    {
        "id": "anerkennung",
        "telegram_id": -1001538926921,
        "name": "ANERKENNUNG GRUBU",
        "category_slug": "anerkennung",
        "category_title": "Diploma Denkliği"
    },
    {
        "id": "aile-birlesim",
        "telegram_id": -1001564474138,
        "name": "AİLE BİRLEŞİMİ GRUBU",
        "category_slug": "aile-birlesimi",
        "category_title": "Aile Birleşimi"
    },
    {
        "id": "almanca-ogretmenligi",
        "telegram_id": -1001460212579,
        "name": "ALMANCA ÖĞRETMENİ OLMAK İSTİYORUM",
        "category_slug": "ogretmenlik",
        "category_title": "Öğretmenlik / Almanca"
    },
    {
        "id": "sirket-kurmak",
        "telegram_id": -1001604986055,
        "name": "Avrupa’da Şirket Kurmak İstiyorum",
        "category_slug": "is-kurma",
        "category_title": "Şirket Kurma / Girişimcilik"
    },
    {
        "id": "abitur",
        "telegram_id": -1001786912356,
        "name": "ABITUR GRUBU",
        "category_slug": "egitim-abitur",
        "category_title": "Abitur ve Üniversite"
    },
    {
        "id": "brans-tamamlama",
        "telegram_id": -1001315797908,
        "name": "IKINCI BRANŞ / BRANŞ TAMAMLAMA",
        "category_slug": "brans-tamamlama",
        "category_title": "Branş Tamamlama"
    },
    {
        "id": "ehrenamtlich",
        "telegram_id": -1001439302331,
        "name": "EHRENAMTLICH ÇALIŞMA GRUBU",
        "category_slug": "gonulluluk",
        "category_title": "Gönüllülük (Ehrenamt)"
    }
]

def load_state():
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return {}
    return {}

def save_state(state):
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, ensure_ascii=False, indent=2)

def clean_and_anonymize(text: str) -> str:
    """Kişisel verileri (telefon, e-posta, telegram kullanıcı adları) anonimleştirir"""
    if not text:
        return ""
    # Telefon numaraları
    text = re.sub(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', '[Telefon]', text)
    # E-postalar
    text = re.sub(r'[\w\.-]+@[\w\.-]+\.\w+', '[E-posta]', text)
    # @kullaniciadi
    text = re.sub(r'@\w+', '[Kullanıcı]', text)
    return text.strip()

def is_meaningful_message(text: str) -> bool:
    """Kısa, anlamsız selamlaşma ve spam mesajları eler"""
    if not text or len(text) < 40:
        return False
    
    lower = text.lower().strip()
    greetings = ['günaydın', 'iyi akşamlar', 'merhaba arkadaşlar', 'hayırlı cumalar', 'selamlar', 'teşekkürler']
    if lower in greetings:
        return False
    
    # Sadece link içerenleri ele
    if re.fullmatch(r'https?://\S+', lower):
        return False
        
    return True

async def summarize_with_gemini(category_title: str, messages: list) -> list:
    """Gemini API kullanarak mesaj grubundan anlamlı özetler ve ipuçları çıkarır"""
    if not GEMINI_KEY or not HAS_GEMINI:
        print("   ℹ️  Gemini API Key bulunamadı; basit kural tabanlı özetleme yapılıyor.")
        # Basit fallback
        combined_snippet = "\n• ".join([m[:150] for m in messages[:3]])
        return [{
            "title": f"{category_title} Alanında Yeni Topluluk Tecrübeleri",
            "content": f"Grupta paylaşılan son deneyimler:\n• {combined_snippet}",
            "update_type": "tip",
            "badge_text": datetime.now().strftime("%B %Y"),
            "importance": "normal"
        }]

    genai.configure(api_key=GEMINI_KEY)
    model = genai.GenerativeModel("models/gemini-3.6-flash")

    prompt = f"""
Aşağıda Almanya'ya yerleşmiş/yaşayan Türklerin '{category_title}' isimli Telegram grubundaki gerçek yazışmaları yer almaktadır.

Bu yazışmaları dikkatle tara ve topluluk için faydalı olabilecek:
1. Yeni mevzuat veya resmi kural değişikliklerini,
2. İşe/eğitime/denkliğe dair pratik ipuçlarını ve püf noktalarını,
3. Paylaşılan önemli tecrübeleri ve tavsiyeleri

özetle. Selamlaşmaları, kişisel sohbetleri, gereksiz geyikleri ve reklamları tamamen ele.

Çıktıyı SADECE geçerli bir JSON array olarak ver. Başka hiçbir markdown veya metin yazma.
Her obje şu yapıda olmalı:
[
  {{
    "title": "Kısa ve net Türkçe başlık",
    "content": "2-4 cümlelik net, açıklayıcı ve uygulanabilir tavsiye veya bilgi özeti",
    "update_type": "official_rule" | "tip" | "experience" | "warning",
    "badge_text": "Örn: Mart 2025 veya Yeni Kural veya Pratik İpucu",
    "importance": "highlight" veya "normal"
  }}
]

İncelenecek Mesajlar:
{"---".join(messages[:25])}
"""
    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()
        # Markdown kod bloklarını temizle
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        elif raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        
        parsed = json.loads(raw_text.strip())
        if isinstance(parsed, list):
            return parsed
    except Exception as e:
        print(f"   ⚠️  Gemini işleme hatası: {e}")
    
    return []

async def sync_telegram():
    if not SESSION_FILE.with_suffix('.session').exists():
        print("[HATA] Telegram oturumu bulunamadi!")
        print("Lutfen once 'npm run telegram:qr-login' komutunu calistirarak giris yapin.")
        return

    print(">>> Deutschlandcompass Telegram Senkronizasyonu Basliyor...")
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    state = load_state()

    client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)
    await client.start()
    print("[Tamam] Telegram istemcisi baglandi (Read-Only Mod).\n")

    # Kullanicinin katildigi diyaloglari al
    dialogs = await client.get_dialogs()
    dialog_dict = {d.name.lower().strip(): d for d in dialogs}

    for target in TARGET_GROUPS:
        group_id = target["id"]
        group_name = target["name"]
        cat_slug = target["category_slug"]
        cat_title = target["category_title"]

        print(f"[*] Grup Taraniyor: {cat_title} ({group_id})...")

        # Grubu diyaloglar arasinda bul
        found_entity = None
        target_tid = target.get("telegram_id")
        for d in dialogs:
            if target_tid and d.id == target_tid:
                found_entity = d
                break
            d_name = d.name.lower().strip()
            if group_name.lower() in d_name or target["id"] in d_name:
                found_entity = d
                break

        if not found_entity:
            print(f"   [Atlandi] Bu grup hesabinizda bulunamadi. Atlanıyor.")
            continue

        last_id = state.get(group_id, 0)
        messages_collected = []
        max_id_seen = last_id

        # Mesajlari oku
        try:
            async for message in client.iter_messages(found_entity, limit=40, min_id=last_id):
                if message.id > max_id_seen:
                    max_id_seen = message.id
                
                if message.text and is_meaningful_message(message.text):
                    cleaned = clean_and_anonymize(message.text)
                    messages_collected.append(cleaned)
        except Exception as e:
            print(f"   [Hata] Mesaj okuma hatasi: {e}")
            continue

        print(f"   -> {len(messages_collected)} adet anlamli mesaj/tecrube yakalandi.")

        if messages_collected:
            print(f"   -> Ozetleniyor...")
            summaries = await summarize_with_gemini(cat_title, messages_collected)
            print(f"   -> {len(summaries)} adet yeni bilgi karti olusturuldu.")

            # Supabase'e ekle
            for item in summaries:
                try:
                    title_text = item.get("title", f"{cat_title} Guncellemesi")
                    res = supabase.table('community_updates').insert({
                        "category_slug": cat_slug,
                        "title": title_text,
                        "content": item.get("content", ""),
                        "source_group": group_name,
                        "source_url": f"https://t.me/+{target.get('invite_hash', '')}",
                        "update_type": item.get("update_type", "tip"),
                        "badge_text": item.get("badge_text", "Yeni Bilgi"),
                        "importance": item.get("importance", "normal"),
                        "is_approved": True
                    }).execute()
                    safe_title = title_text.encode('ascii', errors='replace').decode('ascii')
                    print(f"      + Eklendi: {safe_title}")
                except Exception as ins_err:
                    print(f"      [Uyari] Veritabanina yazma hatasi: {ins_err}")

        # Durumu guncelle
        state[group_id] = max_id_seen
        save_state(state)

        # Telegram hiz sinirina uymak icin bekleme
        time.sleep(2)

    await client.disconnect()
    print("\n>>> Senkronizasyon basariyla tamamlandi!")

if __name__ == '__main__':
    asyncio.run(sync_telegram())
