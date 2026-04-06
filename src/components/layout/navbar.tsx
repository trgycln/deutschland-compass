"use client";

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Utensils, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isHydrated) {
    return (
      <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
        <div suppressHydrationWarning className="container mx-auto flex h-16 items-center justify-between px-4" />
      </header>
    );
  }

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
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
          <span className="font-bold text-xl text-slate-900 dark:text-white">Deutschland Compass</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/meslekler" className="hover:text-primary transition-colors">Meslekler</Link>
          <Link href="/rehber" className="hover:text-primary transition-colors">Rehberler</Link>
          <Link href="/rehber/sirket-kurma" className="hover:text-primary transition-colors">Şirket Kurma</Link>
          
          {/* Helal Mekanlar Linki */}
          <Link 
            href="/rehber/helal-mekanlar" 
            className="hover:text-amber-600 text-amber-700 dark:text-amber-400 transition-colors flex items-center gap-1.5 font-semibold bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-md"
          >
            <Utensils className="w-3.5 h-3.5" />
            Helal Mekanlar
          </Link>

          <Link 
            href="/rehber/yapay-zeka-kariyerleri" 
            className="hover:text-fuchsia-700 text-fuchsia-800 dark:text-fuchsia-300 transition-colors flex items-center gap-1.5 font-semibold bg-fuchsia-50 dark:bg-fuchsia-900/20 px-2 py-1 rounded-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Kariyerleri
            <Badge className="ml-1 text-[10px] px-1.5 py-0 bg-fuchsia-600 text-white border-none">Yeni</Badge>
          </Link>

          <Link href="/gurbet-kalemleri" className="hover:text-primary transition-colors">Gurbet Kalemleri</Link>

          <Link href="/telegram-gruplari" className="hover:text-primary transition-colors">Telegram</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link>
        </nav>

        {/* Tablet/Medium Navigation */}
        <nav className="hidden md:flex xl:hidden items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
           <Link href="/meslekler" className="hover:text-primary">Meslekler</Link>
           <Link href="/rehber/helal-mekanlar" className="text-amber-600 font-semibold flex gap-1 items-center"><Utensils className="w-3 h-3"/> Mekanlar</Link>
           <Link href="/rehber/yapay-zeka-kariyerleri" className="text-fuchsia-700 dark:text-fuchsia-300 font-semibold flex gap-1 items-center bg-fuchsia-50 dark:bg-fuchsia-900/20 px-2 py-1 rounded-md relative">
             <Sparkles className="w-3 h-3"/> AI Kariyerleri
             <Badge className="ml-1 text-[9px] px-1 py-0 bg-fuchsia-600 text-white border-none">Yeni</Badge>
           </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] flex flex-col">
              <SheetHeader className="flex flex-col items-center gap-4 mt-8">
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
              
              <div className="flex flex-col gap-4 mt-8 items-center flex-1 overflow-y-auto">
                <Link 
                  href="/meslekler" 
                  className="text-lg font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Meslekler
                </Link>

                <Link 
                  href="/rehber" 
                  className="text-lg font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Rehberler
                </Link>

                <Link 
                  href="/rehber/sirket-kurma" 
                  className="text-lg font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Şirket Kurma
                </Link>

                <Link 
                  href="/rehber/helal-mekanlar" 
                  className="text-lg font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-6 py-2 rounded-full transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Utensils className="w-4 h-4" />
                  Helal Mekanlar
                </Link>

                <Link 
                  href="/rehber/yapay-zeka-kariyerleri" 
                  className="text-lg font-bold text-fuchsia-800 dark:text-fuchsia-200 bg-fuchsia-50 dark:bg-fuchsia-900/20 px-6 py-2 rounded-full transition-colors flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Sparkles className="w-4 h-4" />
                  AI Kariyerleri
                  <Badge className="ml-1 text-[10px] px-1.5 py-0 bg-fuchsia-600 text-white border-none">Yeni</Badge>
                </Link>

                <Link 
                  href="/telegram-gruplari" 
                  className="text-lg font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Telegram Grupları
                </Link>
                <Link 
                  href="/blog" 
                  className="text-lg font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/hakkimizda" 
                  className="text-lg font-medium text-slate-600 hover:text-primary dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Hakkımızda
                </Link>
              </div>
              
              <div className="py-6 text-center text-sm text-slate-400">
                &copy; 2025 Deutschland Compass
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}