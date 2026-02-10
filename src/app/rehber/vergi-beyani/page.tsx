"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  FileText, 
  Euro,
  AlertTriangle,
  CheckCircle2,
  Info,
  Calculator,
  Home as HomeIcon,
  Car,
  Baby,
  ShieldCheck,
  Globe,
  Calendar,
  HelpCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { DocumentSection } from '@/components/document-section';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function VergiBeyaniPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [supabaseReady, setSupabaseReady] = useState(false);

  useEffect(() => {
    console.log('🔍 Vergi Beyani: Supabase bağlantı kontrol...');
    console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Var' : '✗ Eksik');
    console.log('Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Var' : '✗ Eksik');
    setSupabaseReady(!!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    async function fetchExperiences() {
      try {
        console.log('📥 Vergi Beyani: Tecrübeler yükleniyor...');
        const { data, error } = await supabase
          .from('experiences')
          .select('*')
          .eq('status', 'approved')
          .or('profession.ilike.%Vergi%,profession.ilike.%Steuererklärung%,profession.ilike.%Steuer%')
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error('❌ Vergi Beyani: Supabase hatası:', error);
        } else {
          console.log('✅ Vergi Beyani: Tecrübeler yüklendi:', data?.length || 0);
          if (data) setExperiences(data);
        }
      } catch (err) {
        console.error('💥 Vergi Beyani: Fetch hatası:', err);
      }
    }
    
    if (supabaseReady) {
      fetchExperiences();
    }
  }, [supabaseReady]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-900 to-emerald-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-900 hover:bg-emerald-200">
                Finans & Vergi
              </Badge>
              <Badge variant="outline" className="text-emerald-100 border-emerald-400">
                Önemli Rehber
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Vergi Beyanı <br />(Steuererklärung)
            </h1>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Tecrübelerle harmanlanmış kapsamlı rehber: Kimler yapmalı, nasıl yapılır, neler düşülebilir ve püf noktaları.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50" asChild>
                <Link href="#nedir">Rehbere Başla</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-emerald-700 text-white hover:bg-emerald-600 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-b border-amber-200 dark:border-amber-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start gap-3 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-amber-900 dark:text-amber-100">
              <span className="font-semibold">Önemli:</span> Bu rehber, topluluk tecrübelerinden derlenmiş bilgi amaçlı bir kaynak olup, hukuki veya mali danışmanlık yerine geçmez. Özel durumunuz için mutlaka uzman desteği alın.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Ana İçerik */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="guide" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="guide" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">
                  Rehber
                </TabsTrigger>
                <TabsTrigger value="experiences" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">
                  Tecrübeler
                </TabsTrigger>
                <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">
                  Dokümanlar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-12 mt-6">
                {/* 1. Nedir ve Kimler Yapmalı */}
                <section id="nedir" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                      <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      1. Vergi Beyanı Nedir ve Kimler Yapmalıdır?
                    </h2>
                  </div>

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-emerald-600" />
                        Vergi Beyanı (Steuererklärung) Nedir?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        Almanya'da yıl sonunda devlete <strong>"Ben bu yıl şu kadar kazandım, işim için de şu kadar harcadım"</strong> dediğiniz bildirimdir. Amaç, yıl içinde maaşınızdan fazla kesilen vergiyi geri almaktır.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border-l-4 border-l-red-500">
                      <CardHeader>
                        <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Zorunlu Olanlar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>Yıl içinde birden fazla işverenden maaş alanlar</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>Vergi sınıfı 3/5 kombinasyonuna sahip evli çiftler</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>Vergilendirilmemiş gelir (işsizlik, Kurzarbeitergeld, Krankengeld, Elterngeld) alanlar</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>Finanzamt'tan mektup alanlar</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <CardTitle className="text-green-700 dark:text-green-400 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" />
                          Gönüllü Yapanlar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>Tek işverenden maaş alan ve yukarıdaki şartları taşımayanlar</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>Masraflarını göstererek vergi iadesi almak isteyenler</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span className="text-blue-700 dark:text-blue-400 font-medium">Gönüllü beyanlar geriye dönük 4 yıl için yapılabilir</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 2. Nasıl Yapılır */}
                <section id="nasil-yapilir" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      2. Beyanname Nasıl ve Nereden Yapılır?
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-green-600" />
                          A. Ücretsiz ve Resmi: ELSTER
                        </CardTitle>
                        <CardDescription>Finanzamt'ın resmi online portalı</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-green-900 dark:text-green-100">Avantajı</p>
                            <p className="text-sm text-green-800 dark:text-green-200 mt-1">Tamamen ücretsizdir</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-amber-900 dark:text-amber-100">Dezavantajı</p>
                            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">Arayüzü biraz karışıktır ve iyi Almanca gerektirebilir</p>
                          </div>
                        </div>
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            <strong>Nasıl:</strong> Kayıt olduktan sonra postayla aktivasyon kodu gelir. Bu kodla sertifika dosyanızı indirip giriş yaparsınız.
                          </p>
                          <a href="https://www.elster.de" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 mt-3">
                            <ExternalLink className="w-4 h-4" />
                            www.elster.de
                          </a>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="w-5 h-5 text-blue-600" />
                          B. Uygulamalar ve Yazılımlar (Ücretli ama Kolay)
                        </CardTitle>
                        <CardDescription>Vergi mevzuatına hakim olmayanlar için yönlendirici</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                            <h4 className="font-semibold text-blue-900 dark:text-blue-100">Taxfix</h4>
                            <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                              Kullanımı kolay, İngilizce desteği olan ve "davet kodu" ile indirimli olabilen bir uygulama
                            </p>
                          </div>
                          <div className="p-4 border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg">
                            <h4 className="font-semibold text-purple-900 dark:text-purple-100">WISO Steuer</h4>
                            <p className="text-sm text-purple-800 dark:text-purple-200 mt-1">
                              Detaylı ve kullanıcı dostu popüler yazılım
                            </p>
                          </div>
                          <div className="p-4 border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg">
                            <h4 className="font-semibold text-orange-900 dark:text-orange-100">Check24</h4>
                            <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
                              Bazı kullanıcılar buradan ücretsiz veya uygun fiyata işlem yapabiliyor
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-purple-600" />
                          C. Profesyonel Destek
                        </CardTitle>
                        <CardDescription>Steuerberater / Lohnsteuerhilfeverein</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                              Steuerberater (Vergi Danışmanı)
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                              Karmaşık durumlar, şirket sahipleri veya yüksek gelirli işlemler için önerilir.
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              <strong>Maliyet:</strong> 100€ - 350€/yıl (hata riskini minimize eder)
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                              Lohnsteuerhilfeverein (Vergi Yardım Dernekleri)
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                              Yıllık üyelik ücreti karşılığında beyannamenizi hazırlayan dernekler. Sadece maaşlı çalışanlar için.
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              <strong>Maliyet:</strong> 70€ - 150€/yıl (gelire göre değişir)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 3. Vergiden Düşülebilecekler */}
                <section id="dusulebilecekler" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Euro className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      3. Vergiden Düşebileceğiniz Giderler
                    </h2>
                  </div>

                  <Card className="mb-6 border-2 border-purple-200 dark:border-purple-800">
                    <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
                      <CardTitle className="text-purple-900 dark:text-purple-100">
                        Werbungskosten & Sonderausgaben
                      </CardTitle>
                      <CardDescription>Vergi iadesini artıran en önemli kısım</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                        Yaptığınız harcamaları gelirinizden düşerek vergi matrahınızı azaltırsınız.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Car className="w-5 h-5 text-blue-600" />
                          Yol Masrafları (Pendlerpauschale)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Ev ile iş yeri arasındaki mesafe (tek yön) km başına <strong>30 cent</strong> (belirli km'den sonra 38 cent) olarak hesaplanır.
                        </p>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-sm text-blue-900 dark:text-blue-100">
                            <strong>Önemli:</strong> Araba, tren veya yürüyerek gitmeniz fark etmez. Toplu taşıma biletiniz (örn. Deutschlandticket) bu hesaplamadan yüksekse, bilet ücretini düşebilirsiniz.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Calculator className="w-5 h-5 text-green-600" />
                          İş Ekipmanları
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                            <span>İş için alınan laptop, telefon, büro malzemeleri, mesleki kitaplar</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>Özel kullanım da varsa (örn. laptop), bedelin sadece işe ayrılan kısmı (örn. %50) düşülebilir</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                            <span>Fiyatı düşük ürünler (GWG) tek seferde, yüksek olanlar yıllara bölünerek düşülür</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <HomeIcon className="w-5 h-5 text-orange-600" />
                          Home Office
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Evde çalışma odanız olmasa bile, evden çalıştığınız gün başına götürü usul (Pauschale) bir miktar düşülebilirsiniz.
                        </p>
                        <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <p className="text-sm text-orange-900 dark:text-orange-100">
                            <strong>Günlük 6€, yıllık max 1260€</strong> (rakamlar yıla göre değişebilir)
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <HomeIcon className="w-5 h-5 text-cyan-600" />
                          Taşınma Masrafları (Umzug)
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          İş nedeniyle taşındıysanız nakliye ve diğer masraflar düşülebilir.
                        </p>
                        <div className="mt-3 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                          <p className="text-sm text-cyan-900 dark:text-cyan-100">
                            <strong>Önemli:</strong> İşe gidiş yolunuz 1 saat kısalıyorsa bu da iş sebebi sayılır
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Baby className="w-5 h-5 text-pink-600" />
                          Çocuk Bakım Ücretleri
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                          Kreş (Kita), yuva veya bakıcı ücretlerinin <strong>2/3'ü</strong> vergiden düşülebilir.
                        </p>
                        <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                          <p className="text-sm text-pink-900 dark:text-pink-100">
                            <strong>Dikkat:</strong> Yemek parası buna dahil değildir
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <ShieldCheck className="w-5 h-5 text-indigo-600" />
                          Sigortalar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <span>Mesleki sorumluluk (Haftpflicht)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <span>Araç zorunlu sigortası (KFZ-Haftpflicht)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-red-200 dark:border-red-800">
                      <CardHeader className="bg-red-50 dark:bg-red-900/20">
                        <CardTitle className="flex items-center gap-2 text-lg text-red-900 dark:text-red-100">
                          <Globe className="w-5 h-5" />
                          Türkiye'deki Aileye Yardım (Unterhalt)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          Türkiye'de yaşayan anne, baba veya bakıma muhtaç akrabaya gönderilen paralar belirli şartlarla vergiden düşülebilir.
                        </p>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-red-900 dark:text-red-100">
                              <strong>Şart:</strong> "Unterhaltserklärung" belgesinin onaylatılması ve banka dekontu gerekli
                            </span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="text-red-900 dark:text-red-100">
                              <strong>Önemli:</strong> Elden verilen paralar kabul edilmez
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 4. Vergi Sınıfları */}
                <section id="vergi-siniflari" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                      <Calculator className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      4. Vergi Sınıfları (Steuerklassen)
                    </h2>
                  </div>

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Evli Çiftler İçin Vergi Sınıfı Seçimi</CardTitle>
                      <CardDescription>Aylık net maaşı ve yıl sonu iadesini etkiler</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="p-4 border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">4/4 Kombinasyonu</h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                            <strong>Uygun olan:</strong> Eşlerin maaşları birbirine yakınsa
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Yıl sonunda genelde büyük bir sürpriz (borç veya yüksek iade) çıkmaz
                          </p>
                        </div>

                        <div className="p-4 border-l-4 border-l-purple-500 bg-purple-50 dark:bg-purple-900/20 rounded-r-lg">
                          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">3/5 Kombinasyonu</h4>
                          <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                            <strong>Uygun olan:</strong> Eşlerden biri çok yüksek, diğeri çok düşük (veya hiç) kazanıyorsa
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                              <span className="text-purple-700 dark:text-purple-300">Yüksek kazanan 3'ü seçer ve aylık net maaşı artar</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                              <span className="text-red-700 dark:text-red-300">Yıl sonunda vergi beyanı zorunludur ve bazen vergi borcu çıkabilir</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Vergi Sınıfı Değişikliği</h4>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            Elster üzerinden veya Finanzamt'a form göndererek yapılabilir. Yılda bir kez (veya durum değişikliğinde) yapılabilir.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* 5. Özel Durumlar */}
                <section id="ozel-durumlar" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                      <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      5. Özel Durumlar ve İpuçları
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem value="minijob" className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-semibold">Minijob</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                        <p>
                          Aylık 538€'ya (sınıra dikkat edilmeli) kadar olan işlerdir. Genelde vergiden muaftır.
                        </p>
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <p className="text-amber-900 dark:text-amber-100">
                            <strong>Dikkat:</strong> Ana işinizin yanında yapıyorsanız vergi sınıfı 6 olabilir ve beyannameye dahil edilmesi gerekebilir.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="turkey-income" className="border rounded-lg px-4 border-red-200 dark:border-red-800">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-semibold text-red-700 dark:text-red-400">Türkiye'den Emeklilik/Kira Geliri</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm space-y-3">
                        <p className="text-slate-700 dark:text-slate-300">
                          Almanya'da yaşarken Türkiye'den elde edilen gelirler (emeklilik, kira vb.) Almanya'da vergi oranınızı artırıcı etki yapar (Progressionsvorbehalt).
                        </p>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                          <p className="text-red-900 dark:text-red-100 font-semibold">
                            ⚠️ Mutlaka bildirilmelidir, aksi takdirde cezai yaptırım olabilir
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="documents" className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-semibold">Fiş ve Faturalar (Belege)</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                        <p>
                          Finanzamt her zaman fatura istemez (özellikle düşük tutarlarda).
                        </p>
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <p className="text-blue-900 dark:text-blue-100">
                            <strong>Tavsiye:</strong> Her an isteyecekmiş gibi tüm belgeleri 10 yıl saklamalısınız
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="process" className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <span className="font-semibold">Süreç ve İtiraz</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <p>
                            Beyannameyi gönderdikten sonra sonucun (Bescheid) gelmesi <strong>2 hafta ile 6 ay</strong> arasında sürebilir
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p>
                            Gelen mektuba itiraz süresi genellikle <strong>1 ay</strong>'dır
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>

                {/* 6. SSS (Sıkça Sorulan Sorular) */}
                <section id="sss" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      6. Sıkça Sorulan Sorular (SSS)
                    </h2>
                  </div>

                  {/* A. Genel Konular */}
                  <div className="mb-8">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-red-900 dark:text-red-100 flex items-center gap-2">A. Genel Konular ve Zorunluluk</h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      <AccordionItem value="q1" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Vergi beyannamesi yapmalı mıyım? Yapmazsam ne olur?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Eğer Vergi Sınıfı (Steuerklasse) 3/5 kombinasyonundaysanız, yıl içinde Kurzarbeitergeld, işsizlik parası (ALG 1) veya hastalık parası gibi "Lohnersatzleistungen" (maaş yerine geçen ödemeler) aldıysanız, birden fazla işverenden maaş aldıysanız veya Finanzamt (Vergi Dairesi) size bir mektup gönderdiyse yapmak zorundasınız.
                          </p>
                          <p>
                            Zorunlu olmayanlar (örneğin sadece tek maaşlı ve Sınıf 1 veya 4/4 olanlar) gönüllü yapabilir. Gönüllü yapanlar genellikle iade alır.
                          </p>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="text-red-900 dark:text-red-100">
                              <strong>Uyarı:</strong> Zorunlu olduğu halde yapmazsanız Finanzamt tahmini bir hesaplama (Schätzung) yapıp borç çıkarabilir ve gecikme cezası uygulayabilir.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q2" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Beyannameyi ne zamana kadar teslim etmeliyim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Zorunlu olanlar için genellikle takip eden yılın Eylül veya Ekim ayı sonuna kadardır (tarihler yıllara göre değişebilir, pandemi döneminde uzatılmıştı).
                          </p>
                          <p>
                            Eğer bir vergi danışmanı (Steuerberater) veya dernek (Lohnsteuerhilfeverein) ile çalışıyorsanız süre 2 yıla kadar uzayabilir. Gönüllü yapanlar ise geriye dönük 4 yıl için beyanname verebilirler.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q3" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Beyannameyi gönderdim, param ne zaman yatar?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Bu süre tamamen bağlı olduğunuz Finanzamt'ın yoğunluğuna ve memurun hızına bağlıdır. Tecrübelere göre 2 hafta ile 6 ay arasında değişmektedir. Bazen 9 ayı bulduğu da görülmüştür.
                          </p>
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-blue-900 dark:text-blue-100">
                              <strong>Tipik süre:</strong> Genellikle 1-2 ay içinde sonuç (Bescheid) gelir.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* B. Vergi Sınıfları */}
                  <div className="mb-8">
                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100 flex items-center gap-2">B. Vergi Sınıfları (Steuerklassen) ve Eşlerin Durumu</h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      <AccordionItem value="q4" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Eşimle birlikte 3/5 mi yoksa 4/4 mü seçmeliyiz?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Eğer eşlerin maaşları arasında büyük fark varsa (örneğin biri 3000€, diğeri 500€ veya çalışmıyor), yüksek kazananın 3, düşük kazananın 5 olması aylık ele geçen net parayı artırır.
                          </p>
                          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                            <p className="text-amber-900 dark:text-amber-100 mb-2">
                              <strong>Ancak dikkat:</strong> Bu durumda yıl sonunda vergi beyanı zorunludur ve bazen vergi borcu (Nachzahlung) çıkabilir.
                            </p>
                          </div>
                          <p>
                            Maaşlar birbirine yakınsa 4/4 kalmak daha güvenlidir; yıl sonunda toplu iade alma ihtimali artar. Yıl sonunda Finanzamt toplam gelire bakıp vergiyi hesapladığı için, yıl içinde hangi sınıfta olduğunuz ödeyeceğiniz toplam vergiyi değiştirmez, sadece aylık kesintiyi ve yıl sonu iadesini/borcunu etkiler.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q5" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Eşim Türkiye'de yaşıyor, ben Almanya'da çalışıyorum. Vergi sınıfım ne olur?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Eşiniz AB üyesi bir ülkede yaşamadığı sürece Almanya'da bekar statüsünde (Steuerklasse 1) vergilendirilirsiniz.
                          </p>
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-green-900 dark:text-green-100">
                              <strong>Fırsatlar:</strong> Ancak eşiniz Almanya'ya geldiği yılın son günü bile gelse, tüm yıl için evli (Zusammenveranlagung) sayılabilir ve vergi avantajından yararlanabilirsiniz.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q6" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Vergi sınıfımı nasıl değiştirebilirim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                          <p>
                            "Antrag auf Steuerklassenwechsel bei Ehegatten" formunu doldurup Finanzamt'a göndererek veya ELSTER portalı üzerinden online olarak yapabilirsiniz.
                          </p>
                          <p>
                            Değişiklik başvurduğunuz ayı takip eden ayda geçerli olur.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* C. Gider Gösterme */}
                  <div className="mb-8">
                    <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-cyan-900 dark:text-cyan-100 flex items-center gap-2">C. Gider Gösterme (Werbungskosten & Sonderausgaben)</h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      <AccordionItem value="q7" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">İşe gidip gelirken yaptığım yol masraflarını nasıl düşerim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Ev ile iş yeri arasındaki mesafe (tek yön) km başına 30 cent (belirli km'den sonra 38 cent) "Pendlerpauschale" olarak hesaplanır. İşe araba, tren, bisiklet veya yürüyerek gitmeniz fark etmez.
                          </p>
                          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                            <p className="text-cyan-900 dark:text-cyan-100">
                              <strong>İpucu:</strong> Eğer toplu taşıma biletiniz (örn. Deutschlandticket) bu hesaplamadan daha yüksek tutuyorsa, bilet ücretini düşebilirsiniz.
                            </p>
                          </div>
                          <p className="text-amber-800 dark:text-amber-200">
                            ⚠️ İşveren yol paranızı karşılıyorsa bunu gider gösteremezsiniz.
                          </p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q8" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Home Office çalışıyorum, kira masrafını düşebilir miyim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Evinizde sadece iş için ayrılmış, kilitlenebilir ayrı bir "çalışma odası" (Arbeitszimmer) yoksa kiranın bir kısmını düşemezsiniz. (Yatak odasında çalışma masası olması yetmez)
                          </p>
                          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                            <p className="text-cyan-900 dark:text-cyan-100">
                              <strong>Alternatif:</strong> "Homeoffice Pauschale" kapsamında, evden çalıştığınız gün başına götürü bir miktar (günlük 6€, yıllık max 1260€ gibi - yıllara göre değişir) gider yazabilirsiniz.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q9" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Türkiye'deki aileme gönderdiğim parayı vergiden düşebilir miyim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-4">
                          <p>
                            Evet, "Unterhalt" (Nafaka/Bakım) kapsamında belirli şartlarla düşebilirsiniz.
                          </p>
                          <div className="space-y-3">
                            <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                              <h4 className="text-cyan-900 dark:text-cyan-100 font-medium mb-2">Kime:</h4>
                              <p>Türkiye'de yaşayan muhtaç durumdaki anne, baba, eş (eğer boşanma/ayrı yaşama varsa) veya büyükanne/büyükbaba. Çocuk parası (Kindergeld) alınan çocuklar için bu yapılamaz.</p>
                            </div>
                            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                              <h4 className="text-orange-900 dark:text-orange-100 font-medium mb-2">Şartlar:</h4>
                              <ul className="space-y-1 text-sm">
                                <li>• Parayı banka yoluyla (Western Union vb. dahil) göndermelisiniz, elden verilen para kabul edilmez.</li>
                                <li>• "Unterhaltserklärung" adlı formun hem Almanca hem Türkçe doldurulup Türkiye'deki resmi makamlara (Nüfus dairesi/Kaymakamlık) onaylatılması gerekir.</li>
                              </ul>
                            </div>
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                              <h4 className="text-red-900 dark:text-red-100 font-medium mb-2">Limit:</h4>
                              <p>Yıllık belirli bir üst limit vardır (ülke grubuna göre değişir, Türkiye için genelde temel muafiyetin yarısı kadar kabul edilir)</p>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q10" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">İş için aldığım bilgisayar veya telefonu yazabilir miyim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Evet yazabilirsiniz. Ancak cihazı özel işleriniz için de kullanıyorsanız (ki genelde öyledir), maliyetin sadece işe ayrılan yüzdesini (örn. %50) düşebilirsiniz.
                          </p>
                          <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                            <h4 className="text-cyan-900 dark:text-cyan-100 font-medium mb-2">Amortisman Kuralı:</h4>
                            <ul className="space-y-1 text-sm">
                              <li>• Düşük değerli ürünler (GWG - örn. 800€ altı) tek seferde düşülür</li>
                              <li>• Yüksek değerli ürünler ise amortisman süresine (örn. 3 yıl) bölünerek düşülür</li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q11" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Başka neleri vergiden düşebilirim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Taşınma</h4>
                                <p>İş nedeniyle taşındıysanız (yol 1 saat kısalıyorsa) nakliye masrafları ve götürü bedel (Umzugspauschale)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Çocuk Bakımı</h4>
                                <p>Kreş, yuva ücretlerinin 2/3'ü (yemek hariç)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Eğitim</h4>
                                <p>Mesleki kitaplar, kurs ücretleri (Fortbildung)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Sağlık</h4>
                                <p>Sigortanın karşılamadığı gözlük, diş tedavisi gibi masraflar (Gelirinizin belli bir oranını - Zumutbare Belastung - aşıyorsa)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Sigortalar</h4>
                                <p>İşle ilgili sorumluluk sigortaları, araç zorunlu sigortası (kısmen)</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium">Hizmetler</h4>
                                <p>Evde yapılan tamirat (işçilik kısmı), temizlikçi giderleri (Haushaltsnahe Dienstleistungen)</p>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* D. Türkiye ile İlgili Gelirler */}
                  <div className="mb-8">
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 flex items-center gap-2">D. Türkiye ile İlgili Gelirler ve Varlıklar</h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      <AccordionItem value="q12" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Türkiye'den emekli maaşı veya kira gelirim var. Bildirmek zorunda mıyım?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Evet, bildirmek zorundasınız. Almanya ile Türkiye arasındaki Çifte Vergilendirmeyi Önleme Anlaşması gereği, bu gelirler Almanya'da tekrar vergilendirilmese de, Almanya'daki vergi oranınızı belirleyen matraha eklenir (Progressionsvorbehalt).
                          </p>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="text-red-900 dark:text-red-100">
                              <strong>Sonuç:</strong> Yani Almanya'daki maaşınızdan ödeyeceğiniz vergi oranı artar. Bildirmemek vergi kaçırma (Steuerhinterziehung) sayılabilir ve cezası vardır.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q13" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Türkiye'den miras kaldı, vergi öder miyim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Almanya'da ikamet ediyorsanız, dünyanın neresinden olursa olsun gelen miras veraset vergisine (Erbschaftsteuer) tabi olabilir.
                          </p>
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <h4 className="text-green-900 dark:text-green-100 font-medium mb-2">İyi Haber:</h4>
                            <p>Eş ve çocuklar için yüksek muafiyet sınırları (Freibetrag - örn. çocuklar için 400.000€) vardır. Bu sınırın altındaki miraslar için vergi çıkmaz.</p>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Not: Yine de Finanzamt'a bildirim (Anzeigepflicht) yapılması gerekebilir.
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>

                  {/* E. Yöntem ve Teknik Detaylar */}
                  <div className="mb-8">
                    <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-teal-900 dark:text-teal-100 flex items-center gap-2">E. Yöntem ve Teknik Detaylar</h3>
                    </div>
                    <Accordion type="single" collapsible className="space-y-3">
                      <AccordionItem value="q14" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Kendi başıma yapabilir miyim, yoksa Steuerberater şart mı?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Basit bir çalışan (Angestellte) iseniz ve durumunuz karmaşık değilse ELSTER (resmi ve ücretsiz), Taxfix, WISO Steuer veya Check24 gibi uygulamalarla kendiniz yapabilirsiniz.
                          </p>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <h4 className="text-red-900 dark:text-red-100 font-medium mb-2">Uzman Gerekli Olabilir:</h4>
                            <p>Serbest meslek (Gewerbe/Freiberufler), karmaşık yatırımlar veya yurtdışı gelirleri varsa bir Steuerberater (Mali Müşavir) veya Lohnsteuerhilfeverein (sadece çalışanlar için dernek) ile çalışmak hata riskini azaltır ve daha fazla iade almanızı sağlayabilir.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q15" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Beleg (Fiş/Fatura) göndermem gerekiyor mu?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            İlk etapta hayır. Finanzamt artık "Belegvorhaltepflicht" (belge saklama yükümlülüğü) uyguluyor. Yani beyanı yaparsınız, belgeleri saklarsınız. Memur şüpheli veya yüksek bir harcama görürse sizden belgeleri talep eder.
                          </p>
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-blue-900 dark:text-blue-100">
                              <strong>Tavsiye:</strong> O yüzden tüm fişleri saklamalısınız.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q16" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Geçmiş yıllar için beyanname verebilir miyim?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Eğer beyanname verme zorunluluğunuz yoksa (Antragsveranlagung), geriye dönük 4 yıl için beyanname verebilirsiniz.
                          </p>
                          <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <p className="text-amber-900 dark:text-amber-100">
                              <strong>Dikkat:</strong> Zorunlusanız (Pflichtveranlagung), süreler çok daha kısadır ve gecikme cezası (Verspätungszuschlag) riski vardır.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="q17" className="border rounded-lg px-4">
                        <AccordionTrigger className="hover:no-underline">
                          <span className="text-sm font-medium">Minijob gelirim vergiye tabi mi?</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-slate-700 dark:text-slate-300 space-y-3">
                          <p>
                            Minijob (aylık 538€'ya kadar) genellikle "Pauschale Versteuerung" ile işveren tarafından vergilendirilir ve sizin beyannamenizde gelirinizi yükseltici etki yapmaz (Brutto gelire eklenmez).
                          </p>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <p className="text-red-900 dark:text-red-100">
                              <strong>Ancak:</strong> Birden fazla işiniz varsa durum değişebilir.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </section>
              </TabsContent>

              {/* Tecrübeler Tab */}
              <TabsContent value="experiences" className="space-y-6">
                <div id="tecrube-paylas" className="scroll-mt-24">
                  <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                    <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl text-emerald-900 dark:text-emerald-200">
                            Tecrübeni Paylaş
                          </CardTitle>
                          <CardDescription className="mt-2">
                            Vergi beyanı sürecinizde yaşadıklarınızı ve ipuçlarınızı paylaşın
                          </CardDescription>
                        </div>
                        <ShareExperienceDialog 
                          professionSlug="vergi-beyani" 
                          defaultProfessionName="Vergi Beyanı / Steuererklärung" 
                        />
                      </div>
                    </CardHeader>
                  </Card>
                </div>

                {experiences.length > 0 ? (
                  <div className="grid gap-6">
                    {experiences.map((exp) => (
                      <Card key={exp.id} className="border-l-4 border-l-emerald-500">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{exp.name || 'Anonim'}</CardTitle>
                              <CardDescription className="flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(exp.created_at).toLocaleDateString('tr-TR')}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">{exp.profession}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                            {exp.content}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-slate-500 dark:text-slate-400">
                        Henüz tecrübe paylaşımı bulunmuyor. İlk paylaşan siz olun!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Dokümanlar Tab */}
              <TabsContent value="documents" className="space-y-6">
                <DocumentSection professionSlug="vergi-beyani" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-emerald-900 dark:text-emerald-100 text-lg">Bu Sayfada</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#nedir" className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">
                  <ArrowRight className="w-4 h-4" /> Vergi Beyanı Nedir?
                </Link>
                <Link href="#nasil-yapilir" className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">
                  <ArrowRight className="w-4 h-4" /> Nasıl Yapılır?
                </Link>
                <Link href="#dusulebilecekler" className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">
                  <ArrowRight className="w-4 h-4" /> Düşülebilecek Giderler
                </Link>
                <Link href="#vergi-siniflari" className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">
                  <ArrowRight className="w-4 h-4" /> Vergi Sınıfları
                </Link>
                <Link href="#ozel-durumlar" className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">
                  <ArrowRight className="w-4 h-4" /> Özel Durumlar
                </Link>
                <Link href="#sss" className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:underline">
                  <ArrowRight className="w-4 h-4" /> Sıkça Sorulan Sorular
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faydalı Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://www.elster.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-600 hover:underline">
                  <ExternalLink className="w-4 h-4" />
                  ELSTER - Resmi Portal
                </a>
                <a href="https://www.bundesfinanzministerium.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-600 hover:underline">
                  <ExternalLink className="w-4 h-4" />
                  Maliye Bakanlığı
                </a>
                <a href="https://www.finanztip.de/steuererklaerung/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-600 hover:underline">
                  <ExternalLink className="w-4 h-4" />
                  Finanztip Rehberi
                </a>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <CardHeader>
                <CardTitle className="text-emerald-900 dark:text-emerald-100 text-lg flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Hatırlatma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-emerald-800 dark:text-emerald-200">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Tüm belgeleri 10 yıl saklayın</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Gönüllü beyanlar 4 yıl geriye gider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Türkiye'den gelir mutlaka bildirilmeli</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
