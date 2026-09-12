"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, Calendar, FileText, CheckCircle2, 
  AlertTriangle, ArrowRight, Plane, Building2, 
  Clock, FileCheck, HelpCircle, Sparkles, MessageSquare
} from "lucide-react";
import { familyReunionData } from "@/data/family-reunion";
import { ProfessionVideoPlayer } from "@/components/profession-video-player";
import { FaqSection } from "@/components/faq-section";
import { aileBirlesimiFaqs } from "@/data/aile-birlesimi-faqs";
import { ShareExperienceDialog } from "@/components/share-experience-dialog";
import { useCommunityUpdates, PageCommunityUpdatesBanner, PageCommunityUpdatesContent } from "@/components/page-community-updates";

export default function FamilyReunionPage() {
  const [activeTab, setActiveTab] = useState("guide");
  const { updates } = useCommunityUpdates("aile-birlesimi");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get("tab");
      if (tabParam && ["guide", "updates", "faq", "experiences"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      
      {/* HERO SECTION */}
      <section className="bg-slate-900 text-white pt-12 pb-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20 shadow-inner">
            <Users className="w-8 h-8 text-amber-400" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            {familyReunionData.hero.title}
          </h1>
          
          <p className="text-base md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {familyReunionData.hero.description}
          </p>
        </div>
      </section>

      {/* Video Box */}
      <div className="container mx-auto px-4 relative z-10 text-center -mt-6 mb-8 max-w-4xl">
        <ProfessionVideoPlayer professionSlug="aile-birlesimi" variant="hero" fallbackUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      </div>

      {/* Telegram Links Section */}
      <div className="container mx-auto px-4 mb-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://t.me/+hQPqtt_SuKMxM2Uy" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-0.5">Aile Birleşimi</div>
                <div className="text-xs text-blue-100">Telegram Grubu</div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </a>

          <a href="https://t.me/+yI1or4k3nMswN2Ni" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center gap-4">
              <div className="p-3 bg-white/25 backdrop-blur-sm rounded-xl shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg mb-0.5">Deutschland Compass</div>
                <div className="text-xs text-amber-100">Telegram Kanalımız</div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/90 transform group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </a>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <div className="container mx-auto px-4 max-w-5xl space-y-8">
        
        {/* Canlı Topluluk Sentez Bilgi Rozeti & Duyuru */}
        <PageCommunityUpdatesBanner 
          categorySlug="aile-birlesimi"
          groupName="AİLE BİRLEŞİMİ GRUBU" 
          updatesCount={updates.length} 
          onExploreClick={() => setActiveTab("updates")} 
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:w-[650px] h-auto p-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
            <TabsTrigger value="guide" className="py-2.5 rounded-lg">Rehber & Süreç</TabsTrigger>
            
            {/* Vurgulu & Dikkat Çekici Güncel Gelişmeler Sekmesi */}
            <TabsTrigger 
              value="updates" 
              className="relative py-2.5 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-amber-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-amber-700 dark:data-[state=inactive]:text-amber-300 data-[state=inactive]:bg-amber-50/60 dark:data-[state=inactive]:bg-amber-950/30"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500 data-[state=active]:bg-white"></span>
              </span>
              <span>⚡ Güncel Gelişmeler</span>
              {updates.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-black rounded-full bg-amber-200 text-amber-950 dark:bg-amber-900 dark:text-amber-100 data-[state=active]:bg-white data-[state=active]:text-amber-700 shadow-2xs">
                  {updates.length}
                </span>
              )}
            </TabsTrigger>

            <TabsTrigger value="faq" className="py-2.5 rounded-lg">SSS</TabsTrigger>
            <TabsTrigger value="experiences" className="py-2.5 rounded-lg">Tecrübeler</TabsTrigger>
          </TabsList>

          {/* Updates Tab */}
          <TabsContent value="updates">
            <PageCommunityUpdatesContent 
              updates={updates} 
              title="Aile Birleşimi" 
              groupName="AİLE BİRLEŞİMİ GRUBU" 
            />
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-8">
            {/* KRİTİK UYARI */}
            <Alert className="bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 shadow-sm">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div className="ml-2">
                <AlertTitle className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
                  {familyReunionData.warnings[0].title}
                </AlertTitle>
                <AlertDescription className="text-amber-800 dark:text-amber-200 text-sm md:text-base leading-relaxed">
                  {familyReunionData.warnings[0].content}
                  {familyReunionData.warnings[0].link && (
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="border-amber-400 text-amber-900 hover:bg-amber-100" asChild>
                        <Link href={familyReunionData.warnings[0].link} target="_blank">
                          {familyReunionData.warnings[0].linkText} <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </AlertDescription>
              </div>
            </Alert>

            {/* SÜREÇ ADIMLARI (STEPS) */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-base px-3 py-1 border-primary/20 bg-primary/5">
                  Adım Adım Başvuru Süreci
                </Badge>
              </div>

              <div className="grid gap-8 relative">
                {/* Dikey Çizgi (Desktop) */}
                <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 dark:bg-slate-800 z-0" />

                {familyReunionData.steps.map((step, index) => (
                  <div key={index} className="relative z-10 grid md:grid-cols-[60px_1fr] gap-6">
                    {/* Numara İkonu */}
                    <div className="flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 flex items-center justify-center font-bold text-xl shadow-md border-4 border-white dark:border-slate-900">
                        {step.number}
                      </div>
                    </div>

                    {/* İçerik Kartı */}
                    <Card className="border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400 transition-colors">
                      <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
                        <CardTitle className="flex items-center gap-2 text-xl text-slate-900 dark:text-white">
                          {index === 0 && <Clock className="w-5 h-5 text-amber-500" />}
                          {index === 1 && <Calendar className="w-5 h-5 text-amber-500" />}
                          {index === 2 && <FileText className="w-5 h-5 text-amber-500" />}
                          {index === 3 && <FileCheck className="w-5 h-5 text-amber-500" />}
                          {index === 4 && <Plane className="w-5 h-5 text-amber-500" />}
                          {step.title}
                        </CardTitle>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">{step.description}</p>
                      </CardHeader>
                      
                      <CardContent className="pt-4">
                        {/* Eğer Checklist Varsa (Evraklar) */}
                        {step.checklist ? (
                          <div className="grid sm:grid-cols-2 gap-4">
                            {step.checklist.map((item, i) => (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                                <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.owner === 'TR' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900' : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900'}`}>
                                  {item.owner}
                                </div>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium leading-tight text-slate-800 dark:text-slate-200">{item.label}</p>
                                  {item.note && <p className="text-xs text-slate-500 dark:text-slate-400">{item.note}</p>}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          /* Standart Liste */
                          <ul className="space-y-3">
                            {step.items?.map((item, i) => (
                              <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* İPUÇLARI VE TAVSİYELER */}
            <section className="bg-gradient-to-br from-slate-100/70 to-white dark:from-slate-900/60 dark:to-slate-950 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white">
                <HelpCircle className="w-6 h-6 text-amber-500" />
                Önemli İpuçları ve Tavsiyeler
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {familyReunionData.tips.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    <div className="mt-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          {/* SSS Tab */}
          <TabsContent value="faq">
            <FaqSection professionSlug="aile-birlesimi" initialFaqs={aileBirlesimiFaqs} />
          </TabsContent>

          {/* Tecrübeler Tab */}
          <TabsContent value="experiences" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Aile Birleşimi Tecrübenizi Paylaşın</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                  Vize randevusu, evrak teslimi veya konsolosluk sürecinde yaşadıklarınızı paylaşarak bu yoldaki diğer ailelere destek olabilirsiniz.
                </p>
              </div>
              <ShareExperienceDialog 
                professionSlug="aile-birlesimi" 
                defaultProfessionName="Aile Birleşimi" 
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}