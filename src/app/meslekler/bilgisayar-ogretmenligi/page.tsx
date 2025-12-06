'use client';

import React, { useEffect, useState } from 'react';
import { computerScienceTeacherData } from '@/data/computer-science-teacher-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Briefcase, FileText, Users, Monitor, CheckCircle2, PlayCircle } from 'lucide-react';
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

function getIconForSection(id: string) {
  switch (id) {
    case 'hazirlik':
      return <BookOpen className="w-6 h-6 text-blue-600" />;
    case 'is-hayati':
      return <Briefcase className="w-6 h-6 text-blue-600" />;
    case 'basvuru':
      return <FileText className="w-6 h-6 text-blue-600" />;
    case 'kariyer-gelisimi':
      return <Monitor className="w-6 h-6 text-blue-600" />;
    case 'genel-degerlendirme':
      return <Users className="w-6 h-6 text-blue-600" />;
    default:
      return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
  }
}

export default function ComputerScienceTeacherPage() {
  const [videoUrl, setVideoUrl] = useState(computerScienceTeacherData.videoUrl);
  const [pageTitle, setPageTitle] = useState(computerScienceTeacherData.title);
  const [pageDescription, setPageDescription] = useState(computerScienceTeacherData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'bilgisayar-ogretmenligi')
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
                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">Eğitim & IT</Badge>
                <Badge variant="outline" className="text-slate-600">Meslek Rehberi</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {pageTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {computerScienceTeacherData.stats.map((stat, index) => (
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
                  onClick={() => document.getElementById('guide-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-4 h-4" />
                  Rehbere Başla
                </Button>
                <ShareExperienceDialog 
                  professionSlug="bilgisayar-ogretmenligi" 
                  defaultProfessionName="Bilgisayar Öğretmenliği"
                />
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

          <TabsContent value="guide" className="space-y-8" id="guide-section">
            <div className="grid gap-8">
              {computerScienceTeacherData.sections.map((section) => (
                <Card key={section.id} className="overflow-hidden border-l-4 border-l-blue-500" id={section.id}>
                  <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                    <CardTitle className="text-2xl flex items-center gap-3 text-slate-900 dark:text-slate-100">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        {getIconForSection(section.id)}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div 
                      className="prose prose-slate dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: section.content }}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="experiences">
            <ExperienceSection professionSlug="bilgisayar-ogretmenligi" />
          </TabsContent>

          <TabsContent value="faq">
            <FaqSection professionSlug="bilgisayar-ogretmenligi" initialFaqs={computerScienceTeacherData.faq} />
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Faydalı Dokümanlar</h3>
                  <p className="text-sm text-slate-500">Bu meslek grubu için paylaşılmış resmi belgeler ve örnekler.</p>
                </div>
                <UploadDocumentDialog professionSlug="bilgisayar-ogretmenligi" />
              </div>
              <DocumentSection professionSlug="bilgisayar-ogretmenligi" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
