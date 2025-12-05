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
  Globe, 
  Building2, 
  Languages,
  Scale,
  AlertTriangle,
  Users,
  Euro,
  Clock,
  Heart,
  Brain,
  Plane,
  Home,
  CheckCircle2,
  FileText,
  School,
  Baby,
  HelpCircle,
  UploadCloud
} from "lucide-react";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SinifOgretmenligiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: expData } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Sınıf%,profession.ilike.%Grundschule%')
        .order('created_at', { ascending: false });
      
      if (expData) setExperiences(expData);

      const { data: docData } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'approved')
        .eq('profession_slug', 'sinif-ogretmenligi')
        .order('created_at', { ascending: true });
      
      if (docData) setDocuments(docData);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-emerald-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-900 hover:bg-emerald-200">
                Eğitim
              </Badge>
              <Badge variant="outline" className="text-emerald-100 border-emerald-400">
                Grundschullehrer/in
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Sınıf Öğretmenliği
            </h1>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Sınıf öğretmenleri için denklik, dil yeterliliği, alternatif kariyer yolları ve yaşam rehberi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50" asChild>
                <Link href="#baslangic">Rehbere Başla</Link>
              </Button>
              <Button size="lg" className="bg-emerald-700 text-white hover:bg-emerald-600 border-none" asChild>
                <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Ana İçerik */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="guide" className="space-y-8">
              <TabsList className="grid w-full grid-cols-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="guide" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Rehber</TabsTrigger>
                <TabsTrigger value="experiences" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Tecrübeler</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Dökümanlar</TabsTrigger>
                <TabsTrigger value="faq" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">SSS</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-12 mt-6">
            
                {/* I. Bölüm: Hazırlık ve Planlama */}
                <section id="baslangic" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      1. Hazırlık ve Planlama Süreci
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-emerald-600" />
                          1.1. Dil Yeterliliği
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Almanca Gereklilikleri</h4>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Genel:</strong> C1 Sertifikası temel şarttır.</li>
                            <li><strong>NRW Özel Şartı:</strong> Mesleki tanıma (Anerkennung) başvurusu için <strong>C2 sertifikası</strong> zorunludur.</li>
                            <li><strong>Giriş Seviyesi:</strong> Üniversite kursları ve Lehrkräfte programları için genellikle B1 istenir.</li>
                            <li><strong>Erken İş:</strong> C1 ile okullarda ders ücretli öğretmenlik (Honorararbeit) mümkündür.</li>
                          </ul>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="turkce-c1">
                            <AccordionTrigger>Türkçe C1 Sertifikası Avantajı</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                Bölümü Türkçe Öğretmenliği olmayan adaylar (Sınıf Öğretmenleri dahil), Türkçe C1 Sertifikası ile NRW eyaletinde Türkçe Öğretmenliğine adım atabilirler.
                              </p>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                <li><strong>Sınav:</strong> Okuma, Dil Öğeleri, Dinleme ve Sözlü Sınavdan oluşur.</li>
                                <li><strong>Puanlama:</strong> 128-150 puan "Geçer", 193-214 puan "Pekiyi".</li>
                                <li><strong>Öncelik:</strong> Atamada Almanya mezunları ve TR Türkçe mezunlarından sonra gelirler.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-emerald-600" />
                          1.2. Evrak Hazırlığı ve Onay
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Tercüme ve Onay</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Belgeler Almanca tercüme edilmeli ve Belediye (Gemeinde) veya resmi kurumlarda "Aslı Gibidir" (Beglaubigung) yapılmalıdır. Tercüme ve fotokopi birlikte zımbalı onaylatılmalıdır.
                            </p>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Hizmet Dökümü</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              MEB'den "Hitap hizmet dökümü" ve "Adaylık Kaldırılma Belgesi" önemlidir. Stajyerliğin yapıldığı belgelenmelidir.
                            </p>
                          </div>
                        </div>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                          <p className="text-sm text-amber-800 dark:text-amber-200">
                            <strong>KPSS Belgesi:</strong> Hiç çalışmamış adaylardan bile KPSS giriş belgesi istenebilir. 1999 öncesi gibi istisnalar belgelenmelidir.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-emerald-600" />
                          1.3. Akademik İlerleme
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                          <li><strong>Yüksek Lisans (Master):</strong> Almanya'da 2 yıllık master yapmak kariyer için büyük avantaj sağlar.</li>
                          <li><strong>Doktora (Promotion):</strong> Alan değiştirenler veya tecrübeliler için pratik bir yoldur. Profesör kabulü (Betreuungszusage) gereklidir. Tez farklı dillerde yazılabilir.</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* II. Bölüm: Varış ve İlk Adımlar */}
                <section id="varis" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                      <Plane className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      2. Varış ve İlk Adımlar
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Home className="w-5 h-5 text-emerald-600" />
                          2.1. İkamet ve Jobcenter
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Eyalet Değişikliği</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            Oturum alanını genişletmek için: Aile bireyinin iş bulması, eğitim (üniversite/Ausbildung) veya 3 yıllık oturum süresinin dolması gerekir.
                          </p>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="jobcenter">
                            <AccordionTrigger>Jobcenter ve Finansal Destek (SGB II)</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li><strong>Hak Sahipliği:</strong> Çalışabilir durumda ve yardıma muhtaç olanlar (15-65 yaş) başvurabilir.</li>
                                <li><strong>Varlık Beyanı:</strong> Türkiye'deki mal varlığı ve emekli maaşı beyan edilmelidir.</li>
                                <li><strong>Bildirim:</strong> İş, eğitim, adres değişikliği veya gelir durumu değişikliği derhal bildirilmelidir. İhlallerde %30'dan %100'e kadar kesinti olabilir.</li>
                                <li><strong>Eğitim Paketi:</strong> Çocuklar için okul gezisi, kırtasiye (yıllık 100€) ve sosyal aktivite (aylık 10€) desteği vardır.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Baby className="w-5 h-5 text-emerald-600" />
                          2.2. Çocukların Uyum Süreci
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Mülteci öğrencilerin uyum sürecinde refakatçi desteği önemlidir. Refakatçi, kademeli olarak (15 dk, 30 dk artırarak) ayrılmalı ve çocuğa güven vermelidir.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* III. Bölüm: Mesleki Kariyer */}
                <section id="kariyer" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                      <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      3. Mesleki Kariyer ve İş Hayatı
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="w-5 h-5 text-emerald-600" />
                          3.1. Mesleki Tanınma (Anerkennung)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Kurumlar</h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                              <li><strong>ZAB:</strong> Akademik derece tespiti (Lisans/Master).</li>
                              <li><strong>Lehrkräfteakademie:</strong> Öğretmenlik mesleki yeterlilik tespiti (Eyalet bazlı).</li>
                            </ul>
                          </div>
                          <div className="border p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Eyalet Farkları</h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                              <li><strong>NRW:</strong> Genelde 1.5 yıl okuma/kredi tamamlama çıkar (Matematik, Almanca).</li>
                              <li><strong>Hamburg:</strong> 18 aylık uyum eğitimi veya seminerler.</li>
                              <li><strong>BW:</strong> 22 ECTS Grundbildung Deutsch istenir.</li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Strateji: Branş Tamamlama</h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            Sınıf öğretmenleri için bölüm tamamlama (özellikle Sachunterricht) iyi bir seçenektir. Anerkennung başvurusunda en çok kredi alınan iki dersle başvurulmalıdır.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-emerald-600" />
                          3.2. Alternatif Kariyer Yolları
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="lehrkrafte">
                            <AccordionTrigger>Lehrkräfte Programları (Mülteci Öğretmenler)</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                                Devlet okullarında çalışmanın en kestirme yoludur. Başarıyla bitirenler üniversite sertifikası alır ve iş bulma şansı %90 üzerindedir.
                              </p>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                <li><strong>Şartlar:</strong> 4 yıllık üniversite, B1 Almanca, 2 yıl tecrübe, mülteci statüsü.</li>
                                <li><strong>Mülakat:</strong> Tecrübe, pedagojik yaklaşım ve gönüllü çalışmalar sorulur.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="diger-roller">
                            <AccordionTrigger>Diğer Roller (Erzieher, MPT, Schulbegleiter)</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                                <li><strong>Erzieher:</strong> BW'de 12 ay stajla Erzieher olunabilir.</li>
                                <li><strong>MPT (Çok Profesyonelli Ekipler):</strong> Süresiz sözleşme, TVL-10 kadrosu, not verme yükü yok.</li>
                                <li><strong>Schulbegleiter:</strong> Dil seviyesi düşükken bile başlanabilir, sisteme giriş için fırsattır.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-emerald-600" />
                          3.3. Gönüllü Çalışma ve Pedagoji
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Gönüllü Çalışma (Ehrenamt)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Okullarda 8-9 ay gönüllü çalışmak veya gözlem (Hospitation) yapmak, referans ve dil gelişimi için kritiktir.
                            </p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sınıf Yönetimi</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Net kurallar, rutinler ve oyunlaştırma önemlidir. OSB ve DEHB'li öğrenciler için görsel destekler ve basit dil kullanılmalıdır.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="experiences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tecrübe Paylaşımları</CardTitle>
                    <CardDescription>
                      Sınıf öğretmenlerinin Almanya'daki gerçek deneyimleri.
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

              <TabsContent value="documents" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Yüklenen Dökümanlar</CardTitle>
                    <CardDescription>
                      Kullanıcılar tarafından paylaşılan dilekçe örnekleri, formlar ve rehberler.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {documents.length > 0 ? (
                      <div className="grid gap-4">
                        {documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border bg-slate-50 dark:bg-slate-900 dark:border-slate-800">
                            <div className="flex items-start gap-4">
                              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg border dark:border-slate-700">
                                <FileText className="w-8 h-8 text-emerald-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">{doc.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{doc.description}</p>
                                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                                  <span>{doc.file_type?.toUpperCase()}</span>
                                  <span>•</span>
                                  <span>{doc.file_size}</span>
                                  <span>•</span>
                                  <span>{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                                <UploadCloud className="w-4 h-4" />
                                İndir
                              </a>
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-4">Henüz yüklenmiş döküman bulunmuyor.</p>
                        <p className="text-sm mb-6">Elinizdeki faydalı dökümanları paylaşarak topluluğa katkıda bulunabilirsiniz.</p>
                        <UploadDocumentDialog professionSlug="sinif-ogretmenligi" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-emerald-600" />
                      I. Dil Yeterliliği ve Sertifikalar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-1-1">
                        <AccordionTrigger>Sınıf öğretmenliği için Almanya'da öğretmenlik yapabilme şartı olan Almanca seviyesi nedir?</AccordionTrigger>
                        <AccordionContent>
                          Genel olarak Almanca C1 sertifikası her zaman gereklidir. Ancak özellikle NRW eyaletinde öğretmenlik için mesleki tanıma (Anerkennung) başvurusu yapabilme şartı C2 Almanca sertifikası sahibi olmaktır. C2 belgesi yoksa diğer meseleler teferruat sayılır. Alternatif olarak, ilgili kurumun yapacağı sınavda başarılı olunması da gerekebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-2">
                        <AccordionTrigger>Lehrkräfte Programlarına (Mülteci Öğretmen Programları) katılmak için minimum dil seviyesi nedir?</AccordionTrigger>
                        <AccordionContent>
                          Almanca kursunu B1 düzeyinde başarıyla bitirmiş olmak ön koşuldur.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-3">
                        <AccordionTrigger>Pädagogische Fachkraft olarak çalışmak için dil şartı nedir?</AccordionTrigger>
                        <AccordionContent>
                          Sachsen Anhalt eyaletinde Pädagogische Fachkraft olabilmek için B2 dil sertifikası şartı vardır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-4">
                        <AccordionTrigger>Yabancı diplomaya sahip öğretmenler C1 Türkçe Sertifikası ile Türkçe Öğretmenliğine bir adım atabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet, bölümü Türkçe Öğretmenliği olmayan adayların, C1 Türkçe Sertifikası ile Türkçe Öğretmenliğine bir adım atabildiği belirtilmiştir. Ancak bu durum şimdilik NRW eyaleti için geçerlidir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-5">
                        <AccordionTrigger>C1 Türkçe Sertifikası hangi öncelik sırasına göre işe alım sağlar?</AccordionTrigger>
                        <AccordionContent>
                          Bu sertifika ile okullarda ders ücretli öğretmenlik (Honorararbeit) yapmak mümkündür. Öncelik sırası şöyledir: Almanya mezunu Türkçe Öğretmeni, TR mezunu Türkçe Öğretmeni, ve eğer yoksa C1 Sertifikalı öğretmen.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-6">
                        <AccordionTrigger>C1 Türkçe Sertifikası, öğretmenlik denkliğinde ikinci bir branş olarak değerlendiriliyor mu?</AccordionTrigger>
                        <AccordionContent>
                          Maalesef, C1 Türkçe Sertifikası ikinci branş olarak değerlendirilmiyor.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-7">
                        <AccordionTrigger>telc Türkçe C1 sınavının içeriği ve süreci nasıldır?</AccordionTrigger>
                        <AccordionContent>
                          Sınav dil bilgisi, anlama bilgisi, okuma bilgisi, dinleme ve konuşma becerilerini ölçer. Yazılı sınavdan sonra konuşma için 3-4 saat bir salonda beklemek zorunda kalınabilir. Sonuçlar 5-6 haftada belli olur.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-8">
                        <AccordionTrigger>telc Türkçe C1 sınavında başarılı olmak için kaç puan almak gerekir?</AccordionTrigger>
                        <AccordionContent>
                          Sınavı geçip sertifika alabilmek için, katılımcının en az 128 puana ulaşması gerekmektedir. Ayrıca hem sözlü (II. Bölüm) hem de yazılı sınavda (I. Bölüm) en yüksek puanın %60'ına ulaşılması gerekir (Sözlü: 29 puan, Yazılı: 99 puan).
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      II. Denklik (Anerkennung) Süreci ve Belgeler
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-2-1">
                        <AccordionTrigger>Mesleki denklik (Anerkennung) süreci ne işe yarar ve hangi kurumlar yetkilidir?</AccordionTrigger>
                        <AccordionContent>
                          Mesleki denklik, kendi ülkenizde yapılan mesleği burada yapıp yapamayacağınızı öğrenmek için diploma ve transkriptleri ilgili kurumlara gönderme işlemidir. Öğretmen kökenli herkesin mesleki tanınma için kendi eyaletlerinde bulunan Öğretmen Akademisi (Lehrkräfteakademie) gibi kurumlara başvurması gerekir (Örn: NRW’de Detmold, Hessen’de Gießen, BW’de Tübingen).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-2">
                        <AccordionTrigger>ZAB (Zentralstelle für ausländisches Bildungswesen) ne işe yarar?</AccordionTrigger>
                        <AccordionContent>
                          ZAB, üniversite mezunu olunduğunu tescil eden Kültür Bakanlığı kurumudur. ZAB, diplomaları mesleki açıdan değil, Lisans-Master-Doktora kariyeri açısından bir değerlendirme ile tescil eder.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-3">
                        <AccordionTrigger>Denklik için bir eyalete başvurduktan sonra başka bir eyalete aynı anda başvurulabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Bir eyalette başlatılan süreç kapatılmadan diğer tarafta başlatılmaz. Ancak, sonuç gelmediyse hemen diğer eyalete başvurmak tavsiye edilir, çünkü sonuç geldikten sonra kısıtlamalar olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-4">
                        <AccordionTrigger>Denklik sürecinde haksız yere ek belgeler istendiği düşünülürse ne yapılmalıdır?</AccordionTrigger>
                        <AccordionContent>
                          Bu durumda hakkın aranması ve hatta avukatla meseleyi mahkemeye taşımanın tek çözüm olabileceği düşünülmektedir. Avukat masrafları yüksek olsa da (maddi külfet), başarılınca bu paranın kısa sürede geri kazanılabileceği ve emsal teşkil edebileceği belirtilmiştir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-5">
                        <AccordionTrigger>Denklik başvurusunda kaç branş seçilmelidir?</AccordionTrigger>
                        <AccordionContent>
                          Anerkennung'a başvururken iki bölüm seçip öyle başvurmak gerekiyor. Üniversitede en çok kredi alınan iki dersle başvuru yapılır. Sınıf öğretmenleri genelde Sachunterricht (Hayat Bilgisi, Fen Bilgisi ve Trafik konuları karışımı) seçebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-6">
                        <AccordionTrigger>Denklik sürecinde alınan kredi açığı (Studium zorunluluğu) nasıl tamamlanır?</AccordionTrigger>
                        <AccordionContent>
                          Denklik sonucu, eksik kredileri (Kredit) tamamlama yoluyla gelir. Bölüm tamamlama, yeni bir bölüm okumak (Ausbildung) yerine daha mantıklı bir seçenektir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-7">
                        <AccordionTrigger>Kredi tamamlama sürecinde Hausarbeit (seminer çalışması) zorlayıcı mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Evet, bölüm başkanı Hausarbeit'ların (seminer çalışması/bitirme tezi) zorlayacağını, bu nedenle aynı dönemde iki tane alınmamasını tavsiye etmiştir. Hessen'de sınıfçılarda kredi sayısı az ise tek dönemde halledilebilse de, bu durum Hausarbeit zorluğu nedeniyle iki döneme yayılabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-8">
                        <AccordionTrigger>Türkiye'de hiç öğretmenlik tecrübesi olmayan bir sınıf öğretmeni hangi eyaletten denklik başvurusu yapması en mantıklı olandır?</AccordionTrigger>
                        <AccordionContent>
                          Yaş ilerlemesi ve bekleme süresi göz önüne alınarak, denklik alabilecek eyaletlere gitmek en iyi fikirdir. (Kaynaklar bu durum için kesin bir eyalet belirtmese de, BW'nin atanmış belgesi istediği gibi ek şartlar olduğu bilinmelidir).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-9">
                        <AccordionTrigger>Denklik süreci eyaletlere göre ne kadar sürebilir ve hangi sonuçlar gelebilir?</AccordionTrigger>
                        <AccordionContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                              <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-800">
                                <tr>
                                  <th className="px-4 py-2">Eyalet</th>
                                  <th className="px-4 py-2">Süreç Süresi</th>
                                  <th className="px-4 py-2">Beklenen Sonuçlar ve Ek Şartlar</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b dark:border-slate-700">
                                  <td className="px-4 py-2 font-medium">NRW (Detmold)</td>
                                  <td className="px-4 py-2">2 hafta (Otomatik cevap)</td>
                                  <td className="px-4 py-2">Genellikle 1,5 yıl (3 dönem) okuma şartı veya kredi açığı gelir. Matematik, Almanca veya formasyon gibi krediler istenebilir.</td>
                                </tr>
                                <tr className="border-b dark:border-slate-700">
                                  <td className="px-4 py-2 font-medium">Hessen</td>
                                  <td className="px-4 py-2">3.5 - 4 ay</td>
                                  <td className="px-4 py-2">Sınıfçılarda tamamlanacak kredi sayısı az olduğu için tek dönemde halledilebilir. Ancak Hausarbeit'lar nedeniyle iki döneme yayılabilir.</td>
                                </tr>
                                <tr className="border-b dark:border-slate-700">
                                  <td className="px-4 py-2 font-medium">Baden-Württemberg (BW)</td>
                                  <td className="px-4 py-2">1 ay - 7+ ay</td>
                                  <td className="px-4 py-2">Adaylık kaldırıldı belgesi eksikliği nedeniyle tam tanınma olmadığı cevabı gelebilir. KPSS sonucu yanında atanmış belgesi de istenir.</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-2 font-medium">Niedersachsen</td>
                                  <td className="px-4 py-2">Bilinmiyor</td>
                                  <td className="px-4 py-2">Denklik vermediği anlaşılan eyaletler arasındadır.</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-10">
                        <AccordionTrigger>Denklik başvurusu için hangi evrakları hazırlamalıyım?</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Tercüme ve Onay:</strong> Belgelerin tercümeleri yaptırılmalıdır. Tercümandan gelen nüshalarda, en üstte Almanca tercümesi ve altında diplomanın fotokopisi yer alır ve bu şekilde zımbalı olarak, Belediyede (Gemeinde), Diakoni'de ya da Büro'larda aslı gibidir onayı (Beglaubigung) yaptırılmalıdır.</li>
                            <li><strong>KPSS Belgesi:</strong> Türkiye'de hiç çalışılmamış olsa bile KPSS giriş belgesi istenir. (BW eyaleti atanmış belgesi de isteyebilir).</li>
                            <li><strong>Hizmet Dökümü:</strong> Milli Eğitim Bakanlığı'nda (MEB) çalışılmışsa e-devletten ayrıntılı "Hitap hizmet dökümü" (Hizmet cetveli) indirilmelidir.</li>
                            <li><strong>Adaylık Kaldırılma Belgesi:</strong> Bu belge, devlette çalışanlar için KPSS ve adaylığın halledildiğini gösteren en net kanıttır. Belge, en son çalışılan yerin İl veya İlçe Milli Eğitim Müdürlüğü'nde (MEB) bulunmaktadır ve oradan istenmelidir. Hessen eyaleti bu belge olmadan denklik vermemektedir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-11">
                        <AccordionTrigger>Hizmet dökümünde stajyerliğin kaldırıldığı yazmazsa ne yapmalıyım?</AccordionTrigger>
                        <AccordionContent>
                          Hitap hizmet dökümü belgesinde stajyerliğin yapılıp yapılmadığı yazmaz. Ancak, seneler için bu belgeyi sunan zaten stajı halletmiş olmalıdır. Eğer kurum bu belgeyi kabul etmezse, kurumun bu belgenin zaten devlette çalışanların adaylığının ve KPSS'nin halledildiğini gösteren en net kanıt olduğunu bilmediği varsayılarak, açıklayıcı bir şekilde anlatılması gerekir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-12">
                        <AccordionTrigger>Adaylık kaldırılma belgesi deprem gibi sebeplerle temin edilemezse ne yapılmalıdır?</AccordionTrigger>
                        <AccordionContent>
                          Durumu anlatan ve adaylığın kaldırıldığını ifade eden başka bir resmi belge talep edilebilir (Örn: Deprem nedeniyle evrakların enkaz altında kalması durumunda resmi yazı istenmesi).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-13">
                        <AccordionTrigger>Lisans Diploması kayıp ise yerine ne geçer?</AccordionTrigger>
                        <AccordionContent>
                          Mezun olunan liseye dilekçe ile başvurarak "DİPLOMA KAYIT ÖRNEĞİ" düzenlenebilir. Dilekçe bir yakın (anne, baba, kardeş vs.) aracılığıyla, arzu edilirse görüntülü konuşma ile güven problemi giderilerek alınabilir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-emerald-600" />
                      III. Kariyer ve İş Olanakları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-3-1">
                        <AccordionTrigger>Tam denklik alınana kadar sınıf öğretmenleri hangi pozisyonlarda çalışabilirler?</AccordionTrigger>
                        <AccordionContent>
                          Okullarda Ders Ücretli Öğretmen (Honorararbeit), Vekâleten Öğretmen (Vertretungslehrer), MPT (Multiprofessionelle Teams), OGS (Okul Öncesi Günlük Bakım) çalışanı veya Alltagshelferin (Günlük Yaşam Yardımcısı) olarak çalışılabilir. Ayrıca Pädagogische Fachkraft veya Eğitici (Erzieher/in) olarak da çalışılabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-2">
                        <AccordionTrigger>Pädagogische Fachkraft sertifikasını kimler alabilir?</AccordionTrigger>
                        <AccordionContent>
                          Sadece sınıf öğretmenleri değil, diğer branş öğretmenleri de alabilirler.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-3">
                        <AccordionTrigger>Ders ücretli öğretmenlik (Honorararbeit) nedir?</AccordionTrigger>
                        <AccordionContent>
                          En basit başlanabilecek ve en az ücretle çalışılan öğretmenlik türüdür. Ücret, ders başı bir ücrettir ve geçim sağlayacak miktarda olmaz. Ancak bu tecrübe, sözleşmeli öğretmenliğin yolunu açabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-4">
                        <AccordionTrigger>Alltagshelferin (Günlük Yaşam Yardımcısı) olarak hangi şartlarda çalışmaya başlanabilir ve maaş beklentisi nedir?</AccordionTrigger>
                        <AccordionContent>
                          Ortalamanın biraz altı dil seviyesi ile dahi kampın anaokulunda çalışılabilir. İşe başlarken "Çocuklarla çalışacak eğitimcilere yönelik ilkyardım sertifikası" alınması gerekir. Bu pozisyonlarda maaş 2800 - 3140 Euro civarındadır. Dil geliştirilirse Vertretungs Lehrerin (Vekaleten Öğretmen) olarak çalışılabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-5">
                        <AccordionTrigger>MPT (Multiprofessionelle Teams) kadrosunun avantajları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          MPT birimleri, mülteci ve uluslararası öğrencilerin entegrasyonu için kurulmuştur. Avantajları arasında süresiz sözleşme (unbefristet), TVL-10 kadrosu, uzun tatil, not verme ve ders ziyareti olmaması ve dil gelişimine katkısı sayılabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-6">
                        <AccordionTrigger>Sınıf öğretmenleri haftalık kaç saat çalışır ve net maaş beklentisi nedir?</AccordionTrigger>
                        <AccordionContent>
                          Sınıf öğretmenleri haftalık 28 saat çalışır. Tam denklik alındıktan sonra net olarak 3500 Euro bandında başlanır. (Bir kaynakta 25 saat olduğu da belirtilmiştir).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-7">
                        <AccordionTrigger>Erzieher (Eğitimci) olarak çalışan biri ne kadar brüt maaş alır ve çalışma saati nedir?</AccordionTrigger>
                        <AccordionContent>
                          3 senelik Erzieher brüt 3350 Euro civarı alırken, haftalık 40 saat çalışır. Bu meslek, haftalık 40 saatlik yoğun mesai nedeniyle zorlayıcı olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-8">
                        <AccordionTrigger>Öğretmenlik mesleğinde memur (Beamte) ve sözleşmeli (Vertrag) statüleri arasındaki farklar nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Memur (Beamte):</strong> Maaş ve emeklilik hakları biraz daha iyidir, işten atılmaları çok zor ve özel sağlık sigortası yaparlar. Ancak yabancılar için memur olmak imkânsızdır, sadece Alman vatandaşları, merkezi sınavı kazanmış ve stajı (Refendariat) bitirmiş kişiler için mümkündür.</li>
                            <li><strong>Süresiz Sözleşmeli (Unbefristet):</strong> Türkiye'deki memurluk gibidir; özlük hakları aynıdır. Memur olandan sadece vergi kesintisi olmadığı için maaşı biraz daha azdır. Tayin hakkı vardır.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-9">
                        <AccordionTrigger>İlk işe başlarken maddiyat mı yoksa tecrübe kazanmak mı daha önemlidir?</AccordionTrigger>
                        <AccordionContent>
                          İlk etapta maddiyatın önemli olmaması gerekir. Önemli olan tecrübe kazanmak ve CV'de bir yerde çalışıyor gözükmektir. Hatta gerekirse ilk işyerinde gönüllü çalışılması (Ehrenamtlich) tavsiye edilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-10">
                        <AccordionTrigger>Gönüllü çalışma (Ehrenamt) deneyiminin faydaları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Gönüllü çalışma, işe girişte olumlu etki yapar, çevre edinme ve dili geliştirmede faydası olur. Çalışılan yerden alınan referans belgesi (Zeugnis), başka yerlere başvururken etkilidir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-11">
                        <AccordionTrigger>Gönüllü çalışma belgesinin (Zeugnis) içeriği nasıldır?</AccordionTrigger>
                        <AccordionContent>
                          Belge, A4 kağıdı formatında olup, içeriğinde "okulumuzda şu dönemler arasında gönüllü olarak çalışmıştır" yazar.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-12">
                        <AccordionTrigger>Lehrkräfte Programlarına (Mülteci Öğretmen Programları) başvuru şartları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Dört yıllık üniversite diploması (sınıf öğretmenlerinin, üniversite bünyesindeki derslerden birini verebileceklerine dair diplomalarında bir ibare varsa başvuruları kabul edilebilir).</li>
                            <li>Almanca kursunu B1 düzeyinde başarıyla bitirmiş olmak.</li>
                            <li>En az 2 yıl öğretmenlik yapmış olmak.</li>
                            <li>Mülteci statüsünde olmak ve oturum almış olmak.</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-13">
                        <AccordionTrigger>Lehrkräfte Programı mülakatında (Vorstellungsgespräch) hangi sorular sorulur?</AccordionTrigger>
                        <AccordionContent>
                          Kendini tanıtma, tecrübe (hangi yaş grubuna ders anlattığı), pedagojik enformasyon (olağan dışı durumlarda davranış), branş bilgisi ve gönüllü çalışmalar (Ehrenamtlich) sorulur.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-14">
                        <AccordionTrigger>Mülakat sırasında olağan dışı pedagojik durumlara nasıl cevaplar verilmelidir?</AccordionTrigger>
                        <AccordionContent>
                          Kahraman olmaya kalkmamak gerekir. Yapılması gerekenler şunlardır: İdareye haber verme, sosyal pedagog ile görüşme, Veli ile görüşme ve diğer ders öğretmenleri ile işbirliği yapmak.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-15">
                        <AccordionTrigger>Okulda dersleri gözlemlemek (Hospitation) nasıl başlatılır?</AccordionTrigger>
                        <AccordionContent>
                          Okul müdürüne kısa bir mail ile kendinizi tanıtıp dersleri gözlemlemek (Beobachtung) istediğinizi belirtmek ve yüz yüze görüşme (Termin) talep etmek önerilir. Gözlem sırasında ders anlatımı %99 yoktur, amaç sistemi ve öğrenci-öğretmen ilişkilerini öğrenmektir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-emerald-600" />
                      IV. Sınıf Yönetimi ve Pedagojik Yaklaşım
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-4-1">
                        <AccordionTrigger>Sınıf yönetimi ve disiplin problemleriyle başa çıkmak için hangi yöntemler önerilir?</AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Davranış problemi olan öğrenciler, dikkat çekmek için yapıyorsa, olabildiğince görmezden gelinmeli ve ders dışında bireysel olarak uyarılmalıdır.</li>
                            <li>Sınıfta net kurallar ve rutinler oluşturulmalıdır (güvenlik ve öngörülebilirlik sağlar).</li>
                            <li>Derslere kışkırtma ve şaşırtma silahlarıyla zenginleştirilmiş girişler yapılmalıdır; çocuk merak etmelidir.</li>
                            <li>Oyunlaştırma ve drama çok değerlidir.</li>
                            <li>Ses seviyesi yükseldiğinde susun demek yerine, ortak bir şifre (örn. "dat diri dad dad") veya asılı ses seviyeleri şablonunu göstermek etkili olabilir.</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-2">
                        <AccordionTrigger>Disiplini sağlamak için kullanılan ceza/ödül sistemleri var mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Almanyadaki çoğu ilkokulda smile (gülümseme) şeklinde bir sistem olduğu sanılmaktadır. 3 kez kırmızı alanın ailesi aranır ve davranışlar kontrol edilir. Öğrenci kötü not aldıysa ailesine göstermemek isteyebilir, bu nedenle öğretmen bu durumu takip etmelidir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-3">
                        <AccordionTrigger>Otizm Spektrum Bozukluğu (OSB) olan öğrencilere sınıfta nasıl destek sağlanmalıdır?</AccordionTrigger>
                        <AccordionContent>
                          Öğretmenler net yapılar ve rutinler, görsel destekler (günlük programlar, resimli kartlar), basit ve net dil kullanmalıdır. Duyusal aşırı yüklenmeyi en aza indiren bir ortam yaratılmalı ve öğrencinin sakinleşmesi için sessiz geri çekilme alanları sağlanmalıdır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-4">
                        <AccordionTrigger>Dikkat Eksikliği ve Hiperaktivite Bozukluğu (DEHB) olan öğrencilere sınıfta nasıl destek sağlanmalıdır?</AccordionTrigger>
                        <AccordionContent>
                          Net kurallar ve rutinler, görsel zaman çizelgeleri kullanılmalı. Talimatlar kısa ve net cümlelerle verilmeli, büyük görevler küçük parçalara bölünmelidir. Öğrencinin öğretmene yakın ve dikkat dağıtıcı unsurlardan uzak bir yere oturtulması önerilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-5">
                        <AccordionTrigger>Bir veli ile çocuğun notları hakkında tartışma yaşanırsa, nasıl bir iletişim stratejisi izlenmelidir?</AccordionTrigger>
                        <AccordionContent>
                          Sakin kalınmalı ve dinlenmeli. Empati gösterilmeli. Durum objektif bir şekilde, somut örneklerle (güçlü ve zayıf yönler) açıklanmalı. Pozitif ve çözüm odaklı bir tutum sergilenmeli (ek çalışma materyalleri veya evde çalışma ipuçları) ve ortak bir çözüm bulunmaya çalışılmalıdır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-6">
                        <AccordionTrigger>Anneler Günü gibi etkinlikler için hangi aktiviteler yapılabilir?</AccordionTrigger>
                        <AccordionContent>
                          Çocuklara renkli kağıtlara çiçek yaptırılabilir. Origami yapılabilir, Tanz AG (Dans Çalışma Grubu) veya Allerlei (çeşitli oyunları oynama) AG'leri düzenlenebilir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                      V. Job Center ve Sosyal Haklar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-5-1">
                        <AccordionTrigger>Jobcenter yardımları (İşsizlik Parası II - ALG II) kimlere verilir?</AccordionTrigger>
                        <AccordionContent>
                          Federal Almanya Cumhuriyeti içinde ikamet etmeleri şartı ile, tüm kazanç sağlayabilir, yardıma muhtaç, 15 ile 65 yaş altı kişiler hak sahibidirler. Yabancılara ilave olarak bir iş yapma izni verilmiş olmalı veya izin verilebilir olmalıdır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-2">
                        <AccordionTrigger>İşsiz olmasam bile İşsizlik Parası II (ALG II) alabilir miyim?</AccordionTrigger>
                        <AccordionContent>
                          Evet. Bir işte çalışıyorsanız ve bu işten elde ettiğiniz gelir kendinizin ve ailenizin geçimini sağlamaya yetmiyorsa, İşsizlik Parası II alabilirsiniz. Yani işsiz olmak şart değildir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-3">
                        <AccordionTrigger>Yardım almadan önce kendi gelir kaynaklarımı kullanmak zorunda mıyım?</AccordionTrigger>
                        <AccordionContent>
                          Evet, sadece yardıma muhtaç kimseler yardım alabilirler. Maddi yardım almadan önce kendi gelir kaynaklarınızı kullanmak zorundasınız.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-4">
                        <AccordionTrigger>Hangi gelir türleri Jobcenter yardım hesaplamasında dikkate alınır?</AccordionTrigger>
                        <AccordionContent>
                          İş alan olarak ve bağımsız olarak kendi işinde çalışarak elde edilen gelirler, ücret yerine geçen ödemeler (işsizlik parası, hastalık parası), kira gelirleri, nafaka ödemeleri, çocuk parası, faiz gelirleri ve rant aylıkları gelir sayılır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-5">
                        <AccordionTrigger>Mal varlığından hangi miktarlar muaf tutulur?</AccordionTrigger>
                        <AccordionContent>
                          Yaş başına 150 Euro tutarında temel muaf meblağ. Zorunlu alışverişler için 750 Euro tutarında muaf meblağ. Uygun ev eşyaları, uygun bir taşıt aracı ve kendinin ikamet ettiği uygun bir daire veya arsalı ev mal varlığı olarak dikkate alınmaz.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-6">
                        <AccordionTrigger>Jobcenter'a hangi durum değişikliklerini hemen bildirmeliyim?</AccordionTrigger>
                        <AccordionContent>
                          Aşağıdaki haller derhal haber verilmek zorundadır: Bir işe başlanması (bağımsız veya aile yardımcısı olarak da), yakında bir eğitime veya yüksek öğrenime başlama niyeti, adresin değişmesi veya taşınmak istenmesi, evlenmek, ayrılmak veya partnerden ayrılmak, veya gelir, varlık durumunun değişmesi.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-7">
                        <AccordionTrigger>Jobcenter'a bilgi vermezsem ne tür yaptırımlarla karşılaşırım?</AccordionTrigger>
                        <AccordionContent>
                          Hukuki sonuçlara dair bilgilendirilmiş olmanıza rağmen yükümlülük ihlali yaparsanız, yaptırımlar söz konusu olur. İlk ihlalde İşsizlik Parası II miktarı üç aylık bir süre için, kural olarak kabul edilen ihtiyacın yüzde 30'u oranında düşürülür. Tekrar eden her yükümlülük ihlalinde İşsizlik Parası II yüzde 100 kesilir (yani ödeme tamamen kesilir) ve hastalık sigortası ve bakım sigortası güvencesi de ortadan kalkar.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-8">
                        <AccordionTrigger>Yükümlülük ihlali durumunda yaptırım uygulanmamasını sağlayan önemli sebepler nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Davranış için önemli bir sebep varsa yaptırım uygulanmaz. Önemli bir sebep, örneğin, bir işin yapılması, üç yaşın altındaki bir çocuğun yetiştirilmesini tehlikeye soktuğunda veya aile üyelerinden birinin bakımı, bir işin icrası ile uygun düşmüyorsa ve bakım başka şekilde temin edilemiyorsa söz konusudur.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-9">
                        <AccordionTrigger>Jobcenter yardımı alırken yeni bir eve taşınırsam ne yapmalıyım?</AccordionTrigger>
                        <AccordionContent>
                          Yeni konuta ilişkin sözleşmeyi yapmadan önce, masrafları üstlenme sözünü (Zusage) Jobcenter'dan almak zorunludur. Bu söz alınmadan taşınılırsa, evin ilk donanımı (Erstausstattung) için gerekli ödemeler üstlenilmez.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-10">
                        <AccordionTrigger>Jobcenter'a il dışına çıkış veya şehir değişikliğini bildirmek zorunda mıyım?</AccordionTrigger>
                        <AccordionContent>
                          İzne gitmek (yurt içi veya yurt dışı olması fark etmez) için daima önceden yetkili Jobcenter'in olurunu almak gerekir. Oturulan yeri izinsiz terk, İşsizlik Parası II’nin kesilmesini ve yapılan ödemenin geri talep edilmesini gerektirir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-11">
                        <AccordionTrigger>Jobcenter yardımı alan öğrencilerin Eğitim Paketi kapsamında alabileceği yardımlar nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Eğitim Paketi kapsamında; günlük okul gezileri ve sınıf gezileri masrafları, kişisel okul ihtiyaçları (yılda 100 Euro), uygun eğitim desteği, birlikte öğle yemekleri için nakit yardım (ebeveyn payı günde 1 Euro) ve 18 yaşın altındaki çocuklar ve gençler için sosyal ve kültürel yaşama katılma (ayda 10 Euro) yardımları yapılır.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                      VI. Akademik ve Yaşam
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-6-1">
                        <AccordionTrigger>Başka bir eyalete taşınabilmek için oturum alanını genişletme yolları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Aile bireylerinden birisi iş bulur ve gideceği eyalete sorunsuz taşınır.</li>
                            <li>Üniversite okumak veya Ausbildung (meslek eğitimi) yapmak gibi eğitim sebepleri ile taşınılabilir.</li>
                            <li>Üç yıllık oturum bitmişse, artık Almanya'da istenilen yere taşınılabilir (Ausländeramt ile yazışılabilir).</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-2">
                        <AccordionTrigger>Yüksek Lisans (Master) veya Doktora (Promotion) yapmak kariyer hedeflerini nasıl etkiler?</AccordionTrigger>
                        <AccordionContent>
                          Almanya'da alınan yüksek lisans diploması kişiyi çok farklı bir konuma getirecektir. Doktora yapmak, alan değiştiren veya mesleki tecrübesi olanlar için en pratik yollardan biridir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-3">
                        <AccordionTrigger>Almanya'da doktora (Promotion) yapmaya başlama şartları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Master (Yüksek Lisans) yapmış olmak ve bir profesörün doktora için kabul yazısı (Betreuungszusage) vermesi temel iki kriterdir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-4">
                        <AccordionTrigger>Çocukların yeni ortama alışma sürecinde yanında refakatçi olması olumlu mu, olumsuz mu etkiler?</AccordionTrigger>
                        <AccordionContent>
                          Çocuğun tedirginliği varsa refakatçi olabilir, ancak kısa bir süreliğine eşlik edileceği baştan söylenmelidir. Refakatçi belli mesafede beklemeli ve sosyalleşmeyi engellememelidir. Çocuk kendini güvende hissedince kısa sürede rahatlar.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-5">
                        <AccordionTrigger>Gözlem (Hospitation) yapmanın okul müdürleri için anlamı nedir?</AccordionTrigger>
                        <AccordionContent>
                          Okul müdürlerinin çok yetki ve etki alanları vardır. Bir müdürün sizinle çalışmak istemesi veya size yardım etmek istemesi durumunda, vekaleten, sözleşmeli veya ücretli ders verdirebilir, hospitation yaptırabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-6">
                        <AccordionTrigger>Türkiye'den gelen sözel alanda tecrübeli kişiler için özel sektörde iş bulmak kolay mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Sözel alanlarda çalışmış, özel sektör tecrübesi olmayan kişiler için kamu (öğretmenlik, MPT vb.) çok mantıklıdır. Bilişim, tıp, sayısal alanlarda iş bulmak daha kolaydır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-7">
                        <AccordionTrigger>İş başvurusunda kılık kıyafete nasıl dikkat edilmelidir?</AccordionTrigger>
                        <AccordionContent>
                          Giyim çok fazla abartıya kaçmadan, kendinizi rahat ve iyi hissettiğiniz şekilde giyinebilirsiniz. Resmi giyinmenin (kravatlı, ceketli) bir zararı yoktur, ancak bankacı gibi giyinmek gerekmez. Görüşmeye saatinden 15 dakika önce gitmek, heyecanlı ve panik halinde girmemek için önemlidir.
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
            <Card className="bg-emerald-900 text-white border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Topluluk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-emerald-100">
                  Bu rehber, Almanya'daki Türk sınıf öğretmenleri topluluğunun tecrübeleriyle oluşturulmuştur.
                </p>
                <Button className="w-full bg-white text-emerald-900 hover:bg-emerald-50" asChild>
                  <Link href="#tecrube-paylas">Sen de Katıl</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hızlı Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="https://www.kmk.org/zab/central-office-for-foreign-education.html" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  ZAB (Denklik)
                </Link>
                <Link href="https://www.anerkennung-in-deutschland.de/" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Anerkennung in Deutschland
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog professionSlug="sinif-ogretmenligi" defaultProfessionName="Sınıf Öğretmenliği" />
      <UploadDocumentDialog professionSlug="sinif-ogretmenligi" />
    </div>
  );
}
