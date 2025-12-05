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
  UploadCloud,
  Shield
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

export default function SozialarbeiterPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data: expData } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Sozial%,profession.ilike.%Sosyal%')
        .order('created_at', { ascending: false });
      
      if (expData) setExperiences(expData);

      const { data: docData } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'approved')
        .eq('profession_slug', 'sozialarbeiter')
        .order('created_at', { ascending: true });
      
      if (docData) setDocuments(docData);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
                Sosyal & Sağlık
              </Badge>
              <Badge variant="outline" className="text-indigo-100 border-indigo-400">
                Sozialarbeiter/in
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Sosyal Hizmet Uzmanlığı
            </h1>
            <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
              Sosyal hizmet uzmanları için denklik, kariyer yolları, çalışma alanları ve yaşam rehberi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50" asChild>
                <Link href="#baslangic">Rehbere Başla</Link>
              </Button>
              <Button size="lg" className="bg-indigo-700 text-white hover:bg-indigo-600 border-none" asChild>
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

              <TabsContent value="guide" className="space-y-8" id="baslangic">
                {/* I. HAZIRLIK AŞAMASI */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">1</span>
                    Hazırlık Aşaması: Mesleki ve Akademik Yeterlilikler
                  </h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="w-5 h-5 text-indigo-600" />
                          Mesleğin Yasal Zemini ve Tanımı
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-amber-50 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r-lg">
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Yasal Uyarı (Reglementierter Beruf)
                          </h4>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Almanya'da "Sozialarbeiter/in" unvanı koruma altındadır. Yeterli eğitim veya denklik olmadan bu unvanı kullananlara 15.000 Euro'ya kadar para cezası uygulanabilir.
                          </p>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">
                          Sosyal Hizmet (Soziale Arbeit), bireylerin ve toplulukların yaşam koşullarını iyileştirmeyi amaçlar. Çalışma alanı sağlık, hukuk, psikoloji ve pedagojiyi kapsar.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sosyal Çalışmacı (Sozialarbeiter)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Sosyal yardım sistemleri, danışmanlık, sosyal politika ve haklara erişim odaklıdır. Daha hukuki ve sosyal destek ağırlıklıdır.
                            </p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sosyal Pedagog (Sozialpädagoge)</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Eğitim, kişisel gelişim ve pedagojik destek (özellikle gençler, okullar) üzerine odaklanır.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-indigo-600" />
                          Eğitim ve Denklik (Anerkennung)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Resmi unvan için Sosyal Hizmetler veya Sosyal Pedagoji alanında lisans diploması şarttır.
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="denklik-turleri">
                            <AccordionTrigger>Denklik Başvurusu ve Türleri</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Zeugnisbewertung (ZAB):</strong> Diploma değerlendirmesidir. Lisans eşdeğerliğini gösterir ancak mesleki tanıma değildir. İş piyasasına giriş için kullanılabilir.</li>
                                <li><strong>Staatliche Anerkennung (Devlet Onayı):</strong> Bu unvanı almak için diploma denkliği yetmez; genellikle denklik sürecinin veya tamamlama eğitiminin başarıyla bitirilmesi gerekir.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="pratik-tecrube">
                            <AccordionTrigger>Bölümlere Göre Denklik Durumu</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Sosyoloji Mezunları:</strong> Genellikle Sozialarbeiter denkliği verilmez. "Fachkraft" olarak çalışabilirler ancak ücretleri daha düşük olabilir.</li>
                                <li><strong>Sosyal Hizmetler (TR) Mezunları:</strong> Denklik başvurusu yapabilirler. Genellikle hukuk dersleri (Sozialrecht) gibi eksikleri tamamlamaları istenir (Anpassungslehrgang).</li>
                                <li><strong>Öğretmenlik Mezunları:</strong> Direkt Sozialarbeiter olamazlar ancak "Pädagogische Fachkraft" olarak çalışabilirler.</li>
                                <li><strong>İktisat/İşletme:</strong> Doğrudan Sozialarbeiter olarak çalışamazlar.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-indigo-600" />
                          Dil Yeterliliği
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Üniversiteler genellikle C1 seviyesi (DSH 2 veya C1 Hochschule) ister. Hukuk derslerinin terminolojisi ağırdır.
                        </p>
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Pratik İpuçları</h4>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-indigo-800 dark:text-indigo-200">
                            <li>Pädagogische Fachkraft veya Betreuer pozisyonları için B1/B2 seviyesi yeterli olabilir.</li>
                            <li>Mülteci kamplarında Türkçe, Kürtçe, Arapça bilmek büyük avantajdır.</li>
                            <li>İşverenler, dil bariyeri olsa bile tecrübeli göçmenlerden faydalanmak isterler.</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* II. GİRİŞ VE VİZE AŞAMASI */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">2</span>
                    Giriş ve Vize Aşaması (Finansal Yönetim)
                  </h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="w-5 h-5 text-indigo-600" />
                          Jobcenter ve Devlet Yardımları
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Jobcenter, iş arayanların temel ihtiyaçlarını (ALG II) karşılar. Öğrenciler genellikle bu yardımı alamaz (BAföG devreye girer).
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="jobcenter-yukumluluk">
                            <AccordionTrigger>Yükümlülükler ve Yaptırımlar</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Bildirim:</strong> Gelir, adres veya medeni hal değişiklikleri derhal bildirilmelidir.</li>
                                <li><strong>Yaptırımlar:</strong> Randevuya gitmemek veya iş reddetmek kesintilere (%30) yol açar.</li>
                                <li><strong>İl Dışına Çıkış:</strong> İzin alınmadan il dışına çıkılmamalıdır.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="varlik-yonetimi">
                            <AccordionTrigger>Varlık ve Kira Yardımı</AccordionTrigger>
                            <AccordionContent>
                              <p className="text-slate-600 dark:text-slate-300 mb-2">
                                Jobcenter, uygun kira ve ısınma masraflarını karşılar. Taşınmadan önce onay (Zusage) alınmalıdır.
                              </p>
                              <p className="text-slate-600 dark:text-slate-300">
                                Nakit, banka varlıkları ve mülkler (yurtdışı dahil) beyan edilmelidir. Belirli sınırlar dahilinde (örn. uygun bir araba) varlık sahibi olunabilir.
                              </p>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Heart className="w-5 h-5 text-indigo-600" />
                          Gönüllü Çalışma ve BFD
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Federal Gönüllü Hizmeti (BFD), tecrübe eksikliğini gidermek ve Almanca geliştirmek için mükemmeldir.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Avantajları</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-400">
                              <li>İş ortamını tanıma</li>
                              <li>Mesleki Almanca gelişimi</li>
                              <li>CV için güçlü referans</li>
                              <li>200-500€ cep harçlığı</li>
                            </ul>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Gerekli Belge</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Çocuklarla çalışacaklar için <strong>Genişletilmiş Sabıka Kaydı (Erweitertes Führungszeugnis)</strong> istenir.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* III. VARIŞ VE UYUM */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">3</span>
                    Varış ve Uyum: İş Bulma ve Eğitim
                  </h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-indigo-600" />
                          İş Arama Stratejileri
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mb-4">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Nereden Başlamalı?</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Caritas, Diakonie, DRK, AWO gibi dernekler, Belediyeler ve Jugendamt ilanlarına bakın. Her kuruma ayrı başvuru yapın.
                          </p>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="basvuru-belgeleri">
                            <AccordionTrigger>Başvuru Belgeleri ve Mülakat</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Dosya:</strong> Anschreiben (Önyazı), Lebenslauf (CV), diplomalar ve sertifikalar.</li>
                                <li><strong>Mülakat:</strong> "Neden bu kurum?", kriz yönetimi ve pedagojik yaklaşım sorularına hazırlıklı olun. Hospitasyon (gözlem) talep edin.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="egitim-alternatifleri">
                            <AccordionTrigger>Eğitim Alternatifleri (Uzaktan & Dual)</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Uzaktan Eğitim (Fernstudium):</strong> IU gibi üniversitelerde %100 online okunabilir. Esnektir ancak disiplin gerektirir. Ücretlidir.</li>
                                <li><strong>İkili Eğitim (Duales Studium):</strong> 3 gün iş, 2 gün okul. Maaş alınır (örn. 1400€ brüt).</li>
                                <li><strong>Ders Saydırma:</strong> Türkiye'deki derslerinizi saydırarak süreyi kısaltabilirsiniz.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* IV. İŞ HAYATI */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">4</span>
                    İş Hayatı ve Kariyer Gelişimi
                  </h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-indigo-600" />
                          Çalışma Alanları ve Pozisyonlar
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Pädagogische Fachkraft</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Öğretmenlik veya pedagojik formasyon geçmişi olanlar. Çocuk ve gençlik yardımı, okullar (MPT).
                            </p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sozialbetreuer</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              Mülteci kampları veya barınma gruplarında temel destek, belletmenlik ve tercümanlık.
                            </p>
                          </div>
                        </div>
                        <Accordion type="single" collapsible className="w-full mt-4">
                          <AccordionItem value="calisma-alanlari-detay">
                            <AccordionTrigger>Çalışma Alanları Detayları</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Mülteci Kampları:</strong> Entegrasyon ve göç alanı. Türkçe bilmek avantajdır.</li>
                                <li><strong>Gençlik Barınma Grupları (Wohngruppe):</strong> 13-18 yaş arası gençler. Nöbetli çalışma sistemi vardır.</li>
                                <li><strong>Okul Sosyal Hizmetleri (MPT):</strong> Okullarda öğrencilere destek, veli iletişimi. Tatillerde izin imkanı.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="maaslar">
                            <AccordionTrigger>Maaş ve Çalışma Koşulları</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                                <li><strong>Fachkraft Brüt:</strong> 3100-3600€ civarı (Tvöd S8).</li>
                                <li><strong>Betreuer Net:</strong> 1800-2200€ civarı (39 saat).</li>
                                <li><strong>Zorluklar:</strong> Psikolojik yükü ağırdır. Yöneticiler de dahil herkes temizlik/yemek gibi işlere destek olabilir.</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-indigo-600" />
                          Kariyer Gelişimi
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-300">
                          Diploması tam tanınmayanlar için <strong>Weiterbildung</strong> (mesleki eğitim) şarttır. Jobcenter bu eğitimleri destekleyebilir.
                        </p>
                        <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg">
                          <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Önemli Uzmanlık Alanları</h4>
                          <p className="text-sm text-indigo-800 dark:text-indigo-200">
                            Çeşitlilik Yönetimi (Diversity), Aile Danışmanlığı, Çocuk ve Gençlik Yardımı.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* EK BİLGİ */}
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 text-sm font-bold">i</span>
                    Ek Bilgiler
                  </h2>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                          Eğitim Odaklı Destekler
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
                          <li><strong>Eğitim Paketi (Bildungspaket):</strong> ALG II alan ailelerin çocukları için okul gezileri, kırtasiye (yılda 100€), öğle yemeği ve spor kulübü (ayda 10€) destekleri.</li>
                          <li><strong>AÖF Kayıt:</strong> Türkiye'deki Açıköğretim Fakültesi'ne yurtdışından kayıt yapılabilir. Denklik belgesi gerekebilir.</li>
                        </ul>
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
                      Sosyal hizmet uzmanlarının Almanya'daki gerçek deneyimleri.
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
                                <FileText className="w-8 h-8 text-indigo-600" />
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
                        <UploadDocumentDialog professionSlug="sozialarbeiter" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      I. Mesleki Tanım ve Unvanlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-1-1">
                        <AccordionTrigger>Sosyal Hizmet Uzmanı (Sozialarbeiter/in) unvanı Almanya'da nasıl bir statüye sahiptir?</AccordionTrigger>
                        <AccordionContent>
                          Sosyal Hizmet Uzmanı unvanı, eyalet düzeyinde düzenlenen ve koruma altına alınmış (reglementierte Berufe) bir meslektir. Bu, bu unvanı kullanabilmek için belirli akademik yeterliliklere ve denklik (Anerkennung) şartlarına sahip olunması gerektiği anlamına gelir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-2">
                        <AccordionTrigger>Denklik veya yeterli eğitim olmadan Sozialarbeiter unvanını kullanmanın cezası var mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Evet, yeterli eğitim veya denklik olmadan bu unvanı kullanan kişilere 15.000 Euro'ya kadar para cezası uygulanabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-3">
                        <AccordionTrigger>Sozialarbeiter/in ve Sozialpädagoge/in arasındaki temel fark nedir?</AccordionTrigger>
                        <AccordionContent>
                          Günümüzde çoğu üniversite bu iki alanı "Soziale Arbeit" çatısı altında verse de, tarihsel ve odak alanları açısından farklar mevcuttur. Sozialpädagoge (Sosyal Pedagog), daha çok eğitim, kişisel gelişim ve pedagojik destek (özellikle gençler, okullar) üzerine odaklanırken, Sozialarbeiter (Sosyal Çalışmacı), sosyal yardım sistemleri, danışmanlık, sosyal politika ve haklara erişim gibi daha hukuki ve sosyal destek odaklıdır. Pratikte, mezunlar genellikle unvanı kendileri seçebilirler ve birçok iş ilanında her iki unvan birlikte kullanılır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-4">
                        <AccordionTrigger>Sosyal alanda çalışan herkes "Sozialarbeiter" unvanını kullanabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Hayır. Sozialarbeiter unvanı, eyalet bazında tanınan ve korunan (reglementierte Berufe) bir meslektir. Her sosyal alanda çalışan kişi bu unvana sahip değildir; unvanı taşıyabilmek için eğitim, staj ve/veya denklik süreci şarttır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-5">
                        <AccordionTrigger>"Pädagogische Fachkraft" (Pedagojik Uzman) ne anlama gelir ve kimler bu unvanla çalışabilir?</AccordionTrigger>
                        <AccordionContent>
                          Pädagogische Fachkraft, genellikle çocuk ve gençlik yardımında (Kinder- und Jugendhilfe) ve okullarda çalışan, öğretmenlik, PDR (Psikolojik Danışmanlık ve Rehberlik) veya pedagojik formasyon geçmişi olan kişilere verilen bir unvandır. Edebiyat mezunu olup yatılı okullarda tecrübesi olan bir kişi bile bu unvanla Jugend Wohngruppe'larda çalışabilir. Bu unvanla çalışmak için illaki Sozialarbeiter denkliğine sahip olmak gerekmez.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-1-6">
                        <AccordionTrigger>Sosyal Hizmet Uzmanı (Sozialarbeiter) terapi yapabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Hayır, Almanya'da sosyal çalışmacılar terapi yapamaz. Ancak bir psikolog haftada iki gün gelip terapi yapabilir ve sosyal pedagoglar bu terapilerden yola çıkarak destek planı (Förderplan) hazırlarlar.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      II. Denklik ve Akademik Yeterlilikler (Anerkennung)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-2-1">
                        <AccordionTrigger>Türkiye'deki Sosyoloji bölümü mezunları Almanya'da Sozialarbeiter denkliği alabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Genellikle hayır. TH Köln'de yapılan bir seminere göre, Almanya'nın hiçbir eyaletinde sosyoloji mezunlarına bu denklik verilmemektedir. Bunun nedeni, sosyoloji ve sosyal hizmet (Soziale Arbeit) bölümlerinin içerik ve dersler açısından çok farklı olmasıdır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-2">
                        <AccordionTrigger>Türkiye'deki Sosyal Hizmetler bölümü mezunları denklik alırken hangi dersleri tamamlamak zorunda kalırlar?</AccordionTrigger>
                        <AccordionContent>
                          Denklik başvurusunda eksik görülen derslerin tamamlanması (Anpassungsmaßnahme) şart koşulur. Genellikle eksik çıkan dersler Alman Hukuku (Sozialrecht), İdari Hukuk ve Sosyal Çalışma Teorileri gibi alanları kapsar. Bu eksik dersler, ilgili üniversitelerde 1 veya 2 dönem (Semester) okunarak tamamlanabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-3">
                        <AccordionTrigger>Türkiye'de alınan pedagojik formasyon belgesi, Sozialarbeiter denkliği almayı kolaylaştırır mı?</AccordionTrigger>
                        <AccordionContent>
                          Pedagojik formasyon, Sozialarbeiter denkliği (Staatliche Anerkennung) için doğrudan bir denklik sağlamasa da, öğretmenlik geçmişinizden dolayı Pedagojik Uzman (Pädagogische Fachkraft) olarak iş bulma şansınızı ve maaş skalasını olumlu etkileyen önemli bir etkendir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-4">
                        <AccordionTrigger>"Zeugnisbewertung" ile "Berufliche Anerkennung" arasındaki fark nedir?</AccordionTrigger>
                        <AccordionContent>
                          Zeugnisbewertung, ZAB tarafından yapılan, diplomanızın sadece genel akademik eşdeğerliliğini (örneğin Bachelor) gösteren bir belgedir ve mesleki tanıma (Berufliche Anerkennung) değildir. Mesleki Tanıma ise, Sozialarbeiter/in gibi korunan bir unvanı kullanma hakkı verir ve eyalet kurumları tarafından incelenir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-5">
                        <AccordionTrigger>Denklik (Anerkennung) başvurusu için belgeler nereye gönderilmelidir?</AccordionTrigger>
                        <AccordionContent>
                          Öncelikle diplomaların ZAB'tan değerlendirilmesi (Zeugnisbewertung) tavsiye edilir. Ardından Staatliche Anerkennung (Devlet Onayı) almak için, Sosyal Hizmetler Mesleki Denklik Başvuru Merkezi (Regierungspräsidium, Landesjugendamt, Bezirksregierung veya "Anerkennungsstelle für Soziale Arbeit" gibi eyalet kurumlarına) başvurulur.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-6">
                        <AccordionTrigger>PDR mezunları Almanya'da Sozialarbeiter/Sozialpädagoge olarak çalışabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet, PDR mezunları da Sozialpädagogik alanına yakın görüldüğü için ZAB üzerinden denklik başvurusunda bulunabilirler. Eksik görülen derslerin (Alman hukuku gibi) Almanya'daki bir üniversitede (Hochschule) tamamlanması istenebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-7">
                        <AccordionTrigger>Denklik sürecinde eksik dersler (Anpassungsmaßnahme) nasıl tamamlanır?</AccordionTrigger>
                        <AccordionContent>
                          İnceleme sonunda eksik çıkan dersler (örneğin hukuk ve Praktikum), Bezirksregierung tarafından önerilen 3 üniversiteden birinde okunarak tamamlanır. Hukuk derslerine katılım zorunlu olmasa da, bu derslerden sözlü sınav (mündliche Prüfung) olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-8">
                        <AccordionTrigger>Türkiye'deki diplomaların tercümesi yapılırken dikkat edilmesi gereken özel bir konu var mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Diploma ve transkriptlerin tercüme edilmesi gerekir. Pedagojik Formasyon transkriptinde "Pedagojik" kelimesi geçmiyorsa dahi, Anerkennung başvurusunda orijinal halinin ve Almanca karşılığının yazılması önemlidir. Resmi işlemler için T.C. Büyükelçilikleri/Konsoloslukları veya Noterler tarafından onaylanmış suretler istenir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2-9">
                        <AccordionTrigger>Denklik sürecinde dil yeterliliği belgesi isteniyor mu?</AccordionTrigger>
                        <AccordionContent>
                          Denklik sürecinde dil belgesi istemeyen hızlı denklik yapan eyaletler olup olmadığı sorulmuştur. Ancak Sosyal Hizmetler gibi düzenlenmiş mesleklerde, başarılı çalışmak ve Anpassungslehrgang'a katılmak için en az B2 seviyesinde akıcı Almanca olması ve üniversite başvuruları için C1 sertifikası (DSH 2 veya C1 Hochschule) önerilir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-600" />
                      III. Eğitim Alternatifleri (Studium/Weiterbildung)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-3-1">
                        <AccordionTrigger>Sozialarbeit alanında hangi üniversite eğitim alternatifleri mevcuttur?</AccordionTrigger>
                        <AccordionContent>
                          Almanya'da Sozialarbeit (Sosyal Hizmetler) lisans (Bachelor) eğitimi için Uzaktan Eğitim (Fernstudium), İkili Eğitim (Duales Studium) ve Kombi-Studium gibi seçenekler bulunmaktadır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-2">
                        <AccordionTrigger>Uzaktan Eğitim (Fernstudium) ile Sozialarbeit okumak ne kadar sürer ve ders/sınav sistemi nasıldır?</AccordionTrigger>
                        <AccordionContent>
                          Normalde 4 yıl süren (8 dönem) lisans programları, dönemde 6 ders alınarak 3 yılda bitirme odaklı olabilir. Dersler ve sınavlar %100 online yapılabilir. Sınavlar geleneksel yöntemle veya Workbook (ev ödevi) olarak çözülebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-3">
                        <AccordionTrigger>Fernstudium'da (Örn: IU) Hausarbeit (ev ödevi/proje) yazmak ne kadar zorlayıcıdır?</AccordionTrigger>
                        <AccordionContent>
                          Hausarbeit yazmak zaman ve sabır isteyen bir süreçtir. Genellikle ortalama 15 sayfalık ödevler verilir ve en az 10 kaynak belirtilmesi gerekir. Tecrübeli öğrencilere göre, bir Hausarbeit'i 1 aydan önce yazmak mümkün olmayabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-4">
                        <AccordionTrigger>Duales Studium (İkili Eğitim) ile Sozialarbeit okumanın avantajları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Duales Studium'da öğrenci haftanın 3 günü işe, 2 günü okula gider. İş yeri, okul ücretini ve Semesterticket (dönemlik ulaşım bileti) ücretini öder. Bu sayede Jobcenter'dan çıkılır ve öğrenciye 450 € kadar para kalabilir (Mainz Belediyesi örneğinde aylık 1400 Euro brüt maaş).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-5">
                        <AccordionTrigger>Türkiye'de okunan dersler saydırılarak (Ders Transferi) Almanya'da Sozialarbeit lisans (Bachelor) eğitimi kısaltılabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet, eğer önceki eğitiminizde (örneğin sosyoloji) Sosyal Hizmet alanıyla ortak dersler varsa (psikoloji, sosyoloji gibi), derslerinizi saydırıp öğrenim sürenizi kısaltabilirsiniz.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-6">
                        <AccordionTrigger>Sozialarbeit alanındaki Weiterbildung (Mesleki Eğitim) programları ne kadar sürer ve ne işe yarar?</AccordionTrigger>
                        <AccordionContent>
                          Weiterbildung'lar 3 aydan 6 aya kadar veya daha uzun sürebilir. Bu eğitimler, kişinin iş ortamında daha pozitif karşılanmasını, maaşını etkilemesini ve alan Almancasını (Fachsprache) geliştirmesini sağlar. Ancak, Weiterbildung ile Sozialarbeiter kadrosunda veya maaşında çalışmak mümkün olmayabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-7">
                        <AccordionTrigger>Yüksek Lisans (Master) veya Lisansüstü Gelişim Çalışması (Postgraduate/Aufbaustudium) yapmak kariyerde avantaj sağlar mı?</AccordionTrigger>
                        <AccordionContent>
                          Master yapmak her zaman kesin bir avantaj sağlamaz; işverenler deneyim (Erfahrung) ve güven arar. Polonya'dan alınan "Postgraduate" programı, ZAB'tan Lisansüstü Gelişim Çalışması (Aufbaustudium) olarak denklik almıştır, ancak bu programın iş piyasasında tam olarak ne işe yarayacağı ve garantisi tartışmalıdır. Yüksek lisans, sosyal alanda daha yüksek pozisyonlarda çalışmak için cazip olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-3-8">
                        <AccordionTrigger>Uzaktan eğitim (Fernstudium) ile Sozialarbeit eğitimi alanlar için maliyet (Ücret) nedir?</AccordionTrigger>
                        <AccordionContent>
                          IU gibi özel üniversitelerin ücretleri yüksektir. Taksitli ödeme yıllık 3500 € civarında olabilir. Ücretler yaklaşık aynıdır ve erken bitirilse dahi 7 dönem boyunca ödenir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-indigo-600" />
                      IV. Finansal Destek ve Sosyal Yardımlar (Jobcenter / BAföG)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-4-1">
                        <AccordionTrigger>Jobcenter yardımları nedir ve kimler İşsizlik Parası II (ALG II) alabilir?</AccordionTrigger>
                        <AccordionContent>
                          İşsizlik Parası II (Arbeitslosengeld II - ALG II), çalışma yeteneğine sahip, yardıma muhtaç ve 15 ila 65 yaş altı arasında olup mutat olarak Almanya’da oturan kişilerin geçimini güvence altına almak için verilen temel teminat edimleridir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-2">
                        <AccordionTrigger>Türkiye'deki emekli maaşları veya mal varlıkları Jobcenter'a bildirilmeli midir?</AccordionTrigger>
                        <AccordionContent>
                          Evet, ödeme talep eden veya alan herkes, Türkiye'deki emekli maaşları dahil olmak üzere yurtdışındaki tüm mal varlıklarını ve gelirlerini (kira, faiz, hisse senetleri) derhal Jobcenter’e bildirmek zorundadır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-3">
                        <AccordionTrigger>Mal varlığı (Vermögen) neleri kapsar ve muaf tutulan miktarlar var mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Mal varlığı, nakit para, mevduat, kıymetli evrak, ev ve arsa mülkiyeti dahil, yurtiçinde veya yurtdışında olmasından bağımsız olarak, para ile ölçülebilir tüm varlıkları kapsar. Ancak uygun ev eşyaları, uygun bir taşıt aracı ve emeklilik güvencesi olarak belirlenmiş varlıklar (yaş başına 750 Euro) dikkate alınmaz.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-4">
                        <AccordionTrigger>Üniversite eğitimi için BAföG (Federal Öğrenimi Teşvik Yasası) alabilir miyim?</AccordionTrigger>
                        <AccordionContent>
                          Evet, BAföG'e başvurulabilir. BAföG genellikle faizsiz öğrenci devlet kredisi olup geri ödemelidir. Mültecilerde yaş sınırı yoktur, ancak mantıklı bir yeniden üniversite okuma nedeni sunulması gerekir. Sosyal Hizmetler gibi kalifiye eleman ihtiyacı olan bölümler devlet tarafından desteklenebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-5">
                        <AccordionTrigger>BAföG alabilmek için üniversiteye başladığımda Jobcenter yardımı kesilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet. Üniversiteye veya meslek eğitimine başlandığında Jobcenter yardımı otomatik olarak kesilir. Bu durumda BAföG'e başvurulması gerekir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-6">
                        <AccordionTrigger>Jobcenter'a başvuru (Antrag) nasıl yapılır ve edimler ne zaman ödenmeye başlar?</AccordionTrigger>
                        <AccordionContent>
                          Başvuru, formsuz olarak (yazılı, telefonla veya şahsen) yapılabilir, ancak gerekli belgeler sonradan ibraz edilmelidir. Ödemeler prensip olarak başvurudan önceki zamanlar için ödenmez, mümkün olduğunca çabuk bir şekilde (genellikle ayın ilk iş günü) ödenir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-7">
                        <AccordionTrigger>İşsizlik Parası II yardımı alırken yükümlülükleri yerine getirmemenin yaptırımı nedir?</AccordionTrigger>
                        <AccordionContent>
                          Gerekçesiz olarak yükümlülükleri yerine getirmemek (örneğin iş teklifini reddetmek veya randevuya uymamak) yaptırımlara yol açar. İlk ihlalde aylık temel ödemenin %30'u kesilir. İkinci tekrarında %60, sonraki her yükümlülük ihlalinde %100 kesinti uygulanır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-8">
                        <AccordionTrigger>Jobcenter'dan yardım alırken il dışına veya yurt dışına çıkış izni almalı mıyım?</AccordionTrigger>
                        <AccordionContent>
                          Hafta sonu dahil il dışına çıkış için kanunen Jobcenter'a bilgi verilmesi gerekir. Randevunuz varsa, yetişebileceğiniz mesafe sorun olmayabilir, ancak bilgi verilmezse yaptırım uygulanabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-4-9">
                        <AccordionTrigger>Taşınma masrafları Jobcenter tarafından karşılanır mı?</AccordionTrigger>
                        <AccordionContent>
                          Jobcenter, konut tedarik maliyetlerini, taşınma masraflarını ve kira depozitosunu üstlenebilir. Ancak bunun için, yeni bir evsahibi ile kontrat yapmadan önce Jobcenter'dan masrafları üstlenme taahhüdünün alınması gerekir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      V. İş Arama ve Başvuru Süreci
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-5-1">
                        <AccordionTrigger>İş ararken nelere dikkat etmeli ve başvuru belgeleri neler olmalıdır?</AccordionTrigger>
                        <AccordionContent>
                          İş başvurusu dosyasında bulunması gereken temel belgeler: İş başvuru yazısı (Anschreiben), tablolu özgeçmiş (Lebenslauf) (isteğe bağlı resimle), son okul belgesinin fotokopisi ve varsa staj/kurs belgeleri (sertifikalar). Belgelerinizi göndermeden önce gramer hatalarından kaçınmalı, Anschreiben'ı el yazısı ile imzalamalı ve belgeleri kaliteli fotokopi olarak sunmalısınız.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-2">
                        <AccordionTrigger>İş başvurularında Almanca dışında hangi dilleri bilmek avantaj sağlar?</AccordionTrigger>
                        <AccordionContent>
                          Türkçe, Kürtçe, Arapça ve İngilizce bilmek, özellikle mülteci kamplarında (Flüchtlingshilfe) çalışırken büyük bir tercih sebebidir. Hatta kamplardaki işin büyük bir kısmı rutin sorunlarla ilgili tercümanlık olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-3">
                        <AccordionTrigger>İş görüşmesinde (Vorstellungsgespräch) genellikle hangi tür sorular sorulur?</AccordionTrigger>
                        <AccordionContent>
                          Sorular genellikle ilanı nerede bulduğunuz, neden o kurumu tercih ettiğiniz, kriz yönetimi senaryoları (örneğin iki çocuk anlaşamadı, tartışma çıktı, çocuk okula gitmek istemiyor), pedagojik yaklaşımlar, güçlü yönleriniz ve kurumun beklentileri üzerine yoğunlaşır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-4">
                        <AccordionTrigger>İş görüşmesine giderken (Hospitasyon) olumlu izlenim bırakmak için ne yapılmalıdır?</AccordionTrigger>
                        <AccordionContent>
                          Kollegin'lere kendinizi sevdirmeniz, sempatik, ilgili ve yardımsever tavırlar sergilemeniz, onların yükünü paylaşabileceğinizi göstermeniz önemlidir. Çok bilmiş görünümden kaçınılmalı, her şeyi sormalı (ilgili olduğunuz anlamına gelir) ve hiçbir şeyi olumsuz olarak almamalısınız. Hospitasyon, Vorstellungsgespräch değildir, rahat olunması gerekir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-5">
                        <AccordionTrigger>İş teklifi alındığında süreç nasıl işler ve "Annahmeerklärung" nedir?</AccordionTrigger>
                        <AccordionContent>
                          Okul veya iş yeri sizi kabul ettiğinde evraklarınızı Bezirksregierung'a yollar. Onay gelirse size "Annahmeerklärung" adında bir belge yollanır. Bu belgenin imzalanması, o pozisyonu kabul ettiğinizi ve başka teklifleri reddedeceğinizi gösterir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-5-6">
                        <AccordionTrigger>Reddedilen bir iş başvurusu sonrasında Jobcenter'dan kurs talep edilebilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet. Bir işe başvurduysanız ve red aldıysanız, reddedilme sebebini gösteren yazıyı alıp Jobcenter'a vererek, eksik olan kursu talep edebilirsiniz. Jobcenter bu kursu vermek zorundadır.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-600" />
                      VI. Çalışma Alanları ve Şartları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-6-1">
                        <AccordionTrigger>Sozialarbeiter/in nerede çalışır ve görevleri nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Sozialarbeiterler, Belediyeler (Stadt/Landratsamt), Jugendamt, Dernekler (Caritas, Diakonie, DRK, AWO), hastaneler, İş Ajansı (Agentur für Arbeit) veya Jobcenter gibi birçok farklı alanda çalışabilir. Görevler genellikle yönetim/evrak işleri (Verwaltung), kira problemleri, resmi işlere yardım, sosyal hukuki destek ve danışmanlık hizmetlerini içerir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-2">
                        <AccordionTrigger>Mülteci kamplarında (Flüchtlingsunterkunft) Sosyal Betreuer/Fachkraft olarak çalışmanın temel görevleri nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Görevler arasında mültecilerin entegrasyon süreçlerini planlama ve yönetme, rutin sorunlarla ilgili tercümanlık yapma, temel destek sağlama, yoklama/kontrol, hijyen malzemeleri dağıtımı, evrak işleri ve danışanları doğru yerlere yönlendirme bulunur.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-3">
                        <AccordionTrigger>Öğretmen kökenli mezunlar için okullarda çalışmak için hangi pozisyonlar mevcuttur?</AccordionTrigger>
                        <AccordionContent>
                          NRW'de özellikle Fachkraft für Multiprofessionelle Teams (MPT) pozisyonu mevcuttur. Ayrıca Pädagogische Fachkraft veya Schulbegleiterin olarak da çalışılabilir. Bu alanlarda tecrübe edinmek (örneğin OGS'de çalışmak), Jugendamt'ta çalışmak için bir basamak olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-4">
                        <AccordionTrigger>Okullarda MPT (Multiprofessionelle Teams) çalışanının günlük işleri nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          MPT çalışanları sabahtan öğlene kadar okul derslerine yardım eder, sınıfları dolaşır, öğleden sonra kulüp çalışmalarına ve OGS’ye yardım eder. Ayrıca çocuklarla birebir konuşarak sorun tespiti yapar, aile ile ve öğretmenlerle görüşür. MPT’ler genellikle okul tatilse tatil yaparlar (yılda 28 saat üzerinden çalışılır).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-5">
                        <AccordionTrigger>Mülteci kamplarında veya Wohngruppe'da temizlik işlerini yapmak zorunda mıyım?</AccordionTrigger>
                        <AccordionContent>
                          Bazı yerlerde temizlik işleri (masa silme, mutfak/banyo düzeni) çalışanların sorumluluğu olabilir. Alman mantığında, yönetici pozisyonunda olmanın bile bu tür işleri yapmaya engel olmadığı ve rol model oluşturmanın önemli olduğu düşünülür. Ancak Sozialarbeiter'lerin temel görevi evrak işlerini yönetmektir, ayak işleri genelde Ausbildung öğrencilerine yaptırılır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-6">
                        <AccordionTrigger>Sozialarbeiter olarak kariyer gelişimi için hangi uzmanlık eğitimleri (Weiterbildung) alınabilir?</AccordionTrigger>
                        <AccordionContent>
                          Kariyerde ilerlemek için Faydalı Weiterbildung alanları şunlardır: Çeşitlilik Yönetimi (Diversity Management), Aile Danışmanlığı (Familienberatung), Rehabilitasyon Ek Fonksiyonları (Reha Zusatzfunktionen), Sosyal Alan Odaklı Yaklaşım (Sozialraumorientierung) ve Danışmanlık (Beratung).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-6-7">
                        <AccordionTrigger>Jugendamt'ta çalışmak neden kariyer hedefidir?</AccordionTrigger>
                        <AccordionContent>
                          Çünkü birçok sosyal hizmet çalışanı, Jugendamt'ta çalışmak ve işin sadece Pedagojik (Eğitimsel) kısmında bulunmak için çabalar. Bu pozisyonlara ulaşmak sabır ve deneyim gerektirir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Euro className="w-5 h-5 text-indigo-600" />
                      VII. Maaş ve Gönüllü Çalışma (BFD / Praktikum)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-7-1">
                        <AccordionTrigger>Sosyal alanda Fachkraft (Uzman) maaşları ne kadardır?</AccordionTrigger>
                        <AccordionContent>
                          Maaşlar kuruma ve eyalete göre değişir. Mülteci kamplarında Fachkraft brüt maaşı yaklaşık 3100-3600 Euro civarında olabilir. Kamplar kalıcı ise (ZUE), maaşlar daha düşük (3100 Euro) olabilirken, geçici barınma yerleri (NU) 3600 Euro brüt verebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-2">
                        <AccordionTrigger>Sosyal Betreuer (Destek Personeli) net maaşları ne kadardır ve Fachkraft ile maaş farkı nedir?</AccordionTrigger>
                        <AccordionContent>
                          39 saat tam zamanlı (Vollzeit) çalışan bir Sozialbetreuer'in net maaşı 1800-2200 Euro arasında değişebilir. Fachkraft ile Betreuer arasındaki brüt maaş farkı yaklaşık 400 Euro civarında olabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-3">
                        <AccordionTrigger>Üniversite mezunu olan (Quereinsteiger) sosyal destek personelleri, üniversite mezunu olmayanlara göre ne kadar fazla maaş alır?</AccordionTrigger>
                        <AccordionContent>
                          Üniversite mezunu olan Fachkraft olmasa dahi, normal Sozialbetreuer'lara göre 150-200 Euro fazla brüt maaş alabilir, bu iş verenin inisiyatifine bağlıdır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-4">
                        <AccordionTrigger>Bundesfreiwilligendienst (BFD) tam olarak nedir ve Sozialarbeiter adayı için faydaları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          BFD, genellikle 1 yıl süren, gönüllü sosyal hizmet programıdır. Hiç tecrübesi olmayanlar için iş ortamını tanımak, mesleki Almancayı geliştirmek, CV'yi güçlendirmek ve profesyonel deneyim kazanmak açısından çok faydalı bir başlangıçtır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-5">
                        <AccordionTrigger>BFD/FSJ için yaş sınırı var mıdır?</AccordionTrigger>
                        <AccordionContent>
                          BFD için üst yaş sınırı yoktur. 27 yaş altı katılımcılar genellikle tam zamanlı, 27 yaş ve üzerindekiler ise haftada en az 20 saat yarı zamanlı çalışabilirler.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-6">
                        <AccordionTrigger>Gönüllü çalışmalar (Ehrenamtlich) işe alımda nasıl bir etki yaratır?</AccordionTrigger>
                        <AccordionContent>
                          Gönüllü çalışmalar (özellikle Caritas ve Rote Kreuz gibi kurumlarda) işe alımda büyük rol oynar. İşverenler için adayın tecrübeli ve istekli olduğunu gösteren çok önemli bir referans evraktır. Mülteci kampında gönüllü tercümanlık yapmak, işe alımı çok etkilemiştir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-7">
                        <AccordionTrigger>Anerkennungsjahr (Tanıma Yılı) nedir ve Sozialarbeiter adayları için zorunlu mudur?</AccordionTrigger>
                        <AccordionContent>
                          Anerkennungsjahr, yurtdışından gelenlerin (veya bazı eğitimleri tamamlayanların) tam mesleki yetkinlik kazanmak için yapması gereken, genellikle 1 yıl süren pratik uygulama dönemidir. Denklik sürecinin bir parçası olarak eksik görülen uygulama deneyimini tamamlamak amacıyla talep edilebilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-7-8">
                        <AccordionTrigger>Anerkennungsjahr sırasında ne kadar maaş alınır?</AccordionTrigger>
                        <AccordionContent>
                          Tam kadrolu çalışanlardan daha düşük bir maaş ödenir. Sosyal hizmetler alanında bu maaş 1.500 € ile 2.200 € civarında olabilir veya TVöD P tarifesi üzerinden 1100-1400 Euro arasında değişebilir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <School className="w-5 h-5 text-indigo-600" />
                      VIII. Öğretmenlik ve Quereinsteiger (Alan Dışından Geçiş)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-8-1">
                        <AccordionTrigger>Öğretmenlik mezunları (PDR, Sınıf Öğretmeni, İlahiyat, Edebiyat vb.) Sozialarbeiter olarak tam denklik alabilirler mi?</AccordionTrigger>
                        <AccordionContent>
                          Hayır, öğretmenlik diploması ile Sozialarbeiter unvanını almak mümkün değildir, bu kesindir. Ancak pedagojik eğitim ve geçmiş tecrübe sayesinde Pedagojik Uzman (Pädagogische Fachkraft) olarak rahatça iş bulma imkanı vardır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-8-2">
                        <AccordionTrigger>Sınıf Öğretmenliği mezununun Sozialarbeiter olarak çalışabilmesi için tecrübe şartı nedir?</AccordionTrigger>
                        <AccordionContent>
                          Eğer Türkiye'de öğretmenlik mezunu iseniz ve Almanya'da 2-3 yıllık sosyal alanda iş tecrübeniz varsa, belediyeler tamamen kendi inisiyatifleriyle sizi Sozialarbeiter olarak işe alabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-8-3">
                        <AccordionTrigger>Mühendislik veya İktisat mezunları Sozialbetreuer olarak çalışabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet, mühendislik veya iktisat (İşletme) mezunu olup Sozialbetreuer veya Grundbetreuer olarak kamplarda çalışanlar mevcuttur. Üniversite mezunu olmak, Sozialbetreuer maaşı skalasında bile artış sağlayabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-8-4">
                        <AccordionTrigger>Alan dışından (Quereinsteiger) Sozialarbeiter olarak çalışırken kariyerde yükselme şansı var mıdır?</AccordionTrigger>
                        <AccordionContent>
                          Eğer tam Sozialarbeiter unvanınız yoksa, terfi şansınız az olabilir ve maaşınız düşük kalabilir. Ancak ilerleme fırsatı için üniversite okumanız tavsiye edilir. Bazı işverenler (Träger) ise, alandaki tecrübeniz (1-2-3 yıl) ve insiyatifleri sayesinde tam tanıma (Voll Anerkennung) imkanı sunabilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-8-5">
                        <AccordionTrigger>İlahiyat mezunu ve formasyon sahibi biri okullarda nasıl bir unvanla çalışabilir?</AccordionTrigger>
                        <AccordionContent>
                          İlahiyat mezunları, pedagojik formasyonları ve Türkiye'deki hizmet dökümleriyle birlikte (Meslek Dersi Öğretmenliği gibi), okullarda Pädagogische Fachkraft olarak kabul edilmiştir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-indigo-600" />
                      IX. Yurtdışı/AÖF Eğitim ve Dil Zorlukları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-9-1">
                        <AccordionTrigger>Türkiye'de AÖF ön lisans Çocuk Gelişimi veya Sosyal Hizmetler okumak Almanya'da geçerlilik açısından hangisi daha iyidir?</AccordionTrigger>
                        <AccordionContent>
                          Sosyal Hizmetler bölümü alanı daha geniş olduğu için daha doğru bir seçim olabilir. Çocuk Gelişimi alanının karşılığını almak Almanya'da zor olabilir, çünkü anaokulu öğretmenliği eğitimi burada üniversitede değil, çalışarak alınan bir eğitimdir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-9-2">
                        <AccordionTrigger>Asyl (İltica) statüsünde olan kişiler Türkiye'de AÖF okuyabilir mi?</AccordionTrigger>
                        <AccordionContent>
                          Evet, Asyl oturumu ve C1 varsa okunabilir. Ancak T.C. vatandaşları için kayıt belgelerinin T.C. Konsoloslukları tarafından onaylanması gerektiğinden, konsolosluğa gitmenin iltica edenler için riskli olduğu (oturumu iptal edilebilir) belirtilmiştir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-9-3">
                        <AccordionTrigger>Dil seviyesi düşük olan kişilerin (B1/B2) Sozialarbeiter/Fachkraft olarak çalışması zorlayıcı olur mu?</AccordionTrigger>
                        <AccordionContent>
                          Evet, dil seviyesi yeterli olmayanlar (B1/B2) bu işte çalışırken çok yorulur. Özellikle hukuk dersleri (Fachliteratur) terminolojisi çok ağırdır. Ancak bazı kurumlar, eleman bulmakta zorlandıkları için dil bariyeri olan eğitimli kişilerin tecrübesinden faydalanmayı hedefler.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-9-4">
                        <AccordionTrigger>Üniversite okumaya B2 dil seviyesi ile başlamak mantıklı mı?</AccordionTrigger>
                        <AccordionContent>
                          Dersleri ve hukuki terminolojiyi iyi anlamak için C1 tavsiye edilir. Ancak B2 ile alan özel üniversiteler de vardır. Okumak zor olsa da, mezun olanlar ve iyi işlerde çalışanlar olduğu için, denemekten çekinilmemesi tavsiye edilir (olmazsa bırakılır, kayıp olmaz).
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-9-5">
                        <AccordionTrigger>Almanca bilmeyen veya İngilizce konuşan yeni çalışanlar (Ukrayna'dan gelenler) sosyal alanda iş bulabiliyor mu?</AccordionTrigger>
                        <AccordionContent>
                          Evet, bazı kurumlar (özellikle mülteci kampları) Ukrayna'dan gelen, Almancası olmayan yeni çalışanları işe almıştır. Bu kişiler ya yanlarında tercümanla ya da İngilizce konuşarak çalışmaktadır. Bu durum, sosyal alandaki personel açığının büyüklüğünü göstermektedir.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-indigo-600" />
                      X. Mülakat, Psikoloji ve Kariyer
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-10-1">
                        <AccordionTrigger>Mülakatta kriz yönetimi ile ilgili ne tür sorular sorulur?</AccordionTrigger>
                        <AccordionContent>
                          Örnek senaryolar sorulur, örneğin: Çocuklar arasında tartışma çıkarsa nasıl davranılmalı, aktivite sırasında iki çocuk anlaşamazsa nasıl müdahale edilir, çocuk okula gitmek istemezse ne yapılır. Cevaplarda önemli olan, ilgilenilen grubu hesaba katmak ve pedagojik terimler kullanmaktır.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-10-2">
                        <AccordionTrigger>Sozialarbeiter/in mesleğinde çalışmanın psikolojik zorlukları nelerdir?</AccordionTrigger>
                        <AccordionContent>
                          Bu meslek, gerçekten hayatta zorluk yaşayan ve yardıma ihtiyacı olan insanlarla çalışmayı gerektirdiği için psikolojik olarak zorlayıcı olabilir. Travmatik geçmişi olan (örneğin Irak'tan gelen, ailesi öldürülmüş) çocuklarla karşılaşmak duygusal şoka yol açabilir. Sürekli sorumluluk hissiyle yaşanır, bu yüzden işten çıkınca bütün işi iş yerinde bırakmayı öğrenmek önemlidir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-10-3">
                        <AccordionTrigger>İşverenler, işe alımda deneyime mi yoksa diplomaya mı öncelik veriyor?</AccordionTrigger>
                        <AccordionContent>
                          Sosyal alanda ihtiyaç çok olduğu için diplomaya çok bakılmamaktadır; tecrübe ve birkaç referans mektubu, diplomadan çok daha önemlidir ve rahatça iş bulmaya yardımcı olur. Diploma ise maaş alırken ve terfi ederken daha çok işe yarar.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-10-4">
                        <AccordionTrigger>Uzun süre işsiz kalmış veya alan değiştirmek isteyen biri için BFD/Ehrenamt faydalı olur mu?</AccordionTrigger>
                        <AccordionContent>
                          Evet, BFD/Ehrenamt (Gönüllü çalışma), uzun süre işsiz kalanlar için harika bir fırsattır ve çalışma hayatına geri dönmek isteyenler için iyi bir adımdır. İş başvurularında bu tecrübeler takdir edilir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-10-5">
                        <AccordionTrigger>Bir öğretmen, okulda başka bir öğretmenle tartışma yaşarsa nasıl bir çözüm yolu izlemelidir?</AccordionTrigger>
                        <AccordionContent>
                          Öncelikle sakin kalmak ve durumu alevlendirmemek gerekir. Tartışmanın sebebini anlamaya çalışılmalı, gerekirse hatalıysa özür dilenmeli ve sorumluluk alınmalıdır. "Ben" dili kullanılarak açık ve net iletişim kurulmalı, suçlamadan kaçınılmalıdır. Sorun çözülemezse, müdür gibi tarafsız bir üçüncü taraf dahil edilmelidir.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-10-6">
                        <AccordionTrigger>Veli, çocuğunun notlarından şikayetçi olursa (örneğin öğretmeni suçlarsa) nasıl bir yaklaşım sergilenmelidir?</AccordionTrigger>
                        <AccordionContent>
                          Öncelikle veli dikkatlice dinlenmeli ve empati gösterilmelidir. Suçlamalara yanıt verirken durum objektif bir şekilde açıklanmalı ve çocuğun güçlü/zayıf yönleri somut örneklerle desteklenmelidir. Veli işbirliğine teşvik edilmeli ve çözüm odaklı bir tutum sergilenmelidir (ek materyal, evde çalışma ipuçları).
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
            <Card className="bg-indigo-900 text-white border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Topluluk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-indigo-100">
                  Bu rehber, Almanya'daki Türk sosyal hizmet uzmanları topluluğunun tecrübeleriyle oluşturulmuştur.
                </p>
                <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50" asChild>
                  <Link href="#tecrube-paylas">Sen de Katıl</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hızlı Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="https://www.kmk.org/zab/central-office-for-foreign-education.html" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-indigo-700 dark:text-indigo-400">
                  ZAB (Denklik)
                </Link>
                <Link href="https://www.anerkennung-in-deutschland.de/" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-indigo-700 dark:text-indigo-400">
                  Anerkennung in Deutschland
                </Link>
                <Link href="https://www.arbeitsagentur.de/" target="_blank" className="block p-3 rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-indigo-700 dark:text-indigo-400">
                  Bundesagentur für Arbeit
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog professionSlug="sozialarbeiter" defaultProfessionName="Sosyal Hizmet Uzmanı" />
      <UploadDocumentDialog professionSlug="sozialarbeiter" />
    </div>
  );
}
