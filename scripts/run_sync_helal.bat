@echo off
chcp 65001 > nul
echo =======================================================
echo 🍽️ Deutschland Compass - Helal Mekanlar Telegram Senkronizasyonu
echo =======================================================
echo.
python "%~dp0sync_helal_places.py"
echo.
echo İşlem tamamlandı. Çıkmak için bir tuşa basın...
pause > nul
