"use client";

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Utensils, Sparkles, BookOpen, PenTool, MessageSquare, Briefcase, Home, Radio, GraduationCap } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isHydrated) {
    return (
      <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60 flex flex-col">
        <div suppressHydrationWarning className="container mx-auto flex h-16 items-center justify-between px-4" />
      </header>
    );
  }

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60 flex flex-col">
      {/* Main Top Bar */}
      <div suppressHydrationWarning className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 bg-white flex items-center justify-center shadow-sm">
            <Image 
              src="/dc_logo.png" 
              alt="Deutschland Compass Logo" 
              width={40} 
              height={40} 
              className="object-cover scale-110"
            />
          </div>
          <span className="font-bold text-base sm:text-xl text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
            Deutschland Compass
          </span>
        </Link>
        
        {/* Actions / Right side */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3 mr-2">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-community-pulse'))}
              className="hover:text-emerald-700 text-emerald-800 dark:text-emerald-300 transition-all flex items-center gap-1.5 font-semibold bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 hover:scale-105 active:scale-95"
              title="Son saha notları ve güncellemeleri gör"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Topluluk Nabzı
            </button>
            <Link 
              href="/rehber/helal-mekanlar" 
              className="hover:text-amber-600 text-amber-700 dark:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-full border border-amber-100 dark:border-amber-800"
            >
              <Utensils className="w-4 h-4" />
              Helal Mekanlar
            </Link>
            <Link 
              href="/rehber/yapay-zeka-kariyerleri" 
              className="hover:text-fuchsia-700 text-fuchsia-800 dark:text-fuchsia-300 transition-colors flex items-center gap-1.5 font-semibold bg-fuchsia-50 dark:bg-fuchsia-900/20 px-3 py-1.5 rounded-full border border-fuchsia-100 dark:border-fuchsia-800"
            >
              <Sparkles className="w-4 h-4" />
              AI Kariyerleri
            </Link>
            <Link 
              href="/sinav-hazirlik" 
              className="hover:text-blue-700 text-blue-800 dark:text-blue-300 transition-colors flex items-center gap-1.5 font-semibold bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800"
            >
              <GraduationCap className="w-4 h-4" />
              B2 Hazırlık
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col p-0">
              <div className="p-6 pb-4 border-b border-slate-100 dark:border-slate-800">
                <SheetHeader className="flex flex-col items-center gap-4 mt-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-800 bg-white flex items-center justify-center shadow-md">
                    <Image 
                      src="/dc_logo.png" 
                      alt="Deutschland Compass Logo" 
                      width={64} 
                      height={64} 
                      className="object-cover scale-110"
                    />
                  </div>
                  <SheetTitle className="text-2xl font-bold text-center">Deutschland Compass</SheetTitle>
                </SheetHeader>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
                {/* Ana Menü */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Kesfet</h4>
                  <Link
                    href="/"
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Ana Sayfa</span>
                  </Link>
                  <div className="grid grid-cols-3 gap-2.5">
                    <Link 
                      href="/meslekler" 
                      className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="text-xs font-medium">Meslekler</span>
                    </Link>
                    <Link 
                      href="/rehber" 
                      className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="text-xs font-medium">Rehberler</span>
                    </Link>
                    <Link 
                      href="/sinav-hazirlik" 
                      className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/50 text-blue-900 dark:text-blue-200 transition-colors text-center border border-blue-100 dark:border-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-bold">B2 Sınavı</span>
                    </Link>
                  </div>
                </div>

                {/* Öne Çikanlar */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Öne Çikanlar</h4>
                  <div className="space-y-2">
                    <Link 
                      href="/rehber/helal-mekanlar" 
                      className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/30 dark:hover:bg-amber-900/40 text-amber-900 dark:text-amber-200 transition-colors font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="bg-amber-200/50 dark:bg-amber-800/50 p-2 rounded-md">
                        <Utensils className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                      </div>
                      Helal Mekanlar
                    </Link>
                    <Link 
                      href="/rehber/yapay-zeka-kariyerleri" 
                      className="flex items-center gap-3 p-3 rounded-lg bg-fuchsia-50 hover:bg-fuchsia-100 dark:bg-fuchsia-950/30 dark:hover:bg-fuchsia-900/40 text-fuchsia-900 dark:text-fuchsia-200 transition-colors font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="bg-fuchsia-200/50 dark:bg-fuchsia-800/50 p-2 rounded-md">
                        <Sparkles className="w-5 h-5 text-fuchsia-700 dark:text-fuchsia-400" />
                      </div>
                      AI Kariyerleri
                    </Link>
                    <Link 
                      href="/sinav-hazirlik" 
                      className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-900/40 text-blue-900 dark:text-blue-200 transition-colors font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="bg-blue-200/50 dark:bg-blue-800/50 p-2 rounded-md">
                        <GraduationCap className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                      </div>
                      B2 Sınav Hazırlığı
                    </Link>
                  </div>
                </div>

                {/* Topluluk */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topluluk</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        window.dispatchEvent(new CustomEvent('open-community-pulse'));
                      }}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-emerald-50/80 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 transition-colors font-semibold text-left mb-1"
                    >
                      <div className="bg-emerald-200/60 dark:bg-emerald-800/60 p-2 rounded-md">
                        <Radio className="w-5 h-5 text-emerald-700 dark:text-emerald-400 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>Topluluk Nabzı</span>
                          <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-full">CANLI</span>
                        </div>
                        <span className="text-xs font-normal text-emerald-700/80 dark:text-emerald-400/80">Son gelişmeler ve saha notları</span>
                      </div>
                    </button>
                    <Link 
                      href="/gurbet-kalemleri" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <PenTool className="w-5 h-5 text-slate-400" />
                      Gurbet Kalemleri
                    </Link>
                    <Link 
                      href="/telegram-gruplari" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <MessageSquare className="w-5 h-5 text-slate-400" />
                      Telegram Gruplari
                    </Link>
                    <Link 
                      href="/blog" 
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <BookOpen className="w-5 h-5 text-slate-400" />
                      Blog
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-slate-100 dark:border-slate-800 text-center text-sm text-slate-400 bg-slate-50 dark:bg-slate-950/50">
                &copy; {new Date().getFullYear()} Deutschland Compass
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Sub Navigation Bar (Desktop Only) */}
      <div className="hidden lg:flex border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50">
        <div className="container mx-auto px-4">
          <nav className="flex items-center h-12 gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            <Link href="/meslekler" className="hover:text-primary transition-colors flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Meslekler
            </Link>
            <Link href="/rehber" className="hover:text-primary transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Rehberler
            </Link>
            <Link 
              href="/sinav-hazirlik" 
              className="hover:text-blue-700 text-blue-800 dark:text-blue-300 transition-colors flex items-center gap-1.5 font-semibold bg-blue-50/80 dark:bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-200/70 dark:border-blue-800/60"
            >
              <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>B2 Sınav Hazırlığı</span>
              <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded-full">telc</span>
            </Link>
            <Link href="/gurbet-kalemleri" className="hover:text-primary transition-colors flex items-center gap-2">
              <PenTool className="w-4 h-4" />
              Gurbet Kalemleri
            </Link>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <Link href="/rehber/sirket-kurma" className="hover:text-primary transition-colors">Sirket Kurma</Link>
            <Link href="/telegram-gruplari" className="hover:text-primary transition-colors">Telegram Gruplari</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkimizda</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
