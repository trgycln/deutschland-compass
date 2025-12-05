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
  ArrowRight,
  History
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TarihOgretmenligiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Tarih%,profession.ilike.%Geschichte%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
              <History className="w-12 h-12 text-blue-400" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 border-0">
                  Eğitim
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  Normal Talep
                </Badge>
                <Badge variant="outline" className="text-slate-300 border-slate-700">
                  14dk Okuma
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tarih Öğretmenliği
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
                Tarih öğretmenleri için Almanya kariyer rehberi, denklik süreçleri, alternatif kariyer yolları ve iş bulma stratejileri.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="w-full justify-start h-auto p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto">
            <TabsTrigger value="guide" className="px-6 py-3 rounded-lg data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400">
              <BookOpen className="w-4 h-4 mr-2" />
              Rehber
            </TabsTrigger>
            <TabsTrigger value="experiences" className="px-6 py-3 rounded-lg data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20 data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400">
              <MessageSquare className="w-4 h-4 mr-2" />
              Tecrübeler
              <Badge className="ml-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 hover:bg-purple-100 border-0">
                {experiences.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="documents" className="px-6 py-3 rounded-lg data-[state=active]:bg-emerald-50 dark:data-[state=active]:bg-emerald-900/20 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400">
              <FileText className="w-4 h-4 mr-2" />
              Dokümanlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Giriş */}
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="pt-6">
                    <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                      Bu kapsamlı Almanya Kariyer ve Yaşam Rehberi, Tarih Öğretmenliği mesleğine yönelik olarak, kaynaklardaki yasal zemin, pratik tecrübe ve teknik detaylar baz alınarak, göç sürecinin doğal akışına uygun bir şekilde hazırlanmıştır.
                    </p>
                  </CardContent>
                </Card>

                {/* I. Hazırlık Süreci */}
                <section id="hazirlik" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      I. Hazırlık Süreci: Dil, Diploma ve Kariyer
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-blue-500" />
                          Dil Yeterliliği ve Önemi
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Almanya'da mesleki kariyer ve uyum için Almanca dil yeterliliği kritik öneme sahiptir. İyi Almanca, kariyerdeki her şeyin başıdır.
                        </p>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-semibold text-slate-900 dark:text-white">Öğretmenlik Hedefi:</span>
                              <p className="text-slate-600 dark:text-slate-400">Öğretmenlik mesleğini icra edebilmek için en az C1 seviyesi, mümkünse C2 seviyesi Almanca yeterliliği önerilmektedir.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-semibold text-slate-900 dark:text-white">İş Hayatına Etkisi:</span>
                              <p className="text-slate-600 dark:text-slate-400">Tecrübeler, Almancası yetersiz olan matematikçi, kimyacı ve İngilizceci branş öğretmenlerinin bile okula yerleştirilemediğini veya işlerine son verildiğini göstermiştir.</p>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-purple-500" />
                          Akademik Diploma Tanınması (Zeugnisbewertung)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Tarih bölümü mezunları için kariyer yolunun ilk adımı, üniversite diplomalarının Almanya'da tanınmasıdır (Anerkennung).
                        </p>
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg space-y-3">
                          <h4 className="font-semibold text-slate-900 dark:text-white">Bonn ZAB Başvurusu</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Akademik denklik süreci için Bonn'da bulunan Zentralstelle für ausländisches Bildungswesen (ZAB) kurumuna başvurulur. Başvuru sonucunda <strong>Historiker (Tarihçi)</strong> olarak lisans (Bachelor) ve yüksek lisans (Master) denkliği verilir.
                          </p>
                          <div className="mt-4">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Gereken Belgeler:</span>
                            <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 mt-2 ml-2">
                              <li>Transkript</li>
                              <li>E-devletten alınan Diploma (eğer orijinali yoksa)</li>
                              <li>Kimlik fotokopisi</li>
                            </ul>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                          <p className="text-sm text-blue-800 dark:text-blue-300">
                            <strong>Akademik Denklik Faydaları:</strong> Alınan Anerkennung belgesi, mesleki denklik olmasa bile, üniversite mezunu statüsü sağlar. Bu statü, sözleşmeli öğretmenlik, Schulbegleiter veya Türkçe öğretmenliği gibi pozisyonlarda kullanılabilir.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-orange-500" />
                          Mesleki Denklik (Anerkennung) Süreci
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Türkiye'de edinilen Tarih Öğretmenliği diplomasının Almanya'da doğrudan denkliği yoktur. Tarih öğretmenliği denkliği, diğer mesleklere göre iki kat daha zor olarak kabul edilmektedir.
                        </p>
                        
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Temel Engelleyici Faktörler</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li><strong>1. İki Branş Meselesi:</strong> Almanya'da öğretmenler iki branş bitirirken, Türkiye mezunları genellikle tek branş okur. Denklik alabilmek için bazı eyaletler 1.5-2 yıllık tekrar üniversite eğitimi talep edebilir.</li>
                                <li><strong>2. Referendariat Süreci:</strong> Türkiye'deki aday öğretmenlik sürecinin denkliği konusunda sorunlar yaşanır. Almanya'da öğretmen olmak için 4 yıllık üniversite, iki branş, 1. Staatsexam, 1.5 yıllık Referendariat ve tekrar sınav gereklidir.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-2">
                            <AccordionTrigger>Adaylık Kaldırılma Belgesi Şartı</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-slate-600 dark:text-slate-400">
                                Türkiye'de aday öğretmenliğinizin kalktığına dair belge sunulamaması durumunda diploma değerlendirmeye alınmaz ve kişi doğrudan üniversiteye yönlendirilir. Kurumlar, sadece hizmet dökümü yerine adaylık süreci sonundaki sınavlar ve ders denetim raporları gibi ayrıntılı belgeler isteyebilir.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="item-3">
                            <AccordionTrigger>Kredi Hesaplaması (ECTS)</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-slate-600 dark:text-slate-400">
                                İkinci branş zorunluluğunu aşmak için, özellikle eski mezunların üniversitelerinden ECTS (Avrupa Kredi Transfer Sistemi) hesaplanmış transkript almaları önerilir. Bu, kredileri iki katına yakın yükselterek ikinci branş için daha az kredi ihtiyacı anlamına gelebilir.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* II. Göç ve Yerleşim Süreci */}
                <section id="goc-yerlesim" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      II. Göç ve Yerleşim: Jobcenter ve Sosyal Güvenceler
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-slate-500" />
                          İşsizlik Parası II ve Sosyal Para
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          Göç sürecinin varış ve yerleşim aşamasında, Türkiye'den gelen ve kendi geçimini sağlayamayan kişiler Jobcenter aracılığıyla desteklenir.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <h4 className="font-medium mb-2">Hak Sahipliği</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">15-65 yaş arası, çalışma yeteneğine sahip, Almanya'da ikamet eden ve yardıma muhtaç olan kişiler.</p>
                          </div>
                          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            <h4 className="font-medium mb-2">Kredi ve İlk Donanım</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Evin ilk donanımı, giyim ve gebelik/doğum gibi ihtiyaçlar için bir defaya mahsus ödemeler yapılabilir.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 text-red-500" />
                          Gelir ve Varlık Beyanı
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300">
                          Yardım almadan önce kendi gelir kaynaklarını kullanmak esastır. Yurtiçi veya yurtdışındaki para ile ölçülebilir tüm mal ve mülkler varlık sayılır.
                        </p>
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-800">
                          <p className="text-sm text-amber-800 dark:text-amber-300">
                            <strong>Önemli:</strong> Türkiye'deki emekli maaşını bildirmeyen bir kişinin parasının kesildiği ve geri bağlatmanın zor olduğu pratik tecrübelerle sabitlenmiştir. Üzerinizdeki malları ve Türkiye'deki mal varlıklarını gizlememek gerekir.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          Jobcenter Kariyer Desteği
                        </h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                            <span><strong>Dil Kursu:</strong> C1 seviyesine kadar dil kursu masraflarını karşılayabilir.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                            <span><strong>Mesleki Kurslar:</strong> Kursnet platformundaki kursları ve ikna edilirse diğer kursları karşılayabilir.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 shrink-0" />
                            <span><strong>CV Hazırlama:</strong> Özgeçmiş hazırlama kursları mevcuttur.</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* III. Kariyer Yolları */}
                <section id="kariyer-yollari" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      III. Kariyer Yolları ve Alternatifler
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Öğretmenlik Alanında Doğrudan ve Geçici Yollar</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="path-1">
                            <AccordionTrigger>Sınırlı Sözleşmeli Öğretmenlik (Vertretungslehrer)</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-slate-600 dark:text-slate-400 mb-2">
                                Denklik almadan, sadece lisans (Bachelor) denkliği ile geçici sözleşmeli olarak çalışılabilir.
                              </p>
                              <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400">
                                <li><strong>Seiteneinstieg (Yandan Giriş):</strong> Okullarda açık olması durumunda öğretmen olmasanız dahi işe başlanabilir.</li>
                                <li><strong>Doğrudan Başvuru:</strong> Branş öğretmeni olarak çalışmak için, doğrudan okul müdürü ile görüşerek valilik onayıyla işe başlanabilir.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="path-2">
                            <AccordionTrigger>Hoş Geldin Sınıfları (DaF/DaZ)</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-slate-600 dark:text-slate-400">
                                Almanca bilmeyen, yeni gelmiş öğrencilerin bulunduğu özel sınıflardır. Burada öğretmenlik yapmak için denklik ilk aşamada şart değildir, ancak başvuru sürecinde olmak avantaj sağlar.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="path-3">
                            <AccordionTrigger>Eyalet İstisnaları (Bremen & Sachsen-Anhalt)</AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                                <li><strong>Bremen:</strong> Tanınma olmadan başvuru alır ve 1.5 yıl sonra eksiklikleri tamamlama şartıyla ikinci branş olmadan atama yapabilir.</li>
                                <li><strong>Sachsen-Anhalt:</strong> B2 dil seviyesi ile öğretmenlik fırsatları sunar, ikinci branş zorunlu değildir.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Eğitim Alanında Alternatif Pozisyonlar</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Multi Professionelles Team (MPT)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Pedagojik eğitim almış olmak yeterlidir. Genellikle süresiz (unbefristet) kadrodur. İlkokul 3. ve 4. sınıflarda takım halinde ders verme, bireysel destek gibi görevleri vardır.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Schulbegleiter (Okul Destek Personeli)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Engelli veya öğrenme güçlüğü çeken bir çocuğa okulda eşlik etmek için direkt başvuru yapılabilir. Üniversite mezuniyeti saat ücretini artırabilir.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Anadil/Türkçe Öğretmenliği</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Bazı eyaletler anadil öğretmenliği için direkt başvuru kabul eder. NRW'de TELC Türkçe C1 Sertifikası ile başvuru yapılabilir.
                            </p>
                          </div>
                          <div className="p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Akademik ve Arşivcilik</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Üniversite projelerinde (özellikle Osmanlıca bilenler için), müzecilik ve arşivcilik alanlarında fırsatlar mevcuttur.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* IV. İş Başvurusu ve Mülakat */}
                <section id="basvuru" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      IV. İş Başvurusu ve Mülakat Stratejileri
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Gerekli Belgeler</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Zorunlu Belgeler</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Anschreiben (Motivasyon Mektubu)</li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Lebenslauf (Özgeçmiş)</li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> ZAB Denklik Belgeleri</li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Transkriptler</li>
                              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> Dil Belgesi</li>
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3 text-slate-900 dark:text-white">Stratejik İpuçları</h4>
                            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                              <li className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5" />
                                <span>Belgeleri elden teslim etmeye çalışmak ve müdürle tanışmak faydalı olabilir.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <ArrowRight className="w-4 h-4 text-blue-500 mt-0.5" />
                                <span>Initiativbewerbung ile direkt okullara mail atmak geri dönüş sağlayabilir.</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Mülakat Hazırlığı ve Temel Kriterler</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Mülakatlar genellikle NRW eyaleti esas alınarak değerlendirilen temel yetkinlikleri ölçer. Kendinize özel, detaylı Türkçe bir motivasyon mektubu hazırlayın.
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            "Kişisel Sorular (Persönliche Fragen)",
                            "Alan Bilgisi (Fachliche Fragen)",
                            "Didaktik ve Metodoloji",
                            "Sınıf Yönetimi ve Disiplin",
                            "Kapsayıcılık (Inklusion)",
                            "İletişim ve İşbirliği"
                          ].map((item, i) => (
                            <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded border border-slate-100 dark:border-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300">
                              {i + 1}. {item}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* V. Sıkça Sorulan Sorular */}
                <section id="sss" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                      <HelpCircle className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      V. Sıkça Sorulan Sorular
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {/* I. Mesleki Denklik (Anerkennung) ve Diploma İşlemleri */}
                        <AccordionItem value="sss-1-1">
                          <AccordionTrigger className="text-left">Tarih öğretmenliği diplomasının Almanya'da direkt denkliği (Anerkennung) var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Hayır, Almanya'nın hiçbir eyaletinde Türkiye'de okunan öğretmenlik diplomasının direkt denkliği verilmemektedir. Tarihçilik, Almanya'da başlı başına bir meslek olarak kabul edilmediği için, "Tarih bölümü Anerkennung'u diye bir şey yoktur". Denklik sürecinde genellikle iki temel sorun yaşanır: Almanya'da öğretmenlerin iki branş bitirmesi zorunluluğu ve Türkiye'deki Referendariat (Adaylık) sürecinin denkliği konusunda yaşanan sorunlar.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-2">
                          <AccordionTrigger className="text-left">Tarih bölümü mezunları için akademik denklik (Zeugnisbewertung) nasıl yapılır ve bu denklik ne işe yarar?</AccordionTrigger>
                          <AccordionContent>
                            Akademik denklik (Zeugnisbewertung), Bonn'da bulunan Zentralstelle für ausländisches Bildungswesen (ZAB) kurumuna başvurulur. Bu süreç sonucunda, diplomanızın Almanya'da Historiker (Tarihçi) olarak geçerli olduğu tespit edilir (Lisans ve Master denkliği). Bu akademik tanıma, mesleki denklik olmasa bile, üniversite mezunu statüsü sağlar. Bu statü, Schulbegleiter (Okul Destek Personeli) olarak çalışırken saat ücretinde 3 Euro fark yaratmıştır. Ayrıca sözleşmeli öğretmenlik, Schulbegleiterlik veya Türkçe öğretmenliği gibi pozisyonlarda kullanılabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-3">
                          <AccordionTrigger className="text-left">Akademik denklik süreci için Bonn ZAB'a hangi belgeler gönderilmelidir?</AccordionTrigger>
                          <AccordionContent>
                            Bonn ZAB'a gönderilen belgeler arasında Transkript (Transkript), e-devletten alınan Diploma (orijinali üniversitede kalmışsa) ve Kimlik fotokopisi (özellikle mülteci statüsünde olunduğunu ispatlamak ve konsolosluğa gitmelerini engellemek için) bulunmaktadır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-4">
                          <AccordionTrigger className="text-left">Öğretmenlik mesleki denkliği için hangi kuruma başvurulur (NRW özelinde)?</AccordionTrigger>
                          <AccordionContent>
                            Her eyaletin mesleki denklik kurumu farklıdır. Örneğin, NRW (Kuzey Ren-Vestfalya) eyaletinde mesleki denklik için Detmold'a başvurulması gerekir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-5">
                          <AccordionTrigger className="text-left">Doktora derecesinin öğretmenlik denkliği üzerinde bir etkisi var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Kaynaklarda doktora yeterlilik notlarının veya tamamlanmak üzere olan doktoranın denklik üzerindeki tam etkisi net belirtilmemiş olsa da, doktora diplomaları Anerkennung sürecinde kullanılabilir. Ancak bir tecrübe paylaşımında tezsiz yüksek lisansın Master olarak geçtiği belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-6">
                          <AccordionTrigger className="text-left">Öğretmenlik denkliğinin verilmemesinin temel nedenleri nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            İki temel sorun mevcuttur:
                            <br/>1. İki Branş Meselesi: Almanya'da öğretmenler iki branş okurken, Türkiye mezunları genellikle tek branş okur. Denklik alabilmek için bazı eyaletler 1.5-2 yıllık tekrar üniversite eğitimi talep edebilir.
                            <br/>2. Referendariat Süreci: Türkiye'deki aday öğretmenlik sürecinin denkliği konusunda sorunlar yaşanmaktadır. Almanya'da öğretmen olmak için 4 yıllık üniversite, iki branş, 1. Staatsexam, 1.5 yıllık Referendariat ve sonrası sınav gereklidir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-7">
                          <AccordionTrigger className="text-left">Mesleki denklik için kaç yıllık mesleki tecrübe istenmektedir?</AccordionTrigger>
                          <AccordionContent>
                            Denkliklerde genellikle son 10 yılda en az 2-3 yıllık bir mesleki tecrübe istenmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-8">
                          <AccordionTrigger className="text-left">Denklik sürecini tamamlamayanlar için mesleki tecrübe kazanma yolları var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Evet. NRW'deki Lehrkräft programlarında olup okullarda derslere giren kişiler, haftada 10-12 saat derse girmişlerse, bu zamanı mesleki tecrübe olarak saydırabilirler. Aksi takdirde, mesleki tecrübe eksikse 18 aylık Anpassungslehrgang (uyum kursu) zorunluluğu doğabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-9">
                          <AccordionTrigger className="text-left">İkinci branş zorunluluğunu aşmak veya denklik sürecini kolaylaştırmak için ECTS (AKTS) Transkripti nasıl kullanılabilir?</AccordionTrigger>
                          <AccordionContent>
                            Özellikle eski mezunların, üniversitelerinden ECTS (AKTS) hesaplanmış Transkript almaları önerilir. Bu hesaplama ile krediler iki katına yakın yükselir. Bu durum, ikinci branş için daha az krediye ihtiyaç duyulacağı anlamına gelir. Bu transkripti üniversiteden imzalı PDF şeklinde mail yoluyla almak mümkündür.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-10">
                          <AccordionTrigger className="text-left">Bir eyalette denklik alındıktan sonra başka bir eyalette tekrar başvuru yapıldığında, önceki sonuç yeni kararı etkiler mi?</AccordionTrigger>
                          <AccordionContent>
                            Bu konuda tecrübesi olan kişilerin dönüş yapması istenmiştir. Farklı eyaletlerin önceki denklik sonucunu isteyip istemediği ve bu kararın yeni sonuca etkisi merak edilmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-11">
                          <AccordionTrigger className="text-left">Denklik sürecinde Türkiye'deki aday öğretmenliğin kaldırıldığına dair belge sunmak zorunlu mudur?</AccordionTrigger>
                          <AccordionContent>
                            Evet, Türkiye'de aday öğretmenliğinizin kalktığına dair belge sunulamaması durumunda diploma değerlendirmeye alınmaz ve kişi direkt üniversiteye yönlendirilebilir (Niedersachsen eyaleti tecrübesi). Bu belgeyi bir şekilde sunmak zorunludur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-12">
                          <AccordionTrigger className="text-left">Özel sektörde kaldırılan aday öğretmenlik belgesi denklik için kabul ediliyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Yönetmelikte adaylığın devlette kalkmış olması şartı yazsa da, bazı tecrübelerde özelde kaldırılan adaylığın da kabul edildiği belirtilmiştir. Örneğin, Brandenburg eyaletinde özelde adaylığı kalkan bir öğretmenin bu belgeyi kullandığı ve tek branşta tanınacağı söylenmiştir. Bu belgenin son çalıştığınız ilçe milli eğitimden talep edilerek alınabildiği belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-13">
                          <AccordionTrigger className="text-left">Adaylık kaldırılma belgesi e-devletten alınabilir mi? İçeriği ne olmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            E-devlette genel olarak sadece hizmet dökümü alınabildiği ve burada "adaylık kaldırıldı" ibaresinin yer aldığı bilinmektedir. Ancak denklik veren kurumlar, sadece bu ibareyi değil, adaylık süreci sonundaki sınavlar ve ders denetim raporları, öğretmenlik deneyiminin puanlandırması gibi ayrıntılı belgeleri talep edebilmektedir. Bazı kişilerin e-devletten bu belgeyi indirip kullandığına dair bilgi mevcuttur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-14">
                          <AccordionTrigger className="text-left">Pedagojik formasyon eğitimi (sertifikası) Almanya'da Ausbildung mu yoksa Master olarak mı değerlendirilir?</AccordionTrigger>
                          <AccordionContent>
                            Normal pedagojik formasyonun Almanya'da tam karşılığı yoktur. Genellikle "Pädagogische Formation" gibi bir ifadeyle çevrilir ve denklik sürecinde transkriptin bir parçası olarak değerlendirilir. Ancak eğer Türkiye'de tezsiz yüksek lisans şeklinde pedagojik formasyon eğitimi alındıysa, bu Master olarak kabul edilmektedir. Tezsiz yüksek lisans diplomasında yüksek lisans yazdığı ve kriterlerinin Almanya'daki kriterlere uyduğu belirtilmiştir. Pedagojik formasyonun kendisi sadece bir sertifikadır ve tek başına Erzieherlik (Okul Öncesi Eğitmenliği) için başvuruda kabul edilmediği görülmüştür.
                          </AccordionContent>
                        </AccordionItem>

                        {/* II. Kariyer Yolları ve Alternatif Meslekler */}
                        <AccordionItem value="sss-2-1">
                          <AccordionTrigger className="text-left">Tarih öğretmeni olup da Almanya'da kendi branşında öğretmenlik yapabilen var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Evet, kaynaklarda Köln Üniversitesi'nde Lehrkraft programını bitirdikten sonra bir Hauptschule'de tarih öğretmeni olarak işe başlayan (Rabia H.) bir kişinin tecrübesi mevcuttur. Bu kişi başlangıçta sadece Lisans (Bachelor) denkliği almış, iki yıllık geçici sözleşme ile başlamış ve daha sonra süresiz sözleşmeli öğretmen (fest vertrağımı) olup, bir sınavla devlet memuru (Beamter) statüsü almıştır. Ancak bu durumun zor olduğu ve kişinin bildiği tek örnek olduğu belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-2">
                          <AccordionTrigger className="text-left">İktisat mezunu birisi, tarih öğretmenliği yapmak için Almanya'da şansı var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Tarih öğretmenliği yapmak çok zordur. Normal tarih öğretmenlerinin bile denklik almakta zorlandığı bir ortamda, branşı iktisat olan birisi için öğretmenlik yapabilmek "baya zor olur" yorumu yapılmıştır. En olası yol, yeniden Studium (üniversite eğitimi) yapmaktır, ancak bu da orta yaş üstü için önerilmemektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-3">
                          <AccordionTrigger className="text-left">Tarih mezunu için Vertretungslehrer (sözleşmeli/ücretli öğretmen) olmak mümkün müdür ve bu iş tam zamanlı geçim sağlar mı?</AccordionTrigger>
                          <AccordionContent>
                            Vertretungslehrer (Ücretli Öğretmenlik/Honorararbeit) yolu mevcuttur. Denklik alamayan ancak üniversite mezunu olarak tanınan kişiler, doğrudan çalışmak istedikleri okulun müdürü ile görüşerek valiliğin onayıyla işe başlayabilirler. Bir tarih öğretmeni bu şekilde iki yıllık geçici sözleşmeyle (NRW'de Hauptschule'de 5. sınıftan 10. sınıfa kadar) tarih öğretmenliği yapmıştır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-4">
                          <AccordionTrigger className="text-left">Hangi eyaletler tek branşla öğretmenlik yapma fırsatı sunmaktadır? (Bremen ve Sachsen-Anhalt özelinde)</AccordionTrigger>
                          <AccordionContent>
                            Bremen eyaleti, tanınma (Anerkennung) olmadan öğretmenlik başvurusu almakta. Burada 1.5 yıl boyunca E12 kadrosundan (brüt 3700-4000 civarı) maaş verilirken, bu süre zarfında eksiklikleri tamamlama şartıyla E13 kadrosu ile süresiz atama (unbefristet) yapılmaktadır ve ikinci branş şartı aranmamaktadır. Sachsen-Anhalt eyaleti de, B2 dil seviyesi ile öğretmenlik fırsatları sunmakta ve ikinci branşın zorunlu olmadığı, önceki çalışma geçmişinin de sayıldığı belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-5">
                          <AccordionTrigger className="text-left">Tarih mezunu olarak Integration Kurs (Entegrasyon Kursu) öğretmeni olabilir miyim?</AccordionTrigger>
                          <AccordionContent>
                            Edebiyat fakültesi (sözel) mezunu olup formasyon ve C1 belgesi olan bir kişinin DAF/DAZ için kabul edilmemesi üzerine, dil mezunu olmayanlardan süresi 5-6 ay olan Weiterbildung (ileri eğitim/kurs) istendiği belirtilmiştir. Bu kursu BAMF talep etmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-6">
                          <AccordionTrigger className="text-left">Türkçe Öğretmenliği yapmak için Tarih mezunlarının C1 Türkçe sertifikası alması gerekiyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Evet, bölümü Türkçe Öğretmenliği olmayan adayların, C1 Türkçe Sertifikası ile Türkçe Öğretmenliğine bir adım atabildiği belirtilmiştir (Bu durum şimdilik NRW eyaleti için geçerlidir).
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-7">
                          <AccordionTrigger className="text-left">Denklik alamayan tarih öğretmenleri için eğitim alanında hangi alternatif meslekler mevcuttur?</AccordionTrigger>
                          <AccordionContent>
                            Eğitim alanında pedagojik formasyona sahip olmanın avantaj sağladığı çeşitli alternatif yollar şunlardır:
                            <br/>1. Tam Gün Okul (OGS): İlkokul çocuklarına öğleden sonra yardımcı öğretmenlik yapılır. Üniversite mezunu olmak yeterli ve pedagojik formasyon artı puandır.
                            <br/>2. Erzieher/in (Okul Öncesi Eğitmenliği) Ausbildungu: Mesleki eğitim alınarak bu alana geçiş yapılabilir.
                            <br/>3. Schulbegleiter (Okul Destek Personeli): Engelli veya öğrenme güçlüğü çeken bir çocuğa okulda eşlik edilir. Herhangi bir ekstra eğitime ihtiyaç duyulmaz ve direkt başvurulabilir.
                            <br/>4. Multi Professionelles Team (MPT): Pedagojik eğitim almış olmak yeterlidir. Genellikle Grundschule (İlkokul) 3. ve 4. sınıflarda Team teaching, bireysel destek ve Vertretung gibi görevler üstlenilir. Kadro unbefristet (süresiz) ve TVL-10 kadrosundan maaş ödenir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-8">
                          <AccordionTrigger className="text-left">Tarih mezunlarının akademik kariyerde veya arşivcilik alanında iş bulma şansı nedir? Osmanlıca bilmek işe yarar mı?</AccordionTrigger>
                          <AccordionContent>
                            Tarihçilik yönü ağır basanlar için şu yollar önerilir:
                            <br/>1. Üniversite Duyuruları: Bazı projeler için özellikle Osmanlı tarihi veya İslam tarihi bilen, Osmanlıca bilen tarih mezunu aranmıştır (Göttingen, Heidelberg ve Bochum üniversiteleri örnek verilmiştir). Bu pozisyonlar teilzeit (yarı zamanlı) veya Dozent (öğretim görevlisi) ilanı şeklinde çıkabilir. Yüksek lisans derecesi olanlar ve Türkiye'de akademisyenlik tecrübesi olanlar için iş imkanı çıkması muhtemeldir.
                            <br/>2. Müzecilik Ausbildungu yapılabilir.
                            <br/>3. Arşivcilik Ausbildungu yapılabilir.
                            <br/>4. Schulbegleiter (Okul Destek Personeli) olarak çalışırken akademik denklik saat ücretini artırabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-9">
                          <AccordionTrigger className="text-left">Sürücü kursu öğretmenliği (Fahrlehrer/in) mesleki değişimi (Umschulung) için genel şartlar nelerdir ve masraflar Jobcenter tarafından karşılanır mı?</AccordionTrigger>
                          <AccordionContent>
                            Sürücü kursu öğretmenliği için aranan şartlar şunlardır: en az 21 yaşında olmak, en az lise mezunu olmak (bazı yerler yüksekokul isteyebilir), eğitim verilecek düzeyde ehliyete sahip olmak, en az 3 sene sürüş deneyimi (Türkiye'deki ehliyet süresinin buna dahil olup olmadığı net değil) ve Türk ehliyetinin Alman ehliyeti ile değişmiş olması. Eğitimin ücreti şehirden şehre 7-8 bin ile 12 bin Euro arasında değişebilir. Eğer kişi Jobcenter veya Arbeitsamt'ta kayıtlı ise, kursun ücreti onlar tarafından karşılanmaktadır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-10">
                          <AccordionTrigger className="text-left">Kariyer planlamasında yaş faktörünün etkisi nedir? Orta yaş üstü (45+) kişilere ne tavsiye edilir?</AccordionTrigger>
                          <AccordionContent>
                            Orta yaş üstü (45+) kişiler için öğretmenlik yapılması tavsiye edilmemiştir. Zira yeniden Studium (üniversite eğitimi) gerekebilir ve bu istenmeyebilir. Bu yaştaki kişilere, zaman kaybetmeden gerçekçi bir yol çizip ilerlemeleri tavsiye edilir, çünkü entelektüel kaygılar yerine güvenlik ve geçim kaygıları öncelik kazanır. Jobcenter için de 45 yaşından sonra yeni bir mesleğe yönlendirmek zor olabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-11">
                          <AccordionTrigger className="text-left">Tarih mezunu olarak Pädagogische Assistentin olarak çalışmak için denklik belgesi zorunlu mudur?</AccordionTrigger>
                          <AccordionContent>
                            Hayır, Thüringen eyaletinde Pädagogische Assistentin olarak istihdam edilen farklı branşlardan birçok kişinin çalıştığı ve bu pozisyon için denklik belgesi istenmediği belirtilmiştir. Başvurular eyaletin kariyer portalı veya Schulamt üzerinden yapılabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-12">
                          <AccordionTrigger className="text-left">Tarih mezunu için Multi Professionelles Team (MPT) kadrosuna geçiş şartları nelerdir ve bu kadronun avantaj/dezavantajları nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            MPT kadrosu için gerekli şartlar:
                            <br/>• Pedagojik bir eğitim almış olmak.
                            <br/>• Belirlenen herhangi bir dil sertifikası zorunluluğu yok.
                            <br/>• İlanlar ANDREAS'ta yayınlanır ve başvurular posta yoluyla yapılır.
                            <br/>Başlıca avantajları: unbefristet (süresiz) kadro olması, TVL-10 kadrosundan maaş, uzun tatil imkanı, ön hazırlık gerektirmemesi, belirli bir sınıftan sorumlu olmamak, not verilmemesi, ders ziyareti/değerlendirme olmaması ve velilerle iletişimin az olması.
                            <br/>Başlıca zorlukları: Belirli bir iş tanımının olmaması (kendi alanından uzaklaşmak), Vertretungsunterricht (vekil ders) zorunluluğu, farklı öğretmenlerle çalışmak ve kadroda yükselme şansının olmaması.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-13">
                          <AccordionTrigger className="text-left">Tarih öğretmeni olup da kendi mesleğini yapabilen tek kişi nasıl başardığını yazsa olur mu?</AccordionTrigger>
                          <AccordionContent>
                            Rabia Hoca'nın tecrübesi detaylıca paylaşılmıştır. Kendisi "Fest sözleşme ile çalışan tek tarihçi" olduğunu belirtmiş, süresinin uzun sürdüğünü ancak en önemli tavsiyesinin en alttan başlayıp küçük adımlarla ilerlemek olduğunu ifade etmiştir. Süreç: Angestelte öğretmen olarak fest vertrağ imzalamış, ardından bir sınavla devlet memuru (Beamter) statüsüne geçmiştir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* III. İş Başvurusu (Bewerbung) ve Mülakat (Auswahlgespräch) */}
                        <AccordionItem value="sss-3-1">
                          <AccordionTrigger className="text-left">İş başvurusu (Stelle) dosyasında hangi belgeler mutlaka bulunmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            Yazılı ve eksiksiz bir başvuru dosyasında sıralandığı şekilde bulunması gereken zorunlu belgeler şunlardır:
                            <br/>1. Anschreiben (Motivasyon Mektubu).
                            <br/>2. Lebenslauf (Özgeçmiş) (gerektiğinde resim eklenerek).
                            <br/>3. ZAB'tan Anerkenung yapılmış diplomalarınız (Master, Lisans).
                            <br/>4. Transkriptler.
                            <br/>5. Dil belgeniz.
                            <br/>6. Orientierungkurs (Uyum Kursu) belgeniz. Ayrıca daha önce çalışılan kurumlardan alınan Arbeitszeugnis (Çalışma Belgesi) alınması da tavsiye edilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-2">
                          <AccordionTrigger className="text-left">İş başvurularında, özellikle Almanya'da tecrübesi olmayanlar nasıl bir hazırlık yapmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            1. 2-3 kişilik çalışma grupları oluşturun.
                            <br/>2. Kendinize özel detaylı Türkçe bir Anschreiben (Motivasyon Mektubu) hazırlayın. Burada Türkiye ve Almanya'daki tüm çalışmalarınızı, başarılarınızı ve eğitim anlayışınızı detaylı yazın. Bu metin, mülakat sorularını cevaplamakta size yardımcı olacaktır.
                            <br/>3. Kısa ve net cümlelerle kendi cümlelerinizi oluşturun; teori değil, size ait bilgi ve tecrübeye dayalı örnekler vermeye çalışın.
                            <br/>4. Almanya'da tecrübeniz yoksa, Türkiye'deki çalışmalarınızı, kendi çocuklarınızın tecrübelerini, arkadaş tecrübelerini ve internetten araştırılan eğitim bilgilerini kullanarak cevaplar geliştirilebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-3">
                          <AccordionTrigger className="text-left">Okullarda işe girmek için Initiativbewerbung (Girişimci Başvuru) yapmak etkili midir?</AccordionTrigger>
                          <AccordionContent>
                            Evet, doğrudan okullara mail atmak veya şahsen başvurmak etkili bir yöntemdir. Bir öğretmen adayı ilan olmaksızın 400'ün üzerinde okula mail atmış ve birkaç tanesinden geri dönüş alıp birinde işe başlamıştır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-4">
                          <AccordionTrigger className="text-left">İş başvurularında ilk etapta maddiyat mı yoksa tecrübe kazanmak mı önemlidir?</AccordionTrigger>
                          <AccordionContent>
                            İlk etapta maddiyatın önemli olmaması tavsiye edilir. İlk hedef, tecrübe kazanmak ve CV'de bir yerde çalışıyor gözükmek olmalıdır. Gerekirse ilk işyerinde gönüllü çalışılması bile önerilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-5">
                          <AccordionTrigger className="text-left">Mülakat (Auswahlgespräch) sırasında sorulması muhtemel temel yeterlilik alanları nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            Mülakatlar genellikle adayın sahip olması beklenen temel yeterlilikler dikkate alınarak planlanır. Bu alanlar şunlardır:
                            <br/>1. Kişisel Sorular
                            <br/>2. Alan Bilgisi Soruları (Fachliche Fragen)
                            <br/>3. Didaktik ve Metodoloji (Didaktisch und Methodik)
                            <br/>4. Sınıf Yönetimi ve Disiplin (Klassenführung und Disiplin)
                            <br/>5. Kapsayıcılık/Birlikte Öğrenme (Inklusion/Gemeinsamlernen) ve Farklılaştırma (Diferenzierung)
                            <br/>6. İletişim ve İşbirliği (Kommunikation und Zusammenarbeit) (Meslektaşlar ve velilerle)
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-6">
                          <AccordionTrigger className="text-left">Almanya'da bir ders (Unterricht) genel olarak hangi metodolojik adımlarla işlenir?</AccordionTrigger>
                          <AccordionContent>
                            Bir dersin işlenişi genellikle 5 ana adımdan oluşur:
                            <br/>1. Ankommen (Derse Giriş/Karşılama): Öğrencilere hoş geldiniz denir ve organizasyonel işler yapılır.
                            <br/>2. Einstieg (Giriş) (5 dakika): Konuya ilgi uyandıracak bir soru, hikaye, resim veya video ile giriş yapılır.
                            <br/>3. Erarbeitung (Ana Bölüm - Konunun İşlenmesi) (20-25 dakika): Yeni konu açıklanır, öğrencilerle birlikte detaylara inilir, çeşitli öğretim yöntemleri (tartışma, grup çalışması) kullanılır. Öğrencilerden aktif katılım beklenir.
                            <br/>4. Sicherung (Pekiştirme) (10 dakika): Konunun özeti yapılır, önemli noktalar tekrar gözden geçirilir ve soru-cevap ile anlama kontrol edilir.
                            <br/>5. Abschluss und Ausblick (Kapanış ve Gelecek Ders) (5 dakika): İşlenen konunun kısa özeti ve gelecek ders hakkında bilgi verilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-7">
                          <AccordionTrigger className="text-left">Sınıfta davranış sorunları (Störungen) ortaya çıktığında Ring Modell’e göre nasıl bir yol izlenmelidir?</AccordionTrigger>
                          <AccordionContent>
                            Ring Modell, 5 aşamalı bir yaklaşımdır:
                            <br/>1. Prävention (Önleme): Net kurallar belirleme, düzenli rutinler oluşturma ve öğrencilerle pozitif ilişkiler geliştirme.
                            <br/>2. Frühe Intervention (Erken Müdahale): Küçük sorunları nonverbal işaretler, yüz ifadeleri veya sessiz ve bireysel uyarılar ile giderme.
                            <br/>3. Direkte Intervention (Doğrudan Müdahale): Ciddi sorunlarda sakin ve net bir şekilde uyarma ve spesifik talimatlar verme.
                            <br/>4. Intensive Intervention (Yoğun Müdahale): Öğrenciyle bireysel görüşme yapma, gerekirse ebeveyn ve okul uzmanlarıyla işbirliği yaparak destek planı oluşturma.
                            <br/>5. Nachsorge und Reflexion (Takip ve Yansıtma): Müdahalelerin etkinliğini değerlendirme ve uzun vadeli stratejiler geliştirme.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-8">
                          <AccordionTrigger className="text-left">Otizm Spektrum Bozukluğu (OSB) olan bir öğrenci için sınıfta nasıl destek sağlanmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            Öğrencinin bireysel farklılıkları ve duyusal hassasiyetleri dikkate alınmalıdır. Destek yaklaşımları şunlardır:
                            <br/>• Yapı ve Öngörülebilirlik: Yapılandırılmış bir günlük program ve net rutinler sağlamak.
                            <br/>• Görsel Destekler: Günlük programlar, resimli kartlar ve kontrol listeleri gibi görsel araçlar kullanmak.
                            <br/>• İletişim: Yanlış anlamaları önlemek için açık, basit ve doğrudan talimatlar vermek. Gerekirse işaret dili gibi alternatif iletişim yöntemleri kullanılabilir.
                            <br/>• Duyusal İhtiyaçlar: Işık, ses gibi çevresel faktörlere dikkat ederek duyusal aşırı yüklenmeyi en aza indiren bir ortam ve sessiz geri çekilme alanları yaratmak.
                            <br/>• Sosyal Destek: Sosyal hikayeler ve rol oyunları ile sosyal durumları açıklamak.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-9">
                          <AccordionTrigger className="text-left">Dikkat Eksikliği ve Hiperaktivite Bozukluğu (DEHB) olan bir öğrenciye ders sırasında nasıl yaklaşılmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            Öğrenciye karşı anlayışlı ve sabırlı olmak (empati) önemlidir. Uygulanabilecek stratejiler şunlardır:
                            <br/>• Yapı ve Rutin: Net kurallar ve görsel zaman çizelgeleri ile öngörülebilirlik sağlamak.
                            <br/>• Ders Planlaması: Talimatları kısa ve net cümlelerle vermek ve büyük görevleri küçük, yönetilebilir parçalara bölmek.
                            <br/>• Oturma Düzeni: Öğrencinin öğretmene yakın ve dikkat dağıtıcı unsurlardan uzak bir yere oturtulması.
                            <br/>• Pozitif Pekiştirme: İstenilen davranış için düzenli olarak pozitif geri bildirim ve ödül sistemleri sağlamak.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-10">
                          <AccordionTrigger className="text-left">Bir meslektaş ile tartışma yaşanırsa, durumu etkili bir şekilde çözmek için hangi adımlar izlenmelidir?</AccordionTrigger>
                          <AccordionContent>
                            1. Tartışma anında sakin kalın ve durumu alevlendirmeyin.
                            <br/>2. Tartışmanın nedenini ve ana konusunu anlamaya çalışın.
                            <br/>3. Eğer hatalıysanız özür dileyin ve sorumluluk alın.
                            <br/>4. Karşı tarafın duygularını anlamaya çalışarak empati kurun.
                            <br/>5. "Ben" dili kullanarak açık ve net iletişim kurun, suçlamadan kaçının.
                            <br/>6. Ortak bir çözüm bulmak için birlikte çalışın.
                            <br/>7. Sorunu kendi başınıza çözemezseniz, bir müdür veya üst düzey yönetici gibi tarafsız bir üçüncü tarafı dahil edin.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-11">
                          <AccordionTrigger className="text-left">Veli, çocuğunun notları konusunda eleştiri getirirse nasıl bir iletişim stratejisi uygulanmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            1. Sakin kalın ve velinin endişelerini dikkatlice dinleyerek anladığınızı gösterin.
                            <br/>2. Velinin endişelerini paylaştığınızı belirterek empati gösterin.
                            <br/>3. Durumu objektif ve somut örneklerle açıklayın. Çocuğun güçlü ve zayıf yönlerini belirtin (Örn: "Son yazılı sınavında hücre bölünmesi konusunda zorlandı, ancak bitki ve hayvan hücreleri arasındaki farkları iyi biliyor").
                            <br/>4. Eleştirileri kabul ederken, pozitif ve çözüm odaklı bir tutum sergileyin.
                            <br/>5. Veliyi işbirliğine teşvik ederek, birlikte çözüm yolları arayın (Örn: "Birlikte çalışarak daha iyi sonuçlar elde edebiliriz").
                          </AccordionContent>
                        </AccordionItem>

                        {/* IV. Jobcenter (İşsizlik Parası II ve Sosyal Yardımlar) */}
                        <AccordionItem value="sss-4-1">
                          <AccordionTrigger className="text-left">Jobcenter'den yardım (İşsizlik Parası II veya Sosyal Para) alma şartları nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            İşsizlik Parası II (Arbeitslosengeld II) alma hakkına sahip olmak için 15 ile 65 yaş arası olmak, çalışma yeteneğine sahip olmak, mutat olarak Almanya’da oturmak ve yardıma muhtaç olmak gerekir. Çalışma yeteneğine sahip olmayan (örneğin sağlık veya sakatlıktan dolayı bilinebilen süre içinde günde en az üç saat çalışamayan) ancak ihtiyaç birliği (Bedarfsgemeinschaft) içinde çalışma yeteneğine sahip biriyle yaşayan kişiler ise Sosyal Para alabilirler. Yardıma muhtaçlık, kişinin kendi geçimini ve ihtiyaç birliğindeki üyelerin geçimini gelir ve mal varlığıyla sağlayamaması durumudur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-2">
                          <AccordionTrigger className="text-left">Jobcenter’e başvururken bir hak kaybına uğramamak için nasıl bir yol izlenmelidir?</AccordionTrigger>
                          <AccordionContent>
                            Temel teminat yardımları için başvurunun mümkün olan en kısa zamanda yapılması gerekir, çünkü prensip olarak yardımlar başvurudan önceki zamanlar için ödenmezler. Başvuru, yazılı, telefonla veya şahsen (formsuz olarak) yapılabilir, ancak gerekli belgeler sonradan ibraz edilmelidir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-3">
                          <AccordionTrigger className="text-left">Gelir (Einkommen) olarak neleri bildirmek zorunludur ve hangi gelirler dikkate alınır?</AccordionTrigger>
                          <AccordionContent>
                            Dilekçenin verilmesinden sonra para olarak elde edilen her gelir (cinsi veya nereden geldiği fark etmeksizin) kural olarak dikkate alınır. Dikkate alınması gereken gelirler şunlardır: İş/bağımsız çalışma gelirleri, ücret yerine geçen ödemeler (İşsizlik parası, hastalık sigortası parası), kira gelirleri, nafaka ödemeleri, çocuk parası, sermaye/faiz gelirleri ve bir defaya mahsus gelirler (vergi iadeleri, miraslar).
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-4">
                          <AccordionTrigger className="text-left">Türkiye'deki emekli maaşını veya mal varlığını Jobcenter'a bildirmemek ne gibi sonuçlar doğurur?</AccordionTrigger>
                          <AccordionContent>
                            Jobcenter’a Türkiye'deki emekli maaşını bildirmeyen bir kişinin parasını kestikleri ve tekrar bağlatmanın zor olduğu pratik tecrübelerle görülmüştür. Yurtiçi veya yurtdışındaki para ile ölçülebilir tüm mal ve mülkler (Mal Varlığı - Vermögen) dikkate alınır. Mal varlığını veya gelirleri gizlememek gerekir. İşbirliği yükümlülüğüne uyulmaması halinde, haksız alınan ödemeler geri talep edilir ve nizama aykırı hareketten dolayı işlem veya ceza davası tehlikesiyle karşı karşıya kalınabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-5">
                          <AccordionTrigger className="text-left">Jobcenter yardım alırken araba/taşıt edinimi için bir sınır var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Kazanç sağlayabilir her yardıma muhtaç kişinin ölçülü bir motorlu taşıtı varlık olarak dikkate alınmaz. Bir arkadaşa, 4 çocuklu bir aile için 7.500 Euro'ya kadar araba alabileceği söylenmiştir, ancak bu miktarın kesin bir dayanağı olup olmadığı bilinmemektedir. Taşıt alımı izah edilerek (çocukların okulu/kursu vb. nedenlerle) uygun bir araba alınabileceği söylenebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-6">
                          <AccordionTrigger className="text-left">Jobcenter yardımları ne zaman ve ne kadar süreyle ödenir?</AccordionTrigger>
                          <AccordionContent>
                            Geçim temini için olan ödemeler, hak sahipliği durumunun her ayı için peşinen ödenir. Ödeme hakkı, kural olarak altı aylık bir süre için tanınır. Hak sahibi olunduğu ayın ilk gününden itibaren geçerli olur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-7">
                          <AccordionTrigger className="text-left">Jobcenter, yardım alan kişilerin yurt dışına çıkmasına veya ikametgah dışına seyahat etmesine izin verir mi?</AccordionTrigger>
                          <AccordionContent>
                            Evet, ancak Jobcenter'den önceden izin alınması şarttır. Kişi, verdiğiniz adreste her iş günü (Cumartesi dahil) ulaşılabilir ve Jobcenter'e her gün gidebilecek durumda olmak zorundadır. İkametgah dışında bulunma süresi yılda en çok üç takvim haftası ile sınırlıdır. İzin almadan ayrılmak, İşsizlik Parası II'nin kesilmesini gerektirebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-8">
                          <AccordionTrigger className="text-left">Jobcenter, dil kurslarını (C1 dahil) ve mesleki kursları (Weiterbildung/Umschulung) hangi şartlarda karşılar?</AccordionTrigger>
                          <AccordionContent>
                            Jobcenter, dil kurslarını C1 seviyesine kadar karşılayabilir. Bunun için memura, çalışmak istendiği ancak dilin iyileştirilmesi gerektiği belirtilmelidir. Kursnet (https://kursnet-finden.arbeitsagentur.de/kurs/) gibi sistemlerdeki tüm mesleki kurslar ve Bildungsgutschein yazan kurslar otomatik olarak karşılanır. Görevliyi ikna etmek durumunda başka kurslar da karşılanabilir. Bir iş başvurusu reddedilirse ve red sebebi olarak kurs eksikliği gösterilirse, Jobcenter o kursu vermek zorundadır. İşteki seviyeyi yükseltmek amaçlı sertifikalar ve Ausbildung (2 yıl sürebilir) de desteklenebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-9">
                          <AccordionTrigger className="text-left">Jobcenter'a şahsen başvurma (Görünme Yükümlülüğü - Meldepflicht) ihlal edilirse ne olur?</AccordionTrigger>
                          <AccordionContent>
                            Kurumun şahsen gelme talebine (veya doktor muayenesine) önemli bir gerekçe olmaksızın uyulmazsa, İşsizlik Parası II kural olarak kabul edilen ihtiyaç miktarının %10’u oranında düşürülür. Bu yaptırım süresi üç aydır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-10">
                          <AccordionTrigger className="text-left">Jobcenter yardımları alınırken çalışılabilir bir işi reddetmenin yaptırımı nedir?</AccordionTrigger>
                          <AccordionContent>
                            Eğer hak ve sorumluluklar hakkında bilgilendirilmiş olmanıza rağmen teklif edilen bir işi, eğitimi veya iş fırsatını (iş bulma tedbirleri) reddederseniz, ilk aşamada aylık prensip ödemesinin %30’u kesilir. Tekrarlanan yükümlülük ihlalinde bu oran %60'a, sonraki ihlallerde ise %100'e kadar kesilebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-11">
                          <AccordionTrigger className="text-left">Jobcenter, 25 yaş altı hak sahipleri için daha sıkı yaptırımlar uygular mı?</AccordionTrigger>
                          <AccordionContent>
                            Evet. 15 ile 25 yaş altı arasındaki hak sahipleri için, ilk yükümlülük ihlalinde (şahsen başvuru ihlalleri hariç) üç aylık bir süre için sadece konut ve ısınma masrafları dikkate alınır ve diğer tüm yardımlar kesilir. Tekrarlanan bir ihlalde, konut ve ısınma masrafları da üstlenilmez ve hastalık sigortası/bakım sigortası güvencesi ortadan kalkar.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-12">
                          <AccordionTrigger className="text-left">Jobcenter, ev veya dairedeki ilk donanım masraflarını karşılar mı?</AccordionTrigger>
                          <AccordionContent>
                            Evet, ev aletleri de dâhil olmak üzere evin ilk donanımı, giyim için ilk donanım ve gebelik/doğum ile ilgili ilk donanım için bir defaya mahsus ödemeler yapılabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-13">
                          <AccordionTrigger className="text-left">Jobcenter’den alınan yardımlar haczedilebilir mi (Pfändung)?</AccordionTrigger>
                          <AccordionContent>
                            Hayır, geçimin sağlanmasının temini için olan ödemeler prensip olarak haczedilemezler. Cari mevduat hesabının hacizden korunması için bu hesabın P-hesabı (hacizden muaf banka hesabı) olarak değiştirilmesi önerilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* V. Dil Yeterliliği ve Mesleki Gelişim */}
                        <AccordionItem value="sss-5-1">
                          <AccordionTrigger className="text-left">Tarih öğretmenliği için Almanya'da hangi seviyede Almanca bilgisi gereklidir?</AccordionTrigger>
                          <AccordionContent>
                            Genel olarak eğitim camiasında iş bulmak için iyi Almancaya sahip olmak gerekir. Denklik alınıp öğretmenlik yapılmak isteniyorsa, en az C1, mümkünse C2 seviyesi önerilir. Hatta Lehrkraft programına giren matematikçi, kimyacı ve İngilizceci arkadaşların bile Almancaları yetersiz olduğu için işe yerleştirilemediği veya işlerine son verildiği görülmüştür.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-2">
                          <AccordionTrigger className="text-left">Tarih öğretmenleri Almanca terminolojiyi geliştirmek için neler yapabilir?</AccordionTrigger>
                          <AccordionContent>
                            Grupta Almanca tarih literatürüne ihtiyaç olduğu belirtilmiş ve Almanca-Türkçe tarih sohbetleri veya Almanca ağırlıklı çalışmalar yapılması önerilmiştir. Bir hoca, İkinci Dünya Savaşı'nda askerlerin ailelerine yazdığı mektuplar ile alakalı bir Almanca dersi sunmayı önermiştir (hem tarih hem Almanca adına). Ayrıca kelime öğrenme etkinlikleri düzenlenmiş (Höhlenmenschen, Herrscher gibi tarih terimleri kullanılarak).
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-3">
                          <AccordionTrigger className="text-left">Grup üyeleri arasında mesleki/entelektüel sohbetlere neden yeterince ilgi gösterilmiyor?</AccordionTrigger>
                          <AccordionContent>
                            Tecrübeli bir üye, insanların "sağmayacağı ineğe ot vermek istemediği" yorumunu yaparak, çoğu insanın bilgiye mesleki reflekslerle yaklaştığını ve kendine yatırım yapmak yerine, yaptıkları şeyin ya Almancaya katkısı olmasını ya da öğretmenlik için bir fırsat yaratmasını beklediğini belirtmiştir. Bu durum, Maslov'un ihtiyaçlar hiyerarşisi (önce biyolojik, sonra güvenlik ihtiyaçları, en son entelektüel kaygılar) ile açıklanmıştır. İnsanların geçimlerini ve oturumlarını güvenceye alma kaygısı, entelektüel sohbetlere olan ilgiyi azaltmaktadır.
                          </AccordionContent>
                        </AccordionItem>

                        {/* VI. Eğitim Sistemi ve Çalışma Hayatı */}
                        <AccordionItem value="sss-6-1">
                          <AccordionTrigger className="text-left">Türkiye'deki bir öğretmen Almanya'da öğretmen olabilir mi?</AccordionTrigger>
                          <AccordionContent>
                            Evet, ancak süreç zordur. Tek branş, Referendariat eksikliği ve dil sorunu nedeniyle zorluklar yaşanır. Kaynaklarda bir tarih öğretmeninin en alttan başlayarak devlet memuru statüsünde öğretmenliğe yükseldiği tek bir örnek mevcuttur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-2">
                          <AccordionTrigger className="text-left">Almanya'da tesettürlü kadınlar öğretmenlik veya eğitim alanında çalışabilir mi?</AccordionTrigger>
                          <AccordionContent>
                            Evet, bu konuyla ilgili videolar mevcuttur ve tesettürlü kadınların çalışabileceği belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-3">
                          <AccordionTrigger className="text-left">İlkokul (Grundschule) ve ortaokul/lise (Hauptschule) sisteminde dersler kaçıncı sınıfları kapsar?</AccordionTrigger>
                          <AccordionContent>
                            Hauptschule, Realschule ya da Gymnasium'lar 5. sınıftan itibaren öğrencilerin olduğu okullardır. Hauptschule, Türkiye'deki ortaokul ve lisenin karışımı gibi 5. sınıftan 10. sınıfa kadar öğrenci içerir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-4">
                          <AccordionTrigger className="text-left">İşsizlik Parası II alan kişilerin, yaşlılık aylığına katkıları (emeklilik sigortası) ne durumdadır?</AccordionTrigger>
                          <AccordionContent>
                            İşsizlik Parası II alınması dolayısıyla yasal emeklilik sigortasında zorunlu sigortalı değilsiniz. Ancak İşsizlik Parası II alınan süreler Jobcenter tarafından emeklilik sigortası sandığına iletilir ve emeklilik aylığının hesaplanmasında dikkate alınacak sürelerin olup olmadığı incelenir.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </section>

              </div>

              {/* Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="sticky top-24 space-y-6">
                  <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                    <CardHeader>
                      <CardTitle className="text-blue-700 dark:text-blue-300 text-lg">Bu Sayfada</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Link href="#hazirlik" className="block p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm">
                        I. Hazırlık Süreci
                      </Link>
                      <Link href="#goc-yerlesim" className="block p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm">
                        II. Göç ve Yerleşim
                      </Link>
                      <Link href="#kariyer-yollari" className="block p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm">
                        III. Kariyer Yolları
                      </Link>
                      <Link href="#basvuru" className="block p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm">
                        IV. İş Başvurusu
                      </Link>
                      <Link href="#sss" className="block p-2 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors text-sm">
                        V. Sıkça Sorulan Sorular
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tecrübe Paylaş</CardTitle>
                      <CardDescription>
                        Tarih öğretmenliği alanındaki tecrübelerinizi paylaşarak topluluğa katkıda bulunun.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ShareExperienceDialog defaultProfessionName="Tarih Öğretmenliği" />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <Card key={exp.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg mb-1">{exp.title}</CardTitle>
                        <CardDescription>{exp.profession}</CardDescription>
                      </div>
                      <Badge variant={exp.type === 'positive' ? 'default' : 'destructive'}>
                        {exp.type === 'positive' ? 'Olumlu' : 'Olumsuz'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-300 line-clamp-4 mb-4">
                      {exp.content}
                    </p>
                    <div className="flex justify-between items-center text-sm text-slate-500">
                      <span>{exp.author_name || 'Anonim'}</span>
                      <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {experiences.length === 0 && (
                <div className="col-span-full text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Henüz tecrübe paylaşılmamış</h3>
                  <p className="text-slate-500 max-w-md mx-auto mb-6">
                    Bu alanda henüz tecrübe paylaşımı yapılmamış. İlk paylaşımı siz yapın!
                  </p>
                  <ShareExperienceDialog defaultProfessionName="Tarih Öğretmenliği" />
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardContent className="py-12 text-center">
                <FileText className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Dokümanlar Hazırlanıyor
                </h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Tarih öğretmenliği denklik süreci ve başvuru formları ile ilgili dokümanlar yakında buraya eklenecektir.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
