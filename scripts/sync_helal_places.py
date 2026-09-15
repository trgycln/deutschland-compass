#!/usr/bin/env python3
"""
Deutschland Compass — Helal Mekanlar Telegram Senkronizasyon Modülü

Bu script:
1. '💠ŞEHİRLERDE HELAL RESTAURANTLAR' grubundan yeni paylaşılan mesajları çeker.
2. Google Maps linklerini, mekan isimlerini, şehirleri ve tavsiye yorumlarını Gemini AI ile ayrıştırır.
3. Yeni bir mekan ise:
   - Google Maps linkinden ve açık adresinden şehir/koordinat (lat, lng) tespit eder.
   - Yemek türüne göre görsel atar.
   - 'places' tablosuna yeni restoran olarak kaydeder.
4. Mekana ait yorum/tavsiye ise:
   - 'place_reviews' tablosuna kaynak 'telegram' olarak ekler.
   - Mekanın yıldız ortalamasını ve yorum sayısını günceller.
5. Son okunan mesaj ID'sini 'sync_state.json' dosyasına işler.
"""

import os
import sys
import re
import json
import asyncio
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from telethon import TelegramClient
from supabase import create_client, Client

try:
    import google.generativeai as genai
    HAS_GEMINI = True
except ImportError:
    HAS_GEMINI = False

ROOT_DIR = Path(__file__).resolve().parent.parent
load_dotenv(ROOT_DIR / '.env.local')

API_ID = int(os.getenv('TELEGRAM_API_ID', '24803923'))
API_HASH = os.getenv('TELEGRAM_API_HASH', '2ff1b47427181c0022d48074d0d0eb3f')
SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
GEMINI_KEY = os.getenv('GEMINI_API_KEY')

SESSION_FILE = Path(__file__).resolve().parent / 'telegram_session'
STATE_FILE = Path(__file__).resolve().parent / 'sync_state.json'

DONER_PHOTOS = [
    "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&auto=format&fit=crop&q=80"
]

WRAP_PHOTOS = [
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
]

PIDE_PHOTOS = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&auto=format&fit=crop&q=80"
]

KAHVALTI_PHOTOS = [
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1493770348161-369560ae357d?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80"
]

RESTAURANT_PHOTOS = [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80"
]

def get_photo_for_food(food_str: str, seed: str = "") -> str:
    f = (food_str or "").lower()
    h = abs(hash(seed or food_str))
    if any(k in f for k in ["doner", "döner", "kebap", "kebab", "köfte"]):
        return DONER_PHOTOS[h % len(DONER_PHOTOS)]
    if any(k in f for k in ["tantuni", "wrap", "dürüm"]):
        return WRAP_PHOTOS[h % len(WRAP_PHOTOS)]
    if any(k in f for k in ["pide", "lahmacun", "pizza"]):
        return PIDE_PHOTOS[h % len(PIDE_PHOTOS)]
    if any(k in f for k in ["kahvaltı", "kahvalti", "cafe", "kafe", "çay"]):
        return KAHVALTI_PHOTOS[h % len(KAHVALTI_PHOTOS)]
    return RESTAURANT_PHOTOS[h % len(RESTAURANT_PHOTOS)]

def resolve_maps_url(short_url: str):
    """Google Maps kısa linkini açarak gerçek yönlendirme adresini ve başlığı çözer"""
    try:
        req = urllib.request.Request(short_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=5) as response:
            final_url = response.geturl()
            return final_url
    except Exception:
        return short_url

def extract_info_from_maps_url(url: str):
    """Google Maps linkinden lat, lng ve açık adres çıkarmayı dener"""
    if not url:
        return None, None, None
    final_url = resolve_maps_url(url)
    lat, lng = None, None
    # 1. @lat,lng veya ?q=lat,lng koordinat tespiti
    coord_m = re.search(r'[@?&]q?=([0-9]{1,2}\.[0-9]{4,}),([0-9]{1,2}\.[0-9]{4,})', final_url)
    if coord_m:
        try:
            lat = float(coord_m.group(1))
            lng = float(coord_m.group(2))
        except Exception:
            pass
    # 2. q=Mekan+Adı,+Sokak,+Şehir adres tespiti
    address = None
    q_m = re.search(r'[?&]q=([^&]+)', final_url)
    if q_m:
        raw_q = urllib.parse.unquote(q_m.group(1).replace('+', ' '))
        if ',' in raw_q:
            parts = [p.strip() for p in raw_q.split(',')]
            address = ", ".join(parts[1:]) if len(parts) > 1 else raw_q
    return lat, lng, address

def geocode_city_nominatim(city_name: str, country="Almanya"):
    """Nominatim ile koordinat bulur"""
    try:
        query = urllib.parse.quote(f"{city_name}, {country}")
        url = f"https://nominatim.openstreetmap.org/search?format=json&q={query}&limit=1"
        req = urllib.request.Request(url, headers={'User-Agent': 'DeutschlandCompass/1.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data and len(data) > 0:
                return float(data[0]['lat']), float(data[0]['lon'])
    except Exception as e:
        print(f"      [Geocode Hatası]: {e}")
    return None, None

ABI_ARKADAS_REGEX = re.compile(
    r'\b(?:abimiz|abimize|abimizin|abiler|abilerimiz|abilerden|abimizden|abinin|abi|arkada[sş]|arkada[sş]lar|arkada[sş][ıi]m[ıi]z|arkada[sş][ıi]m[ıi]za|arkada[sş][ıi]m[ıi]z[ıi]n|arkada[sş]lardan|tan[ıi]d[ıi]k|bizimkiler|bizim\s+arkada[sş]|bizim\s+abi|bizden)\b',
    re.IGNORECASE
)

async def parse_messages_with_gemini(messages_text: str):
    if not GEMINI_KEY or not HAS_GEMINI:
        return []
    
    genai.configure(api_key=GEMINI_KEY)
    model = genai.GenerativeModel("models/gemini-3.6-flash")

    prompt = f"""
Sen bir Veri Çıkarma Uzmanısın. Almanya ve Avrupa'daki Helal Mekanlar Telegram grubunda paylaşılan mesajları inceleyeceksin.
Aşağıdaki mesajlardan restorana, kafeye veya yeme-içme mekanına dair paylaşılan tavsiyeleri, mekan önerilerini ve Google Maps linklerini ayıkla.

TELEGRAM MESAJLARI:
{messages_text}

GÖREVİN:
Her geçerli mekan tavsiyesi için aşağıdaki JSON objesini oluştur:
- name: Mekanın tam adı (örn: "Kult Gemüse Kebab", "CTR Chicken Gare", "Akdeniz Kebap")
- city: Şehir adı (örn: "Düsseldorf", "Lüksemburg", "Köln", "Bremen", "Brüksel", "Amsterdam")
- country: Ülke adı ("Almanya", "Lüksemburg", "Belçika", "Hollanda", "Fransa", "Avusturya", "İsviçre", "İtalya" vb. Eğer şehir veya adres Lüksemburg ise MUTLAKA "Lüksemburg" yaz, Almanya yazma)
- address: Varsa açık sokak/cadde/posta kodu veya semt (bilinmiyorsa null)
- food: Yemek türü (örn: "Döner, Kebap", "Açık Büfe Kahvaltı", "Tantuni")
- category: "restaurant" | "cafe" | "fast_food" | "bakery" | "market" | "butcher" | "other"
- map_link: Varsa Google Maps linki (https://maps.app.goo.gl/... veya https://google.com/maps/...)
- comment: Kullanıcının paylaştığı tavsiye/değerlendirme notu (Selamlaşmaları temizle, lezzet, hijyen, helallik gibi bilgileri koru)
- helal_sertifikali: Mesajda helal sertifikalı veya Tuna etleri deniyorsa true, aksi halde false
- muslumana_ait: Müslüman işletmeci, arkadaşımız vb. deniyorsa true, aksi halde false
- mescid_var: Namaz yeri, mescid var deniyorsa true, aksi halde false

ÖNEMLİ KURALLAR:
- SADECE fiziki olarak gidilip yemek yenebilecek restoran, kafe, fırın, dönerci, kebapçı gibi mekanları al.
- Uygulama, Google Play linki, online alışveriş sitesi gibi şeyleri KESİNLİKLE MEKAN OLARAK EKLEME.
- Sadece soru soran ("Walldorf'ta mekan var mı?") veya mekan tavsiyesi içermeyen mesajları ele.
- Çıktıyı SADECE JSON array olarak ver, markdown dışında hiçbir şey yazma.
"""
    try:
        response = model.generate_content(prompt)
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text.strip())
    except Exception as e:
        print(f"   ⚠️ Gemini Ayrıştırma Hatası: {e}", flush=True)
        return []

async def sync_helal_group(limit=50, force_min_id=None, external_client=None, target_dialog=None):
    print("🚀 Helal Mekanlar Senkronizasyonu Başlatılıyor...", flush=True)
    if not SESSION_FILE.with_suffix('.session').exists():
        print("❌ Telegram oturumu bulunamadı!", flush=True)
        return

    print("🔌 Supabase bağlanıyor...", flush=True)
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
    
    state = {}
    if STATE_FILE.exists():
        try:
            with open(STATE_FILE, 'r', encoding='utf-8') as f:
                state = json.load(f)
        except Exception:
            pass

    client = external_client
    should_disconnect = False
    if client is None:
        print("📱 Telegram Client bağlanıyor...", flush=True)
        client = TelegramClient(str(SESSION_FILE), API_ID, API_HASH)
        await client.connect()
        should_disconnect = True

    if not await client.is_user_authorized():
        print("❌ Telegram oturumu yetkili değil.", flush=True)
        return

    if target_dialog is None:
        dialogs = await client.get_dialogs()
        for d in dialogs:
            if 'HELAL RESTAURANT' in d.name.upper():
                target_dialog = d
                break

    if not target_dialog:
        print("❌ 'ŞEHİRLERDE HELAL RESTAURANTLAR' grubu bulunamadı.")
        if should_disconnect:
            await client.disconnect()
        return

    print(f"📡 Hedef Grup: {target_dialog.name} (ID: {target_dialog.id})")
    
    last_id = force_min_id if force_min_id is not None else state.get("mekanlar", 0)
    print(f"🔍 Mesajlar taranıyor (min_id: {last_id}, limit: {limit})...")

    messages = []
    max_id_seen = last_id

    async for m in client.iter_messages(target_dialog, limit=limit, min_id=last_id, reverse=True):
        if m.id > max_id_seen:
            max_id_seen = m.id
        if m.text and len(m.text.strip()) > 15:
            messages.append(f"[MSG_ID: {m.id}] ({m.date.strftime('%Y-%m-%d')}): {m.text.strip()}")

    print(f"📥 {len(messages)} adet ilgili mesaj toplandı.")

    if not messages:
        print("ℹ️ Yeni taranacak mesaj bulunamadı.")
        if max_id_seen > last_id:
            state["mekanlar"] = max_id_seen
            with open(STATE_FILE, 'w', encoding='utf-8') as f:
                json.dump(state, f, ensure_ascii=False, indent=2)
        if should_disconnect:
            await client.disconnect()
        return

    # Gemini ile ayrıştır
    print("🤖 Yapay zeka ile mekan ve tavsiyeler ayrıştırılıyor...")
    combined_text = "\n---\n".join(messages)
    extracted_places = await parse_messages_with_gemini(combined_text)
    print(f"✨ Tespit Edilen Mekan/Yorum Önerisi: {len(extracted_places)} adet")

    added_count = 0
    review_count = 0

    for item in extracted_places:
        name = (item.get("name") or "").strip()
        city = (item.get("city") or "Bilinmiyor").strip()
        comment = (item.get("comment") or "").strip()
        map_link = item.get("map_link")
        food = item.get("food") or "Geleneksel Lezzetler"
        category = item.get("category") or "restaurant"

        if not name or len(name) < 2:
            continue

        # "Konum:" olarak adlandırılmasını engelle
        if name.lower().startswith("konum") or name.lower() in ["konum", "konum:"]:
            clean_name = re.sub(r'^konum[:\s\-\*]*', '', name, flags=re.I).strip()
            if clean_name and len(clean_name) > 2:
                name = clean_name
            elif comment:
                m_bold = re.search(r'[\*\"“\']([^\*\"”\']+)[\*\"”\']', comment)
                if m_bold and len(m_bold.group(1).strip()) > 2:
                    name = m_bold.group(1).strip()

        print(f"\n🍽️ İşleniyor: {name} ({city})")

        # 1. Supabase'de mekan var mı kontrol et
        existing = supabase.table("places").select("id, name, city, rating_avg, rating_count").ilike("name", f"%{name}%").execute()
        place_record = None

        if existing.data:
            # Şehir kontrolü veya ilk eşleşen
            for p in existing.data:
                if city.lower() in (p.get("city") or "").lower() or (p.get("city") or "").lower() in city.lower():
                    place_record = p
                    break
            if not place_record:
                place_record = existing.data[0]
            print(f"   ℹ️ Mevcut mekan bulundu: {place_record['name']} (ID: {place_record['id']})")
        # Ülke ve Şehir Normalizasyonu
        raw_country = (item.get("country") or "").strip()
        if re.search(r'l[üu]ksemburg|luxembourg|luxemburg', raw_country, re.I) or re.search(r'l[üu]ksemburg|luxembourg|luxemburg', city, re.I):
            country = "Lüksemburg"
            if city.lower() in ["luxembourg", "luxemburg", "bilinmiyor", ""]:
                city = "Lüksemburg"
        elif re.search(r'bel[çc]ika|belgium|belgien', raw_country, re.I):
            country = "Belçika"
        elif re.search(r'hollanda|netherlands|niederlande', raw_country, re.I):
            country = "Hollanda"
        elif re.search(r'fransa|france|frankreich', raw_country, re.I):
            country = "Fransa"
        elif re.search(r'[iı]svi[çc]re|switzerland|schweiz', raw_country, re.I):
            country = "İsviçre"
        elif re.search(r'avusturya|austria|österreich', raw_country, re.I):
            country = "Avusturya"
        elif raw_country:
            country = raw_country
        else:
            country = "Almanya"

        # Öne Çıkanlar (Abiler / Arkadaşlarımız) kodlama filtresi tespiti
        is_highlight = bool(ABI_ARKADAS_REGEX.search(f"{name} {comment}"))

        if not place_record:
            # Yeni mekan ekle
            print(f"   ➕ Yeni mekan oluşturuluyor...")
            
            # Google Maps linkinden koordinat ve açık adres çözümlemeyi dene
            lat, lng, maps_addr = extract_info_from_maps_url(map_link)
            if not lat or not lng:
                lat, lng = geocode_city_nominatim(city, country)

            default_address = f"{city}, {country}" if country != "Almanya" else f"{city}, Almanya"
            resolved_address = maps_addr or item.get("address") or default_address
            foto_url = get_photo_for_food(food)

            new_place_data = {
                "name": name,
                "city": city,
                "country": country,
                "address": resolved_address,
                "food": food,
                "category": category,
                "map_link": map_link,
                "lat": lat,
                "lng": lng,
                "rating_avg": 5.0,
                "rating_count": 1,
                "foto_url": foto_url,
                "helal_sertifikali": item.get("helal_sertifikali", False),
                "muslumana_ait": item.get("muslumana_ait", True),
                "mescid_var": item.get("mescid_var", False),
                "highlight": is_highlight
            }
            try:
                ins_res = supabase.table("places").insert([new_place_data]).execute()
                if ins_res.data:
                    place_record = ins_res.data[0]
                    added_count += 1
                    print(f"   ✅ Başarıyla eklendi! ID: {place_record['id']} (Highlight: {is_highlight})")
            except Exception as e:
                print(f"   ⚠️ Mekan ekleme hatası: {e}")

        # 2. Yorum ekle
        if place_record and comment:
            try:
                review_data = {
                    "place_id": place_record["id"],
                    "reviewer_name": "Telegram Topluluk Paylaşımı",
                    "rating": 5,
                    "comment": comment,
                    "source": "telegram",
                    "verified": True
                }
                supabase.table("place_reviews").insert([review_data]).execute()
                review_count += 1
                print(f"   💬 Topluluk tavsiyesi yorum olarak eklendi.")

                # Puanı güncelle ve gerekiyorsa highlight işaretle
                update_fields = {
                    "rating_count": (place_record.get("rating_count") or 1) + 1,
                    "rating_avg": 5.0
                }
                if is_highlight:
                    update_fields["highlight"] = True
                supabase.table("places").update(update_fields).eq("id", place_record["id"]).execute()
            except Exception as e:
                print(f"   ⚠️ Yorum ekleme hatası: {e}")

    # sync_state güncelle
    state["mekanlar"] = max(state.get("mekanlar", 0), max_id_seen)
    with open(STATE_FILE, 'w', encoding='utf-8') as f:
        json.dump(state, f, ensure_ascii=False, indent=2)

    if should_disconnect:
        await client.disconnect()
        
    print("\n" + "=" * 60, flush=True)
    print(f"🎉 Helal Mekanlar Senkronizasyonu Tamamlandı!", flush=True)
    print(f"📊 Yeni Eklenen Mekan: {added_count} adet", flush=True)
    print(f"💬 Eklenen Topluluk Yorumu: {review_count} adet", flush=True)
    print("=" * 60, flush=True)

if __name__ == '__main__':
    # Opsiyonel: Son 40 mesajı test etmek için min_id=10210 verebiliriz
    import sys
    min_id = int(sys.argv[1]) if len(sys.argv) > 1 else None
    asyncio.run(sync_helal_group(limit=30, force_min_id=min_id))
