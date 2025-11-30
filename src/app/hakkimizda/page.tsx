import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Gift, HandHeart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Biz Kimiz?
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Bu platform, zorlu yollardan geçenlerin, arkadan gelenlere ışık tutmak için oluşturduğu, 
            tamamen gönüllülük esasına dayalı bir dayanışma hareketidir.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Main Manifesto */}
        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
            <CardContent className="p-8">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Binlerin Tecrübesi, Tek Bir Amaç
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Buradaki her satır bilgi, her rehber ve her tecrübe paylaşımı; Almanya'ya göç etmiş, 
                benzer zorlukları yaşamış ve "keşke ben yaşarken biri bana bunları söyleseydi" diyen 
                binlerce isimsiz kahramanın katkılarıyla oluştu. Bu site şahsi bir proje değil, 
                bir topluluğun ortak hafızasıdır.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800">
            <CardContent className="p-8">
              <HandHeart className="w-12 h-12 text-green-600 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Diğergam Olma
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Bu platformun tek bir amacı var: Almanya'da yeni bir hayata tutunmaya çalışan bizlerin 
                işini kolaylaştırmak. Hiçbir ticari kaygı gütmüyoruz. Reklam yok, ücret yok, 
                premium üyelik yok. Buradaki her şey, toplumun faydası için karşılıksız sunulmaktadır.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Principles */}
        <div className="space-y-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Temel İlkelerimiz</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Kayıtsız Şartsız Gizlilik</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Sizden asla adınız, soyadınız, telefonunuz veya e-posta adresiniz istenmez. 
                Veri toplama, izleme veya profilleme yapılmaz. Özgürce ve güvenle bilgi alabilir, 
                anonim olarak katkı sağlayabilirsiniz.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-6">
                <Gift className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Karşılıksız Destek</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Para, bağış veya maddi bir beklenti söz konusu değildir. En büyük kazancımız, 
                bir kişinin daha işini kolaylaştırmak, bir ailenin daha adaptasyon sürecini hızlandırmaktır.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gönül Bağı</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Bizler birbirimizi tanımasak da, aynı yollardan geçen yol arkadaşlarıyız. 
                Bu platform, bu zorlu süreçte yalnız olmadığınızı hissettirmek için var.
              </p>
            </div>
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-20 p-8 md:p-12 bg-slate-900 text-white rounded-2xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              "Yolu bilenler, yola yeni çıkanlara rehberlik etmeli."
            </h3>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-8">
              Siz de tecrübelerinizle bu imeceye katkıda bulunabilir, bir başkasının hayatına dokunabilirsiniz.
            </p>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
