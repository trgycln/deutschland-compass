'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Heart, Eye, BookOpen } from 'lucide-react';

interface Author {
  name: string;
  workCount: number;
  totalLikes: number;
  totalViews: number;
  avgLikes: number;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

export function TopAuthorsDisplay() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTopAuthors() {
      try {
        const response = await fetch('/api/authors/top?limit=8');
        if (!response.ok) throw new Error('Yazarlar yüklenemedi');
        const data = await response.json();
        setAuthors(data.authors || []);
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopAuthors();
  }, []);

  if (loading) {
    return (
      <Card className="border-amber-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">🔥 En Aktif Yazarlar</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
        </CardContent>
      </Card>
    );
  }

  if (error || authors.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-100 bg-white/80 shadow-md">
      <CardHeader>
        <CardTitle style={accentStyle} className="text-xl">🔥 En Aktif Yazarlar</CardTitle>
        <CardDescription style={serifStyle}>Kalemi en çok kullanan sanatçılar</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {authors.map((author, idx) => (
            <div
              key={author.name}
              className="flex items-start justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-transparent border border-amber-100/50 hover:border-amber-200 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-amber-900">#{idx + 1}</span>
                  <h3 style={accentStyle} className="text-base text-stone-800">
                    {author.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="border-amber-200 text-amber-900 text-xs gap-1">
                    <BookOpen className="w-3 h-3" />
                    {author.workCount} eser
                  </Badge>
                  <Badge variant="outline" className="border-rose-200 text-rose-900 text-xs gap-1">
                    <Heart className="w-3 h-3" />
                    {author.totalLikes} ❤️
                  </Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-900 text-xs gap-1">
                    <Eye className="w-3 h-3" />
                    {author.totalViews} 👁️
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
