import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'B2 Sınav Hazırlığı (Hazırlanıyor) | Deutschland Compass',
  description:
    'telc Deutsch-Test für den Beruf B2 sınavına hazırlık modülü henüz yapım aşamasındadır.',
  robots: {
    index: false,
    follow: false,
  },
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
