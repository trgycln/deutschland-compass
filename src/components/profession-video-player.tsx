"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

export function ProfessionVideoPlayer({ professionSlug }: { professionSlug: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const { data, error } = await supabase
          .from('professions')
          .select('video_url')
          .eq('slug', professionSlug)
          .single();

        if (data && data.video_url) {
          setVideoUrl(data.video_url);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, [professionSlug]);

  if (loading || !videoUrl) return null;

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
            src={videoUrl}
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
}
