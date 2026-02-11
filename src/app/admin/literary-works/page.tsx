'use client'

import { useState, useEffect } from 'react'
import { Loader2, Trash2, Book, Search, X } from 'lucide-react'

interface LiteraryWork {
  id: number
  title: string
  author: string
  type: string
  date: string
  audio_url?: string
}

export default function AdminLiteraryWorksPage() {
  const [works, setWorks] = useState<LiteraryWork[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
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

  async function handleDelete(workId: number, title: string) {
    if (!confirm(`"${title}" başlıklı eseri silmek istediğinize emin misiniz?`)) return

    try {
      setDeletingId(workId)
      setDeleteError(null)

      const response = await fetch(`/api/literary-works/delete?id=${workId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Silme başarısız')
      }

      // Listeyi güncelle
      setWorks(works.filter(w => w.id !== workId))
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Hata oluştu')
    } finally {
      setDeletingId(null)
    }
  }

  const filteredWorks = works.filter(work =>
    work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    work.id.toString().includes(searchQuery)
  )

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-3">
            <Book className="w-10 h-10 text-blue-600" />
            Şiir Yönetim Paneli
          </h1>
          <p className="text-slate-600 mt-2">
            Şiirleri görüntüleyin ve silmek istediğiniz eserleri kaldırın
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {deleteError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700">
            {deleteError}
          </div>
        )}

        {/* Search */}
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

        {/* Works Grid */}
        <div className="space-y-4">
          {filteredWorks.length === 0 ? (
            <div className="text-center py-12">
              <Book className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">
                {searchQuery ? 'Arama sonuçlarına göre eser bulunamadı' : 'Eser bulunamadı'}
              </p>
            </div>
          ) : (
            filteredWorks.map((work) => (
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
                      ID: {work.id} • Tarih: {work.date}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {work.audio_url ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Sesli
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                        Sesiz
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(work.id, work.title)}
                    disabled={deletingId === work.id}
                    className="px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition flex items-center gap-2 disabled:opacity-50"
                  >
                    {deletingId === work.id ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Siliniyor...
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        Sil
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">Toplam Eser:</span> {works.length} | 
            <span className="font-semibold ml-4">Sesli Eserler:</span> {works.filter(w => w.audio_url).length}
          </p>
        </div>
      </div>
    </div>
  )
}
