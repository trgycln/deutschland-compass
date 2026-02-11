'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash2, Upload, Music, Search, X } from 'lucide-react'

interface LiteraryWork {
  id: number
  title: string
  author: string
  type: string
  audio_url?: string
}

export default function AdminAudioPage() {
  const [works, setWorks] = useState<LiteraryWork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploadingId, setUploadingId] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    console.log('AdminAudioPage mounted')
    fetchWorks()
  }, [])

  async function fetchWorks() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/literary-works')
      if (!response.ok) throw new Error('Eserler yüklenemedi')
      const data = await response.json()
      setWorks(data.works || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  async function handleFileUpload(
    workId: number,
    file: File
  ) {
    try {
      setUploadError(null)
      
      console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size,
      })

      // MIME type'ına veya dosya uzantısına göre kontrol et
      const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'webm', 'mpeg', 'm4a']
      const fileName = file.name.toLowerCase()
      const fileExtension = fileName.split('.').pop() || ''
      const isAudioMimeType = file.type.includes('audio')
      const isAudioExtension = audioExtensions.includes(fileExtension)
      
      console.log('File validation:', {
        fileExtension,
        isAudioMimeType,
        isAudioExtension,
      })
      
      if (!isAudioMimeType && !isAudioExtension) {
        const error = 'Lütfen ses dosyası seçiniz (MP3, MPEG, WAV, OGG, FLAC, vb.)'
        console.log('Validation failed:', error)
        setUploadError(error)
        return
      }

      if (file.size > 50 * 1024 * 1024) {
        setUploadError('Dosya 50MB\'dan küçük olmalı')
        return
      }

      setUploadingId(workId)

      const formData = new FormData()
      formData.append('file', file)
      formData.append('workId', workId.toString())

      const response = await fetch('/api/audio', {
        method: 'POST',
        body: formData,
      })

      console.log('Upload response status:', response.status)

      if (!response.ok) {
        const data = await response.json()
        const errorMsg = data.error || 'Yükleme başarısız'
        console.log('Upload error:', errorMsg)
        throw new Error(errorMsg)
      }
      
      const data = await response.json()
      console.log('Upload success:', data)

      // Listeyi yenile
      await fetchWorks()
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Hata oluştu'
      console.error('Upload exception:', err)
      setUploadError(errorMsg)
    } finally {
      setUploadingId(null)
    }
  }

  async function handleDelete(workId: number, audioUrl: string) {
    if (!confirm('Ses dosyasını silmek istediğinize emin misiniz?')) return

    try {
      setUploadingId(workId)
      setUploadError(null)

      const response = await fetch(
        `/api/audio?workId=${workId}&audioUrl=${encodeURIComponent(audioUrl)}`,
        {
          method: 'DELETE',
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Silme başarısız')
      }

      // Listeyi yenile
      await fetchWorks()
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Hata oluştu')
    } finally {
      setUploadingId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Eserler yükleniyor...</p>
        </div>
      </div>
    )
  }

  const filteredWorks = works.filter(work =>
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.id.toString().includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Music className="w-10 h-10 text-blue-600" />
            Şiir Audio Yönetim Paneli
          </h1>
          <p className="text-slate-600 mt-2">
            Şiirlere ses dosyası yükleyin ve yönetin
          </p>
        </div>

        <div className="mb-8 relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Şiir başlığı, yazar ya da ID'ye göre ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-slate-600 mt-2">
              {filteredWorks.length} / {works.length} eser bulundu
            </p>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {uploadError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
            {uploadError}
          </div>
        )}

        <div className="grid gap-4">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {work.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    {work.author} • {work.type}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    ID: {work.id}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {work.audio_url ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      Ses var
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                      Ses yok
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex-1 relative cursor-pointer" htmlFor={`file-input-${work.id}`}>
                  <input
                    id={`file-input-${work.id}`}
                    type="file"
                    accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/flac,audio/aac,audio/webm,.mp3,.wav,.ogg,.flac,.aac,.webm"
                    onChange={(e) => {
                      console.log('File input changed:', e.target.files)
                      const file = e.target.files?.[0]
                      if (file) {
                        console.log('File selected, calling handleFileUpload:', file.name)
                        handleFileUpload(work.id, file)
                      } else {
                        console.log('No file selected')
                      }
                    }}
                    disabled={uploadingId === work.id}
                    className="hidden"
                  />
                  <div
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed transition ${
                      uploadingId === work.id
                        ? 'bg-slate-100 border-slate-300 text-slate-500'
                        : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50 text-blue-600'
                    }`}
                  >
                    {uploadingId === work.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Yükleniyor...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Ses Dosyası Seç
                      </>
                    )}
                  </div>
                </label>

                {work.audio_url && (
                  <button
                    onClick={() => handleDelete(work.id, work.audio_url!)}
                    disabled={uploadingId === work.id}
                    className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Sil
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <Music className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">
              {searchQuery ? 'Arama sonuçlarına göre eser bulunamadı' : 'Eser bulunamadı'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
