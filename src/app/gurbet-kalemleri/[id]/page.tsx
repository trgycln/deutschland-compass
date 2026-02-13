"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Tag, ChevronLeft, ChevronRight, BookOpen, Loader2, AlertCircle, Music } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AudioPlayer } from "@/components/audio-player";
import { LikeButton } from "@/components/like-button";
import { CommentForm } from "@/components/comment-form";
import { CommentsList } from "@/components/comments-list";

interface LiteraryWork {
  id: number;
  title: string;
  author: string;
  date: string;
  type: string;
  tags: string[];
  content: string;
  audio_url?: string;
  views?: number;
}

export default function LiteraryWorkPage() {
  const params = useParams();
  const router = useRouter();
  const workId = parseInt(params.id as string);
  
  const [work, setWork] = useState<LiteraryWork | null>(null);
  const [allWorks, setAllWorks] = useState<LiteraryWork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Supabase'den veri çek
  useEffect(() => {
    async function fetchWork() {
      try {
        setLoading(true);
        
        // Mevcut eseri çek - cache bypass için timestamp ekle
        console.log(`[Client] Fetching work ${workId}...`);
        const response = await fetch(`/api/literary-works/${workId}?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        });
        if (!response.ok) throw new Error('Eser bulunamadı');
        
        const data = await response.json();
        console.log('[Client] Work fetched:', {
          id: data.work.id,
          title: data.work.title,
          views: data.work.views,
          audio_url: data.work.audio_url,
        });
        setWork(data.work);
        
        // Tüm eserleri çek (önceki/sonraki için)
        const allResponse = await fetch('/api/literary-works');
        const allData = await allResponse.json();
        setAllWorks(allData.works || []);
        
      } catch (err: any) {
        console.error('Fetch error:', err);
        setError(err.message || 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
    
    if (workId) {
      fetchWork();
    }
  }, [workId]);
  
  const currentIndex = allWorks.findIndex(w => w.id === workId);
  const prevWork = currentIndex > 0 ? allWorks[currentIndex - 1] : null;
  const nextWork = currentIndex < allWorks.length - 1 ? allWorks[currentIndex + 1] : null;
  
  if (!work) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">
            Eser bulunamadı
          </h2>
          <Link href="/gurbet-kalemleri">
            <Button>Antolojiye Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'Şiir': return 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300';
      case 'Deneme': return 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Öykü': return 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Navigation Bar */}
      <div className="sticky top-16 z-40 border-b bg-white/95 backdrop-blur dark:bg-slate-900/95 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <Link href="/gurbet-kalemleri">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Antolojiye Dön
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="space-y-8">
          {/* Audio Player - First Thing User Sees */}
          {work.audio_url && (
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <AudioPlayer 
                audioUrl={work.audio_url} 
                title={work.title} 
                workId={work.id} 
                content={work.content}
                author={work.author}
              />
            </div>
          )}

          {/* Header */}
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={`${getTypeBadgeColor(work.type)}`}>
                {work.type}
              </Badge>
              {work.audio_url && (
                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  Seslendirilmis
                </Badge>
              )}
              <span className="text-slate-400">•</span>
              <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                {work.date}
              </div>
              {work.views !== undefined && (
                <>
                  <span className="text-slate-400">•</span>
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                    <span className="text-lg">👁️</span>
                    <span className="font-semibold">{work.views}</span>
                  </div>
                </>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
              {work.title}
            </h1>
            
            <div className="flex items-center gap-2 text-lg text-slate-600 dark:text-slate-400">
              <User className="w-5 h-5" />
              <span className="font-medium">{work.author}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <Tag className="w-4 h-4 text-slate-400" />
              {work.tags && work.tags.map(tag => (
                <Link key={tag} href={`/gurbet-kalemleri?tag=${tag}`}>
                  <Badge variant="secondary" className="hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </header>

          {/* Content */}
          <Card className="border-l-4 border-l-slate-400 dark:border-l-slate-600">
            <CardContent className="p-8 md:p-12">
              <div className={`text-base md:text-lg leading-relaxed text-slate-800 dark:text-slate-200 ${
                work.type === 'Şiir' ? 'whitespace-pre-wrap font-serif' : 'whitespace-pre-wrap'
              }`}>
                {work.content}
              </div>
            </CardContent>
          </Card>

          {/* Copyright Notice */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-sm text-amber-900 dark:text-amber-200 text-center">
              <span className="font-semibold">Telif Hakkı:</span> Bu eser, kapalı bir iletişim grubunda paylaşılmış olup, 
              yazarın hakları saklıdır.
            </p>
          </div>

          {/* Navigation: Previous/Next */}
          <div className="grid md:grid-cols-2 gap-4 pt-8">
            {prevWork ? (
              <Link href={`/gurbet-kalemleri/${prevWork.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-slate-300 hover:border-l-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <ChevronLeft className="w-4 h-4" />
                      <span>Önceki Eser</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2">
                      {prevWork.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {prevWork.author}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div></div>
            )}

            {nextWork ? (
              <Link href={`/gurbet-kalemleri/${nextWork.id}`}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group border-l-4 border-l-slate-300 hover:border-l-slate-600">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-end gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                      <span>Sonraki Eser</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-2 text-right">
                      {nextWork.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 text-right">
                      {nextWork.author}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Like & Comments Section */}
          <div className="space-y-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            {/* Like Button */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Bu eseri beğendin mi?
              </h3>
              <LikeButton workId={work.id} />
            </div>

            {/* Comments */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Yorum Yap
              </h3>
              <CommentForm workId={work.id} onCommentAdded={() => {}} />
            </div>

            {/* Comments List */}
            <div>
              <CommentsList workId={work.id} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
