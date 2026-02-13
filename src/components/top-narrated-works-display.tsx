'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Music, Heart } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  author: string;
  likes: number;
  views: number;
  type: string;
  audio_url: string;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

export function TopNarratedWorksDisplay() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  const mockWorks: Work[] = [
    { id: 101, title: 'Sesi Duydum', author: 'Meltem Ses', type: 'Şiir', likes: 54, views: 234, audio_url: 'mock' },
    { id: 102, title: 'Yağmur Şarkısı', author: 'Hüseyin Çetin', type: 'Şiir', likes: 48, views: 189, audio_url: 'mock' },
    { id: 103, title: 'Gece Kuşları', author: 'Faruk Serdar', type: 'Şiir', likes: 42, views: 167, audio_url: 'mock' },
    { id: 104, title: 'Uzak Diyarlar', author: 'Nuray İsmail', type: 'Deneme/Şiir', likes: 38, views: 145, audio_url: 'mock' },
    { id: 105, title: 'Kalp Sesi', author: 'Günay Demir', type: 'Şiir', likes: 35, views: 123, audio_url: 'mock' },
  ];

  useEffect(() => {
    async function fetchTopNarratedWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=likes&limit=1000');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Eserler yüklenemedi');
        }
        
        const narrated = (data.works || [])
          .filter((w: any) => w.audio_url)
          .slice(0, 10);
        
        if (narrated.length > 0) {
          setWorks(narrated);
        }
      } catch (err: any) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopNarratedWorks();
  }, []);

  const displayWorks = works.length > 0 ? works : mockWorks;
  const isMockData = works.length === 0 && !loading;

  if (loading) {
    return (
      <Card className="border-blue-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">🎧 En Çok Dinlenen Seslendirilmiş</CardTitle>
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
        <CardTitle style={accentStyle} className="text-xl">🎧 En Çok Dinlenen Seslendirilmiş</CardTitle>
        <CardDescription style={serifStyle}>
          {isMockData ? 'Verileri yüklenirken örnek sesler gösteriliyor' : 'Sesin dilinde kuş sesleri'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayWorks.map((work, idx) => (
            <div
              key={work.id}
              className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50 hover:border-blue-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      #{idx + 1}
                    </span>
                    <Music className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 style={accentStyle} className="text-sm text-stone-800 line-clamp-2 font-medium">
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
                <div className="flex items-center gap-1 whitespace-nowrap">
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
