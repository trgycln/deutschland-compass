'use client';

import React from 'react';
import { sapData } from '@/data/sap-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, PlayCircle, GraduationCap, School, Briefcase, Users, HeartHandshake, Lightbulb, ArrowLeft, CheckCircle2, AlertCircle, ExternalLink, Database, Server, Layers } from 'lucide-react';
import Link from 'next/link';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { DocumentSection } from '@/components/document-section';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';

export default function SapPage() {
  const { title, description, videoUrl, stats, roadmap, pedagogy, faq } = sapData;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <Link 
            href="/meslekler/bilisim-it" 
            className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Bilişim (IT) Sayfasına Dön
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Badge variant="secondary" className="bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 border-blue-500/50">
                SAP & ERP
              </Badge>
              <Badge variant="outline" className="text-slate-400 border-slate-700">
                Kariyer Rehberi
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4">
                  <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                  <div className="font-semibold text-lg flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${stat.color}`} />
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Telegram Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6">
              <a
                href="https://t.me/+_5ox6dqGidcwOGMy"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">IT Bilişim Grubu</div>
                    <div className="text-xs text-blue-100 opacity-90">Telegram'da bize katıl</div>
                  </div>
                  <svg className="w-5 h-5 text-white/80 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
              <a
                href="https://t.me/+yI1or4k3nMswN2Ni"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white text-sm">Deutschland Compass</div>
                    <div className="text-xs text-amber-100 opacity-90">Kanalımıza katıl</div>
                  </div>
                  <svg className="w-5 h-5 text-white/80 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Roadmap Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Kariyer Yol Haritası
                </h2>
              </div>

              <div className="space-y-8">
                {roadmap.map((step, index) => (
                  <div key={index} className="relative pl-8 md:pl-0">
                    {/* Timeline Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 md:hidden" />
                    
                    <Card className="relative border-slate-200 dark:border-slate-800 overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-bold text-sm border-4 border-white dark:border-slate-950 shadow-sm z-10">
                            {step.step}
                          </div>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 pl-12">
                          {step.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pl-12">
                        <div className="grid gap-4">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                {detail.title}
                              </h4>
                              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                {detail.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </section>

            {/* Pedagogy/Analogy Section */}
            <section>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-100 dark:border-blue-900">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600 dark:text-blue-400">
                      <Database className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl text-blue-900 dark:text-blue-100">
                      {pedagogy.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-blue dark:prose-invert max-w-none">
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed whitespace-pre-line">
                      {pedagogy.content}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Özel Gereksinimler
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {pedagogy.specialNeeds}
                      </p>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-blue-100 dark:border-blue-900/50">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Kaynaklar
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        {pedagogy.resources}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* FAQ Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 dark:text-orange-400">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Sıkça Sorulan Sorular
                </h2>
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faq.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-slate-200 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-900 px-4">
                    <AccordionTrigger className="text-left hover:no-underline py-4 font-medium text-slate-900 dark:text-slate-100">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 pb-4 leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Documents Section */}
            <section className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Örnek Dokümanlar</h2>
                <UploadDocumentDialog professionSlug="sap-uzmanligi" />
              </div>
              <DocumentSection professionSlug="sap-uzmanligi" />
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Experience Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white border-none shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HeartHandshake className="w-6 h-6 text-blue-200" />
                  Tecrübeni Paylaş
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  SAP alanındaki tecrübeleriniz, yeni başlayanlar için çok değerli. Hikayenizi paylaşarak topluluğa katkıda bulunun.
                </p>
                <ShareExperienceDialog professionSlug="sap-uzmanligi" defaultProfessionName="SAP Uzmanlığı" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
