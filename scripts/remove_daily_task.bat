@echo off
chcp 65001 > nul
echo Windows Görev Zamanlayıcısından Günlük Görev Kaldırılıyor...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Unregister-ScheduledTask -TaskName 'DeutschlandCompassDailySync' -Confirm:$false"
echo.
echo Görev kaldırıldı. Bir tuşa basarak çıkabilirsiniz.
pause > nul
