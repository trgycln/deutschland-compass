@echo off
setlocal
chcp 65001 > nul
title Deutschland Compass - Genel Senkronizasyon (Topluluk, Helal Mekanlar, Gurbet Kalemleri)
echo ===================================================================
echo   DEUTSCHLAND COMPASS - TUM KANALLAR TEK SENKRONIZASYON
echo   - Kariyer ve Yasam Gruplari (Ansiklopedi Sentezleme)
echo   - Helal Mekanlar ve Restoranlar (Konum ve Yorumlar)
echo   - Gurbet Kalemleri (Siirler, Duz Yazilar ve Faydali Linkler)
echo ===================================================================
echo.
python "%~dp0telegram_sync.py"
echo.
echo ===================================================================
echo Tum senkronizasyon islemleri tamamlandi. Cikmak icin bir tusa basin...
echo ===================================================================
pause > nul
