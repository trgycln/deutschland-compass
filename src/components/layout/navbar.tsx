"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/meslekler" className="hover:text-blue-600 transition-colors">Meslekler</Link>
          <Link href="/rehber/egitim-ve-kariyer" className="hover:text-blue-600 transition-colors">Eğitim Rehberi</Link>
          <Link href="/rehber/sirket-kurma" className="hover:text-blue-600 transition-colors">Şirket Kurma</Link>
          <Link href="/rehber/anerkennung" className="hover:text-blue-600 transition-colors">Denklik Rehberi</Link>
          <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <Link href="/hakkimizda" className="hover:text-blue-600 transition-colors">Hakkımızda</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/giris" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hidden sm:block">
            Giriş Yap
          </Link>
          <Button asChild className="hidden sm:flex">
            <Link href="/katki">Katkıda Bulun</Link>
          </Button>

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
              
              <div className="flex flex-col gap-6 mt-8 items-center flex-1">
                <Link 
                  href="/meslekler" 
                  className="text-xl font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Meslekler
                </Link>
                <Link 
                  href="/rehber/egitim-ve-kariyer" 
                  className="text-xl font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Eğitim Rehberi
                </Link>
                <Link 
                  href="/rehber/sirket-kurma" 
                  className="text-xl font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Şirket Kurma
                </Link>
                <Link 
                  href="/rehber/anerkennung" 
                  className="text-xl font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Denklik Rehberi
                </Link>
                <Link 
                  href="/blog" 
                  className="text-xl font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/hakkimizda" 
                  className="text-xl font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Hakkımızda
                </Link>
                
                <div className="w-16 h-px bg-slate-200 dark:bg-slate-800 my-2" />
                
                <Link 
                  href="/giris" 
                  className="text-lg font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Giriş Yap
                </Link>
                <Button asChild className="w-full max-w-[200px] rounded-full">
                  <Link href="/katki" onClick={() => setIsOpen(false)}>Katkıda Bulun</Link>
                </Button>
              </div>
              
              <div className="py-8 text-center text-sm text-slate-400">
                &copy; 2025 Deutschland Compass
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
