"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils, PenTool, BookOpen, ArrowRight } from "lucide-react";

export function HomeCompactCards() {
  return (
    <section className="py-10 md:py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Özel Rehberler & Topluluk Köşeleri
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Sıkça ziyaret edilen favori kaynaklarımız ve yazarlarımız.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Helal Mekanlar Kartı (Kompakt ve Şık) */}
          <Link href="/rehber/helal-mekanlar" className="group flex flex-col">
            <Card className="h-full border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-400">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[11px] font-semibold border-amber-300 dark:border-amber-800 bg-amber-100/60 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">
                    Çok Ziyaret Edilen
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Helal Mekanlar Rehberi
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                  Almanya ve Avrupa genelinde topluluk tavsiyeleriyle derlenen güvenilir restoranlar, kafeler ve yeni eklenen mekanlar.
                </p>

                <div className="pt-3 border-t border-amber-200/50 dark:border-amber-900/40 flex items-center justify-between text-xs font-semibold text-amber-700 dark:text-amber-400 group-hover:text-amber-800 dark:group-hover:text-amber-300">
                  <span>Mekanları İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 2. Gurbet Kalemleri */}
          <Link href="/gurbet-kalemleri" className="group flex flex-col">
            <Card className="h-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[11px] font-semibold border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                    Köşe Yazıları
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Gurbet Kalemleri
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                  Topluluğumuz yazarlarından göç tecrübeleri, hayat dersleri, denemeler ve gerçek yaşam öyküleri.
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  <span>Yazıları Oku</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* 3. Güncel Blog & Bilgi Bankası */}
          <Link href="/blog" className="group flex flex-col">
            <Card className="h-full border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <Badge variant="outline" className="text-[11px] font-semibold border-blue-200 dark:border-blue-900/60 text-blue-700 dark:text-blue-300">
                    Blog & Rehberler
                  </Badge>
                </div>

                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Güncel Blog
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 flex-1">
                  Almanya'da yaşam, bürokrasi, eğitim ve çalışma hayatına dair pratik rehberler ve kapsamlı inceleme yazıları.
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  <span>Yazıları İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}
