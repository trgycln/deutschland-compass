"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

// Normalizes YouTube links into an embeddable URL; falls back to the original URL otherwise.
function getEmbedUrl(url: string) {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

interface ProfessionVideoPlayerProps {
  professionSlug: string;
  variant?: 'default' | 'hero';
  fallbackUrl?: string;
}

export function ProfessionVideoPlayer({ professionSlug, variant = 'default', fallbackUrl }: ProfessionVideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCancelled = false;


    async function fetchVideo() {
      try {
        const { data, error } = await supabase
          .from('professions')
          .select('video_url')
          .eq('slug', professionSlug)
          .single();
        console.log('[ProfessionVideoPlayer]', { professionSlug, data, error });
        if (!isCancelled) {
          if (data?.video_url) {
            setVideoUrl(data.video_url);
          } else if (fallbackUrl) {
            setVideoUrl(fallbackUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching video:', error);
        if (!isCancelled && fallbackUrl) {
          setVideoUrl(fallbackUrl);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchVideo();

    return () => {
      isCancelled = true;
    };
  }, [professionSlug, fallbackUrl]);

  if (loading) return null; // Avoid layout shift during load

  if (variant === 'hero') {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
        {videoUrl ? (
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 gap-2">
            <PlayCircle className="w-12 h-12 opacity-50" />
            <span className="text-sm font-medium">Tanıtım videosu yakında eklenecek</span>
          </div>
        )}
      </div>
    );
  }

  if (!videoUrl) return null;

  return (
    <Card className="mb-8 border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <PlayCircle className="w-5 h-5" />
          NotebookLM Özeti
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black/5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <iframe
            src={getEmbedUrl(videoUrl)}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
}
