"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, FileCheck, Bus, GraduationCap, ArrowRight, Newspaper } from "lucide-react";

interface ClippingItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  summary: string;
  href: string;
  icon: typeof Sparkles;
  dateTag?: string;
}

const CLIPPINGS: ClippingItem[] = [
  {
    id: "ai-careers",
    badge: "Öne Çıkan",
    badgeColor: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/70 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800",
    title: "Yapay Zeka (AI) Kariyerleri ve Fırsatlar",
    summary: "Almanya'da yükselen teknoloji sektöründe yeni çalışma alanları, aranan yetkinlikler ve eğitim fonu (Bildungsgutschein) yolları.",
    href: "/rehber/yapay-zeka-kariyerleri",
    icon: Sparkles,
    dateTag: "Yeni Rehber"
  },
  {
    id: "family-reunion",
    badge: "Kritik Dosya",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    title: "Aile Birleşimi ve Vize Süreçleri",
    summary: "Konsolosluk randevuları, gereken evrak kontrol listesi, dil yeterliliği ve bürokratik aşamalar hakkında eksiksiz rehber.",
    href: "/rehber/aile-birlesimi",
    icon: FileCheck,
    dateTag: "En Çok Okunan"
  },
  {
    id: "bus-driver",
    badge: "Hızlı Geçiş",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    title: "Otobüs Şoförlüğü (Busfahrer) Rehberi",
    summary: "İHK hızlandırılmış sınavları, ehliyet denklikleri, şirket destekli maaşlı kurslar ve Almanya'da geniş istihdam imkanları.",
    href: "/rehber/otobus-soforlugu",
    icon: Bus,
    dateTag: "Popüler"
  },
  {
    id: "anerkennung",
    badge: "Temel Adım",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    title: "Diploma ve Mesleki Denklik (ZAB)",
    summary: "Diplomanızın Almanya'da geçerliliğini sağlama, ZAB başvuru adımları ve Jobcenter tercüme finansman destekleri.",
    href: "/rehber/anerkennung",
    icon: GraduationCap,
    dateTag: "Güncellendi"
  }
];

export function HomeNewsClippings() {
  return (
    <section className="py-8 md:py-10 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Üst Başlık - Gazete Bülteni Teması */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 rounded-md">
              <Newspaper className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-slate-100">
                Günün Öne Çıkan Başlıkları & Rehberler
              </h2>
            </div>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline-block">
            Önemli Dosyalar & Hızlı Başlangıç
          </span>
        </div>

        {/* 4'lü Gazete Küpürü Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CLIPPINGS.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className="group flex flex-col"
              >
                <Card className="h-full border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 shadow-xs hover:shadow-md hover:border-amber-400 dark:hover:border-amber-600 transition-all duration-200 flex flex-col justify-between">
                  <CardContent className="p-4 sm:p-5 flex flex-col h-full">
                    {/* Üst Rozet Satırı */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <Badge 
                        variant="outline" 
                        className={`text-[11px] font-semibold px-2 py-0.5 border ${item.badgeColor}`}
                      >
                        {item.badge}
                      </Badge>
                      {item.dateTag && (
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          {item.dateTag}
                        </span>
                      )}
                    </div>

                    {/* Başlık */}
                    <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    {/* Özet Metin */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed flex-1">
                      {item.summary}
                    </p>

                    {/* Okuma Linki */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      <span>İncele</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
