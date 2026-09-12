import os
import sys
import asyncio
from telethon import TelegramClient
from telethon.tl.types import Channel, Chat

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# .env configuration
API_ID_STR = os.getenv("TELEGRAM_API_ID", "24803923")
API_HASH = os.getenv("TELEGRAM_API_HASH", "2ff1b47427181c0022d48074d0d0eb3f")

SESSION_PATH = os.path.join(os.path.dirname(__file__), "telegram_session.session")

async def main():
    if not os.path.exists(SESSION_PATH):
        print(f"Hata: Oturum dosyası bulunamadı ({SESSION_PATH})")
        return

    client = TelegramClient(SESSION_PATH[:-8], int(API_ID_STR), API_HASH)
    await client.connect()

    if not await client.is_user_authorized():
        print("Telegram oturumu yetkili değil.")
        return

    me = await client.get_me()
    print(f"Giriş Yapılan Hesap: {me.first_name} {me.last_name or ''} (@{me.username or 'kullanıcı adı yok'})")
    print("-" * 50)
    print("Üye Olunan Gruplar ve Kanallar Çekiliyor...\n")

    count = 0
    dialogs = await client.get_dialogs()
    for d in dialogs:
        if d.is_group or d.is_channel:
            count += 1
            print(f"{count}. [ID: {d.id}] {d.title} (Tip: {'Grup/SüperGrup' if d.is_group else 'Kanal'})")

    print(f"\nToplam {count} adet grup/kanal bulundu!")
    await client.disconnect()

if __name__ == "__main__":
    asyncio.run(main())
