@echo off
setlocal
chcp 65001 > nul
set "PROJECT_DIR=%~dp0.."
cd /d "%PROJECT_DIR%"
set "LOG_FILE=%~dp0sync_daily.log"

echo =================================================================== >> "%LOG_FILE%"
echo [%DATE% %TIME%] Gunluk Senkronizasyon Baslatildi >> "%LOG_FILE%"
echo =================================================================== >> "%LOG_FILE%"

python "%~dp0telegram_sync.py" >> "%LOG_FILE%" 2>&1

echo [%DATE% %TIME%] Senkronizasyon Tamamlandi. Exit Code: %ERRORLEVEL% >> "%LOG_FILE%"
echo. >> "%LOG_FILE%"
