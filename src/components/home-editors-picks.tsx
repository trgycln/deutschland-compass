"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PenTool, MessageSquare, BookOpen, ArrowRight } from "lucide-react";

const PICKS = [
  {
    id: "gurbet-kalemleri",
    title: "Gurbet Kalemleri",
    icon: PenTool,
    color: "slate",
    description: "Toplulugumuzdan degerli yazarlarin kaleminden tecrübe, deneme ve hikayeler.",
    href: "/gurbet-kalemleri",
    linkText: "Yazilari Oku"
  },
  {
    id: "blog",
    title: "Güncel Blog",
    icon: BookOpen,
    color: "blue",
    description: "Almanya yasantisi, bürokratik haberler ve önemli duyurularin yer aldigi blog sayfamiz.",
    href: "/blog",
    linkText: "Bloga Git"
  },
  {
    id: "telegram",
    title: "Telegram Gruplari",
    icon: MessageSquare,
    color: "sky",
    description: "90'dan fazla spesifik konuda, binlerce kisinin yardimlastigi güncel Telegram gruplari listesi.",
    href: "/telegram-gruplari",
    linkText: "Gruplara Katil"
  }
];

const colorMap = {
  slate: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800",
  blue: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50",
  sky: "text-sky-600 dark:text-sky-400 bg-sky-100 dark:bg-sky-900/50"
};

export function HomeEditorsPicks() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Öne Çikan Topluluk Kaynaklari
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base">
              Yazilar, haberler ve interaktif yardim gruplarimiz.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PICKS.map((pick) => {
            const Icon = pick.icon;
            const colors = colorMap[pick.color as keyof typeof colorMap];

            return (
              <Card key={pick.id} className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow group">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${colors}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {pick.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                    {pick.description}
                  </p>
                  
                  <Link 
                    href={pick.href}
                    className="inline-flex items-center font-semibold text-primary dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors gap-2 mt-auto"
                  >
                    {pick.linkText} <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
