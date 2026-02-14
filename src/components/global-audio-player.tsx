'use client'

import { useAudio } from '@/context/AudioContext'
import { Play, Pause, X, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const

export function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, currentTime, duration, pauseTrack, resumeTrack, stopTrack, seekTo } = useAudio()
  const [isDragging, setIsDragging] = useState(false)

  if (!currentTrack) {
    return null
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    seekTo(percent * duration)
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl z-40">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Album Art / Info */}
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate" style={accentStyle}>
                {currentTrack.title}
              </p>
              <p className="text-xs text-blue-100 truncate" style={serifStyle}>
                {currentTrack.author}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => (isPlaying ? pauseTrack() : resumeTrack())}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>

            <button
              onClick={() => stopTrack()}
              className="p-2 hover:bg-white/20 rounded-lg transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-blue-100 w-8 text-right">{formatTime(currentTime)}</span>
            <div
              className="h-1 bg-white/30 rounded-full cursor-pointer w-24 hover:h-1.5 transition-all"
              onClick={handleProgressClick}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{
                  width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                  pointerEvents: 'none',
                }}
              />
            </div>
            <span className="text-xs text-blue-100 w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="sm:hidden mt-2">
          <div
            className="h-1 bg-white/30 rounded-full cursor-pointer w-full hover:h-1.5 transition-all"
            onClick={handleProgressClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                pointerEvents: 'none',
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-blue-100 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
