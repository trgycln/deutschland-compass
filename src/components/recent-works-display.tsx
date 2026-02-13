'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Clock } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  author: string;
  created_at: string;
  type: string;
  views: number;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

function formatRelativeTime(date: string): string {
  const now = new Date();
  const created = new Date(date);
  const diffMs = now.getTime() - created.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffMins < 1) return 'Az önce';
  if (diffMins < 60) return `${diffMins} dakika önce`;
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays < 30) return `${diffDays} gün önce`;
  return created.toLocaleDateString('tr-TR');
}

export function RecentWorksDisplay() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  const mockWorks: Work[] = [
    { id: 301, title: 'Son Eklenen Eser 1', author: 'Can Erkan', created_at: new Date(Date.now() - 1*24*60*60*1000).toISOString(), type: 'Şiir', views: 45 },
    { id: 302, title: 'Son Eklenen Eser 2', author: 'Pınar Kaya', created_at: new Date(Date.now() - 3*24*60*60*1000).toISOString(), type: 'Deneme/Şiir', views: 32 },
    { id: 303, title: 'Son Eklenen Eser 3', author: 'İbrahim Çetin', created_at: new Date(Date.now() - 7*24*60*60*1000).toISOString(), type: 'Şiir', views: 28 },
  ];

  useEffect(() => {
    async function fetchRecentWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=recent&limit=5');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Eserler yüklenemedi');
        }
        
        if (data.works && data.works.length > 0) {
          setWorks(data.works);
        }
      } catch (err: any) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentWorks();
  }, []);

  if (loading) {
    return (
      <Card className="border-amber-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">⏰ En Yeni Eserler</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
        </CardContent>
      </Card>
    );
  }

  const displayWorks = works.length > 0 ? works : mockWorks;
  const isMockData = works.length === 0 && !loading;

  return (
    <Card className="border-amber-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">⏰ En Yeni Eserler</CardTitle>
        <CardDescription style={serifStyle}>
          {isMockData ? 'Verileri yüklenirken örnek eserler gösteriliyor' : 'Taze kalemlerin en son eserleri'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayWorks.map((work) => (
              <div
                key={work.id}
                className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50 hover:border-blue-200 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-3 h-3 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">
                        {formatRelativeTime(work.created_at)}
                      </span>
                    </div>
                    <h3 style={accentStyle} className="text-sm text-stone-800 font-medium line-clamp-2">
                      {work.title}
                    </h3>
                    <p style={serifStyle} className="text-xs text-stone-500 mt-1">
                      <Link 
                        href={`/gurbet-kalemleri?author=${encodeURIComponent(work.author)}`}
                        className="hover:text-blue-700 hover:underline"
                      >
                        {work.author}
                      </Link>
                      {' '}• {work.type}
                    </p>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
            <div
              key={work.id}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50 hover:border-blue-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">
                      {formatRelativeTime(work.created_at)}
                    </span>
                  </div>
                  <h3 style={accentStyle} className="text-sm text-stone-800 font-medium line-clamp-2">
                    {work.title}
                  </h3>
                  <p style={serifStyle} className="text-xs text-stone-500 mt-1">
                    <Link 
                      href={`/gurbet-kalemleri?author=${encodeURIComponent(work.author)}`}
                      className="hover:text-blue-700 hover:underline"
                    >
                      {work.author}
                    </Link>
                    {' '}• {work.type}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
