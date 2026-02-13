'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=likes&limit=10');
        if (!response.ok) throw new Error('Eserler yüklenemedi');
        const data = await response.json();
        setWorks((data.works || []).slice(0, 10));
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopWorks();
  }, []);

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

  if (error || works.length === 0) {
    // Fallback: Mock data göster
    const mockWorks: Work[] = [
      { id: 1, title: 'Hasreti Uzak Diyarlı', author: 'Ömer Yaman', likes: 87, views: 345, type: 'Şiir' },
      { id: 2, title: 'Gecenin Kalbe Açtığı Kapı', author: 'Zeynep K.', likes: 62, views: 289, type: 'Şiir' },
      { id: 3, title: 'Almanya Şarkısı', author: 'Ahmet Veli', likes: 56, views: 212, type: 'Deneme/Şiir' },
      { id: 4, title: 'Vatan Özlemi', author: 'Ayşe Demir', likes: 48, views: 198, type: 'Şiir' },
      { id: 5, title: 'Kalbim Yağmur Dinliyor', author: 'Mehmet Kaya', likes: 42, views: 176, type: 'Şiir' },
    ];
    setWorks(mockWorks);
    return (
      <Card className="border-amber-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">❤️ En Beğenilen Eserler</CardTitle>
          <CardDescription style={serifStyle}>Okurların en çok sevdiği 10 eser</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockWorks.map((work, idx) => (
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


  return (
    <Card className="border-amber-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">❤️ En Beğenilen Eserler</CardTitle>
        <CardDescription style={serifStyle}>Okurların en çok sevdiği 10 eser</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {works.map((work, idx) => (
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
