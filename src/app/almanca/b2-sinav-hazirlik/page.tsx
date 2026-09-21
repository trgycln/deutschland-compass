import Link from 'next/link';
import { ArrowLeft, Clock, GraduationCap, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import { SinavHazirlikClient } from './_components/SinavHazirlikClient';

interface PageProps {
  searchParams: Promise<{ preview?: string }>;
}

export default async function B2SinavHazirlikPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const isPreview = params?.preview === 'true' || params?.preview === '1';

  if (isPreview) {
    return <SinavHazirlikClient />;
  }

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-8 max-w-lg w-full">
        <Link href="/" className="hover:text-blue-600 transition-colors">Ana Sayfa</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/almanca" className="hover:text-blue-600 transition-colors">Almanca</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">B2 Sınav Hazırlığı (ALL DOSYASI)</span>
      </nav>

      <div className="max-w-lg w-full text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-lg shadow-slate-100 dark:shadow-none">
        <div className="relative mx-auto mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-blue-600/20 border border-blue-200 dark:border-blue-800 flex items-center justify-center shadow-sm">
          <GraduationCap className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 items-center justify-center text-[9px] font-bold text-white">!</span>
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          telc Deutsch B2 Beruf (ALL DOSYASI)
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          B2 Sınav Hazırlık Modülü <br className="hidden sm:inline" />
          <span className="text-blue-600 dark:text-blue-400">(ALL DOSYASI)</span>
        </h1>

        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
          telc Deutsch-Test für den Beruf B2 sınavına yönelik, toplulukta <strong>ALL DOSYASI</strong> olarak bilinen interaktif soru havuzu, modüller (Lesen, Hören, Schreiben, Sprechen) ve aralıklı tekrar çalışma sistemi hazırlanmaktadır.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/almanca/b2-sinav-hazirlik?preview=true"
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            Çalışma Modülünü Aç (Önizleme)
          </Link>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <Link
              href="/almanca"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Almanca Sayfasına Dön
            </Link>
            <Link
              href="/rehber"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              Rehberleri İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
