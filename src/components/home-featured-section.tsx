"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Sparkles, FileCheck, ArrowRight, PenTool } from "lucide-react";

export function HomeFeaturedSection() {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Ana Manset (Helal Mekanlar) */}
          <div className="lg:col-span-8 flex">
            <Card className="w-full flex flex-col border-2 border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 hover:border-amber-400 dark:hover:border-amber-700 transition-all duration-300 shadow-md hover:shadow-lg group overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white border-none shadow-sm">
                  Öne Çikan
                </Badge>
              </div>
              <CardContent className="p-8 flex-1 flex flex-col justify-center relative z-10">
                <div className="bg-amber-100 dark:bg-amber-900/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                  <Utensils className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  Helal Mekanlar Rehberi
                </h2>
                
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-2xl leading-relaxed">
                  Almanya ve Avrupa genelinde, toplulugun tecrübeleriyle derlenen güvenilir restoranlar. Yeni eklenen mekanlari kesfedin ve kendi deneyimlerinizi paylasin.
                </p>
                
                <div className="mt-auto flex items-center gap-4">
                  <Link 
                    href="/rehber/helal-mekanlar"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium transition-colors shadow-sm gap-2"
                  >
                    Rehberi Incele <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:inline-block">
                    Sürekli güncellenmektedir
                  </span>
                </div>
              </CardContent>
              {/* Dekoratif arka plan efekti */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-200/40 dark:bg-amber-800/20 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-300/40 dark:group-hover:bg-amber-700/30 transition-colors" />
            </Card>
          </div>

          {/* Yan Mansetler (Haber Küpürleri) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Küpür 1: AI Kariyerleri */}
            <Link href="/rehber/yapay-zeka-kariyerleri" className="flex-1">
              <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-fuchsia-300 dark:hover:border-fuchsia-800 bg-white dark:bg-slate-900 transition-all shadow-sm hover:shadow-md group">
                <CardContent className="p-5 h-full flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-fuchsia-100 dark:bg-fuchsia-900/50 p-2 rounded-lg">
                      <Sparkles className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400" />
                    </div>
                    <Badge variant="outline" className="text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50 dark:bg-fuchsia-950/50">
                      Yeni Rehber
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                    Yapay Zeka (AI) Kariyerleri
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    Geleneksel mesleklerin disinda, yapay zeka alaninda Almanya'daki yeni is firsatlari ve egitim yollari.
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Küpür 2: Aile Birlesimi */}
            <Link href="/rehber/aile-birlesimi" className="flex-1">
              <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-800 bg-white dark:bg-slate-900 transition-all shadow-sm hover:shadow-md group">
                <CardContent className="p-5 h-full flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-3">
                    <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                      <FileCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      En Çok Okunan
                    </Badge>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Aile Birlesimi Rehberi
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    Vize basvurusu, randevu süreçleri ve gerekli evraklar hakkinda en kapsamli ve güncel bilgiler.
                  </p>
                </CardContent>
              </Card>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
