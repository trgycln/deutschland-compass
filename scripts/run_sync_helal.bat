@echo off
chcp 65001 > nul
title Deutschland Compass - Helal Mekanlar Telegram Senkronizasyonu
echo ===================================================================
echo 🍽️ Deutschland Compass - Helal Mekanlar Telegram Senkronizasyonu
echo ===================================================================
echo.
echo [1] Normal Senkronizasyon (Sadece yeni gelen son mesajları tara)
echo [2] Test ve Geriye Dönük Tarama (Son 50 mesajı tekrar kontrol et)
echo.
set /p SECIM="Seciminiz (1 veya 2, varsayilan 1): "

if "%SECIM%"=="2" (
    echo.
    echo 🔄 Geriye donuk son mesajlar taranarak yeni mekanlar araniyor...
    python "%~dp0sync_helal_places.py" 10200
) else (
    echo.
    echo 📡 Yeni paylasilan mesajlar taranıyor...
    python "%~dp0sync_helal_places.py"
)

echo.
echo ===================================================================
echo Islem tamamlandi. Cikmak icin bir tusa basin...
pause > nul
