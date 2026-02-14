'use client';

import React, { useEffect, useState } from 'react';
import { physiotherapistData } from '@/data/physiotherapist-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, BookOpen, PlayCircle, GraduationCap, User } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { FaqSection } from '@/components/faq-section';
import { ExperienceSection } from '@/components/experience-section';
import { DocumentSection } from '@/components/document-section';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { supabase } from '@/lib/supabase';

function getEmbedUrl(url: string) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function PhysiotherapistPage() {
  const [videoUrl, setVideoUrl] = useState(physiotherapistData.videoUrl);
  const [pageTitle, setPageTitle] = useState(physiotherapistData.title);
  const [pageDescription, setPageDescription] = useState(physiotherapistData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'fizyoterapist')
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
                <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">Sağlık</Badge>
                <Badge variant="outline" className="text-slate-600">Meslek Rehberi</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {pageTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {physiotherapistData.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
                    <span className={`w-2 h-2 rounded-full ${stat.color}`} />
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {stat.label}: <span className="text-slate-900 dark:text-white">{stat.value}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Telegram Linkleri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
                <a 
                  href="https://t.me/+FYLKjfACeXtkYzYy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-white/10 transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-500"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm">Fizyoterapistler</div>
                      <div className="text-blue-100 text-xs">Telegram Grubu</div>
                    </div>
                  </div>
                </a>
                
                <a 
                  href="https://t.me/+yI1or4k3nMswN2Ni" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-white/10 transform -skew-y-3 group-hover:skew-y-0 transition-transform duration-500"></div>
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm">Deutschland Compass</div>
                      <div className="text-amber-100 text-xs">Telegram Kanalımız</div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex justify-center md:justify-start gap-3 pt-4">
                <Button 
                  className="gap-2"
                  onClick={() => document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-4 h-4" />
                  Rehbere Başla
                </Button>
                <ShareExperienceDialog professionSlug="fizyoterapist" />
              </div>
            </div>

            {/* Video Section */}
            <div className="w-full md:w-1/3 aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800">
              {videoUrl && (videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) ? (
                <iframe 
                  src={getEmbedUrl(videoUrl)} 
                  title="Meslek Tanıtımı"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
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
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-[750px] h-auto">
            <TabsTrigger value="roadmap">Yol Haritası</TabsTrigger>
            <TabsTrigger value="pedagogy">Uygulama</TabsTrigger>
            <TabsTrigger value="faq">SSS</TabsTrigger>
            <TabsTrigger value="experiences">Tecrübeler</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-8">
            <div className="grid gap-8">
              {physiotherapistData.roadmap.map((step, index) => (
                <div key={index} className="relative pl-8 md:pl-0">
                  {/* Timeline Line (Desktop) */}
                  <div className="hidden md:block absolute left-[27px] top-14 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 last:hidden" />
                  
                  <div className="flex gap-6">
                    {/* Step Number */}
                    <div className="hidden md:flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-600 text-emerald-600 flex items-center justify-center font-bold text-xl shadow-sm z-10">
                        {step.step}
                      </div>
                    </div>

                    {/* Content Card */}
                    <Card className="flex-1">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2 md:hidden">
                           <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm">
                             {step.step}
                           </span>
                           <CardTitle>{step.title}</CardTitle>
                        </div>
                        <CardTitle className="hidden md:block">{step.title}</CardTitle>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-4 md:grid-cols-1">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              {detail.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
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

          {/* Pedagogy/Clinical Tab */}
          <TabsContent value="pedagogy">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    {physiotherapistData.pedagogy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Genel Yaklaşım</h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      {physiotherapistData.pedagogy.content}
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md border border-yellow-100 dark:border-yellow-900/50">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Özel Durumlar ve Etik</h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {physiotherapistData.pedagogy.specialNeeds}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-900/50">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">İletişim ve Zorluklar</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {physiotherapistData.pedagogy.resources}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <FaqSection professionSlug="fizyoterapist" initialFaqs={physiotherapistData.faq} />
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <div className="space-y-8">
              {/* Static Experiences */}
              <div className="grid gap-6 md:grid-cols-2">
                {physiotherapistData.experiences.map((exp, index) => (
                  <Card key={index} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-500">Rehber Notu</span>
                      </div>
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {exp.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* User Submitted Experiences */}
              <ExperienceSection professionSlug="fizyoterapist" />
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Dokümanlar</h3>
                  <p className="text-sm text-slate-500">Bu meslek için paylaşılan örnek belgeler ve formlar.</p>
                </div>
                <UploadDocumentDialog professionSlug="fizyoterapist" />
              </div>
              <DocumentSection professionSlug="fizyoterapist" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
