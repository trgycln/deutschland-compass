"use client";

import { useState, useSyncExternalStore, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Utensils, Sparkles, BookOpen, PenTool, MessageSquare, Briefcase, Home, Radio, GraduationCap, Share2, Check, Smartphone, ChevronRight } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'Deutschland Compass',
      text: "Almanya'daki profesyoneller için dayanışma ağı — rehberler, kariyer, sınav hazırlık ve daha fazlası!",
      url: 'https://deutschland-compass-self.vercel.app',
    };
    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      }
    } catch {
      // User cancelled or error
    }
  }, []);

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
        <div className="flex items-center gap-2 sm:gap-4">
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

          </div>

          {/* Install App Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-install-modal'))}
            title="Uygulamayı telefonuna yükle"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 border bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white border-slate-600 hover:scale-105 active:scale-95 shadow-sm"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden md:inline">Uygulamayı Yükle</span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            title="Uygulamayı arkadaşlarınla paylaş"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-sm transition-all duration-200 border ${
              shareCopied
                ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 scale-95'
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white border-blue-600 hover:scale-105 active:scale-95 shadow-md hover:shadow-blue-500/30 shadow-blue-500/20'
            }`}
          >
            {shareCopied ? (
              <><Check className="w-4 h-4" /><span className="hidden sm:inline">Kopyalandı!</span></>
            ) : (
              <><Share2 className="w-4 h-4" /><span className="hidden sm:inline">Paylaş</span></>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden w-11 h-11">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[380px] flex flex-col p-0 bg-white dark:bg-slate-950">
              {/* Sleek Compact Header */}
              <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center pr-12">
                <SheetHeader className="flex flex-row items-center gap-3 text-left space-y-0">
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white flex items-center justify-center shadow-xs flex-shrink-0">
                    <Image 
                      src="/dc_logo.png" 
                      alt="Deutschland Compass Logo" 
                      width={36} 
                      height={36} 
                      className="object-cover scale-110"
                    />
                  </div>
                  <div className="flex flex-col">
                    <SheetTitle className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      Deutschland Compass
                    </SheetTitle>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      Dayanışma & Rehberlik Ağı
                    </span>
                  </div>
                </SheetHeader>
              </div>
              
              {/* Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-4">
                {/* Hızlı Erişim Kartları (2x2 Grid) */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all active:scale-98 border border-slate-100/80 dark:border-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center flex-shrink-0 text-blue-600 dark:text-blue-400">
                      <Home className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight">Ana Sayfa</p>
                      <p className="text-[10px] text-slate-400 truncate">Genel Bakış</p>
                    </div>
                  </Link>

                  <Link
                    href="/rehber/helal-mekanlar"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50/60 hover:bg-amber-100/60 dark:bg-amber-950/30 dark:hover:bg-amber-950/50 text-amber-950 dark:text-amber-100 transition-all active:scale-98 border border-amber-200/60 dark:border-amber-800/60 shadow-xs"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0 text-white shadow-xs">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold leading-tight text-amber-900 dark:text-amber-200">Helal Mekanlar</p>
                      </div>
                      <p className="text-[10px] text-amber-600/80 dark:text-amber-300/80 truncate">Restoran & Market</p>
                    </div>
                  </Link>

                  <Link
                    href="/meslekler"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all active:scale-98 border border-slate-100/80 dark:border-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center flex-shrink-0 text-emerald-600 dark:text-emerald-400">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight">Meslekler</p>
                      <p className="text-[10px] text-slate-400 truncate">Kariyer & Denklik</p>
                    </div>
                  </Link>

                  <Link
                    href="/rehber"
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 transition-all active:scale-98 border border-slate-100/80 dark:border-slate-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center flex-shrink-0 text-purple-600 dark:text-purple-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-tight">Rehberler</p>
                      <p className="text-[10px] text-slate-400 truncate">Bürokrasi & Yaşam</p>
                    </div>
                  </Link>
                </div>

                {/* Topluluk Nabzı - Canlı Banner */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.dispatchEvent(new CustomEvent('open-community-pulse'));
                  }}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-500/10 hover:from-emerald-500/15 hover:to-teal-500/15 border border-emerald-500/30 text-emerald-950 dark:text-emerald-100 transition-all active:scale-98 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-xs">
                    <Radio className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold">Topluluk Nabzı</span>
                      <span className="text-[9px] bg-emerald-600 text-white font-bold px-1.5 py-0.2 rounded-full">CANLI</span>
                    </div>
                    <span className="text-[10px] text-emerald-700/80 dark:text-emerald-300/80 truncate block">Saha notları & anlık duyurular</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-emerald-600/60 dark:text-emerald-400/60 flex-shrink-0" />
                </button>

                {/* Öne Çıkanlar */}
                <div className="space-y-1">
                  <h4 className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    Öne Çıkan Rehberler
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    <Link 
                      href="/rehber/helal-mekanlar" 
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-700 dark:text-amber-400 flex-shrink-0">
                          <Utensils className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate">Helal Mekanlar</p>
                          <p className="text-[10px] text-slate-400 truncate">Restoran & helal marketler</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                    </Link>

                    <Link 
                      href="/rehber/yapay-zeka-kariyerleri" 
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-fuchsia-100 dark:bg-fuchsia-950/60 flex items-center justify-center text-fuchsia-700 dark:text-fuchsia-400 flex-shrink-0">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate">AI Kariyerleri</p>
                          <p className="text-[10px] text-slate-400 truncate">Yapay zeka ile kariyer olanakları</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 flex-shrink-0" />
                    </Link>
                  </div>
                </div>

                {/* Topluluk */}
                <div className="space-y-1">
                  <h4 className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
                    Topluluk & İletişim
                  </h4>
                  <div className="grid grid-cols-3 gap-1.5">
                    <Link 
                      href="/gurbet-kalemleri" 
                      className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <PenTool className="w-4 h-4 text-slate-500" />
                      <span className="text-[11px] font-medium leading-tight">Gurbet Kalemleri</span>
                    </Link>
                    <Link 
                      href="/telegram-gruplari" 
                      className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <MessageSquare className="w-4 h-4 text-slate-500" />
                      <span className="text-[11px] font-medium leading-tight">Telegram Grupları</span>
                    </Link>
                    <Link 
                      href="/blog" 
                      className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      <span className="text-[11px] font-medium leading-tight">Blog</span>
                    </Link>
                  </div>
                </div>

                {/* Subtle Copyright */}
                <div className="pt-1 text-center">
                  <span className="text-[10px] text-slate-400">&copy; {new Date().getFullYear()} Deutschland Compass</span>
                </div>
              </div>
              
              {/* Compact Dual Action Bottom Bar */}
              <div className="p-3 px-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/80 backdrop-blur">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { handleShare(); setIsOpen(false); }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs transition-all active:scale-95 shadow-xs"
                  >
                    <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Paylaş</span>
                  </button>
                  <button
                    onClick={() => { window.dispatchEvent(new CustomEvent('open-install-modal')); setIsOpen(false); }}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs transition-all active:scale-95"
                  >
                    <Smartphone className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Uygulamayı Yükle</span>
                  </button>
                </div>
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
