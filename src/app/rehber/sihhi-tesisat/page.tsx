"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, 
  Droplets, 
  Thermometer, 
  Flame, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Globe, 
  Building2, 
  Languages,
  Scale,
  AlertTriangle,
  Users,
  Euro,
  Clock,
  Hammer,
  Zap,
  Wifi,
  Snowflake,
  Home,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SihhiTesisatPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Tesisat%,profession.ilike.%SHK%,profession.ilike.%Anlagenmechaniker%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-cyan-100 text-cyan-900 hover:bg-cyan-200">
                Teknik & Zanaat
              </Badge>
              <Badge variant="outline" className="text-cyan-100 border-cyan-400">
                SHK (Sanitär, Heizung, Klima)
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Sıhhi Tesisat, Isıtma ve Klima Teknisyenliği
            </h1>
            <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
              Anlagenmechaniker für Sanitär-, Heizungs- und Klimatechnik (SHK) alanında kariyer, eğitim ve yaşam rehberi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-cyan-900 hover:bg-cyan-50" asChild>
                <Link href="#baslangic">Rehbere Başla</Link>
              </Button>
              <Button size="lg" className="bg-cyan-700 text-white hover:bg-cyan-600 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

        {/* Telegram Links Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <a href="https://t.me/+Aw76s1FN-gJkYWZi" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg mb-1">Sihhi Tesisat - SHK</div>
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
              <TabsList className="grid w-full grid-cols-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="guide" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Rehber</TabsTrigger>
                <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">SSS</TabsTrigger>
                <TabsTrigger value="experiences" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Tecrübeler</TabsTrigger>
                <TabsTrigger value="tips" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Teknik İpuçları</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-12 mt-6">
            
                {/* Bölüm I: Almanya'ya Kariyer Hazırlığı */}
                <section id="baslangic" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                      <Globe className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      1. Almanya'ya Kariyer Hazırlığı
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-cyan-600" />
                          Meslek Dalları ve Yasal Zemin
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">
                          Ana odak noktası olan Sıhhi Tesisat, Klima ve Gaz Teknisyenliği meslek grubu, Almanya'da genellikle <strong>Anlagenmechaniker für Sanitär-, Heizungs- und Klimatechnik (SHK)</strong> adı altında toplanmaktadır.
                        </p>
                        
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                            <Wifi className="w-4 h-4" /> Alternatif: Telekomünikasyon Sistem Teknisyenliği
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            Breitbandkommunikation (Geniş Bant İletişim Teknolojisi) geleceği parlak bir alandır. Nisan 2022'de 200'den fazla açık pozisyon raporlanmıştır.
                          </p>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Görev:</strong> Telekomünikasyon sistemlerinin kurulumu, ağa bağlanması (vernetzen) ve bakımı.</li>
                            <li><strong>Kapsam:</strong> Kablolu TV, İnternet, Telefon, Fiber Optik (Glasfaser) ve Koaksiyel ağlar.</li>
                            <li><strong>İşleyiş:</strong> Ev tesisatları montajı, arıza giderme ve sistem yenileme.</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-cyan-600" />
                          Dil Şartları ve Öğrenme Süreci
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4" /> Pratik Tecrübe
                            </h4>
                            <ul className="list-disc list-inside text-sm text-amber-800 dark:text-amber-200 space-y-1">
                              <li><strong>Seviye:</strong> Ausbildung için B1 yeterli görünse de, tecrübeliler <strong>B2 seviyesini</strong> şiddetle tavsiye eder.</li>
                              <li><strong>Mülakat:</strong> Bazı firmalar B2 şartı aramayabilir ancak kursa devam niyetini belirtmek önemlidir.</li>
                              <li><strong>Zorluk:</strong> Teknik terminoloji dili zorlaştırabilir.</li>
                            </ul>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Entegre Dil Eğitimi Örneği</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Bazı kurslarda (örn. Telekomünikasyon) "Integriertes Fach- und Sprachlernen" modeli uygulanır. El sanatları dersine paralel mesleki Almanca dersi verilir.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="w-5 h-5 text-cyan-600" />
                          Denklik ve Tecrübe Belgelendirmesi
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Belgelerin Önemi</h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            1-3 yıl ve üzeri resmi kayıtlı çalışmayı belgelemek, mesleki tanınmada (Berufliche Anerkennung) %50, %75 veya TAM TANINMA (Gleichwertigkeit) sağlayabilir.
                          </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="ornek-deneyimler">
                            <AccordionTrigger>Örnek Denklik Deneyimleri</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li><strong>Meslek Lisesi + Ustalık:</strong> HWK tarafından denklik alınmış, 9 ay staj ile Ausbildung tamamlanmıştır.</li>
                                <li><strong>Üniversite (Gaz ve Tesisat):</strong> IHK tarafından tanınmış, ancak 8 ay staj şartı koşulmuştur.</li>
                                <li><strong>İnşaat Teknikerliği:</strong> Denklik alınamasa bile, görülen dersler eğitim süresinden düşülebilir.</li>
                                <li><strong>Endüstriyel Boru Montajı:</strong> Boru kaynağı üzerine çalışarak iyi bir gelir elde edilebilir.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                        
                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                          * Denklik başvurusunda e-devlet çıktıları yerine orijinal belgeler istenebilir.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Bölüm II: Eğitim ve İşe Başlama */}
                <section id="egitim" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      2. Eğitim ve İşe Başlama Süreci
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-cyan-600" />
                          Eğitim Türleri: Ausbildung vs. Umschulung
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Ausbildung (Mesleki Eğitim)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Normal süresi 3,5 yıldır. Genellikle 1 Ağustos'ta başlar. Bir firma bulmak başlamak için yeterlidir.
                            </p>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Umschulung (Yeniden Eğitim)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Meslek eğitiminin kısaltılmış halidir. Tecrübeye ve yaşa göre 24-28 ay sürebilir. Üniversite diploması ile 1. yıl atlanabilir.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Euro className="w-5 h-5 text-cyan-600" />
                          Finansman ve Destekler
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                          <li><strong>Kurumlar:</strong> Bundesagentur für Arbeit ve Jobcenter, SGB III ve SGB II uyarınca teşvik verir.</li>
                          <li><strong>Bildungsgutschein:</strong> Kurs ücretleri Eğitim Kuponu ile karşılanabilir (AZAV sertifikalı olmalı).</li>
                          <li><strong>Ek Yardımlar:</strong> Konut yardımı (Wohngeld) ve çocuk takviyesi (Kinderzuschlag) alınabilir.</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-cyan-600" />
                          Özel Eğitim Modeli: Systemtechniker
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                          Telekomünikasyon teknisyenliği kursu örneği:
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded">
                            <strong>Süre:</strong> 8 ay (6 ay ders + 2 ay staj).
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded">
                            <strong>Ders Saati:</strong> Tam zamanlı (08:30-16:45) veya yarı zamanlı.
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded">
                            <strong>Yetkinlik:</strong> Elektrik tesisatçısı yetkisi (Elektrofachkraft für festgelegte Tätigkeiten) kazanılır.
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Bölüm III: Varış ve Uyum */}
                <section id="uyum" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                      <Home className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      3. Almanya'ya Varış ve Uyum
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-cyan-600" />
                          İş Yeri ve Okul Hayatı
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800 mb-4">
                          <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Pratik İpuçları</h4>
                          <ul className="list-disc list-inside text-sm text-amber-800 dark:text-amber-200 space-y-1">
                            <li><strong>Firma Seçimi:</strong> Bazı katılımcılar Alman firmalarını tercih etmeyi önermektedir.</li>
                            <li><strong>Döngü:</strong> Genelde 2 hafta iş, 1 hafta okul şeklindedir.</li>
                            <li><strong>Zorluklar:</strong> Fiziksel zorluk (malzeme taşıma) ve soğuk hava koşulları olabilir.</li>
                          </ul>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Okulda hesaplamalar ve teknik terimler başlangıçta zorlayabilir. Sınıflarda genellikle yüksek oranda (%70-75) yabancı öğrenci bulunur.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Bölüm IV: İş Hayatı */}
                <section id="is-hayati" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                      <Briefcase className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      4. İş Hayatı ve Kariyer
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Euro className="w-5 h-5 text-cyan-600" />
                          Çalışma Şartları ve Maaş
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Maaş Beklentisi</h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                              <li><strong>Geselle (Kalfa):</strong> Başlangıç brüt ~2600 Euro.</li>
                              <li><strong>Yardımcı Eleman:</strong> Saatlik brüt en az 15 Euro + mesai.</li>
                              <li><strong>Alternatif:</strong> Havaalanı yükleme işleri (Flugzeugabfertiger) brüt ~3000 Euro.</li>
                            </ul>
                          </div>
                          <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Gerçekçi Bakış</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              "Çok para kazanırsın" söylemlerine temkinli yaklaşılmalıdır. İş bedenen yorucudur ve başlangıç maaşları beklentinin altında kalabilir.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Hammer className="w-5 h-5 text-cyan-600" />
                          Ustalık (Meister) ve Kendi İşini Kurma
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4">
                          <div className="flex gap-4 items-start">
                            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded shrink-0">
                              <CheckCircle2 className="w-5 h-5 text-cyan-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">Geselle (Kalfa) Yetkisi</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Doğrudan firma açamaz. 5 yıl çalıştıktan sonra açabilir ancak çırak çalıştıramaz. Alternatif olarak "Hausmeister Service" açılabilir.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 items-start">
                            <div className="p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded shrink-0">
                              <GraduationCap className="w-5 h-5 text-cyan-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">Meister (Usta) Yetkisi</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                Kendi firmasını açmak ve çırak çalıştırmak için Meisterschule (~8 ay) bitirilmelidir. Kazanç potansiyeli daha yüksektir.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-cyan-600" />
                      Sıkça Sorulan Sorular
                    </CardTitle>
                    <CardDescription>
                      Sıhhi Tesisat ve Teknik Alanlar İçin Kapsamlı Soru-Cevap Veritabanı
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                      
                      {/* I. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">I. Mesleki Eğitim (Ausbildung/Umschulung) Süreçleri</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-1-1">
                            <AccordionTrigger>Ausbildung yapmak için nasıl bir yol izlenmelidir?</AccordionTrigger>
                            <AccordionContent>
                              Ausbildung yapmak için öncelikle bir firma bulmak yeterlidir. Firma bulunduğunda, katılımcıyı okula kaydettirir (firma sizi okula gönderir).
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-1-2">
                            <AccordionTrigger>SHK Ausbildung'u normalde ne kadar sürer?</AccordionTrigger>
                            <AccordionContent>
                              Normalde Ausbildung süresi 3,5 yıldır (42 ay).
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-1-3">
                            <AccordionTrigger>Umschulung nedir ve Ausbildung'dan farkı nedir?</AccordionTrigger>
                            <AccordionContent>
                              Umschulung, meslek eğitiminin kısaltılmış halidir. Ausbildung 3,5 yıl sürerken, Umschulung genellikle 2 yıl (24 ay) sürer. Yaşa ve tecrübeye göre süre değişebilir (örn. 28 ay).
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-1-4">
                            <AccordionTrigger>Eğitim süresinde kısaltma neye göre yapılır?</AccordionTrigger>
                            <AccordionContent>
                              Kısaltma genellikle yaşa ve önceki tecrübelere göre yapılır. Üniversite diploması ile 1. yıl atlanabilir. Tecrübeli bir katılımcı 3,5 yıllık eğitimi 20 ayda tamamlamıştır.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-1-5">
                            <AccordionTrigger>Ausbildung'a ne zaman başlanır?</AccordionTrigger>
                            <AccordionContent>
                              Genellikle 1 Ağustos tarihinde başlar.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-1-6">
                            <AccordionTrigger>Okul-iş döngüsü nasıldır?</AccordionTrigger>
                            <AccordionContent>
                              Genellikle haftada 1-2 gün okul, diğer günler iş şeklindedir. Umschulung'da ise blok sistem (2 hafta iş, 1 hafta okul) uygulanabilir.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-1-7">
                            <AccordionTrigger>Umschulung yapan biri maaş alır mı?</AccordionTrigger>
                            <AccordionContent>
                              Evet, maaş alınabilir ancak Jobcenter desteği varsa kesinti yapılabilir.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* II. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">II. Denklik (Anerkennung) ve Tecrübe</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-2-1">
                            <AccordionTrigger>Kapsamlı meslek dalının adı nedir?</AccordionTrigger>
                            <AccordionContent>
                              Anlagenmechaniker für Sanitär-, Heizungs- und Klimatechnik (SHK).
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-2-2">
                            <AccordionTrigger>Türkiye'deki tecrübe denklikte ne kadar etkilidir?</AccordionTrigger>
                            <AccordionContent>
                              Resmi kayıtlı çalışmayı belgelemek, %50, %75 veya Tam Tanınma (Gleichwertigkeit) sağlayabilir.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-2-3">
                            <AccordionTrigger>Meslek Lisesi ve Ustalık belgesi nasıl değerlendirilir?</AccordionTrigger>
                            <AccordionContent>
                              HWK tarafından tanınır. Genellikle 9 ay staj (Praktikum) ile tam denklik alınabilir.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-2-4">
                            <AccordionTrigger>Teknikerlik veya Üniversite diploması nasıl değerlendirilir?</AccordionTrigger>
                            <AccordionContent>
                              IHK tarafından tanınabilir ancak dil seviyesi ve eksik dersler için staj (örn. 8 ay) şartı koşulabilir.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* III. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">III. Dil Şartları ve Çalışma Ortamı</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-3-1">
                            <AccordionTrigger>Hangi dil seviyesi gereklidir?</AccordionTrigger>
                            <AccordionContent>
                              B1 yeterli görülebilir ancak B2 seviyesi şiddetle tavsiye edilir.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-3-2">
                            <AccordionTrigger>Alman firması mı Türk firması mı?</AccordionTrigger>
                            <AccordionContent>
                              Tecrübeler, kurumsallık ve çalışma şartları açısından Alman firmalarının tercih edilmesini önermektedir.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-3-3">
                            <AccordionTrigger>Fiziksel zorluklar nelerdir?</AccordionTrigger>
                            <AccordionContent>
                              Malzeme taşıma (5. kata kadar), soğukta çalışma ve bedensel yorgunluk başlıca zorluklardır.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* IV. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">IV. İş Hayatı ve Maaş</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-4-1">
                            <AccordionTrigger>Geselle (Kalfa) başlangıç maaşı ne kadardır?</AccordionTrigger>
                            <AccordionContent>
                              Brüt 2600 Euro civarında olabilir. Yardımcı elemanlar saatlik 15 Euro civarı kazanabilir.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-4-2">
                            <AccordionTrigger>Kendi işimi nasıl kurabilirim?</AccordionTrigger>
                            <AccordionContent>
                              Geselle belgesiyle 5 yıl çalıştıktan sonra firma açılabilir (çırak çalıştıramaz). Tam yetki için Meister (Usta) olmak gerekir. Alternatif olarak Hausmeister Service açılabilir.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* V. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">V. Alternatifler: Telekomünikasyon</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-5-1">
                            <AccordionTrigger>Systemtechniker Telekommunikation nedir?</AccordionTrigger>
                            <AccordionContent>
                              İnternet, telefon ve fiber optik sistemlerin kurulum ve bakımını kapsar. Geleceği parlak bir alandır.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-5-2">
                            <AccordionTrigger>Eğitim süresi ve şartları nedir?</AccordionTrigger>
                            <AccordionContent>
                              Yaklaşık 8 ay sürer (6 ay ders + 2 ay staj). Teknik mesleki eğitim şartı yoktur, el becerisi olanlar katılabilir.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* VI. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">VI. Finansman</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-6-1">
                            <AccordionTrigger>Kurs ücretleri nasıl karşılanır?</AccordionTrigger>
                            <AccordionContent>
                              Jobcenter veya Agentur für Arbeit tarafından Bildungsgutschein (Eğitim Kuponu) ile karşılanabilir.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                      {/* VII. Bölüm */}
                      <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50">
                        <h3 className="font-semibold text-lg mb-4 text-cyan-900 dark:text-cyan-100">VII. Teknik Sorunlar</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="faq-7-1">
                            <AccordionTrigger>Gider tıkanıklığı nasıl açılır?</AccordionTrigger>
                            <AccordionContent>
                              5-10 metrelik gider açma spirali ile müdahale edilebilir. Tıkanıklık genellikle T bağlantı noktalarında olur.
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="faq-7-2">
                            <AccordionTrigger>Buzdolabı ses yapıyorsa ne yapılmalı?</AccordionTrigger>
                            <AccordionContent>
                              Motorun altındaki su haznesi dolmuş olabilir. Suyu boşaltmak sesi kesebilir.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>

                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experiences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tecrübe Paylaşımları</CardTitle>
                    <CardDescription>
                      Bu alanda çalışanların gerçek deneyimleri ve tavsiyeleri.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-slate-500">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-4">Henüz onaylanmış tecrübe paylaşımı bulunmuyor.</p>
                      <Button variant="outline" asChild>
                        <Link href="#tecrube-paylas">İlk Tecrübeyi Sen Paylaş</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tips" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-cyan-600" />
                      Teknik Arıza Giderme İpuçları
                    </CardTitle>
                    <CardDescription>
                      Günlük hayatta karşılaşılan teknik sorunlara dair pratik çözümler.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="tesisat">
                        <AccordionTrigger className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">
                          <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5" />
                            Tesisat Tıkanıklıkları
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400">
                          <ul className="list-disc list-inside space-y-2">
                            <li><strong>Belirti:</strong> Klozet veya duş giderinden pis su gelmesi, suyun yavaş gitmesi.</li>
                            <li><strong>Çözüm:</strong> 5-10 metrelik gider açma spirali ile tıkanıklık giderilebilir.</li>
                            <li><strong>Uyarı:</strong> Sorun bina havalandırma borularında da olabilir. Bilgi yoksa profesyonel yardım alınmalıdır.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="buzdolabi-ses">
                        <AccordionTrigger className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">
                          <div className="flex items-center gap-2">
                            <Snowflake className="w-5 h-5" />
                            Buzdolabı Gürültü Sorunu
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400">
                          <p>Buzdolabının arkasından ses geliyorsa, motorun altındaki plastik haznede su birikmiş olabilir. Fiş çekilip su boşaltıldığında ses kesilebilir.</p>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="buzdolabi-donma">
                        <AccordionTrigger className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">
                          <div className="flex items-center gap-2">
                            <Thermometer className="w-5 h-5" />
                            Buzdolabı Donma Sorunu
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400">
                          <ul className="list-disc list-inside space-y-2">
                            <li>Yiyecekleri donduruyorsa, 1 gün elektrik kesilip kapaklar açık beklenmelidir.</li>
                            <li>Sorun devam ederse ve kartlı değilse, termostat değiştirilebilir.</li>
                            <li>Derin dondurucuda aşırı buzlanma ve su sızıntısı varsa, ısıtıcı sensörü arızalı olabilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="sogutmama">
                        <AccordionTrigger className="text-lg font-semibold text-cyan-900 dark:text-cyan-100">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Soğutmama Sorunu (Örn. Sharp)
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400">
                          <p>Çift bölmeli dolaplarda alt kısım çalışıp üst kısım soğutmuyorsa ve ekranda LC uyarısı varsa, teknik servis desteği gerekebilir.</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-cyan-900 text-white border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Topluluk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-cyan-100">
                  Bu rehber, Almanya'daki Türk SHK teknisyenleri topluluğunun tecrübeleriyle oluşturulmuştur.
                </p>
                <Button className="w-full bg-white text-cyan-900 hover:bg-cyan-50" asChild>
                  <Link href="#tecrube-paylas">Sen de Katıl</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hızlı Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="https://www.arbeitsagentur.de/" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-cyan-700 dark:text-cyan-400">
                  Bundesagentur für Arbeit
                </Link>
                <Link href="https://www.anerkennung-in-deutschland.de/" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-cyan-700 dark:text-cyan-400">
                  Denklik Portalı
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog professionSlug="sihhi-tesisat" defaultProfessionName="Sıhhi Tesisat (SHK)" />
      <UploadDocumentDialog professionSlug="sihhi-tesisat" />
    </div>
  );
}
