"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Headphones, Play, Pause, RotateCcw, ChevronRight, CheckCircle, XCircle, Volume2, FileText, AlertTriangle } from 'lucide-react';
import { useB2Progress } from '@/hooks/useB2Progress';

const AUDIO_PATH = '/dokument/5015-mp3-010102_gesamt.mp3';

interface HoerenFrage {
  nummer: number;
  aussage?: string;
  frage?: string;
  optionen: string[];
  korrekt: string;
}

interface HoerenInhalt {
  anweisung: string;
  fragen: HoerenFrage[];
}

interface HoerenQuestion {
  id: string;
  aufgabe: number;
  aufgabe_typ: string;
  thema: string;
  punkte_max: number;
  audio_start_sec: number | null;
  audio_end_sec: number | null;
  audio_transkript: string | null;
  inhalt: HoerenInhalt;
}

export function HoerenModule() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [questions, setQuestions] = useState<HoerenQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [audioPlayed, setAudioPlayed] = useState(false);

  const { updateModuleProgress, addToErrorPool } = useB2Progress();

  useEffect(() => {
    fetch('/api/b2/questions?modul=hoeren')
      .then(r => r.json())
      .then(d => setQuestions(d))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, []);

  const currentQ = questions[currentQIdx];

  // Mevcut Aufgabe'nin ses bölümüne atla
  useEffect(() => {
    if (currentQ?.audio_start_sec !== null && audioRef.current) {
      audioRef.current.currentTime = currentQ.audio_start_sec ?? 0;
      setCurrentTime(currentQ.audio_start_sec ?? 0);
    }
  }, [currentQIdx, currentQ]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Aufgabe'nin başlangıç noktasından başlat
      if (currentQ?.audio_start_sec !== null && Math.abs(audio.currentTime - (currentQ?.audio_start_sec ?? 0)) > 5) {
        audio.currentTime = currentQ?.audio_start_sec ?? 0;
      }
      audio.play();
      setIsPlaying(true);
      setAudioPlayed(true);
    }
  }, [isPlaying, currentQ]);

  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);

    // Aufgabe bitiş noktasında otomatik dur
    if (currentQ?.audio_end_sec && audio.currentTime >= currentQ.audio_end_sec) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentQ]);

  const handleRestart = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = currentQ?.audio_start_sec ?? 0;
    setCurrentTime(currentQ?.audio_start_sec ?? 0);
  }, [currentQ]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (newProgress: number) => {
    const audio = audioRef.current;
    if (!audio || segmentDuration <= 0) return;
    const targetTime = segmentStart + (newProgress / 100) * segmentDuration;
    audio.currentTime = targetTime;
    setCurrentTime(targetTime);
  };

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.max(segmentStart, Math.min(segmentEnd, audio.currentTime + seconds));
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const segmentStart = currentQ?.audio_start_sec ?? 0;
  const segmentEnd = currentQ?.audio_end_sec ?? duration;
  const segmentDuration = segmentEnd - segmentStart;
  const segmentProgress = segmentDuration > 0
    ? Math.min(100, Math.max(0, ((currentTime - segmentStart) / segmentDuration) * 100))
    : 0;

  const handleAnswer = (frageNummer: number, answer: string) => {
    const key = `${currentQIdx}-${frageNummer}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const handleSubmit = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;
    questions.forEach((q, qIdx) => {
      q.inhalt.fragen?.forEach(frage => {
        const key = `${qIdx}-${frage.nummer}`;
        const userAnswer = answers[key];
        const isCorrect = userAnswer?.toLowerCase().startsWith(frage.korrekt.toLowerCase());
        totalQuestions++;
        if (isCorrect) {
          totalCorrect++;
        } else {
          addToErrorPool({
            questionId: `${q.id}-${frage.nummer}`,
            modul: 'hoeren',
            aufgabe: q.aufgabe,
            frageText: frage.aussage || frage.frage || '',
            korrektAnswer: frage.korrekt,
          });
        }
      });
    });
    const calculatedScore = Math.round((totalCorrect / Math.max(totalQuestions, 1)) * 60);
    setScore(calculatedScore);
    updateModuleProgress('hoeren', totalCorrect > totalQuestions * 0.6, calculatedScore);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="space-y-5 animate-fadeIn">
        <div className={`rounded-2xl p-6 border shadow-xs ${score >= 36 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${score >= 36 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {score >= 36 ? <CheckCircle className="w-8 h-8 text-emerald-600" /> : <XCircle className="w-8 h-8 text-rose-600" />}
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Hören Sonucu</p>
              <p className={`text-4xl font-black ${score >= 36 ? 'text-emerald-700' : 'text-rose-700'}`}>{score} <span className="text-lg text-slate-500">/ 60</span></p>
              <p className={`text-sm font-bold mt-0.5 ${score >= 36 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {score >= 36 ? '✓ Bestanden (Geçti)' : '✗ Nicht bestanden (min. 36 puan gerekli)'}
              </p>
            </div>
          </div>
        </div>

        {/* Cevap gözden geçirme */}
        {questions.map((q, qIdx) => (
          <div key={q.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="bg-stone-50/80 border-b border-stone-200 px-5 py-3">
              <p className="text-blue-900 text-sm font-bold">Aufgabe {q.aufgabe} – {q.thema}</p>
            </div>
            <div className="p-5 space-y-3">
              {q.inhalt.fragen?.map(frage => {
                const key = `${qIdx}-${frage.nummer}`;
                const isCorrect = answers[key]?.toLowerCase().startsWith(frage.korrekt.toLowerCase());
                return (
                  <div key={frage.nummer} className={`flex items-start gap-3 text-sm p-3 rounded-xl border ${isCorrect ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-rose-50/60 border-rose-200 text-rose-950'}`}>
                    {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-semibold text-slate-800">{frage.nummer}. {frage.aussage || frage.frage}</p>
                      {!isCorrect && (
                        <p className="text-rose-800 text-xs font-medium mt-1">
                          Verilen Cevap: <span className="line-through">{answers[key] || 'Boş'}</span> | Doğru Cevap: <span className="font-bold underline">{frage.korrekt}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <button
          onClick={() => { setSubmitted(false); setAnswers({}); setCurrentQIdx(0); setScore(0); setAudioPlayed(false); }}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-sm"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
          <Headphones className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-slate-900 font-bold text-xl">Hören – Dinleme Modülü</h2>
          {currentQ && <p className="text-slate-500 text-sm font-medium">Aufgabe {currentQ.aufgabe} · {currentQ.thema}</p>}
        </div>
      </div>

      {/* Uyarı: Gerçek sınav koşulu */}
      <div className="flex items-start gap-3 bg-amber-50/90 border border-amber-200 rounded-2xl p-4 shadow-2xs">
        <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-amber-950 text-sm leading-relaxed">
          Gerçek telc B2 sınavında her dinleme kaydı <strong>yalnızca bir kez</strong> dinletilir. Rahat bir ortama geçtiğinizde kaydı başlatın.
        </p>
      </div>

      {/* Audio Player Card */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-5 shadow-xs">
        <audio
          ref={audioRef}
          src={AUDIO_PATH}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
          onEnded={() => setIsPlaying(false)}
          preload="metadata"
        />

        {/* Başlık ve Orijinal Ses Rozeti */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-ping' : 'bg-stone-300'}`} />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {isPlaying ? 'Ses Çalıyor...' : 'Dinlemeye Hazır'}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full w-fit">
            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
            Orijinal telc B2 Sınav Kaydı Aktif (MP3)
          </span>
        </div>

        {/* Zaman ve İnteraktif İlerleme Çubuğu */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span className="font-mono">{formatTime(Math.max(0, currentTime - segmentStart))} / {formatTime(segmentDuration)}</span>
            <span className="flex items-center gap-1 text-blue-700 font-medium">
              Aufgabe {currentQ?.aufgabe ?? 1} Bölümü ({formatTime(segmentDuration)})
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={isNaN(segmentProgress) ? 0 : segmentProgress}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-100 rounded-full appearance-none cursor-pointer accent-blue-600 border border-stone-200"
              title="İstediğiniz saniyeye tıklayarak atlayabilirsiniz"
            />
          </div>
        </div>

        {/* Kontroller */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={handleRestart}
            className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
            title="Aufgabe başına dön"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleSkip(-10)}
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 hover:text-slate-900 font-bold text-xs transition-colors shadow-2xs"
            title="10 saniye geri sar"
          >
            -10s
          </button>
          <button
            onClick={togglePlay}
            className="w-14 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 flex items-center justify-center text-white hover:scale-105 transition-all active:scale-95"
            title={isPlaying ? 'Durdur' : 'Dinlemeyi Başlat'}
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
          <button
            onClick={() => handleSkip(10)}
            className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-700 hover:text-slate-900 font-bold text-xs transition-colors shadow-2xs"
            title="10 saniye ileri sar"
          >
            +10s
          </button>
          <button
            onClick={() => setShowTranscript(s => !s)}
            className={`px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-2xs ${
              showTranscript
                ? 'bg-blue-600 text-white'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200 hover:text-slate-900'
            }`}
            title="Yazılı transkripti göster / gizle"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Transkript</span>
          </button>
        </div>

        {/* Transkript - Scroll olmadan tam metin görünümü */}
        {showTranscript && currentQ?.audio_transkript && (
          <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2.5">
              <span className="text-xs text-blue-900 font-bold uppercase tracking-wider">
                📄 Ses Kaydı Transkripti (Tam Metin)
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {currentQ.audio_transkript.split(/\s+/).length} kelime
              </span>
            </div>
            <p className="text-slate-900 text-[15px] sm:text-base leading-[1.85] font-sans whitespace-pre-wrap select-text font-normal pt-1">
              {currentQ.audio_transkript}
            </p>
          </div>
        )}
      </div>

      {/* Aufgabe Seçici Butonlar */}
      {questions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentQIdx(idx)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                idx === currentQIdx
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50 shadow-2xs'
              }`}
            >
              Aufgabe {q.aufgabe}
            </button>
          ))}
        </div>
      )}

      {/* Aufgabe Yönergesi */}
      {currentQ && (
        <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 shadow-2xs">
          <p className="text-blue-950 text-sm font-medium leading-relaxed">{currentQ.inhalt.anweisung}</p>
        </div>
      )}

      {/* Sorular */}
      {currentQ && (
        <div className="space-y-4">
          {currentQ.inhalt.fragen?.map(frage => {
            const key = `${currentQIdx}-${frage.nummer}`;
            const selected = answers[key];
            return (
              <div key={frage.nummer} className="bg-white border border-stone-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <p className="text-slate-900 text-base font-bold">
                  {frage.nummer}. {frage.aussage || frage.frage}
                </p>
                <div className="grid gap-2.5">
                  {frage.optionen.map((opt, optIdx) => {
                    const optLetter = ['a', 'b', 'c', 'd'][optIdx];
                    const isSelected = selected === opt;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleAnswer(frage.nummer, opt)}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-950 font-semibold shadow-2xs'
                            : 'bg-stone-50/60 border-stone-200/80 text-slate-700 hover:bg-stone-100/80'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 text-xs font-bold ${
                          isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-stone-400 text-stone-600'
                        }`}>
                          {optLetter}
                        </span>
                        <span className="leading-snug">{opt.replace(/^[abcd]\)\s*/i, '')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Navigasyon */}
      {questions.length > 0 && (
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => setCurrentQIdx(Math.max(0, currentQIdx - 1))}
            disabled={currentQIdx === 0}
            className="px-5 py-2.5 rounded-xl bg-white border border-stone-200 text-slate-700 text-sm font-semibold hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          >
            ← Önceki
          </button>
          {currentQIdx < questions.length - 1 ? (
            <button
              onClick={() => setCurrentQIdx(currentQIdx + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
            >
              Sonraki <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
            >
              Bitir & Değerlendir <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {questions.length === 0 && !loading && (
        <div className="text-center py-10 text-slate-500 font-medium">
          <p>Henüz Hören sorusu eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}

