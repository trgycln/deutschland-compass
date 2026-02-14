'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Eye } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  author: string;
  views: number;
  type: string;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

export function TopViewedWorksDisplay() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock data - real literary works without synthetic metrics
  const mockWorks: Work[] = [
    { id: 1, title: 'Bazen', author: 'Yusuf Salih', views: 0, type: 'Şiir' },
    { id: 11, title: 'Anama Hasret', author: 'Ömer Yaman (Titaniumberatung)', views: 0, type: 'Şiir' },
    { id: 10, title: 'İlahi Adalet Var', author: 'Ömer Yaman (Titaniumberatung)', views: 0, type: 'Şiir' },
    { id: 6, title: 'Anneye', author: 'Halil (İsimsizler)', views: 0, type: 'Şiir' },
    { id: 3, title: 'Sessiz Sedasız', author: 'Süleyman Sargın', views: 0, type: 'Şiir' },
    { id: 12, title: 'Yenildim Anne', author: 'Sezer Bingöl', views: 0, type: 'Şiir' },
    { id: 4, title: 'Ufukta Bir Yol Var', author: 'Halil (İsimsizler)', views: 0, type: 'Şiir' },
    { id: 15, title: 'Babama Mektup 1', author: 'Halil (İsimsizler)', views: 0, type: 'Şiir' },
    { id: 5, title: 'Dün Gece Rüyamda', author: 'Halil (İsimsizler)', views: 0, type: 'Şiir' },
    { id: 9, title: 'Ben Bir Göçmen Kızım', author: 'Tuba (T.Ö.)', views: 0, type: 'Deneme' },
  ];

  useEffect(() => {
    async function fetchTopViewedWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=views&limit=1000', {
          cache: 'no-store', // Her zaman fresh data al
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Eserler yüklenemedi');
        }

        if (data.works && data.works.length > 0) {
          setWorks(data.works.slice(0, 10));
        }
      } catch (err: any) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopViewedWorks();

    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchTopViewedWorks, 30000);

    // Sayfa görünür olduğunda yeniden fetch yap
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTopViewedWorks();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const displayWorks = works.length > 0 ? works : mockWorks;

  if (loading) {
    return (
      <Card className="border-blue-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">👁️ En Çok Görüntülenen</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-700" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">👁️ En Çok Görüntülenen</CardTitle>
        <CardDescription style={serifStyle}>Okurların en çok görüntülediği eserler</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="space-y-2">
          {displayWorks.map((work, idx) => (
            <Link
              key={work.id}
              href={`/gurbet-kalemleri/${work.id}`}
              className="block p-3 rounded-lg bg-gradient-to-r from-sky-50 to-transparent border border-sky-100/50 hover:border-sky-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                      #{idx + 1}
                    </span>
                  </div>
                  <h3 style={accentStyle} className="text-sm text-stone-800 line-clamp-2 font-medium hover:text-sky-700">
                    {work.title}
                  </h3>
                  <p style={serifStyle} className="text-xs text-stone-500 mt-1">
                    {work.author} • {work.type}
                  </p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap text-right">
                  <Eye className="w-4 h-4 text-sky-500" />
                  <span className="text-sm font-semibold text-sky-600">{work.views}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}