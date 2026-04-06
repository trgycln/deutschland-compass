'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type SiteStats = {
  totalPageViews: number;
  totalUniqueVisitors: number;
  last7DaysPageViews: number;
  todayPageViews: number;
  todayUniqueVisitors: number;
  baselinePageViews: number;
  isApproximate?: boolean;
};

const DEFAULT_STATS: SiteStats = {
  totalPageViews: 30000,
  totalUniqueVisitors: 0,
  last7DaysPageViews: 0,
  todayPageViews: 0,
  todayUniqueVisitors: 0,
  baselinePageViews: 30000,
  isApproximate: true,
};

function formatNumber(value: number) {
  return new Intl.NumberFormat('tr-TR').format(value);
}

export function SiteStatsSummary({ compact = false }: { compact?: boolean }) {
  const [stats, setStats] = useState<SiteStats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchStats = async () => {
      try {
        const response = await fetch('/api/site-stats', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Site istatistikleri alınamadı');
        }

        const data = (await response.json()) as SiteStats;
        if (active) {
          setStats({ ...DEFAULT_STATS, ...data });
        }
      } catch (error) {
        console.error('Site stats fetch error:', error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const handleStatsUpdated = (event: Event) => {
      const detail = (event as CustomEvent<SiteStats>).detail;
      if (active && detail) {
        setStats({ ...DEFAULT_STATS, ...detail });
        setLoading(false);
      }
    };

    fetchStats();
    window.addEventListener('site-stats-updated', handleStatsUpdated as EventListener);
    const interval = window.setInterval(fetchStats, 15000);

    return () => {
      active = false;
      window.removeEventListener('site-stats-updated', handleStatsUpdated as EventListener);
      window.clearInterval(interval);
    };
  }, []);

  const totalDisplay = stats.isApproximate
    ? `${formatNumber(stats.totalPageViews)}+`
    : formatNumber(stats.totalPageViews);

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
      <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Site Sayacı
            </CardTitle>
            <CardDescription>
              Toplam sayfa açılış sayısı otomatik olarak güncellenir.
            </CardDescription>
          </div>
          <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            Toplam Ziyaret
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-1">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              Toplam ziyaret
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              {loading ? '...' : totalDisplay}
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          Bu alan anlık online kişi sayısını değil, toplam ziyaret sayısını gösterir.
        </p>

        {stats.isApproximate && (
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Geçmiş ziyaretler başlangıç baz değeriyle dahil edildi. Yeni açılışlar birkaç saniye içinde sayaca yansır.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
