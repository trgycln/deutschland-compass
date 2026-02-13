'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Loader2 } from 'lucide-react'

interface AudioPlayerCompactProps {
  audioUrl: string
  title?: string
  workId?: number
}

export function AudioPlayerCompact({ audioUrl, title, workId }: AudioPlayerCompactProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasLoggedRef = useRef(false)

  const logListen = async () => {
    if (!workId || hasLoggedRef.current) return
    hasLoggedRef.current = true

    try {
      await fetch('/api/listens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId }),
      })
    } catch {
      // Ignore logging errors
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleGlobalPlay = (event: Event) => {
      const customEvent = event as CustomEvent<HTMLAudioElement>
      if (customEvent.detail !== audio) {
        audio.pause()
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setIsLoading(false)
      logListen()
      window.dispatchEvent(new CustomEvent('global-audio-play', { detail: audio }))
    }
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    window.addEventListener('global-audio-play', handleGlobalPlay)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
      window.removeEventListener('global-audio-play', handleGlobalPlay)
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src={audioUrl}
        onError={() => {
          setIsPlaying(false)
          setIsLoading(false)
        }}
      />

      <button
        onClick={togglePlay}
        disabled={isLoading}
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
          isLoading
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : isPlaying
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : isPlaying ? (
          <Pause size={16} />
        ) : (
          <Play size={16} className="ml-0.5" />
        )}
      </button>

      {title && (
        <span className="text-xs text-stone-600 truncate flex-1">
          🎵 {title}
        </span>
      )}
    </div>
  )
}
