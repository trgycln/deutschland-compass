'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Music, Headphones } from 'lucide-react';
import { AudioPlayerCompact } from '@/components/audio-player-compact';

interface Work {
  id: number;
  title: string;
  author: string;
  listens: number;
  type: string;
  audio_url: string;
  content: string;
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

  const mockWorks: Work[] = [];

  useEffect(() => {
    async function fetchTopNarratedWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=listens&limit=1000', {
          cache: 'no-store',
        });
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

    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchTopNarratedWorks, 30000);

    // Sayfa görünür olduğunda yeniden fetch yap
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTopNarratedWorks();
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
        <CardDescription style={serifStyle}>En çok dinlenen seslendirilmiş eserler</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {displayWorks.map((work, idx) => (
            <Link
              key={work.id}
              href={`/gurbet-kalemleri/${work.id}`}
              className="block p-3 rounded-lg bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50 hover:border-blue-200 transition"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full flex-shrink-0">
                    #{idx + 1}
                  </span>
                  <h3 style={accentStyle} className="text-sm text-stone-800 line-clamp-1 font-medium hover:text-blue-700 flex-1 min-w-0">
                    {work.title}
                  </h3>
                  <div className="flex items-center gap-1 whitespace-nowrap flex-shrink-0">
                    <Headphones className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">{work.listens ?? 0}</span>
                  </div>
                </div>
                <div className="ml-12">
                  <p style={serifStyle} className="text-xs text-stone-500">
                    {work.author} • {work.type}
                  </p>
                  {work.audio_url && (
                    <div className="mt-2" onClick={(e) => e.preventDefault()}>
                      <AudioPlayerCompact 
                        audioUrl={work.audio_url} 
                        title={work.title} 
                        workId={work.id}
                        content={work.content}
                        author={work.author}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
