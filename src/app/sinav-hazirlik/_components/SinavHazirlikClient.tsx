"use client";

import { useState } from 'react';
import { useB2Progress } from '@/hooks/useB2Progress';
import { B2Dashboard } from './B2Dashboard';
import { LesenModule } from './LesenModule';
import { HoerenModule } from './HoerenModule';
import { SchreibenModule } from './SchreibenModule';
import { SprechenModule } from './SprechenModule';
import { ErrorPool } from './ErrorPool';
import { PrintView } from './PrintView';
import {
  BookOpen, Headphones, PenLine, MessageSquare,
  LayoutDashboard, AlertCircle, Printer, GraduationCap,
  ChevronRight, Trophy, Flame
} from 'lucide-react';

type ActiveModule = 'dashboard' | 'lesen' | 'hoeren' | 'schreiben' | 'sprechen' | 'fehler' | 'print';

const modules = [
  { id: 'lesen' as const, label: 'Lesen', sublabel: 'Okuma', icon: BookOpen, color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30', active: 'bg-emerald-600 text-white border-emerald-500', points: '60 Puan', aufgaben: '4 Görev' },
  { id: 'hoeren' as const, label: 'Hören', sublabel: 'Dinleme', icon: Headphones, color: 'from-blue-500 to-indigo-600', bg: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30', active: 'bg-blue-600 text-white border-blue-500', points: '60 Puan', aufgaben: '4 Görev' },
  { id: 'schreiben' as const, label: 'Schreiben', sublabel: 'Yazma', icon: PenLine, color: 'from-purple-500 to-pink-600', bg: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30', active: 'bg-purple-600 text-white border-purple-500', points: '60 Puan', aufgaben: '4 Görev' },
  { id: 'sprechen' as const, label: 'Sprechen', sublabel: 'Konuşma', icon: MessageSquare, color: 'from-orange-500 to-red-600', bg: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30', active: 'bg-orange-600 text-white border-orange-500', points: '60 Puan', aufgaben: '4 Görev' },
];

export function SinavHazirlikClient() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const { progress, streak, todayReviews, overallAccuracy, isLoaded } = useB2Progress();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard': return <B2Dashboard onNavigate={setActiveModule} />;
      case 'lesen': return <LesenModule />;
      case 'hoeren': return <HoerenModule />;
      case 'schreiben': return <SchreibenModule />;
      case 'sprechen': return <SprechenModule />;
      case 'fehler': return <ErrorPool />;
      case 'print': return <PrintView />;
      default: return <B2Dashboard onNavigate={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="border-b border-stone-200/80 bg-white/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => setActiveModule('dashboard')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-slate-900 font-bold text-sm leading-tight">B2 Sınav Hazırlığı</p>
              <p className="text-slate-500 text-[10px] leading-tight">telc Deutsch-Test für den Beruf</p>
            </div>
          </button>

          {/* Quick Stats */}
          <div className="flex items-center gap-2.5">
            {streak.current > 0 && (
              <div
                className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 rounded-full px-3 py-1 shadow-xs cursor-default"
                title="Günlük Giriş Serisi: Her gün düzenli çalışarak serinizi koruyun"
              >
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                <span className="text-orange-800 text-xs font-bold">Seri: {streak.current} Gün</span>
              </div>
            )}
            {overallAccuracy > 0 && (
              <div
                className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 shadow-xs cursor-default"
                title="Genel Doğruluk Başarı Oranı"
              >
                <Trophy className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-800 text-xs font-bold">%{overallAccuracy} Başarı</span>
              </div>
            )}
            {todayReviews.length > 0 && (
              <div
                className="flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-full px-3 py-1 animate-pulse shadow-xs cursor-default"
                title="Bugün Tekrar Edilecek Yanlış Sorular (SM-2)"
              >
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span className="text-red-800 text-xs font-bold">{todayReviews.length} Tekrar</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 py-6 gap-6">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col gap-2 w-56 shrink-0">
          {/* Dashboard */}
          <button
            onClick={() => setActiveModule('dashboard')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 shadow-xs ${
              activeModule === 'dashboard'
                ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                : 'bg-white hover:bg-stone-50 border-stone-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span className="text-sm font-semibold">Dashboard</span>
            {activeModule === 'dashboard' && <ChevronRight className="w-3 h-3 ml-auto text-white/70" />}
          </button>

          <div className="mt-3 mb-1 px-2">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Modüller</p>
          </div>

          {modules.map((m) => {
            const Icon = m.icon;
            const prog = progress[m.id as keyof typeof progress];
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 shadow-xs ${
                  isActive
                    ? `${m.active} shadow-md`
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">{m.label}</p>
                  <p className="text-xs opacity-70 truncate">{m.sublabel}</p>
                </div>
                {prog.lastScore > 0 && (
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded border ${
                      isActive
                        ? 'bg-white/20 border-white/30 text-white'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    }`}
                    title={`Son Test Puanı: ${prog.lastScore} / 60 Puan`}
                  >
                    {prog.lastScore}/60 P
                  </span>
                )}
              </button>
            );
          })}

          <div className="mt-3 mb-1 px-2">
            <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Araçlar</p>
          </div>

          <button
            onClick={() => setActiveModule('fehler')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 shadow-xs ${
              activeModule === 'fehler'
                ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                : 'bg-white hover:bg-rose-50/50 border-stone-200 text-slate-700 hover:text-rose-700'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold">Hata Havuzu</p>
              {todayReviews.length > 0 && (
                <p className="text-xs text-rose-600 font-medium">{todayReviews.length} bekliyor</p>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveModule('print')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 shadow-xs ${
              activeModule === 'print'
                ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                : 'bg-white hover:bg-stone-50 border-stone-200 text-slate-700 hover:text-slate-900'
            }`}
          >
            <Printer className="w-4 h-4 shrink-0" />
            <p className="text-sm font-semibold">Yazdır / PDF</p>
          </button>

          {/* Score Summary */}
          <div className="mt-auto pt-4 border-t border-stone-200/80">
            <div className="bg-white rounded-xl border border-stone-200/80 p-3 space-y-2.5 shadow-xs">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Son Puanlar</p>
              {modules.map(m => {
                const prog = progress[m.id as keyof typeof progress];
                const pct = Math.round((prog.lastScore / 60) * 100);
                return (
                  <div key={m.id} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600 font-medium">
                      <span>{m.label}</span>
                      <span className={prog.lastScore >= 36 ? 'text-emerald-600 font-bold' : prog.lastScore > 0 ? 'text-rose-600 font-bold' : 'text-slate-400'}>
                        {prog.lastScore > 0 ? `${prog.lastScore}/60` : '–'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${prog.lastScore >= 36 ? 'bg-emerald-500' : prog.lastScore > 0 ? 'bg-rose-500' : 'bg-transparent'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-stone-100 flex justify-between text-xs items-center">
                <span className="text-slate-500 font-medium">Toplam</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {Object.values(progress).reduce((s, m) => s + m.lastScore, 0)}/240
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-stone-200 flex items-center justify-around px-2 py-2 shadow-lg">
          {[
            { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Ana' },
            ...modules.map(m => ({ id: m.id, icon: m.icon, label: m.label })),
            { id: 'fehler' as const, icon: AlertCircle, label: 'Hata' },
            { id: 'print' as const, icon: Printer, label: 'Yazdır' },
          ].map(m => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all ${isActive ? 'text-blue-600 font-bold' : 'text-slate-500'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium">{m.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20 lg:pb-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
