#!/usr/bin/env node

/**
 * Basit Audio Yükleme Scripti
 * 
 * Kullanım:
 * npm run upload-audio -- --id=93 --file=path/to/audio.mp3
 * 
 * CSV dosyasından toplu yükleme:
 * npm run upload-audio -- --csv=uploads.csv
 * 
 * CSV format:
 * work_id,file_path
 * 93,./audios/poem1.mp3
 * 91,./audios/poem2.mp3
 */

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const FormData = require('form-data')

const API_URL = process.env.API_URL || 'http://localhost:3000'
const args = process.argv.slice(2)

async function uploadAudio(workId, filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Dosya bulunamadı: ${filePath}`)
      return false
    }

    const fileSize = fs.statSync(filePath).size
    if (fileSize > 50 * 1024 * 1024) {
      console.error(`❌ Dosya çok büyük (${filePath}): ${(fileSize / 1024 / 1024).toFixed(2)}MB`)
      return false
    }

    const formData = new FormData()
    formData.append('file', fs.createReadStream(filePath))
    formData.append('workId', workId.toString())

    console.log(`📤 Yükleniyor: ${filePath} (Eser ID: ${workId})...`)

    const response = await fetch(`${API_URL}/api/audio`, {
      method: 'POST',
      body: formData,
      headers: formData.getHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error(`❌ Yükleme başarısız (${filePath}):`, error.error)
      return false
    }

    const data = await response.json()
    console.log(`✅ Başarılı (${filePath}): ${data.audioUrl}`)
    return true
  } catch (err) {
    console.error(`❌ Hata (${filePath}):`, err.message)
    return false
  }
}

async function main() {
  let uploads = []

  // Tek dosya yükleme
  const idArg = args.find((a) => a.startsWith('--id='))
  const fileArg = args.find((a) => a.startsWith('--file='))

  if (idArg && fileArg) {
    const workId = parseInt(idArg.split('=')[1])
    const filePath = fileArg.split('=')[1]
    uploads.push({ workId, filePath })
  }

  // CSV dosyasından toplu yükleme
  const csvArg = args.find((a) => a.startsWith('--csv='))
  if (csvArg) {
    const csvPath = csvArg.split('=')[1]
    try {
      const content = fs.readFileSync(csvPath, 'utf-8')
      const lines = content.split('\n').slice(1) // header'ı atla
      uploads = lines
        .filter((line) => line.trim())
        .map((line) => {
          const [workId, filePath] = line.split(',').map((s) => s.trim())
          return { workId: parseInt(workId), filePath }
        })
    } catch (err) {
      console.error('CSV okunamadı:', err.message)
      return
    }
  }

  if (uploads.length === 0) {
    console.log(`
Ses Dosyası Yükleme Scripti

Kullanım:
  node scripts/upload-audio.js --id=93 --file=./audios/poem.mp3
  node scripts/upload-audio.js --csv=./uploads.csv

CSV Beispiel:
  work_id,file_path
  93,./audios/poem1.mp3
  91,./audios/poem2.mp3
    `)
    return
  }

  console.log(`\n📢 ${uploads.length} dosya yüklenecek...\n`)

  let success = 0
  for (const { workId, filePath } of uploads) {
    if (await uploadAudio(workId, filePath)) {
      success++
    }
    // Rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log(`\n✅ Tamamlandı: ${success}/${uploads.length} başarılı`)
}

main().catch(console.error)
