
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Navbar() {
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
          <span className="hidden sm:inline-block">Deutschland Compass</span>
          <span className="sm:hidden">DC</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/meslekler" className="hover:text-blue-600 transition-colors">Meslekler</Link>
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
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menüyü aç</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menü</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link href="/meslekler" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Meslekler
                </Link>
                <Link href="/rehber/anerkennung" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Denklik Rehberi
                </Link>
                <Link href="/blog" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Blog
                </Link>
                <Link href="/hakkimizda" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Hakkımızda
                </Link>
                <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                <Link href="/giris" className="text-lg font-medium hover:text-blue-600 transition-colors">
                  Giriş Yap
                </Link>
                <Button asChild className="w-full">
                  <Link href="/katki">Katkıda Bulun</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
