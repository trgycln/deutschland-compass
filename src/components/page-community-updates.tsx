"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, Calendar, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export interface CommunityUpdateItem {
  id: number;
  category_slug: string;
  title: string;
  content: string;
  badge_text: string;
  source_group: string;
  created_at: string;
  updated_at?: string;
  target_tab?: string;
  is_approved?: boolean;
}

const CATEGORY_QUERY_ALIASES: Record<string, string[]> = {
  'egitim-ve-kariyer': ['egitim-ve-kariyer', 'egitim-abitur', 'egitim-kariyer', 'egitim-rehberi'],
  'sirket-kurma': ['sirket-kurma', 'is-kurma'],
  'kariyer-yolu': ['kariyer-yolu', 'brans-tamamlama', 'ogretmenlik'],
  'kargo-posta-dagitim': ['kargo-posta-dagitim', 'dagitim', 'kargo-posta', 'post'],
  'schulbegleiter': ['schulbegleiter', 'gonulluluk'],
  'bilisim-it': ['bilisim-it', 'it-sektoru', 'it-bilisim'],
  'yazilim-gelistirici': ['yazilim-gelistirici', 'yazilim-gelistirme']
};

export function useCommunityUpdates(categorySlug: string) {
  const [updates, setUpdates] = useState<CommunityUpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUpdates() {
      try {
        const targetSlugs = CATEGORY_QUERY_ALIASES[categorySlug] || [categorySlug];
        const { data, error } = await supabase
          .from("community_updates")
          .select("*")
          .in("category_slug", targetSlugs)
          .eq("is_approved", true)
          .order("updated_at", { ascending: false, nullsFirst: false });

        if (data && !error) {
          setUpdates(data as CommunityUpdateItem[]);
        }
      } catch (err) {
        console.error(`Error loading community updates for ${categorySlug}:`, err);
      } finally {
        setLoading(false);
      }
    }

    loadUpdates();
  }, [categorySlug]);


  return { updates, loading };
}

interface BannerProps {
  categorySlug?: string;
  groupName?: string;
  updatesCount?: number;
  updates?: CommunityUpdateItem[];
  onExploreClick?: () => void;
  onViewAll?: () => void;
}

export function PageCommunityUpdatesBanner({ 
  groupName = "Topluluk", 
  updatesCount, 
  updates, 
  onExploreClick, 
  onViewAll 
}: BannerProps) {
  const count = updatesCount !== undefined ? updatesCount : (updates ? updates.length : 0);

  if (count === 0) return null;

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Trigger parent tab switch handler
    if (onExploreClick) {
      onExploreClick();
    } else if (onViewAll) {
      onViewAll();
    }

    // 2. Fallback: activate tab in DOM if not already active
    const tabBtn = document.querySelector<HTMLButtonElement>(
      'button[value="updates"], [data-value="updates"], [data-state][value="updates"]'
    );
    if (tabBtn && tabBtn.getAttribute('data-state') !== 'active') {
      tabBtn.click();
    }

    // 3. Smoothly scroll down to the developments section
    setTimeout(() => {
      const targetElement = 
        document.getElementById('updates-content-section') ||
        document.querySelector('[role="tabpanel"][data-state="active"]') ||
        document.querySelector('[data-state="active"][value="updates"]') ||
        document.querySelector('#updates-section') ||
        document.querySelector('[value="updates"]') ||
        document.getElementById('content-section');

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <div id="community-updates-banner" className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/60 dark:border-amber-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-all">
      <div className="flex items-center gap-3">
        <span className="flex h-3 w-3 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <strong className="text-amber-800 dark:text-amber-300 font-bold">⚡ Güncel Gelişmeler:</strong> Bu rehber, {groupName} topluluğunda paylaşılan en son tecrübe ve resmi kural değişiklikleriyle güncellenmiştir.
        </div>
      </div>
      <button
        onClick={handleExplore}
        className="text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-200/80 hover:bg-amber-300 dark:bg-amber-900/60 dark:hover:bg-amber-800 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-amber-300 dark:border-amber-700 hover:shadow-xs cursor-pointer active:scale-95"
        title="Sayfadaki güncel gelişmelere git"
      >
        <span>Gelişmeleri İncele</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface ContentProps {
  updates: CommunityUpdateItem[];
  title?: string;
  groupName: string;
  categorySlug?: string;
  telegramUrl?: string;
  onSwitchTab?: (tab: string) => void;
}

export function PageCommunityUpdatesContent({ updates, title, groupName, onSwitchTab }: ContentProps) {
  const displayTitle = title || groupName;
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    function checkHash() {
      if (typeof window === 'undefined' || !window.location.hash) return;
      const hash = window.location.hash.replace('#', '');
      
      // Target format: update-123 or cu-123
      if (hash.startsWith('update-') || hash.startsWith('cu-')) {
        const rawId = hash.replace('update-', '').replace('cu-', '');
        setHighlightedId(rawId);

        // Smoothly scroll to the target update card
        setTimeout(() => {
          const el = document.getElementById(`update-${rawId}`) || document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 250);

        // Remove focus highlight ring after 3.5 seconds
        const timer = setTimeout(() => {
          setHighlightedId(null);
        }, 3500);
        return () => clearTimeout(timer);
      }
    }

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [updates]);

  return (
    <div id="updates-content-section" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-amber-950/30 dark:to-slate-900 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Güncel Bilgiler & Değişiklikler</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {displayTitle} - Son Gelişmeler
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1.5 max-w-2xl leading-relaxed">
            {groupName} topluluğu ve resmi kurumlardan derlenen güncel notlar, değişen mevzuatlar ve tecrübeler.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300 dark:border-amber-700 px-3 py-1 text-xs">
            ✓ Güncel Bilgi
          </Badge>
        </div>
      </div>

      <div className="grid gap-5">
        {updates.length > 0 ? (
          updates.map((update) => {
            const isTargeted = highlightedId === String(update.id);
            return (
              <Card 
                key={update.id} 
                id={`update-${update.id}`}
                className={`transition-all duration-500 bg-white dark:bg-slate-900 scroll-mt-28 ${
                  isTargeted
                    ? 'border-amber-500 ring-4 ring-amber-400/80 ring-offset-2 dark:ring-offset-slate-950 shadow-2xl scale-[1.01] bg-amber-50/30 dark:bg-amber-950/30'
                    : 'border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 hover:shadow-md'
                }`}
              >
                <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0 gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {update.title}
                      </CardTitle>
                      {isTargeted && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white animate-pulse">
                          🎯 Seçilen Bilgi
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1.5 font-medium text-amber-700 dark:text-amber-400">
                        <Clock className="w-3.5 h-3.5" />
                        {update.badge_text || "Güncel Sentez"}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(update.created_at).toLocaleDateString("tr-TR")}
                      </span>
                      <span>•</span>
                      <span>Kaynak: {update.source_group || groupName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-md shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Sentezlendi</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-1">
                  <div className="text-slate-700 dark:text-slate-200 text-sm md:text-base leading-relaxed bg-slate-50/60 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                    {update.content}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="bg-slate-50 dark:bg-slate-900 border-dashed border-2 border-slate-200 dark:border-slate-800">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                Şu an için listelenecek güncel bir gelişme bulunmamaktadır.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
