#!/usr/bin/env python3
"""
Deutschlandcompass - Telegram İlk Giriş ve Oturum Başlatma Scripti
Bu script sadece İLK KEZ çalıştırılır ve Telegram hesabınızı güvenle bağlar.
Oturum 'scripts/telegram_session.session' dosyasına kaydedilir ve sonrasında
hiçbir kod/şifre sormadan otomatik çalışır.
"""

import os
import sys
import getpass
from pathlib import Path
from dotenv import load_dotenv
from telethon.sync import TelegramClient
from telethon.errors import (
    SessionPasswordNeededError,
    PhoneCodeInvalidError,
    PhoneNumberInvalidError,
    FloodWaitError
)

# .env.local dosyasını yükle
env_path = Path(__file__).resolve().parent.parent / '.env.local'
load_dotenv(dotenv_path=env_path)

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')

if not API_ID or not API_HASH:
    print("❌ Hata: .env.local dosyasında TELEGRAM_API_ID veya TELEGRAM_API_HASH bulunamadı!")
    sys.exit(1)

SESSION_FILE = Path(__file__).resolve().parent / 'telegram_session'

print("=" * 60)
print("DEUTSCHLANDCOMPASS - TELEGRAM HESAP BAGLANTISI")
print("=" * 60)
print(f"API ID : {API_ID}")
print("Mod    : Salt-Okunur (Read-Only)")
print("=" * 60)

client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)

def main():
    client.connect()
    
    if client.is_user_authorized():
        me = client.get_me()
        print("\n[Bilgi] Zaten oturum acilmis durumda!")
        print(f"Giris Yapilan Hesap: {me.first_name} {me.last_name or ''} (@{me.username or 'Kullanici adi yok'})")
        print(f"Oturum Dosyasi     : {SESSION_FILE}.session")
        client.disconnect()
        return

    print("\nAdim 1: Telefon Numaranizi Girin")
    print("Ornek: +491701234567 (Almanya) veya +905321234567 (Turkiye)")
    print("Not: Basinda mutlaka '+' ve ulke kodu olmali, bosluk birakilmamalidir.\n")
    
    phone = input("Telefon Numaraniz: ").strip().replace(" ", "").replace("-", "")
    
    if not phone.startswith("+"):
        print("[Hata] Numaranin basinda '+' ulke kodu olmalidir! (Orn: +49 veya +90)")
        client.disconnect()
        return

    try:
        print(f"\n[Bekleyin] Telegram sunucularina kod istegi gonderiliyor ({phone})...")
        sent_code = client.send_code_request(phone)
        print(f"[Debug] sent_code response: {sent_code}")
        
        print("\n" + "=" * 60)
        print("KOD GONDERILDI!")
        print("=" * 60)
        print("ONEMLI NOT:")
        print("Telegram bu onay kodunu SMS OLARAK DEGIL;")
        print("Telefonunuzda veya bilgisayarinizda acik olan")
        print("TELEGRAM UYGULAMANIZIN ICINDEKI resmi 'Telegram' (mavi tikli) sohbetine gonderir!")
        print("Lutfen Telegram uygulamanizi acip gelen 5 haneli koda bakin.")
        print("=" * 60 + "\n")
        
        code = input("Telegram'dan Gelen 5 Haneli Kod: ").strip()
        
        try:
            client.sign_in(phone=phone, code=code, phone_code_hash=sent_code.phone_code_hash)
        except SessionPasswordNeededError:
            # 2FA Iki Asamali Dogrulama Sifresi Varsa
            print("\n[Bilgi] Hesabinizda Iki Asamali Dogrulama (2FA) sifresi acik.")
            password = getpass.getpass("Telegram 2FA Sifreniz: ")
            client.sign_in(password=password)
            
        me = client.get_me()
        print("\n" + "=" * 60)
        print("TEBRIKLER! TELEGRAM HESABINIZ BASARIYLA BAGLANDI!")
        print(f"Hesap: {me.first_name} {me.last_name or ''} (@{me.username or 'Kullanici adi yok'})")
        print(f"Oturum: {SESSION_FILE}.session")
        print("=" * 60)
        print("\nOturum kaydedildi. Artik arka planda sifresiz/otomatik calisabilir.")
        
    except PhoneNumberInvalidError:
        print("\n[Hata] Girdiginiz telefon numarasi gecersiz veya Telegram'da kayitli degil.")
    except PhoneCodeInvalidError:
        print("\n[Hata] Girdiginiz 5 haneli kod hatali.")
    except FloodWaitError as e:
        print(f"\n[Hata] Cok fazla deneme yapildi. Telegram {e.seconds} saniye beklemenizi istiyor.")
    except Exception as e:
        import traceback
        print(f"\n[Hata] Beklenmeyen bir hata olustu: {e}")
        traceback.print_exc()
    finally:
        client.disconnect()

if __name__ == '__main__':
    main()
