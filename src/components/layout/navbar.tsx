
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
          <span>Deutschland Compass</span>
        </Link>
        
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
          <Button asChild>
            <Link href="/katki">Katkıda Bulun</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
