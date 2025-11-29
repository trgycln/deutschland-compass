
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, BookOpen, MessageSquare } from 'lucide-react';
import { HomeSearch } from '@/components/home-search';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
              Almanya'daki <span className="text-blue-600">Pusulanız</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Binlerce profesyonelin tecrübesiyle harmanlanmış, yaşayan bir rehber. 
              Mesleğinizi seçin, süreci öğrenin, tecrübenizi paylaşın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4">
              <HomeSearch />
              <Button size="lg" className="h-12 px-8 text-lg" asChild>
                <Link href="/meslekler">Rehberi Keşfet</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/rehber" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>Kapsamlı Rehberler</CardTitle>
                  <CardDescription className="text-base">
                    Denklik, dil eğitimi ve iş bulma süreçleri hakkında adım adım, güncel bilgiler.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-800/50">
              <CardHeader>
                <Users className="h-10 w-10 text-indigo-600 mb-4" />
                <CardTitle>Topluluk Gücü</CardTitle>
                <CardDescription className="text-base">
                  Sadece teorik bilgi değil, gerçek insanların yaşadığı gerçek tecrübeler.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-none shadow-lg bg-slate-50 dark:bg-slate-800/50">
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Yaşayan Sistem</CardTitle>
                <CardDescription className="text-base">
                  Sürekli güncellenen, soru-cevaplarla zenginleşen dinamik bir yapı.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Professions Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Popüler Meslekler</h2>
              <p className="text-slate-600 dark:text-slate-400">En çok aranan meslek grupları için hazırladığımız rehberler.</p>
            </div>
            <Link href="/meslekler" className="hidden md:flex items-center text-blue-600 font-medium hover:underline">
              Tümünü Gör <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Math Teacher Card */}
            <Link href="/meslekler/matematik-ogretmenligi" className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 group-hover:border-blue-500/50">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      Eğitim
                    </Badge>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">Matematik Öğretmenliği</CardTitle>
                  <CardDescription>
                    Denklik süreci, dil şartları ve okul sistemi hakkında detaylı rehber.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 text-sm text-slate-500">
                    <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> Yüksek Talep</span>
                    <span className="flex items-center"><BookOpen className="w-3 h-3 mr-1" /> 15dk Okuma</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Placeholder Card 1 */}
            <Card className="h-full opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">Sağlık</Badge>
                </div>
                <CardTitle className="text-xl">Doktorluk (Yakında)</CardTitle>
                <CardDescription>
                  Approbation süreci, FSP sınavı ve uzmanlık eğitimi rehberi.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Placeholder Card 2 */}
            <Card className="h-full opacity-60 hover:opacity-100 transition-opacity cursor-not-allowed">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">Mühendislik</Badge>
                </div>
                <CardTitle className="text-xl">Yazılım Mühendisliği (Yakında)</CardTitle>
                <CardDescription>
                  Mavi Kart, iş arama süreci ve Almanya IT sektörü analizi.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/meslekler" className="inline-flex items-center text-blue-600 font-medium hover:underline">
              Tüm Meslekleri Gör <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

