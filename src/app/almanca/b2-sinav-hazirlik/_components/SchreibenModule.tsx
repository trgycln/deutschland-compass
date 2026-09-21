"use client";

import { useState, useEffect, useRef } from 'react';
import { PenLine, FileText, Loader2, CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { useB2Progress } from '@/hooks/useB2Progress';

interface SchreibenInhalt {
  anweisung: string;
  situation?: string;
  schreibanlass?: string;
  inhaltspunkte: string[];
  mindestwoerter?: number;
  musterloesung?: string;
  bewertungskriterien?: {
    inhalt?: string;
    kommunikative_gestaltung?: string;
    formale_richtigkeit?: string;
  };
}

interface SchreibenQuestion {
  id: string;
  aufgabe: number;
  aufgabe_typ: string;
  thema: string;
  inhalt: SchreibenInhalt;
}

interface Evaluation {
  inhalt_punkte: number;
  kommunikative_gestaltung_punkte: number;
  formale_richtigkeit_punkte: number;
  gesamt_punkte: number;
  bestanden: boolean;
  wortanzahl: number;
  wortanzahl_ausreichend: boolean;
  inhalt_feedback: string;
  kommunikation_feedback: string;
  grammatik_feedback: string;
  staerken: string[];
  verbesserungen: string[];
  gesamtnote: string;
}

const AUFGABE_TYPE_LABELS: Record<string, string> = {
  beschwerde: '📧 Beschwerdebrief',
  forumsbeitrag: '💬 Forumsbeitrag',
  email: '✉️ E-Mail',
  bericht: '📋 Bericht',
  telefonnotiz: '📞 Telefonnotiz',
};

export function SchreibenModule() {
  const [questions, setQuestions] = useState<SchreibenQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [text, setText] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [showCriteria, setShowCriteria] = useState(false);
  const [showMusterloesung, setShowMusterloesung] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { updateModuleProgress } = useB2Progress();

  useEffect(() => {
    fetch('/api/b2/questions?modul=schreiben')
      .then(r => r.json())
      .then(d => setQuestions(d))
      .catch(() => setQuestions([]))
      .finally(() => setLoading(false));
  }, []);

  const currentQ = questions[currentQIdx];
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minWords = currentQ?.inhalt?.mindestwoerter ?? 150;
  const wordPct = Math.min(100, (wordCount / minWords) * 100);

  const handleEvaluate = async () => {
    if (!currentQ || wordCount < 20) return;
    setEvaluating(true);
    try {
      const res = await fetch('/api/b2/evaluate-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aufgabe: currentQ.inhalt,
          nutzerText: text,
          aufgabeTyp: currentQ.aufgabe_typ,
        }),
      });
      const data = await res.json();
      setEvaluation(data);
      updateModuleProgress('schreiben', data.bestanden, data.gesamt_punkte);
    } catch {
      alert('Değerlendirme sırasında hata oluştu. API key geçerli olduğundan emin olun.');
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-500/20">
          <PenLine className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-slate-900 font-bold text-xl">Schreiben – Yazma Modülü</h2>
          {currentQ && (
            <p className="text-slate-500 text-sm font-medium">
              {AUFGABE_TYPE_LABELS[currentQ.aufgabe_typ] ?? currentQ.aufgabe_typ} · {currentQ.thema}
            </p>
          )}
        </div>
      </div>

      {/* Ana Görev Sekmeleri (Aufgabe 1: Beschwerde, Aufgabe 2: Forum, vb.) */}
      <div className="flex flex-wrap items-center gap-2">
        {Array.from(new Set(questions.map(q => q.aufgabe))).sort((a, b) => a - b).map((aufg) => {
          const isCurrentAufgabe = currentQ?.aufgabe === aufg;
          const firstInAufg = questions.find(q => q.aufgabe === aufg);
          const label = AUFGABE_TYPE_LABELS[firstInAufg?.aufgabe_typ ?? ''] ?? `Aufgabe ${aufg}`;
          return (
            <button
              key={aufg}
              onClick={() => {
                const firstIdx = questions.findIndex(q => q.aufgabe === aufg);
                if (firstIdx !== -1) {
                  setCurrentQIdx(firstIdx);
                  setEvaluation(null);
                  setText('');
                }
              }}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                isCurrentAufgabe
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50 shadow-2xs'
              }`}
            >
              Aufgabe {aufg}: {label.replace(/^[^\w\s]+\s*/, '')}
            </button>
          );
        })}
      </div>

      {/* Seçili Göreve Ait Farklı Sınav Varyantları */}
      {questions.filter(q => q.aufgabe === currentQ?.aufgabe).length > 1 && (
        <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-3.5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span>📚</span> Sınav Varyantları ({questions.filter(q => q.aufgabe === currentQ?.aufgabe).length} Farklı Gerçek Sınav Konusu):
            </span>
            <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
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
                      setEvaluation(null);
                      setText('');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                        : 'bg-white text-slate-700 border-stone-200 hover:bg-purple-50 hover:text-purple-900'
                    }`}
                  >
                    {q.thema || `Varyant ${q.id.slice(0, 4)}`}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {currentQ ? (
        <>
          {/* Görev Metni */}
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="bg-purple-50/75 border border-purple-100 rounded-xl p-4">
              <p className="text-purple-950 text-sm font-medium leading-relaxed">{currentQ.inhalt.anweisung}</p>
            </div>

            {currentQ.inhalt.situation && (
              <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 sm:p-5 space-y-1.5">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Durum (Situation):</p>
                <p className="text-slate-900 text-[15px] sm:text-base leading-relaxed font-sans font-normal">{currentQ.inhalt.situation}</p>
              </div>
            )}

            {currentQ.inhalt.inhaltspunkte.length > 0 && (
              <div className="space-y-2">
                <p className="text-slate-800 text-xs font-bold uppercase tracking-wider">İşlenmesi Gereken Noktalar (Inhaltspunkte):</p>
                <ul className="space-y-2">
                  {currentQ.inhalt.inhaltspunkte.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] text-slate-800 bg-stone-50/60 border border-stone-200/60 rounded-xl p-3 font-sans">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">{i + 1}</span>
                      <span className="leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Değerlendirme Kriterleri ve Örnek Çözüm Toggle'ları */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowCriteria(s => !s)}
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-800 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                Resmi Değerlendirme Kriterleri (telc B2)
                {showCriteria ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {currentQ.inhalt.musterloesung && (
                <button
                  onClick={() => setShowMusterloesung(s => !s)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100/80 hover:bg-amber-100 border border-amber-300 px-3 py-1 rounded-xl transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  {showMusterloesung ? 'Örnek Çözümü Gizle' : '💡 100% Örnek Çözümü İncele'}
                </button>
              )}
            </div>

            {showCriteria && currentQ.inhalt.bewertungskriterien && (
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mt-2 space-y-2 text-xs text-slate-600 animate-fadeIn">
                {currentQ.inhalt.bewertungskriterien.inhalt && (
                  <div><span className="text-purple-800 font-bold">1. İçerik (0-20 Puan):</span> {currentQ.inhalt.bewertungskriterien.inhalt}</div>
                )}
                {currentQ.inhalt.bewertungskriterien.kommunikative_gestaltung && (
                  <div><span className="text-purple-800 font-bold">2. İletişim & Yapı (0-20 Puan):</span> {currentQ.inhalt.bewertungskriterien.kommunikative_gestaltung}</div>
                )}
                {currentQ.inhalt.bewertungskriterien.formale_richtigkeit && (
                  <div><span className="text-purple-800 font-bold">3. Dil Bilgisi & Doğruluk (0-20 Puan):</span> {currentQ.inhalt.bewertungskriterien.formale_richtigkeit}</div>
                )}
              </div>
            )}

            {showMusterloesung && currentQ.inhalt.musterloesung && (
              <div className="bg-[#FFFDF7] border border-amber-300 rounded-xl p-4 sm:p-5 mt-2 space-y-2 animate-fadeIn shadow-2xs">
                <div className="flex items-center justify-between pb-1 border-b border-amber-200/80">
                  <p className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Resmi telc B2 Arşivi – 100% Puanlık Model Çözüm
                  </p>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Referans Metin
                  </span>
                </div>
                <p className="text-slate-800 text-[14.5px] leading-relaxed whitespace-pre-line font-sans font-normal pt-1">
                  {currentQ.inhalt.musterloesung}
                </p>
              </div>
            )}
          </div>

          {/* Yazı Alanı */}
          {!evaluation ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder={`${AUFGABE_TYPE_LABELS[currentQ.aufgabe_typ] ?? 'Metninizi'} buraya yazın...\n\nÖrnek: Sehr geehrte Damen und Herren,\n\nMindestwortzahl: ${minWords} Wörter`}
                  className="w-full h-80 bg-white border border-stone-300 focus:border-purple-600 rounded-2xl p-5 text-slate-900 placeholder:text-stone-400 text-base leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all font-sans shadow-xs font-normal"
                />
                <div className="absolute bottom-4 right-4 text-xs font-semibold px-2.5 py-1 bg-stone-100 text-slate-600 rounded-lg border border-stone-200">
                  {wordCount} kelime
                </div>
              </div>

              {/* Kelime sayacı */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className={wordCount >= minWords ? 'text-emerald-700 font-bold' : 'text-slate-600'}>
                    {wordCount} / {minWords} kelime (asgari gereksinim)
                  </span>
                  {wordCount >= minWords && <span className="text-emerald-700 font-bold">✓ Yeterli uzunluk</span>}
                </div>
                <div className="h-2 bg-stone-200/70 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${wordCount >= minWords ? 'bg-emerald-600' : 'bg-purple-600'}`}
                    style={{ width: `${wordPct}%` }}
                  />
                </div>
              </div>

              {wordCount < 20 && text.length > 0 && (
                <div className="flex items-center gap-2 text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  Değerlendirme yapabilmek için en az 20 kelimelik bir metin girmelisiniz.
                </div>
              )}

              <button
                onClick={handleEvaluate}
                disabled={evaluating || wordCount < 20}
                className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2"
              >
                {evaluating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Gemini AI metninizi resmi telc B2 kriterlerine göre inceliyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    AI ile Resmi telc B2 Değerlendirmesi Yap
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Değerlendirme Sonucu */
            <div className="space-y-4 animate-fadeIn">
              <div className={`rounded-2xl p-6 border shadow-xs ${evaluation.bestanden ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      {evaluation.bestanden ? <CheckCircle className="w-6 h-6 text-emerald-600" /> : <XCircle className="w-6 h-6 text-rose-600" />}
                      <span className={`text-xl font-black ${evaluation.bestanden ? 'text-emerald-800' : 'text-rose-800'}`}>
                        {evaluation.gesamtnote.toLocaleUpperCase('tr-TR')} – {evaluation.gesamt_punkte}/60 Puan
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs font-medium">
                      Kelime sayısı: <span className="font-bold">{evaluation.wortanzahl}</span> {!evaluation.wortanzahl_ausreichend && <span className="text-rose-700 font-bold">(Yetersiz – asgari {minWords})</span>}
                    </p>
                  </div>
                  <div className="space-y-1 text-sm bg-white/70 p-3 rounded-xl border border-stone-200/60">
                    <div className="flex items-center justify-between gap-4"><span className="text-slate-600">İçerik (Inhalt):</span><span className="text-slate-900 font-bold">{evaluation.inhalt_punkte}/20</span></div>
                    <div className="flex items-center justify-between gap-4"><span className="text-slate-600">İletişim (Gestaltung):</span><span className="text-slate-900 font-bold">{evaluation.kommunikative_gestaltung_punkte}/20</span></div>
                    <div className="flex items-center justify-between gap-4"><span className="text-slate-600">Dil Bilgisi (Korrektheit):</span><span className="text-slate-900 font-bold">{evaluation.formale_richtigkeit_punkte}/20</span></div>
                  </div>
                </div>
              </div>

              {/* Detaylı Geri Bildirim */}
              <div className="space-y-3">
                {[
                  { label: 'İçerik Geri Bildirimi', text: evaluation.inhalt_feedback, badgeBg: 'bg-purple-100 text-purple-800', border: 'border-purple-200' },
                  { label: 'İletişim & Dil Becerisi Geri Bildirimi', text: evaluation.kommunikation_feedback, badgeBg: 'bg-blue-100 text-blue-800', border: 'border-blue-200' },
                  { label: 'Dil Bilgisi & Sözcük Dağarcığı', text: evaluation.grammatik_feedback, badgeBg: 'bg-amber-100 text-amber-800', border: 'border-amber-200' },
                ].map(item => (
                  <div key={item.label} className={`bg-white rounded-2xl border ${item.border} p-5 space-y-2 shadow-xs`}>
                    <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${item.badgeBg}`}>
                      {item.label}
                    </span>
                    <p className="text-slate-800 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}

                {evaluation.staerken.length > 0 && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 shadow-xs">
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">✨ Başarılı Bulunan Yönler</p>
                    <ul className="space-y-1.5">
                      {evaluation.staerken.map((s, i) => (
                        <li key={i} className="text-sm text-slate-800 flex items-start gap-2">
                          <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {evaluation.verbesserungen.length > 0 && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">💡 Geliştirilmesi Önerilen Noktalar</p>
                    <ul className="space-y-1.5">
                      {evaluation.verbesserungen.map((v, i) => (
                        <li key={i} className="text-sm text-slate-800 flex items-start gap-2">
                          <span className="text-amber-600 font-bold mt-0.5">→</span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setEvaluation(null); }}
                  className="flex-1 py-3 bg-white hover:bg-stone-50 border border-stone-200 text-slate-700 font-bold rounded-xl transition-colors text-sm shadow-2xs"
                >
                  Metni Düzenle
                </button>
                <button
                  onClick={() => { setEvaluation(null); setText(''); }}
                  className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm shadow-sm"
                >
                  Temizle & Yeni Metin Yaz
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10 text-slate-500 font-medium">Henüz Schreiben görevi eklenmemiş.</div>
      )}
    </div>
  );
}

