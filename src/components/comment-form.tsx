'use client'

import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface CommentFormProps {
  workId: number
  onCommentAdded?: () => void
}

export function CommentForm({ workId, onCommentAdded }: CommentFormProps) {
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validasyon
    if (!authorName.trim()) {
      setError('Adınızı giriniz')
      return
    }
    if (!content.trim() || content.trim().length < 2) {
      setError('Yorum en az 2 karakter olmalı')
      return
    }
    if (content.trim().length > 500) {
      setError('Yorum en fazla 500 karakter olabilir')
      return
    }

    try {
      setLoading(true)
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workId,
          authorName: authorName.trim(),
          content: content.trim(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Yorum eklenemedi')
      }

      setSuccess(true)
      setAuthorName('')
      setContent('')
      
      // 2 saniye sonra success mesajını kapat
      setTimeout(() => setSuccess(false), 2000)
      
      // Yorumları yenile
      onCommentAdded?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          placeholder="Adınız"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          maxLength={100}
        />
      </div>

      <div>
        <textarea
          placeholder="Yorumunuzu yazınız (en fazla 500 karakter)..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={loading}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
          maxLength={500}
        />
        <div className="text-xs text-gray-500 mt-1">
          {content.length}/500
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
          ✓ Yorumunuz eklendi!
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors w-full justify-center"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send size={16} />
            Yorum Gönder
          </>
        )}
      </button>
    </form>
  )
}
