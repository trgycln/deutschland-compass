"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, MessageSquare, Info, Send, ArrowRight, Utensils, FileCheck, GraduationCap, Heart, Code, ChevronRight } from 'lucide-react';
import { HomeProfessions } from '@/components/home-professions';
import { professionsList } from '@/data/professions-list';
import { WhatsNewPopup } from '@/components/whats-new-popup';

export default function Home() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <WhatsNewPopup />
      


      {/* Bilgilendirme - Küçük Info Butonu */}
      <button
        onClick={() => setIsDisclaimerOpen(!isDisclaimerOpen)}
        className="fixed top-32 sm:top-36 right-2 sm:right-4 z-50 group"
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 p-2 sm:p-2.5 transition-all duration-300 hover:scale-105">
          <Info className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
        </div>
      </button>

      {/* Bilgilendirme İçeriği (Açılır Panel) */}
      {isDisclaimerOpen && (
        <>
          {/* Overlay - Tıklanınca kapanır */}
          <div 
            className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40 animate-in fade-in duration-200"
            onClick={() => setIsDisclaimerOpen(false)}
          />
          <div className="fixed top-44 sm:top-48 right-2 sm:right-4 z-50 w-[calc(100vw-1rem)] sm:w-80 animate-in fade-in slide-in-from-top-3 duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 p-3 sm:p-4">
              <div className="flex items-start gap-2 mb-2">
                <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <h3 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-slate-100">Bilgilendirme</h3>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sitemizdeki dökümanlar, Telegram gruplarında paylaşılan ve topluluk yararına hazırlanmış açık kaynak içeriklerdir. İçerik sahiplerinin talebi durumunda ilgili dökümanlar derhal kaldırılacaktır.
              </p>
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-secondary dark:bg-slate-950 overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          {/* Telegram Kanalı - Minimalist Ortalanmış */}
          <div className="flex justify-center mb-6">
            <a
              href="https://t.me/+yI1or4k3nMswN2Ni"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
              <span>DeutschlandCompass Kanalı</span>
            </a>
          </div>
          <div className="text-center space-y-8 py-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary dark:text-white">
              Almanya'daki <span className="text-accent">Pusulanız</span>
            </h1>
            <p className="text-xl text-primary/80 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Binlerce profesyonelin tecrübesiyle harmanlanmış, yaşayan bir rehber. 
              Mesleğinizi seçin, süreci öğrenin, tecrübenizi paylaşın.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4 relative z-50">
              <Button size="lg" className="h-12 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/meslekler">Meslekler Rehberi</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
                <Link href="/telegram-gruplari">Telegram Grupları</Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Site Haritası - Hızlı Erişim */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary dark:text-white">
            Hızlı Erişim
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Resmi İşlemler */}
            <Card className="border-2 border-blue-100 dark:border-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <CardTitle className="text-base">Resmi İşlemler</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <Link href="/rehber/aile-birlesimi" className="flex items-center justify-between text-sm hover:text-primary dark:hover:text-accent transition-colors group">
                  <span>Aile Birleşimi</span>
                  <Badge variant="secondary" className="text-xs">Popüler</Badge>
                </Link>
                <Link href="/rehber/vergi-beyani" className="flex items-center justify-between text-sm hover:text-primary dark:hover:text-accent transition-colors group">
                  <span>Vergi Beyanı</span>
                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30">Yeni</Badge>
                </Link>
                <Link href="/rehber/anerkennung" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Denklik (Anerkennung)</span>
                </Link>
                <Link href="/rehber/dil-sinavi" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Dil Sınavı</span>
                </Link>
              </CardContent>
            </Card>

            {/* Öğretmenlik */}
            <Card className="border-2 border-purple-100 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <CardTitle className="text-base">Öğretmenlik</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <Link href="/meslekler/matematik-ogretmenligi" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Matematik Öğretmenliği</span>
                </Link>
                <Link href="/meslekler/ingilizce-ogretmenligi" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>İngilizce Öğretmenliği</span>
                </Link>
                <Link href="/meslekler/almanca-ogretmenligi" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Almanca Öğretmenliği</span>
                </Link>
                <Link href="/meslekler" className="flex items-center text-sm text-primary dark:text-accent font-medium">
                  <span>Tüm Meslekler</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </CardContent>
            </Card>

            {/* Sağlık & Mühendislik */}
            <Card className="border-2 border-red-100 dark:border-red-900/30 hover:border-red-300 dark:hover:border-red-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <CardTitle className="text-base">Sağlık & Mühendislik</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <Link href="/meslekler/hemsire" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Hemşirelik</span>
                </Link>
                <Link href="/meslekler/fizyoterapist" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Fizyoterapist</span>
                </Link>
                <Link href="/meslekler/insaat-muhendisligi" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>İnşaat Mühendisliği</span>
                </Link>
                <Link href="/meslekler/gida-muhendisligi" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Gıda Mühendisliği</span>
                </Link>
              </CardContent>
            </Card>

            {/* IT & Diğer Meslekler */}
            <Card className="border-2 border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle className="text-base">IT & Diğerleri</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-1.5">
                <Link href="/meslekler/yazilim-gelistirici" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Yazılım Geliştirici</span>
                </Link>
                <Link href="/meslekler/bilisim-it" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Bilişim / IT</span>
                </Link>
                <Link href="/meslekler/lkw-soforlugu" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>LKW Şoförlüğü</span>
                </Link>
                <Link href="/rehber/helal-mekanlar" className="flex items-center text-sm hover:text-primary dark:hover:text-accent transition-colors">
                  <span>Helal Mekanlar</span>
                </Link>
                <Link href="/gurbet-kalemleri" className="flex items-center justify-between text-sm hover:text-primary dark:hover:text-accent transition-colors group">
                  <span>Gurbet Kalemleri</span>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30">Yeni</Badge>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Özel İçerikler - Helal Mekanlar & Vergi Beyanı */}
      <section className="py-12 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Helal Mekanlar */}
            <div className="flex flex-col gap-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-amber-900/40 p-3 rounded-full shadow-sm border border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400">
                  <Utensils className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-amber-950 dark:text-amber-100 mb-2">Helal Mekanlar</h3>
                  <p className="text-amber-800/80 dark:text-amber-200/70 text-sm leading-relaxed">
                    Almanya ve Avrupa genelinde, topluluğun tecrübeleriyle derlenen güvenilir restoranlar.
                  </p>
                </div>
              </div>
              <Button className="w-full bg-amber-600 text-white hover:bg-amber-700 border-none shadow-md" asChild>
                <Link href="/rehber/helal-mekanlar">
                  Rehberi İncele <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>

            {/* Vergi Beyanı */}
            <div className="flex flex-col gap-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/50 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-emerald-900/40 p-3 rounded-full shadow-sm border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-emerald-950 dark:text-emerald-100 mb-2">Vergi Beyanı</h3>
                  <p className="text-emerald-800/80 dark:text-emerald-200/70 text-sm leading-relaxed">
                    Kimler yapmalı, nasıl yapılır, neler düşülebilir? Kapsamlı vergi beyanı rehberi.
                  </p>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-700 border-none shadow-md" asChild>
                <Link href="/rehber/vergi-beyani">
                  Rehberi İncele <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Telegram Banner */}
      <section className="border-y border-border bg-accent/5 dark:bg-accent/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3 bg-accent text-primary-foreground rounded-full shrink-0 shadow-sm">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">Yalnız Değilsiniz!</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Anlık sorularınız, yardımlaşma ve tecrübe paylaşımı için <strong>Telegram</strong> gruplarımıza katılın. Binlerce kişilik topluluğumuz sizi bekliyor.
                </p>
              </div>
            </div>
            <Button variant="outline" className="border-accent text-accent-foreground hover:bg-accent hover:text-white font-medium shrink-0" asChild>
              <Link href="/telegram-gruplari">
                Telegram Grupları <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - GÜNCELLENDİ (4'lü Grid + Aile Birleşimi) */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* YENİ EKLENEN: AİLE BİRLEŞİMİ KARTI */}
            <Link href="/rehber/aile-birlesimi" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary dark:text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>Aile Birleşimi</CardTitle>
                  <CardDescription className="text-base">
                    Ön başvuru, vize randevusu, evrak hazırlığı ve varış süreci için adım adım, eksiksiz yol haritası.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/rehber" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary dark:text-accent mb-4" />
                  <CardTitle>Kapsamlı Rehberler</CardTitle>
                  <CardDescription className="text-base">
                    Denklik, dil eğitimi ve iş bulma süreçleri hakkında detaylı bilgiler.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
            
            <Link href="/telegram-gruplari" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary dark:text-accent mb-4" />
                  <CardTitle>Topluluk Gücü</CardTitle>
                  <CardDescription className="text-base">
                    Sadece teorik bilgi değil, gerçek insanların yaşadığı gerçek tecrübeler. <strong>Şimdi katılın.</strong>
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/rehber/egitim-ve-kariyer" className="block h-full">
              <Card className="h-full border-none shadow-lg bg-secondary dark:bg-slate-800/50 hover:bg-secondary/80 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-primary dark:text-accent mb-4" />
                  <CardTitle>Aileler İçin Eğitim</CardTitle>
                  <CardDescription className="text-base">
                    İlkokuldan üniversiteye, çocuklarınızın geleceği için kapsamlı eğitim ve kariyer rehberi.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Professions Section - (Aynı Kalıyor) */}
      <section className="py-20 bg-secondary/30 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <HomeProfessions professions={professionsList} />
        </div>
      </section>
    </div>
  );
}