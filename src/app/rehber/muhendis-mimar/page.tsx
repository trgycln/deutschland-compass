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
  HardHat,
  Ruler,
  Train,
  Landmark,
  Download,
  Eye
} from "lucide-react";
import Link from "next/link";
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { supabase } from '@/lib/supabase';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function MuhendisMimarPage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Mühendis%,profession.ilike.%Mimar%,profession.ilike.%Ingenieur%,profession.ilike.%Architekt%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);

      // Fetch documents
      const { data: docData } = await supabase
        .from('documents')
        .select('*')
        .eq('profession_slug', 'muhendis-mimar')
        .eq('status', 'approved')
        .order('created_at', { ascending: true });
      
      if (docData) setDocuments(docData);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-orange-100 text-orange-900 hover:bg-orange-200">
                Mühendislik & Mimarlık
              </Badge>
              <Badge variant="outline" className="text-orange-100 border-orange-400">
                Yüksek Talep
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Mühendisler ve Mimarlar İçin Almanya Kariyer ve Yaşam Rehberi
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Almanya'ya gelmeden önceki hazırlıklar, denklik süreçleri (ZAB, Meslek Odaları), iş arama stratejileri ve kariyer gelişimi hakkında kapsamlı rehber.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-orange-600 text-white hover:bg-orange-500 border-none" asChild>
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
            
                <ProfessionVideoPlayer professionSlug="muhendis-mimar" />

                {/* 1. Bölüm: Hazırlık */}
                <section id="baslangic" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      I. Almanya'ya Ulaşmadan Önceki Kritik Hazırlık Dönemi
                    </h2>
                  </div>

                  <Card className="mb-8 border-l-4 border-l-orange-500">
                    <CardContent className="pt-6">
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        Almanya'ya gelmeden önceki süreç, başarılı bir kariyer başlangıcı için hayati önem taşımaktadır. Bu aşama, gerekli evrakların toplanması, dil yeterliliğinin sağlanması ve erken kariyer planlamasını içerir.
                      </p>
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Scale className="w-5 h-5 text-orange-600" />
                          Yasal Zemin ve Vize Prosedürleri
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">
                          Yurt dışından bir mühendis veya mimarın Almanya'da çalışmaya başlaması için öncelikli olarak bir işyeri ile iş sözleşmesi imzalaması gerekebilir. Çalışma vizesi alabilmek için gerekli şartlardan biri, imzalanacak sözleşmede belirtilen yıllık brüt maaşın en az <strong>45.600 Euro</strong> olmasıdır. Alternatif olarak, 6 aylık iş arama vizesi (Job Seeker Visa) imkanı da bulunmaktadır.
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-orange-600" />
                          Belge Hazırlığı ve Çeviri İpuçları
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>Zorunlu Evraklar:</strong> Diploma ve transkriptlerin temin edilmesi en önemli adımdır.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>Vekalet ve Finans:</strong> Ayrılmadan önce avukata vekaletname, çocuk varsa muvafakatname, yurtdışı bankacılık ayarları ve e-devlet şifresi halledilmelidir.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>Çeviri (Übersetzung):</strong> Diploma, transkript ve hizmet dökümü gibi belgelerin yeminli tercümesi gereklidir. İngilizce diplomanın dahi çevirisi istenebilir.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span><strong>Belge Onayı (Beglaubigung):</strong> Tercüme edilen belgelerin fotokopilerine belediyede "aslı gibidir" onayı yaptırılmalıdır. Orijinal evraklar asla gönderilmemelidir.</span>
                          </li>
                        </ul>
                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" /> Jobcenter Desteği
                          </h4>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            Jobcenter'a bağlı olanlar için çeviri masrafları karşılanabilir. En az 2-3 farklı şirketten teklif (Angebot) alınması önerilir. Ücreti kendisi ödeyenler dekontları saklamalıdır; ileride geri alma ihtimali olabilir.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Languages className="w-5 h-5 text-orange-600" />
                          Dil Yeterliliği (Almanca)
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-400">
                          Mühendislik ve mimarlık kariyeri için ne kadar iyi Almanca öğrenilirse, iş hayatında o kadar kolay yol alınır ve brüt maaş (Bruttogehalt) o kadar yüksek olur.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <h4 className="font-semibold mb-2">Gerekli Seviye</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              İş hayatına başlamak için C1 şart değildir, B2 ile başlanabilir. Ancak resmi görevler için C1 gerekebilir.
                            </p>
                          </div>
                          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            <h4 className="font-semibold mb-2">C1 Tavsiyesi</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              İmkan varken C1 yapılması şiddetle tavsiye edilir. İşe başlayınca dil sorunu yaşanırsa kursa dönmek zordur.
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 italic mt-2">
                          İpucu: Sadece genel Almanca değil, mesleki Almanca (Fachsprache) çalışılmalı, bilgisayar programları Almanca kullanılmalıdır.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 2. Bölüm: Denklik */}
                <section className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <AwardIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      II. Mesleki Denklik ve Resmi Kayıt (Anerkennung)
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="zab">
                        <AccordionTrigger className="text-lg font-semibold">
                          ZAB (Zentralstelle für ausländisches Bildungswesen)
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-400">
                            ZAB, diplomaları tanıma yeri değil, değerlendirme (Zeugnisbewertung) makamıdır. Türkiye'deki diplomaların Alman makamları için değerlendirilmesini sağlar.
                          </p>
                          <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-1">
                            <li><strong>Başvuru:</strong> Elektronik ortamda yapılır.</li>
                            <li><strong>Ücret:</strong> Yaklaşık 200 Euro (Jobcenter karşılayabilir).</li>
                            <li><strong>Süre:</strong> 4-6 ay.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="kammer">
                        <AccordionTrigger className="text-lg font-semibold">
                          Meslek Odaları (Ingenieurkammer / Architektenkammer)
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <p className="text-slate-600 dark:text-slate-400">
                            Mesleki tanınma (Berufliche Anerkennung) eyaletlerdeki meslek odaları tarafından yapılır. Denklik alındığında "Mühendis" (Ingenieur) unvanı resmen kullanılabilir.
                          </p>
                          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                            <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">İmza Yetkisi</h4>
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              Bazı kritik pozisyonlarda (Bauleiter vb.) imza yetkisi için odaya kayıt zorunludur. Mimarlar için genellikle B2 Almanca ve 2 yıl deneyim istenir.
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </section>

                {/* 3. Bölüm: İş Hayatı */}
                <section className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <Briefcase className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      III. İş Hayatına Geçiş ve Destekler
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Kariyer Geliştirme (Weiterbildung)</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Alman işverenler tecrübeye odaklanır. Eksikleri tamamlamak için Jobcenter destekli eğitimler (Weiterbildung) kritiktir.
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-orange-500" />
                            <span><strong>GIS ve CAD:</strong> Allplan, Revit, SolidWorks</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-orange-500" />
                            <span><strong>BIM:</strong> İnşaat/Mimarlık için çok önemli</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-orange-500" />
                            <span><strong>Raylı Sistemler:</strong> Bauüberwacher Bahn (Yüksek talep)</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">İş Arama ve Maaş</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Maaş Beklentisi</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Yeni başlayanlar için: <strong>3.200€ - 4.000€</strong><br/>
                            Yönetici/Uzman: <strong>4.500€ - 5.000€+</strong>
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Strateji</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Düşük teklifi kabul edip deneme süresi (Probezeit) sonrası zam istemek yaygın bir stratejidir.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-slate-50 dark:bg-slate-900">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-slate-600" />
                        Devlet Destekleri
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-sm mb-1">İşe Giriş Desteği (Eingliederungzuschuss)</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Uzun süre işsiz kalanlar için Jobcenter, işverene maaş sübvansiyonu (ilk yıl %75'e kadar) verebilir.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">Başlangıç Yardımları</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Yol parası, iş kıyafeti veya güvenlik ayakkabısı gibi masraflar karşılanabilir.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>

                {/* 4. Bölüm: İlerleme */}
                <section className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      IV. İlerleme ve Özel Uzmanlık Alanları
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="self-employment">
                      <AccordionTrigger>Kendi İşini Kurma</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          Proje ofisi (Ingenieurbüro/Architekturbüro) açmak mümkündür. Elektrik mühendisleri için "Meister" şartı olsa da, mühendisler denklik (Meisterbefreiung) alabilirler.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="academic">
                      <AccordionTrigger>Akademik Kariyer ve Eğitim</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          Üniversitelerde kadro bulmak zordur. Teknik Üniversiteler (TU) daha akademik, Hochschule'ler (FH) daha piyasa odaklıdır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="tax">
                      <AccordionTrigger>Vergi İadesi (Steuererklärung)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Yol masrafları, bilgisayar, çalışma odası gibi giderler vergi iadesi ile geri alınabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>

                {/* 5. Bölüm: Sıkça Sorulan Sorular */}
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
                    {/* A. DENKLİK VE RESMİ PROSEDÜRLER */}
                    <AccordionItem value="faq-1">
                      <AccordionTrigger>Mühendis veya mimar olarak Almanya’da mesleğimi yapabilmek için denklik (Anerkennung) almam zorunlu mudur?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Evet, mimarlık ve mühendislik, Almanya'da kanunlarla düzenlenmiş (reglementiert) meslekler arasında yer almaktadır. Bu nedenle mesleki tanıma (Anerkennung) işleminin yapılması gereklidir. Ancak, bazı büyük firmalar (örneğin Airbus) işe alımda denklik sormayabilir ve işyeri kabul ettikten sonra denklik almaya hiç gerek kalmayabilir. Yine de, bazı pozisyonlar ve sorumluluklar için denklik zorunlu olabileceği için yaptırılması tavsiye edilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-2">
                      <AccordionTrigger>ZAB ve Meslek Odası (Ingenieurkammer/Architektenkammer) arasındaki fark nedir?</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-slate-600 dark:text-slate-400">
                          <p><strong>1. ZAB (Bonn):</strong> Diplomaları tanıma yeri değil, değerlendirme (Zeugnisbewertung) makamıdır. Lisans, master ve doktora kariyerinizi değerlendirir, mesleki yeterliliğinizi belirlemez.</p>
                          <p><strong>2. Meslek Odaları:</strong> Asıl mesleki tanınma (Berufliche Anerkennung) eyaletlerdeki ilgili meslek odaları tarafından yapılır. Mesleği Almanya'da hangi şartlarda yapabileceğinizi size bildirir.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-3">
                      <AccordionTrigger>ZAB'a başvurmak Meslek Odası'ndan önce mi yapılmalıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Bu durum eyalete göre değişir. Bazı danışmanlar, ileride başka memuriyetlere başvurma ihtimaline karşı ZAB'a başvurulmasını önerir. NRW gibi bazı eyaletlerde doğrudan Meslek Odası'na başvuru yapılabilir. Ancak, dosyanızı tamamlamak açısından her ikisine de başvurmak tavsiye edilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-4">
                      <AccordionTrigger>Denklik başvurusunda hangi evraklar gereklidir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Lisans, Master ve Doktora diplomalarının ve transkriptlerinin Almanca tercümelerinin, belediyede (Beglaubigung) aslı gibidir onayı yapılmış nüshaları gereklidir. Jobcenter karşılıyorsa hizmet dökümünün çevrilmesi de tavsiye edilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-5">
                      <AccordionTrigger>Diplomada 'Lisans' ibaresi geçmesi zorunlu mudur?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          ZAB, "Mühendis" ibaresini yeterli görmeyip "Lisans" ve "Yüksek Lisans" ibaresini talep edebilir. Diplomada yoksa, transkriptte bu ifade aranabilir ya da yeni Türkçe transkript alınabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-6">
                      <AccordionTrigger>Türkçe-İngilizce diploma için Almanca çeviri gerekli midir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          ZAB aşaması için Türkçe-İngilizce diploma yeterli olabilir. Ancak Jobcenter karşılıyorsa, ileride lazım olabileceği için çeviri yaptırılması tavsiye edilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-7">
                      <AccordionTrigger>Belgelerin onayı (Beglaubigung) nasıl yapılmalıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Yeminli tercüme edilen belgelerin fotokopilerine, belediyede "aslı gibidir" onayı yaptırılmalıdır. Tercüme metni ile orijinal diplomanın fotokopisi birlikte (zımbalı) tasdik ettirilmelidir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-8">
                      <AccordionTrigger>Orijinal diploma veya evrak gönderilmeli midir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Hayır, hiçbir kuruma orijinal evrak gönderilmemelidir. Tercümenin bile kopyasını göndermek yeterlidir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-9">
                      <AccordionTrigger>Diplom Ingenieur (Dipl. Ing.) unvanını kimler kullanabilir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Türkiye lisans derecesi genellikle Bachelor'a denk kabul edilir. Diplom Ingenieur eski bir Alman mezuniyetidir ve Master'a tekabül eder. Genellikle 2008 öncesi Yüksek Lisans yapmış olma şartı aranır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-10">
                      <AccordionTrigger>Gıda Mühendisliği için denklik işlemleri nasıl yapılır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          ZAB'a başvurarak diploma değerlendirilebilir. Bazı tecrübelerde Gıda Mühendisliği'nin Mühendisler Odası tarafından tanınmadığı, bu durumda ZAB değerlendirmesinin yeterli olabileceği belirtilmiştir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-11">
                      <AccordionTrigger>Peyzaj Mimarlığı için denklik ve dil şartı nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Denklik eyaletlere göre değişir. Mimarlar Odası'na kayıt için (imza yetkisi vb.) genellikle B2 Almanca seviyesi gerekmektedir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-12">
                      <AccordionTrigger>Harp Okulu mezunları nerede denklik alabilir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Genellikle sadece Bonn'daki merkezden (ZAB) Anerkennung yaptırabilirler. Ancak NRW'den (Detmold) Ingenieur Anerkennung alan tecrübeler de mevcuttur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-13">
                      <AccordionTrigger>Denklik başvurusu Red gelirse ne yapılmalıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Red kararına itiraz ederek yasal dayanak istenmelidir. İtiraz sonrası denkliğin alındığı tecrübeler mevcuttur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* B. İŞ HAYATI VE KARİYER BAŞLANGICI */}
                    <AccordionItem value="faq-14">
                      <AccordionTrigger>İşe başlamak için hangi Almanca seviyesi yeterlidir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          B2 seviyesi ile başlanabilir. Ancak C1 yapmak, mesleki zorlukları azaltmak ve daha iyi maaş almak için şiddetle tavsiye edilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-15">
                      <AccordionTrigger>İşe başlamadan önce C1 kursuna gitmek zaman kaybı mıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Hayır, işe 6 ay geç başlamak kayıp değildir. İş hayatına atılınca dil sorunu yaşanırsa kursa dönmek zorlaşır. C1 ile 500 saat daha eğitim almak seviyenizi çok geliştirecektir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-16">
                      <AccordionTrigger>Yeni mezunlar iş bulmak için hangi yolu izlemelidir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Öncelikle Weiterbildung (İleri Eğitim) almak ve sonrasında 3-6 aylık Praktikum (staj) yapmak tavsiye edilir. Alman işverenler tecrübe odaklıdır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-17">
                      <AccordionTrigger>Devlet destekli Weiterbildung seçenekleri nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Jobcenter/Agentur für Arbeit 500’e yakın online program sunar. Popüler alanlar: GIS, CAD (Allplan, Revit), BIM, IT Sertifikaları, Veri Tabanları ve Bauleiter eğitimleri.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-18">
                      <AccordionTrigger>Hangi alanlarda GIS ve CAD bilgisi iş bulmayı kolaylaştırır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          İnşaat, Harita, Şehir Planlama, Jeoloji, Ziraat ve Makine mühendisleri ile mimarlar için GIS ve CAD bilgisi çok önemlidir. Fiber optik sektöründe de yaygın aranır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-19">
                      <AccordionTrigger>Elektrik-Elektronik Mühendisleri için tavsiye edilen alanlar?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Bauüberwacher Bahn (Demiryolu Şantiye Kontrolörü) pozisyonu yüksek talep görür. Ayrıca IT ve yenilenebilir enerji alanlarında Weiterbildung yapılabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-20">
                      <AccordionTrigger>Fiber optik sektöründe Netzplaner olmak için ne gerekir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Qgis, Postqresql, Postgis ve temel Autocad bilgisi aranır. İnşaat, Harita, Jeoloji, Coğrafya mezunları tercih edilir. Başlangıç maaşı 44.000 - 52.000 Euro civarındadır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-21">
                      <AccordionTrigger>Türk firmaları mı Alman firmaları mı tercih edilmeli?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Alman firmalarına girmek için emek harcanmalı, Türk firmalarından (ödeme sorunları vb. riskler nedeniyle) uzak durulması tavsiye edilmiştir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-22">
                      <AccordionTrigger>Kimya Mühendisleri hangi pozisyonlarda çalışabilir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Biyoteknoloji firmalarında Teknik Asistan (Technische Asistant), Regulatory Affairs veya Kalite Yönetimi (Qualitätssicherung) alanlarında çalışabilirler.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-23">
                      <AccordionTrigger>Çevre Mühendisleri için tavsiyeler nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          GIS programları ve kursları (Weiterbildung) almak iş imkanlarını artırabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-24">
                      <AccordionTrigger>Bauleiter (Şantiye Şefi) sorumlulukları nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Sahadaki koordinasyon, çalışanların kontrolü, iş güvenliği (VAO), işveren/belediye koordinasyonu ve hakedişlerin yapılması sorumlulukları arasındadır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-25">
                      <AccordionTrigger>İnşaat birim fiyatlarına nereden ulaşılır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Standart bir liste yoktur. Fiyatlar HOAI ve VOB Teil A kurallarına göre hesaplanır. Benzer ihalelerin dokümanları incelenerek bilgi toplanabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* C. MAAŞ VE SOSYAL DESTEKLER */}
                    <AccordionItem value="faq-26">
                      <AccordionTrigger>Mühendisler ve mimarlar için maaş beklentisi ne olmalıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Yeni başlayanlar için 3.200 - 4.000 Euro, yönetici/uzman pozisyonları için 4.500 - 5.000 Euro brüt maaş beklenebilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-27">
                      <AccordionTrigger>Maaş pazarlığı nasıl yapılmalıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Düşük teklifi 6 aylık deneme süresi için kabul edip sonrasında zam talep etmek veya firma tanıdıkça artış beklemek yaygın stratejilerdir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-28">
                      <AccordionTrigger>Jobcenter'ın işverene sağladığı maaş desteği (Eingliederungzuschuss) nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Uzun süre işsiz kalanlar için Jobcenter maaşın büyük kısmını sübvanse edebilir. Genellikle son 3 yıl sigortalı çalışmamış olma şartı aranır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-29">
                      <AccordionTrigger>Jobcenter işe başlama masraflarını karşılar mı?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Evet, ilk 3 aya kadar yol parası, takım elbise veya güvenlik ayakkabısı gibi masrafları karşılayabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-30">
                      <AccordionTrigger>İşsizlik maaşı için ne zaman bildirim yapılmalıdır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Süresiz sözleşmesi olanlar, işten ayrılmadan en az 3 ay önce Agentur für Arbeit'e bildirim yapmalıdır. Aksi takdirde hak kaybı yaşanabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* D. ÖZEL YETKİLER VE ODA KAYITLARI */}
                    <AccordionItem value="faq-31">
                      <AccordionTrigger>Mühendisler Odası'na üye olmanın avantajı nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          En büyük avantaj imza yetkisidir. Ayrıca indirimli eğitimler ve iş arama desteği sağlar.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-32">
                      <AccordionTrigger>Mimarlar Odası'na kayıt şartları nelerdir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Genellikle B2 Almanca seviyesi ve 2 yıllık mesleki deneyim kanıtı istenir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-33">
                      <AccordionTrigger>Elektrik firması kurmak için Meister belgesi şart mı?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Genellikle evet. Ancak mühendisler Handwerkskammer'den denklik (Meisterbefreiung) almayı deneyebilirler.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-34">
                      <AccordionTrigger>Trei Schein nedir?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Elektrik mühendislerinin binaların kabulünü (Abnahme) yapabilmesi için gerekli olan, sınavla alınan bir belgedir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* E. AKADEMİK KARİYER */}
                    <AccordionItem value="faq-35">
                      <AccordionTrigger>Master ve Doktora unvanları kullanılabilir mi?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Evet kullanılabilir. Ancak bazı kişiler işe alımda "fazla kalifiye" görülmemek için doktora unvanını CV'de kullanmamayı tercih edebilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-36">
                      <AccordionTrigger>Teknik Üniversite (TU) mi Hochschule (FH) mi?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          TU daha akademik ve teorik, FH daha uygulama ve piyasa odaklıdır. Akademik kariyer düşünenler için TU avantajlı olabilir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    {/* F. GÜNLÜK YAŞAM */}
                    <AccordionItem value="faq-37">
                      <AccordionTrigger>Belge çevirisi için Jobcenter onayı nasıl alınır?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Danışmanla görüşülüp onay alınmalı, genellikle 2-3 farklı şirketten teklif sunulmalıdır. Jobcenter en uygun fiyatlı olanı tercih eder.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="faq-38">
                      <AccordionTrigger>Çeviri teslim alınırken nelere dikkat edilmeli?</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600 dark:text-slate-400">
                          Mühür basılmadan önce ders isimleri ve notlar mutlaka kontrol edilmelidir. Hatalar olabilmektedir.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>

                {/* Sonuç Analojisi */}
                <Card className="bg-gradient-to-r from-orange-600 to-orange-800 text-white border-none">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Train className="w-6 h-6" />
                      Kariyer Başlangıcı: Metro Haritası Analojisi
                    </h3>
                    <p className="leading-relaxed opacity-90">
                      Almanya'da mühendis veya mimar olmak, karmaşık bir metro haritasına bakmak gibidir. <strong>Diploma denkliği (Anerkennung)</strong> size istasyona giriş hakkı verir, ancak <strong>Almanca</strong> biletinizdir. <strong>Weiterbildung ve Stajlar</strong> ise sizi hedefinize daha hızlı ulaştıran ekspres hatlardır. Haritayı iyi okuyan (ilanları analiz eden) ve doğru aktarmaları yapanlar, istedikleri durağa ulaşacaktır.
                    </p>
                  </CardContent>
                </Card>

              </TabsContent>

              <TabsContent value="experiences">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Sizin Tecrübeniz Değerli</h3>
                      <p className="text-orange-700 dark:text-orange-300 text-sm mt-1">
                        Bu yoldan geçmiş biri olarak, tecrübelerinizi paylaşarak yeni gelenlere ışık tutabilirsiniz.
                      </p>
                    </div>
                    <ShareExperienceDialog 
                      professionSlug="muhendis-mimar" 
                      defaultProfessionName="Mühendislik / Mimarlık" 
                    />
                  </div>
                  
                  {experiences.length > 0 ? (
                    <div className="grid gap-6">
                      {experiences.map((exp) => (
                        <Card key={exp.id} className="overflow-hidden border-l-4 border-l-orange-500">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                  <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {exp.is_anonymous ? 'Anonim Çalışan' : exp.full_name}
                                  </h3>
                                  <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Calendar className="h-3 w-3" />
                                    <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                                  </div>
                                </div>
                              </div>
                              <Badge variant="secondary" className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
                                {exp.experience_years} Yıl Tecrübe
                              </Badge>
                            </div>
                            
                            <div className="prose dark:prose-invert max-w-none">
                              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                                {exp.content}
                              </p>
                            </div>

                            {exp.company_name && !exp.is_anonymous && (
                              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <p className="text-sm text-slate-500">
                                  <span className="font-medium">Şirket:</span> {exp.company_name}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                          <Quote className="h-8 w-8 text-orange-600 dark:text-orange-400 opacity-50" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          Henüz tecrübe paylaşılmamış
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                          Bu alanda tecrübesi olan ilk kişi siz olun ve diğer adaylara yol gösterin.
                        </p>
                        <ShareExperienceDialog 
                          professionSlug="muhendis-mimar" 
                          defaultProfessionName="Mühendislik / Mimarlık" 
                        />
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Kaynak Paylaşımı</h3>
                      <p className="text-indigo-700 dark:text-indigo-300 text-sm mt-1">
                        Elinizdeki ders notlarını, sunumları veya faydalı belgeleri paylaşarak meslektaşlarınıza destek olun.
                      </p>
                    </div>
                    <UploadDocumentDialog 
                      professionSlug="muhendis-mimar" 
                    />
                  </div>
                  
                  {documents.length > 0 ? (
                    <div className="grid gap-4">
                      {documents.map((doc) => (
                        <Card key={doc.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900 dark:text-white">{doc.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{doc.description}</p>
                                <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                                  <span>{doc.file_type?.toUpperCase()}</span>
                                  <span>•</span>
                                  <span>{doc.file_size}</span>
                                  <span>•</span>
                                  <span>{new Date(doc.created_at).toLocaleDateString('tr-TR')}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" asChild>
                                <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button variant="ghost" size="icon" asChild>
                                <a href={doc.file_url} download>
                                  <Download className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
                      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                          <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 opacity-50" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                          Henüz belge paylaşılmamış
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md">
                          Bu alan için henüz bir belge yüklenmedi.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
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
                  <span className="font-medium">Mühendislik & Mimarlık</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Talep</span>
                  <span className="text-green-600 font-medium">Yüksek</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Dil Şartı</span>
                  <span className="font-medium">B2 (Başlangıç) / C1</span>
                </div>
                <div className="flex items-center justify-between border-b pb-3">
                  <span className="text-sm text-slate-500">Ort. Maaş (Brüt)</span>
                  <span className="font-medium">3.200€ - 5.000€+</span>
                </div>
                <div className="pt-4">
                  <h4 className="font-medium mb-3">Kritik Kelimeler</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Ingenieur', 'Architekt', 'ZAB', 'HOAI', 'BIM', 'CAD', 'Bauleiter'].map((tag) => (
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
                  Mühendislik ve mimarlık alanındaki tecrübeleriniz, yeni başlayanlar için çok değerli. Hikayenizi paylaşarak topluluğa katkıda bulunun.
                </p>
                <ShareExperienceDialog professionSlug="muhendis-mimar" defaultProfessionName="Mühendislik / Mimarlık" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </svg>
  )
}
