'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'

interface Comment {
  id: number
  author_name: string
  content: string
  created_at: string
}

interface CommentsListProps {
  workId: number
  refresh?: number // refetch trigger
}

export function CommentsList({ workId, refresh }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchComments()
  }, [workId, refresh])

  async function fetchComments() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`/api/comments?workId=${workId}`)
      if (!response.ok) throw new Error('Yorumlar yüklenemedi')
      const data = await response.json()
      setComments(data.comments || [])
    } catch (err) {
      console.error('Error fetching comments:', err)
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Az önce'
    if (diffMins < 60) return `${diffMins} dakika önce`
    if (diffHours < 24) return `${diffHours} saat önce`
    if (diffDays < 7) return `${diffDays} gün önce`
    
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchComments}
          className="text-blue-600 hover:underline mt-2 text-sm"
        >
          Yeniden dene
        </button>
      </div>
    )
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <MessageCircle size={32} className="mx-auto mb-2 opacity-50" />
        <p>Henüz yorum yok. İlk yorum yapan siz olun!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={20} className="text-blue-600" />
        <h3 className="font-semibold text-gray-800">
          Yorumlar ({comments.length})
        </h3>
      </div>

      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-900">
                  {comment.author_name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDate(comment.created_at)}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {comment.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
