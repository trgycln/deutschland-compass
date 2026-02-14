'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dices, Music } from 'lucide-react';

interface Work {
  id: number;
  title: string;
  author: string;
  type: string;
  tags: string[];
  content: string;
  views: number;
  likes: number;
  audio_url?: string;
}

const serifStyle = {
  fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
} as const;

const accentStyle = {
  fontFamily: "'Playfair Display', 'Times New Roman', serif",
} as const;

export function RandomDiscoveryDisplay({ onDiscoverClick, triggerId }: { onDiscoverClick?: (workId: number) => void; triggerId?: number }) {
  const [allWorks, setAllWorks] = useState<Work[]>([]);
  const [randomWork, setRandomWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  // Verilen array'dan gerçekten rastgele eser seç
  const getRandomWork = (works: Work[]) => {
    if (works.length === 0) return null;
    // Truly random: timestamp + Math.random() kombinasyonu
    const seed = Date.now() + Math.random();
    const index = Math.floor((seed % works.length) * Math.random()) % works.length;
    return works[index];
  };

  useEffect(() => {
    async function fetchWorks() {
      try {
        const response = await fetch('/api/literary-works?limit=1000');
        if (!response.ok) return;
        const data = await response.json();
        const works = data.works || [];
        setAllWorks(works);
        
        // Rastgele eseri seç (truly random)
        if (works.length > 0) {
          const random = getRandomWork(works);
          setRandomWork(random);
        }
      } catch (error) {
        console.error('Error fetching works:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, []);

  // Featured work değişince yeni random eser seç
  useEffect(() => {
    if (allWorks.length > 0 && triggerId) {
      const random = getRandomWork(allWorks);
      setRandomWork(random);
    }
  }, [triggerId, allWorks]);

  const handleDiscover = () => {
    if (allWorks.length > 0) {
      const random = getRandomWork(allWorks);
      if (random) {
        setRandomWork(random);
        onDiscoverClick?.(random.id);
      }
    }
  };

  if (loading || !randomWork) {
    // Fallback: Mock work göster
    if (!randomWork && allWorks.length === 0) {
      const mockWork: Work = {
        id: 999,
        title: 'Şanslı Eser',
        author: 'Rastgele Yazar',
        type: 'Şiir',
        tags: ['gurbet', 'özlem'],
        content: 'Bu bir örnek eser gösterimidir. Sayfayı kullandıkça eserler gösterilecektir.',
        views: 0,
        likes: 0,
      };
      setRandomWork(mockWork);
      return (
        <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-white/80 shadow-md">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div>
                <h3 style={accentStyle} className="text-2xl text-stone-800 mb-2">
                  🎲 Şansını Dene
                </h3>
                <p style={serifStyle} className="text-sm text-stone-600">
                  Rastgele bir eser keşfet
                </p>
              </div>

              {mockWork && (
                <div className="bg-white/80 rounded-lg border border-amber-100 p-4 text-left space-y-2">
                  <div>
                    <h4 style={accentStyle} className="text-lg text-stone-800 font-medium line-clamp-2">
                      {mockWork.title}
                    </h4>
                    <p style={serifStyle} className="text-sm text-stone-500 mt-1">
                      {mockWork.author}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-amber-200 text-amber-900 text-xs">
                      {mockWork.type}
                    </Badge>
                  </div>

                  <p style={serifStyle} className="text-sm text-stone-600 line-clamp-5">
                    {mockWork.content}
                  </p>
                </div>
              )}

              <Button 
                onClick={handleDiscover}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white gap-2"
              >
                <Dices className="w-4 h-4" />
                Başka Bir Eser Göster
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  }


  return (
    <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-white/80 shadow-md">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div>
            <h3 style={accentStyle} className="text-2xl text-stone-800 mb-2">
              🎲 Şansını Dene
            </h3>
            <p style={serifStyle} className="text-sm text-stone-600">
              Rastgele bir eser keşfet
            </p>
          </div>

          {randomWork && (
            <div 
              onClick={() => onDiscoverClick?.(randomWork.id)}
              className="bg-white/80 rounded-lg border border-amber-100 p-4 text-left space-y-2 hover:border-amber-300 hover:shadow-md transition cursor-pointer"
            >
              <div>
                <h4 style={accentStyle} className="text-lg text-stone-800 font-medium line-clamp-2 hover:text-amber-700">
                  {randomWork.title}
                </h4>
                <p style={serifStyle} className="text-sm text-stone-500 mt-1">
                  {randomWork.author}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-amber-200 text-amber-900 text-xs">
                  {randomWork.type}
                </Badge>
                {randomWork.audio_url && (
                  <Badge className="bg-blue-100 text-blue-900 text-xs gap-1">
                    <Music className="w-3 h-3" />
                    Seslendirilmiş
                  </Badge>
                )}
              </div>

              <p style={serifStyle} className="text-sm text-stone-600 line-clamp-5">
                {randomWork.content}
              </p>

              <div className="flex gap-2 text-xs text-stone-500">
                {randomWork.likes > 0 && <span>❤️ {randomWork.likes}</span>}
                {randomWork.views > 0 && <span>👁️ {randomWork.views}</span>}
              </div>
            </div>
          )}

          <Button 
            onClick={handleDiscover}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white gap-2"
          >
            <Dices className="w-4 h-4" />
            Başka Bir Eser Göster
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
