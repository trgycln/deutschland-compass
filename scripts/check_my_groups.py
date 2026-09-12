#!/usr/bin/env python3
"""
Deutschlandcompass - Telegram Grup Katılım Takipçisi

Bu script:
1. Aktif Telegram oturumunuzu açar.
2. Sitedeki 91 resmi Telegram grubundan hangilerine katıldığınızı canlı kontrol eder.
3. Henüz katılmadığınız grupları ve doğrudan davet linklerini listeler.
"""

import os
import sys
import asyncio
from pathlib import Path
from telethon import TelegramClient

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Add scripts to path for catalog
sys.path.append(str(Path(__file__).resolve().parent))
from telegram_catalog import GROUP_CATALOG, find_category_for_dialog

API_ID = os.getenv("TELEGRAM_API_ID", "24803923")
API_HASH = os.getenv("TELEGRAM_API_HASH", "2ff1b47427181c0022d48074d0d0eb3f")
SESSION_FILE = Path(__file__).resolve().parent / "telegram_session"

async def check_groups():
    if not SESSION_FILE.with_suffix('.session').exists():
        print("❌ Hata: Telegram oturumu bulunamadı. Lütfen önce QR kod ile giriş yapın.")
        return

    client = TelegramClient(str(SESSION_FILE), int(API_ID), API_HASH)
    await client.connect()

    if not await client.is_user_authorized():
        print("❌ Telegram oturumu yetkili değil.")
        return

    me = await client.get_me()
    print("=" * 60)
    print(f"👤 Aktif Hesap: {me.first_name} {me.last_name or ''} (@{me.username or 'kullanıcı adı yok'})")
    print("=" * 60)

    dialogs = await client.get_dialogs()
    user_dialog_titles = [d.name for d in dialogs if d.is_group or d.is_channel]

    joined_list = []
    missing_list = []

    for item in GROUP_CATALOG:
        matched_dialog = None
        for title in user_dialog_titles:
            cat = find_category_for_dialog(title)
            if cat and cat["id"] == item["id"]:
                matched_dialog = title
                break
        
        if matched_dialog:
            joined_list.append((item, matched_dialog))
        else:
            missing_list.append(item)

    total_catalog = len(GROUP_CATALOG)
    joined_count = len(joined_list)
    percentage = int((joined_count / total_catalog) * 100) if total_catalog else 0

    print(f"\n📊 DURUM RAPORU: {joined_count} / {total_catalog} Grup Tamamlandı (%{percentage})\n")

    print("✅ ÜYE OLDUĞUNUZ GRUPLAR:")
    for idx, (item, dialog_title) in enumerate(joined_list, 1):
        print(f"  {idx:2d}. {dialog_title}  --> [{item['category_title']}]")

    if missing_list:
        print("\n" + "-" * 60)
        print(f"⏳ HENÜZ KATILMADIĞINIZ GRUPLAR ({len(missing_list)} adet):")
        print("Aşağıdaki bağlantılara tıklayarak hızlıca katılabilirsiniz:\n")
        for idx, item in enumerate(missing_list, 1):
            print(f"  {idx:2d}. {item['title']}")
            print(f"      🔗 Link: {item['url']}")
            print(f"      📍 Sayfa: {item['category_title']}\n")

    print("=" * 60)
    await client.disconnect()

if __name__ == "__main__":
    asyncio.run(check_groups())
