'use client';

import React, { useEffect, useState } from 'react';
import { erzieherinData } from '@/data/erzieherin-data';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Baby, GraduationCap, FileText, Briefcase, Globe, Building2, Quote, Calendar, User, AlertTriangle, Heart, Users } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { FaqSection } from '@/components/faq-section';
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

export default function ErzieherinGuidePage() {
  const { title, description, sections, faq, stats, videoUrl: defaultVideoUrl, analogy } = erzieherinData;
  const [experiences, setExperiences] = useState<any[]>([]);
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
  const [pageTitle, setPageTitle] = useState(title);
  const [pageDescription, setPageDescription] = useState(description);

  useEffect(() => {
    async function fetchPageData() {
      // Fetch experiences
      const { data: expData } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Erzieher%,profession.ilike.%Çocuk%,profession.ilike.%Anaokulu%,profession.ilike.%Pedagog%')
        .order('created_at', { ascending: false });
      
      if (expData) setExperiences(expData);

      // Fetch profession details (video, title, description)
      const { data: profData } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'erzieherin')
        .single();
      
      if (profData) {
        if (profData.video_url) setVideoUrl(profData.video_url);
        if (profData.title) setPageTitle(profData.title);
        if (profData.description) setPageDescription(profData.description);
      }
    }
    fetchPageData();
  }, []);

  const getIconForSection = (id: string) => {
    switch (id) {
      case 'mesleki-temeller': return <GraduationCap className="w-6 h-6 text-blue-600" />;
      case 'vize-ve-ikamet': return <Globe className="w-6 h-6 text-orange-600" />;
      case 'kariyer-yollari': return <Briefcase className="w-6 h-6 text-purple-600" />;
      case 'is-hayati': return <Heart className="w-6 h-6 text-red-600" />;
      default: return <BookOpen className="w-6 h-6 text-slate-600" />;
    }
  };

  const formatText = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: React.ReactNode[] = [];

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('•')) {
        const lineContent = line.replace('•', '').trim();
        const parts = lineContent.split(/(\*\*.*?\*\*)/g).map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        currentList.push(
          <li key={index} className="flex items-start gap-2 mb-2">
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">{parts}</span>
          </li>
        );
      } else {
        if (currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="mb-4 pl-2">{currentList}</ul>);
          currentList = [];
        }

        if (trimmedLine === '') {
          // Skip empty lines
        } else {
          const parts = line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">{part.slice(2, -2)}</strong>;
            }
            return part;
          });

          elements.push(
            <p key={index} className="mb-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              {parts}
            </p>
          );
        }
      }
    });

    if (currentList.length > 0) {
      elements.push(<ul key="list-end" className="mb-4 pl-2">{currentList}</ul>);
    }

    return elements;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b">
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Badge variant="outline" className="text-purple-600 border-purple-200 bg-purple-50">Eğitim & Sosyal</Badge>
                <Badge variant="outline" className="text-slate-600">Meslek Rehberi</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {pageTitle}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                {pageDescription}
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                {stats && stats.map((stat, index) => (
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
                  className="gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-4 h-4" />
                  Rehbere Başla
                </Button>
                <ShareExperienceDialog 
                  professionSlug="erzieherin" 
                  defaultProfessionName="Erzieherin (Çocuk Eğitmeni)" 
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
                <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                  <Baby className="w-12 h-12 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

        {/* Telegram Links Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <a href="https://t.me/+V03ZgVzm6XAxNDVi" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg mb-1">Erzieher/Erzieherin</div>
                  <div className="text-sm text-blue-100">Telegram Grubu</div>
                </div>
                <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a href="https://t.me/+yI1or4k3nMswN2Ni" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center gap-4">
                <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-lg mb-1">Deutschland Compass</div>
                  <div className="text-sm text-amber-100">Telegram Kanalımız</div>
                </div>
                <svg className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>

      {/* Main Content */}
      <div id="content-section" className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Info Alert / Analogy */}
        {analogy && (
          <div className="mb-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">{analogy.title}</h3>
              <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed">
                {analogy.description}
              </p>
            </div>
          </div>
        )}

        <Tabs defaultValue="guide" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[600px] h-auto">
            <TabsTrigger value="guide">Rehber</TabsTrigger>
            <TabsTrigger value="faq">SSS</TabsTrigger>
            <TabsTrigger value="experiences">Tecrübeler</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} className="scroll-mt-20" id={section.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
                    {getIconForSection(section.id)}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                
                <div className="grid gap-6">
                  {section.content.map((item, index) => (
                    <Card key={index} className="border-slate-200 dark:border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-700 dark:text-purple-400">
                          {item.subtitle}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="prose dark:prose-invert max-w-none">
                          {formatText(item.text)}
                        </div>
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
              professionSlug="erzieherin" 
              initialFaqs={faq}
            />
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-100 dark:border-purple-800">
                <div>
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Sizin Tecrübeniz Değerli</h3>
                  <p className="text-purple-700 dark:text-purple-300 text-sm mt-1">
                    Bu yoldan geçmiş biri olarak, tecrübelerinizi paylaşarak yeni gelenlere ışık tutabilirsiniz.
                  </p>
                </div>
                <ShareExperienceDialog 
                  professionSlug="erzieherin" 
                  defaultProfessionName="Erzieherin (Çocuk Eğitmeni)" 
                />
              </div>
              
              {experiences.length > 0 ? (
                <div className="grid gap-6">
                  {experiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden border-l-4 border-l-purple-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                              <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {exp.name || 'Anonim Çalışan'}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
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
                    <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                      <Quote className="h-8 w-8 text-purple-600 dark:text-purple-400 opacity-50" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      Henüz tecrübe paylaşılmamış
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                      Bu alanda tecrübesi olan ilk kişi siz olun ve diğer adaylara yol gösterin.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <DocumentSection professionSlug="erzieherin" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
