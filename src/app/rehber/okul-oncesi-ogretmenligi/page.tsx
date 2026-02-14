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
  Quote,
  School,
  Users,
  Clock,
  Euro,
  Baby,
  Heart,
  Brain
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { DocumentSection } from '@/components/document-section';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function OkulOncesiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Okul Öncesi%,profession.ilike.%Erzieher%,profession.ilike.%Anaokulu%')
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
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="flex-1 max-w-3xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-900 hover:bg-blue-200">
                Eğitim & Pedagoji
              </Badge>
              <Badge variant="outline" className="text-blue-100 border-blue-400">
                Çok Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Okul Öncesi Öğretmenliği
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Erzieherin ve Kindheitspädagogin kariyer yolları, denklik süreçleri, dil şartları ve iş hayatına dair kapsamlı rehber.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-500 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <ProfessionVideoPlayer professionSlug="okul-oncesi-ogretmenligi" variant="hero" />
          </div>
          </div>
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
            
            {/* 1. Bölüm: Göç Öncesi Hazırlık */}
            <section id="baslangic" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  I. Göç Öncesi Hazırlık Süreci
                </h2>
              </div>

              <Card className="mb-8 border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    Bu rehber, Türkiye’de okul öncesi öğretmenliği/çocuk gelişimi alanında eğitim almış bireylerin Almanya’daki kariyer süreçlerini detaylandırmaktadır.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-blue-600" />
                      Dil Yeterliliği (Sprachkenntnisse)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Beklenen Seviye</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Mesleki denklik (Anerkennung) ve öğretmenlik için genellikle <strong>C1 seviyesi</strong> beklenir. Ancak özel sektörde B2 ile iş bulmak mümkündür.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-green-600 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Fırsatlar
                        </h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Erzieherhelfer gibi pozisyonlarda B1-B2 yeterli olabilir.</li>
                          <li>Türk ailelerin yoğun olduğu yerlerde Türkçe avantaj olabilir.</li>
                          <li>Bazı işverenler dilin çalışırken gelişeceğine inanır.</li>
                        </ul>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          Zorluklar
                        </h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Konsolosluk vize aşamasında sertifika talep edebilir.</li>
                          <li>Talepkâr veli kitlesi olan yerlerde B2 yetersiz görülebilir.</li>
                          <li>NRW'de Umschulung için C2 istenebilir.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      Diploma ve Resmi Belgeler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Alman makamları ZAB (Zentralstelle für ausländisches Bildungswesen) değerlendirmesini esas alır.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Üniversite Belgeleri:</strong>
                          Lisans, Yüksek Lisans ve Doktora diploma ve transkriptleri ZAB'a gönderilmelidir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Onay ve Çeviri:</strong>
                          Belgeler belediyede 'aslı gibidir' (Beglaubigung) yapılmalıdır. Tercüme ile fotokopinin birlikte onaylatılması önemlidir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Çalışma Geçmişi:</strong>
                          E-devletten alınan "hitap hizmet dökümü" tercümesi, mesleki tecrübeyi kanıtlamak için kullanılabilir.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: Denklik Süreci */}
            <section id="denklik" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  II. Denklik ve Mesleki Yeterlilik (Anerkennung)
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-blue-600" />
                      Statü ve ZAB Değerlendirmesi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Türkiye'deki okul öncesi öğretmenliği diploması, Almanya'da genellikle doğrudan "öğretmen" (Lehrer) değil, çocuk gelişimi uzmanlığı olarak tanınır.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">ZAB Sonucu: Frühpädagogik</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        ZAB sonucu genellikle "Frühpädagogik" (Erken Pedagoji) olarak gelir. Bu, diplomanın Almanya'daki Lisans (Bachelor) seviyesine denk olduğunu gösterir. Ancak bu sadece akademik denkliktir, mesleki denklik (Berufliche Anerkennung) için ayrıca başvurulmalıdır.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Hedeflenen Statüler: Erzieherin vs Kindheitspädagogin
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">1. Eğitimci (Erzieherin)</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Almanya'da Ausbildung ile olunur.</li>
                          <li>Maddi olarak öğretmenlikten düşüktür.</li>
                          <li>Bazı eyaletler (BW) sadece bu denkliği verir.</li>
                          <li>KPSS veya adaylık kalkma belgesi istenebilir (itiraz edilebilir).</li>
                        </ul>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">2. Çocuk Pedagoğu (Kindheitspädagogin)</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Lisans mezunları için daha uygun bir hedeftir.</li>
                          <li>Kreş (Kita) açma yetkisi verir.</li>
                          <li>Çalışma alanları daha geniştir.</li>
                          <li>Erzieherin olmaktan daha hızlı ilerleyebilir.</li>
                        </ul>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-2">
                      <strong>İpucu:</strong> Başlangıçta B1-B2 ile Erzieherin olarak başlayıp, dil geliştikçe Kindheitspädagogin'e geçiş yapılabilir.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Eksiklerin Tamamlanması
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Fark Dersleri:</strong>
                          Çocuk hakları veya pedagojik dersler gibi eksikler çıkabilir. BW eyaletinde 3 ders eksiği çıkabilmektedir.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Staj (Anpassungslehrgang):</strong>
                          Hessen'de tam denklik için 12 ay staj istenebilir. Bu sürede stajyer maaşı alınır.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Finansman:</strong>
                          Eğitim masraflarını Jobcenter veya Arbeitsamt karşılayabilir.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. Bölüm: Almanya'ya Varış ve Uyum */}
            <section id="uyum" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  III. Almanya'ya Varış ve Uyum Süreci
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-blue-600" />
                      Jobcenter ve Temel Geçim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Jobcenter, iş bulana kadar temel geçim (Bürgergeld/Arbeitslosengeld II) desteği sağlar.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Yardım Kapsamı</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                          <li>Düzenli Ödeme (Regelleistung)</li>
                          <li>Kira ve Isınma Masrafları</li>
                          <li>Hamilelik/Çocuk için Ek Ödemeler</li>
                          <li>Eşya ve Giyim Yardımı (İlk Seferlik)</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Yükümlülükler</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                          <li>İşbirliği (Mitwirkungspflicht)</li>
                          <li>Tüm Gelir/Varlık Bildirimi (TR dahil)</li>
                          <li>İzinsiz Şehir Dışına Çıkmama</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-blue-600" />
                      Kişisel Gelişim ve Entegrasyon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Gönüllü Çalışma (Ehrenamt):</strong>
                          Çevre edinme, dil geliştirme ve işe girişte referans olması açısından çok faydalıdır.
                        </div>
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <div className="text-slate-600 dark:text-slate-400 text-sm">
                          <strong className="text-slate-900 dark:text-white block mb-1">Kişisel Projeler:</strong>
                          Youtube kanalları veya çocuk etkinlik kitapçıkları hazırlamak gibi projeler mesleki tatmin sağlar.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Bölüm: İş Hayatı ve Kariyer */}
            <section id="kariyer" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  IV. Almanya'da İş Hayatı ve Kariyer Yolları
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      İş Başvurusu (Bewerbung)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Gerekli Belgeler</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Anschreiben (Ön Yazı), Lebenslauf (CV), ZAB Denklik Belgeleri, Transkriptler, Dil Belgesi, Referanslar ve Çalışma Belgeleri.
                      </p>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Mülakat İpuçları
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Kendi hazırladığınız bir blok ders planını (Almanca) yanınızda götürün.</li>
                        <li>Türkiye ve Almanya'daki tecrübelerinizi anlatan detaylı bir metin hazırlayın.</li>
                        <li>Resmi giyinmekten çekinmeyin.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      Kariyer Alternatifleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Öğretmenlik Dışı</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Tagesmutter:</strong> Evde kreş açma.</li>
                          <li><strong>Sosyal Alanlar:</strong> Sozialpädagog olarak çalışma.</li>
                          <li><strong>Umschulung:</strong> Bilişim vb. alanlara geçiş.</li>
                        </ul>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Akademik & Diğer</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Lehrkräfte Programları:</strong> Mülteci öğretmenler için özel programlar (NRW).</li>
                          <li><strong>Doktora:</strong> Akademik kariyer.</li>
                          <li><strong>Türkçe Öğretmenliği:</strong> C1 Türkçe ile (NRW).</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      Pedagojik Kavramlar ve Beklentiler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-400">
                      Alman eğitim sisteminde sınıf yönetimi ve özel ihtiyaçlar konusunda beklentiler yüksektir.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sınıf Yönetimi</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Net kurallar, rutinler, pozitif ilişkiler ve erken müdahale (sessiz uyarılar) önemlidir.
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Özel İhtiyaçlar</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Otizm (OSB) ve DEHB gibi durumlarda yapılandırılmış ortamlar, görsel destekler ve net talimatlar gerekir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* SSS Bölümü */}
            <section id="sss" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Sıkça Sorulan Sorular
                </h2>
              </div>

              <div className="space-y-8">
                {/* 1. Denklik Süreci */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    1. Denklik Süreci ve Statüler
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="denklik-tanim">
                      <AccordionTrigger className="text-left">Türkiye'deki okul öncesi öğretmenliği diploması Almanya'da ne olarak tanımlanıyor?</AccordionTrigger>
                      <AccordionContent>
                        Tercümanlar bu mesleği "Vorschullerhamt" diye çevirse de, Bonn'daki Yurt Dışı Eğitim Merkezi'nden (ZAB) gelen akademik değerlendirme sonucu genellikle <strong>Frühpädagogik (Erken Pedagoji)</strong> olarak gelir. Bu Kindheitspädagogin veya Erzieherin mesleki denkliğine başvurmak için bir başlangıç noktasıdır.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="zab-anlam">
                      <AccordionTrigger className="text-left">ZAB’dan gelen 'Frühpädagogik' yanıtı ne anlama geliyor?</AccordionTrigger>
                      <AccordionContent>
                        "Frühpädagogik" yanıtı, diplomanın Almanya'daki Lisans (Bachelor) seviyesine denk geldiğini (akademik değerlendirme) gösterir. Ancak bu sadece bir onaydır; mesleki denklik (Berufliche Anerkennung) için ayrıca başvurulması gerekir. Genellikle Erzieherin ya da Kindheitspädagogin seçenekleri sunulur.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="statu-fark">
                      <AccordionTrigger className="text-left">Kindheitspädagogin ve Erzieherin statülerinin farkları nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        Kindheitspädagogin statüsü, kreş (Kita) açabilme yetkisi gibi daha geniş imkanlar sunar. Derece ve maaş (Gehalt) olarak Kindheitspädagogin, Erzieherin'den daha yüksektir. Okul öncesi öğretmenliği mezunları Kindheitspädagogin olarak tanınma hakkına sahiptir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="denklik-sure">
                      <AccordionTrigger className="text-left">Mesleki denklik süreci ne kadar sürer?</AccordionTrigger>
                      <AccordionContent>
                        ZAB'dan gelen akademik değerlendirme sonucu yaklaşık 3 ay sürer. Eyalet denklik süreçleri ise daha uzun olabilir; örneğin Berlin için 6 aya kadar sürebilmektedir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tam-denklik-sart">
                      <AccordionTrigger className="text-left">Tam denklik için hangi ek şartlar istenebilir?</AccordionTrigger>
                      <AccordionContent>
                        Genellikle 1 yıllık çalışma süreci veya Anpassungslehrgang (uyum stajı) istenebilir. Örneğin Türkiye’de çocuk hakları dersi alınmadığı için eksik ders tamamlama veya Hessen'de 12 ay staj zorunluluğu gibi durumlar tecrübe edilmiştir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="is-teklifi-sart">
                      <AccordionTrigger className="text-left">Denklik başlatmak için iş teklifi şart mı?</AccordionTrigger>
                      <AccordionContent>
                        Hayır, mesleki denklik sürecini başlatmak için Almanya'dan bir iş teklifi örneği sunulması şartı yoktur.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="kpss-sarti">
                      <AccordionTrigger className="text-left">Denklik için KPSS veya adaylık kalkma belgesi şart mı?</AccordionTrigger>
                      <AccordionContent>
                        Eyalete göre değişir. Hessen ve Rheinland Pfalz isteyebilir. Baden Württemberg'de (BW) itiraz edilerek bu şart kaldırılabilir. NRW'de özel sektör çalışanlarından KPSS istenmiş ancak adaylık kalkma belgesi olmadan denklik verilmiştir.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* 2. Dil Şartları */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Languages className="w-5 h-5" />
                    2. Dil Şartları ve Sınavlar
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="dil-seviyesi-detay">
                      <AccordionTrigger className="text-left">Hangi Almanca seviyesi gerekiyor?</AccordionTrigger>
                      <AccordionContent>
                        Tam denklik (Anerkennung) için genellikle C1 beklenir. Ancak özel sektörde veya yardımcı pozisyonlarda (Erzieherhelfer/Quereinsteiger) B1-B2 seviyesi ile işe başlamak mümkündür.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b2-yetersiz">
                      <AccordionTrigger className="text-left">B2 seviyesi iş görüşmesinde sorun olur mu?</AccordionTrigger>
                      <AccordionContent>
                        Veli kitlesi talepkâr olan yerlerde B2 yetersiz görülebilir. İşverenler önceliğin çocuklara Almanca öğretmek olduğunu belirterek C1 seviyesini tercih edebilir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="turkce-c1">
                      <AccordionTrigger className="text-left">Türkçe Öğretmenliği için C1 Türkçe Sertifikası nerede geçerli?</AccordionTrigger>
                      <AccordionContent>
                        Bölümü Türkçe Öğretmenliği olmayan adayların C1 Türkçe Sertifikası ile Türkçe derslerine girebilmesi şimdilik NRW eyaleti için geçerlidir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="telc-turkce">
                      <AccordionTrigger className="text-left">telc Türkçe C1 Sınavı nasıldır?</AccordionTrigger>
                      <AccordionContent>
                        Sınav okuma, dinleme, yazma ve konuşma bölümlerinden oluşur. Başarılı olmak için toplamda en az 128 puan (%60) alınmalıdır. Sonuçlar 5-6 haftada belli olur.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* 3. Kariyer Yolları */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    3. Kariyer Yolları ve Alternatifler
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="yuksek-maas">
                      <AccordionTrigger className="text-left">Daha yüksek maaşlı seçenekler nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        Kindheitspädagogin statüsü Erzieherin'e göre daha yüksek maaş getirir. Ayrıca MPT (Multi-Professionelle Teams), LKW Şoförlüğü, Makinistlik gibi alanlara Umschulung (meslek değişimi) yapılabilir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="multeci-ogretmen">
                      <AccordionTrigger className="text-left">Mülteci öğretmenler için en kestirme yol nedir?</AccordionTrigger>
                      <AccordionContent>
                        NRW Eyaleti'ndeki Lehrkräfte Programları (PROFI, Lehrkräfte Plus, IGEL) en kestirme yoldur. Şartları: Diploma, B1 Almanca, 2 yıl tecrübe ve mülteci statüsü. Başarıyla bitirenler süresiz sözleşme (unbefristet) alabilir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="turkce-islam">
                      <AccordionTrigger className="text-left">Türkçe ve İslam dersleri kariyerime nasıl katkı sağlar?</AccordionTrigger>
                      <AccordionContent>
                        Ders saatlerini doldurmak için büyük avantajdır. İslam dersi için "Idschaza" (ders verme izni) almak yeterlidir. Bu alanlarda Alman öğretmenler rakip olamaz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="mpt-kadro">
                      <AccordionTrigger className="text-left">MPT kadrosunda çalışmanın avantajları nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        Süresiz sözleşme, TVL-10 maaş kadrosu, uzun tatiller ve ders hazırlığı gerektirmemesi avantajdır. Dezavantajı ise mesleki tanımsızlık ve yükselme şansının az olmasıdır.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="doktora-avantaj">
                      <AccordionTrigger className="text-left">Doktora yapmanın avantajları nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        Akademik kariyer kapısı açar ve öğrenci bileti (Semesterticket) ile ücretsiz ulaşım sağlar. Giriş için Master yapmış olmak ve bir profesörden kabul (Betreuungszusage) almak gerekir.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* 4. İş Hayatı */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    4. İş Hayatı ve Mülakat
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="mulakat-hazirlik">
                      <AccordionTrigger className="text-left">İş mülakatına nasıl hazırlanmalı?</AccordionTrigger>
                      <AccordionContent>
                        Grup çalışmaları yapın, tecrübelerinizi anlatan Almanca bir sunum hazırlayın. Yanınızda mutlaka <strong>kendi hazırladığınız bir blok ders planı</strong> götürün.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tecrube-yoksa">
                      <AccordionTrigger className="text-left">Almanya'da tecrübem yoksa ne demeliyim?</AccordionTrigger>
                      <AccordionContent>
                        Türkiye'deki tecrübelerinizi, kendi çocuklarınızla deneyimlerinizi ve eğitim anlayışınızı samimi bir dille anlatın. Teorik değil pratik ve kişisel cevaplar verin.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="basortusu">
                      <AccordionTrigger className="text-left">Başörtüsü veya namaz sorun olur mu?</AccordionTrigger>
                      <AccordionContent>
                        Tecrübelere göre başörtüsü genellikle sorun teşkil etmez. Namaz konusunda da anlayış gösterilmektedir.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="maas-durumu">
                      <AccordionTrigger className="text-left">Maaşlar ne kadar?</AccordionTrigger>
                      <AccordionContent>
                        B1 Almanca ile başlayan bir sınıf öğretmeni brüt 3000€ civarı alabilir. Okul öncesi için net maaş 2100€ civarında başlar ancak vergi sınıfı (Steuerklasse) ve çocuk sayısı net maaşı etkiler.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* 5. Jobcenter ve Yasal Haklar */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Euro className="w-5 h-5" />
                    5. Jobcenter ve Sosyal Yardım
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="jobcenter-bildirim">
                      <AccordionTrigger className="text-left">Jobcenter'a neleri bildirmeliyim?</AccordionTrigger>
                      <AccordionContent>
                        İşe başlama, taşınma, evlilik, gelir değişikliği ve Türkiye'deki mal varlığı dahil her türlü değişiklik derhal bildirilmelidir. Türkiye'deki varlıkların bildirilmesi zorunludur.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="is-reddi">
                      <AccordionTrigger className="text-left">Jobcenter'ın önerdiği işi reddedebilir miyim?</AccordionTrigger>
                      <AccordionContent>
                        Geçerli bir sebep (örn. çocuk bakımı) olmadan reddedilirse %30 kesinti yapılır. Tekrarında %60 ve %100 kesinti uygulanır. Düşük ücret veya uzaklık reddetmek için geçerli sebep sayılmaz.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="araba-hakki">
                      <AccordionTrigger className="text-left">Jobcenter yardım alırken araba alabilir miyim?</AccordionTrigger>
                      <AccordionContent>
                        Evet, makul bir fiyata (örn. 7.500€'ya kadar) araba alınabilir ve bu varlık olarak yardıma engel teşkil etmez.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="egitim-paketi">
                      <AccordionTrigger className="text-left">Çocuklar için hangi yardımlar var?</AccordionTrigger>
                      <AccordionContent>
                        Eğitim Paketi (Bildungspaket) kapsamında okul gezileri, kırtasiye yardımı (yıllık ~100€), öğle yemeği desteği ve spor/kültür aktiviteleri için aylık 10€ destek sağlanır.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                {/* 6. Pedagojik Destek */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    6. Pedagojik Zorluklar ve Destek
                  </h3>
                  <Accordion type="single" collapsible className="w-full space-y-2">
                    <AccordionItem value="ozel-ihtiyac">
                      <AccordionTrigger className="text-left">Otizm ve DEHB'li öğrencilere nasıl yaklaşılmalı?</AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc list-inside space-y-1">
                          <li><strong>Otizm (OSB):</strong> Yapılandırılmış ortam, görsel destekler, net dil ve sessiz alanlar sağlanmalı.</li>
                          <li><strong>DEHB:</strong> Empati, kısa talimatlar, görsel zaman çizelgeleri ve pozitif pekiştirme kullanılmalı.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="ev-aktivite">
                      <AccordionTrigger className="text-left">8-12 yaş arası çocuklar için ev aktiviteleri nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        Drama, resim, slogan yazma ve bilimsel deneyler (Kristalize Şeker, Yüzen Yumurta, Yanmaz Balon vb.) gibi aktiviteler gelişimi destekler.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </section>

              </TabsContent>

              <TabsContent value="experiences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tecrübeler</CardTitle>
                    <CardDescription>
                      Bu alanda çalışanların gerçek deneyimleri.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {experiences.length > 0 ? (
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <div key={exp.id} className="border p-4 rounded-lg">
                            <h4 className="font-bold">{exp.title}</h4>
                            <p className="text-sm text-slate-600 mt-2">{exp.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <p>Henüz bu alanda paylaşılmış bir tecrübe bulunmuyor.</p>
                        <Button variant="link" className="mt-2">
                          İlk tecrübeyi sen paylaş
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <DocumentSection professionSlug="okul-oncesi-ogretmenligi" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-blue-950 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Talep Durumu</p>
                    <p className="font-medium text-slate-900 dark:text-white">Çok Yüksek Talep</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-blue-950 rounded-lg">
                    <Euro className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Ortalama Maaş</p>
                    <p className="font-medium text-slate-900 dark:text-white">2.100€+ (Net)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-blue-950 rounded-lg">
                    <Baby className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Sektör</p>
                    <p className="font-medium text-slate-900 dark:text-white">Eğitim & Pedagoji</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Telegram Grupları */}
            <div className="grid grid-cols-1 gap-4">
              <a
                href="https://t.me/+6u5KygA3rHE4MWEy"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-lg mb-1">Okul Öncesi Öğretmenleri</div>
                    <div className="text-sm text-blue-100">Telegram Grubu</div>
                  </div>
                  <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a
                href="https://t.me/+yI1or4k3nMswN2Ni"
                target="_blank"
                rel="noopener noreferrer"
                className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
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

            <Card>
              <CardHeader>
                <CardTitle>Bu Sayfayı Paylaş</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full">
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog 
        professionSlug="okul-oncesi-ogretmenligi"
        defaultProfessionName="Okul Öncesi Öğretmeni"
      />
      <UploadDocumentDialog 
        professionSlug="okul-oncesi-ogretmenligi"
      />
    </div>
  );
}
