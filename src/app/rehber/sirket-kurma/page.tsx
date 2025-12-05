'use client';

import React, { useEffect, useState } from 'react';
import { businessGuideData } from '@/data/business-guide-data';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, PlayCircle, Building2, Scale, TrendingUp, Wallet, Users, Briefcase, Lightbulb, Quote, Calendar, User } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { DocumentSection } from '@/components/document-section';

export default function BusinessGuidePage() {
  const { title, description, videoUrl, sections, faq } = businessGuideData;
  const [experiences, setExperiences] = useState<any[]>([]);

  useEffect(() => {
    async function fetchExperiences() {
      const { data } = await supabase
        .from('experiences')
        .select('*')
        .eq('status', 'approved')
        .or('profession.ilike.%Şirket Kurma%,profession.ilike.%Girişimcilik%')
        .order('created_at', { ascending: false });
      
      if (data) setExperiences(data);
    }
    fetchExperiences();
  }, []);

  const getIconForSection = (id: string) => {
    switch (id) {
      case 'bolum-1': return <Lightbulb className="w-6 h-6 text-yellow-600" />;
      case 'bolum-2': return <Scale className="w-6 h-6 text-blue-600" />;
      case 'bolum-3': return <TrendingUp className="w-6 h-6 text-green-600" />;
      case 'bolum-4': return <Wallet className="w-6 h-6 text-purple-600" />;
      case 'bolum-5': return <Users className="w-6 h-6 text-orange-600" />;
      case 'bolum-6': return <Briefcase className="w-6 h-6 text-red-600" />;
      default: return <Building2 className="w-6 h-6 text-slate-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                Girişimcilik
              </Badge>
              <Badge variant="outline" className="text-slate-600 dark:text-slate-400">
                Rehber
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {description}
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Button 
                className="gap-2"
                onClick={() => document.getElementById('content-start')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <BookOpen className="w-4 h-4" />
                Rehberi Oku
              </Button>
              
              <ShareExperienceDialog 
                professionSlug="sirket-kurma-rehberi" 
                defaultProfessionName="Şirket Kurma / Girişimcilik" 
              />
              
              <UploadDocumentDialog 
                professionSlug="sirket-kurma-rehberi" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl" id="content-start">
        
        {/* Video Section */}
        <div className="mb-12">
          <div className="aspect-video bg-slate-200 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative">
            {videoUrl ? (
              <iframe 
                src={videoUrl.replace("watch?v=", "embed/")} 
                title="Video İçerik"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                <PlayCircle className="w-16 h-16 opacity-50 mb-4" />
                <p className="text-lg font-medium">Video Rehber Yakında Eklenecek</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-12">
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
                      <CardTitle className="text-lg text-blue-700 dark:text-blue-400">
                        {item.subtitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-line">
                        {item.text}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
                    </Accordion>
        </div>

        {/* Experiences Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Quote className="h-6 w-6 text-blue-600" />
              Girişimci Tecrübeleri
            </h2>
            {experiences.length > 0 && (
              <ShareExperienceDialog 
                professionSlug="sirket-kurma-rehberi" 
                defaultProfessionName="Şirket Kurma / Girişimcilik" 
              />
            )}
          </div>
          
          {experiences.length > 0 ? (
            <div className="grid gap-6">
              {experiences.map((exp) => (
                <Card key={exp.id} className="overflow-hidden border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">
                            {exp.is_anonymous ? 'Anonim Girişimci' : exp.full_name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                        {exp.experience_years} Yıl Tecrübe
                      </Badge>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {exp.content}
                      </p>
                    </div>

                    {exp.company_name && !exp.is_anonymous && (
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-sm text-slate-500">
                          <span className="font-medium">Şirket:</span> {exp.company_name}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Quote className="h-8 w-8 text-blue-600 dark:text-blue-400 opacity-50" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Henüz tecrübe paylaşılmamış
                </h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                  Bu alanda tecrübesi olan ilk kişi siz olun ve diğer girişimcilere yol gösterin.
                </p>
                <ShareExperienceDialog 
                  professionSlug="sirket-kurma-rehberi" 
                  defaultProfessionName="Şirket Kurma / Girişimcilik" 
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Documents Section */}
        <DocumentSection professionSlug="sirket-kurma" />
      </div>
    </div>
  );
}
