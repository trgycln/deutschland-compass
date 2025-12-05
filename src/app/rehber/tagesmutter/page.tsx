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
  Baby,
  Home,
  Euro
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

export default function TagesmutterPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Tagesmutter%,profession.ilike.%Tagesvater%,profession.ilike.%Çocuk Bakımı%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-pink-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-pink-100 text-pink-900 hover:bg-pink-200">
                Çocuk Bakımı & Eğitim
              </Badge>
              <Badge variant="outline" className="text-pink-100 border-pink-400">
                Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Tagesmutter / Tagesvater (Gündüz Annesi/Babası)
            </h1>
            <p className="text-xl text-pink-100 mb-8 leading-relaxed">
              Almanya'da evde çocuk bakımı kariyeri, Jugendamt süreçleri, eğitim şartları ve Jobcenter destekleri hakkında kapsamlı rehber.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-pink-900 hover:bg-pink-50" asChild>
                <Link href="#hazirlik">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-pink-600 text-white hover:bg-pink-500 border-none" asChild>
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
              <TabsList className="grid w-full grid-cols-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <TabsTrigger value="guide" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Rehber</TabsTrigger>
                <TabsTrigger value="experiences" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Tecrübeler</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:shadow-sm">Dokümanlar</TabsTrigger>
              </TabsList>

              <TabsContent value="guide" className="space-y-12 mt-6">
                
                {/* 1. Bölüm: Hazırlık ve Giriş */}
                <section id="hazirlik" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-xl">
                      <Baby className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      I. Hazırlık ve Giriş
                    </h2>
                  </div>

                  <Card className="mb-8 border-l-4 border-l-pink-500">
                    <CardContent className="pt-6">
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        Tagesmutter/Tagesvater mesleği, özellikle ev hanımları ve çocuk bakımı alanında kariyer yapmak isteyenler için ideal bir başlangıç noktasıdır. Bu alanda 10 yılı aşkın tecrübesi olan birçok profesyonel bulunmaktadır.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-pink-600" />
                          Dil Yeterliliği ve Gereksinimler
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Dil Seviyesi</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Eğitim için genellikle <strong>B1 veya B2</strong> seviyesi Almanca sertifikası istenmektedir. Adayların konuşma pratiğinin iyi olması önemlidir.
                            </p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold mb-2">Dil Gelişimi</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Jobcenter, C1 seviyesine kadar dil kurslarını destekleyebilir. B1/B2 sonrası mesleki kurslara gitmek dili geliştirmek için büyük fırsattır.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-pink-600" />
                          Jobcenter ve Finansman Desteği
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="kurs-finansmani">
                            <AccordionTrigger>Kurs Finansmanı ve Bildungsgutschein</AccordionTrigger>
                            <AccordionContent className="space-y-2">
                              <p>Jobcenter, meslek edindirme kapsamında kurs ücretlerini karşılayabilir. <strong>Kursnet</strong> sistemi üzerinden "Bildungsgutschein" (Eğitim Kuponu) kabul eden kurslar genellikle otomatik olarak onaylanır.</p>
                              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded text-sm text-yellow-800 dark:text-yellow-200 mt-2">
                                <strong>İpucu:</strong> Bir iş başvurusundan "sertifika eksikliği" nedeniyle red alırsanız, bu yazıyı Jobcenter'a sunarak ilgili kursun karşılanmasını talep etme hakkınız doğar.
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="girisimcilik">
                            <AccordionTrigger>İşe Başlama Desteği (Einstiegsgeld)</AccordionTrigger>
                            <AccordionContent>
                              <p>Bağımsız (Selbständig) olarak işe başlarken Jobcenter 24 aya kadar "Einstiegsgeld" ödeyebilir. Ayrıca iş kurmak için gerekli başlangıç kredisi veya taşınma/dekorasyon yardımı (duruma göre) talep edilebilir.</p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 2. Bölüm: Mesleki Eğitim */}
                <section id="egitim" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      II. Mesleki Eğitim (Ausbildung)
                    </h2>
                  </div>

                  <Tabs defaultValue="basvuru" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 h-auto">
                      <TabsTrigger value="basvuru" className="py-2">Başvuru Süreci</TabsTrigger>
                      <TabsTrigger value="sure" className="py-2">Eğitim Süresi</TabsTrigger>
                      <TabsTrigger value="sinav" className="py-2">Sınav ve Proje</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basvuru">
                      <Card>
                        <CardHeader>
                          <CardTitle>Nereye Başvurulmalı?</CardTitle>
                          <CardDescription>İlk adres: Jugendamt (Gençlik Dairesi)</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-400">
                            Bulunduğunuz şehrin Jugendamt web sitesinden "Kindertagespflege" bölümünü inceleyin. Başvuru formu (Interessensbekundung) genellikle şunları içerir:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400 ml-2">
                            <li>Kişisel bilgiler ve iletişim</li>
                            <li>Okul ve meslek eğitimi geçmişi</li>
                            <li>Dil seviyesi (B1+, B2, C1)</li>
                            <li>Özel nitelikler ve motivasyon</li>
                          </ul>
                          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <h4 className="font-semibold mb-2">Gerekli Belgeler</h4>
                            <p className="text-sm">Özgeçmiş (Lebenslauf), Diploma/Sertifikalar, Sağlık Raporu, İyi Hal Kağıdı (Führungszeugnis).</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sure">
                      <Card>
                        <CardHeader>
                          <CardTitle>Eğitim Modelleri ve Süreleri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="border p-4 rounded-lg">
                              <h4 className="font-bold text-pink-700 mb-2">Hızlandırılmış Model (160 Saat)</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                Bazı eyaletlerde (örn. Rheinland-Pfalz) uygulanan eski veya hızlandırılmış sistemdir. 
                                <br/><strong>Örnek (Mainz):</strong> 160 saat, Hafta içi her gün 08:30-12:30.
                              </p>
                            </div>
                            <div className="border p-4 rounded-lg">
                              <h4 className="font-bold text-purple-700 mb-2">Yetkinlik Odaklı Model (QHB)</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                NRW gibi birçok eyalette geçerli olan yeni sistemdir. Yaklaşık <strong>300 saat</strong> (1.5 yıl) sürer. Temel kurs (Grundkurs) sonrası çalışırken eğitime devam edilebilir.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="sinav">
                      <Card>
                        <CardHeader>
                          <CardTitle>Sınav ve Bitirme Projesi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-400">
                            Eğitimin sonunda sözlü sınav (Kolloquium) yapılır. En önemli aşama kendi pedagojik konseptinizi (Pädagogisches Konzept) ve iş planınızı (Businessplan) hazırlamaktır.
                          </p>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Konsept Dosyası Nedir?</h4>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Çocuklara nasıl yaklaşacağınızı, günlük rutini, beslenme düzenini, uyku saatlerini ve acil durum planlarını içeren detaylı bir dosyadır. Sınav soruları genellikle bu dosya üzerinden gelir.
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </section>

                {/* 3. Bölüm: İş Hayatı */}
                <section id="is-hayati" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <Briefcase className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      III. İş Hayatı ve Koşullar
                    </h2>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Çalışma Şartları</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Kapasite:</strong> Aynı anda en fazla 5 çocuğa bakılabilir.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Mekan:</strong> Kendi evinizde, kiraladığınız bir dairede veya diğer Tagesmutter'lerle ortak bir mekanda (Großtagespflege) çalışabilirsiniz.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Gelir:</strong> Bakılan çocuk sayısı ve saatine göre Jugendamt tarafından ödenir. Ebeveynlerden ek ücret (Zuzahlung) alınabilir (belediyeye göre değişir).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span><strong>Sigorta:</strong> Sosyal sigorta primlerinin yarısını genellikle Jugendamt karşılar.</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Alternatif Kariyerler</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="border-b pb-3">
                          <h4 className="font-bold text-slate-900 dark:text-white">Erzieherhelferin (Yardımcı Eğitimci)</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Evde çalışmak istemeyenler için bir alternatiftir. Yaklaşık 160 saatlik bir kursla (örn. DRK üzerinden) anaokullarında yardımcı personel olunabilir.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white">Erzieher (Eğitmen)</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            Daha uzun bir eğitim (Ausbildung) gerektirir ancak maaş ve kariyer imkanları daha yüksektir (2500-4000€ arası).
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 4. Bölüm: Ek Bilgiler */}
                <section id="ek-bilgiler" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <Info className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      IV. Varlık Yönetimi ve Sosyal Haklar
                    </h2>
                  </div>

                  <Card>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="kinderzuschlag">
                          <AccordionTrigger>Çocuk Zammı (Kinderzuschlag)</AccordionTrigger>
                          <AccordionContent>
                            Düşük gelirli aileler, kendi ihtiyaçlarını karşılayıp çocuklarınınkini karşılayamıyorsa, çocuk başına aylık 140€'ya kadar (rakamlar değişebilir) Kinderzuschlag alabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="bildirim">
                          <AccordionTrigger>Yasal Bildirim Yükümlülüğü</AccordionTrigger>
                          <AccordionContent>
                            Jobcenter veya diğer kurumlardan yardım alıyorsanız, gelirinizdeki, adresinizdeki veya medeni durumunuzdaki her türlü değişikliği derhal bildirmek zorundasınız (Mitwirkungspflicht). Aksi takdirde cezai yaptırımlarla karşılaşabilirsiniz.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="varlik">
                          <AccordionTrigger>Varlık Beyanı ve Araba</AccordionTrigger>
                          <AccordionContent>
                            Yardım alırken sahip olduğunuz tüm varlıkları beyan etmelisiniz. Makul değerde bir araba sahibi olmak genellikle sorun teşkil etmez (örn. geniş aileler için 7.500€ değerine kadar).
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </section>

                {/* 5. Bölüm: Sıkça Sorulan Sorular */}
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
                        {/* I. Meslek ve Kariyer Başlangıcı */}
                        <AccordionItem value="sss-1-1">
                          <AccordionTrigger className="text-left">Tagesmutter/Tagesvater mesleği nedir ve kimler için uygundur?</AccordionTrigger>
                          <AccordionContent>
                            Bu meslek, Almanya'da çocuk bakımı alanında kariyer yapmak isteyen veya bu alanda Ausbildung (Mesleki Eğitim) yapan kişiler için açılmıştır. Özellikle ev hanımları için yapılabilecek bir iş olarak görülmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-2">
                          <AccordionTrigger className="text-left">Tagesmutter/Tagesvater olmak için aranan temel şartlar nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            Gerekli şartlar ve kursun nerede alınabileceği bilgisi için bulunulan şehrin Gençlik Dairesi (Jugendamt) sitesine bakılmalı ve oradaki kuruma başvurularak süreç sorulmalıdır. Temel mesleki şartlar arasında ise Tagesmutter eğitimini başarıyla tamamlayıp sertifika almak ve tüm öğretmenlerde olduğu gibi ilkyardım sertifikası edinmek yer almaktadır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-3">
                          <AccordionTrigger className="text-left">Tagesmutter olarak en fazla kaç çocuğa bakılabilir?</AccordionTrigger>
                          <AccordionContent>
                            Tagesmutter/Tagesvater olarak en fazla 5 çocuğa bakılabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-4">
                          <AccordionTrigger className="text-left">Tagesmutter mesleği yerine alternatif olarak hangi mesleklere yönelebilirim?</AccordionTrigger>
                          <AccordionContent>
                            Tagesmutter mesleği ev hanımları için bir alternatif olmakla birlikte, Erzieherhelferin (Yardımcı Eğitimci) olmak da bir seçenektir. Ayrıca Erzieher (Eğitimci) mesleği üzerine de kariyer seçenekleri mevcuttur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-5">
                          <AccordionTrigger className="text-left">Tagesmutter sertifikası ile anaokulunda (Kindergarten) çalışmak mümkün müdür?</AccordionTrigger>
                          <AccordionContent>
                            Kaynaklarda bu sorunun cevabına dair net bir bilgi bulunmamaktadır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-6">
                          <AccordionTrigger className="text-left">Kendi yaşadığım şehrin yan şehirlerinde, ev dışında bir Kindergarten veya firmaların Betreuung yerlerinde Tagesmutter olarak çalışılabilir mi?</AccordionTrigger>
                          <AccordionContent>
                            Bu durumun uygulanabilirliği (ev dışında bir Kindergarten veya firmaların Betreuung yerlerinde çalışılması ve saatlerin yeterliliği) grupta merak konusu olmuştur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-1-7">
                          <AccordionTrigger className="text-left">Türkiye'de Almanca öğretmeni olan biri, Almanya'da kiliseye bağlı bir anaokulunda Erzieherin olarak çalışmaya başladığında, önceki deneyimi kabul edilir mi?</AccordionTrigger>
                          <AccordionContent>
                            Genellikle öğretmenlik ve Erzieherlik (Eğitimcilik) farklı meslekler olarak kabul edildiği için Stufe 1'den (Seviye 1) başlanılacağı ve deneyimin 0 olarak kabul edileceği doğrudur. Ancak, işe başladıktan sonra personel bölümüne eski tecrübeleri gösteren evrak verilerek durum tekrar sorulabilir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* II. Eğitim ve Sertifika Süreci */}
                        <AccordionItem value="sss-2-1">
                          <AccordionTrigger className="text-left">Tagesmutter/Tagesvater kursları için Almanca dil seviyesi şartı nedir?</AccordionTrigger>
                          <AccordionContent>
                            Eğitim için Almanca dil seviyesi olarak B2 veya B1 seviyesi istenmektedir. Adayların konuşma seviyesinin iyi olması gerekmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-2">
                          <AccordionTrigger className="text-left">Başvuruda hangi dil sertifikası ibraz edilmelidir?</AccordionTrigger>
                          <AccordionContent>
                            Başvuruda B1 veya B2 Dil Sertifikası ibraz edilmelidir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-3">
                          <AccordionTrigger className="text-left">Tagesmutter sertifikası almak için mutlaka 1,5 yıl Ausbildung (Mesleki Eğitim) yapmak mı gerekiyor?</AccordionTrigger>
                          <AccordionContent>
                            İnternette geçen 160 saatlik kurs bilgisi eski sistem olarak adlandırılmaktadır. NRW (Kuzey Ren-Vestfalya) eyaletinde yeni sistem geçerlidir ve bu eğitim 1,5 yıl sürmektedir. Şehirden şehire sistem değişebilmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-4">
                          <AccordionTrigger className="text-left">Yeni sistemde (1,5 yıllık eğitimde) hem çalışıp hem kursa devam etmek mümkün müdür?</AccordionTrigger>
                          <AccordionContent>
                            Evet, Grundkurs (Temel Kurs) tamamlandıktan sonra hem çalışıp hem kurs yapmaya devam etmek mümkündür.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-5">
                          <AccordionTrigger className="text-left">Tagesmutter eğitimine başvuru sadece yaşanılan şehirden mi yapılabilir?</AccordionTrigger>
                          <AccordionContent>
                            Kurs için genellikle yaşadığınız şehre başvuru yapıldığı, ancak aynı eyaletteki ilçelerin olup olamayacağı veya kabul edilip edilmeyeceği netleştirilmesi gereken bir konudur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-6">
                          <AccordionTrigger className="text-left">Mainz'de (Rheinland-Pfalz) düzenlenen hızlandırılmış Bebek Bakıcılığı Eğitimi (ABC-Mainz) hangi şartlarda düzenlenmiştir?</AccordionTrigger>
                          <AccordionContent>
                            Eğitim 160 saat sürmektedir. Kayıt ücreti 100 €'dur. Eğer 16 saat derse katılım yapılmazsa kurstan ayrılma zorunluluğu vardır. Katılımcıların Rheinland-Pfalz eyaletinde oturması gerekmektedir. Bu eğitimi bitirenlere özellikle Ukraynalı çocuklara bakmaları için iş imkanı sunulacağı belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-7">
                          <AccordionTrigger className="text-left">ABC-Mainz kursuna online katılma imkanı var mıdır?</AccordionTrigger>
                          <AccordionContent>
                            Evet, Bebek Bakıcılığı Kursuna ONLINE katılma imkanı da olacağı duyurulmuştur. Ancak belli günlerde yüz yüze derse katılma durumu da olma ihtimali olabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-8">
                          <AccordionTrigger className="text-left">Kurs katılımcılarının çocukları için çocuk bakımı (Kinderbetreuung) imkanı sunuluyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Evet, katılımcıların çocukları için çocuk bakımı imkanı sunulacaktır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-9">
                          <AccordionTrigger className="text-left">Tagesmutter eğitimi sonunda Konsept (Konzept) ve İş Planı (Geschäftsplan) yazmak gerekiyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Evet, başvuru sürecinde Konzept ve İş Planı yazmak gerekmektedir. Tecrübeli bir kişi, sınavda hazırladığı Konsept Dosyası (Konzept Mappe) üzerinden sorular sorulduğunu belirtmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-2-10">
                          <AccordionTrigger className="text-left">Tagesmutter bitirme sınavı için Transferbericht yazılması gerekiyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Bu, gruptaki katılımcılar arasında merak edilen ve sorulan bir konudur.
                          </AccordionContent>
                        </AccordionItem>

                        {/* III. Jobcenter ve Kurs Finansmanı */}
                        <AccordionItem value="sss-3-1">
                          <AccordionTrigger className="text-left">Jobcenter (İş Merkezi) Tagesmutter kursunu karşılıyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Eğer Tagesmutter kursu, yeni bir meslek edinimi amacıyla gerekliyse, Jobcenter bu kursu aldırabilir. Kursun Kursnet sisteminde yer alması veya Bildungsgutschein (Eğitim Kuponu) içermesi durumunda otomatik olarak karşılanır. Görevli ikna edilirse başka bir kurs da karşılanabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-2">
                          <AccordionTrigger className="text-left">Jobcenter, Tagesmutter mesleği için (Selbständigkeit) taşınma ve dekorasyon konusunda yardım ediyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Bu meslek bağımsız (selbständig) bir meslek olduğu için, Jobcenter'ın bu tür iş kurma faaliyetleri için taşınma ve dekorasyon konusunda yardım edip etmediği merak edilmektedir. Genel olarak Jobcenter, iş kurmak veya işe başlamak için zamansal olarak sınırlı bir avans (Einstiegsgeld - Giriş Parası) ödeyebilir (azami 24 ay), ancak buna kesin yasal bir hak yoktur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-3">
                          <AccordionTrigger className="text-left">Jobcenter, hangi kursa ihtiyacım olduğunu nasıl belirler ve benim teklif götürmem gerekir mi?</AccordionTrigger>
                          <AccordionContent>
                            Jobcenter görevlilerinin genellikle size iş yönlendirmesi yapmak için yeterli zamanı ya da bilgisi yoktur. Bu nedenle hangi kursa ihtiyacınız olduğunu iyi araştırmalı ve teklifi sizin götürmeniz beklenir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-4">
                          <AccordionTrigger className="text-left">Bir işe başvurduğumda reddedilirsem, Jobcenter'dan kurs talebinde bulunabilir miyim?</AccordionTrigger>
                          <AccordionContent>
                            Evet. Bir işe başvurduğunuzda red alırsanız, red sebebini gösteren yazıyı alıp Jobcenter'a verilmelidir. "Şu kursum yokmuş, olsaydı bu işe girecektim" denildiğinde, Jobcenter size o kursu vermek zorundadır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-5">
                          <AccordionTrigger className="text-left">Jobcenter yardımı alırken dil kursunu C1 seviyesine kadar devam ettirebilir miyim?</AccordionTrigger>
                          <AccordionContent>
                            Dil kursunu C1'e kadar devam ettirebilmek için, çalışılmak istendiği ama dilin iyileştirilmesi gerektiği belirtilmelidir. C1'e ihtiyacınız olduğu hissettirilmelidir; bu, memurun inisiyatifine bağlı olabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-6">
                          <AccordionTrigger className="text-left">Jobcenter yardımı alırken çalışmaya başlarsam ve maaşım kiramı karşılamaya yetmezse ne olur?</AccordionTrigger>
                          <AccordionContent>
                            Özellikle büyük şehirlerde kiralar pahalı olduğu için, çalışmaya başlanan işten alınan para yetersiz kalırsa Jobcenter yardıma devam etmek zorundadır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-3-7">
                          <AccordionTrigger className="text-left">Jobcenter yardımı alırken mesleki seviyemi yükseltmek için ek sertifikalar almam desteklenir mi?</AccordionTrigger>
                          <AccordionContent>
                            Evet, Jobcenter'ın ödeme yapmaması için işteki seviyenizi yükseltmek amacıyla sertifika almanız desteklenir, çünkü bu daha iyi iş ve daha çok maaş anlamına gelir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* IV. Çalışma Koşulları ve Ücretlendirme */}
                        <AccordionItem value="sss-4-1">
                          <AccordionTrigger className="text-left">Tagesmutter mesleğinde ücretlendirme nasıl yapılıyor?</AccordionTrigger>
                          <AccordionContent>
                            Ücret, bakılan saat ve çocuk sayısına göre değişmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-2">
                          <AccordionTrigger className="text-left">Tagesmutter olarak çocukların gelmediği günlerde ücret kesintisi yapılıyor mu?</AccordionTrigger>
                          <AccordionContent>
                            Çocuklar gelmediğinde belli bir günden sonra gelmedikleri günün parası kesilmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-3">
                          <AccordionTrigger className="text-left">Tagesmutter mesleğinde sigorta masraflarını kim ödüyor?</AccordionTrigger>
                          <AccordionContent>
                            Sigorta masraflarını çalışan kendisi ödemektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-4-4">
                          <AccordionTrigger className="text-left">Evde çocuk bakımı için hangi düzenlemeler yapılmalıdır?</AccordionTrigger>
                          <AccordionContent>
                            Evde çocuk bakımı için bazı düzenlemeler (oyuncak, uyku matratzları vb.) yapmak gerekmektedir.
                          </AccordionContent>
                        </AccordionItem>

                        {/* V. Yasal Yükümlülükler ve Varlık Beyanı */}
                        <AccordionItem value="sss-5-1">
                          <AccordionTrigger className="text-left">Jobcenter'a sahip olunan mal varlıkları (Vermögen) bildirilmeli midir?</AccordionTrigger>
                          <AccordionContent>
                            Evet, üzerinizde olan tüm malları (mal varlıklarını) bildirmek zorunluluktur. Edim açısından önemli olan tüm gerçekler belirtilmelidir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-2">
                          <AccordionTrigger className="text-left">Hangi varlıklar dikkate alınmaz (vergiden muaf tutulur)?</AccordionTrigger>
                          <AccordionContent>
                            Ölçülü ev eşyaları, kazanç sağlayabilir her yardıma muhtaç kişinin ölçülü bir motorlu taşıtı ve emeklilik sigortası yükümlülüğünden muafiyet durumunda emeklilik dönemi garantisi için olan eşya ve haklar dikkate alınmaz. Ayrıca, kişinin ikamet ettiği ölçülü bir daire veya arsa da dikkate alınmaz.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-3">
                          <AccordionTrigger className="text-left">Türkiye'deki mal varlıkları Almanya'dan takip edilebilir mi?</AccordionTrigger>
                          <AccordionContent>
                            Türkiye'deki kayıtların artık buradan takip edilebileceği belirtilmiştir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-4">
                          <AccordionTrigger className="text-left">İşsizlik Parası II (Hartz IV) ödemeleri haczedilebilir mi (Pfändung)?</AccordionTrigger>
                          <AccordionContent>
                            Geçimin sağlanmasının temini için olan ödemeler prensip olarak haczedilemezler.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-5">
                          <AccordionTrigger className="text-left">Jobcenter yardımı alırken şehir dışına veya başka bir ülkeye çıkış bildirilmeli midir?</AccordionTrigger>
                          <AccordionContent>
                            Kanunen Jobcenter'a bilgi verilmesi gerekir. Eğer bilgi verilmeden gidilmesi nedeniyle bir randevü kaçırılırsa veya başka bir ilde resmi bir işlem yapıldığı Jobcenter tarafından fark edilirse, görevlinin bilgi vermeden gitmenin sorun olduğunu düşünmesi durumunda yaptırım olarak para kesintisi yapılabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-6">
                          <AccordionTrigger className="text-left">Jobcenter'ın bir kararıyla hemfikir değilsem ne yapmalıyım?</AccordionTrigger>
                          <AccordionContent>
                            Kararın ilan edilmesinden itibaren bir ay içinde yazılı olarak itiraz edilebilir (Widerspruch) veya şahsen gidilip tutanak halinde yazdırılabilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-7">
                          <AccordionTrigger className="text-left">Jobcenter hangi durumlarda yaptırım (Sanktionen) uygular?</AccordionTrigger>
                          <AccordionContent>
                            Gerekçesiz olarak yükümlülüklerin yerine getirilmemesi, teklif edilen bir işi, eğitimi veya iş fırsatını reddetmek, veya görünme yükümlülüğünü ihlal etmek kesintilere veya ödemelerin tamamen iptaline yol açar. Görünme yükümlülüğünün (şahsen kuruma gitme, doktor veya psikolojik muayeneye gelme) ihlali halinde, işsizlik parası II yüzde on oranında kesilebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-5-8">
                          <AccordionTrigger className="text-left">Hangi durumlarda yaptırım uygulanmaz (önemli sebep / wichtiger Grund)?</AccordionTrigger>
                          <AccordionContent>
                            Yaptırımlar, davranışınız için önemli bir sebebiniz varsa, uygulanmazlar. Örneğin, bir işin ifa edilmesinin üç yaşın altındaki bir çocuğun yetiştirilmesini tehlikeye sokması önemli bir sebep olarak kabul edilir. Aile üyelerinden birinin bakımı başka şekilde temin edilemiyorsa da önemli sebep sayılır.
                          </AccordionContent>
                        </AccordionItem>

                        {/* VI. Çocuk ve Aile Destekleri */}
                        <AccordionItem value="sss-6-1">
                          <AccordionTrigger className="text-left">Düşük gelirli aileler için Çocuk Zammı (Kinderzuschlag) alma şartları nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            Ebeveynlerin kendi asgari ihtiyaçlarını karşılayabildiği halde, hanede yaşayan evlenmemiş, 25 yaşını doldurmamış çocuklarının asgari ihtiyaçlarını karşılayamaması durumunda hak kazanılır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-2">
                          <AccordionTrigger className="text-left">Çocuk Zammı ne kadar ödenir ve süresi nedir?</AccordionTrigger>
                          <AccordionContent>
                            Çocuk başına aylık 140 Euro'ya kadar ödenir. Azami 36 takvim ayı süreyle ödenir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-3">
                          <AccordionTrigger className="text-left">15 yaşın altındaki ihtiyaç sahibi çocuklara hediye veren bir kurum var mı?</AccordionTrigger>
                          <AccordionContent>
                            Evet, Kinderarmut in Deutschland kurumu, 15 yaşın altındaki çocuklara hediye vermektedir. İlgili yerler doldurulup Sgb II Bescheid (Sosyal Yardım Belgesi) yüklendikten sonra hediye seçilir ve kargo ile gönderilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-4">
                          <AccordionTrigger className="text-left">Almanya'daki göçmen öğrencilere burs (Stipendium) veren kurumlar var mı ve başvuru şartları nelerdir?</AccordionTrigger>
                          <AccordionContent>
                            "Start Heimat für junges Engagement" adlı kurum göçmen öğrencilere burs vermektedir. Başvuru şartları; Almanya'ya göç etmiş veya göçmen bir ebeveynin çocuğu olmak, yaz tatilinden sonra en az 9. sınıfa geçecek olmak ve en az 3 yıl daha okula gidecek olmaktır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-5">
                          <AccordionTrigger className="text-left">Burs kapsamında öğrencilere ne gibi destekler sağlanır?</AccordionTrigger>
                          <AccordionContent>
                            Yılda 1000 €, ücretsiz Laptop ve Drucker (yazıcı) için 60 € destek sağlanır.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-6">
                          <AccordionTrigger className="text-left">Koruyucu aileye Almanya'da ne deniyor ve bu konuda bir grup var mı?</AccordionTrigger>
                          <AccordionContent>
                            Koruyucu aileye ne dendiği ve buna dair bir grup olup olmadığı grupta sorulmuştur.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-6-7">
                          <AccordionTrigger className="text-left">Çocuklarla çalışan uzmanlar (Tagesmutter dahil) için hangi profesyonel eğitimler (Weiterbildungen) mevcuttur?</AccordionTrigger>
                          <AccordionContent>
                            Çocuklarla çalışan tüm uzmanların katılabileceği 20 saat + süpervizyon içeren Çocuk Merkezli Oyun Terapisi Eğitimi gibi uzman eğitimleri mevcuttur.
                          </AccordionContent>
                        </AccordionItem>

                        {/* VII. İlgili Diğer Meslekler ve Eğitimler */}
                        <AccordionItem value="sss-7-1">
                          <AccordionTrigger className="text-left">Yardımcı Anasınıfı Öğretmeni (Erzieherhelferin) olmak için gereken kurs nedir ve ücreti ne kadardır?</AccordionTrigger>
                          <AccordionContent>
                            Erzieherhelferin olmak için 160 saatlik kurs düzenlenmektedir. Bu kursun ücreti yaklaşık 1.300 Euro civarında olabilir ve kursu DRK (Alman Kızılhaçı) gibi kurumlar verebilir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-7-2">
                          <AccordionTrigger className="text-left">Erzieher (Eğitimci) maaşları ne kadar olabilir?</AccordionTrigger>
                          <AccordionContent>
                            Erzieher maaşları eyaletlere göre değişmekle birlikte, örneğin Rheinland-Pfalz'da vergi dilimine göre 2500 ile 4000 Euro arasında kazanılabilmektedir.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sss-7-3">
                          <AccordionTrigger className="text-left">Entegrasyon Kurs Öğretmeni olmak için hangi bilgiler (süreç, süre, maaş) mevcuttur?</AccordionTrigger>
                          <AccordionContent>
                            Bu mesleğe dair süreç, ne kadar süreye ihtiyaç olduğu, işsiz kalma ihtimali ve kazanılacak para miktarı gibi konularda bilgilendirme yapılacağına dair duyuru mevcuttur.
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
                      Tagesmutter/Tagesvater olarak çalışanların deneyimleri.
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
                        <Button variant="link" className="mt-2 text-pink-600">
                          İlk tecrübeyi sen paylaş
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents" className="mt-6">
                <DocumentSection professionSlug="tagesmutter" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="sticky top-24 space-y-6">
              <Card className="bg-pink-50 dark:bg-pink-900/20 border-pink-100 dark:border-pink-800">
                <CardHeader>
                  <CardTitle className="text-pink-900 dark:text-pink-100 text-lg">Bu Sayfada</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="#hazirlik" className="flex items-center gap-2 text-sm text-pink-700 dark:text-pink-300 hover:text-pink-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Hazırlık ve Giriş
                  </Link>
                  <Link href="#egitim" className="flex items-center gap-2 text-sm text-pink-700 dark:text-pink-300 hover:text-pink-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Mesleki Eğitim
                  </Link>
                  <Link href="#is-hayati" className="flex items-center gap-2 text-sm text-pink-700 dark:text-pink-300 hover:text-pink-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> İş Hayatı
                  </Link>
                  <Link href="#ek-bilgiler" className="flex items-center gap-2 text-sm text-pink-700 dark:text-pink-300 hover:text-pink-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Ek Bilgiler
                  </Link>
                  <Link href="#sss" className="flex items-center gap-2 text-sm text-pink-700 dark:text-pink-300 hover:text-pink-900 hover:underline">
                    <ArrowRight className="w-4 h-4" /> Sıkça Sorulan Sorular
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Faydalı Linkler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="https://www.arbeitsagentur.de/kursnet" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-pink-600">
                    <Globe className="w-4 h-4" /> Kursnet (Jobcenter)
                  </Link>
                  <Link href="https://www.bvktp.de/" target="_blank" className="flex items-center gap-2 text-sm text-slate-600 hover:text-pink-600">
                    <Building2 className="w-4 h-4" /> Tagespflege Derneği
                  </Link>
                </CardContent>
              </Card>

              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <h4 className="font-bold mb-2 text-slate-900 dark:text-white">Tecrübeni Paylaş</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Bu alandaki deneyimlerin başkalarına ışık tutabilir.
                </p>
                <ShareExperienceDialog defaultProfessionName="Tagesmutter" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
