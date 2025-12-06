
'use client';

import React, { useEffect, useState } from 'react';
import { geographyTeacherData } from '@/data/geography-teacher-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Map, 
  School, 
  Briefcase, 
  Users, 
  Info, 
  CheckCircle2, 
  Landmark, 
  Award, 
  Route, 
  MessageCircle,
  PlayCircle,
  AlertTriangle,
  Globe
} from 'lucide-react';
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
  const { title, description, sections, faq, stats, videoUrl: defaultVideoUrl, analogy } = geographyTeacherData;
  const [videoUrl, setVideoUrl] = useState(defaultVideoUrl);
  const [pageTitle, setPageTitle] = useState(title);
  const [pageDescription, setPageDescription] = useState(description);

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

  const getIconForSection = (id: string) => {
    switch (id) {
      case 'hazirlik-ve-on-sartlar': return <CheckCircle2 className="w-6 h-6 text-blue-600" />;
      case 'varis-ve-finansal-teminat': return <Landmark className="w-6 h-6 text-green-600" />;
      case 'mesleki-yeterlilik-anerkennung': return <Award className="w-6 h-6 text-purple-600" />;
      case 'kariyer-yollari': return <Route className="w-6 h-6 text-orange-600" />;
      case 'is-hayati-ve-statuler': return <Briefcase className="w-6 h-6 text-indigo-600" />;
      case 'is-gorusmesi-ve-pedagoji': return <Users className="w-6 h-6 text-pink-600" />;
      case 'ek-bilgiler': return <Info className="w-6 h-6 text-slate-600" />;
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
            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
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
                  className="gap-2"
                  onClick={() => document.getElementById('content-section')?.scrollIntoView({ behavior: 'smooth' })}
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
      <div id="content-section" className="container mx-auto px-4 py-12 max-w-5xl">
        
        {/* Analogy Section */}
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
            <TabsTrigger value="experiences">Deneyimler</TabsTrigger>
            <TabsTrigger value="faq">SSS</TabsTrigger>
            <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-8">
            {sections && sections.map((section) => (
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
                        <CardTitle className="text-lg text-blue-700 dark:text-blue-400">
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

          <TabsContent value="experiences">
            <ExperienceSection professionSlug="cografya-ogretmenligi" />
          </TabsContent>

          <TabsContent value="faq">
            <FaqSection professionSlug="cografya-ogretmenligi" initialFaqs={faq} />
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
