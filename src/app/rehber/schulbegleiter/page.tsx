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
  Scale,
  AlertTriangle,
  Users,
  Heart,
  Brain,
  Plane,
  Home,
  Search,
  School,
  Baby,
  Info,
  HelpCircle,
  Euro,
  Clock,
  UserPlus
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

export default function SchulbegleiterPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Schulbegleiter%,profession.ilike.%Refakatçi%,profession.ilike.%Gölge Öğretmen%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-orange-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-900 hover:bg-orange-200">
                Eğitim & Sosyal
              </Badge>
              <Badge variant="outline" className="text-orange-100 border-orange-400">
                Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Schulbegleiter (Okul Refakatçisi)
            </h1>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Özel gereksinimli öğrencilere destek olan Schulbegleiter (Integrationshelfer) mesleği, başvuru süreçleri ve çalışma şartları.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-orange-700 text-white hover:bg-orange-800 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Telegram Links Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <a href="https://t.me/+kG6hhF1Rqe9mNzIy" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-1">Schulbegleiter*in</div>
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
            
            {/* 1. Bölüm: Hazırlık ve Yasal Zemin */}
            <section id="baslangic" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Scale className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  1. Hazırlık Süreci ve Yasal Zemin
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-orange-600" />
                      1.1. Mesleki Nitelik ve Denklik
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Yasal Gereksinimler</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Schulbegleiter olmak için Türkiye'den gelen bir öğretmenin veya üniversite mezununun belirli bir diploma denkliği (Anerkennung) şartını sağlamasına gerek yoktur. Ancak, eğitim geçmişi işe alımda önemlidir. Mesleğiniz tanınmışsa, İkamet Kanunu 18a/18b uyarınca "Kalifiye İşçi" olarak oturum alabilirsiniz.
                      </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="denklik-ipuclari">
                        <AccordionTrigger>Denklik Süreci ve İpuçları</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            <li><strong>Zeugnisbewertung:</strong> ZAB'dan alınan belge, pedagojik alanda iş bulmayı kolaylaştırır.</li>
                            <li><strong>Belgeler:</strong> Master/Doktora diplomaları, transkript ve hizmet dökümü çevrilmelidir. Çeviri ücretlerini Jobcenter karşılayabilir.</li>
                            <li><strong>Fachkraft Statüsü:</strong> Görüşmelerde kendinizi "Pädagogische Fachkraft" olarak tanıtın. Bu, maaş tablosunda (Lohntabelle) daha yüksek bir kadrodan başlamanızı sağlar.</li>
                            <li><strong>Tecrübe Saydırma:</strong> Türkiye'deki öğretmenlik yılları pazarlıkla saydırılabilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-orange-600" />
                      1.2. Dil Yeterliliği ve Eğitim
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Dil Seviyesi</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          Genellikle <strong>B2</strong> istenir. Ancak B1 ve hatta ihtiyaç durumunda A2 ile işe başlayanlar vardır.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Önemli:</strong> B1 seviyesi öğretmen ve aile iletişimi için yetersiz kalabilir. İleri kariyer (öğretmenlik) için C1 hedeflenmelidir.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Mesleki İleri Eğitim (Weiterbildung)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          Jobcenter destekli 7 aylık kurslar mevcuttur (Schulbegleiter, Inklusionbegleiter).
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>Tavsiye:</strong> Bazılarına göre ek eğitime gerek yoktur, pratik tecrübe daha değerlidir. Ancak sertifika maaş artışı sağlayabilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: Göç ve Jobcenter */}
            <section id="goc" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  2. Göç ve Jobcenter İşlemleri
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                      2.1. Jobcenter Hak ve Yükümlülükleri
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Jobcenter, geçimini sağlayamayanlar için "Bürgergeld" (eski adıyla ALG II) sağlar.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="yukumlulukler">
                        <AccordionTrigger>Yükümlülükler ve Bildirimler</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Bildirim:</strong> Gelir, adres, medeni hal değişiklikleri derhal bildirilmelidir.</li>
                            <li><strong>Mal Varlığı:</strong> Yurt içi ve yurt dışı tüm varlıklar (TR emekli maaşı dahil) beyan edilmelidir.</li>
                            <li><strong>İl Dışına Çıkış:</strong> İzin alınmalıdır, aksi takdirde yardım kesilebilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="konut">
                        <AccordionTrigger>Konut ve Taşınma</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li>Kira ve ısınma masrafları "ölçülü" (angemessen) olduğu sürece karşılanır.</li>
                            <li>Taşınmadan önce mutlaka Jobcenter onayı (Zusicherung) alınmalıdır.</li>
                            <li>25 yaş altı kişiler, ciddi bir sebep olmadan aile evinden ayrılamaz.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. Bölüm: İş Hayatı */}
            <section id="is-hayati" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <School className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  3. İş Hayatı ve Pratik Tecrübe
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      3.1. Rol ve Görevler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Temel Görevler</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Sınıf İçi Destek:</strong> Çocuğun yanında oturup derse odaklanmasını sağlamak.</li>
                        <li><strong>Davranış Yönetimi:</strong> Sakinleştirmek, kriz anlarını yönetmek.</li>
                        <li><strong>Kişisel Bakım (Pflege):</strong> Özellikle Förderschule'de tuvalet/alt değiştirme gerekebilir.</li>
                        <li><strong>Raporlama:</strong> Günlük gözlemleri Jugendamt'a raporlamak.</li>
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Çalışma Yerleri</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Okullar (Grundschule, Förderschule vb.) ve Anaokulları. Genellikle AWO, DRK, Caritas gibi kurumlar üzerinden çalışılır.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Hedef Kitle</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Otizm, DEHB, öğrenme güçlüğü, bedensel engel veya davranış bozukluğu olan çocuklar.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-orange-600" />
                      3.2. Çalışma Şartları ve Maaş
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Maaş (Gehalt)</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Saat Ücreti:</strong> 11€ - 12.45€ (Standart).</li>
                          <li><strong>Fachkraft:</strong> 20€ - 25€ (Öğretmen/Pedagog kökenliler talep etmeli).</li>
                          <li><strong>Aylık Net:</strong> 30 saat için ~1400-1500€ Net.</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Tatil ve Ödeme</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li>Yılda 4 hafta ücretli izin.</li>
                          <li>Okul tatillerinde maaş alabilmek için saatler yıla yayılır (Örn: 30 saat çalışıp 25 saat parası almak).</li>
                          <li>Çocuk gelmezse başka çocuğa (Vertretung) bakılır.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-orange-600" />
                      3.3. Başvuru ve Mülakat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      İş ararken DRK, AWO, Caritas gibi büyük kurumlar tercih edilmelidir.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="mulakat">
                        <AccordionTrigger>Mülakat İpuçları</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Motivasyon:</strong> "Sistemi tanımak ve dilimi geliştirmek istiyorum" diyebilirsiniz.</li>
                            <li><strong>Sorular:</strong> Maaş beklentisi, esneklik, ehliyet ve özel çocuklarla tecrübe sorulur.</li>
                            <li><strong>Hospitation:</strong> İşe başlamadan önce bir gün "Gözlem Günü" yapılır. Öğretmenin onayı önemlidir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Bölüm: Zorluklar ve Kariyer */}
            <section id="kariyer" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  4. Zorluklar ve Kariyer Perspektifi
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Zorluklar</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Dil:</strong> Yetersiz Almanca öğretmenlerle iletişimi zorlaştırabilir.</li>
                        <li><strong>Çocuklar:</strong> Şiddet eğilimi, ısırma, bağırma gibi davranışlar olabilir.</li>
                        <li><strong>Fiziksel Bakım:</strong> Alt değiştirme gibi görevler gerekebilir.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Kariyer Yolu</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Köprü Görevi:</strong> Eğitim sistemine giriş için harika bir basamaktır.</li>
                        <li><strong>İlerleme:</strong> Vertretungslehrer (Sözleşmeli Öğretmen), OGS veya Erzieher pozisyonlarına geçiş yapılabilir.</li>
                        <li><strong>Referans:</strong> Okul müdüründen alınacak "Gutachten" (Referans) çok değerlidir.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Alternatif: Wohngruppe (Gençlik Yaşam Grubu)</h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Schulbegleiter'lar Wohngruppe'larda da çalışabilir. Burada çocukların "anne-babası" gibi davranılır (yemek, alışveriş, randevular). B2 Almanca yeterlidir.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 5. Bölüm: Sıkça Sorulan Sorular */}
            <section id="sss" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  5. Sıkça Sorulan Sorular
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>Schulbegleiter*in mesleğinin rolü ve kapsamı nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Schulbegleiter*in, özel gereksinimleri olan çocuğun okula entegrasyonuna yardımcı olan ve refakat eden kişidir. Temel amacı, çocuğun dikkatini toplamasını sağlamak, yapması gerekenleri söylemek, ödevlerine yardımcı olmak, kavga etmesini engellemek ve davranışta kazandırmak suretiyle çocuğun sınıf içinde sakin kalmasını ve ders takibini sağlamaktır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-2">
                      <AccordionTrigger>Schulbegleiter*in tam olarak ne iş yapıyor çocukla?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Schulbegleiter, çocukla birlikte derse girer, yanında veya yakınında oturur. Görevler arasında; derste anlamadığı konularda yardımcı olmak, tenefüste uzaktan izleyerek kavga etmesini engellemek, dikkatini dağıtan unsurlara karşı omzuna dokunarak yönlendirmek ve ödevlerini yapmasını sağlamak bulunur. Çocukla ilgili günlük gözlemlerin 3-5 cümle ile Jugendamt sitesine yazılması da idari bir görevdir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-3">
                      <AccordionTrigger>Schulbegleiter*in sadece engelli çocuklara mı bakıyor?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Hayır, sadece engelli çocuklara bakılmıyor. Refakat edilen çocukların profili çok çeşitlidir: Öğrenme güçlüğü (Lernschwäche), dikkat eksikliği (ADHS/DEHB), konsantrasyon eksikliği, şiddete/agresifliğe meyilli (agressiv), otizm spektrum bozukluğu, Down sendromu, görme engeli veya bedensel engeli olan çocuklar olabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-4">
                      <AccordionTrigger>Schulbegleiter*in çocuğun kişisel bakımına (tuvalet ihtiyacı, alt değiştirme) yardım etmek zorunda mıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet, özellikle Förderschule'de (Özel Eğitim Okulu) veya ağır engelli çocuklarla çalışılıyorsa, tuvalet ihtiyacına yardım etme veya altını değiştirme gibi kişisel bakımı (persönliche Pflege) üstlenmek gerekebilir. Bu tür bir öğrenci isteyip istemediğinizi firmaya baştan belirtebilirsiniz.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-5">
                      <AccordionTrigger>Schulbegleiter*in olmak için hangi dil seviyesi lazım?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Şirketler genellikle en az B2 seviyesini şart koşsa da, çok ihtiyaç olması durumunda B1 hatta A2 seviyesinde Almancayla bile işe başlama teklifi alınabilir. Ancak okulda öğretmenlerle, aileyle iletişim ve ders takibi için B1 seviyesi yetersiz kalabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-6">
                      <AccordionTrigger>Eğitim/Pedagojik formasyon olmadan bu meslek yapılabilir mi?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet, bu mesleği yapmak için pedagojik formasyona sahip olmak bir gereklilik değildir. Hatta bazı yerlerde "anne ve baba olmanız" bile yeterli görülebilir. Ancak üniversite mezunu olmak, pedagojik geçmişe sahip olmak veya Fachkraft statüsünde olmak maaş ve kariyerde büyük avantaj sağlar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-7">
                      <AccordionTrigger>Schulbegleiterlik için diploma ya da transkript denkliği (Anerkennung) gerekiyor mu?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Resmi olarak Schulbegleiterlik için diploma denkliği (Anerkennung) şartı aranmaz. Ancak çoğu şirket, özellikle de öğretmenlik mesleğine sahip olmanız durumunda ZAB'dan (Zentralstelle für ausländisches Bildungswesen) alınan "Zeugnisbewertung" belgesine bakar ve bu belge işe alımda en büyük rolü oynar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-8">
                      <AccordionTrigger>Schulbegleiterlik, öğretmenlik kariyerine geçiş için bir köprü (Brücke) müdür?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet, bu meslek, eğitimci kökenli kişiler için Almanya eğitim sistemini tanıma, okul dilini öğrenme ve tecrübe (Erfahrung) kazanma adına çok iyi bir başlangıç ve köprü görevi görür. Başvurularda iyi bir okul müdürü/öğretmenden alınan iyi görüş kağıdı (Gutachten) önemli rol oynar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-9">
                      <AccordionTrigger>İş görüşmesinde hangi sorular sorulur?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Görüşmelerde sıklıkla sorulan sorular şunlardır: Daha önce hangi yaş grubu ile çalıştınız?, Kindergarten, Grundschule ya da daha büyük yaşta bir öğrenci mi istersiniz?, Özel çocuklarla deneyiminiz var mı?, Maaş beklentiniz nedir?, Ehliyetiniz ve arabanız var mı?, Haftada kaç saate kadar çalışabilirsiniz?, Flexibil (Esnek) misiniz?, Çocuklara tuvalete giderken eşlik etme ya da bez değiştirme gibi bir tecrübeniz oldu mu?, Otizmli bir çocuğa karşı yaklaşımınız nasıl olur?, Neden bu işi yapmak istiyorsunuz?, Güçlü ve zayıf yönleriniz nelerdir?
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-10">
                      <AccordionTrigger>Schulbegleiter*in saat ücreti ne kadar?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Saat ücreti firmadan firmaya ve eyaletten eyalete büyük farklılık gösterir. Teklifler brüt 11 Euro ile 25 Euro arasında değişebilir. Tecrübesi ve denkliği olmayanlara 11-13 Euro teklif edilebilirken, Fachkraft olarak kabul edilen birinin saati en az 20 Euro olmalıdır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-11">
                      <AccordionTrigger>Çalışılmayan tatil günlerinde maaş alınır mı?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet, çalışılmayan tatil günlerinde maaş alınır. Şirketler genellikle 9 aylık çalışma süresini 12 aya böler ve ortalama bir saat üzerinden ödeme yapar (örneğin 30 saat kontrat için 25 saat ödeme yapılır). Amaç, yazın ve diğer tatil dönemlerinde Jobcenter'a geri dönmemektir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-12">
                      <AccordionTrigger>Schulbegleiter maaşı tek başına bir ev geçindirmeye yeterli midir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Hayır, bu işle tek başına özellikle büyük şehirlerdeki kira masrafları göz önüne alındığında ev geçindirmek zor olabilir. Tarife dışı çalışanlar, gelirleri geçim sınırının altında kalacağı için Jobcenter'dan sosyal yardıma ihtiyaç duymaya devam edebilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-13">
                      <AccordionTrigger>Jobcenter'dan yardım alırken çalışmaya başlarsak bunu hemen bildirmeli miyiz?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Evet, mesleki bir faaliyete (serbest veya bağımsız) başladığınız anda bunu hemen bildirmelisiniz. Aksi takdirde, haksız alınan yardımları geri ödemek zorunda kalırsınız ve nizama aykırı hareketten dolayı bir işlemle karşı karşıya kalma tehlikesi oluşur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-14">
                      <AccordionTrigger>Otizmli bir çocukla çalışırken nelere dikkat etmeliyiz?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Her otizmli çocuk farklıdır. Genellikle temas sevmezler, konuşurken kısa ve net olunmalıdır, sınırlar çizilip korunmalıdır. Sosyal etkileşimde ve iletişimde zorluklar, sınırlı ve tekrarlayıcı davranışlar ve duyusal hassasiyetler (gürültü, ışık) görülebilir. Yapılandırılmış öğrenme ortamları ve görsel destekler (günlük programlar, resimli kartlar) kullanmak önemlidir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-15">
                      <AccordionTrigger>Çocukla yıldızımız barışmazsa (uyum sağlanamazsa) işsiz kalır mıyız?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Eğer çalıştığınız yer büyük bir firmaysa (Träger), uyum sağlanamayan bir durum olduğunda sizi başka bir öğrencide değerlendirebilir. Çocuğun değiştirilmesini talep etmek gayet normal bir durumdur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </section>

              </TabsContent>

              <TabsContent value="experiences">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h3>
                  <ShareExperienceDialog 
                    professionSlug="schulbegleiter"
                    defaultProfessionName="Schulbegleiter"
                  />
                </div>
                {experiences.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-slate-500 mb-4">Henüz bu alanda tecrübe paylaşılmamış.</p>
                      <Button variant="outline" asChild>
                        <Link href="#tecrube-paylas">İlk paylaşan sen ol</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-6">
                    {experiences.map((exp) => (
                      <Card key={exp.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{exp.title}</CardTitle>
                              <CardDescription>{exp.profession} - {exp.city}</CardDescription>
                            </div>
                            <Badge>{exp.years_of_experience} Yıl Tecrübe</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-600 dark:text-slate-400">{exp.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Örnek Dokümanlar</h3>
                  <UploadDocumentDialog 
                    professionSlug="schulbegleiter"
                  />
                </div>
                <DocumentSection professionSlug="schulbegleiter" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-orange-900 dark:text-orange-100">Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#baslangic" className="block p-2 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-sm text-orange-700 dark:text-orange-300 transition-colors">
                  1. Hazırlık ve Yasal Zemin
                </Link>
                <Link href="#goc" className="block p-2 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-sm text-orange-700 dark:text-orange-300 transition-colors">
                  2. Göç ve Jobcenter
                </Link>
                <Link href="#is-hayati" className="block p-2 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-sm text-orange-700 dark:text-orange-300 transition-colors">
                  3. İş Hayatı
                </Link>
                <Link href="#kariyer" className="block p-2 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-sm text-orange-700 dark:text-orange-300 transition-colors">
                  4. Zorluklar ve Kariyer
                </Link>
                <Link href="#sss" className="block p-2 hover:bg-orange-100 dark:hover:bg-orange-800 rounded-lg text-sm text-orange-700 dark:text-orange-300 transition-colors">
                  5. SSS
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Özet Bilgiler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Euro className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Saatlik Ücret</p>
                    <p className="font-medium text-slate-900 dark:text-white">12€ - 25€ (Brüt)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Çalışma Saati</p>
                    <p className="font-medium text-slate-900 dark:text-white">20 - 35 Saat/Hafta</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Languages className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Dil Şartı</p>
                    <p className="font-medium text-slate-900 dark:text-white">B1 - B2</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog 
        professionSlug="schulbegleiter"
        defaultProfessionName="Schulbegleiter"
      />
      <UploadDocumentDialog 
        professionSlug="schulbegleiter"
      />
    </div>
  );
}
