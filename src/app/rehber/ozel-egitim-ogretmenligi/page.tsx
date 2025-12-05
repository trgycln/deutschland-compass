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
  Stethoscope,
  Baby,
  Info,
  HelpCircle
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

export default function OzelEgitimPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Özel Eğitim%,profession.ilike.%Sonderpädagogik%')
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
                Eğitim & Pedagoji
              </Badge>
              <Badge variant="outline" className="text-blue-100 border-blue-400">
                Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Özel Eğitim Öğretmenleri İçin Almanya Rehberi
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Türkiye’den Almanya’ya göç eden Özel Eğitim Öğretmenlerinin mesleki entegrasyon ve günlük yaşam süreçlerini, göçün doğal akışını izleyerek en detaylı şekilde aktarmayı amaçlamaktadır.
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
            
            {/* 1. Bölüm: Hazırlık Süreci */}
            <section id="baslangic" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  1. Hazırlık Süreci: Dil, Denklik ve Belgeler
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-blue-600" />
                      1.1. Dil Yeterliliği ve Önemi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Yasal Zemin</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Öğretmenlik mesleğine tam denklik alarak başlamak için genellikle <strong>C1 veya C2 seviyesi</strong> dil sertifikaları zorunlu tutulmaktadır. (Örn: NRW'de C2 şartı).</li>
                        <li>Dil seviyesi, ders anlatma ve anlama stillerini kavrayabilmek için hayati önem taşır.</li>
                        <li>B2 seviyesi, asgari iletişim yetkinliklerini gerektirir. Gramer düzgünlüğüne dikkat edilmelidir.</li>
                      </ul>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-600 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Pratik Tecrübe ve İpuçları
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Daha Düşük Seviyelerle Başlangıç:</strong> Schulbegleiter (Gölge Öğretmen) veya Teilhabeassistenz gibi pozisyonlara B2 ile başvurulabilir.</li>
                        <li>Bazı okullar bu pozisyonlar için bile en az C1 isteyebilir.</li>
                        <li>Dilin aktif olarak çalışılarak veya hayata karışarak öğrenileceği unutulmamalıdır.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      1.2. Diploma Denklik Süreci (Anerkennung)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Yasal Zemin</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li>Diplomanın <strong>ZAB (Zentralstelle für ausländisches Bildungswesen)</strong> kurumuna gönderilerek değerlendirilmesi (Zeugnisbewertung) önerilir.</li>
                        <li>Özel eğitim alanında öğrenim görenler için hem Diploma Değerlendirmesi hem de Mesleki Tanınma (Berufliche Anerkennung) süreçleri mevcuttur.</li>
                        <li>Ankara Üniversitesi Özel Eğitim mezunu bir kişinin denklik sonucunu 14 ay beklediği bildirilmiştir.</li>
                      </ul>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="belgeler">
                        <AccordionTrigger>Gerekli Belgeler ve Çeviri Detayları</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <li><strong>Temel Belgeler:</strong> Lisans/master diplomaları, transkriptler, dil belgesi, Orientierungkurs belgesi. Orijinal ve onaylı fotokopiler gönderilmelidir.</li>
                            <li><strong>E-Devlet:</strong> Bazı eyaletlerde (örn. Baden-Württemberg) barkodlu E-Devlet belgeleri kabul edilebilmektedir.</li>
                            <li><strong>Ek Belgeler:</strong> Hizmet Dökümü ve Arbeitszeugnis (iş referansı) mutlaka çevrilmelidir.</li>
                            <li><strong>Sertifikalar:</strong> Zihinsel Engelliler Eğitimi Kursu (540 saat) gibi belgeler bazı eyaletlerde dikkate alınmayabilir.</li>
                            <li><strong>Çeviri İpuçları:</strong> Eğitim Fakültesi diplomasının çevirisinin <em>Erziehungswissenschaftliche Fakultät</em> yerine <strong>Sonderpädagogische Lehramt</strong> şeklinde yapılması daha faydalı olabilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: Vize ve Göç Süreci */}
            <section id="vize" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  2. Vize ve Göç Süreci
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li>Özel eğitim öğretmenleri için spesifik vize bilgisi olmamasına rağmen, genel yasal yollar geçerlidir.</li>
                    <li>Anerkennung süreci tamamlandıktan sonra <strong>Vertretungslehrer</strong> (Sözleşmeli Öğretmen) veya tam kadro (Feststelle) başvurusu yapılabilir.</li>
                    <li>Türkiye'den iş görüşmesi yaparak kabul alınması durumunda direkt gelebilme imkanı vardır.</li>
                    <li>Ehliyet çevirisi ve Aile Birleşimi gibi konularda gruplardan destek alınabilir.</li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* 3. Bölüm: Varış ve İlk Adımlar */}
            <section id="varis" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  3. Varış ve İlk Adımlar
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="w-4 h-4 text-blue-600" />
                      Uyum ve Sosyal Destek
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                      <strong>Integrationslotse</strong> ve <strong>Seelsorge</strong> gibi uzmanlar bilgilendirme ve moral desteği sağlar.
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Alman eğitim sistemini anlatan ücretsiz Türkçe bilgilendirme etkinliklerine katılabilirsiniz.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      İstihdam ve Yaşam
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>Jobcenter/Arbeitsagentur aracılığıyla devlet destekli Online Eğitim Programları (Weiterbildung) mevcuttur.</li>
                      <li>Ücretli işe başlandığında Jobcenter'a bildirim zorunludur.</li>
                      <li>Ev bulma zorluğu için yerel inisiyatiflerden destek alınabilir.</li>
                      <li>Gönüllü (Ehrenamtlich) çalışma deneyim için iyi bir alternatiftir.</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Bölüm: Kariyer ve Entegrasyon */}
            <section id="kariyer" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  4. Almanya'da Kariyer ve Mesleki Entegrasyon
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-blue-600" />
                      4.1. Mesleki Statüler ve Kadrolar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Beamter (Kadrolu)</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Türkiye'deki kadrolu öğretmenlik karşılığıdır. Geniş haklar ve yüksek maaş. Çift branş mezuniyeti ön koşuldur.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Vertretungslehrer</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Sözleşmeli/Vekil öğretmenlik. Belirli süre için çalışılır. Almanca, Sanat veya destek dersleri verilebilir.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg bg-slate-50 dark:bg-slate-900">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Fachkraft / MPT</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Çok profesyonelli ekiplerde uzman personel kadrosudur. 2021'den beri mevcuttur.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Baby className="w-5 h-5 text-blue-600" />
                      4.2. İlk Adım Pozisyonları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="hospitation">
                        <AccordionTrigger>A. Hospitation (Gözlem) ve Praktikum (Staj)</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p><strong>Hospitation:</strong> Resmi değildir, alanı keşfetme ve dil öğrenme amaçlıdır. Haftada birkaç saat veya 2-3 gün sürebilir.</p>
                            <p><strong>Praktikum:</strong> Daha resmi bir süreçtir. Förderschulelerde 1 ay veya daha uzun sürebilir.</p>
                            <p><strong>Faydaları:</strong> Okul işleyişini öğrenme, dil gelişimi, iş teklifi alma imkanı.</p>
                            <p><strong>Başvuru:</strong> Integrativer Kindergarten veya Förderschulelere doğrudan başvurulabilir. Lebenslauf (özgeçmiş) ile gidilmelidir.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="schulbegleiter">
                        <AccordionTrigger>B. Schulbegleiter / Teilhabeassitenz (Gölge Öğretmen)</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p><strong>Görevi:</strong> Engelli veya uyum sorunu olan öğrencilere birebir destek sağlamak. Ders anlatma görevi %99 yoktur.</p>
                            <p><strong>Dikkat Edilmesi Gerekenler:</strong> Çocuklara dokunma, kızma veya tepki verme konusunda aşırı dikkatli olunmalıdır. Telefon yasaktır.</p>
                            <p><strong>Maaş:</strong> Saat ücreti 14-17 Euro civarındadır. Sabit maaşlı sözleşmeler de olabilir.</p>
                            <p><strong>İşe Alım:</strong> Jobcenter yönlendirmesiyle Weiterbildung sonrası veya aracı şirketler (Therapon24, Lebenshilfe vb.) üzerinden.</p>
                            <p><strong>Dil Şartı:</strong> B2 seviyesi ile başlanabilir.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      4.3. Uzman Kadrolar ve Alternatifler
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="mpt">
                        <AccordionTrigger>A. Multiprofessionelles Team (MPT)</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p><strong>Kadro:</strong> Fachkraft kadrosudur, süresiz sözleşmeli (unbefristet) çalışılır.</p>
                            <p><strong>Maaş:</strong> TVL 10 grubundadır (Brüt ~3600 Euro). Tam zamanlı çalışma 41 saattir.</p>
                            <p><strong>Şartlar:</strong> Pedagojik eğitim almış olmak yeterlidir, dil sertifikası zorunluluğu yoktur.</p>
                            <p><strong>Görevler:</strong> Team teaching, bireysel çalışma, destek planı hazırlama, nöbet, veli toplantısı.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="forderschule">
                        <AccordionTrigger>B. Förderschule (Özel Eğitim Okulu)</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p><strong>Ortam:</strong> Sınıflar 7-8 öğrenciden oluşur. 2 öğretmen + stajyer/gölge öğretmen bulunur.</p>
                            <p><strong>Odak Alanları:</strong> Öğrenme, Zihinsel Gelişim, Duygusal/Sosyal Gelişim, İşitme, Görme, Fiziksel, Dil ve Otizm.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="alternatif">
                        <AccordionTrigger>C. Alternatif Programlar</AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                            <p><strong>Lehrkräfte Programları (OBAS/PE/ILF):</strong> Öğretmenlerin sisteme kazandırılması içindir. Referendariat süreci 1.5 yıl sürebilir.</p>
                            <p><strong>Erzieher/in:</strong> Kindergarten veya Integrativer Kindergartenlarda çalışılabilir.</p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-blue-600" />
                      4.4. İş Arama ve Başvuru
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">İlan Portalları (NRW)</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>LOIS.NRW:</strong> Kalıcı kadrolar (PE, OBAS).</li>
                          <li><strong>ANDREAS:</strong> MPT, Fachlehrer, Sosyal Pedagoglar.</li>
                          <li><strong>VERENA NRW:</strong> Geçici/Sözleşmeli kadrolar.</li>
                          <li><strong>Genel:</strong> Indeed, StepStone, LinkedIn.</li>
                        </ul>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Mülakat İpuçları</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Initiativbewerbung:</strong> Spontan başvuru etkilidir.</li>
                          <li><strong>Hazırlık:</strong> Detaylı Türkçe Anschreiben hazırlayıp çevirin. Prova yapın.</li>
                          <li><strong>Konular:</strong> Inklusion, Differenzierung, Sınıf Yönetimi (Ring Modell), Veli İletişimi.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      4.5. Özel Eğitim Gereksinimli Çocuklar ve Destek
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Almanya'da özel eğitim alanında ciddi bir açık vardır. Tanı süreçleri (Disleksi, Otizm vb.) uzun sürebilir.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Tanı ve Destek</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Disleksi:</strong> Jobcenter'dan Nachhilfe desteği alınabilir.</li>
                          <li><strong>Otizm:</strong> Yapılandırılmış ortam, görsel destek, net iletişim.</li>
                          <li><strong>DEHB:</strong> Net yapılar, rutin, kısa talimatlar, ödül sistemleri.</li>
                        </ul>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Kurumlar</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          VDK gibi sosyal kurumlar hak takibi konusunda yardımcı olabilir. Erken destek (Frühförderung) önemlidir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 5. Bölüm: Ek Bilgi */}
            <section id="ek-bilgi" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  5. Ek Bilgi ve Ağ Kurulumu
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <h4 className="font-semibold text-slate-900 dark:text-white">Diğer Kariyer Fırsatları</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Özel eğitim alanında kariyer yapamayanlar için alternatifler: Seelsorge, Sozialarbeiter, Erzieher/in, Altenpflege, Lokführer, IT, Mühendislik vb.
                  </p>
                  
                  <h4 className="font-semibold text-slate-900 dark:text-white mt-4">Ağ Oluşturma</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>IDEAL AKADEMİ GRUPLARI</strong> gibi platformlar; Anerkennung, Ausbildung, Schulbegleiter ve çeşitli branş öğretmenleri grupları ile bilgi ve tecrübe paylaşımı sağlar.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 6. Bölüm: SSS */}
            <section id="sss" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  6. Sıkça Sorulan Sorular (SSS)
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {/* 1. Dil Yeterliliği */}
                <AccordionItem value="sss-1" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Özel eğitimde öğretmenlik için C1/C2 Almanca şart mı?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Evet, kadrolu öğretmenlik (Beamter) ve tam denklik için genellikle C1 veya C2 (örn. NRW) şarttır. Dil sadece belge değil, iletişim ve ders anlatımı için hayati önem taşır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-2" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      B2 seviyesi ile öğretmenlik yapılabilir mi?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    B2 belge olarak bazı durumlarda yeterli sayılsa da, pratik yetkinlik (anlama, anlatma, gramer) çok önemlidir. B2 ile genellikle Schulbegleiter gibi yardımcı pozisyonlara başlanması önerilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-3" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Denklik için hangi belgeler gereklidir?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Lisans/Master diplomaları, transkriptler, dil belgesi, Orientierungskurs belgesi ve ZAB değerlendirmesi (Zeugnisbewertung) temel belgelerdir. Hizmet dökümü ve iş referansları da çevrilmelidir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-4" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Schulbegleiter (Gölge Öğretmen) ne iş yapar?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Görevi tamamen çocuğa bağlıdır (not alma, sakinleştirme vb.). Ders anlatma yükümlülüğü %99 yoktur. Sınıf öğretmenine yardımcı olur.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-5" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Hospitation (Gözlem) nedir ve nasıl başvurulur?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Resmi olmayan, 2-3 günlük gözlem sürecidir. Okulu tanıma ve dil pratiği için faydalıdır. Okullara doğrudan başvurulabilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-6" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      MPT kadrosunun avantajları nelerdir?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Süresiz sözleşme, TVL-10 maaş (Brüt ~3600€), uzun tatiller ve not verme sorumluluğunun olmaması gibi avantajları vardır.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-7" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Sınıfta davranış problemleriyle nasıl başa çıkılır?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Ring Modell (Halka Modeli) uygulanır: 1. Önleme (Kurallar/Rutin), 2. Erken Müdahale (Sessiz uyarı), 3. Doğrudan Müdahale (Net uyarı/Deeskalasyon).
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-8" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Otizmli öğrenciler için hangi stratejiler önerilir?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Yapılandırılmış ortam, görsel destekler, basit/net iletişim, duyusal hassasiyetlere dikkat etme ve sosyal hikayeler kullanılması önerilir.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sss-9" className="border rounded-lg px-4 bg-white dark:bg-slate-900">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <span className="text-left font-semibold text-slate-900 dark:text-white">
                      Kendi alanım dışında hangi işleri yapabilirim?
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4">
                    Erzieher/in, Sosyal Çalışmacı, Yaşlı Bakımı, Entegrasyon Kursu Öğretmenliği veya Ausbildung ile tamamen farklı sektörlere (IT, Lojistik vb.) geçiş yapılabilir.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

              </TabsContent>

              <TabsContent value="experiences">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h3>
                  <ShareExperienceDialog 
                    professionSlug="ozel-egitim-ogretmenligi"
                    defaultProfessionName="Özel Eğitim Öğretmeni"
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
                    professionSlug="ozel-egitim-ogretmenligi"
                  />
                </div>
                <DocumentSection professionSlug="ozel-egitim-ogretmenligi" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="text-blue-900 dark:text-blue-100">Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#baslangic" className="block p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300 transition-colors">
                  1. Hazırlık Süreci
                </Link>
                <Link href="#vize" className="block p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300 transition-colors">
                  2. Vize ve Göç
                </Link>
                <Link href="#varis" className="block p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300 transition-colors">
                  3. Varış ve İlk Adımlar
                </Link>
                <Link href="#kariyer" className="block p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300 transition-colors">
                  4. Kariyer ve Entegrasyon
                </Link>
                <Link href="#ek-bilgi" className="block p-2 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-300 transition-colors">
                  5. Ek Bilgi
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Faydalı Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://www.kmk.org/zab/central-office-for-foreign-education.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Globe className="w-4 h-4" />
                  ZAB (Denklik)
                </a>
                <a href="https://www.schulministerium.nrw/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Building2 className="w-4 h-4" />
                  Schulministerium NRW
                </a>
                <a href="https://www.lois.nrw.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Briefcase className="w-4 h-4" />
                  LOIS.NRW
                </a>
                <a href="https://www.verena.nrw.de/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <Briefcase className="w-4 h-4" />
                  VERENA NRW
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
