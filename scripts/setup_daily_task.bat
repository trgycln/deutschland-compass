@echo off
chcp 65001 > nul
echo Windows Görev Zamanlayıcısına Günlük Senkronizasyon Ekleniyor...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0setup_daily_task.ps1"
echo.
echo Tamamlandı. Bir tuşa basarak çıkabilirsiniz.
pause > nul
