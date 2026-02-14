'use client'

import React, { createContext, useContext, useState, useRef, ReactNode, useCallback, useEffect } from 'react'

interface AudioTrack {
  id: number
  title: string
  author: string
  audioUrl: string
  content: string
}

interface AudioContextType {
  currentTrack: AudioTrack | null
  isPlaying: boolean
  currentTime: number
  duration: number
  
  playTrack: (track: AudioTrack) => void
  pauseTrack: () => void
  resumeTrack: () => void
  stopTrack: () => void
  seekTo: (time: number) => void
  
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // localStorage'den audio state'i restore et
  useEffect(() => {
    try {
      const stored = localStorage.getItem('musikStorage')
      if (stored) {
        const state = JSON.parse(stored)
        if (state.currentTrack) {
          setCurrentTrack(state.currentTrack)
        }
      }
    } catch (error) {
      console.error('Failed to restore audio state', error)
    }
  }, [])

  // currentTrack değişince localStorage'e save et
  useEffect(() => {
    try {
      localStorage.setItem('musikStorage', JSON.stringify({ currentTrack }))
    } catch (error) {
      console.error('Failed to save audio state', error)
    }
  }, [currentTrack])

  // currentTrack restorlandığında audio src'ını set et ve play et
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = currentTrack.audioUrl
      audioRef.current.play().catch(() => {
        // Autoplay fail edebilir, silent ignore
        setIsPlaying(false)
      })
      setIsPlaying(true)
    }
  }, [currentTrack])

  const playTrack = useCallback((track: AudioTrack) => {
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl
      audioRef.current.play()
      setCurrentTrack(track)
      setIsPlaying(true)
    }
  }, [])

  const pauseTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  const resumeTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }, [])

  const stopTrack = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setCurrentTrack(null)
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [])

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        playTrack,
        pauseTrack,
        resumeTrack,
        stopTrack,
        seekTo,
        audioRef,
      }}
    >
      {children}

      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime)
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration)
          }
        }}
        onEnded={() => {
          setIsPlaying(false)
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}
