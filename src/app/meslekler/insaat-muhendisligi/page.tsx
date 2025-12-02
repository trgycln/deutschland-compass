'use client';

import React, { useEffect, useState } from 'react';
import { civilEngineerData } from '@/data/civil-engineer-data';
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

export default function CivilEngineerPage() {
  const [videoUrl, setVideoUrl] = useState(civilEngineerData.videoUrl);
  const [pageTitle, setPageTitle] = useState(civilEngineerData.title);
  const [pageDescription, setPageDescription] = useState(civilEngineerData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'insaat-muhendisligi')
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
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">İnşaat</Badge>
                <Badge variant="outline" className="text-slate-600">Meslek Rehberi</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {pageTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {civilEngineerData.stats.map((stat: { label: string; value: string; color: string }, index: number) => (
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
                <ShareExperienceDialog professionSlug="insaat-muhendisligi" />
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
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 gap-2">
                  <PlayCircle className="w-12 h-12 opacity-50" />
                  <span className="text-sm font-medium">Tanıtım videosu yakında</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl" id="roadmap-section">
        <Tabs defaultValue="roadmap" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <TabsTrigger value="roadmap" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Yol Haritası
            </TabsTrigger>
            <TabsTrigger value="pedagogy" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Çalışma Kültürü
            </TabsTrigger>
            <TabsTrigger value="faq" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Sıkça Sorulanlar
            </TabsTrigger>
            <TabsTrigger value="experiences" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Tecrübeler
            </TabsTrigger>
            <TabsTrigger value="documents" className="py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Dökümanlar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="grid gap-6">
              {civilEngineerData.roadmap.map((step, index) => (
                <Card key={index} className="border-l-4 border-l-orange-500">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-sm">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-6">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-orange-500" />
                          {detail.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                          {detail.content}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pedagogy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-orange-500" />
                  {civilEngineerData.pedagogy.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {civilEngineerData.pedagogy.content}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border border-amber-100 dark:border-amber-900/50">
                      <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">
                        Uyum ve İletişim
                      </h3>
                      <p className="text-amber-800 dark:text-amber-200/80">
                        {civilEngineerData.pedagogy.specialNeeds}
                      </p>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-xl border border-blue-100 dark:border-blue-900/50">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Kaynaklar ve Normlar
                      </h3>
                      <p className="text-blue-800 dark:text-blue-200/80">
                        {civilEngineerData.pedagogy.resources}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <FaqSection professionSlug="insaat-muhendisligi" initialFaqs={civilEngineerData.faq} />
          </TabsContent>

          <TabsContent value="experiences">
            <ExperienceSection professionSlug="insaat-muhendisligi" />
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Mesleki Dökümanlar</h3>
                  <p className="text-sm text-slate-500">Bu meslek için paylaşılmış örnek belgeler ve formlar.</p>
                </div>
                <UploadDocumentDialog professionSlug="insaat-muhendisligi" />
              </div>
              <DocumentSection professionSlug="insaat-muhendisligi" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
