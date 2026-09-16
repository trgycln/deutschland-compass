"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageSquare, Timer, Play, Pause, RotateCcw, ChevronRight, Star, Loader2 } from 'lucide-react';
import { useB2Progress } from '@/hooks/useB2Progress';

interface SprechenInhalt {
  anweisung: string;
  thema_karte: string;
  vorbereitungszeit_min: number;
  sprechzeit_min: number;
  leitfragen: string[];
  bewertungskriterien?: Record<string, string>;
}

interface SprechenQuestion {
  id: string;
  aufgabe: number;
  aufgabe_typ: string;
  thema: string;
  inhalt: SprechenInhalt;
}

type Phase = 'intro' | 'vorbereitung' | 'sprechen' | 'selfeval' | 'done';

export function SprechenModule() {
  const [questions, setQuestions] = useState<SprechenQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('intro');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [selfScore, setSelfScore] = useState<Record<string, number>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { updateModuleProgress } = useB2Progress();

  useEffect(() => {
    fetch('/api/b2/questions?modul=sprechen')
      .then(r => r.json())
      .then(d => setQuestions(d))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, []);

  const currentQ = questions[currentQIdx];

  const startTimer = useCallback((seconds: number) => {
    setTimeLeft(seconds);
    setIsRunning(true);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          if (phase === 'vorbereitung') setPhase('sprechen');
          else if (phase === 'sprechen') setPhase('selfeval');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, phase]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const timerPct = (() => {
    if (!currentQ) return 0;
    const total = phase === 'vorbereitung'
      ? (currentQ.inhalt.vorbereitungszeit_min * 60)
      : (currentQ.inhalt.sprechzeit_min * 60);
    return total > 0 ? ((total - timeLeft) / total) * 100 : 0;
  })();

  const handleSelfEval = () => {
    const total = Object.values(selfScore).reduce((s, v) => s + v, 0);
    const criteria = Object.keys(selfScore).length;
    const score = criteria > 0 ? Math.round((total / (criteria * 5)) * 60) : 30;
    updateModuleProgress('sprechen', score >= 36, score);
    setPhase('done');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentQ) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-slate-900 font-bold text-xl">Sprechen – Konuşma Modülü</h2>
            <p className="text-slate-500 text-sm font-medium">Hazırlık & Sunum Pratiği</p>
          </div>
        </div>
        <div className="text-center py-10 text-slate-500 font-medium">
          <p>Henüz Sprechen görevi eklenmemiş.</p>
        </div>
        <SsrechenTipps />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-amber-600 flex items-center justify-center shadow-md shadow-amber-500/20">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-slate-900 font-bold text-xl">Sprechen – Konuşma Modülü</h2>
          <p className="text-slate-500 text-sm font-medium">Aufgabe {currentQ.aufgabe} · {currentQ.thema}</p>
        </div>
      </div>

      {/* Ana Görev Sekmeleri (Teil 1: Präsentation, Teil 2: Gespräch, Teil 3: Problemlösung) */}
      <div className="flex flex-wrap items-center gap-2">
        {Array.from(new Set(questions.map(q => q.aufgabe))).sort((a, b) => a - b).map((aufg) => {
          const isCurrentAufgabe = currentQ?.aufgabe === aufg;
          const labels: Record<number, string> = {
            1: 'Teil 1: Präsentation',
            2: 'Teil 2: Gespräch mit Kollegen',
            3: 'Teil 3: Problemlösung im Team'
          };
          return (
            <button
              key={aufg}
              onClick={() => {
                const firstIdx = questions.findIndex(q => q.aufgabe === aufg);
                if (firstIdx !== -1) {
                  setCurrentQIdx(firstIdx);
                  setPhase('intro');
                  setIsRunning(false);
                }
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                isCurrentAufgabe
                  ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50 shadow-2xs'
              }`}
            >
              {labels[aufg] ?? `Teil ${aufg}`}
            </button>
          );
        })}
      </div>

      {/* Seçili Göreve Ait Farklı Sınav Durumları / Senaryoları */}
      {questions.filter(q => q.aufgabe === currentQ?.aufgabe).length > 1 && (
        <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-3.5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>🎙️</span> Gerçek Sınav Durumları ({questions.filter(q => q.aufgabe === currentQ?.aufgabe).length} Farklı Senaryo):
            </span>
            <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
              telc B2 Arşivi
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {questions
              .filter(q => q.aufgabe === currentQ?.aufgabe)
              .map((q) => {
                const isSelected = q.id === currentQ?.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQIdx(questions.findIndex(item => item.id === q.id));
                      setPhase('intro');
                      setIsRunning(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                        : 'bg-white text-slate-700 border-stone-200 hover:bg-amber-50 hover:text-amber-950'
                    }`}
                  >
                    {q.thema || `Varyant ${q.id.slice(0, 4)}`}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Konu Kartı (Themenkarte) */}
      <div className="relative overflow-hidden bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="absolute top-4 right-4 text-stone-200 text-5xl font-black select-none pointer-events-none">B2</div>
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-md mb-2">
            Themenkarte (Konu Kartı)
          </span>
          <h3 className="text-slate-900 text-xl font-bold leading-snug">{currentQ.inhalt.thema_karte}</h3>
        </div>

        <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 space-y-2">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Leitfragen (Rehber Sorular):</p>
          <div className="space-y-1.5">
            {currentQ.inhalt.leitfragen.map((frage, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-800">
                <span className="text-amber-600 font-bold shrink-0">•</span>
                <span className="leading-relaxed">{frage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Görev Yönergesi */}
      <div className="bg-stone-50/80 border border-stone-200 rounded-2xl p-4 shadow-2xs">
        <p className="text-slate-700 text-sm leading-relaxed">{currentQ.inhalt.anweisung}</p>
      </div>

      {/* Fazlar */}
      {phase === 'intro' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
              <Timer className="w-7 h-7 text-amber-600 mx-auto mb-2" />
              <p className="text-slate-900 font-black text-2xl">{currentQ.inhalt.vorbereitungszeit_min} dk</p>
              <p className="text-slate-500 text-xs font-medium mt-0.5">Hazırlık Süresi</p>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
              <MessageSquare className="w-7 h-7 text-amber-600 mx-auto mb-2" />
              <p className="text-slate-900 font-black text-2xl">{currentQ.inhalt.sprechzeit_min} dk</p>
              <p className="text-slate-500 text-xs font-medium mt-0.5">Konuşma Süresi</p>
            </div>
          </div>
          <button
            onClick={() => { setPhase('vorbereitung'); startTimer(currentQ.inhalt.vorbereitungszeit_min * 60); }}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 text-base"
          >
            <Play className="w-5 h-5 fill-white" /> Hazırlık Süresini Başlat
          </button>
        </div>
      )}

      {(phase === 'vorbereitung' || phase === 'sprechen') && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-5">
          <div className="relative flex flex-col items-center justify-center py-4">
            <p className="text-slate-600 text-sm font-semibold mb-3">
              {phase === 'vorbereitung' ? '⏱️ Hazırlık Süresi Devam Ediyor' : '🎙️ Konuşma Süresi (Sunum Yapınız)'}
            </p>
            <div className="relative w-36 h-36">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke={phase === 'vorbereitung' ? '#D97706' : '#DC2626'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 44}`}
                  strokeDashoffset={`${2 * Math.PI * 44 * (1 - timerPct / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-black text-slate-900">{formatTimer(timeLeft)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => setIsRunning(s => !s)}
                className="w-11 h-11 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-slate-700 transition-colors shadow-2xs"
                title={isRunning ? 'Duraklat' : 'Devam Et'}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>
              {phase === 'vorbereitung' && (
                <button
                  onClick={() => { setPhase('sprechen'); startTimer(currentQ.inhalt.sprechzeit_min * 60); }}
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-sm"
                >
                  Konuşmaya Geç <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          {phase === 'sprechen' && (
            <button
              onClick={() => { setIsRunning(false); setPhase('selfeval'); }}
              className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 font-bold rounded-xl transition-colors shadow-2xs"
            >
              Konuşmayı Bitir & Değerlendirmeye Geç
            </button>
          )}
        </div>
      )}

      {phase === 'selfeval' && (
        <div className="space-y-4 animate-fadeIn bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-slate-900 font-bold text-lg">Öz Değerlendirme (Selbsteinschätzung)</h3>
          <p className="text-slate-600 text-sm">Kendinizi telc B2 kriterlerine göre dürüstçe puanlayın (1 en düşük, 5 tam puan):</p>
          {currentQ.inhalt.bewertungskriterien && Object.entries(currentQ.inhalt.bewertungskriterien).map(([key, desc]) => (
            <div key={key} className="bg-stone-50/70 border border-stone-200 rounded-xl p-4 space-y-2.5">
              <p className="text-slate-900 text-sm font-bold capitalize">{key.replace(/_/g, ' ')}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{desc}</p>
              <div className="flex gap-2 pt-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setSelfScore(p => ({ ...p, [key]: n }))}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      selfScore[key] === n
                        ? 'bg-amber-600 border-amber-600 text-white shadow-2xs'
                        : 'bg-white border-stone-200 text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {(!currentQ.inhalt.bewertungskriterien || Object.keys(currentQ.inhalt.bewertungskriterien).length === 0) && (
            <div className="bg-stone-50/70 border border-stone-200 rounded-xl p-4 space-y-2.5">
              <p className="text-slate-900 text-sm font-bold">Genel Konuşma Performansı</p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setSelfScore({ genel: n })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                      selfScore.genel === n
                        ? 'bg-amber-600 border-amber-600 text-white shadow-2xs'
                        : 'bg-white border-stone-200 text-slate-700 hover:bg-stone-100'
                    }`}
                  >
                    {n} <Star className="w-3.5 h-3.5 inline ml-0.5" />
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleSelfEval}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-md shadow-amber-600/20"
          >
            Değerlendirmeyi Kaydet & Tamamla
          </button>
        </div>
      )}

      {phase === 'done' && (
        <div className="text-center space-y-4 py-8 bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 shadow-xs animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-slate-900 font-bold text-xl">Tebrikler! Konuşma görevi tamamlandı.</h3>
          <p className="text-slate-600 text-sm font-medium">Sonucunuz profilinize kaydedildi. Dilerseniz tekrar deneyebilirsiniz:</p>
          <button
            onClick={() => { setPhase('intro'); setIsRunning(false); setSelfScore({}); }}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Tekrar Dene
          </button>
        </div>
      )}

      <SsrechenTipps />
    </div>
  );
}

function SsrechenTipps() {
  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 shadow-2xs">
      <p className="text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">💡 B2 Sprechen Kalıp & İpuçları (Redemittel)</p>
      <ul className="space-y-2 text-sm text-slate-800">
        <li>→ <span className="font-semibold text-amber-950">Giriş yapma:</span> <em>"Ich möchte mich heute mit dem Thema ... beschäftigen."</em></li>
        <li>→ <span className="font-semibold text-amber-950">Görüş bildirme:</span> <em>"Meiner Ansicht nach / Ich bin der festen Überzeugung, dass..."</em></li>
        <li>→ <span className="font-semibold text-amber-950">Örnek verme:</span> <em>"Ein passendes Beispiel aus meinem Berufsalltag wäre..."</em></li>
        <li>→ <span className="font-semibold text-amber-950">Karşıt görüş:</span> <em>"Auf der einen Seite... auf der anderen Seite sollte man bedenken..."</em></li>
        <li>→ <span className="font-semibold text-amber-950">Sonuç bağlama:</span> <em>"Zusammenfassend lässt sich festhalten, dass..."</em></li>
      </ul>
    </div>
  );
}

