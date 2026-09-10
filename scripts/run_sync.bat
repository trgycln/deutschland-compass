@echo off
chcp 65001 > nul
echo =======================================================
echo 🧭 Deutschlandcompass - Telegram Topluluk Senkronizasyonu
echo =======================================================
echo.
python "%~dp0telegram_sync.py"
echo.
echo İşlem tamamlandı. Çıkmak için bir tuşa basın...
pause > nul
