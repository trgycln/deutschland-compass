"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, MessageSquare, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

interface LiveUpdateItem {
  id: number;
  category_slug: string;
  title: string;
  content: string;
  badge_text: string;
  source_group: string;
  created_at: string;
  updated_at?: string;
  target_tab?: string;
}

const FALLBACK_UPDATES: LiveUpdateItem[] = [
  {
    id: 1,
    category_slug: "otobus-soforlugu",
    title: "Ehliyet, İHK ve Takograf Kartı Başvuru Adımları",
    content: "Ehliyet ve İHK sınav süreçlerinde dikkat edilmesi gereken güncel hususlar ve sürücü kartı çıkarma aşamaları topluluk tecrübeleriyle tek metinde sentezlendi.",
    badge_text: "Eylül 2026",
    source_group: "BUSFAHRER/IN GRUBU",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    category_slug: "lokfuhrer",
    title: "Makinistlik Eğitimi Başarı Oranı ve Şirket Kursları",
    content: "Bildungsgutschein kapsamındaki kurslar, firma sponsorlu maaşlı eğitimler ve sınav zorluk derecesine dair en güncel saha tecrübeleri.",
    badge_text: "Güncellendi",
    source_group: "LOKFÜHRER/IN GRUBU",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    category_slug: "aile-birlesimi",
    title: "Aile Birleşimi Vize Evrakları ve Randevu İpuçları",
    content: "Konsolosluk randevu bekleme süreleri, tercüme ve noter süreçlerinde dikkat edilmesi gereken kritik detaylar.",
    badge_text: "Kritik Uyarı",
    source_group: "AİLE BİRLEŞİMİ GRUBU",
    created_at: new Date().toISOString()
  },
  {
    id: 4,
    category_slug: "anerkennung",
    title: "ZAB ve Diploma Denkliklerinde Yeni QR Kodlu Belge Şartı",
    content: "Eski tarihli diplomalarda ZAB değerlendirmesi için gereken e-devlet barkodlu belgeler ve Jobcenter çeviri destekleri.",
    badge_text: "Yeni Kural",
    source_group: "ANERKENNUNG GRUBU",
    created_at: new Date().toISOString()
  }
];

export function HomeLiveCommunityUpdates() {
  const [updates, setUpdates] = useState<LiveUpdateItem[]>(FALLBACK_UPDATES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestUpdates() {
      try {
        const { data, error } = await supabase
          .from('community_updates')
          .select('*')
          .order('updated_at', { ascending: false, nullsFirst: false })
          .limit(4);

        if (data && data.length > 0 && !error) {
          setUpdates(data);
        }
      } catch (err) {
        console.error("Canlı güncellemeler çekilemedi, fallback kullanılıyor:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestUpdates();
  }, []);

  const getPageRoute = (category_slug: string) => {
    const rehberPages = ['otobus-soforlugu', 'aile-birlesimi', 'anerkennung', 'vergi-beyani', 'sirket-kurma', 'elektrikci', 'erzieherin', 'hasta-yasli-bakimi'];
    if (rehberPages.includes(category_slug)) {
      return `/rehber/${category_slug}`;
    }
    return `/meslekler/${category_slug}`;
  };

  const getCategoryTitle = (slug: string) => {
    const titles: Record<string, string> = {
      'otobus-soforlugu': 'Otobüs Şoförlüğü',
      'lokfuhrer': 'Makinistlik (Lokführer)',
      'aile-birlesimi': 'Aile Birleşimi',
      'anerkennung': 'Diploma Denkliği',
      'hemsire': 'Hemşirelik',
      'yazilim-gelistirici': 'Yazılım Geliştirici',
      'isletme-iktisat': 'İşletme & İktisat'
    };
    return titles[slug] || slug.replace(/-/g, ' ').toUpperCase();
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-y border-slate-200 dark:border-slate-800 relative overflow-hidden">
      {/* Arka plan parlama efekti */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-amber-500/5 dark:bg-amber-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Üst Başlık & Canlı Rozet */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs font-semibold mb-3 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>⚡ Güncel Bilgi Akışı & Saha Notları</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Topluluktan <span className="text-amber-600 dark:text-amber-400">Güncel Gelişmeler</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base max-w-2xl mt-2 leading-relaxed">
              Almanya genelindeki tecrübe paylaşımları, değişen bürokratik kurallar ve resmi süreçlere dair en son saha bildirimleri.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/telegram-gruplari"
              className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-amber-400"
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>91 Telegram Grubunu İncele</span>
            </Link>
          </div>
        </div>

        {/* Canlı Kartlar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {updates.map((item) => (
            <Card 
              key={item.id}
              className="border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs hover:border-amber-400/80 dark:hover:border-amber-500/50 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
            >
              <CardContent className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200/60 dark:border-amber-800/60">
                      {getCategoryTitle(item.category_slug)}
                    </span>
                    <Badge variant="outline" className="text-[11px] font-medium border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                      {item.badge_text || "Güncel"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Doğrulanmış</span>
                  </div>
                </div>

                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                  {item.content}
                </p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="truncate max-w-[200px]">
                    Kaynak: {item.source_group || "Telegram Topluluğu"}
                  </span>

                  <Link 
                    href={`${getPageRoute(item.category_slug)}?tab=updates`}
                    className="font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1 group/btn shrink-0"
                  >
                    <span>Sayfada Gör</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
