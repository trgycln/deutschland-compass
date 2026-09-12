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

export function useCommunityUpdates(categorySlug: string) {
  const [updates, setUpdates] = useState<CommunityUpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUpdates() {
      try {
        const { data, error } = await supabase
          .from("community_updates")
          .select("*")
          .eq("category_slug", categorySlug)
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
  const clickHandler = onExploreClick || onViewAll;

  if (count === 0) return null;

  return (
    <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-300/60 dark:border-amber-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs transition-all">
      <div className="flex items-center gap-3">
        <span className="flex h-3 w-3 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <strong className="text-amber-800 dark:text-amber-300 font-bold">⚡ Güncel Gelişmeler:</strong> Bu rehber, {groupName} topluluğunda paylaşılan en son tecrübe ve resmi kural değişiklikleriyle güncellenmiştir.
        </div>
      </div>
      {clickHandler && (
        <button
          onClick={clickHandler}
          className="text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-200/80 hover:bg-amber-300 dark:bg-amber-900/60 dark:hover:bg-amber-800 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 shrink-0 border border-amber-300 dark:border-amber-700 hover:shadow-xs cursor-pointer"
        >
          <span>Gelişmeleri İncele</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
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
  return (
    <div className="space-y-6">
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
          updates.map((update) => (
            <Card key={update.id} className="border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500 hover:shadow-md transition-all bg-white dark:bg-slate-900">
              <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0 gap-4">
                <div>
                  <CardTitle className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {update.title}
                  </CardTitle>
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
          ))
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
