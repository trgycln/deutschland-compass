# Deutschland Compass - Otomatik Günlük Senkronizasyon Kurulumu (Windows Görev Zamanlayıcı)
$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$batPath = Join-Path $scriptDir "run_daily_sync.bat"
$taskName = "DeutschlandCompassDailySync"

Write-Host "=== Deutschland Compass Günlük Senkronizasyon Kurulumu ===" -ForegroundColor Cyan
Write-Host "Hedef Script: $batPath"

$action = New-ScheduledTaskAction -Execute $batPath
$trigger = New-ScheduledTaskTrigger -Daily -At 4am
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null

Write-Host "✅ Görev başarıyla oluşturuldu/güncellendi: $taskName" -ForegroundColor Green
Write-Host "⏰ Çalışma zamanı: Her gün saat 04:00 (Bilgisayar kapalıysa açıldığında otomatik çalışır)" -ForegroundColor Yellow
Write-Host "📄 Çalışma logları: $scriptDir\sync_daily.log" -ForegroundColor Gray
