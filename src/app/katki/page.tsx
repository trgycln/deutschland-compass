import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, FileText, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function ContributePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Topluluğa Katkıda Bulunun</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Deutschland Compass, sizin gibi profesyonellerin tecrübeleriyle büyüyen bir platformdur.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow border-blue-100 dark:border-blue-900">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600">
              <Share2 className="w-6 h-6" />
            </div>
            <CardTitle>Tecrübe Paylaşın</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Kendi denklik, iş arama veya uyum sürecinizi anlatarak başkalarına yol gösterin. Hikayeniz bir başkası için umut olabilir.
            </p>
            <Button asChild className="w-full">
              <Link href="/meslekler">Meslek Seç ve Paylaş</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-green-100 dark:border-green-900">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600">
              <FileText className="w-6 h-6" />
            </div>
            <CardTitle>Doküman Yükleyin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Elinizdeki ders notlarını, sunumları, örnek dilekçeleri veya faydalı rehberleri paylaşarak kütüphanemizi zenginleştirin.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/meslekler">İlgili Mesleğe Git</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-purple-100 dark:border-purple-900">
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 text-purple-600">
              <MessageSquare className="w-6 h-6" />
            </div>
            <CardTitle>Geri Bildirim Verin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Sitede gördüğünüz eksiklikleri, hataları veya geliştirme önerilerinizi bizimle paylaşın.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="mailto:info@deutschlandcompass.com">Bize Yazın</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-orange-100 dark:border-orange-900">
          <CardHeader>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 text-orange-600">
              <Mail className="w-6 h-6" />
            </div>
            <CardTitle>İletişime Geçin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Projede aktif rol almak, moderatör olmak veya içerik üreticisi olarak katılmak isterseniz kapımız açık.
            </p>
            <Button asChild variant="ghost" className="w-full border">
              <Link href="mailto:contact@deutschlandcompass.com">İletişim</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
