
import Link from 'next/link';
import Image from 'next/image';
import { Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
              <Image 
                src="/dc_logo.png" 
                alt="Deutschland Compass Logo" 
                width={32} 
                height={32} 
                className="object-contain rounded-full"
              />
              <span>Deutschland Compass</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Almanya'ya yeni gelen profesyoneller için, topluluk destekli, yaşayan rehber. Tecrübelerinizi paylaşın, yolu aydınlatın.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/meslekler" className="hover:text-blue-600">Meslek Rehberleri</Link></li>
              <li><Link href="/tecrubeler" className="hover:text-blue-600">Tecrübe Paylaşımları</Link></li>
              <li><Link href="/sss" className="hover:text-blue-600">Sıkça Sorulan Sorular</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Topluluk</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/katki" className="hover:text-blue-600">Nasıl Katkı Sağlarım?</Link></li>
              <li><Link href="/kurallar" className="hover:text-blue-600">Topluluk Kuralları</Link></li>
              <li><Link href="/iletisim" className="hover:text-blue-600">İletişim</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Yasal</h3>
            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
              <p>Bu site kâr amacı gütmeyen bir topluluk projesidir.</p>
              <p>Kişisel verileriniz toplanmaz ve saklanmaz.</p>
              <p>Tüm içerikler anonim olarak paylaşılır.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Deutschland Compass. Topluluk yararına, gönüllüler tarafından geliştirilmiştir.
        </div>
      </div>
    </footer>
  );
}
