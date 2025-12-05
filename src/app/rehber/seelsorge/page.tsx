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
  UserPlus,
  Stethoscope
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

export default function SeelsorgePage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Seelsorge%,profession.ilike.%Manevi%,profession.ilike.%Rehberlik%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-violet-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-violet-100 text-violet-900 hover:bg-violet-200">
                Sosyal & Sağlık
              </Badge>
              <Badge variant="outline" className="text-violet-100 border-violet-400">
                Manevi Destek
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Almanya'da Seelsorge (Manevi Rehberlik)
            </h1>
            <p className="text-xl text-violet-100 mb-8 leading-relaxed">
              Manevi bakım, psikososyal destek, kriz yönetimi ve rehberlik alanında kariyer ve yaşam rehberi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-violet-900 hover:bg-violet-50" asChild>
                <Link href="#baslangic">Hemen Başla</Link>
              </Button>
              <Button size="lg" className="bg-violet-700 text-white hover:bg-violet-600 border-none" asChild>
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
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  1. Hazırlık Süreci ve Yeterlilik
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-violet-600" />
                      1.1. Mesleki Yeterlilik ve Denklik
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Akademik ve Formel Şartlar</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Akademik Temel:</strong> İlahiyat, İslam Bilimleri veya benzeri alanda Yüksek Lisans/Diploma.</li>
                        <li><strong>Seelsorge Eğitimi:</strong> "Grundausbildung" veya "Weiterbildung" olarak formel eğitim ve süpervizyon tecrübesi şarttır.</li>
                        <li><strong>Belgeleme:</strong> Cemiyet, dernek veya kurumdan alınan, yapılan işleri detaylandıran yazılı belge.</li>
                      </ul>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="denklik">
                        <AccordionTrigger>Denklik ve Belge Hazırlığı</AccordionTrigger>
                        <AccordionContent>
                          <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-2">
                            <li><strong>ZAB Değerlendirmesi:</strong> Diplomaların ZAB'da (Zeugnisbewertung) değerlendirilmesi işe kabulde büyük rol oynar.</li>
                            <li><strong>Çeviri:</strong> Diploma, transkript ve hizmet dökümü Almanca'ya çevrilmelidir. Çevirilerde ders/meslek isimlerinin doğruluğu kontrol edilmelidir.</li>
                            <li><strong>Maliyet:</strong> Denklik için yapılan masraflar (red alınsa bile), oturum alındıktan sonra Jobcenter'dan talep edilebilir.</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Languages className="w-5 h-5 text-violet-600" />
                      1.2. Dil Yeterliliği
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Gereksinimler</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          <strong>Asgari:</strong> B2 seviyesi.
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <strong>İdeal:</strong> İlanlarda genellikle C1 seviyesi istenir. Aile, doktor ve kurumlarla iletişim için yüksek dil becerisi şarttır.
                        </p>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Mali Hazırlık</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Türkiye'deki mal varlığı ve emekli maaşı gizlenmemelidir. Almanya'dan takip edilebilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 2. Bölüm: İş Hayatı */}
            <section id="is-hayati" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <Briefcase className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  2. İş Hayatına Giriş ve Kariyer
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-violet-600" />
                      2.1. Kariyer Alanları
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Çalışma Alanları</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Maaşlı çalışma imkanları sınırlı olsa da, Hapishane ve Ordu gibi kurumlarda anayasal haklar gereği Müslüman Seelsorger alımı yapılmaktadır.
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Cezaevi Seelsorger'i:</strong> Bireysel görüşme, Cuma namazı, danışmanlık.</li>
                        <li><strong>Gönüllü (Ehrenamtlich):</strong> Hastane, bakım evleri ve cemiyetlerde gönüllü hizmet.</li>
                        <li><strong>Okul:</strong> Din dersi öğretmenleri, okul idaresi talebiyle Seelsorge hizmeti verebilir.</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Giriş Kapısı: Schulbegleiter</h4>
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        Yüksek dil yeterliliği ve denklik belgesi olanlar için "Schulbegleiter" (Okul Destek Elemanı) gibi pozisyonlar, sisteme giriş için bir basamak olarak değerlendirilebilir.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-violet-600" />
                      2.2. Mülakat ve İşe Alım
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="mulakat-sorulari">
                        <AccordionTrigger>Örnek Mülakat Soruları</AccordionTrigger>
                        <AccordionContent>
                          <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                            <li>Kendinizi tanıtınız.</li>
                            <li>Seelsorge kavramı sizce ne demektir?</li>
                            <li>Hangi Seelsorge alanına ilgi duyuyorsunuz?</li>
                            <li>Şu an ne iş yapıyorsunuz, kariyer planınız nedir?</li>
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Başvurular bittikten yaklaşık 8-10 gün sonra sonuç bildirilir. Master ve ZAB denkliği olanların atanma şansı yüksektir.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 3. Bölüm: Mesleki Çerçeve */}
            <section id="mesleki-cerceve" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <Brain className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  3. Mesleki ve Teknik Çerçeve
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-violet-600" />
                      3.1. Psikolojik ve Felsefi Yaklaşım
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Seelsorger, tedavi veya terapi yapmaz; empati ve sevgi ile dinleyerek "moral terapisi" uygular.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">SFBT (Çözüm Odaklı Kısa Terapi)</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Buldurma:</strong> Doğru cevabı kişiye buldurmak.</li>
                          <li><strong>Ölçekleme:</strong> Korkunun gerçekleşme ihtimalini puanlatmak.</li>
                          <li><strong>Geçmişe Odaklanmama:</strong> Çözüm her zaman problemle ilgili olmayabilir.</li>
                        </ul>
                      </div>
                      <div className="border p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Manevi Başa Çıkma</h4>
                        <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                          <li><strong>Varoluşsal Destek:</strong> Hayata anlam katarak ümitsizliği kırmak.</li>
                          <li><strong>Manevi Gıda:</strong> Ruhun farklı kabiliyetlerini (akıl, kalp vb.) beslemek.</li>
                          <li><strong>Rehber Edinme:</strong> Bir bilenin görüşüne başvurmak.</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-violet-600" />
                      3.2. Kriz ve Travma (RSPD)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Acil Durum Müdahalesi</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Afet ve kriz durumlarında toplumsal bağların yeniden inşası hedeflenir.
                      </p>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>Dini Liderlerle İşbirliği:</strong> Yerel liderler ve şifacılarla iletişim kurulmalıdır.</li>
                        <li><strong>Zararlı Uygulamalar:</strong> İnsan haklarına aykırı ritüeller (şiddet, aç bırakma vb.) engellenmelidir.</li>
                        <li><strong>Psikolojik İlk Yardım (PİY):</strong> Temel ihtiyaçları karşılama, dinleme ve zorlamadan destek olma.</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 4. Bölüm: Sosyal İletişim */}
            <section id="sosyal-iletisim" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <Globe className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  4. Yaşam ve Sosyal İletişim
                </h2>
              </div>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Etik Kurallar</h4>
                      <ul className="list-disc list-inside text-sm text-slate-600 dark:text-slate-400 space-y-1">
                        <li><strong>KVKK:</strong> Kişisel verilerin (fotoğraf, telefon vb.) paylaşımı yasaktır.</li>
                        <li><strong>İletişim:</strong> Hakaret, polemik ve izinsiz reklam yasaktır.</li>
                        <li><strong>Telif:</strong> Telif hakkı olan materyaller paylaşılmamalıdır.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Kültürel Uyum</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Gurbette bayram ve manevi günler daha derin yaşanır. Müslümanların kutlamalarında taşkınlık olmaz.
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Seelsorger'lar, afetten etkilenen herkesin haklarını gözetmek ve savunmakla yükümlüdür.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Sıkça Sorulan Sorular */}
            <section id="sss" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl">
                  <HelpCircle className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Sıkça Sorulan Sorular
                </h2>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">Seelsorge nedir ve resmi bir meslek midir?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Seelsorge (Manevi Bakım Rehberi), yaşamın anlamı ve sonu hakkındaki sorular için irtibat kişileri anlamına gelir ve bu konuda bilgili moral vaizleri olarak tanımlanır.</p>
                      <p>Mesleğin resmiyeti, hapishane ve ordu gibi kurumlardaki Müslüman personel ve mahkumların dini isteklerinin Anayasal Temel Hak olarak görülmesi nedeniyle eyalet veya ilgili kurumlar özel bütçe ayırırsa ilanla dönem dönem (çok sık olmamakla birlikte) açılan pozisyonlarla sağlanır.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">Seelsorge hangi alanlarda ve nerelerde yapılır?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Maaşlı çalışma imkanı henüz çok sınırlı olup, ilanla alım yapılan en net alanlar hapishaneler ve ordu gibi kurumsal yerlerdir.</p>
                      <p>Gönüllü (ehrenamtlich) olarak ise hastane, Müslüman bakım evleri ve hapishaneler gibi yerlere, cemiyetlerden talep edildiği takdirde görevli olarak gidilebilir.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">Seelsorger’in yaşlı bakımındaki (Betreuung) rolü nedir?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Seelsorger, yaşlılıkta sıkça sorulan yaşamın anlamı ve ölüm sonrası yaşam (mutlak var olma) gibi sorular için irtibat kişisidir.</p>
                      <p>Bu meslekteki büyük hassasiyet, yaşlıya hakkaniyet sağlamak adına moral verme noktasında bol bol dinlemek ve yormadan, sıkmadan, kısa ama isabetli bilgiler vermektir.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">Seelsorge hizmeti verilirken psikolojik tedavi yapılır mı?</AccordionTrigger>
                  <AccordionContent>
                    <p>Hayır. Amaç, psikolojik tedavi-terapi yapmadan ve ilahiyat bilgisi yüklemesi yapmadan, empati ve sevgi ile mümkün olduğunca yaşlıyı dinleyerek bir çeşit moral terapisi yapmaktır.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">Seelsorge mesleğinin genel şartları nelerdir?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Minimum B2 dil seviyesi (ancak ilanlarda genellikle C1 istenir ve belgelenmesi beklenir).</li>
                      <li>İslamî İlahiyat, İslam Bilimleri veya benzeri bir alanda yüksek lisans/diploma derecesine sahip olmak.</li>
                      <li>Mutlaka "Seelsorge Formel Eğitimi" (Grundausbildung veya Weiterbildung) ve "Supervision" ile uygulama tecrübesi sahibi olmak.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left">İslam ilahiyatı eğitimi almayanlar Seelsorge yapabilir mi?</AccordionTrigger>
                  <AccordionContent>
                    <p>Başka bölüm mezunu ise, İslam ilahiyat bilgisini belgelemesi gerekir.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-left">Seelsorge uygulama tecrübesi nasıl belgelenmelidir?</AccordionTrigger>
                  <AccordionContent>
                    <p>Bağlı olunan veya gönüllü katılım sağlanan cemiyet, dernek, kurum veya camiadan (Sivil Toplum Kurumu’ndan) yazılı bir belge ile kanıtlanmalıdır. Bu belgede, kişinin söz konusu STK’da İslami Seelsorge’ye ait neler yapabildiğinin belirtilmesi gerekir.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-left">Almanya dışından alınan Seelsorge sertifikası geçerli midir?</AccordionTrigger>
                  <AccordionContent>
                    <p>Bu alan çok yeni olduğu için, Almanya dışından alınan Seelsorge sertifikasının bir işe yaramama ihtimali yüksektir. Almanya’daki herhangi bir dernekten alınan belge daha ciddiye alınabilir.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-left">Din Dersi Öğretmeni okulda Seelsorge hizmeti verebilir mi?</AccordionTrigger>
                  <AccordionContent>
                    <p>Eğer bir kişi Din Dersi Öğretmeni olarak bir okulda çalışıyorsa ve Seelsorge üzerine eğitimi/belgesi varsa, okul idaresi tarafından özellikle göçmen/Müslüman öğrenciler için hizmet vermesi istenebilir.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-left">Kariyer ilerlemesi ve atanma için ne tavsiye edilir?</AccordionTrigger>
                  <AccordionContent>
                    <p>Master yapıldıktan ve ZAB’tan denklik alındıktan sonra mülakatlara hazırlanarak atanmanın çok rahat olacağı düşünülmektedir. Mülakatlara tecrübeli kişilerle hazırlanmak tavsiye edilir.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-left">Denklik (Anerkennung) süreci nasıl ilerler?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Almanya'da çalışmak için Türkiye'deki diploma ve diğer evrakların ZAB’ta değerlendirilmiş olması büyük rol oynar.</p>
                      <p>Yüksek lisans diploması ile birlikte transkript ve hizmet dökümü çevirisi yapılmalıdır. Çevirilerde meslek/ders isimlerinin doğruluğu kontrol edilmelidir.</p>
                      <p>Denklik masrafları (red alınsa bile), ileride oturum izni alındığında Jobcenter'dan talep edilebilir.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-12">
                  <AccordionTrigger className="text-left">SFBT (Çözüm Odaklı Kısa Terapi) metodu nasıl kullanılır?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>SFBT metodu, kişiyi sorduğu sorunun doğru cevabını muhakeme ederek bulmaya yönlendirme yöntemidir. Çözüm her zaman problemle alakalı olmayabilir.</p>
                      <p><strong>İstisna Sorular:</strong> Korku ve kaygıları somut örneklerle azaltmayı hedefler.</p>
                      <p><strong>Ölçekleme:</strong> Korkulan şeyin gerçekleşme ihtimalini puanlayarak endişeyi somutlaştırır.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-13">
                  <AccordionTrigger className="text-left">Acil durumlarda Psikolojik İlk Yardım (PİY) nasıl uygulanır?</AccordionTrigger>
                  <AccordionContent>
                    <p>PİY, acı çeken kişiye insancıl ve destekleyici müdahaledir. İnsanları konuşmaya zorlamamak, sabırla dinlemek, temel ihtiyaçları karşılamak ve olumsuz başa çıkma yollarından vazgeçirmek esastır.</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-14">
                  <AccordionTrigger className="text-left">Çocuklarda travma sonrası destek nasıl olmalıdır?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>Öncelikle güvenlik, barınma ve aile birliği sağlanmalıdır. Aileler çocuklarına sevildiklerini fiziksel ve sözel olarak hissettirmelidir.</p>
                      <p>Çocuklar duygularını ifade etmeye yüreklendirilmeli ancak zorlanmamalıdır. Oyun oynama fırsatları yaratılmalıdır.</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-15">
                  <AccordionTrigger className="text-left">Seelsorge gruplarında etik ve iletişim kuralları nelerdir?</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Siyasi, ticari veya genel ahlaka aykırı paylaşımlar yasaktır.</li>
                      <li>Kişisel verilerin (telefon, adres, fotoğraf) paylaşımı yasaktır (KVKK).</li>
                      <li>Üyeler arası polemik ve hakaret yasaktır.</li>
                      <li>Telif hakkı olan materyaller paylaşılmamalıdır.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

              </TabsContent>

              <TabsContent value="experiences">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tecrübe Paylaşımları</h3>
                  <ShareExperienceDialog 
                    professionSlug="seelsorge"
                    defaultProfessionName="Seelsorger"
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
                    professionSlug="seelsorge"
                  />
                </div>
                <DocumentSection professionSlug="seelsorge" />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sağ Sidebar */}
          <div className="space-y-6">
            <Card className="bg-violet-50 dark:bg-violet-900/20 border-violet-100 dark:border-violet-800">
              <CardHeader>
                <CardTitle className="text-violet-900 dark:text-violet-100">Hızlı Erişim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="#baslangic" className="block p-2 hover:bg-violet-100 dark:hover:bg-violet-800 rounded-lg text-sm text-violet-700 dark:text-violet-300 transition-colors">
                  1. Hazırlık ve Yeterlilik
                </Link>
                <Link href="#is-hayati" className="block p-2 hover:bg-violet-100 dark:hover:bg-violet-800 rounded-lg text-sm text-violet-700 dark:text-violet-300 transition-colors">
                  2. İş Hayatı ve Kariyer
                </Link>
                <Link href="#mesleki-cerceve" className="block p-2 hover:bg-violet-100 dark:hover:bg-violet-800 rounded-lg text-sm text-violet-700 dark:text-violet-300 transition-colors">
                  3. Mesleki Çerçeve
                </Link>
                <Link href="#sosyal-iletisim" className="block p-2 hover:bg-violet-100 dark:hover:bg-violet-800 rounded-lg text-sm text-violet-700 dark:text-violet-300 transition-colors">
                  4. Sosyal İletişim
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
                    <GraduationCap className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Eğitim Şartı</p>
                    <p className="font-medium text-slate-900 dark:text-white">Yüksek Lisans / İlahiyat</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Languages className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Dil Şartı</p>
                    <p className="font-medium text-slate-900 dark:text-white">B2 - C1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white dark:bg-slate-900 rounded-lg">
                    <Briefcase className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Çalışma Alanı</p>
                    <p className="font-medium text-slate-900 dark:text-white">Hapishane, Hastane, Ordu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <ShareExperienceDialog 
        professionSlug="seelsorge"
        defaultProfessionName="Seelsorger"
      />
      <UploadDocumentDialog 
        professionSlug="seelsorge"
      />
    </div>
  );
}
