'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const UNIQUE_VISITOR_WINDOW_MS = 24 * 60 * 60 * 1000;
const EXCLUDED_PREFIXES = ['/admin', '/login', '/test-supabase'];

export function SiteVisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
      return;
    }

    const sessionKey = `dc-tracked:${pathname}`;
    if (window.sessionStorage.getItem(sessionKey)) {
      return;
    }
    window.sessionStorage.setItem(sessionKey, '1');

    const now = Date.now();
    const lastUniqueVisitAt = Number(window.localStorage.getItem('dc-last-unique-visit-at') || '0');
    const isUnique = !lastUniqueVisitAt || now - lastUniqueVisitAt > UNIQUE_VISITOR_WINDOW_MS;

    if (isUnique) {
      window.localStorage.setItem('dc-last-unique-visit-at', String(now));
    }

    fetch('/api/site-stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pathname, isUnique }),
    }).catch((error) => {
      console.error('Site visit tracking failed:', error);
    });
  }, [pathname]);

  return null;
}
