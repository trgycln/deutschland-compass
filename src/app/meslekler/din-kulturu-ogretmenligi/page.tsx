'use client';

import React, { useEffect, useState } from 'react';
import { religiousCultureTeacherData } from '@/data/religious-culture-teacher-data';
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

export default function ReligiousCultureTeacherPage() {
  const [videoUrl, setVideoUrl] = useState(religiousCultureTeacherData.videoUrl);
  const [pageTitle, setPageTitle] = useState(religiousCultureTeacherData.title);
  const [pageDescription, setPageDescription] = useState(religiousCultureTeacherData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'din-kulturu-ogretmenligi')
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
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Eğitim
              </Badge>
              <Badge variant="outline" className="text-slate-600 dark:text-slate-400">
                Rehber
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
              {pageTitle}
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {pageDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {religiousCultureTeacherData.stats.map((stat, index) => (
                <div key={index} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{stat.label}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                    <span className="font-semibold text-slate-900 dark:text-white">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <ShareExperienceDialog professionSlug="din-kulturu-ogretmenligi" defaultProfessionName={pageTitle} />
              <UploadDocumentDialog professionSlug="din-kulturu-ogretmenligi" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="roadmap" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] h-auto">
              <TabsTrigger value="roadmap">Yol Haritası</TabsTrigger>
              <TabsTrigger value="experiences">Deneyimler</TabsTrigger>
              <TabsTrigger value="documents">Belgeler</TabsTrigger>
              <TabsTrigger value="faq">SSS</TabsTrigger>
            </TabsList>

            <TabsContent value="roadmap" className="space-y-8">
              {/* Video Section */}
              {videoUrl && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-red-500" />
                      Tanıtım Videosu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <iframe
                        width="100%"
                        height="100%"
                        src={getEmbedUrl(videoUrl)}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Roadmap Steps */}
              <div className="space-y-6">
                {religiousCultureTeacherData.roadmap.map((step, index) => (
                  <Card key={index} className="relative overflow-hidden border-l-4 border-l-blue-500">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm">
                          {step.step}
                        </div>
                        <div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                          <CardDescription className="mt-1">{step.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                              {detail.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                              {detail.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experiences">
              <ExperienceSection professionSlug="din-kulturu-ogretmenligi" />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentSection professionSlug="din-kulturu-ogretmenligi" />
            </TabsContent>

            <TabsContent value="faq">
              <FaqSection professionSlug="din-kulturu-ogretmenligi" initialFaqs={religiousCultureTeacherData.faqs} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
