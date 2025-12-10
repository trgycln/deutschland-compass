import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function SSSPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <HelpCircle className="w-7 h-7 text-amber-500" />
              Sıkça Sorulan Sorular
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Deutschland Compass nedir?</h3>
              <p className="text-slate-700 dark:text-slate-300">Almanya'ya yeni gelen profesyoneller için topluluk destekli, yaşayan bir rehberdir. Denklik, iş bulma, eğitim ve tecrübe paylaşımı konularında bilgi sunar.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Telegram gruplarına nasıl katılırım?</h3>
              <p className="text-slate-700 dark:text-slate-300">Ana sayfadaki Telegram Grupları bölümünden ilgili gruplara katılabilirsiniz.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Dökümanlar nasıl ekleniyor?</h3>
              <p className="text-slate-700 dark:text-slate-300">Her meslek rehberinde "Döküman Yükle" butonunu kullanarak topluluğa katkı sağlayabilirsiniz.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Tecrübemi paylaşabilir miyim?</h3>
              <p className="text-slate-700 dark:text-slate-300">Evet! "Tecrübe Paylaş" butonunu kullanarak kendi deneyimlerinizi ekleyebilirsiniz.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
