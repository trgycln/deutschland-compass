"use client";

import { useState, useEffect } from 'react';
import { Printer, Loader2, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

interface Question {
  id: string;
  modul: string;
  aufgabe: number;
  aufgabe_typ: string;
  thema: string;
  inhalt: any;
  audio_transkript?: string | null;
  punkte_max?: number;
}

export function PrintView() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/b2/questions') // Modül belirtilmediğinde tümünü çeker
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) {
          setQuestions(d);
        } else {
          setError('Veri formatı hatalı.');
        }
      })
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const grouped = questions.reduce((acc, q) => {
    if (!acc[q.modul]) acc[q.modul] = [];
    acc[q.modul].push(q);
    return acc;
  }, {} as Record<string, Question[]>);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-slate-400 animate-spin" />
        <p className="text-slate-400">Yazdırılabilir format hazırlanıyor...</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500" />
        <p className="text-slate-400">Yazdırılacak sınav içeriği bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Kontrol Paneli (Yazdırırken Gizlenecek) */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs print:hidden">
        <div>
          <h2 className="text-slate-900 font-bold text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-600" />
            Sınav Kitapçığı & Çıktı Görünümü
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Gerçek telc B2 sınav formatında kağıda basmak veya PDF olarak kaydetmek için hazırlandı.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="flex items-center gap-2 text-sm text-slate-700 bg-stone-50 border border-stone-200 px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-stone-100 transition-colors">
            <input
              type="checkbox"
              checked={showAnswers}
              onChange={(e) => setShowAnswers(e.target.checked)}
              className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-500/20"
            />
            <span className="font-medium">Cevap Anahtarı</span>
          </label>
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Yazdır / PDF Kaydet
          </button>
        </div>
      </div>

      {/* Yazdırma Alanı */}
      <div className="print-area bg-white text-black p-8 rounded-xl min-h-screen">
        {/* Yazdırma Stilleri */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @media print {
              body * {
                visibility: hidden;
              }
              .print-area, .print-area * {
                visibility: visible;
              }
              .print-area {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                background: white;
                color: black;
                padding: 0;
              }
              .page-break {
                page-break-before: always;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `
        }} />

        <div className="text-center mb-10 pb-10 border-b-2 border-slate-300">
          <h1 className="text-3xl font-bold uppercase tracking-widest text-slate-800">telc Deutsch-Test für den Beruf B2</h1>
          <p className="text-lg text-slate-600 mt-2">Prüfungssimulation - Testheft</p>
          <div className="mt-8 flex justify-between px-10 text-left border border-slate-300 p-4 rounded bg-slate-50">
            <div>
              <p className="font-bold">Name:</p>
              <div className="w-48 h-px bg-slate-400 mt-6"></div>
            </div>
            <div>
              <p className="font-bold">Datum:</p>
              <div className="w-32 h-px bg-slate-400 mt-6"></div>
            </div>
          </div>
        </div>

        {['lesen', 'hoeren', 'schreiben', 'sprechen'].map((modulName) => {
          const modQuestions = grouped[modulName];
          if (!modQuestions || modQuestions.length === 0) return null;

          return (
            <div key={modulName} className="mb-12 page-break">
              <h2 className="text-2xl font-black uppercase text-slate-800 border-b border-slate-400 pb-2 mb-6">
                Modul: {modulName.toUpperCase()}
              </h2>

              <div className="space-y-8">
                {modQuestions.sort((a, b) => a.aufgabe - b.aufgabe).map((q) => (
                  <div key={q.id} className="space-y-4">
                    <div className="bg-slate-100 p-3 rounded-md font-bold text-slate-800 flex justify-between">
                      <span>Aufgabe {q.aufgabe} - {q.thema}</span>
                      <span className="text-sm font-normal">Max. {q.punkte_max} Punkte</span>
                    </div>

                    {q.inhalt?.anweisung && (
                      <p className="italic text-slate-700 bg-slate-50 p-3 border-l-4 border-slate-400">
                        {q.inhalt.anweisung}
                      </p>
                    )}

                    {/* Lesen Modülü Özel */}
                    {modulName === 'lesen' && q.inhalt?.text && (
                      <div className="p-4 border border-slate-300 rounded text-justify font-sans leading-relaxed text-[15px] text-slate-900">
                        {q.inhalt.text}
                      </div>
                    )}

                    {/* Schreiben Modülü Özel */}
                    {modulName === 'schreiben' && (
                      <div className="space-y-4">
                        {q.inhalt.situation && <p>{q.inhalt.situation}</p>}
                        {q.inhalt.inhaltspunkte && (
                          <ul className="list-disc pl-6 space-y-1">
                            {q.inhalt.inhaltspunkte.map((pt: string, i: number) => (
                              <li key={i}>{pt}</li>
                            ))}
                          </ul>
                        )}
                        <div className="h-64 border-2 border-slate-300 rounded mt-4 p-2 relative">
                          <span className="absolute top-2 left-2 text-slate-400 text-xs">Schreibbereich...</span>
                        </div>
                      </div>
                    )}

                    {/* Sprechen Modülü Özel */}
                    {modulName === 'sprechen' && q.inhalt?.thema_karte && (
                      <div className="border-2 border-slate-800 rounded-lg p-6 max-w-md mx-auto text-center mt-6">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Themenkarte</p>
                        <h3 className="text-xl font-bold mb-4">{q.inhalt.thema_karte}</h3>
                        {q.inhalt.leitfragen && (
                          <ul className="text-left space-y-2 mt-4 text-slate-700">
                            {q.inhalt.leitfragen.map((lq: string, i: number) => (
                              <li key={i} className="flex gap-2"><span className="font-bold">•</span> {lq}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Sorular ve Seçenekler (Lesen ve Hören) */}
                    {q.inhalt?.fragen && (
                      <div className="space-y-5 pl-2 mt-4">
                        {q.inhalt.fragen.map((frage: any, fIdx: number) => (
                          <div key={fIdx} className="space-y-2">
                            <p className="font-semibold text-slate-800">
                              {frage.nummer}. {frage.frage || frage.aussage}
                            </p>
                            {frage.optionen && (
                              <div className="pl-6 space-y-1 text-slate-700">
                                {frage.optionen.map((opt: string, optIdx: number) => (
                                  <div key={optIdx} className="flex gap-2">
                                    <span>◯</span>
                                    <span>{opt}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Cevap Anahtarı (Sadece showAnswers true ise) */}
                            {showAnswers && frage.korrekt && (
                              <div className="pl-6 mt-2 pt-2 border-t border-slate-200">
                                <p className="text-emerald-700 font-bold text-sm flex items-center gap-1">
                                  <CheckCircle className="w-4 h-4 inline" /> Doğru Cevap: {frage.korrekt}
                                </p>
                                {frage.erklaerung && (
                                  <p className="text-slate-600 text-sm italic mt-1">{frage.erklaerung}</p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Hören Transkript (Eğer cevaplar gösteriliyorsa) */}
                    {showAnswers && modulName === 'hoeren' && q.audio_transkript && (
                      <div className="mt-6 bg-slate-50 p-4 border border-slate-300 rounded text-sm text-slate-700 font-sans leading-relaxed">
                        <p className="font-bold mb-2 uppercase text-xs tracking-wider">Transkript (Aufgabe {q.aufgabe})</p>
                        {q.audio_transkript}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        {/* Değerlendirme Kriterleri (Cevap Anahtarı aktifse) */}
        {showAnswers && (
          <div className="page-break">
            <h2 className="text-2xl font-black uppercase text-slate-800 border-b border-slate-400 pb-2 mb-6">
              Bewertungskriterien (Schreiben & Sprechen)
            </h2>
            <div className="space-y-8">
              {['schreiben', 'sprechen'].map(modulName => {
                 const mQs = grouped[modulName];
                 if(!mQs) return null;
                 return mQs.map(q => {
                   if(!q.inhalt.bewertungskriterien) return null;
                   return (
                     <div key={q.id} className="border border-slate-300 rounded p-4">
                       <h3 className="font-bold mb-3">{modulName.toUpperCase()} - Aufgabe {q.aufgabe}</h3>
                       <div className="space-y-2 text-sm text-slate-700">
                         {Object.entries(q.inhalt.bewertungskriterien).map(([k, v]) => (
                           <div key={k} className="grid grid-cols-1 md:grid-cols-4 gap-2 border-b border-slate-100 pb-2">
                             <div className="font-bold capitalize">{String(k).replace(/_/g, ' ')}</div>
                             <div className="md:col-span-3">{String(v)}</div>
                           </div>
                         ))}
                       </div>
                     </div>
                   );
                 });
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
