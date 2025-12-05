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
  Plane,
  Landmark
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
import { ExperienceSection } from '@/components/experience-section';
import { DocumentSection } from '@/components/document-section';

export default function KurtceOgretmenligiPage() {
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Kürtçe%,profession.ilike.%Kurdisch%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const faqData = [
    {
      category: "Genel Bilgiler ve HSU (Anadil Dersleri)",
      items: [
        {
          question: "Almanya'da Kürtçe öğretmeni olarak çalışabilir miyim?",
          answer: "Evet, özellikle HSU (Herkunftssprachlicher Unterricht - Anadil Dersleri) kapsamında Kürtçe (Kurmancî, Zazakî/Kirmanckî) dersleri verilmektedir. Birçok eyalette (özellikle NRW, Berlin, Bremen, Hamburg) Kürtçe dersleri müfredatta yer almakta veya talep üzerine açılmaktadır."
        },
        {
          question: "HSU öğretmeni olmak için hangi şartlar aranır?",
          answer: "Genellikle pedagojik formasyona sahip olmak, ilgili dilde (Kürtçe) yetkinliği belgelemek (üniversite diploması veya dil sertifikası) ve Almanca dil yeterliliğine (genellikle C1, bazen B2) sahip olmak gerekir. Türkiye'den alınan öğretmenlik diplomaları (Kürt Dili ve Edebiyatı veya Zaza Dili ve Edebiyatı) bu süreçte temel teşkil eder."
        },
        {
          question: "Hangi eyaletlerde Kürtçe dersleri daha yaygındır?",
          answer: "Kuzey Ren-Vestfalya (NRW), Berlin, Bremen, Hamburg ve Aşağı Saksonya (Niedersachsen) gibi eyaletlerde Kürtçe derslerine yönelik talepler ve uygulamalar daha yaygındır. NRW'de Kürtçe, resmi HSU müfredatında yer almaktadır."
        }
      ]
    },
    {
      category: "Denklik ve Başvuru Süreci",
      items: [
        {
          question: "Diplomamın denkliğini nasıl alabilirim?",
          answer: "İlk adım olarak Bonn'daki ZAB (Zentralstelle für ausländisches Bildungswesen) üzerinden 'Zeugnisbewertung' (Diploma Değerlendirmesi) almanız önerilir. Bu belge, diplomanızın Alman eğitim sistemindeki karşılığını gösterir. Öğretmenlik mesleğini tam yetkiyle icra etmek için ise eyaletlerin ilgili birimlerine (Bezirksregierung veya Senatsverwaltung) 'Anerkennung' (Denklik) başvurusu yapmanız gerekir."
        },
        {
          question: "Tek branşlı öğretmenlik (Kürt Dili ve Edebiyatı) denklik için yeterli mi?",
          answer: "Almanya'da öğretmenlik genellikle iki branşlıdır. Tek branşınız varsa, genellikle 'yan giriş' (Seiteneinstieg) veya HSU öğretmenliği üzerinden sisteme dahil olabilirsiniz. Tam öğretmen statüsü (Lehramt) için ikinci bir branş okumanız veya tamamlamanız istenebilir."
        },
        {
          question: "Dil sertifikası gerekli mi?",
          answer: "Evet, Almanca dil yeterliliğinizi (genellikle C1 seviyesi) belgelemeniz gerekir. Ayrıca Kürtçe yeterliliğiniz diplomanızla sabit değilse, bunun için de sınav veya belge istenebilir."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-slate-900/50 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white border-none text-lg py-1.5 px-4">
              Eğitim & Dil
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Kürtçe Öğretmenliği <br/>
              <span className="text-red-400">Kariyer Rehberi</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              Almanya'da Kürtçe (Kurmancî/Zazakî) öğretmeni olmak, HSU (Anadil Dersleri) sistemi, denklik süreçleri ve iş fırsatları hakkında kapsamlı rehber.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white gap-2">
                <BookOpen className="w-5 h-5" />
                Rehberi Okumaya Başla
              </Button>
              <ShareExperienceDialog professionSlug="kurtce-ogretmenligi" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Globe className="w-8 h-8 text-red-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">HSU Dersleri</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Anadil eğitimi fırsatı</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Languages className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Dil Seviyesi</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">C1 Almanca Genellikle Şart</p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <School className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-slate-900 dark:text-white">Çalışma Alanı</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Devlet Okulları & Dernekler</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue="rehber" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="rehber">Rehber</TabsTrigger>
                <TabsTrigger value="denklik">Denklik</TabsTrigger>
                <TabsTrigger value="sss">S.S.S.</TabsTrigger>
                <TabsTrigger value="dokumanlar">Dökümanlar</TabsTrigger>
              </TabsList>

              <TabsContent value="rehber" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-red-600" />
                      Meslek Tanımı ve Fırsatlar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-slate-600 dark:text-slate-300">
                    <p>
                      Almanya'da Kürtçe öğretmenliği, özellikle göçmen kökenli öğrencilerin anadillerini geliştirmeleri amacıyla sunulan <strong>Herkunftssprachlicher Unterricht (HSU)</strong> kapsamında önemli bir yer tutmaktadır. Birçok eyalette Kürtçe (Kurmancî ve Zazakî lehçelerinde) dersleri, yeterli talep olması durumunda devlet okullarında verilmektedir.
                    </p>
                    <p>
                      Türkiye'deki üniversitelerin Kürt Dili ve Edebiyatı veya Zaza Dili ve Edebiyatı bölümlerinden mezun olanlar veya pedagojik formasyona sahip olup Kürtçe dil yetkinliğini belgeleyenler, Almanya'da öğretmenlik yapma şansına sahiptir.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Önemli Bilgi
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        Kürtçe derslerinin açılması genellikle velilerin talebine bağlıdır. Bir okulda veya bölgede belirli sayıda (genellikle 10-15) öğrenci için başvuru yapıldığında, okul yönetimi veya eğitim müdürlüğü ders açmakla yükümlü olabilir (eyalet yasalarına göre değişir).
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-red-600" />
                      Çalışma Alanları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-red-600 font-bold text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Devlet Okulları (HSU)</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            İlkokul ve ortaokul seviyesinde anadil dersleri. Genellikle öğleden sonraları verilir.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-red-600 font-bold text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Halk Eğitim Merkezleri (VHS)</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Yetişkinlere yönelik dil kursları.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-red-600 font-bold text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Dernekler ve Kültür Merkezleri</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            Özel kurslar ve hafta sonu okulları.
                          </p>
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="denklik" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Denklik Yol Haritası</CardTitle>
                    <CardDescription>Adım adım öğretmenlik denkliği süreci</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
                      <div className="relative">
                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-red-600 border-4 border-white dark:border-slate-950" />
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">1. Dil Yeterliliği</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Almanca seviyenizi C1 düzeyine getirmeniz ve bunu sertifikalandırmanız (Goethe, Telc, TestDaF) en önemli ön koşuldur.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-950" />
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">2. ZAB Başvurusu</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Diplomanızın akademik olarak tanınması için ZAB'a başvurun. Bu belge mesleki denklik değil, akademik derecenizin (Lisans) Almanya'daki karşılığını gösterir.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-950" />
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">3. Eyalet Başvurusu (Anerkennung)</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          İkamet ettiğiniz veya çalışmak istediğiniz eyaletin Eğitim Bakanlığı'na veya ilgili birimine öğretmenlik denkliği için başvurun.
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-950" />
                        <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">4. Uyum Semineri veya Staj</h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          Eksik görülen pedagojik formasyon veya sistem bilgisi için uyum seminerlerine (Anpassungslehrgang) katılmanız istenebilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sss" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sıkça Sorulan Sorular</CardTitle>
                    <CardDescription>Kürtçe öğretmenliği hakkında merak edilenler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {faqData.map((category, index) => (
                        <div key={index} className="mb-6 last:mb-0">
                          <h3 className="font-semibold text-red-600 mb-3 px-2">{category.category}</h3>
                          {category.items.map((item, i) => (
                            <AccordionItem key={i} value={`item-${index}-${i}`}>
                              <AccordionTrigger className="text-left hover:text-red-600">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-slate-600 dark:text-slate-400">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </div>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="dokumanlar" className="space-y-6">
                <DocumentSection professionSlug="kurtce-ogretmenligi" />
              </TabsContent>
            </Tabs>

            {/* Experiences Section */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                  Tecrübe Paylaşımları
                </h2>
                <ShareExperienceDialog professionSlug="kurtce-ogretmenligi" />
              </div>
              
              <ExperienceSection professionSlug="kurtce-ogretmenligi" />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Useful Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faydalı Bağlantılar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="https://www.kmk.org/zab/central-office-for-foreign-education.html" target="_blank" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <ExternalLinkIcon className="w-4 h-4" />
                  ZAB Resmi Sitesi
                </Link>
                <Link href="https://www.schulministerium.nrw/herkunftssprachlicher-unterricht" target="_blank" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <ExternalLinkIcon className="w-4 h-4" />
                  NRW HSU Bilgilendirme
                </Link>
                <Link href="https://anerkennung-in-deutschland.de/html/tr/index.php" target="_blank" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                  <ExternalLinkIcon className="w-4 h-4" />
                  Anerkennung in Deutschland
                </Link>
              </CardContent>
            </Card>

            {/* Community Card */}
            <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Topluluk Desteği
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-100 text-sm mb-4">
                  Kürtçe öğretmenliği sürecinde yalnız değilsiniz. Telegram grubumuza katılarak diğer meslektaşlarınızla iletişim kurabilirsiniz.
                </p>
                <Button variant="secondary" className="w-full text-red-700 hover:text-red-800" asChild>
                  <Link href="/telegram-gruplari">Telegram Grupları</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}
