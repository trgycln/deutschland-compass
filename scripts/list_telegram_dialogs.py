import os
import sys
import asyncio
import json
from pathlib import Path
from dotenv import load_dotenv
from telethon import TelegramClient

env_path = Path(__file__).resolve().parent.parent / '.env.local'
load_dotenv(dotenv_path=env_path)

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
SESSION_FILE = Path(__file__).resolve().parent / 'telegram_session'

if not SESSION_FILE.with_suffix('.session').exists():
    print("[Hata] telegram_session.session dosyasi bulunamadi. Once login olun.")
    sys.exit(1)

client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)

async def main():
    await client.start()
    print("Telegram hesabiniza baglanildi. Gruplar listeleniyor...\n")
    
    dialogs = await client.get_dialogs()
    
    groups = []
    for d in dialogs:
        if d.is_group or d.is_channel:
            groups.append({
                "id": d.id,
                "title": d.title,
                "is_group": d.is_group,
                "is_channel": d.is_channel,
                "unread_count": d.unread_count
            })
            
    output_file = Path(__file__).resolve().parent / 'my_telegram_groups.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(groups, f, ensure_ascii=False, indent=2)
        
    for i, g in enumerate(groups, 1):
        type_str = "Grup" if g["is_group"] else "Kanal"
        safe_title = g['title'].encode('ascii', errors='replace').decode('ascii')
        print(f"{i:3d}. [{type_str}] {safe_title} (ID: {g['id']})")
    print("-" * 60)
    print(f"\nGruplarin tam listesi '{output_file.name}' dosyasina kaydedildi.")
    await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
