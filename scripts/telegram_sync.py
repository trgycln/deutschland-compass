#!/usr/bin/env python3
"""
Deutschlandcompass - Telegram Canlı Veri Çekme ve Wikipedia Usulü Sentezleme Motoru

Bu script:
1. Telegram oturumunuzu açar ve üye olduğunuz tüm grupları otomatik olarak tespit eder.
2. Tespit edilen grupları sitemizdeki ilgili meslek/rehber sayfalarıyla eşleştirir.
3. Son paylaşılan mesajları çeker, spam/selamlaşma mesajlarını filtreler, kişisel verileri anonimleştirir.
4. "Wikipedia Bütünlüğü" Mantığı ile:
   - Sayfada zaten mevcut olan konuları (başlıkları) çeker.
   - Yeni mesajlar mevcut bir konuya ekleme yapıyorsa YENİ KART AÇMAZ; mevcut konuyu zenginleştirerek günceller (UPDATE).
   - Yalnızca tamamen yeni ve önemli bir konu ise yeni ansiklopedi başlığı oluşturur (CREATE).
5. Güncellenen veya yeni oluşturulan bilgileri Supabase 'community_updates' tablosuna işler.
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

# Supabase
from supabase import create_client, Client

# Gemini AI
try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

# Scripts yolunu ekle
sys.path.append(str(Path(__file__).resolve().parent))
from telegram_catalog import find_category_for_dialog, GROUP_CATALOG

# 1. Ortam Değişkenlerini Yükle
ROOT_DIR = Path(__file__).resolve().parent.parent
env_path = ROOT_DIR / '.env.local'
load_dotenv(dotenv_path=env_path)

API_ID = os.getenv('TELEGRAM_API_ID', '24803923')
API_HASH = os.getenv('TELEGRAM_API_HASH', '2ff1b47427181c0022d48074d0d0eb3f')
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

SESSION_FILE = Path(__file__).resolve().parent / 'telegram_session'
STATE_FILE = Path(__file__).resolve().parent / 'sync_state.json'

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
    """
    Kisisel verileri anonimlestirir.
    Kural (.agents/rules/veri-gizliligi-ve-anonimlik.md):
      telefon, e-posta, @kullanici, IBAN, TC kimlik numaralari.
    """
    if not text:
        return ""
    # Telefon numaralari
    text = re.sub(r'(\+?\d{1,3}[\-.\s]?)?\(?\d{3}\)?[\-.\s]?\d{3}[\-.\s]?\d{4}', '[Telefon]', text)
    # E-posta
    text = re.sub(r'[\w\.\-]+@[\w\.\-]+\.\w+', '[E-posta]', text)
    # Telegram kullanici adlari
    text = re.sub(r'@\w+', '[Kullanici]', text)
    # IBAN
    text = re.sub(r'\b[A-Z]{2}\d{2}[\s]?(\d{4}[\s]?){4,7}\b', '[Hesap No]', text)
    # TC Kimlik (11 hane)
    text = re.sub(r'\b\d{11}\b', '[Kimlik No]', text)
    return text.strip()

def is_meaningful_message(text: str) -> bool:
    """Kısa, anlamsız selamlaşma ve spam mesajları eler"""
    if not text or len(text) < 35:
        return False
    
    lower = text.lower().strip()
    greetings = ['günaydın', 'gunaydin', 'iyi akşamlar', 'iyi aksamlar', 'merhaba arkadaşlar', 'hayırlı cumalar', 'selamlar', 'teşekkürler', 'sagolun', 'sağolun']
    if lower in greetings:
        return False
    
    # Sadece link içerenleri ele
    if re.fullmatch(r'https?://\S+', lower):
        return False
        
    return True

async def synthesize_with_gemini(category_title: str, existing_items: list, new_messages: list) -> list:
    """
    Gemini API kullanarak yeni mesajları mevcut rehber başlıklarıyla karşılaştırır.
    Mevcut bir konu varsa onu zenginleştirip günceller (UPDATE),
    Tamamen yeni bir konu ise yeni başlık açar (CREATE).
    """
    if not GEMINI_KEY or not HAS_GEMINI:
        print("   ℹ️  Gemini API Key bulunamadı; basit kural tabanlı özetleme yapılıyor.")
        combined_snippet = "\n• ".join([m[:150] for m in new_messages[:3]])
        return [{
            "action": "CREATE",
            "title": f"{category_title} Alanında Yeni Topluluk Tecrübeleri",
            "content": f"Grupta paylaşılan son deneyimler:\n• {combined_snippet}",
            "update_type": "tip",
            "badge_text": datetime.now().strftime("%B %Y"),
            "importance": "normal",
            "target_tab": "updates"
        }]

    genai.configure(api_key=GEMINI_KEY)
    
    # Model seçimi: gemini-3.6-flash
    model = genai.GenerativeModel("models/gemini-3.6-flash")

    existing_context = ""
    if existing_items:
        existing_context = "SAYFADA HALİHAZIRDA MEVCUT OLAN KONULAR/BAŞLIKLAR:\n"
        for it in existing_items:
            existing_context += f"- [ID: {it['id']}] Başlık: {it.get('title')}\n  Mevcut İçerik: {it.get('content')}\n  Sekme: {it.get('target_tab', 'updates')}\n\n"
    else:
        existing_context = "SAYFADA HENÜZ HİÇBİR KONU/BAŞLIK YOK. (Tüm geçerli bilgiler yeni başlık olarak eklenecek).\n"

    prompt = f"""
Sen Deutschlandcompass için çalışan Baş Ansiklopedi Editörüsün.
Görevin: Almanya'daki '{category_title}' alanına dair Telegram topluluğunda konuşulan yeni mesajları incelemek ve sayfadaki Wikipedia/Ansiklopedi düzenini koruyarak bilgiyi sentezlemektir.

ÖNEMLİ KURAL: Sayfayı bir sosyal medya veya mesaj akışına ÇEVİRME! Alt alta onlarca benzer kart birikmesini engelle.

{existing_context}

YENİ GELEN TELEGRAM MESAJLARI:
{"---".join(new_messages[:30])}

TALİMATLAR:
1. GÜNCELLEME VE BİRLEŞTİRME (ÖNCELİKLİ):
   - Eğer yeni mesajlar, yukarıdaki MEVCUT konulardan birine bir detay, tecrübe, kural değişikliği veya pratik bir püf noktası ekliyorsa:
     * "action": "UPDATE"
     * "target_id": İlgili mevcut konunun ID numarası (integer)
     * "title": Başlığı gerekiyorsa hafifçe güncelle veya koru
     * "content": Eski içerikteki bilgiyi de koruyarak, yeni tecrübeyi tek ve akıcı bir Türkçe ansiklopedik paragrafta birleştir.
     * "badge_text": "Güncellendi: {datetime.now().strftime('%B %Y')}"
     * "target_tab": "updates" | "guide" | "experiences"

2. YENİ KONU OLUŞTURMA (Yalnızca gerçekten mevcut konularda yer almayan yeni bir konuysa):
   - Eğer mesajlar mevcut hiçbir başlığa uymayan, ama bu meslek/rehber için çok önemli bir konuyu (örn. yeni bir sınav, yeni bir bürokratik aşama, yeni bir vize kuralı vb.) ele alıyorsa:
     * "action": "CREATE"
     * "title": Kısa, net ansiklopedi başlığı
     * "content": 2-4 cümlelik derli toplu, tarafsız ve açıklayıcı bilgi
     * "badge_text": "Yeni Bilgi" veya "{datetime.now().strftime('%B %Y')}"
     * "target_tab": "updates" | "guide" | "experiences"
     * "update_type": "official_rule" | "tip" | "experience" | "warning"

3. ELEME / ÇÖP:
   - Selamlaşma, özel sohbet, spam, satılık ilanları veya kayda değer bir bilgi taşımayan mesajları tamamen yok say.
   - Eğer incelenecek kayda değer hiçbir yeni bilgi yoksa boş bir JSON array döndür: []

Çıktıyı SADECE geçerli bir JSON array olarak ver. Markdown ```json kod bloğu dışında hiçbir açıklama yazma.
Örnek Format:
[
  {{
    "action": "UPDATE",
    "target_id": 14,
    "title": "Ehliyet, İHK ve Takograf Kartı Başvuru Adımları",
    "content": "Eski bilgilerin ve yeni paylaşılan pratik püf noktalarının birleştirilmiş akıcı metni...",
    "badge_text": "Güncellendi: {datetime.now().strftime('%B %Y')}",
    "target_tab": "updates",
    "importance": "normal"
  }}
]
"""
    # Maksimum 3 deneme ve 429 kota beklemesi
    for attempt in range(3):
        try:
            response = model.generate_content(prompt)
            raw_text = response.text.strip()
            if raw_text.startswith("```json"):
                raw_text = raw_text[7:]
            elif raw_text.startswith("```"):
                raw_text = raw_text[3:]
            if raw_text.endswith("```"):
                raw_text = raw_text[:-3]
            
            parsed = json.loads(raw_text.strip())
            if isinstance(parsed, list):
                return parsed
            break
        except Exception as e:
            err_msg = str(e)
            if "429" in err_msg:
                wait_sec = 25 * (attempt + 1)
                print(f"   ⏳ Gemini istek limiti (429). {wait_sec} saniye beklenip tekrar deneniyor...")
                await asyncio.sleep(wait_sec)
            else:
                print(f"   ⚠️  Gemini sentezleme hatası: {e}")
                break
    
    return []

async def sync_telegram():
    if not SESSION_FILE.with_suffix('.session').exists():
        print("❌ [HATA] Telegram oturumu bulunamadı!")
        print("Lütfen önce 'npm run telegram:qr-login' komutu ile giriş yapın.")
        return

    print("=" * 65)
    print("🚀 Deutschlandcompass Telegram Wikipedia Sentezleme Motoru Başlatılıyor...")
    print("=" * 65)

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    state = load_state()

    client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)
    await client.connect()

    if not await client.is_user_authorized():
        print("❌ Telegram oturumu yetkili değil.")
        return

    me = await client.get_me()
    print(f"✅ Bağlanılan Hesap: {me.first_name} {me.last_name or ''} (@{me.username or 'kullanıcı adı yok'})")
    print("🔍 Hesabınızın üye olduğu gruplar taranıyor...\n")

    # limit=None: tüm diyalogları getir (varsayılan ~100 ile sınırlı kalır ve bazı gruplar atlanır)
    dialogs = await client.get_dialogs(limit=None)
    
    # Eşleşen grupları dinamik tespit et
    matched_targets = []
    for d in dialogs:
        if not (d.is_group or d.is_channel):
            continue
        
        cat = find_category_for_dialog(d.name)
        if cat:
            matched_targets.append({
                "dialog": d,
                "category": cat
            })

    print(f"📌 Tespit Edilen & Eşleşen Grup Sayısı: {len(matched_targets)} adet\n")

    executed_special = set()

    for item in matched_targets:
        d = item["dialog"]
        cat = item["category"]
        group_key = cat["id"]
        cat_slug = cat["category_slug"]
        cat_title = cat["category_title"]

        print(f"📡 Grup İnceleniyor: {d.name} --> [{cat_title}]")

        # Özel Kategori: Gurbet Kalemleri (edebi içerik)
        if cat.get("type") == "literary":
            executed_special.add("literary")
            try:
                from sync_gurbet_kalemler import sync_gurbet_kalemler
                await sync_gurbet_kalemler(external_client=client, target_dialog=d)
            except Exception as ge:
                print(f"   ⚠️ Gurbet Kalemleri senkronizasyon hatası: {ge}")
            await asyncio.sleep(2)
            continue

        # Özel Kategori: Helal Mekanlar ve Restoranlar
        if cat_slug == 'helal-mekanlar' or cat.get("type") == "helal":
            executed_special.add("helal-mekanlar")
            try:
                from sync_helal_places import sync_helal_group
                await sync_helal_group(limit=50, external_client=client, target_dialog=d)
            except Exception as he:
                print(f"   ⚠️ Helal mekanlar senkronizasyon hatası: {he}")
            await asyncio.sleep(2)
            continue

        last_id = state.get(group_key, 0)
        messages_collected = []
        max_id_seen = last_id

        try:
            # reverse=True + min_id=last_id: last_id'DEN SONRA gelen mesajları artan sırayla getirir
            # Bu sayede her çalıştırmada kaldığı yerden devam eder, eski mesajları tekrar okumaz
            async for message in client.iter_messages(d, limit=100, min_id=last_id, reverse=True):
                if message.id > max_id_seen:
                    max_id_seen = message.id
                
                if message.text and is_meaningful_message(message.text):
                    cleaned = clean_and_anonymize(message.text)
                    messages_collected.append(cleaned)
        except Exception as e:
            print(f"   ⚠️  Mesaj okuma hatası: {e}")
            continue

        print(f"   📥 {len(messages_collected)} adet anlamlı mesaj/tecrübe süzüldü.")

        if messages_collected:
            # 1. Supabase'den bu kategoriye ait mevcut başlıkları çek
            try:
                res_existing = supabase.table('community_updates') \
                    .select('id, title, content, target_tab, badge_text') \
                    .eq('category_slug', cat_slug) \
                    .execute()
                existing_items = res_existing.data or []
            except Exception as db_err:
                print(f"   ⚠️  Mevcut verileri çekme hatası: {db_err}")
                existing_items = []

            print(f"   📚 Sayfadaki mevcut konu sayısı: {len(existing_items)} (Birleştirme için yapay zekaya iletiliyor...)")
            
            # 2. Gemini ile akıllı sentezleme ve birleştirme
            synthesis_results = await synthesize_with_gemini(cat_title, existing_items, messages_collected)
            print(f"   ✨ Yapay zeka sonucu: {len(synthesis_results)} işlem önerildi.")

            # 3. Sonuçları işle (UPDATE veya CREATE)
            for res_item in synthesis_results:
                action = res_item.get("action", "CREATE").upper()
                title = res_item.get("title", f"{cat_title} Bilgisi")
                content = res_item.get("content", "")
                target_tab = res_item.get("target_tab", "updates")
                badge_text = res_item.get("badge_text", "Güncel")
                importance = res_item.get("importance", "normal")
                update_type = res_item.get("update_type", "tip")

                if action == "UPDATE" and res_item.get("target_id"):
                    target_id = res_item["target_id"]
                    try:
                        supabase.table('community_updates').update({
                            "title": title,
                            "content": content,
                            "badge_text": badge_text,
                            "target_tab": target_tab,
                            "importance": importance,
                            "updated_at": datetime.now().isoformat()
                        }).eq('id', target_id).execute()
                        print(f"      🔄 [GÜNCELLENDİ & BİRLEŞTİRİLDİ] ID {target_id}: {title}")
                    except Exception as upd_err:
                        print(f"      ⚠️  Güncelleme hatası (ID {target_id}): {upd_err}")

                elif action == "CREATE" and content:
                    try:
                        supabase.table('community_updates').insert({
                            "category_slug": cat_slug,
                            "title": title,
                            "content": content,
                            "source_group": d.name,
                            "source_url": cat.get("url", ""),
                            "update_type": update_type,
                            "badge_text": badge_text,
                            "importance": importance,
                            "target_tab": target_tab,
                            "is_approved": True
                        }).execute()
                        print(f"      ✨ [YENİ KONU EKLENDİ]: {title}")
                    except Exception as ins_err:
                        print(f"      ⚠️  Yeni kayıt ekleme hatası: {ins_err}")

        # Durumu güncelle
        state[group_key] = max_id_seen
        save_state(state)

        # Telegram hız sınırına uymak için kısa bekleme
        await asyncio.sleep(2)

    # Garanti Modül Kontrolü: Diyalog listesinde bulunmadıysa doğrudan çağır
    if "helal-mekanlar" not in executed_special:
        print("\n🍴 Helal Mekanlar grubu taranıyor (doğrudan)...")
        try:
            from sync_helal_places import sync_helal_group
            await sync_helal_group(limit=50, external_client=client)
        except Exception as he:
            print(f"   ⚠️ Helal mekanlar senkronizasyon hatası: {he}")
        await asyncio.sleep(2)

    if "literary" not in executed_special:
        print("\n📜 Gurbet Kalemleri kanalı taranıyor (doğrudan)...")
        try:
            from sync_gurbet_kalemler import sync_gurbet_kalemler
            await sync_gurbet_kalemler(external_client=client)
        except Exception as ge:
            print(f"   ⚠️ Gurbet Kalemleri senkronizasyon hatası: {ge}")
        await asyncio.sleep(2)

    await client.disconnect()
    print("\n" + "=" * 65)
    print("🎉 Tüm Grupların (Topluluk, Helal Mekanlar, Gurbet Kalemleri) Senkronizasyonu Tamamlandı!")
    print("=" * 65)

if __name__ == '__main__':
    asyncio.run(sync_telegram())
