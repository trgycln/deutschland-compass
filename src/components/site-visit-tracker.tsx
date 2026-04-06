'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

type SiteStatsResponse = {
  totalPageViews: number;
  totalUniqueVisitors: number;
  last7DaysPageViews: number;
  todayPageViews: number;
  todayUniqueVisitors: number;
  baselinePageViews: number;
  isApproximate?: boolean;
};

const UNIQUE_VISITOR_WINDOW_MS = 24 * 60 * 60 * 1000;
const PAGE_VIEW_THROTTLE_MS = 30 * 1000;
const EXCLUDED_PREFIXES = ['/admin', '/login', '/test-supabase'];

export function SiteVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
      return;
    }

    const now = Date.now();
    const pageViewKey = `dc-last-page-view:${pathname}`;
    const lastTrackedPageViewAt = Number(window.localStorage.getItem(pageViewKey) || '0');

    if (lastTrackedPageViewAt && now - lastTrackedPageViewAt < PAGE_VIEW_THROTTLE_MS) {
      return;
    }

    window.localStorage.setItem(pageViewKey, String(now));

    const lastUniqueVisitAt = Number(window.localStorage.getItem('dc-last-unique-visit-at') || '0');
    const isUnique = !lastUniqueVisitAt || now - lastUniqueVisitAt > UNIQUE_VISITOR_WINDOW_MS;

    if (isUnique) {
      window.localStorage.setItem('dc-last-unique-visit-at', String(now));
    }

    fetch('/api/site-stats', {
      method: 'POST',
      cache: 'no-store',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pathname, isUnique }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Site istatistikleri güncellenemedi');
        }

        return (await response.json()) as SiteStatsResponse;
      })
      .then((stats) => {
        window.dispatchEvent(new CustomEvent('site-stats-updated', { detail: stats }));
      })
      .catch((error) => {
        console.error('Site visit tracking failed:', error);
      });
  }, [pathname]);

  return null;
}
