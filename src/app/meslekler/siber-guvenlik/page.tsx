'use client';

import React from 'react';
import { cyberSecurityData } from '@/data/cyber-security-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookOpen, PlayCircle, GraduationCap, School, Briefcase, Users, HeartHandshake, Lightbulb, ArrowLeft, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';

export default function CyberSecurityPage() {
  const { title, description, videoUrl, stats, roadmap, pedagogy, faq } = cyberSecurityData;

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
              <Badge variant="secondary" className="bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-500/50">
                Siber Güvenlik
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
                  <MapIcon className="w-6 h-6" />
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
              <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-100 dark:border-indigo-900">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg text-indigo-600 dark:text-indigo-400">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl text-indigo-900 dark:text-indigo-100">
                      {pedagogy.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-indigo dark:prose-invert max-w-none">
                    <p className="text-indigo-800 dark:text-indigo-200 leading-relaxed whitespace-pre-line">
                      {pedagogy.content}
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900/50">
                      <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Çalışma Ortamı
                      </h4>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        {pedagogy.specialNeeds}
                      </p>
                    </div>
                    <div className="bg-white/60 dark:bg-slate-900/60 rounded-lg p-4 border border-indigo-100 dark:border-indigo-900/50">
                      <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Kaynaklar
                      </h4>
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
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

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share Experience Card */}
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <HeartHandshake className="w-6 h-6 text-blue-200" />
                  Tecrübeni Paylaş
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-100">
                  Siber güvenlik alanındaki tecrübeleriniz, yeni başlayanlar için çok değerli. Hikayenizi paylaşarak topluluğa katkıda bulunun.
                </p>
                <ShareExperienceDialog professionSlug="siber-guvenlik" defaultProfessionName="Siber Güvenlik" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  )
}
