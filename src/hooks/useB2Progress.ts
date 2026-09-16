"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// ============================================================
// Tip tanımlamaları
// ============================================================
export interface B2ModuleProgress {
  totalAttempts: number;
  correctAnswers: number;
  lastScore: number;
  bestScore: number;
  lastStudied: string | null;
}

export interface B2Progress {
  lesen: B2ModuleProgress;
  hoeren: B2ModuleProgress;
  schreiben: B2ModuleProgress;
  sprechen: B2ModuleProgress;
}

export interface B2Session {
  date: string;
  modus: 'vollpruefung' | 'modul_uebung' | 'schnelltest';
  totalScore: number;
  moduleScores: { lesen: number; hoeren: number; schreiben: number; sprechen: number };
  passed: boolean;
  durationMinutes: number;
}

export interface B2ErrorItem {
  questionId: string;
  modul: string;
  aufgabe: number;
  frageText: string;
  korrektAnswer: string;
  lastSeen: string;
  nextReview: string;
  interval: number;
  easeFactor: number;
  repetitions: number;
  wrongCount: number;
}

export interface B2Streak {
  current: number;
  longest: number;
  lastStudyDate: string | null;
}

// ============================================================
// Default değerler
// ============================================================
const defaultModuleProgress = (): B2ModuleProgress => ({
  totalAttempts: 0,
  correctAnswers: 0,
  lastScore: 0,
  bestScore: 0,
  lastStudied: null,
});

const defaultProgress: B2Progress = {
  lesen: defaultModuleProgress(),
  hoeren: defaultModuleProgress(),
  schreiben: defaultModuleProgress(),
  sprechen: defaultModuleProgress(),
};

// Anonim Passkey Üretici
const generatePasskey = () => {
  const adjectives = ['blue', 'fast', 'smart', 'brave', 'calm', 'wise', 'keen'];
  const nouns = ['fox', 'owl', 'bear', 'wolf', 'lion', 'hawk', 'deer'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(1000 + Math.random() * 9000);
  return `b2-${adj}-${noun}-${num}`;
};

// ============================================================
// Ana B2 Progress Hook (Shadow Account Destekli)
// ============================================================
export function useB2Progress() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [passkey, setPasskey] = useState<string>('');
  const [progress, setProgress] = useState<B2Progress>(defaultProgress);
  const [sessions, setSessions] = useState<B2Session[]>([]);
  const [errorPool, setErrorPool] = useState<B2ErrorItem[]>([]);
  const [streak, setStreak] = useState<B2Streak>({ current: 0, longest: 0, lastStudyDate: null });
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. Passkey Başlatma ve LocalStorage Yükleme
  useEffect(() => {
    try {
      let currentPasskey = window.localStorage.getItem('b2_passkey');
      if (!currentPasskey) {
        currentPasskey = generatePasskey();
        window.localStorage.setItem('b2_passkey', currentPasskey);
      }
      setPasskey(currentPasskey);

      const lProgress = window.localStorage.getItem('b2_progress');
      const lSessions = window.localStorage.getItem('b2_sessions');
      const lErrorPool = window.localStorage.getItem('b2_error_pool');
      const lStreak = window.localStorage.getItem('b2_streak');

      if (lProgress) setProgress(JSON.parse(lProgress));
      if (lSessions) setSessions(JSON.parse(lSessions));
      if (lErrorPool) setErrorPool(JSON.parse(lErrorPool));
      if (lStreak) setStreak(JSON.parse(lStreak));

      // Supabase'den arka planda çek ve birleştir
      syncFromSupabase(currentPasskey);
    } catch (e) {
      console.error('LocalStorage init error', e);
    }
    setIsLoaded(true);
  }, []);

  // State'i hem LocalStorage'a hem de Supabase'e yazan yardımcı fonksiyon
  const persistState = useCallback(async (
    newProgress: B2Progress,
    newSessions: B2Session[],
    newErrorPool: B2ErrorItem[],
    newStreak: B2Streak
  ) => {
    // 1. LocalStorage
    window.localStorage.setItem('b2_progress', JSON.stringify(newProgress));
    window.localStorage.setItem('b2_sessions', JSON.stringify(newSessions));
    window.localStorage.setItem('b2_error_pool', JSON.stringify(newErrorPool));
    window.localStorage.setItem('b2_streak', JSON.stringify(newStreak));

    // 2. Supabase Sync (Background)
    if (!passkey) return;
    try {
      // Hata havuzu senkronizasyonu
      for (const error of newErrorPool) {
        await supabase.from('b2_fehler_pool').upsert({
          session_token: passkey,
          frage_id: error.questionId, // Dikkat: uuid olmalı
          naechste_wiederholung: error.nextReview,
          intervall_tage: error.interval,
          ease_faktor: error.easeFactor,
          wiederholungen: error.repetitions,
          falsch_zaehler: error.wrongCount,
        }, { onConflict: 'session_token,frage_id' });
      }
    } catch (e) {
      console.warn('Supabase sync failed, data saved locally', e);
    }
  }, [passkey]);

  // Supabase'den verileri çekme (Başka cihazdan girildiğinde)
  const syncFromSupabase = async (token: string) => {
    setIsSyncing(true);
    try {
      const { data: fehlerData } = await supabase
        .from('b2_fehler_pool')
        .select('*')
        .eq('session_token', token);

      if (fehlerData && fehlerData.length > 0) {
        // LocalStorage'ı Supabase ile güncelle (basit birleştirme)
        // Gerçek uygulamada çakışma çözümü (conflict resolution) eklenebilir
      }
    } catch (e) {
      console.error('Pull from Supabase failed', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Yeni cihaz bağlama fonksiyonu
  const linkDevice = async (newPasskey: string) => {
    setPasskey(newPasskey);
    window.localStorage.setItem('b2_passkey', newPasskey);
    await syncFromSupabase(newPasskey);
  };

  // Streak güncelleme
  const updateStreak = useCallback((currentStreak: B2Streak) => {
    const today = new Date().toISOString().split('T')[0];
    if (currentStreak.lastStudyDate === today) return currentStreak;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const newCurrent = currentStreak.lastStudyDate === yesterday ? currentStreak.current + 1 : 1;
    return {
      current: newCurrent,
      longest: Math.max(newCurrent, currentStreak.longest),
      lastStudyDate: today,
    };
  }, []);

  const updateModuleProgress = useCallback((modul: keyof B2Progress, correct: boolean, score?: number) => {
    const newStreak = updateStreak(streak);
    const newProgress = { ...progress };
    const m = newProgress[modul];
    const newScore = score ?? m.lastScore;
    
    newProgress[modul] = {
      totalAttempts: m.totalAttempts + 1,
      correctAnswers: m.correctAnswers + (correct ? 1 : 0),
      lastScore: newScore,
      bestScore: Math.max(m.bestScore, newScore),
      lastStudied: new Date().toISOString(),
    };

    setProgress(newProgress);
    setStreak(newStreak);
    persistState(newProgress, sessions, errorPool, newStreak);
  }, [progress, sessions, errorPool, streak, updateStreak, persistState]);

  const saveSession = useCallback(async (session: Omit<B2Session, 'date'>) => {
    const newStreak = updateStreak(streak);
    const newSession = { ...session, date: new Date().toISOString() };
    const newSessions = [newSession, ...sessions.slice(0, 49)];
    
    setSessions(newSessions);
    setStreak(newStreak);
    persistState(progress, newSessions, errorPool, newStreak);

    // Oturumu anında Supabase'e yaz
    if (passkey) {
      await supabase.from('b2_exam_sessions').insert({
        session_token: passkey,
        lesen_punkte: session.moduleScores.lesen,
        hoeren_punkte: session.moduleScores.hoeren,
        schreiben_punkte: session.moduleScores.schreiben,
        sprechen_punkte: session.moduleScores.sprechen,
        modus: session.modus,
        dauer_minuten: session.durationMinutes,
        abgeschlossen: true
      });
    }
  }, [progress, sessions, errorPool, streak, passkey, updateStreak, persistState]);

  const addToErrorPool = useCallback((item: Omit<B2ErrorItem, 'lastSeen' | 'nextReview' | 'interval' | 'easeFactor' | 'repetitions' | 'wrongCount'>) => {
    let newErrorPool = [...errorPool];
    const existingIdx = newErrorPool.findIndex(e => e.questionId === item.questionId);
    
    if (existingIdx >= 0) {
      const e = newErrorPool[existingIdx];
      newErrorPool[existingIdx] = {
        ...e,
        wrongCount: e.wrongCount + 1,
        lastSeen: new Date().toISOString(),
        nextReview: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        interval: 1,
        easeFactor: Math.max(1.3, e.easeFactor - 0.2),
        repetitions: 0,
      };
    } else {
      newErrorPool = [{
        ...item,
        lastSeen: new Date().toISOString(),
        nextReview: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0,
        wrongCount: 1,
      }, ...newErrorPool];
    }

    setErrorPool(newErrorPool);
    persistState(progress, sessions, newErrorPool, streak);
  }, [progress, sessions, errorPool, streak, persistState]);

  const markReviewed = useCallback((questionId: string, quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    const newErrorPool = errorPool.map(e => {
      if (e.questionId !== questionId) return e;
      const newEaseFactor = Math.max(1.3, e.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      let newInterval = quality < 3 ? 1 : (e.repetitions === 0 ? 1 : (e.repetitions === 1 ? 6 : Math.round(e.interval * newEaseFactor)));
      
      return {
        ...e,
        interval: newInterval,
        easeFactor: newEaseFactor,
        repetitions: e.repetitions + 1,
        nextReview: new Date(Date.now() + newInterval * 86400000).toISOString().split('T')[0],
        lastSeen: new Date().toISOString(),
      };
    }).filter(e => e.repetitions < 10 || e.wrongCount > e.repetitions * 0.3);

    setErrorPool(newErrorPool);
    persistState(progress, sessions, newErrorPool, streak);
  }, [progress, sessions, errorPool, streak, persistState]);

  const todayReviews = errorPool.filter(e => e.nextReview <= new Date().toISOString().split('T')[0]);
  const totalCorrect = Object.values(progress).reduce((sum, m) => sum + m.correctAnswers, 0);
  const totalAttempts = Object.values(progress).reduce((sum, m) => sum + m.totalAttempts, 0);
  const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  
  const moduleAccuracies = Object.entries(progress).map(([modul, m]) => ({
    modul,
    accuracy: m.totalAttempts > 0 ? Math.round((m.correctAnswers / m.totalAttempts) * 100) : null,
    lastScore: m.lastScore,
    bestScore: m.bestScore,
  }));

  return {
    isLoaded,
    isSyncing,
    passkey,
    linkDevice,
    progress,
    sessions,
    errorPool,
    streak,
    todayReviews,
    overallAccuracy,
    moduleAccuracies,
    updateModuleProgress,
    saveSession,
    addToErrorPool,
    markReviewed,
  };
}
