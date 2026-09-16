import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2 Sınav Hazırlığı | telc Deutsch-Test für den Beruf B2 – Deutschland Compass',
  description:
    'telc Deutsch-Test für den Beruf B2 sınavına interaktif hazırlık. Lesen, Hören, Schreiben ve Sprechen modülleri. Gerçek sınav materyalleri, kişisel ilerleme takibi ve Spaced Repetition.',
};

export default function SinavHazirlikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 transition-colors duration-300">
      {children}
    </div>
  );
}
