'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Loader2 } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl: string
  title?: string
  workId?: number
}

export function AudioPlayer({ audioUrl, title, workId }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasLoggedRef = useRef(false)

  useEffect(() => {
    console.log('AudioPlayer mounted with audioUrl:', audioUrl)
  }, [audioUrl])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleGlobalPlay = (event: Event) => {
      const customEvent = event as CustomEvent<HTMLAudioElement>
      if (customEvent.detail !== audio) {
        audio.pause()
      }
    }

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handlePlay = () => {
      setIsPlaying(true)
      if (!workId || hasLoggedRef.current) return
      hasLoggedRef.current = true

      fetch('/api/listens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workId }),
      }).catch(() => undefined)
      window.dispatchEvent(new CustomEvent('global-audio-play', { detail: audio }))
    }
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)
    window.addEventListener('global-audio-play', handleGlobalPlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
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

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200 shadow-sm">
      <audio
        ref={audioRef}
        src={audioUrl}
        onError={() => {
          setIsPlaying(false)
          setIsLoading(false)
        }}
      />

      {title && (
        <h3 className="text-sm font-semibold text-amber-900 mb-4">
          🎵 Sesli Versiyon
        </h3>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          disabled={isLoading}
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isLoading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isPlaying
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-amber-600 text-white hover:bg-amber-700'
          }`}
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : isPlaying ? (
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
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-amber-300 rounded-lg appearance-none cursor-pointer accent-amber-700"
          />
          <div className="flex justify-between mt-1 text-xs text-amber-900">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Volume2 size={16} className="text-amber-700" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-2 bg-amber-300 rounded-lg appearance-none cursor-pointer accent-amber-700"
          />
        </div>
      </div>
    </div>
  )
}
