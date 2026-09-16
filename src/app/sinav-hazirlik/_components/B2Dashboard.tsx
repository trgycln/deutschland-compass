"use client";

import { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, AlertTriangle, Loader2, Key, RefreshCw, Copy, Smartphone, TrendingUp, Flame, AlertCircle, Calendar, ChevronRight, Target, Award, Clock, Headphones, PenLine, MessageSquare } from 'lucide-react';
import { useB2Progress } from '@/hooks/useB2Progress';

type ActiveModule = 'dashboard' | 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'fehler' | 'print';

interface Props {
  onNavigate: (module: ActiveModule) => void;
}

const MODULE_CONFIG = [
  {
    id: 'lesen' as const,
    label: 'Lesen',
    sublabel: 'Okuma',
    icon: BookOpen,
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50/40 hover:bg-emerald-50/80',
    minPunkte: 36,
  },
  {
    id: 'hoeren' as const,
    label: 'Hören',
    sublabel: 'Dinleme',
    icon: Headphones,
    gradient: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/20',
    border: 'border-blue-200',
    bg: 'bg-blue-50/40 hover:bg-blue-50/80',
    minPunkte: 36,
  },
  {
    id: 'schreiben' as const,
    label: 'Schreiben',
    sublabel: 'Yazma',
    icon: PenLine,
    gradient: 'from-purple-500 to-pink-600',
    glow: 'shadow-purple-500/20',
    border: 'border-purple-200',
    bg: 'bg-purple-50/40 hover:bg-purple-50/80',
    minPunkte: 36,
  },
  {
    id: 'sprechen' as const,
    label: 'Sprechen',
    sublabel: 'Konuşma',
    icon: MessageSquare,
    gradient: 'from-orange-500 to-red-600',
    glow: 'shadow-orange-500/20',
    border: 'border-orange-200',
    bg: 'bg-orange-50/40 hover:bg-orange-50/80',
    minPunkte: 36,
  },
];

export function B2Dashboard({ onNavigate }: Props) {
  const { progress, sessions, streak, todayReviews, overallAccuracy, moduleAccuracies, passkey, linkDevice, isSyncing } = useB2Progress();
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInputVal, setLinkInputVal] = useState('');

  const totalScore = Object.values(progress).reduce((sum, m) => sum + m.lastScore, 0);
  const totalPossible = 240;
  const totalPct = Math.round((totalScore / totalPossible) * 100);
  const passed = totalScore >= 144 && Object.values(progress).every(m => m.bestScore === 0 || m.lastScore >= 36);
  const hasAnyData = Object.values(progress).some(m => m.totalAttempts > 0);
  const lastSession = sessions[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Skor Kartı */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/60 to-indigo-900/60 border border-white/10 p-6">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.15),transparent)]" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-blue-300 text-sm font-medium mb-1">telc B2 Beruf – Toplam Puan</p>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-black text-white">{totalScore}</span>
              <span className="text-blue-300 text-xl mb-1">/ 240</span>
              {passed && (
                <span className="mb-1 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-xs font-bold">
                  ✓ BESTANDEN
                </span>
              )}
              {!passed && totalScore >= 100 && (
                <span className="mb-1 px-2.5 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-400 text-xs font-bold">
                  DEVAM
                </span>
              )}
            </div>
            <p className="text-blue-400 text-sm mt-1">Geçme barajı: 144/240 + her modülden min. 36 puan</p>
          </div>

          {/* Dairesel Progress */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <div className="relative">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke={totalPct >= 60 ? '#10b981' : totalPct >= 40 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - totalPct / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">{totalPct}%</p>
            </div>
            
            {/* Passkey Gösterimi */}
            {passkey && (
               <div className="text-center w-full">
                 <button 
                   onClick={() => navigator.clipboard.writeText(passkey)}
                   className="flex items-center justify-center gap-1.5 w-full py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors group"
                   title="İlerleme kodunu kopyala"
                 >
                   <Key className="w-3 h-3 text-blue-300" />
                   <span className="text-[10px] font-mono text-blue-200">{passkey}</span>
                   <Copy className="w-3 h-3 text-slate-500 group-hover:text-white" />
                 </button>
               </div>
            )}
          </div>
        </div>

        {/* Overall progress bar */}
        <div className="relative mt-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                totalPct >= 60 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                totalPct >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                'bg-gradient-to-r from-red-500 to-pink-400'
              }`}
              style={{ width: `${totalPct}%` }}
            />
            {/* Geçme barajı işareti */}
            <div className="absolute top-0 h-2 w-0.5 bg-white/50" style={{ left: '60%' }}>
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-white/50 whitespace-nowrap">144</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hızlı Stat Kartları */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <div className="flex items-center gap-2 text-orange-600">
            <Flame className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Çalışma Serisi</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{streak.current}</p>
          <p className="text-xs text-slate-500">gün üst üste giriş</p>
        </div>
        <div className="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-600">
            <Target className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Doğruluk</span>
          </div>
          <p className="text-2xl font-black text-slate-900">%{overallAccuracy}</p>
          <p className="text-xs text-slate-500">genel başarı</p>
        </div>
        <div className="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <div className="flex items-center gap-2 text-blue-600">
            <Calendar className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Oturum</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{sessions.length}</p>
          <p className="text-xs text-slate-500">toplam çalışma</p>
        </div>
        <div className="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col gap-1 shadow-xs">
          <div className="flex items-center gap-2 text-rose-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Tekrar</span>
          </div>
          <p className="text-2xl font-black text-slate-900">{todayReviews.length}</p>
          <p className="text-xs text-slate-500">bugün bekliyor</p>
        </div>
      </div>

      {/* Bugün Tekrar Bildirimi */}
      {todayReviews.length > 0 && (
        <button
          onClick={() => onNavigate('fehler')}
          className="w-full flex items-center gap-4 p-4 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100/60 transition-colors group shadow-xs"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-slate-900 font-bold">{todayReviews.length} soru tekrar etmeyi bekliyor</p>
            <p className="text-rose-700 text-sm">Spaced Repetition – Hata havuzundan bugünkü sorular</p>
          </div>
          <ChevronRight className="w-5 h-5 text-rose-500 group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {/* Modül Kartları */}
      <div>
        <h2 className="text-slate-900 font-bold text-lg mb-3 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Sınav Modülleri
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODULE_CONFIG.map((m) => {
            const Icon = m.icon;
            const prog = progress[m.id];
            const pct = Math.round((prog.lastScore / 60) * 100);
            const accuracy = moduleAccuracies.find(a => a.modul === m.id);
            const status = prog.lastScore >= 36 ? 'passed' : prog.lastScore > 0 ? 'failed' : 'untouched';

            return (
              <button
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className={`group relative overflow-hidden flex items-start gap-4 p-4 rounded-xl border ${m.border} ${m.bg} bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 text-left shadow-xs`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} shadow-md ${m.glow} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-slate-900 font-bold">{m.label}</p>
                      <p className="text-slate-500 text-xs">{m.sublabel}</p>
                    </div>
                    <div className="text-right">
                      {prog.lastScore > 0 ? (
                        <>
                          <p className={`text-xl font-black ${status === 'passed' ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {prog.lastScore}
                          </p>
                          <p className="text-slate-400 text-xs font-medium">/ 60</p>
                        </>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium">Başlanmadı</span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-700 bg-gradient-to-r ${m.gradient}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-slate-500 font-medium">
                      {accuracy?.accuracy !== null && (
                        <span>%{accuracy?.accuracy} başarı</span>
                      )}
                      {prog.totalAttempts > 0 && (
                        <span>{prog.totalAttempts} deneme</span>
                      )}
                    </div>
                    {status === 'passed' && (
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <Award className="w-3.5 h-3.5" /> Geçti
                      </span>
                    )}
                    {status === 'failed' && (
                      <span className="text-rose-600 font-bold">Min. 36 gerek</span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all mt-1 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Son Oturum */}
      {lastSession && (
        <div className="bg-white border border-stone-200/80 rounded-xl p-4 shadow-xs">
          <h3 className="text-slate-900 font-bold mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Son Oturum
          </h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${lastSession.passed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
              {lastSession.totalScore}/240 – {lastSession.passed ? 'Bestanden ✓' : 'Nicht bestanden ✗'}
            </div>
            <span className="text-slate-500 text-sm">{new Date(lastSession.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}</span>
            {lastSession.durationMinutes > 0 && (
              <span className="text-slate-500 text-sm">{lastSession.durationMinutes} dakika</span>
            )}
          </div>
        </div>
      )}

      {/* Cihaz Bağlama (Sync) */}
      <div className="bg-white border border-stone-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 justify-between shadow-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h4 className="text-slate-900 font-bold text-sm">Cihazlar Arası Senkronizasyon</h4>
            <p className="text-slate-500 text-xs mt-0.5">Başka bir cihazdaki (telefon/PC) ilerlemenizi anonim kodunuzla buraya aktarın.</p>
          </div>
        </div>
        
        {showLinkInput ? (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input 
              type="text" 
              value={linkInputVal}
              onChange={e => setLinkInputVal(e.target.value)}
              placeholder="b2-..." 
              className="bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 text-sm text-slate-900 w-full sm:w-40 focus:outline-none focus:border-indigo-600 focus:bg-white"
            />
            <button 
              onClick={() => {
                if(linkInputVal.startsWith('b2-')) {
                  linkDevice(linkInputVal.trim());
                  setShowLinkInput(false);
                }
              }}
              disabled={isSyncing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Bağla'}
            </button>
            <button 
              onClick={() => setShowLinkInput(false)}
              className="text-slate-500 hover:text-slate-800 px-2 py-1.5 text-sm"
            >
              İptal
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setShowLinkInput(true)}
            className="w-full sm:w-auto bg-stone-100 hover:bg-stone-200 border border-stone-200 text-slate-800 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-slate-600" />
            İlerleme Kodu Gir
          </button>
        )}
      </div>

      {/* İlk Kez Başlatma */}
      {!hasAnyData && (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Hazırlığa Başla!</h3>
            <p className="text-blue-300 text-sm mt-1">
              Sol menüden bir modül seç ve çalışmaya başla.<br />
              İlerleme verilerini bu tarayıcıda saklıyoruz.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {MODULE_CONFIG.map(m => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => onNavigate(m.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${m.border} ${m.bg} text-white text-sm font-medium hover:scale-105 transition-transform`}
                >
                  <Icon className="w-4 h-4" />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
