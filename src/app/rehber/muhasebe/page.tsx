"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  CheckCircle2, 
  Globe, 
  FileText, 
  Building2, 
  Languages,
  Calculator,
  Scale,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  Info,
  User,
  Calendar,
  Quote
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { DocumentSection } from '@/components/document-section';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MuhasebePage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Muhasebe%,profession.ilike.%Mali Müşavir%,profession.ilike.%Steuer%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200">
                İşletme & Finans
              </Badge>
              <Badge variant="outline" className="text-blue-100 border-blue-400">
                Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Muhasebe ve Mali Müşavirlik Kariyeri
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Buchhalter'den Steuerberater'e uzanan kariyer yolu, denklik süreçleri, Ausbildung fırsatları ve DATEV gibi kritik yazılımlar hakkında kapsamlı rehber.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Telegram Groups Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://t.me/+rwMRpabT4l5jZGQy" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-1">Muhasebe</div>
                <div className="text-sm text-blue-100">Telegram Grubu</div>
              </div>
              <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          <a href="https://t.me/+yI1or4k3nMswN2Ni" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-1">Deutschland Compass</div>
                <div className="text-sm text-amber-100">Telegram Kanalımız</div>
              </div>
              <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Ana İçerik */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="guide" className="space-y-8">
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="guide" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Rehber</TabsTrigger>
                <TabsTrigger value="experiences" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Tecrübeler</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Dokümanlar</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-12 mt-6">
            
            {/* 1. Bölüm: Hazırlık ve Uyum */}
            <section id="baslangic" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Languages className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  I. Hazırlık ve Uyum Süreci: Dil ve Belgeler
                </h2>
              </div>

              <Card className="mb-8 border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    Almanya'da muhasebe mesleğine başlamanın ilk ve en kritik adımları dil yeterliliği ve Türkiye'de edinilen belgelerin Almanya sistemine adaptasyonudur.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Dil Yeterliliği ve Önemi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Pratik Tecrübe ve İpuçları</h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        Muhasebe, yerel kanunlara dayalı bir meslek olduğu için Almanca (Deutsch) dilinin önemi çok yüksektir. Resmi olarak bir mesleki eğitime (Ausbildung) başlamak için zorunlu bir dil seviyesi şartı olmamasına rağmen, çoğu kişi <strong>C1 seviyesine ulaşmayı</strong> ya da en azından bu seviyede akıcı konuşmayı şiddetle tavsiye etmektedir.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Deneyimsel Zorluklar
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Yeterli dil seviyesi olmadan eğitime başlayanlar, özellikle meslek okullarında (Berufschule) ve kanun dili ağır olduğu için zorlanmaktadırlar.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                          <Info className="w-4 h-4" />
                          Ek Bilgi: Terminoloji
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Muhasebe mesleğine özgü mesleki terimlere (Fachbegriffe) başlangıçta alışmak gerekmektedir (Borç, Alacak, Cari gibi). Almanca muhasebe terimleri sözlüğü gibi kaynaklardan faydalanılabilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Denklik (Anerkennung) ve Belge İşlemleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">SMMM Ruhsatı Durumu:</strong>
                          Türkiye'deki SMMM ruhsatı, Almanya'da doğrudan denklik alan bir belge olarak görülmemektedir. Ancak, Steuerberaterlik (Mali Müşavirlik) sınavına giriş (Zulassung) yeterliliği olarak kabul edilebilmektedir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">ZAB Başvurusu:</strong>
                          Lisans veya yüksek okul mezunları (İşletme, İktisat, Maliye), diplomalarının tanınması için Zentralstelle für ausländisches Bildungswesen (ZAB) adresine başvurmalıdır. Bazı durumlarda denklik yerine sadece değerlendirme belgesi (Bewertungszeugnis) yeterli görülebilmektedir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Evrak Çevirisi ve Destek:</strong>
                          Belgelerin çevirisi için Jobcenter veya Agentur für Arbeit'tan Eğitim Kuponu (Bildungsgutschein) talep edilebilir. Kurumlar genellikle en düşük teklifi veren çeviri şirketini tercih ederler.
                        </div>
                      </li>
                    </ul>

                    <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Önemli Not: SGK ve GSS Borçları
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Türkiye'den ayrılan kişilerin GSS borçları oluşabilmektedir. Bu borçlar, yurtdışında yaşanıldığının kanıtlanması (konsolosluk belgesi, ikametgah kayıtları) ile faizleriyle birlikte sildirebilir. Türkiye'deki sigortalı çalışma süresi, Almanya'daki emeklilik hesabında prim günlerini birebir saydırmaz, sadece emeklilik şartlarının yerine getirilip getirilmediği hesaplamasında dikkate alınır.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: Eğitim ve Kariyer */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  II. Mesleki Eğitim Yolları ve Kariyer Hedefleri
                </h2>
              </div>

              <Tabs defaultValue="unvanlar" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="unvanlar">Unvanlar & Hiyerarşi</TabsTrigger>
                  <TabsTrigger value="egitim">Eğitim Yolları</TabsTrigger>
                  <TabsTrigger value="is-hayati">İş Hayatına Giriş</TabsTrigger>
                </TabsList>

                <TabsContent value="unvanlar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Muhasebe Unvanları ve Hiyerarşi</CardTitle>
                      <CardDescription>Almanya'da muhasebe mesleği birçok basamağa ayrılmıştır.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
                        <div className="relative">
                          <div className="absolute -left-[41px] bg-slate-100 dark:bg-slate-800 p-2 rounded-full border border-slate-300 dark:border-slate-700">
                            <Calculator className="w-4 h-4 text-slate-600" />
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Buchhalter (Muhasebeci)</h3>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Şirketlerin iç muhasebe (Türkiye'deki ön muhasebe) işlerini yapmak için uygundur. KDV (Umsatzsteuer) hazırlamak, kayıt tutmak gibi temel işleri kapsar.
                          </p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[41px] bg-blue-100 dark:bg-blue-900 p-2 rounded-full border border-blue-300 dark:border-blue-700">
                            <Briefcase className="w-4 h-4 text-blue-600" />
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Steuerfachangestellter</h3>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Vergi Uzmanı Yardımcısı. Muhasebe bürolarında (Steuerbüro/Steuerkanzlei) çalışmaya olanak tanıyan bir unvandır.
                          </p>
                        </div>

                        <div className="relative">
                          <div className="absolute -left-[41px] bg-purple-100 dark:bg-purple-900 p-2 rounded-full border border-purple-300 dark:border-purple-700">
                            <Scale className="w-4 h-4 text-purple-600" />
                          </div>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Steuerberater (Mali Müşavir)</h3>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            Beyanname verebilme ve kendi bürosuna sahip olma yetkisi veren en üst düzey unvandır. Üniversite mezunları 2 yıl, diğerleri ise 7 yıl mesleki tecrübe sonrasında sınavına girebilir. Almanya'daki en zor sınavlardan biridir.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="egitim">
                  <div className="grid gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-blue-700 dark:text-blue-400">1. Mesleki Eğitim (Ausbildung)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Genel olarak 3-3,5 yıl sürer ve ikili (duale Ausbildung) sistemle yürütülür. Üniversite mezunları için süre 2 veya 2,5 yıla indirilebilir.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-sm">
                          <strong>İpucu:</strong> Kendi bürosunu açmak isteyenler için olmazsa olmaz yoldur. İşyeri bulmak en zor kısımdır. Eğitim sırasında 500-1000 Euro gelir elde edilir. Yaş sınırı yoktur (40+ yaş örnekleri mevcuttur).
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-green-700 dark:text-green-400">2. Yeniden Mesleki Eğitim (Umschulung)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Ausbildung'dan bir yıl daha kısa sürebilir. Genellikle Jobcenter'ın kabulünü gerektirir ve maliyeti yüksek olduğu için ikna etmesi zor olabilir.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-orange-700 dark:text-orange-400">3. İleri Eğitim (Weiterbildung)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Mevcut bir mesleğin belirli bir alanında uzmanlaşmak için alınır. Jobcenter tarafından Bildungsgutschein ile karşılanabilir.
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-sm">
                          <strong>Öneri:</strong> <strong>Finanzbuchhaltung mit DATEV</strong> gibi programlara odaklanılması tavsiye edilir. Weiterbildung ile genellikle sadece Buchhalter seviyesine ulaşılabilir.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="is-hayati">
                  <Card>
                    <CardHeader>
                      <CardTitle>İş Hayatına Giriş ve Destekler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-blue-500" />
                            Jobcenter Desteği
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Yeterli tecrübesi olmayanlar, Jobcenter'ı ikna etmek için motivasyon yazısı hazırlamalı ve iş ilanlarıyla taleplerini delillendirmelidir. İşe ilk giriş ödeneği (Einstiegsgeld) veya yol masrafları (Pendelkosten) talep edilebilir.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-blue-500" />
                            Staj (Praktikum)
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            İşe başlamadan önce staj yapmak kariyer için çok önemlidir. Stajyerlik, referans mektubu alma fırsatı sunar. Başvurular ilan beklenmeden doğrudan muhasebe bürolarına yapılmalıdır.
                          </p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-semibold mb-3">Kritik Yazılımlar</h4>
                        <div className="flex gap-3">
                          <Badge variant="secondary" className="text-lg py-1 px-4 bg-green-100 text-green-800">DATEV</Badge>
                          <Badge variant="outline" className="text-lg py-1 px-4">SAP</Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-2">
                          En yaygın kullanılan yazılım DATEV'dir. Tecrübesi olmayanlara öncelikle DATEV öğrenmeye odaklanılması tavsiye edilir.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </section>

            {/* 3. Bölüm: Uygulama ve Yaşam */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  III. Mesleki Uygulama ve Yaşam
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Mali Müşavirlik Uygulamaları</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Almanya'daki en ciddi gelir kalemlerinden biri Gelir Vergisi Beyannamesi (Einkommensteuererklärung) hazırlamaktır.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-sm border-l-4 border-blue-500">
                      Türkiye'deki SMMM belgesi veya Almanya'daki Steuerfachangestellter belgesi sahipleri, odaya kayıt olarak danışmanlık bürosu (Beratung bürosu) açabilirler.
                    </div>
                  </CardContent>
                </Card>

                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">Vergi Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      Vergi oranları Umsatzsteuergesetz'de düzenlenmiştir (Örn: Gıda %7).
                    </p>
                    <p className="text-sm font-semibold mb-2">Beyanname Zorunluluğu:</p>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>Normal maaş yanında 410€ üzeri ek gelir</li>
                      <li>Birden fazla işte çalışma</li>
                      <li>Eşin de çalışması</li>
                      <li>410€ üzeri ödenek (Krankengeld vb.) alımı</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6 bg-slate-50 dark:bg-slate-900 border-none">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-slate-600" />
                    Yaşam ve Finansal İpuçları
                  </h3>
                  <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                    <p>
                      <strong>Kıdem ve Tecrübe:</strong> Türkiye'de SSK'lı olarak çalışılmış ancak muhasebeci olarak ispatlanamayan iş tecrübesi dahi, Ausbildung başvurusu gibi süreçlerde belirtilmelidir.
                    </p>
                    <p>
                      <strong>Kısa Vadeli Finans:</strong> Almanya'da kredi kartı olmayanlar için OTTO veya PayPal üzerinden taksitli alışveriş alternatifleri mevcuttur.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 4. Bölüm: Sıkça Sorulan Sorular */}
            <section className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Sıkça Sorulan Sorular (SSS)
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Hangi seviyede Almanca gereklidir?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Resmi olarak mesleki eğitime (Ausbildung) başlamak için zorunlu bir dil seviyesi şartı olmamasına rağmen, muhasebe yerel kanunlara dayalı bir meslek olduğu için C1 seviyesine ulaşmak veya en azından bu seviyede akıcı konuşmak şiddetle tavsiye edilmektedir. B1 sertifikasıyla Ausbildung'a başlayanlar bile okulda (Berufschule) ve kanun dili ağır olduğu için ciddi zorluklar yaşamaktadır.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>Almanca muhasebe terimlerini nasıl öğrenebilirim?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Mesleğin ilk başlarında mesleki terimlere (Fachbegriffe) alışmak gerekmektedir (örneğin Borç, Alacak, Cari gibi). Almanca muhasebe terimleri sözlüklerinden faydalanılabilir. Ayrıca, teorik bilgiyi pekiştirmek için YouTube'da Almanca muhasebe anlatan birçok kanal ve Studyflix gibi platformlar mevcuttur.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Temel muhasebe unvanları nelerdir?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                      <li><strong>Buchhalter:</strong> Şirketlerin iç muhasebe işlerini yapar.</li>
                      <li><strong>Steuerfachangestellter:</strong> Muhasebe bürolarında çalışmak için gereken unvandır.</li>
                      <li><strong>Steuerberater:</strong> Beyanname verebilme ve kendi bürosuna sahip olma yetkisi veren en üst düzey unvandır.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>Türkiye'deki SMMM ruhsatının denkliği var mı?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Hayır, doğrudan denklik yoktur. Ancak, SMMM belgesi veya tecrübesi, Steuerberaterlik sınavına giriş (Zulassung) yeterliliği olarak kabul edilebilmektedir.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Lisans diplomamın tanınması için ne yapmalıyım?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Zentralstelle für ausländisches Bildungswesen (ZAB) adresine başvurulmalıdır. Bazı durumlarda tam denklik yerine sadece değerlendirme belgesi (Bewertungszeugnis) yeterli görülebilmektedir.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Ausbildung, Umschulung ve Weiterbildung arasındaki farklar nelerdir?</AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-slate-600 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-400">
                          <tr>
                            <th className="px-4 py-2">Eğitim Yolu</th>
                            <th className="px-4 py-2">Süre</th>
                            <th className="px-4 py-2">Avantajı</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-slate-700">
                            <td className="px-4 py-2 font-medium">Ausbildung</td>
                            <td className="px-4 py-2">3-3.5 Yıl</td>
                            <td className="px-4 py-2">İş garantisi yüksek, kendi bürosunu açmak için şart.</td>
                          </tr>
                          <tr className="border-b dark:border-slate-700">
                            <td className="px-4 py-2 font-medium">Umschulung</td>
                            <td className="px-4 py-2">~2 Yıl</td>
                            <td className="px-4 py-2">Hızlı unvan alma imkanı.</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 font-medium">Weiterbildung</td>
                            <td className="px-4 py-2">Birkaç Ay</td>
                            <td className="px-4 py-2">Uzmanlaşma sağlar (örn: DATEV).</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger>Tecrübesiz bir yabancı hangisini seçmeli?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Kendi işinizi yapmak istiyorsanız Ausbildung olmazsa olmazdır. Yaş veya zaman kısıtlaması varsa Umschulung ikinci seçenek olabilir.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger>Ausbildung yeri nasıl bulunur?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      İlan beklemek yerine, doğrudan muhasebe bürolarıyla iletişime geçilmeli ve bizzat başvuru (Initiativbewerbung) yapılmalıdır.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger>Staj (Praktikum) neden önemli?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Referans mektubu (Praktikum Zeugnis) alma fırsatı sunduğu için çok önemlidir. Bu referans, Jobcenter'ı eğitim desteği konusunda ikna etmenizi sağlayabilir.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger>Devlet eğitim masraflarını karşılar mı?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Evet, Jobcenter gerekli görürse Bildungsgutschein ile karşılayabilir. Ancak motive edici bir rapor ile gitmek önemlidir.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger>Vergi beyannamesi ne zaman zorunludur?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                      <li>Normal maaş yanında 410€ üzeri ek gelir varsa.</li>
                      <li>Birden fazla işte çalışılıyorsa.</li>
                      <li>Eş de çalışıyorsa.</li>
                      <li>410€ üzeri ödenek (Krankengeld vb.) alınıyorsa.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger>Türkiye'deki SGK borçları silinir mi?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600 dark:text-slate-400">
                      Evet, yurtdışında yaşanıldığının kanıtlanması ile GSS borçları faizleriyle birlikte sildirilebilir.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Sonuç */}
            <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Mesleki Başarı Bir Yapboza Benzer
                </h3>
                <p className="leading-relaxed opacity-90">
                  Almanya'daki muhasebecilik kariyeri, sadece tek bir büyük parça (Türkiye'deki diploma) ile tamamlanamaz. Başarı için öncelikle dil (C1) ve yerel kanunlar bilgisi edinilmeli, ardından Ausbildung veya Weiterbildung + Praktikum gibi parçalarla kariyer yol haritası tamamlanmalıdır. Bu parçaların en önemlisi ise işyeri (Betrieb) bulmaktır.
                </p>
              </CardContent>
            </Card>

          </TabsContent>

          <TabsContent value="experiences">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Sizin Tecrübeniz Değerli</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    Bu yoldan geçmiş biri olarak, tecrübelerinizi paylaşarak yeni gelenlere ışık tutabilirsiniz.
                  </p>
                </div>
                <ShareExperienceDialog 
                  professionSlug="muhasebe" 
                  defaultProfessionName="Muhasebe ve Mali Müşavirlik" 
                />
              </div>
              
              {experiences.length > 0 ? (
                <div className="grid gap-6">
                  {experiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {exp.name || 'Anonim Çalışan'}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                            {exp.profession}
                          </Badge>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {exp.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Henüz tecrübe paylaşılmamış
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                      Bu alanda tecrübesi olan ilk kişi siz olun ve diğer adaylara yol gösterin.
                    </p>
                    <ShareExperienceDialog 
                      professionSlug="muhasebe" 
                      defaultProfessionName="Muhasebe ve Mali Müşavirlik" 
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <DocumentSection professionSlug="muhasebe" />
          </TabsContent>
        </Tabs>
      </div>

      {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Kategori</span>
                  <span className="font-medium">İşletme & Finans</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Talep</span>
                  <span className="text-green-600 font-medium">Yüksek</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Dil Şartı</span>
                  <span className="font-medium">C1 (Önerilen)</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Ort. Maaş (Brüt)</span>
                  <span className="font-medium">3.000€ - 5.500€</span>
                </div>
                <div className="pt-4">
                  <h4 className="font-medium mb-3">Kritik Kelimeler</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Buchhalter', 'Steuerberater', 'DATEV', 'Ausbildung', 'ZAB', 'Finanzamt'].map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Tecrübeni Paylaş
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Muhasebe alanındaki tecrübeleriniz, yeni başlayanlar için çok değerli. Hikayenizi paylaşarak topluluğa katkıda bulunun.
                </p>
                <ShareExperienceDialog professionSlug="muhasebe" defaultProfessionName="Muhasebe ve Mali Müşavirlik" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
