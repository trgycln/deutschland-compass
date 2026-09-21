"use client";

import { useState } from 'react';
import { AlertCircle, BookOpen, Headphones, PenLine, MessageSquare, CheckCircle, XCircle, Calendar, Flame } from 'lucide-react';
import { useB2Progress, type B2ErrorItem } from '@/hooks/useB2Progress';

const MODULE_ICONS = {
  lesen: BookOpen,
  hoeren: Headphones,
  schreiben: PenLine,
  sprechen: MessageSquare,
};

const MODULE_COLORS = {
  lesen: 'text-emerald-800 bg-emerald-100/80 border-emerald-300',
  hoeren: 'text-blue-800 bg-blue-100/80 border-blue-300',
  schreiben: 'text-purple-800 bg-purple-100/80 border-purple-300',
  sprechen: 'text-amber-800 bg-amber-100/80 border-amber-300',
};

export function ErrorPool() {
  const { errorPool, todayReviews, markReviewed, addToErrorPool } = useB2Progress();
  const [reviewing, setReviewing] = useState<B2ErrorItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewMode, setReviewMode] = useState<'today' | 'all'>('today');

  const displayItems = reviewMode === 'today' ? todayReviews : errorPool;

  const handleQuality = (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
    if (!reviewing) return;
    markReviewed(reviewing.questionId, quality);
    setReviewing(null);
    setShowAnswer(false);
  };

  if (reviewing) {
    const Icon = MODULE_ICONS[reviewing.modul as keyof typeof MODULE_ICONS] ?? AlertCircle;
    const color = MODULE_COLORS[reviewing.modul as keyof typeof MODULE_COLORS] ?? '';
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-slate-900 font-bold text-xl">Hata Havuzu – Kart Tekrarı</h2>
            <p className="text-rose-700 text-sm font-medium">Spaced Repetition (SM-2 Akıllı Algoritma)</p>
          </div>
        </div>

        {/* Soru Kartı */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${color}`}>
            <Icon className="w-3.5 h-3.5" />
            {reviewing.modul.charAt(0).toUpperCase() + reviewing.modul.slice(1)} – Aufgabe {reviewing.aufgabe}
          </div>
          <p className="text-slate-900 text-lg leading-relaxed font-semibold">{reviewing.frageText}</p>
          <div className="text-xs text-slate-500 font-medium">
            Toplam yanlış sayısı: <span className="text-rose-600 font-bold">{reviewing.wrongCount}</span> · Tekrar döngüsü: {reviewing.repetitions}. tekrar
          </div>
        </div>

        {/* Cevap Göster */}
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="w-full py-3.5 bg-white hover:bg-stone-50 border border-stone-300 text-slate-800 font-bold rounded-xl transition-colors shadow-2xs text-sm"
          >
            Doğru Cevabı Göster
          </button>
        ) : (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 shadow-2xs">
              <p className="text-xs text-emerald-800 font-bold uppercase tracking-wider mb-1">Doğru Cevap</p>
              <p className="text-emerald-950 font-bold text-base">{reviewing.korrektAnswer}</p>
            </div>

            <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3 shadow-xs">
              <p className="text-slate-700 text-sm font-semibold text-center">Bu soruyu ne kadar rahat hatırladınız?</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {([
                  { q: 0 as const, label: '0 - Hiç bilmedim', bg: 'bg-rose-600 hover:bg-rose-700 text-white' },
                  { q: 1 as const, label: '1 - Çok zorlandı', bg: 'bg-rose-500 hover:bg-rose-600 text-white' },
                  { q: 2 as const, label: '2 - Güçlükle', bg: 'bg-amber-600 hover:bg-amber-700 text-white' },
                  { q: 3 as const, label: '3 - Biraz zorlandım', bg: 'bg-amber-500 hover:bg-amber-600 text-white' },
                  { q: 4 as const, label: '4 - İyi hatırladım', bg: 'bg-emerald-600 hover:bg-emerald-700 text-white' },
                  { q: 5 as const, label: '5 - Çok kolaydı', bg: 'bg-emerald-500 hover:bg-emerald-600 text-white' },
                ] as const).map(({ q, label, bg }) => (
                  <button
                    key={q}
                    onClick={() => handleQuality(q)}
                    className={`${bg} font-bold text-xs py-3 px-2 rounded-xl transition-all shadow-2xs`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => { setReviewing(null); setShowAnswer(false); }}
          className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors mx-auto block pt-1"
        >
          ← Havuz listesine dön
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-slate-900 font-bold text-xl">Hata Havuzu & Akıllı Tekrar</h2>
          <p className="text-slate-500 text-sm font-medium">SM-2 Spaced Repetition Algoritması</p>
        </div>
        <div className="ml-auto flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-full px-3.5 py-1">
          <Flame className="w-4 h-4 text-rose-600" />
          <span className="text-rose-800 text-xs font-bold">{todayReviews.length} bugün</span>
        </div>
      </div>

      {/* Bugün / Hepsi Toggle */}
      <div className="flex gap-2">
        {['today', 'all'].map(mode => (
          <button
            key={mode}
            onClick={() => setReviewMode(mode as 'today' | 'all')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              reviewMode === mode
                ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                : 'bg-white text-slate-700 border-stone-200 hover:bg-stone-50 shadow-2xs'
            }`}
          >
            {mode === 'today' ? `Bugün Tekrar Edilecekler (${todayReviews.length})` : `Tüm Yanlış Havuzu (${errorPool.length})`}
          </button>
        ))}
      </div>

      {displayItems.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center space-y-3 shadow-xs">
          <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-slate-900 font-bold text-lg">
            {reviewMode === 'today' ? 'Harika! Bugün tekrar edilecek soru kalmadı.' : 'Hata havuzunuz tertemiz!'}
          </h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            {reviewMode === 'today'
              ? 'Çözdüğünüz testlerde yanlış yaptığınız sorular aralıklı tekrar için zamanı geldiğinde burada listelenir.'
              : 'Test çözerken yanlış cevapladığınız sorular otomatik olarak bu havuza eklenir.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayItems.map(item => {
            const Icon = MODULE_ICONS[item.modul as keyof typeof MODULE_ICONS] ?? AlertCircle;
            const color = MODULE_COLORS[item.modul as keyof typeof MODULE_COLORS] ?? '';
            const isOverdue = new Date(item.nextReview) < new Date();
            return (
              <div
                key={item.questionId}
                className="bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-5 transition-all shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-bold ${color}`}>
                        <Icon className="w-3.5 h-3.5" />
                        {item.modul} – Aufgabe {item.aufgabe}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold">
                          Zamanı Geldi!
                        </span>
                      )}
                    </div>
                    <p className="text-slate-900 text-sm font-semibold leading-relaxed">{item.frageText}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-rose-600 font-bold">
                        <XCircle className="w-3.5 h-3.5" /> {item.wrongCount}x yanlış
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> Sonraki: {new Date(item.nextReview).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setReviewing(item); setShowAnswer(false); }}
                    className="shrink-0 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors shadow-2xs self-start sm:self-center"
                  >
                    Şimdi Tekrar Et
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

