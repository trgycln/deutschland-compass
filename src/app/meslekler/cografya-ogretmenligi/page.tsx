'use client';

import React, { useEffect, useState } from 'react';
import { geographyTeacherData } from '@/data/geography-teacher-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, BookOpen, PlayCircle } from 'lucide-react';
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

export default function GeographyTeacherPage() {
  const [videoUrl, setVideoUrl] = useState(geographyTeacherData.videoUrl);
  const [pageTitle, setPageTitle] = useState(geographyTeacherData.title);
  const [pageDescription, setPageDescription] = useState(geographyTeacherData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'cografya-ogretmenligi')
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
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Sosyal Bilimler</Badge>
                <Badge variant="outline" className="text-slate-600">Meslek Rehberi</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {pageTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {geographyTeacherData.stats.map((stat, index) => (
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
                <ShareExperienceDialog professionSlug="cografya-ogretmenligi" />
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
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                  <PlayCircle className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-sm font-medium">Video Yakında</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] h-auto">
            <TabsTrigger value="guide">Rehber</TabsTrigger>
            <TabsTrigger value="experiences">Deneyimler</TabsTrigger>
            <TabsTrigger value="faq">SSS</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8" id="roadmap-section">
            <div className="grid gap-8">
              {geographyTeacherData.roadmap.map((step, index) => (
                <Card key={index} className="relative overflow-hidden border-l-4 border-l-green-500">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="text-6xl font-bold text-slate-900 dark:text-white">{step.step}</span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 text-sm font-bold">
                        {step.step}
                      </span>
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-base pt-2">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900 dark:text-slate-200 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
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

          <TabsContent value="experiences">
            <ExperienceSection professionSlug="cografya-ogretmenligi" />
          </TabsContent>

          <TabsContent value="faq">
            <FaqSection professionSlug="cografya-ogretmenligi" initialFaqs={geographyTeacherData.faqs} />
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Faydalı Dokümanlar</h3>
                  <p className="text-sm text-slate-500">Bu meslek grubu için paylaşılmış resmi belgeler ve örnekler.</p>
                </div>
                <UploadDocumentDialog professionSlug="cografya-ogretmenligi" />
              </div>
              <DocumentSection professionSlug="cografya-ogretmenligi" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
