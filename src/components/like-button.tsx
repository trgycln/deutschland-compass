'use client'

import { useState, useEffect } from 'react'
import { Heart } from 'lucide-react'

interface LikeButtonProps {
  workId: number
}

export function LikeButton({ workId }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0)
  const [userLiked, setUserLiked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLikeStatus()
  }, [workId])

  async function fetchLikeStatus() {
    try {
      setError(null)
      const response = await fetch(`/api/likes?workId=${workId}`)
      if (!response.ok) throw new Error('Failed to fetch likes')
      const data = await response.json()
      setLikeCount(data.count || 0)
      setUserLiked(data.userLiked || false)
    } catch (err) {
      console.error('Error fetching likes:', err)
      setError('Beğeni yüklenemedi')
    }
  }

  async function handleLike() {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId }),
      })

      if (!response.ok) throw new Error('Failed to process like')

      const data = await response.json()
      setLikeCount(data.count || 0)
      setUserLiked(data.userLiked || false)
    } catch (err) {
      console.error('Error:', err)
      setError('Beğeni işlenemiyor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
          userLiked
            ? 'bg-red-100 text-red-600 hover:bg-red-200'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        } disabled:opacity-50`}
      >
        <Heart
          size={18}
          className={userLiked ? 'fill-current' : ''}
        />
        <span className="text-sm font-medium">{likeCount}</span>
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}
