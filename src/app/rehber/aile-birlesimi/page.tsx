"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Calendar, FileText, CheckCircle2, 
  AlertTriangle, ArrowRight, Plane, Building2, 
  Clock, FileCheck, HelpCircle
} from "lucide-react";
import { familyReunionData } from "@/data/family-reunion";
import { ProfessionVideoPlayer } from "@/components/profession-video-player";

export default function FamilyReunionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      
      {/* HERO SECTION */}
      <section className="bg-primary text-primary-foreground pt-12 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20 shadow-inner">
            <Users className="w-8 h-8 text-accent" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
            {familyReunionData.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {familyReunionData.hero.description}
          </p>
        </div>
      </section>

      {/* Video Box */}
      <div className="container mx-auto px-4 relative z-10 text-center mb-8">
        <ProfessionVideoPlayer professionSlug="aile-birlesimi" variant="hero" fallbackUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20 space-y-12">
        
        {/* KRİTİK UYARI */}
        <Alert className="bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 mt-0.5" />
          <div className="ml-2">
            <AlertTitle className="text-lg font-bold text-amber-900 dark:text-amber-100 mb-2">
              {familyReunionData.warnings[0].title}
            </AlertTitle>
            <AlertDescription className="text-amber-800 dark:text-amber-200 text-base leading-relaxed">
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
          <div className="flex items-center gap-3 mb-6">
            <Badge variant="outline" className="text-base px-3 py-1 border-primary/20 bg-primary/5">
              Adım Adım Süreç
            </Badge>
          </div>

          <div className="grid gap-8 relative">
            {/* Dikey Çizgi (Desktop) */}
            <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-border z-0" />

            {familyReunionData.steps.map((step, index) => (
              <div key={index} className="relative z-10 grid md:grid-cols-[60px_1fr] gap-6">
                
                {/* Numara İkonu */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-md border-4 border-background">
                    {step.number}
                  </div>
                </div>

                {/* İçerik Kartı */}
                <Card className="border-border/60 shadow-sm hover:border-accent/40 transition-colors">
                  <CardHeader className="pb-3 border-b border-border/50 bg-secondary/20">
                    <CardTitle className="flex items-center gap-2 text-xl text-primary dark:text-white">
                      {index === 0 && <Clock className="w-5 h-5 text-accent" />}
                      {index === 1 && <Calendar className="w-5 h-5 text-accent" />}
                      {index === 2 && <FileText className="w-5 h-5 text-accent" />}
                      {index === 3 && <FileCheck className="w-5 h-5 text-accent" />}
                      {index === 4 && <Plane className="w-5 h-5 text-accent" />}
                      {step.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardHeader>
                  
                  <CardContent className="pt-4">
                    {/* Eğer Checklist Varsa (Evraklar) */}
                    {step.checklist ? (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {step.checklist.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-transparent hover:border-border transition-colors">
                            <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.owner === 'TR' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                              {item.owner}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-tight">{item.label}</p>
                              {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Standart Liste */
                      <ul className="space-y-3">
                        {step.items?.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-green-600/70 shrink-0 mt-0.5" />
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
        <section className="bg-gradient-to-br from-secondary/50 to-background rounded-2xl p-6 md:p-10 border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-accent" />
            Önemli İpuçları ve Tavsiyeler
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {familyReunionData.tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-card rounded-xl border border-border/50">
                <div className="mt-1">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}