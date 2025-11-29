'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, BookOpen, Briefcase, GraduationCap, PlayCircle, Share2 } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { FaqSection } from '@/components/faq-section';
import { ExperienceSection } from '@/components/experience-section';
import { DocumentSection } from '@/components/document-section';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { supabase } from '@/lib/supabase';

// Static Data for German Teacher Page
const germanTeacherData = {
  title: "Almanca Öğretmenliği (DaF/DaZ)",
  description: "Almanya'da Almanca öğretmeni olarak çalışmak isteyenler için kapsamlı rehber. Entegrasyon kursları, okul sistemi ve özel ders imkanları hakkında detaylı bilgiler.",
  videoUrl: "", // Can be updated from admin panel
  stats: [
    { label: "Talep", value: "Çok Yüksek", color: "bg-red-500" },
    { label: "Ortalama Süre", value: "6-12 Ay", color: "bg-blue-500" },
    { label: "Dil Şartı", value: "C1", color: "bg-green-500" }
  ],
  roadmap: [
    {
      step: 1,
      title: "Temel Yeterlilikler ve Başlangıç",
      description: "Mesleğe başlamak için gereken temel şartlar ve belgeler.",
      details: [
        {
          title: "Dil Yeterliliği (C1)",
          content: "Entegrasyon kurslarında ders verebilmek için BAMF tarafından kabul edilen bir C1 sertifikası (Telc C1 Allgemein, TestDaF, DSH-3) şarttır. DSH-2 bazı durumlarda kabul edilmeyebilir."
        },
        {
          title: "Diploma Denkliği (Anerkennung)",
          content: "ZAB (Zentralstelle für ausländisches Bildungswesen) üzerinden diploma ve transkriptlerinizin denkliğini almanız gerekir. Türkçe belgeler genellikle yeterlidir."
        },
        {
          title: "Alternatif Başlangıçlar",
          content: "Okullarda ücretli öğretmen (Honorararbeit) olarak veya farklı branşlarda (örn. Biyoloji mezunu Biyoloji öğretmeni olarak) çalışmak mümkündür."
        }
      ]
    },
    {
      step: 2,
      title: "BAMF Zulassung (İzin) Süreci",
      description: "Entegrasyon kurslarında çalışabilmek için gereken resmi izin süreci.",
      details: [
        {
          title: "Başvuru (Antrag)",
          content: "BAMF'a doğrudan başvuru (Form 630-107) yaparak eksiklerinizi öğrenebilirsiniz. C1 sertifikası, diploma ve tecrübe belgeleri gereklidir."
        },
        {
          title: "Doğrudan Onay (Direktzulassung)",
          content: "Almanca öğretmenliği, sınıf öğretmenliği veya dil/edebiyat mezunları belirli şartlarla (örn. tecrübe) doğrudan onay alabilirler."
        },
        {
          title: "Ek Nitelik (ZQ)",
          content: "Doğrudan onay alınamazsa 140 saatlik DaF/DaZ ZQ eğitimi istenir. Kurs ücreti (yaklaşık 1300€) belirli şartlarda BAMF tarafından kısmen geri ödenir."
        },
        {
          title: "Alpha Kursu İzni",
          content: "Okuma yazma kursları için ayrı bir izin gerekir. Sınıf öğretmenleri genellikle doğrudan onay alır."
        }
      ]
    },
    {
      step: 3,
      title: "Çalışma Şartları ve Finansal Durum",
      description: "Maaşlar, sigorta ve sözleşme türleri hakkında bilgiler.",
      details: [
        {
          title: "Honorararbeit (Serbest Çalışma)",
          content: "Ders saati başına brüt ücret (yaklaşık 41-42€) alınır. Sigorta ve vergi ödemeleri öğretmene aittir. Tatil ve hastalık durumunda gelir kesilir."
        },
        {
          title: "Festanstellung (Kadrolu)",
          content: "Daha düşük brüt maaş teklif edilebilir ancak hastalık ve tatil günlerinde maaş devam eder."
        },
        {
          title: "Jobcenter İlişkisi",
          content: "Gelir elde etmeye başladığınızda Jobcenter'a bildirim zorunluluğu vardır. İşsizlik parası gelire göre kesilebilir."
        }
      ]
    }
  ],
  pedagogy: {
    content: "Sınıf içinde net kurallar belirlemek ve beklentileri açıkça ifade etmek önemlidir. Düzenli rutinler öğrencilere güvenlik sağlar. Mülakatlarda 'kahraman' olmaya çalışmak yerine işbirliğine açık, pedagojik formasyona uygun cevaplar vermek önemlidir.",
    specialNeeds: "Otistik, DEHB veya duygusal gelişim sorunu olan öğrenciler için yapılandırılmış ortamlar ve empati esastır. Talimatlar kısa ve net olmalıdır.",
    resources: "Schritte plus neu, Linie 1, Pluspunkt gibi kitaplar yaygındır. Wordwall ve Grammatik aktiv ek kaynak olarak kullanılabilir."
  },
  alternatives: [
    {
      title: "Erzieher / Sozialarbeiter",
      description: "Denklik alamayanlar veya süreci zor bulanlar için sosyal ve eğitim alanlarında alternatif meslekler."
    },
    {
      title: "Ücretli Öğretmenlik (Okullarda)",
      description: "Kendi branşınızda veya ihtiyaç duyulan diğer branşlarda okul müdürü onayıyla çalışma imkanı."
    }
  ]
};

function getEmbedUrl(url: string) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function GermanTeacherPage() {
  const [videoUrl, setVideoUrl] = useState(germanTeacherData.videoUrl);
  const [pageTitle, setPageTitle] = useState(germanTeacherData.title);
  const [pageDescription, setPageDescription] = useState(germanTeacherData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'almanca-ogretmenligi')
        .single();
      
      if (data) {
        if (data.video_url) setVideoUrl(data.video_url);
        if (data.title) setPageTitle(data.title);
        if (data.description) setPageDescription(data.description);
      }
    }
    fetchPageData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Eğitim</Badge>
                <Badge variant="outline" className="text-slate-600">Meslek Rehberi</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {pageTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {germanTeacherData.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <span className={`w-2 h-2 rounded-full ${stat.color}`} />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {stat.label}: <span className="text-slate-900 dark:text-white">{stat.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center md:justify-start gap-3 pt-4">
                <Button 
                  className="gap-2"
                  onClick={() => document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-4 h-4" />
                  Rehbere Başla
                </Button>
                <ShareExperienceDialog professionSlug="almanca-ogretmenligi" />
              </div>
            </div>

            {/* Video Section */}
            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
              {videoUrl && (videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) ? (
                <iframe 
                  src={getEmbedUrl(videoUrl)} 
                  title="Video İçerik"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                  <PlayCircle className="w-12 h-12 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="roadmap-section" className="container mx-auto px-4 py-8 max-w-5xl">
        <Tabs defaultValue="roadmap" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="roadmap">Yol Haritası</TabsTrigger>
            <TabsTrigger value="pedagogy">Pedagoji</TabsTrigger>
            <TabsTrigger value="faq">SSS</TabsTrigger>
            <TabsTrigger value="experiences">Tecrübeler</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-8">
            <div className="grid gap-8">
              {germanTeacherData.roadmap.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-0">
                  {/* Timeline Line (Desktop) */}
                  <div className="hidden md:block absolute left-[27px] top-14 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 last:hidden" />
                  
                  <div className="flex gap-6">
                    {/* Step Number */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm z-10">
                        {step.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <Card className="flex-1">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2 md:hidden">
                           <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                             {step.step}
                           </span>
                           <CardTitle>{step.title}</CardTitle>
                        </div>
                        <CardTitle className="hidden md:block">{step.title}</CardTitle>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4 md:grid-cols-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                              {detail.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              {detail.content}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pedagogy Tab */}
          <TabsContent value="pedagogy">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    Sınıf İçi Yönetim ve Pedagoji
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Ders İşleyişi ve Mülakat</h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {germanTeacherData.pedagogy.content}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-100 dark:border-yellow-900/50">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Özel İhtiyaçlar</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {germanTeacherData.pedagogy.specialNeeds}
                    </p>
                  </div>

                  <div>
                     <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Kaynaklar</h4>
                     <p className="text-sm text-slate-600 dark:text-slate-400">
                       {germanTeacherData.pedagogy.resources}
                     </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    Alternatif Kariyerler
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {germanTeacherData.alternatives.map((alt, idx) => (
                      <li key={idx} className="border-b last:border-0 pb-3 last:pb-0 border-slate-100 dark:border-slate-800">
                        <h5 className="font-medium text-slate-900 dark:text-slate-200">{alt.title}</h5>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{alt.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-500" />
                    Mülakat İpuçları
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <span>Mülakat öncesi 2-3 kişilik gruplarla prova yapın.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <span>Anschreiben ve Lebenslauf'ta tüm tecrübelerinizi detaylandırın.</span>
                    </li>
                    <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                      <span>Yapay zeka araçlarından faydalanın ama içeriği kişiselleştirin.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <FaqSection professionSlug="almanca-ogretmenligi" />
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Sizin Tecrübeniz Değerli</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    Bu yoldan geçmiş biri olarak, tecrübelerinizi paylaşarak yeni gelenlere ışık tutabilirsiniz.
                  </p>
                </div>
                <ShareExperienceDialog professionSlug="almanca-ogretmenligi" />
              </div>
              
              <ExperienceSection professionSlug="almanca-ogretmenligi" />
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Kaynak Paylaşımı</h3>
                  <p className="text-indigo-700 dark:text-indigo-300 text-sm mt-1">
                    Elinizdeki ders notlarını, sunumları veya faydalı belgeleri paylaşarak meslektaşlarınıza destek olun.
                  </p>
                </div>
                <UploadDocumentDialog professionSlug="almanca-ogretmenligi" />
              </div>
              
              <DocumentSection professionSlug="almanca-ogretmenligi" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
