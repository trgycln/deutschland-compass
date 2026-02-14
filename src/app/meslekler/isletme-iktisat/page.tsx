'use client';

import React, { useEffect, useState } from 'react';
import { businessData } from '@/data/business-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, PlayCircle, GraduationCap, Users, HeartHandshake, ArrowLeft, CheckCircle2, Landmark, Scale, FileText } from 'lucide-react';
import Link from 'next/link';
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

export default function BusinessPage() {
  const [videoUrl, setVideoUrl] = useState(businessData.videoUrl);
  const [pageTitle, setPageTitle] = useState(businessData.title);
  const [pageDescription, setPageDescription] = useState(businessData.description);

  useEffect(() => {
    async function fetchPageData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'isletme-iktisat')
        .single();
      
      if (data) {
        if (data.video_url) setVideoUrl(data.video_url);
        if (data.title) setPageTitle(data.title);
        if (data.description) setPageDescription(data.description);
      }
    }
    fetchPageData();
  }, []);

  const { stats, roadmap, pedagogy, faq } = businessData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
          <Link 
            href="/meslekler" 
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Meslekler Sayfasına Dön
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-500/50">
                  İşletme & Ekonomi
                </Badge>
                <Badge variant="outline" className="text-slate-400 border-slate-700">
                  Kariyer Rehberi
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {pageTitle}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {pageDescription}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl px-4 py-2">
                    <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${stat.color}`} />
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Telegram Linkleri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
                <a 
                  href="https://t.me/+w2viy2qFczQ0MGUy" 
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
                      <div className="text-white font-semibold text-sm">İşletme-İktisat-Maliye</div>
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
                <ShareExperienceDialog professionSlug="isletme-iktisat" defaultProfessionName="İşletme, İktisat ve Maliye" />
              </div>
            </div>

            {/* Video Section */}
            <div className="w-full md:w-1/3 aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
              {videoUrl && (videoUrl.includes('youtube') || videoUrl.includes('youtu.be')) ? (
                <iframe 
                  src={getEmbedUrl(videoUrl)} 
                  title="Meslek Tanıtımı"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                  <PlayCircle className="w-12 h-12 opacity-50" />
                  <span className="text-sm font-medium">Video Yakında</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-12 max-w-5xl" id="roadmap-section">
        <Tabs defaultValue="roadmap" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] h-auto bg-slate-100 dark:bg-slate-800 p-1">
            <TabsTrigger value="roadmap">Yol Haritası</TabsTrigger>
            <TabsTrigger value="pedagogy">Uygulama</TabsTrigger>
            <TabsTrigger value="faq">SSS</TabsTrigger>
            <TabsTrigger value="experiences">Tecrübeler</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          <TabsContent value="roadmap" className="space-y-8">
            <div className="grid gap-8">
              {roadmap.map((step, index) => (
                <Card key={index} className="relative overflow-hidden border-l-4 border-l-blue-500">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <span className="text-6xl font-bold text-slate-900 dark:text-white">{step.step}</span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 text-sm font-bold">
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

          <TabsContent value="pedagogy" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-blue-500" />
                  {pedagogy.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {pedagogy.content}
                </p>
                
                {pedagogy.specialNeeds && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                      <Scale className="w-4 h-4" />
                      Önemli Noktalar
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      {pedagogy.specialNeeds}
                    </p>
                  </div>
                )}

                {pedagogy.resources && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Kaynaklar
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {pedagogy.resources}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq">
            <FaqSection professionSlug="isletme-iktisat" initialFaqs={faq} />
          </TabsContent>

          <TabsContent value="experiences">
            <ExperienceSection professionSlug="isletme-iktisat" />
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Faydalı Dokümanlar</h3>
                  <p className="text-sm text-slate-500">Bu meslek grubu için paylaşılmış resmi belgeler ve örnekler.</p>
                </div>
                <UploadDocumentDialog professionSlug="isletme-iktisat" />
              </div>
              <DocumentSection professionSlug="isletme-iktisat" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
