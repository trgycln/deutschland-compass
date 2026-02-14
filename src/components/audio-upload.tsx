'use client'

import { useState } from 'react'
import { Upload, X, Loader2, Check } from 'lucide-react'

interface AudioUploadProps {
  workId: number
  onUploadSuccess?: (audioUrl: string) => void
}

export function AudioUpload({ workId, onUploadSuccess }: AudioUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setSuccess(false)

    if (!selectedFile) {
      setFile(null)
      return
    }

    // Dosya tipi kontrolü
    if (!selectedFile.type.includes('audio')) {
      setError('Lütfen ses dosyası (MP3, WAV, vb.) seçiniz')
      setFile(null)
      return
    }

    // Dosya boyutu kontrolü (50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      setError('Dosya 50MB\'dan küçük olmalı')
      setFile(null)
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploading(true)
      setError(null)
      setSuccess(false)

      const signResponse = await fetch('/api/audio/signed-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId, fileName: file.name }),
      })

      if (!signResponse.ok) {
        const text = await signResponse.text()
        throw new Error(text || 'Yükleme linki oluşturulamadı')
      }

      const signData = await signResponse.json()

      const uploadResponse = await fetch(signData.signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type || 'audio/mpeg',
        },
        body: file,
      })

      if (!uploadResponse.ok) {
        const text = await uploadResponse.text()
        throw new Error(text || 'Dosya yüklenemedi')
      }

      const response = await fetch('/api/audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId, publicUrl: signData.publicUrl }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(text || 'Ses kaydı güncellenemedi')
      }

      const data = await response.json()
      setSuccess(true)
      setFile(null)
      onUploadSuccess?.(data.audioUrl)

      // 3 saniye sonra success mesajını kapat
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
      <h4 className="font-semibold text-blue-900 mb-3">
        🎵 Sesli Versiyon Yükle
      </h4>

      {!file ? (
        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition">
          <div className="text-center">
            <Upload size={24} className="mx-auto mb-2 text-blue-600" />
            <span className="text-sm text-blue-900">
              MP3 dosyasını buraya sürükle veya tıkla
            </span>
            <span className="text-xs text-blue-700 block mt-1">
              (Maksimum 50MB)
            </span>
          </div>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="space-y-3">
          <div className="bg-white rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              disabled={uploading}
              className="p-1 hover:bg-red-100 rounded text-red-600 disabled:opacity-50"
            >
              <X size={18} />
            </button>
          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`w-full py-2 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              uploading
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Yükleniyor...
              </>
            ) : (
              <>
                <Upload size={18} />
                Yükle
              </>
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="mt-3 text-sm text-green-600 bg-green-50 p-2 rounded flex items-center gap-2">
          <Check size={16} />
          Ses dosyası başarıyla yüklendi!
        </div>
      )}
    </div>
  )
}
