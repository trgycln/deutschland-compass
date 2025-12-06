'use client';

import React, { useEffect, useState } from 'react';
import { businessGuideData } from '@/data/business-guide-data';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Building2, TrendingUp, Users, Briefcase, Lightbulb, Quote, Calendar, User, Sparkles, Shield, MapPin, BarChart3, Globe, FileText, Scale, ClipboardCheck } from 'lucide-react';
import { ShareExperienceDialog } from '@/components/share-experience-dialog';
import { UploadDocumentDialog } from '@/components/upload-document-dialog';
import { DocumentSection } from '@/components/document-section';
import { ProfessionVideoPlayer } from '@/components/profession-video-player';

export default function BusinessGuidePage() {
  const { title, description, videoUrl, sections, faq, detailedReport, jobcenterReport } = businessGuideData;
  const [experiences, setExperiences] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('detailed');

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
      case 'bolum-2': return <Shield className="w-6 h-6 text-blue-600" />;
      case 'bolum-3': return <TrendingUp className="w-6 h-6 text-green-600" />;
      case 'bolum-4': return <Sparkles className="w-6 h-6 text-purple-600" />;
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
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Girişimcilik
                </Badge>
                <Badge variant="outline" className="text-slate-600 dark:text-slate-400">
                  Özel Rehber
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                {title}
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mx-auto md:mx-0">
                {description}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
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

            <div className="w-full md:w-1/3">
              <ProfessionVideoPlayer professionSlug="sirket-kurma-rehberi" variant="hero" fallbackUrl={videoUrl} />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl" id="content-start">
        {/* Tab Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 sticky top-0 z-10 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-3 shadow-md rounded-xl border border-blue-100 dark:border-slate-700 gap-2">
            <TabsTrigger value="main" className="gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm md:text-base font-semibold">
              <BookOpen className="w-5 h-5" />
              <span className="hidden sm:inline">Pratik Rehber</span>
              <span className="sm:hidden">Rehber</span>
            </TabsTrigger>
            <TabsTrigger value="detailed" className="gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 text-sm md:text-base font-semibold">
              <Scale className="w-5 h-5" />
              <span className="hidden sm:inline">Alman Mevzuatı</span>
              <span className="sm:hidden">Mevzuat</span>
            </TabsTrigger>
            <TabsTrigger value="jobcenter" className="gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-teal-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 text-sm md:text-base font-semibold">
              <ClipboardCheck className="w-5 h-5" />
              <span className="hidden sm:inline">Jobcenter & Girişim</span>
              <span className="sm:hidden">Jobcenter</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-amber-50 dark:hover:bg-amber-900/20 text-sm md:text-base font-semibold">
              <span className="text-lg">❓</span>
              <span className="hidden sm:inline">SSS</span>
            </TabsTrigger>
            <TabsTrigger value="experiences" className="gap-2 rounded-lg transition-all duration-200 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-sm md:text-base font-semibold">
              <Quote className="w-5 h-5" />
              <span className="hidden sm:inline">Tecrübeler</span>
              <span className="sm:hidden">Deneyim</span>
            </TabsTrigger>
          </TabsList>

          {/* Main Content Tab */}
          <TabsContent value="main" className="space-y-12">
            {/* Main Content Sections */}
            <div className="space-y-12">
              {sections.map((section, sectionIdx) => (
                <section key={section.id} className="scroll-mt-20" id={section.id}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                        <div className="scale-150">
                          {getIconForSection(section.id)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3 mb-2">
                          {section.title}
                          {section.id === 'bolum-2' && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 px-3 py-1.5 rounded-full border border-blue-300 dark:border-blue-700">
                              <Shield className="w-4 h-4" /> Yasal Zemin
                            </span>
                          )}
                          {section.id === 'bolum-3' && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 dark:bg-green-900/50 dark:text-green-300 px-3 py-1.5 rounded-full border border-green-300 dark:border-green-700">
                              <BarChart3 className="w-4 h-4" /> Finans
                            </span>
                          )}
                          {section.id === 'bolum-4' && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 bg-purple-100 dark:bg-purple-900/50 dark:text-purple-300 px-3 py-1.5 rounded-full border border-purple-300 dark:border-purple-700">
                              <Sparkles className="w-4 h-4" /> Pratik İpucu
                            </span>
                          )}
                          {section.id === 'bolum-5' && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-100 dark:bg-orange-900/50 dark:text-orange-300 px-3 py-1.5 rounded-full border border-orange-300 dark:border-orange-700">
                              <MapPin className="w-4 h-4" /> Konum/İzin
                            </span>
                          )}
                          {section.id === 'bolum-6' && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 dark:bg-red-900/50 dark:text-red-300 px-3 py-1.5 rounded-full border border-red-300 dark:border-red-700">
                              <Globe className="w-4 h-4" /> Ağ & Pazarlama
                            </span>
                          )}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          Bölüm {sectionIdx + 1} - Kapsamlı Bilgiler
                        </p>
                      </div>
                    </div>
                  
                    <div className="grid gap-6">
                      {section.content.map((item, index) => (
                        <Card key={index} className="border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-200">
                          <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 border-b-2 border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-3">
                              <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 text-white font-bold text-sm flex-shrink-0">
                                {String.fromCharCode(65 + index)}
                              </div>
                              <CardTitle className="text-lg font-bold text-blue-900 dark:text-blue-200">
                                {item.subtitle}
                              </CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-6">
                            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed space-y-3">
                              {item.text.split('\n').map((paragraph, pIdx) => (
                                paragraph.trim() && (
                                  <p key={pIdx} className="text-sm md:text-base">
                                    {paragraph}
                                  </p>
                                )
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                </section>
              ))}
            </div>

            {/* Documents Section - Stays in main tab */}
            <DocumentSection professionSlug="sirket-kurma" />
          </TabsContent>

          {/* Jobcenter Tab */}
          <TabsContent value="jobcenter" className="space-y-8">
            {jobcenterReport && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-teal-50 to-slate-50 dark:from-teal-900/20 dark:to-slate-900 border-2 border-teal-300 dark:border-teal-700 rounded-xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <ClipboardCheck className="h-10 w-10 text-teal-700 dark:text-teal-400 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                        {jobcenterReport.title}
                      </h2>
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        {jobcenterReport.intro}
                      </p>
                    </div>
                  </div>
                </div>

                {jobcenterReport.sections.map((section, idx) => (
                  <Card key={section.id} className="border-2 border-teal-200 dark:border-teal-700 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-teal-100 to-teal-50 dark:from-teal-900/40 dark:to-teal-900/20 border-b-2 border-teal-300 dark:border-teal-700">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-teal-600 text-white font-bold text-lg">
                            {idx + 1}
                          </div>
                          <CardTitle className="text-2xl font-bold text-teal-900 dark:text-teal-200">
                            {section.title}
                          </CardTitle>
                        </div>
                        <div className="flex gap-2 flex-wrap ml-13">
                          <Badge variant="secondary" className="bg-teal-200 text-teal-900 dark:bg-teal-900/50 dark:text-teal-200 font-medium">
                            📌 Jobcenter Odaklı
                          </Badge>
                          <Badge variant="secondary" className="bg-blue-100 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200 font-medium">
                            ℹ️ Bildirim Şartları
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-5">
                      {section.content && (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {section.highlight && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-lg p-4">
                          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-start gap-2">
                            <span className="text-lg">⚠️</span>
                            <span>{section.highlight}</span>
                          </p>
                        </div>
                      )}

                      {section.bullets && (
                        <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                          {section.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="pl-1 text-sm md:text-base">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.subsections && section.subsections.map((subsection, subIdx) => {
                        const subsectionData = subsection as any;
                        return (
                        <div key={subIdx} className="bg-gradient-to-br from-teal-50 to-slate-50 dark:from-teal-900/30 dark:to-slate-800/50 rounded-lg p-5 border-2 border-teal-200 dark:border-teal-700 shadow-md">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-teal-600 text-white font-bold text-sm flex-shrink-0 mt-0.5">
                              {String.fromCharCode(65 + subIdx)}
                            </div>
                            <h4 className="font-bold text-lg text-teal-900 dark:text-teal-300">
                              {subsection.title}
                            </h4>
                          </div>

                          {subsectionData.content && (
                            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed ml-11">
                              {subsectionData.content}
                            </p>
                          )}

                          {subsectionData.bullets && (
                            <ul className="list-disc ml-14 space-y-2 text-slate-700 dark:text-slate-300">
                              {subsectionData.bullets.map((bullet: string, i: number) => (
                                <li key={i} className="text-sm md:text-base">{bullet}</li>
                              ))}
                            </ul>
                          )}

                          {subsectionData.table && (
                            <div className="overflow-x-auto ml-11 mt-4">
                              <div className="bg-teal-50 dark:bg-teal-900/20 p-3 rounded-t-lg border border-teal-300 dark:border-teal-700">
                                <p className="text-sm font-semibold text-teal-900 dark:text-teal-300">📊 Gelir Muafiyet Tablosu</p>
                              </div>
                              <table className="w-full text-sm border-collapse border border-teal-300 dark:border-teal-700">
                                <thead>
                                  <tr className="bg-gradient-to-r from-teal-200 to-teal-100 dark:from-teal-900/50 dark:to-teal-900/30">
                                    {subsectionData.table.headers.map((header: string, idx: number) => (
                                      <th key={idx} className="border border-teal-300 dark:border-teal-700 p-3 text-left font-bold text-teal-900 dark:text-teal-200">
                                        {header}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {subsectionData.table.rows.map((row: string[], rowIdx: number) => (
                                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-white dark:bg-slate-800'}>
                                      {row.map((cell: string, cellIdx: number) => (
                                        <td key={cellIdx} className="border border-teal-300 dark:border-teal-700 p-3 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                          {cell}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {subsectionData.note && (
                            <div className="mt-4 ml-11 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-2 border-amber-400 dark:border-amber-600 rounded-lg p-4">
                              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-start gap-2">
                                <span className="text-lg">💡</span>
                                <span>{subsectionData.note}</span>
                              </p>
                            </div>
                          )}
                        </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}

                <Card className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 border-teal-200 dark:border-teal-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-teal-900 dark:text-teal-300 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Video Özeti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      Jobcenter (SGB II) desteğiyle şirket kurma sürecinin görsel anlatımı burada yer alacak.
                    </p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-teal-300 dark:border-teal-700 p-8 text-center min-h-[260px] flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 text-teal-600 mx-auto mb-3 opacity-60" />
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                          Video yakında eklenecek
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                          SGB II bildirim adımları ve muafiyet hesabı anlatımı
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-emerald-900 dark:text-emerald-300">
                      {jobcenterReport.conclusion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {jobcenterReport.conclusion.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Detailed German Law Tab */}
          <TabsContent value="detailed" className="space-y-8">
            {detailedReport && (
              <div className="space-y-8">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-slate-50 dark:from-blue-900/20 dark:to-slate-900 border-2 border-blue-300 dark:border-blue-700 rounded-xl p-8 shadow-lg">
                  <div className="flex items-start gap-4">
                    <Scale className="h-10 w-10 text-blue-700 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                        {detailedReport.title}
                      </h2>
                      <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                        {detailedReport.intro}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Legal Status */}
                <Card className="border-blue-200 dark:border-blue-800">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                    <CardTitle className="text-xl text-blue-900 dark:text-blue-300 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      {detailedReport.legalStatus.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {detailedReport.legalStatus.content}
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <p className="text-sm text-yellow-900 dark:text-yellow-200">
                        <strong>⚠️ {detailedReport.legalStatus.highlight}</strong>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Main Sections */}
                {detailedReport.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <Card className="border-2 border-blue-300 dark:border-blue-600 shadow-lg">
                      <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-900/20 border-b-2 border-blue-300 dark:border-blue-700">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold text-lg">
                              {idx + 1}
                            </div>
                            <CardTitle className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                              {section.title}
                            </CardTitle>
                          </div>
                          <div className="flex gap-2 flex-wrap ml-13">
                            <Badge variant="secondary" className="bg-blue-200 text-blue-900 dark:bg-blue-900/50 dark:text-blue-200 font-medium">
                              📋 Kapsamlı Rehber
                            </Badge>
                            <Badge variant="secondary" className="bg-green-200 text-green-900 dark:bg-green-900/50 dark:text-green-200 font-medium">
                              ✓ Resmi Bilgiler
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-6">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {section.content}
                        </p>

                        {/* Subsections */}
                        {section.subsections && section.subsections.map((subsection, subIdx) => (
                          <div key={subIdx} className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-blue-900/30 dark:to-slate-800/50 rounded-lg p-5 border-2 border-blue-200 dark:border-blue-700 shadow-md">
                            <div className="flex items-start gap-3 mb-3">
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold text-sm flex-shrink-0 mt-0.5">
                                {String.fromCharCode(65 + subIdx)}
                              </div>
                              <h4 className="font-bold text-lg text-blue-900 dark:text-blue-300">
                                {subsection.title}
                              </h4>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed ml-11">
                              {subsection.content}
                            </p>

                            {/* Table if present */}
                            {subsection.table && (
                              <div className="overflow-x-auto ml-11 mt-4">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-t-lg border border-blue-300 dark:border-blue-700">
                                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">📊 Karşılaştırmalı Tablo</p>
                                </div>
                                <table className="w-full text-sm border-collapse border border-blue-300 dark:border-blue-700">
                                  <thead>
                                    <tr className="bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900/50 dark:to-blue-900/30">
                                      {subsection.table.headers.map((header, idx) => (
                                        <th key={idx} className="border border-blue-300 dark:border-blue-700 p-3 text-left font-bold text-blue-900 dark:text-blue-200">
                                          {header}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {subsection.table.rows.map((row, rowIdx) => (
                                      <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'}>
                                        {row.map((cell, cellIdx) => (
                                          <td key={cellIdx} className="border border-blue-300 dark:border-blue-700 p-3 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                            {cell}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {/* Note if present */}
                            {subsection.note && (
                              <div className="mt-4 ml-11 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border-2 border-amber-400 dark:border-amber-600 rounded-lg p-4">
                                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 flex items-start gap-2">
                                  <span className="text-lg">💡</span>
                                  <span>{subsection.note}</span>
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Steps if present */}
                        {section.steps && (
                          <div className="space-y-3">
                            {section.steps.map((step, stepIdx) => (
                              <div key={stepIdx} className="flex gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex-shrink-0">
                                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-semibold text-sm">
                                    {step.step}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-semibold text-slate-900 dark:text-white mb-1">
                                    {step.title}
                                  </h5>
                                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                                    {step.desc}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Table for tax section */}
                        {section.table && !section.subsections && (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-blue-100 dark:bg-blue-900/30">
                                  {section.table.headers.map((header, idx) => (
                                    <th key={idx} className="border border-slate-300 dark:border-slate-600 p-3 text-left font-semibold text-slate-900 dark:text-white">
                                      {header}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {section.table.rows.map((row, rowIdx) => (
                                  <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-800'}>
                                    {row.map((cell, cellIdx) => (
                                      <td key={cellIdx} className="border border-slate-300 dark:border-slate-600 p-3 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Note for tax section */}
                        {section.note && (
                          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-sm text-red-900 dark:text-red-200">
                              <strong>⚠️ {section.note}</strong>
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}

                {/* Video Summary Placeholder */}
                <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-900 dark:text-purple-300 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Video Özeti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-700 dark:text-slate-300">
                      Aşağıdaki bölümde, Almanya'da şirket kuruluşunun tüm adımlarını görsel ve sesli şekilde anlatan kapsamlı bir video bulunacaktır.
                    </p>
                    <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-dashed border-purple-300 dark:border-purple-700 p-8 text-center min-h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-3 opacity-50" />
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                          Video yakında eklenecek
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                          Detaylı kurulum sürecinin video demonstrasyonu
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conclusion */}
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-900 dark:text-green-300">
                      {detailedReport.conclusion.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {detailedReport.conclusion.content}
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                ❓ Sıkça Sorulan Sorular
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Girişimcilik yolunda sık karşılaşılan soruların yanıtları</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-2 border-amber-200 dark:border-amber-700 rounded-lg px-4 overflow-hidden hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all">
                  <AccordionTrigger className="text-left font-semibold text-amber-900 dark:text-amber-200 hover:text-amber-700 dark:hover:text-amber-300">
                    <span className="flex items-center gap-2 text-base md:text-lg">
                      <span className="text-xl">❓</span>
                      {item.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-700 dark:text-slate-300 pt-4 pb-4 border-t border-amber-200 dark:border-amber-700">
                    <div className="flex gap-3">
                      <span className="text-xl font-bold text-green-600 dark:text-green-400 flex-shrink-0">✓</span>
                      <p className="text-sm md:text-base leading-relaxed">{item.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
                💬 Girişimci Tecrübeleri
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">Başarılı girişimcilerden öğrenin ve ilham alın</p>
            </div>

            <div className="flex justify-center mb-8">
              {experiences.length > 0 && (
                <ShareExperienceDialog 
                  professionSlug="sirket-kurma-rehberi" 
                  defaultProfessionName="Şirket Kurma / Girişimcilik" 
                />
              )}
            </div>

            {experiences.length > 0 ? (
              <div className="grid gap-6">
                {experiences.map((exp, expIdx) => (
                  <Card key={exp.id} className="overflow-hidden border-l-4 border-l-green-500 hover:shadow-lg hover:border-l-green-600 transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                            {String.fromCharCode(65 + (expIdx % 26))}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-lg">
                              {exp.name || 'Anonim Girişimci'}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(exp.created_at).toLocaleDateString('tr-TR')}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-900 dark:bg-green-900/50 dark:text-green-200 font-semibold px-3 py-1">
                          {exp.profession}
                        </Badge>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border-l-4 border-l-green-500">
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                          {exp.content}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-slate-800 border-2 border-dashed border-green-300 dark:border-green-700">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 flex items-center justify-center mb-4">
                    <Quote className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Henüz tecrübe paylaşılmamış
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mb-8">
                    Bu alanda tecrübesi olan ilk kişi siz olun ve diğer girişimcilere yol gösterin.
                  </p>
                  <ShareExperienceDialog 
                    professionSlug="sirket-kurma-rehberi" 
                    defaultProfessionName="Şirket Kurma / Girişimcilik" 
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}