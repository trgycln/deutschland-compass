'use client';

import React, { useEffect, useState } from 'react';
import { specialEducationTeacherData } from '@/data/special-education-teacher-data';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, ArrowLeft, User, Calendar, CheckCircle2, AlertTriangle, HelpCircle, Briefcase, GraduationCap, Globe, Building2, Heart } from 'lucide-react';
import Link from 'next/link';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { FaqSection } from '@/components/faq-section';
import { ExperienceSection } from '@/components/experience-section';
import { DocumentSection } from '@/components/document-section';

function getEmbedUrl(url: string) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function SpecialEducationTeacherPage() {
  const { title, description, videoUrl: defaultVideoUrl, stats, roadmap, pedagogy, faq } = specialEducationTeacherData;
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);

  useEffect(() => {
    async function fetchProfessionData() {
      const { data } = await supabase
        .from('professions')
        .select('video_url')
        .eq('slug', 'ozel-egitim-ogretmenligi')
        .single();
      
      if (data?.video_url) {
        setVideoUrl(data.video_url);
      }
    }
    fetchProfessionData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        <div className="container mx-auto px-4 py-12 max-w-5xl relative z-10">
          <Link 
            href="/rehber" 
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Rehbere Dön
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-500/50">
                  Eğitim & Pedagoji
                </Badge>
                <Badge variant="outline" className="text-slate-400 border-slate-700">
                  Meslek Rehberi
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {title}
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {description}
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

              {/* Telegram Grupları */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <a
                  href="https://t.me/+lcO1TpuAJUUzOTcy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 bg-white/25 backdrop-blur-sm rounded-lg shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm">Özel Eğitim Öğretmenleri</div>
                      <div className="text-xs text-blue-100">Telegram Grubu</div>
                    </div>
                    <svg className="w-4 h-4 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>

                <a
                  href="https://t.me/+yI1or4k3nMswN2Ni"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-3">
                    <div className="p-2 bg-white/25 backdrop-blur-sm rounded-lg shrink-0">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-white text-sm">Deutschland Compass</div>
                      <div className="text-xs text-amber-100">Telegram Kanalımız</div>
                    </div>
                    <svg className="w-4 h-4 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </a>
              </div>

              <div className="flex justify-center md:justify-start gap-3 pt-4">
                <Button 
                  className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-4 h-4" />
                  Rehbere Başla
                </Button>
                <ShareExperienceDialog professionSlug="ozel-egitim-ogretmenligi" defaultProfessionName="Özel Eğitim Öğretmenliği" />
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
                  <Globe className="w-12 h-12 opacity-20" />
                  <p className="text-sm">Video yakında eklenecek</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="roadmap-section" className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Pedagogy / Info Alert */}
        {pedagogy && (
          <div className="mb-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{pedagogy.title}</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed whitespace-pre-wrap">
                {pedagogy.content}
              </p>
              {pedagogy.specialNeeds && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Önemli Not:</p>
                  <p className="text-sm text-blue-800 dark:text-blue-200">{pedagogy.specialNeeds}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] h-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <TabsTrigger value="guide" className="rounded-lg">Rehber</TabsTrigger>
            <TabsTrigger value="faq" className="rounded-lg">SSS</TabsTrigger>
            <TabsTrigger value="experiences" className="rounded-lg">Tecrübeler</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-lg">Dokümanlar</TabsTrigger>
          </TabsList>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-12">
            {roadmap.map((step, index) => (
              <section key={index} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 pb-12 last:pb-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white dark:ring-slate-950" />
                
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span className="text-blue-600 dark:text-blue-400">Adım {step.step}:</span>
                    {step.title}
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                    {step.description}
                  </p>
                </div>

                <div className="grid gap-6">
                  {step.details.map((detail, idx) => (
                    <Card key={idx} className="border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
                      <CardHeader>
                        <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          {detail.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                          {detail.content}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <FaqSection 
              professionSlug="ozel-egitim-ogretmenligi" 
              initialFaqs={faq}
            />
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
                <ShareExperienceDialog 
                  professionSlug="ozel-egitim-ogretmenligi" 
                  defaultProfessionName="Özel Eğitim Öğretmenliği" 
                />
              </div>
              
              <ExperienceSection professionSlug="ozel-egitim-ogretmenligi" />
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <DocumentSection professionSlug="ozel-egitim-ogretmenligi" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
