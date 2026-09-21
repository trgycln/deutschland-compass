import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2 Sınav Hazırlığı (ALL DOSYASI) | Deutschland Compass',
  description:
    'telc Deutsch-Test für den Beruf B2 (ALL DOSYASI) interaktif sınav hazırlık modülü. Lesen, Hören, Schreiben, Sprechen ve hata havuzu çalışma ortamı.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function B2SinavHazirlikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {children}
    </div>
  );
}
