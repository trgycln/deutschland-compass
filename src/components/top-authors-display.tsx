'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
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
        const data = await response.json();
        
        if (!response.ok) {
          console.error('API error response:', data);
          throw new Error(data.error || 'Yazarlar yüklenemedi');
        }
        
        if (data.authors && data.authors.length > 0) {
          setAuthors(data.authors);
          setError('');
        } else {
          setError('Yazar verisi bulunamadı');
        }
      } catch (err: any) {
        console.error('Fetch error:', err.message);
        setError(err.message || 'Yazarlar yüklenemedi');
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
    // Fallback: Mock data göster veya placeholder
    const mockAuthors: Author[] = [
      { name: 'Ömer Yaman', workCount: 11, totalLikes: 145, totalViews: 890, avgLikes: 13 },
      { name: 'Zeynep K.', workCount: 9, totalLikes: 124, totalViews: 765, avgLikes: 14 },
      { name: 'Ahmet Veli', workCount: 8, totalLikes: 102, totalViews: 620, avgLikes: 13 },
      { name: 'Ayşe Demir', workCount: 7, totalLikes: 95, totalViews: 580, avgLikes: 14 },
      { name: 'Mehmet Kaya', workCount: 6, totalLikes: 78, totalViews: 450, avgLikes: 13 },
    ];
    setAuthors(mockAuthors);
    return (
      <Card className="border-amber-100 bg-white/80 shadow-md">
        <CardHeader>
          <CardTitle style={accentStyle} className="text-xl">🔥 En Aktif Yazarlar</CardTitle>
          <CardDescription style={serifStyle} className="text-xs text-amber-700">Verileri yüklenirken örnek yazarlar gösteriliyor</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAuthors.map((author, idx) => (
              <Link
                key={author.name}
                href={`/gurbet-kalemleri?author=${encodeURIComponent(author.name)}`}
                className="block"
              >
                <div className="flex items-start justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-transparent border border-amber-100/50 hover:border-amber-300 hover:bg-amber-100/50 transition cursor-pointer">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-amber-900">#{idx + 1}</span>
                      <h3 style={accentStyle} className="text-base text-stone-800 hover:text-amber-900">
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
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    );
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
            <Link
              key={author.name}
              href={`/gurbet-kalemleri?author=${encodeURIComponent(author.name)}`}
              className="block"
            >
              <div className="flex items-start justify-between p-3 rounded-lg bg-gradient-to-r from-amber-50 to-transparent border border-amber-100/50 hover:border-amber-300 hover:bg-amber-100/50 transition cursor-pointer">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-amber-900">#{idx + 1}</span>
                    <h3 style={accentStyle} className="text-base text-stone-800 hover:text-amber-900">
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
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
