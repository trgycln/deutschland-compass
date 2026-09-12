'use client';

import React, { useState, useEffect } from 'react';
import { softwareDeveloperData } from '@/data/software-developer-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, PlayCircle, GraduationCap, School, Briefcase, Users, HeartHandshake, Lightbulb, ArrowLeft, CheckCircle2, AlertCircle, ExternalLink, Code2, Laptop, Calendar, User, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { DocumentSection } from '@/components/document-section';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { supabase } from '@/lib/supabase';
import { useCommunityUpdates, PageCommunityUpdatesBanner, PageCommunityUpdatesContent } from '@/components/page-community-updates';

export default function SoftwareDeveloperPage() {
  const { title, description, videoUrl, stats, roadmap, pedagogy, faq } = softwareDeveloperData;
  const [activeTab, setActiveTab] = useState('roadmap');
  const [experiences, setExperiences] = useState<any[]>([]);
  const { updates } = useCommunityUpdates('bilisim-it');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam && ['roadmap', 'updates', 'pedagogy', 'faq', 'experiences', 'documents'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }

    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Yazılım%,profession.ilike.%Software%,profession.ilike.%Developer%,profession.ilike.%IT%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link 
            href="/meslekler/bilisim-it" 
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Bilişim (IT) Sayfasına Dön
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/50">
                Yazılım Geliştirme
              </Badge>
              <Badge variant="outline" className="text-slate-400 border-slate-700">
                Kariyer Rehberi
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                  <div className="font-semibold text-lg flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${stat.color}`} />
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Telegram Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
              <a
                href="https://t.me/+_5ox6dqGidcwOGMy"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">I.T Bilişim Grubu</div>
                    <div className="text-xs text-blue-100 opacity-90">Telegram Grubu</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/80 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              <a
                href="https://t.me/+yI1or4k3nMswN2Ni"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">Deutschland Compass</div>
                    <div className="text-xs text-amber-100 opacity-90">Telegram Kanalımız</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/80 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Canlı Topluluk Güncellemeleri & Taze Tecrübeler Banner */}
        <PageCommunityUpdatesBanner 
          categorySlug="bilisim-it"
          groupName="I.T BİLİŞİM GRUBU"
          updatesCount={updates.length}
          onExploreClick={() => setActiveTab('updates')}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl gap-1">
            <TabsTrigger value="roadmap" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Yol Haritası
            </TabsTrigger>

            {/* Vurgulu & Dikkat Çekici Güncel Gelişmeler Sekmesi */}
            <TabsTrigger 
              value="updates" 
              className="relative rounded-lg font-bold flex items-center justify-center gap-1.5 py-2.5 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-amber-700 dark:data-[state=inactive]:text-amber-300 data-[state=inactive]:bg-amber-50/70 dark:data-[state=inactive]:bg-amber-950/30"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 data-[state=active]:bg-white"></span>
              </span>
              <span>⚡ Güncel</span>
              {updates.length > 0 && (
                <span className="ml-0.5 text-[11px] px-1.5 py-0.2 rounded-full font-extrabold bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100">
                  {updates.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger value="pedagogy" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Sektör Kültürü
            </TabsTrigger>
            <TabsTrigger value="faq" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              SSS
            </TabsTrigger>
            <TabsTrigger value="experiences" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Tecrübeler
            </TabsTrigger>
            <TabsTrigger value="documents" className="py-2.5 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Dökümanlar
            </TabsTrigger>
          </TabsList>

          {/* Güncel Gelişmeler Tab (Topluluk & Telegram Canlı Sentezi) */}
          <TabsContent value="updates" className="space-y-6">
            <PageCommunityUpdatesContent
              categorySlug="bilisim-it"
              groupName="I.T BİLİŞİM GRUBU"
              updates={updates}
              onSwitchTab={(tab: string) => setActiveTab(tab)}
            />
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <Code2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Kariyer Yol Haritası
              </h2>
            </div>

            <div className="space-y-8">
              {roadmap.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-0">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:hidden" />
                  
                  <Card className="relative border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-sm border-4 border-white dark:border-slate-950 shadow-sm z-10">
                          {step.step}
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 pl-12">
                        {step.description}
                      </p>
                    </CardHeader>
                    <CardContent className="pl-12">
                      <div className="grid gap-4">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              {detail.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                              {detail.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pedagogy/Analogy Section */}
          <TabsContent value="pedagogy">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                    {pedagogy.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-blue dark:prose-invert max-w-none">
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed whitespace-pre-line">
                    {pedagogy.content}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Özel Gereksinimler
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {pedagogy.specialNeeds}
                    </p>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Kaynaklar
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {pedagogy.resources}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Section */}
          <TabsContent value="faq">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sıkça Sorulan Sorular
              </h2>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                  <AccordionTrigger className="text-left hover:no-underline py-4 font-medium text-slate-900 dark:text-slate-100">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Experiences Section */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Yazılımcı Tecrübenizi Paylaşın</h3>
                  <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                    Almanya'da yazılım sektöründe iş arama, mülakat veya çalışma deneyiminizi paylaşarak yeni başlayanlara yol gösterin.
                  </p>
                </div>
                <ShareExperienceDialog 
                  professionSlug="yazilim-gelistirici" 
                  defaultProfessionName="Yazılım Geliştirici" 
                />
              </div>

              {experiences.length > 0 ? (
                <div className="grid gap-6">
                  {experiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {exp.name || 'Anonim Geliştirici'}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                            {exp.profession}
                          </Badge>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {exp.content}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                      <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Henüz tecrübe paylaşılmamış
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                      Bu alanda tecrübesi olan ilk kişi siz olun ve diğer geliştiricilere yol gösterin.
                    </p>
                    <ShareExperienceDialog professionSlug="yazilim-gelistirici" defaultProfessionName="Yazılım Geliştirici" />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Documents Section */}
          <TabsContent value="documents">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Örnek Dokümanlar</h2>
              <UploadDocumentDialog professionSlug="yazilim-gelistirici" />
            </div>
            <DocumentSection professionSlug="yazilim-gelistirici" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
