'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface Work {
  id: number;
  tags: string[];
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

export function PopularTagsDisplay({ onTagClick }: { onTagClick?: (tag: string) => void }) {
  const [tags, setTags] = useState<{ tag: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const mockTags = [
    { tag: 'gurbet', count: 24 },
    { tag: 'özlem', count: 18 },
    { tag: 'hasret', count: 16 },
    { tag: 'vatan', count: 14 },
    { tag: 'aile', count: 12 },
    { tag: 'umut', count: 11 },
    { tag: 'sevda', count: 10 },
    { tag: 'yalnızlık', count: 9 },
    { tag: 'anı', count: 8 },
    { tag: 'ufuk', count: 7 },
  ];

  useEffect(() => {
    async function fetchPopularTags() {
      try {
        const response = await fetch('/api/literary-works?limit=1000');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Etiketler yüklenemedi');
        }
        
        const works: Work[] = data.works || [];

        // Etiketleri say
        const tagCounts = new Map<string, number>();
        works.forEach((work) => {
          (work.tags || []).forEach((tag) => {
            tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
          });
        });

        // Sırala ve oku
        const sorted = Array.from(tagCounts.entries())
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 20);

        if (sorted.length > 0) {
          setTags(sorted);
        }
      } catch (err: any) {
        console.error('Fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularTags();
  }, []);

  const displayTags = tags.length > 0 ? tags : mockTags;
  const isMockData = tags.length === 0 && !loading;

  if (loading) {
    return (
      <Card className="border-amber-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">📚 Popüler Etiketler</CardTitle>
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
        <CardTitle style={accentStyle} className="text-xl">📚 Popüler Etiketler</CardTitle>
        <CardDescription style={serifStyle}>
          {isMockData ? 'Verileri yüklenirken örnek etiketler gösteriliyor' : 'Duyguya göre keşfet'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {displayTags.map((item) => (
            <button
              key={item.tag}
              onClick={() => onTagClick?.(item.tag)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-amber-900 text-sm transition hover:border-amber-300 cursor-pointer"
              title={`${item.count} eser`}
            >
              <span>{item.tag}</span>
              <span className="text-xs opacity-70">({item.count})</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
