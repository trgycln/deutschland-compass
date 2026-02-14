'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Loader2 } from 'lucide-react'
import { LyricsDialog } from './lyrics-dialog'
import { useAudio } from '@/context/AudioContext'

interface AudioPlayerProps {
  audioUrl: string
  title?: string
  workId?: number
  content?: string
  author?: string
}

export function AudioPlayer({ audioUrl, title, workId, content, author }: AudioPlayerProps) {
  const { currentTrack, isPlaying, currentTime, duration, playTrack, pauseTrack, resumeTrack } = useAudio()
  const [isLoading, setIsLoading] = useState(false)
  const hasLoggedRef = useRef(false)
  const localAudioRef = useRef<HTMLAudioElement>(null)

  // Global audio context ile kontrol et
  const isThisTrackPlaying = currentTrack?.id === workId && isPlaying
  
  const handlePlayClick = () => {
    if (isThisTrackPlaying) {
      pauseTrack()
    } else if (currentTrack?.id === workId) {
      resumeTrack()
    } else {
      // Yeni track başlat
      playTrack({
        id: workId || 0,
        title: title || 'Unknown',
        author: author || 'Unknown',
        audioUrl,
        content: content || '',
      })
      
      // Listen log et
      if (workId && !hasLoggedRef.current) {
        hasLoggedRef.current = true
        fetch('/api/listens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ workId }),
        }).catch(() => undefined)
      }
    }
  }
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
    }
  }

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Global audio işleminde progress'ı güncelle
    // (Global audio player tarafından handle edilecek)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Volume işlemi global audio tarafından handle edilecek
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        {title && (
          <h3 className="text-sm font-semibold text-amber-900">
            🎵 Sesli Versiyon
          </h3>
        )}
        {content && title && (
          <LyricsDialog
            title={title}
            author={author}
            content={content}
            triggerClassName="bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300"
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayClick}
          disabled={isLoading}
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isThisTrackPlaying
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isThisTrackPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-1" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={isThisTrackPlaying ? currentTime : 0}
            onChange={handleProgressChange}
            className="w-full h-2 bg-amber-300 rounded-lg appearance-none cursor-pointer accent-amber-700"
            disabled={!isThisTrackPlaying}
          />
          <div className="flex justify-between mt-1 text-xs text-amber-900">
            <span>{formatTime(isThisTrackPlaying ? currentTime : 0)}</span>
            <span>{formatTime(isThisTrackPlaying ? duration : 0)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Volume2 size={16} className="text-amber-700" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="1"
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-amber-300 rounded-lg appearance-none cursor-pointer accent-amber-700"
          />
        </div>
      </div>
    </div>
  )
}
