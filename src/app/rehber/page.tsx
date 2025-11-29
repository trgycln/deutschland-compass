
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, GraduationCap, ArrowRight, Map } from 'lucide-react';

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
        </div>
      </div>
    </div>
  );
}
