'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Heart } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  author: string;
  likes: number;
  views: number;
  type: string;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

export function TopWorksDisplay() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback mock data - real literary works without synthetic metrics
  const mockWorks: Work[] = [
    { id: 1, title: 'Bazen', author: 'Yusuf Salih', likes: 0, views: 0, type: 'Şiir' },
    { id: 11, title: 'Anama Hasret', author: 'Ömer Yaman (Titaniumberatung)', likes: 0, views: 0, type: 'Şiir' },
    { id: 10, title: 'İlahi Adalet Var', author: 'Ömer Yaman (Titaniumberatung)', likes: 0, views: 0, type: 'Şiir' },
    { id: 6, title: 'Anneye', author: 'Halil (İsimsizler)', likes: 0, views: 0, type: 'Şiir' },
    { id: 3, title: 'Sessiz Sedasız', author: 'Süleyman Sargın', likes: 0, views: 0, type: 'Şiir' },
    { id: 12, title: 'Yenildim Anne', author: 'Sezer Bingöl', likes: 0, views: 0, type: 'Şiir' },
    { id: 4, title: 'Ufukta Bir Yol Var', author: 'Halil (İsimsizler)', likes: 0, views: 0, type: 'Şiir' },
    { id: 15, title: 'Babama Mektup 1', author: 'Halil (İsimsizler)', likes: 0, views: 0, type: 'Şiir' },
    { id: 5, title: 'Dün Gece Rüyamda', author: 'Halil (İsimsizler)', likes: 0, views: 0, type: 'Şiir' },
    { id: 9, title: 'Ben Bir Göçmen Kızım', author: 'Tuba (T.Ö.)', likes: 0, views: 0, type: 'Deneme' },
  ];

  useEffect(() => {
    async function fetchTopWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=likes&limit=1000');
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

    fetchTopWorks();
  }, []);

  const displayWorks = works.length > 0 ? works : mockWorks;
  const isMockData = works.length === 0 && !loading;

  if (loading) {
    return (
      <Card className="border-amber-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">❤️ En Beğenilen Eserler</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-amber-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">❤️ En Beğenilen Eserler</CardTitle>
        <CardDescription style={serifStyle}>Okurların en çok sevdiği eserler</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayWorks.map((work, idx) => (
            <div
              key={work.id}
              className="p-3 rounded-lg bg-gradient-to-r from-rose-50 to-transparent border border-rose-100/50 hover:border-rose-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      #{idx + 1}
                    </span>
                    <div className="flex gap-1">
                      {work.likes > 30 && <span className="text-2xl">🔥</span>}
                      {work.likes > 20 && work.likes <= 30 && <span className="text-lg">⭐</span>}
                    </div>
                  </div>
                  <h3 style={accentStyle} className="text-sm text-stone-800 line-clamp-2 font-medium">
                    {work.title}
                  </h3>
                  <p style={serifStyle} className="text-xs text-stone-500 mt-1">
                    <Link 
                      href={`/gurbet-kalemleri?author=${encodeURIComponent(work.author)}`}
                      className="hover:text-amber-700 hover:underline"
                    >
                      {work.author}
                    </Link>
                    {' '}• {work.type}
                  </p>
                </div>
                <div className="flex items-center gap-1 whitespace-nowrap text-right">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="text-sm font-semibold text-rose-600">{work.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
