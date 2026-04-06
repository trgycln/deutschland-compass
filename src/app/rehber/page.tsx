
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, ArrowRight, Map, Euro, Sparkles } from 'lucide-react';

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Genel Rehberler
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Almanya'da yaşam, kariyer ve eğitim süreçlerine dair kapsamlı yol haritaları.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link href="/rehber/yapay-zeka-kariyerleri" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group-hover:border-fuchsia-500/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-lg text-fuchsia-600 dark:text-fuchsia-400">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-fuchsia-500 transition-colors" />
                </div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl group-hover:text-fuchsia-600 transition-colors">
                    Yapay Zeka ile Yeni Kariyerler
                  </CardTitle>
                  <Badge className="bg-fuchsia-600 text-white border-none">Yeni</Badge>
                </div>
                <CardDescription className="text-base mt-2">
                  Kodlama şartı olmadan yönelinebilecek AI rollerini, ücretsiz kaynakları ve bu alanın neden araştırma odaklı okunması gerektiğini anlatan yeni rehber.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">AI Okuryazarlığı</Badge>
                  <Badge variant="secondary">Prompt</Badge>
                  <Badge variant="secondary">Ücretsiz Kaynaklar</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Kariyer Yolu Rehberi */}
          <Link href="/rehber/kariyer-yolu" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group-hover:border-blue-500/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                    <Map className="w-8 h-8" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                  Ausbildung, Weiterbildung ve Kariyer Rehberi
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Almanya'ya yeni gelen profesyoneller için mesleki tanınma, iş arama, Ausbildung ve sosyal güvenlik sistemine dair kapsamlı rehber.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Anerkennung</Badge>
                  <Badge variant="secondary">Ausbildung</Badge>
                  <Badge variant="secondary">Jobcenter</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Eğitim ve Kariyer Rehberi (Aileler İçin) */}
          <Link href="/rehber/egitim-ve-kariyer" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group-hover:border-green-500/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-green-500 transition-colors" />
                </div>
                <CardTitle className="text-2xl group-hover:text-green-600 transition-colors">
                  Aileler İçin Eğitim ve Kariyer Rehberi
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  İlkokuldan üniversiteye kadar çocuklarınızın eğitim süreci, okul türleri, meslek seçimi ve ailelere düşen görevler hakkında detaylı rehber.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Okul Sistemi</Badge>
                  <Badge variant="secondary">Aile Rehberi</Badge>
                  <Badge variant="secondary">Gençlik</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Anerkennung Rehberi */}
          <Link href="/rehber/anerkennung" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group-hover:border-purple-500/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                  Denklik (Anerkennung)
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Diplomalarınızın Almanya'da tanınması için izlemeniz gereken adımlar, ZAB süreci ve gerekli belgeler.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">ZAB</Badge>
                  <Badge variant="secondary">Diploma</Badge>
                  <Badge variant="secondary">Süreç</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Vergi Beyanı Rehberi - YENİ */}
          <Link href="/rehber/vergi-beyani" className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group-hover:border-emerald-500/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                    <Euro className="w-8 h-8" />
                  </div>
                  <ArrowRight className="h-6 w-6 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <CardTitle className="text-2xl group-hover:text-emerald-600 transition-colors">
                  Vergi Beyanı (Steuererklärung)
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  Kimler yapmalı, nasıl yapılır, neler düşülebilir? Tecrübelerle harmanlanmış kapsamlı vergi beyanı rehberi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Finanzamt</Badge>
                  <Badge variant="secondary">ELSTER</Badge>
                  <Badge variant="secondary">Vergi İadesi</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
