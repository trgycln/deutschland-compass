"use client";

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, CheckCircle, XCircle, ChevronRight, AlertTriangle, Loader2 } from 'lucide-react';
import { useB2Progress } from '@/hooks/useB2Progress';

interface WortpoolItem {
  buchstabe: string;
  wort: string;
}

interface Frage {
  nummer: number;
  frage?: string;
  aussage?: string;
  optionen: string[];
  korrekt: string;
  erklaerung?: string;
}

interface LesenInhalt {
  anweisung: string;
  text: string;
  fragen: Frage[];
  wortpool?: WortpoolItem[];
}

interface LesenQuestion {
  id: string;
  modul: string;
  aufgabe: number;
  aufgabe_typ: string;
  thema: string;
  punkte_max: number;
  inhalt: LesenInhalt;
}

const AUFGABE_TITLES: Record<number, string> = {
  1: 'Aufgabe 1 (Zuordnung)',
  2: 'Aufgabe 2 (Willkommensmappe)',
  3: 'Aufgabe 3 (Forum)',
  4: 'Aufgabe 4 (Protokoll)',
  5: 'Sprachbausteine 1',
  6: 'Sprachbausteine 2',
};

export function LesenModule() {
  const [questions, setQuestions] = useState<LesenQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const { updateModuleProgress, addToErrorPool } = useB2Progress();

  const fetchQuestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/b2/questions?modul=lesen');
      if (!res.ok) throw new Error('Sorular yüklenemedi');
      const data = await res.json();
      if (data.length === 0) {
        setError('Henüz soru eklenmemiş. Lütfen admin panelinden içerik ekleyin.');
      } else {
        setQuestions(data);
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchQuestions(); }, [fetchQuestions]);

  const currentQ = questions[currentQIdx];
  const distinctAufgaben = Array.from(new Set(questions.map(q => q.aufgabe))).sort((a, b) => a - b);
  const aufgabeVariants = questions.filter(q => q.aufgabe === (currentQ?.aufgabe ?? 1));
  const totalFragen = questions.reduce((sum, q) => sum + (q.inhalt.fragen?.length ?? 0), 0);

  const handleAnswer = (frageNummer: number, answer: string) => {
    const key = `${currentQIdx}-${frageNummer}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const handleSubmit = () => {
    let totalCorrect = 0;
    let totalQuestions = 0;

    // Yalnızca kullanıcının cevapladığı görevleri veya aktif görevi değerlendir
    const answeredIndices = new Set(
      Object.keys(answers).map(k => Number(k.split('-')[0]))
    );
    const questionsToEval = answeredIndices.size > 0
      ? questions.filter((_, idx) => answeredIndices.has(idx))
      : [currentQ].filter(Boolean);

    questionsToEval.forEach((q) => {
      const qIdx = questions.findIndex(item => item.id === q.id);
      q.inhalt.fragen?.forEach(frage => {
        const key = `${qIdx}-${frage.nummer}`;
        const userAnswer = answers[key];
        const isCorrect = userAnswer?.toLowerCase().startsWith(frage.korrekt.toLowerCase());
        totalQuestions++;
        if (isCorrect) {
          totalCorrect++;
        } else {
          // Hata havuzuna ekle
          addToErrorPool({
            questionId: `${q.id}-${frage.nummer}`,
            modul: 'lesen',
            aufgabe: q.aufgabe,
            frageText: frage.frage || frage.aussage || '',
            korrektAnswer: frage.korrekt,
          });
        }
      });
    });

    const calculatedScore = Math.round((totalCorrect / Math.max(totalQuestions, 1)) * 60);
    setScore(calculatedScore);
    updateModuleProgress('lesen', totalCorrect >= totalQuestions * 0.6, calculatedScore);
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQIdx(0);
    setScore(0);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
        <p className="text-blue-300">Lesen soruları yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-400" />
        </div>
        <div className="text-center">
          <h3 className="text-white font-bold text-lg">İçerik Bulunamadı</h3>
          <p className="text-slate-400 text-sm mt-2 max-w-md">{error}</p>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 max-w-lg text-sm text-yellow-300">
          <p className="font-semibold mb-2">📋 İçerik Nasıl Eklenir?</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Supabase'de <code>b2_schema.sql</code> dosyasını çalıştırın</li>
            <li>PDF materyalinden ilgili bölümü kopyalayın</li>
            <li><code>POST /api/b2/questions</code> endpoint'ini kullanın (seed işlemi)</li>
          </ol>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Skor Kartı */}
        <div className={`rounded-2xl p-6 border shadow-sm ${score >= 36 ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${score >= 36 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
              {score >= 36
                ? <CheckCircle className="w-8 h-8 text-emerald-600" />
                : <XCircle className="w-8 h-8 text-rose-600" />
              }
            </div>
            <div>
              <p className="text-slate-600 text-sm font-medium">Lesen Sonucu</p>
              <p className={`text-4xl font-black ${score >= 36 ? 'text-emerald-700' : 'text-rose-700'}`}>{score} <span className="text-lg text-slate-400">/ 60</span></p>
              <p className={`text-sm font-bold ${score >= 36 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {score >= 36 ? '✓ Bestanden (min. 36 sağlandı)' : '✗ Nicht bestanden – min. 36 gerekli'}
              </p>
            </div>
          </div>
        </div>

        {/* Cevap Gözden Geçirme */}
        <div className="space-y-4">
          <h3 className="text-slate-900 font-bold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Cevap Anahtarı
          </h3>
          {questions
            .filter((q, qIdx) =>
              q.inhalt.fragen?.some(f => answers[`${qIdx}-${f.nummer}`] !== undefined) || q.id === currentQ?.id
            )
            .map((q) => {
              const qIdx = questions.findIndex(item => item.id === q.id);
              return (
                <div key={q.id} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="bg-emerald-50/60 border-b border-stone-200 px-5 py-3">
                    <p className="text-emerald-900 text-sm font-bold">Aufgabe {q.aufgabe} – {q.thema}</p>
                  </div>
                  <div className="p-5 space-y-3">
                    {q.inhalt.fragen?.map(frage => {
                      const key = `${qIdx}-${frage.nummer}`;
                      const userAns = answers[key];
                      const isCorrect = userAns?.toLowerCase().startsWith(frage.korrekt.toLowerCase());
                      return (
                        <div key={frage.nummer} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}`}>
                          <p className="text-slate-900 text-sm font-semibold mb-2">
                            {frage.nummer}. {frage.frage || frage.aussage}
                          </p>
                          <div className="flex items-center gap-2 text-sm">
                            {isCorrect
                              ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                              : <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            }
                            <span className={isCorrect ? 'text-emerald-800 font-medium' : 'text-rose-800 font-medium'}>
                              Senin cevabın: {userAns ?? 'Boş bırakıldı'} | Doğru Çözüm: {frage.korrekt}
                            </span>
                          </div>
                          {!isCorrect && frage.erklaerung && (
                            <p className="text-slate-600 text-xs mt-1.5 pl-6">{frage.erklaerung}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

        <button
          onClick={handleReset}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md shadow-emerald-500/20">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-slate-900 font-bold text-lg">Lesen – Okuma</h2>
          <p className="text-emerald-700 text-sm font-medium">Aufgabe {currentQ.aufgabe} · {currentQ.thema}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-slate-500 text-xs font-semibold">{currentQIdx + 1} / {questions.length} Görev</p>
          <p className="text-slate-400 text-xs">{Object.keys(answers).length} / {totalFragen} cevaplandı</p>
        </div>
      </div>

      {/* Ana Görev Sekmeleri (Aufgabe 1-4 & Sprachbausteine 1-2) */}
      <div className="flex flex-wrap items-center gap-2">
        {distinctAufgaben.map((aufg) => {
          const isCurrentAufgabe = currentQ?.aufgabe === aufg;
          const title = AUFGABE_TITLES[aufg] || `Aufgabe ${aufg}`;
          return (
            <button
              key={aufg}
              onClick={() => {
                const firstIdx = questions.findIndex(q => q.aufgabe === aufg);
                if (firstIdx !== -1) setCurrentQIdx(firstIdx);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                isCurrentAufgabe
                  ? aufg >= 5
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50 shadow-2xs'
              }`}
            >
              {title}
            </button>
          );
        })}
      </div>

      {/* Seçili Göreve Ait Farklı Sınav Varyantları */}
      {aufgabeVariants.length > 1 && (
        <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-3.5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>📚</span> Sınav Varyantları ({aufgabeVariants.length} Farklı Gerçek Sınav Metni):
            </span>
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              telc B2 Arşivi
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {aufgabeVariants.map((q) => {
              const isSelected = q.id === currentQ?.id;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIdx(questions.findIndex(item => item.id === q.id))}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border-stone-200 hover:bg-emerald-50 hover:text-emerald-900'
                  }`}
                >
                  {q.thema || `Varyant ${q.id.slice(0, 4)}`}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Görev Yönergesi */}
      <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4 shadow-2xs">
        <p className="text-blue-950 text-sm sm:text-base leading-relaxed font-medium">{currentQ.inhalt.anweisung}</p>
      </div>

      {/* Wortkasten (Wortpool a–j) - Sprachbausteine Teil 1 için */}
      {currentQ.inhalt.wortpool && currentQ.inhalt.wortpool.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-amber-200/70 pb-2">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 px-3 py-1 rounded-md">
              🔤 Wortkasten (Wortpool a–j)
            </span>
            <span className="text-xs font-semibold text-amber-800">
              Boşluklara yerleştirilecek sözcükler
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
            {currentQ.inhalt.wortpool.map((item) => (
              <div
                key={item.buchstabe}
                className="flex items-center gap-2 bg-white border border-amber-200/80 rounded-xl px-3 py-2 text-sm shadow-2xs"
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center font-bold text-amber-950 text-xs shrink-0">
                  {item.buchstabe.toUpperCase()}
                </span>
                <span className="font-semibold text-slate-800 truncate">{item.wort}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Okuma Metni - Scroll olmadan tam metin görünümü */}
      {currentQ.inhalt.text && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone-200/70 pb-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-md">
              📖 Lesetext (Okuma Metni – Tam Metin)
            </span>
            <span className="text-xs font-medium text-slate-500">
              {currentQ.inhalt.text.split(/\s+/).length} kelime
            </span>
          </div>
          <div className="pt-2">
            <p className="text-slate-900 text-base sm:text-[17px] leading-[1.9] whitespace-pre-wrap font-sans select-text tracking-normal font-normal">
              {currentQ.inhalt.text}
            </p>
          </div>
        </div>
      )}

      {/* Sorular */}
      <div className="space-y-4">
        {currentQ.inhalt.fragen?.map(frage => {
          const key = `${currentQIdx}-${frage.nummer}`;
          const selectedAnswer = answers[key];
          return (
            <div key={frage.nummer} className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <p className="text-slate-900 text-base font-bold leading-snug">
                {frage.nummer}. {frage.frage || frage.aussage}
              </p>
              <div className={`grid gap-2.5 ${frage.optionen.length > 4 ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-1'}`}>
                {frage.optionen.map((opt, optIdx) => {
                  const defaultOptLetter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'][optIdx] || String(optIdx + 1);
                  const isSelected = selectedAnswer === opt;
                  const matchingWort = currentQ.inhalt.wortpool?.find(
                    w => w.buchstabe.toLowerCase() === opt.toLowerCase().trim()
                  )?.wort;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleAnswer(frage.nummer, opt)}
                      className={`flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl border text-left text-[14px] leading-relaxed transition-all duration-150 ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-xs'
                          : 'bg-stone-50/70 border-stone-200 text-slate-800 hover:bg-emerald-50/40 hover:border-emerald-300'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white text-slate-700'
                      }`}>
                        {opt.length === 1 ? opt.toUpperCase() : defaultOptLetter.toUpperCase()}
                      </span>
                      <span className="truncate">
                        {matchingWort ? (
                          <span>{matchingWort}</span>
                        ) : (
                          opt.replace(/^[a-j]\)\s*/i, '')
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigasyon */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={() => setCurrentQIdx(Math.max(0, currentQIdx - 1))}
          disabled={currentQIdx === 0}
          className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-slate-700 text-sm font-semibold hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
        >
          ← Önceki
        </button>

        {currentQIdx < questions.length - 1 ? (
          <button
            onClick={() => setCurrentQIdx(currentQIdx + 1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            Sonraki <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            Bitir & Değerlendir <CheckCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
