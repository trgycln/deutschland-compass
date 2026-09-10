import os
import sys
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from telethon import TelegramClient
from telethon.errors import SessionPasswordNeededError
import qrcode

# .env.local dosyasini yukle
env_path = Path(__file__).resolve().parent.parent / '.env.local'
load_dotenv(dotenv_path=env_path)

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')

if not API_ID or not API_HASH:
    print("[Hata] .env.local dosyasinda TELEGRAM_API_ID veya TELEGRAM_API_HASH bulunamadi!")
    sys.exit(1)

SESSION_FILE = Path(__file__).resolve().parent / 'telegram_session'

client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)

async def main():
    await client.connect()
    
    if await client.is_user_authorized():
        me = await client.get_me()
        print("\n[Bilgi] Zaten oturum acilmis durumda!")
        print(f"Hesap: {me.first_name} (@{me.username or ''})")
        await client.disconnect()
        return

    print("QR Kod olusturuluyor, lutfen bekleyin...")
    
    # QR ile giris baslat
    qr = await client.qr_login()
    url = qr.url
    
    # QR kod resmi olustur ve kaydet
    img = qrcode.make(url)
    img_path = Path(__file__).resolve().parent.parent / 'telegram_qr.png'
    img.save(img_path)
    
    # Resmi otomatik olarak kullanicinin ekraninda ac (Windows icin)
    try:
        os.startfile(img_path)
    except Exception:
        pass
        
    print("\n" + "=" * 60)
    print(f"QR KOD RESMI EKRANINIZA OTOMATIK ACILDI.")
    print("=" * 60)
    print("Resim acilmadiysa projenin klasorundeki 'telegram_qr.png' dosyasina tiklayin.")
    print("\nLutfen su adimlari uygulayin:")
    print("1. Telefonunuzdan Telegram uygulamasini acin.")
    print("2. Ayarlar (Einstellungen) kismina girin.")
    print("3. Cihazlar (Gerate) kismina girin.")
    print("4. 'Masaustu Cihazi Bagla' (Desktop-Gerat verknupfen) butonuna basin.")
    print("5. Ekranda acilan telegram_qr.png resmindeki QR kodu telefonunuza okutun.")
    print("=" * 60)
    print("\nQR Kod okutulmasi bekleniyor... Lutfen telefonunuza okutun (2 dakika sureniz var)")
    
    try:
        # Kodun okutulmasini asenkron olarak bekle
        await qr.wait(timeout=120)
        print("\nBASARILI! QR kod okutuldu ve giris yapildi!")
        me = await client.get_me()
        print(f"Hesap: {me.first_name} (@{me.username or ''})")
    except SessionPasswordNeededError:
        import getpass
        print("\n[Bilgi] Hesabinizda 2-Asamali Dogrulama (2FA) sifresi var.")
        password = getpass.getpass("Lutfen 2FA Sifrenizi girin: ")
        await client.sign_in(password=password)
        print("Sifre dogrulandi, giris basarili!")
    except Exception as e:
        print(f"\n[Hata] Giris basarisiz oldu veya zaman asimina ugradi: {e}")
    finally:
        await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
