'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopNarratedWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=likes&limit=1000');
        if (!response.ok) throw new Error('Eserler yüklenemedi');
        const data = await response.json();
        const narrated = (data.works || [])
          .filter((w: any) => w.audio_url)
          .slice(0, 10);
        setWorks(narrated);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopNarratedWorks();
  }, []);

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

  if (error || works.length === 0) {
    return null;
  }

  return (
    <Card className="border-blue-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">🎧 En Çok Dinlenen Seslendirilmiş</CardTitle>
        <CardDescription style={serifStyle}>Sesin dilinde kuş sesleri</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {works.map((work, idx) => (
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
                    {work.author} • {work.type}
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
