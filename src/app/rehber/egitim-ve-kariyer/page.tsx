'use client';

import React from 'react';
import { educationCareerGuideData } from '@/data/education-career-guide-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, PlayCircle, GraduationCap, School, Briefcase, Users, HeartHandshake, Lightbulb } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';

export default function EducationCareerGuidePage() {
  const { title, description, videoUrl, sections, summary, faq } = educationCareerGuideData;

  const getIconForSection = (id: string) => {
    switch (id) {
      case 'bolum-1': return <School className="w-6 h-6 text-blue-600" />;
      case 'bolum-2': return <Briefcase className="w-6 h-6 text-green-600" />;
      case 'bolum-3': return <GraduationCap className="w-6 h-6 text-purple-600" />;
      case 'bolum-4': return <Lightbulb className="w-6 h-6 text-yellow-600" />;
      case 'bolum-5': return <HeartHandshake className="w-6 h-6 text-red-600" />;
      case 'bolum-6': return <Users className="w-6 h-6 text-orange-600" />;
      default: return <BookOpen className="w-6 h-6 text-slate-600" />;
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
                Eğitim
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
              {/* Share dialog can be generic or specific if adapted */}
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
                <p className="text-lg font-medium">NotebookLM Video Özeti Yakında Eklenecek</p>
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
                  <Card key={index} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                        {item.subtitle}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="whitespace-pre-line text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Summary Section */}
        <div className="my-16">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-8 rounded-2xl border border-blue-100 dark:border-blue-900/50 shadow-sm">
            <div className="flex items-start gap-4">
              <Lightbulb className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">
                  {summary.title}
                </h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed text-lg">
                  {summary.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-slate-900 dark:text-slate-200">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 dark:text-slate-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </div>
  );
}
