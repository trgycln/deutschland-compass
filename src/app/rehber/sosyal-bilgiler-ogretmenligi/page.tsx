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
  School,
  Search,
  MessageSquare,
  AlertCircle,
  Users,
  HelpCircle,
  Info,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { DocumentSection } from '@/components/document-section';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SosyalBilgilerPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Sosyal Bilgiler%,profession.ilike.%Sozialkunde%,profession.ilike.%Politik%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-cyan-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="secondary" className="bg-cyan-100 text-cyan-900 hover:bg-cyan-200">
                  Eğitim & Sosyal
                </Badge>
                <Badge variant="outline" className="text-cyan-100 border-cyan-400">
                  Yüksek Talep
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Almanya'da Sosyal Bilgiler Öğretmenliği
              </h1>
              <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
                Politik, Sozialkunde ve Gemeinschaftskunde alanlarında öğretmenlik kariyeri, denklik süreçleri ve alternatif iş fırsatları rehberi.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-cyan-900 hover:bg-cyan-50" asChild>
                  <Link href="#hazirlik">Hemen Başla</Link>
                </Button>
                <Button size="lg" className="bg-cyan-600 text-white hover:bg-cyan-500 border-none" asChild>
                  <Link href="#tecrube-paylas">Tecrübeni Paylaş</Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-8 md:mt-0">
              <ProfessionVideoPlayer professionSlug="sosyal-bilgiler-ogretmenligi" variant="hero" />
            </div>
          </div>
        </div>
      </div>

      {/* Telegram Groups Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://t.me/+mmWG2yO-r6wwODgy" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-1">Sosyal Bilgiler Öğretmenliği</div>
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
      {/* Telegram Groups Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://t.me/+mmWG2yO-r6wwODgy" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-1">Sosyal Bilgiler Öğretmenliği</div>
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
                
                {/* 1. Bölüm: Hazırlık ve Denklik */}
                <section id="hazirlik" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl">
                      <Languages className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      I. Hazırlık ve Denklik
                    </h2>
                  </div>

                  <Card className="mb-8 border-l-4 border-l-cyan-500">
                    <CardContent className="pt-6">
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        Almanya'daki kariyer yolculuğunun ilk ve en önemli adımı dil yeterliliğidir. Mesleği daha sonra düşünmek kaydıyla, öncelikle <strong>C1 seviyesine</strong> gelinceye kadar dil konusuna yoğunlaşılması tavsiye edilmektedir.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-cyan-600" />
                          Dil Yeterliliği ve Sertifikalar
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="gereklilikler">
                            <AccordionTrigger>Gereklilikler ve Sertifikalar</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <p><strong>Gereklilikler:</strong> Denklik (Anerkennung) işlemlerinde öğretmenlik için C1 seviyesi genellikle gereklidir. Ancak, bazı alternatif mesleklere B2 sertifikası ile başlanabilir.</p>
                              <p><strong>Sertifika Türleri (Hessen Örneği):</strong> Öğretmenlik denkliği için kabul edilen sertifikalar:</p>
                              <ul className="list-disc list-inside pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                                <li>DSH-2, DSH-3</li>
                                <li>TestDaF (en az 4/4/4/4)</li>
                                <li>Telc C1 Hochschule</li>
                                <li>Telc C2</li>
                                <li>DSD II</li>
                                <li>Goethe-Zertifikat C2</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="kurslar">
                            <AccordionTrigger>Dil Kursları ve Destekler</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <p><strong>BAMF Kursları:</strong> İkametgah alındıktan sonra Jobcenter veya Agentur für Arbeit aracılığıyla BAMF (Federal Göç ve Mülteciler Dairesi) onaylı entegrasyon kurslarına (Integrationskurs) katılabilirsiniz. Bu kurslar B1 seviyesine kadar ücretsizdir.</p>
                              <p><strong>Berufssprachkurse (Mesleki Dil Kursları):</strong> B1 sonrası B2 ve C1 seviyeleri için DeuFöV (Deutschsprachförderverordnung) kapsamındaki mesleki dil kurslarına katılabilirsiniz. Bu kurslar da genellikle Jobcenter tarafından finanse edilir.</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-cyan-600" />
                          Gerekli Belgeler ve Denklik Süreci
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Temel Belgeler</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Pasaport ve Oturum Kartı</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Özgeçmiş (Lebenslauf)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Diploma ve Transkriptler</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Dil Sertifikaları</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Hizmet Dökümü (SGK)</li>
                            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Formasyon Belgesi</li>
                          </ul>
                        </div>
                        
                        <div className="border-l-4 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r-lg">
                          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">Önemli Not</h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            Belgelerin yeminli tercüman tarafından Almancaya çevrilmesi ve noter tasdikli olması gerekmektedir. Eyaletlere göre istenen belgeler değişiklik gösterebilir.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 2. Bölüm: Kariyer Yolları */}
                <section id="kariyer" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      II. Kariyer Yolları
                    </h2>
                  </div>

                  <Tabs defaultValue="ogretmenlik" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto">
                      <TabsTrigger value="ogretmenlik" className="py-2">Doğrudan Öğretmenlik</TabsTrigger>
                      <TabsTrigger value="yangiris" className="py-2">Yan Giriş (Seiteneinstieg)</TabsTrigger>
                      <TabsTrigger value="sosyalpedagoji" className="py-2">Sosyal Pedagoji</TabsTrigger>
                    </TabsList>

                    <TabsContent value="ogretmenlik">
                      <Card>
                        <CardHeader>
                          <CardTitle>Doğrudan Öğretmenlik (Direkteinstieg)</CardTitle>
                          <CardDescription>Tam denklik alanlar için standart yol.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-400">
                            Eğer diplomanız ve formasyonunuz tam olarak tanınırsa (Anerkennung), doğrudan öğretmen olarak başvurabilirsiniz. Genellikle 2. Devlet Sınavı'na (2. Staatsexamen) denk sayılan bir uyum süreci (Anpassungslehrgang) veya sınav gerekebilir.
                          </p>
                          <div className="grid gap-4 md:grid-cols-2 mt-4">
                            <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                              <h4 className="font-semibold mb-2">Avantajlar</h4>
                              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• Memuriyet (Verbeamtung) şansı</li>
                                <li>• Yüksek maaş ve sosyal haklar</li>
                                <li>• Tam yetkili öğretmen statüsü</li>
                              </ul>
                            </div>
                            <div className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-900">
                              <h4 className="font-semibold mb-2">Zorluklar</h4>
                              <ul className="text-sm space-y-1 text-slate-600 dark:text-slate-400">
                                <li>• C2 seviyesine yakın Almanca beklentisi</li>
                                <li>• Uzun denklik süreci</li>
                                <li>• İki branş gerekliliği (bazı eyaletlerde)</li>
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="yangiris">
                      <Card>
                        <CardHeader>
                          <CardTitle>Yan Giriş (Seiteneinstieg)</CardTitle>
                          <CardDescription>Öğretmen açığını kapatmak için sunulan hızlandırılmış yol.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-400">
                            Öğretmenlik formasyonu olmayan veya denkliği tam olmayanlar için bir seçenektir. Genellikle "Mangelfach" (ihtiyaç duyulan branş) olan alanlarda daha kolaydır. Sosyal Bilgiler (Politik/Wirtschaft) bazı eyaletlerde ihtiyaç duyulan branşlardandır.
                          </p>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">MPT (Multiprofessionelle Teams)</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Çok profesyonelli ekiplerde yer alarak, öğretmenlere destek olabilirsiniz. Bu pozisyonlar için tam öğretmenlik denkliği aranmayabilir ve giriş daha kolay olabilir.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sosyalpedagoji">
                      <Card>
                        <CardHeader>
                          <CardTitle>Sosyal Pedagoji ve Alternatifler</CardTitle>
                          <CardDescription>Öğretmenlik dışındaki eğitim ve sosyal hizmet alanları.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="space-y-4">
                            <div className="border-b pb-4">
                              <h4 className="font-bold mb-2">1. Sozialpädagogische Assistentin / Kinderpflegerin</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Genellikle 2 yıllık bir eğitim (Ausbildung) gerektirir. Kreşlerde ve anaokullarında yardımcı personel olarak çalışılır. Giriş seviyesi için uygundur.
                              </p>
                            </div>
                            <div className="border-b pb-4">
                              <h4 className="font-bold mb-2">2. Sozialarbeiter/in / Sozialpädagoge/in</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Üniversite eğitimi (Bachelor) gerektirir. Gençlik merkezleri, aile danışmanlığı, mülteci yardımı gibi alanlarda çalışılır. Sosyal Bilgiler mezunları için ders saydırma yoluyla geçiş mümkün olabilir.
                              </p>
                            </div>
                            <div className="border-b pb-4">
                              <h4 className="font-bold mb-2">3. Erzieher/in (Eğitmen)</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Kreş, anaokulu ve gençlik merkezlerinde çalışır. 3 yıllık Ausbildung veya üniversite mezunları için hızlandırılmış programlar mevcuttur.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </section>

                {/* 3. Bölüm: Başvuru ve Mülakat */}
                <section id="basvuru" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      III. Başvuru ve Mülakat
                    </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">İş Arama Kanalları</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Link href="https://www.schulministerium.nrw/biopo/stellenmarkt/lois" target="_blank" className="block p-3 border rounded hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="font-bold text-cyan-700">LOIS (NRW)</div>
                          <div className="text-xs text-slate-500">Kalıcı istihdam ve kadrolar</div>
                        </Link>
                        <Link href="https://www.verena.nrw.de/" target="_blank" className="block p-3 border rounded hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="font-bold text-cyan-700">VERENA (NRW)</div>
                          <div className="text-xs text-slate-500">Vekil öğretmenlik (Vertretung)</div>
                        </Link>
                        <Link href="https://www.lehrer-online-bw.de/" target="_blank" className="block p-3 border rounded hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="font-bold text-cyan-700">Lehrer Online (BW)</div>
                          <div className="text-xs text-slate-500">Baden-Württemberg iş ilanları</div>
                        </Link>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Mülakat İpuçları</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">Okul sistemi ve eyalet müfredatı hakkında bilgi sahibi olun.</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">Pedagojik yaklaşımınızı ve sınıf yönetimi stratejilerinizi somut örneklerle anlatın.</p>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <p className="text-sm text-slate-600 dark:text-slate-400">Almanca dil beceriniz konusunda dürüst olun ve gelişime açık olduğunuzu belirtin.</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 4. Bölüm: Sıkça Sorulan Sorular */}
                <section id="sss" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <HelpCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      IV. Sıkça Sorulan Sorular
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {/* I. Mesleki Karşılık ve Branşlar */}
                        <AccordionItem value="sss-1-1">
                          <AccordionTrigger className="text-left">Sosyal Bilgiler Öğretmenliği'nin Almanya'daki tam karşılığı nedir?</AccordionTrigger>
                          <AccordionContent>
                            Almanya'da "Sosyal Bilgiler" tek bir ders olarak değil, eyaletlere göre farklı isimlerle (Politik, Sozialkunde, Gemeinschaftskunde, Wirtschaft-Politik) anılan dersler bütünüdür. Türkiye'deki Sosyal Bilgiler öğretmenliği, Almanya'da genellikle Tarih, Coğrafya ve Politika derslerini kapsayan bir alan olarak değerlendirilebilir, ancak tam denklik için genellikle iki branş (örneğin Tarih ve Politika) gereklidir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-2">
                          <AccordionTrigger className="text-left">Hangi branşlarda öğretmenlik yapabilirim?</AccordionTrigger>
                          <AccordionContent>
                            Genellikle Politik (Siyaset), Geschichte (Tarih), Erdkunde/Geographie (Coğrafya) ve Wirtschaft (Ekonomi) derslerine girebilirsiniz. Ancak bu, eyaletin denklik biriminin transkriptinizi inceleyip hangi derslere onay vereceğine bağlıdır.
                          </AccordionContent>
                        </AccordionItem>

                        {/* II. Denklik ve Tanınma */}
                        <AccordionItem value="sss-2-1">
                          <AccordionTrigger className="text-left">Diplomamın denkliği var mı (Anabin)?</AccordionTrigger>
                          <AccordionContent>
                            Anabin veritabanında üniversitenizin ve bölümünüzün "H+" olarak işaretlenmiş olması, diplomanızın tanındığı anlamına gelir. Ancak öğretmenlik için bu sadece akademik bir tanınmadır; öğretmenlik yapabilme yetkisi (Lehramtsbefähigung) için eyalet eğitim bakanlıklarına başvurmanız gerekir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-2">
                          <AccordionTrigger className="text-left">Formasyon belgesi (Pedagojik Formasyon) geçerli mi?</AccordionTrigger>
                          <AccordionContent>
                            Evet, Türkiye'den alınan formasyon belgeleri genellikle tanınır ancak Almanya'daki "Referendariat" (stajyer öğretmenlik) sürecine tam olarak denk sayılmayabilir. Genellikle bir uyum semineri veya staj yapmanız istenebilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* III. Dil Şartı */}
                        <AccordionItem value="sss-3-1">
                          <AccordionTrigger className="text-left">Hangi seviyede Almanca gereklidir?</AccordionTrigger>
                          <AccordionContent>
                            Öğretmenlik (Lehrer) yapabilmek için genellikle C1 veya C2 seviyesinde Almanca sertifikası (Goethe, Telc, TestDaF) istenir. Ancak yardımcı öğretmenlik veya eğitmenlik (Erzieher) için B2 seviyesi bazı durumlarda yeterli olabilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* IV. Alternatif Meslekler */}
                        <AccordionItem value="sss-4-1">
                          <AccordionTrigger className="text-left">Öğretmenlik dışında hangi meslekleri yapabilirim?</AccordionTrigger>
                          <AccordionContent>
                            Erzieher (Eğitmen), Sozialpädagoge (Sosyal Pedagog), Integrationshelfer (Entegrasyon Yardımcısı), Ganztagsschule (Tam gün okul) personeli, MPT (Çok Profesyonelli Takımlar) üyesi olarak çalışabilirsiniz.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-2">
                          <AccordionTrigger className="text-left">Erzieher (Eğitmen) olmak için ne yapmalıyım?</AccordionTrigger>
                          <AccordionContent>
                            Diplomanızın "Erzieher" olarak tanınması için başvuruda bulunabilirsiniz. Genellikle ek bir staj (Anerkennungspraktikum) yapmanız istenir. Bu süreç öğretmenlikten daha hızlı sonuçlanabilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* V. İş Arama ve Başvuru */}
                        <AccordionItem value="sss-5-1">
                          <AccordionTrigger className="text-left">İş başvurularını nereden yapabilirim?</AccordionTrigger>
                          <AccordionContent>
                            Her eyaletin kendi öğretmen atama portalı vardır (örneğin NRW için LOIS ve VERENA). Ayrıca "Interamt", "StepStone" gibi kariyer siteleri ve okulların kendi web siteleri takip edilebilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* VI. Mülakat ve Okul Ortamı */}
                        <AccordionItem value="sss-6-1">
                          <AccordionTrigger className="text-left">Mülakatlarda nelere dikkat etmeliyim?</AccordionTrigger>
                          <AccordionContent>
                            Alman okul sistemi, eyalet müfredatı, sınıf yönetimi, veli iletişimi ve entegrasyon konularına hakim olduğunuzu göstermelisiniz. Ayrıca dil beceriniz ve kültürel uyumunuz da değerlendirilecektir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-2">
                          <AccordionTrigger className="text-left">Başörtülü (tesettürlü) öğretmenler çalışabilir mi?</AccordionTrigger>
                          <AccordionContent>
                            Devlet okullarında (özellikle NRW gibi eyaletlerde) başörtüsü ile öğretmenlik yapmak yasal olarak mümkündür ve yaygındır. Ancak Katolik veya Protestan kilise okulları farklı kurallar uygulayabilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* VII. Gönüllü Çalışma ve Staj */}
                        <AccordionItem value="sss-7-1">
                          <AccordionTrigger className="text-left">Staj (Hospitation) yapmalı mıyım?</AccordionTrigger>
                          <AccordionContent>
                            Kesinlikle tavsiye edilir. Sistemi tanımak, dil pratiği yapmak ve ağ (network) oluşturmak için okullarda gönüllü staj yapmak çok faydalıdır. Ayrıca CV'nizde Almanya tecrübesi olarak görünmesi iş bulma şansınızı artırır.
                          </AccordionContent>
                        </AccordionItem>

                        {/* VIII. Ek Sorular */}
                        <AccordionItem value="sss-8-1">
                          <AccordionTrigger className="text-left">Almanya'da oturup İsviçre'de çalışabilir miyim?</AccordionTrigger>
                          <AccordionContent>
                            Evet, sınır bölgelerinde yaşıyorsanız (Grenzgänger) bu mümkündür. İsviçre'de maaşlar daha yüksektir ancak denklik süreci farklılık gösterebilir.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </section>

              </TabsContent>

              <TabsContent value="experiences" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tecrübe Paylaşımları</CardTitle>
                    <CardDescription>
                      Bu alanda çalışan veya denklik sürecinde olan kişilerin deneyimleri.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {experiences.length > 0 ? (
                      <div className="space-y-4">
                        {experiences.map((exp) => (
                          <Card key={exp.id} className="bg-slate-50 dark:bg-slate-900">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold">{exp.title}</h4>
                                <span className="text-xs text-slate-500">{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{exp.content}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-slate-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>Henüz tecrübe paylaşımı yapılmamış.</p>
                        <Button variant="link" className="mt-2 text-cyan-600">
                          İlk tecrübeyi sen paylaş
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <DocumentSection professionSlug="sosyal-bilgiler-ogretmenligi" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-800">
                <CardHeader>
                  <CardTitle className="text-cyan-900 dark:text-cyan-100 text-lg">Bu Sayfada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="#hazirlik" className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Hazırlık ve Denklik
                  </Link>
                  <Link href="#kariyer" className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Kariyer Yolları
                  </Link>
                  <Link href="#basvuru" className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Başvuru ve Mülakat
                  </Link>
                  <Link href="#sss" className="flex items-center gap-2 text-sm text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Sıkça Sorulan Sorular
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Faydalı Linkler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="https://anabin.kmk.org/anabin.html" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-cyan-600">
                    <Globe className="w-4 h-4" /> Anabin Veritabanı
                  </Link>
                  <Link href="https://www.kmk.org/" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-cyan-600">
                    <Building2 className="w-4 h-4" /> KMK (Eğitim Bakanları Konferansı)
                  </Link>
                  <Link href="https://www.make-it-in-germany.com/" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-cyan-600">
                    <Info className="w-4 h-4" /> Make it in Germany
                  </Link>
                </CardContent>
              </Card>

              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Tecrübeni Paylaş</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Bu alandaki deneyimlerin başkalarına ışık tutabilir.
                </p>
                <ShareExperienceDialog defaultProfessionName="Sosyal Bilgiler Öğretmenliği" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
