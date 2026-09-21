import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Almanca & Dil Sınavları Rehberi | Deutschland Compass',
  description:
    "Almanya'da mesleki denklik, kariyer ve vatandaşlık için dil sınavları rehberi. telc B2 Beruf (ALL DOSYASI), B1 Allgemein ve B2 Allgemein sınav hazırlık modülleri.",
};

export default function AlmancaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {children}
    </div>
  );
}
