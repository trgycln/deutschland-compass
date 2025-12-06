'use client';

import React, { useEffect, useState } from 'react';
import { logisticsGuideData } from '@/data/logistics-guide-data';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Truck, Package, Languages, Building2, Quote, Calendar, User, AlertTriangle, HelpCircle } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { FaqSection } from '@/components/faq-section';

interface Experience {
  id: number;
  created_at: string;
  name: string;
  profession: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
}

function getEmbedUrl(url: string) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function LogisticsGuidePage() {
  const { title, description, sections, faq, stats, videoUrl: defaultVideoUrl, analogy } = logisticsGuideData;
  const [experiences, setExperiences] = useState<Experience[]>([]);
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
        .or('profession.ilike.%Kargo%,profession.ilike.%Posta%,profession.ilike.%Dağıtım%,profession.ilike.%Lojistik%')
        .order('created_at', { ascending: false });
      
      if (expData) setExperiences(expData);

      // Fetch profession details (video, title, description)
      const { data: profData } = await supabase
        .from('professions')
        .select('video_url, title, description')
        .eq('slug', 'kargo-posta-dagitim')
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
      case 'hazirlik-ve-basvuru': return <Languages className="w-6 h-6 text-purple-600" />;
      case 'vize-ve-ise-baslama': return <Building2 className="w-6 h-6 text-blue-600" />;
      case 'is-hayati-ve-sartlar': return <Truck className="w-6 h-6 text-orange-600" />;
      case 'alternatif-isler': return <Package className="w-6 h-6 text-green-600" />;
      case 'ek-bilgiler': return <HelpCircle className="w-6 h-6 text-slate-600" />;
      default: return <Package className="w-6 h-6 text-slate-600" />;
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
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-300">{parts}</span>
          </li>
        );
      } else {
        if (currentList.length > 0) {
          elements.push(<ul key={`list-${index}`} className="mb-4 pl-2">{currentList}</ul>);
          currentList = [];
        }

        if (trimmedLine === '') {
          // Skip empty lines to avoid too much spacing
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
                <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50">Lojistik</Badge>
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
                  className="gap-2 bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <BookOpen className="w-4 h-4" />
                  Rehbere Başla
                </Button>
                <ShareExperienceDialog 
                  professionSlug="kargo-posta-dagitim" 
                  defaultProfessionName="Kargo ve Posta Dağıtım" 
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
                  <Truck className="w-12 h-12 opacity-50" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div id="content-section" className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* Info Alert */}
        {analogy && (
          <div className="mb-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">{analogy.title}</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
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
                        <CardTitle className="text-lg text-orange-700 dark:text-orange-400">
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
              professionSlug="kargo-posta-dagitim" 
              initialFaqs={faq}
            />
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl border border-orange-100 dark:border-orange-800">
                <div>
                  <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">Sizin Tecrübeniz Değerli</h3>
                  <p className="text-orange-700 dark:text-orange-300 text-sm mt-1">
                    Bu yoldan geçmiş biri olarak, tecrübelerinizi paylaşarak yeni gelenlere ışık tutabilirsiniz.
                  </p>
                </div>
                <ShareExperienceDialog 
                  professionSlug="kargo-posta-dagitim" 
                  defaultProfessionName="Kargo ve Posta Dağıtım" 
                />
              </div>
              
              {experiences.length > 0 ? (
                <div className="grid gap-6">
                  {experiences.map((exp) => (
                    <Card key={exp.id} className="overflow-hidden border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                              <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {exp.name || 'Anonim'}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
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
                    <div className="h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                      <Quote className="h-8 w-8 text-orange-600 dark:text-orange-400 opacity-50" />
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
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">Kaynak Paylaşımı</h3>
                  <p className="text-indigo-700 dark:text-indigo-300 text-sm mt-1">
                    Elinizdeki ders notlarını, sunumları veya faydalı belgeleri paylaşarak meslektaşlarınıza destek olun.
                  </p>
                </div>
                <UploadDocumentDialog 
                  professionSlug="kargo-posta-dagitim" 
                />
              </div>
              
              <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                    <Building2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400 opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Henüz belge paylaşılmamış
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md">
                    Bu alan için henüz bir belge yüklenmedi.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
