'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPopularTags() {
      try {
        const response = await fetch('/api/literary-works?limit=1000');
        if (!response.ok) throw new Error('Etiketler yüklenemedi');
        const data = await response.json();
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

        setTags(sorted);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularTags();
  }, []);

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

  if (error || tags.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">📚 Popüler Etiketler</CardTitle>
        <CardDescription style={serifStyle}>Duyguya göre keşfet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((item) => (
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
