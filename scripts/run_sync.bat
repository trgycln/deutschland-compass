@echo off
setlocal
chcp 65001 > nul
title Deutschland Compass - Genel Senkronizasyon (Topluluk & Helal Mekanlar)
echo ===================================================================
echo   DEUTSCHLAND COMPASS - TOPLULUK VE MEKAN SENKRONIZASYONU
echo ===================================================================
echo.
echo [1/2] Telegram Topluluk ve Kariyer Gruplari Senkronize Ediliyor...
echo -------------------------------------------------------------------
python "%~dp0telegram_sync.py"
echo.
echo -------------------------------------------------------------------
echo [2/2] Sehirlerdeki Helal Mekanlar Senkronize Ediliyor...
echo -------------------------------------------------------------------
python "%~dp0sync_helal_places.py"
echo.
echo ===================================================================
echo Tum senkronizasyon islemleri tamamlandi. Cikmak icin bir tusa basin...
echo ===================================================================
pause > nul
