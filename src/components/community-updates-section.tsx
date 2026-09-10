'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { initialCommunityUpdates, CommunityUpdate, UpdateType } from '@/data/initial-community-updates';
import { getGroupMapping } from '@/lib/telegram-group-mapping';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  ThumbsUp, 
  AlertTriangle, 
  BookOpen, 
  Lightbulb, 
  Scale, 
  Send,
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface CommunityUpdatesSectionProps {
  categorySlug: string; // e.g. 'otobus-soforlugu', 'lokfuhrer', 'aile-birlesimi', 'anerkennung'
  fallbackGroup?: string;
  titleOverride?: string;
}

export function CommunityUpdatesSection({
  categorySlug,
  fallbackGroup,
  titleOverride,
}: CommunityUpdatesSectionProps) {
  const [updates, setUpdates] = useState<CommunityUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<number | string | null>(null);
  const [likedIds, setLikedIds] = useState<Record<string | number, boolean>>({});
  const [expandedIds, setExpandedIds] = useState<Record<string | number, boolean>>({});

  const groupMapping = getGroupMapping(categorySlug) || (fallbackGroup ? getGroupMapping(fallbackGroup) : undefined);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        setLoading(true);
        // Look up all matching slugs/aliases
        const targetSlugs = groupMapping 
          ? [categorySlug, ...groupMapping.aliases, groupMapping.groupId]
          : [categorySlug];

        // 1. Try fetching from Supabase
        const { data, error } = await supabase
          .from('community_updates')
          .select('*')
          .in('category_slug', targetSlugs)
          .eq('is_approved', true)
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setUpdates(data as CommunityUpdate[]);
        } else {
          // 2. Fallback to rich curated initial updates
          const filteredInitial = initialCommunityUpdates.filter(u => 
            targetSlugs.includes(u.category_slug)
          );
          setUpdates(filteredInitial);
        }
      } catch (err) {
        console.warn('Community updates fetch warning, falling back to local dataset:', err);
        const targetSlugs = groupMapping ? [categorySlug, ...groupMapping.aliases] : [categorySlug];
        const filteredInitial = initialCommunityUpdates.filter(u => targetSlugs.includes(u.category_slug));
        setUpdates(filteredInitial);
      } finally {
        setLoading(false);
      }
    }

    fetchUpdates();
  }, [categorySlug, groupMapping]);

  const handleCopy = (id: number | string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleLike = (id: number | string) => {
    setLikedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExpand = (id: number | string) => {
    setExpandedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUpdates = updates.filter(item => {
    if (activeFilter === 'all') return true;
    return item.update_type === activeFilter;
  });

  const getTypeBadge = (type: UpdateType) => {
    switch (type) {
      case 'official_rule':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700 flex items-center gap-1.5 font-medium">
            <Scale className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Resmi Mevzuat & Kural
          </Badge>
        );
      case 'tip':
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700 flex items-center gap-1.5 font-medium">
            <Lightbulb className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Pratik İpucu & Tavsiye
          </Badge>
        );
      case 'warning':
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700 flex items-center gap-1.5 font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            Kritik Uyarı
          </Badge>
        );
      case 'experience':
      default:
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-700 flex items-center gap-1.5 font-medium">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Topluluk Tecrübesi
          </Badge>
        );
    }
  };

  const formatDateDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const formattedDate = format(date, 'd MMMM yyyy', { locale: tr });
      const relativeTime = formatDistanceToNow(date, { addSuffix: true, locale: tr });
      return { formattedDate, relativeTime };
    } catch {
      return { formattedDate: dateString, relativeTime: '' };
    }
  };

  return (
    <section className="my-10 w-full">
      <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 shadow-sm">
        <div className="rounded-[15px] bg-white dark:bg-slate-900 p-6 md:p-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Canlı Topluluk Verisi & AI Özeti</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                {titleOverride || 'Son Güncellemeler & Taze Topluluk İpuçları'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                Bu alandaki Telegram gruplarında paylaşılan gerçek kullanıcı tecrübeleri, değişen mevzuat kuralları ve pratik ipuçları düzenli olarak taranıp özetlenir.
              </p>
            </div>

            {/* Telegram Group Link */}
            {groupMapping && (
              <div className="flex items-center">
                <a
                  href={groupMapping.groupUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{groupMapping.groupName}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            )}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-5 pb-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrele:</span>
            </div>
            <button
              onClick={() => setActiveFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              Tümü ({updates.length})
            </button>
            <button
              onClick={() => setActiveFilter('official_rule')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFilter === 'official_rule'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 hover:bg-amber-100'
              }`}
            >
              Mevzuat & Kural
            </button>
            <button
              onClick={() => setActiveFilter('tip')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFilter === 'tip'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
              }`}
            >
              Pratik İpuçları
            </button>
            <button
              onClick={() => setActiveFilter('experience')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFilter === 'experience'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100'
              }`}
            >
              Tecrübeler
            </button>
            <button
              onClick={() => setActiveFilter('warning')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeFilter === 'warning'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100'
              }`}
            >
              Uygulama Uyarıları
            </button>
          </div>

          {/* Cards List */}
          <div className="mt-4 space-y-4">
            {loading ? (
              <div className="py-12 text-center text-slate-400 text-sm animate-pulse">
                Topluluk güncellemeleri kontrol ediliyor...
              </div>
            ) : filteredUpdates.length === 0 ? (
              <div className="text-center py-10 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  Bu filtrede henüz kayıtlı güncelleme bulunmuyor.
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Telegram gruplarında yapılan paylaşımlar otomatik olarak taranıp bu bölüme eklenecektir.
                </p>
              </div>
            ) : (
              filteredUpdates.map((item) => {
                const { formattedDate, relativeTime } = formatDateDisplay(item.created_at);
                const isExpanded = !!expandedIds[item.id];
                const isLongContent = item.content.length > 220;
                const isLiked = !!likedIds[item.id];

                return (
                  <div
                    key={item.id}
                    className={`group relative rounded-xl border transition-all p-5 ${
                      item.importance === 'highlight'
                        ? 'bg-gradient-to-r from-blue-50/40 via-white to-indigo-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-indigo-950/10 border-blue-200/80 dark:border-blue-800/60 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        {getTypeBadge(item.update_type)}
                        {item.badge_text && (
                          <Badge variant="secondary" className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {item.badge_text}
                          </Badge>
                        )}
                        {item.importance === 'highlight' && (
                          <Badge className="text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white">
                            Öne Çıkan
                          </Badge>
                        )}
                      </div>

                      {/* Prominent Date Display */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-100/70 dark:bg-slate-800/60 px-2.5 py-1 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{formattedDate}</span>
                        {relativeTime && <span className="opacity-70">({relativeTime})</span>}
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                      {item.title}
                    </h4>

                    {/* Content */}
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                      {isLongContent && !isExpanded 
                        ? `${item.content.slice(0, 220)}...`
                        : item.content}
                    </div>

                    {isLongContent && (
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline mt-2"
                      >
                        {isExpanded ? (
                          <><span>Daha Az Göster</span><ChevronUp className="w-3.5 h-3.5" /></>
                        ) : (
                          <><span>Devamını Oku</span><ChevronDown className="w-3.5 h-3.5" /></>
                        )}
                      </button>
                    )}

                    {/* Bottom Actions & Source */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                      {/* Source */}
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">Kaynak:</span>
                        {item.source_url ? (
                          <a 
                            href={item.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium"
                          >
                            {item.source_group}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span>{item.source_group}</span>
                        )}
                      </div>

                      {/* Actions (Copy & Helpful Reaction) */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(item.id, `${item.title}\n\n${item.content}\n\nKaynak: ${item.source_group}`)}
                          className="h-7 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                              <span className="text-emerald-600">Kopyalandı</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 mr-1" />
                              <span>Paylaş / Kopyala</span>
                            </>
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLike(item.id)}
                          className={`h-7 text-xs ${
                            isLiked
                              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                          <span>{isLiked ? 'Faydalı Bulundu (1)' : 'Faydalı'}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Community Note */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Veriler Telegram topluluk paylaşımlarından yapay zeka desteğiyle sürekli taranır ve doğrulanır.</span>
            </div>
            {groupMapping && (
              <a
                href={groupMapping.groupUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium inline-flex items-center gap-1"
              >
                Gruba Soru Sor / Katkıda Bulun &rarr;
              </a>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
