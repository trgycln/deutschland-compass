'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Music, Clock } from 'lucide-react';
import { AudioPlayerCompact } from '@/components/audio-player-compact';

interface Work {
  id: number;
  title: string;
  author: string;
  created_at: string;
  narration_added_at?: string;
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

export function RecentNarratedWorksDisplay() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  const mockWorks: Work[] = [];

  useEffect(() => {
    async function fetchRecentNarratedWorks() {
      try {
        const response = await fetch('/api/literary-works?sort=recent&limit=1000', {
          cache: 'no-store',
        });
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Eserler yüklenemedi');
        }
        
        const narrated = (data.works || [])
          .filter((w: any) => w.audio_url)
          // En son seslendirilen field'a göre sırala
          .sort((a: any, b: any) => {
            const dateA = new Date(a.narration_added_at || a.created_at).getTime();
            const dateB = new Date(b.narration_added_at || b.created_at).getTime();
            return dateB - dateA; // En yeni ilk
          })
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

    fetchRecentNarratedWorks();

    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchRecentNarratedWorks, 30000);

    // Sayfa görünür olduğunda yeniden fetch yap
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchRecentNarratedWorks();
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
          <CardTitle style={accentStyle} className="text-xl">🎙️ En Son Seslendirilen</CardTitle>
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
        <CardTitle style={accentStyle} className="text-xl">🎙️ En Son Seslendirilen</CardTitle>
        <CardDescription style={serifStyle}>En son seslendirilen eserler</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <div className="space-y-3">
          {displayWorks.map((work, idx) => (
            <Link
              key={work.id}
              href={`/gurbet-kalemleri/${work.id}`}
              className="block p-3 rounded-lg bg-gradient-to-r from-blue-50 to-transparent border border-blue-100/50 hover:border-blue-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Music className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">
                      {formatRelativeTime(work.narration_added_at || work.created_at)}
                    </span>
                  </div>
                  <h3 style={accentStyle} className="text-sm text-stone-800 font-medium line-clamp-2 hover:text-blue-700">
                    {work.title}
                  </h3>
                  <p style={serifStyle} className="text-xs text-stone-500 mt-1">
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
