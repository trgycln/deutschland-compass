/**
 * Gurbet Kalemleri — Linkler Sayfasi
 *
 * POLITIKA: Bu sayfa artik aktif degildir.
 * Deutschland Compass tam anonim bir platformdur.
 * Link paylasimlari kisileri ifsa edebileceginden
 * ve anonim topluluk prensibimize aykiri oldugu icin
 * bu ozellik kalici olarak devre disinda birakilmistir.
 *
 * Kural: .agents/rules/veri-gizliligi-ve-anonimlik.md
 */

import Link from "next/link";
import { ArrowLeft, ShieldCheck, BookOpen } from "lucide-react";

const serifStyle = { fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" } as const;
const accentStyle = { fontFamily: "'Playfair Display', 'Times New Roman', serif" } as const;

export default function GurbetLinklerPage() {
  return (
    <div className="min-h-screen bg-[#f7f1e8] flex flex-col items-center justify-center px-4 text-center">
      {/* İkon */}
      <div className="w-20 h-20 rounded-2xl bg-amber-100 border-2 border-amber-200 flex items-center justify-center mb-6 shadow-sm">
        <ShieldCheck className="w-10 h-10 text-amber-700" />
      </div>

      {/* Başlık */}
      <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-3" style={accentStyle}>
        Bu Sayfa Artık Yayında Değil
      </h1>

      {/* Açıklama */}
      <p className="text-stone-600 text-base sm:text-lg max-w-lg leading-relaxed mb-2" style={serifStyle}>
        Deutschland Compass <strong>tam anonim</strong> bir topluluk platformudur.
      </p>
      <p className="text-stone-500 text-sm sm:text-base max-w-md leading-relaxed mb-8" style={serifStyle}>
        Link paylaşımları üyelerin kimliğini ifşa edebileceğinden,
        anonim topluluk prensibimize aykırı olduğu için bu özellik kalıcı
        olarak devre dışı bırakılmıştır.
      </p>

      {/* Politika Rozeti */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-amber-200 text-amber-800 text-sm font-medium shadow-sm mb-8">
        <ShieldCheck className="w-4 h-4 text-amber-600" />
        <span>Anonim Platform Politikası</span>
      </div>

      {/* Geri Butonu */}
      <Link
        href="/gurbet-kalemleri"
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-800 text-white text-sm font-semibold hover:bg-amber-900 transition-colors shadow-md"
      >
        <BookOpen className="w-4 h-4" />
        <span>Gurbet Kalemleri'ne Dön</span>
      </Link>

      <Link
        href="/gurbet-kalemleri"
        className="mt-4 inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
      >
        <ArrowLeft className="w-3 h-3" />
        <span>Antolojiye git</span>
      </Link>
    </div>
  );
}