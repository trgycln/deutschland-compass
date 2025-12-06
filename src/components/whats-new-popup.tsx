"use client";

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, MessageSquare, PenTool, ExternalLink, Calendar, Sparkles, PlayCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { professionsList } from '@/data/professions-list';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

type UpdateItem = {
  id: string | number;
  type: 'document' | 'experience' | 'blog' | 'video';
  title: string;
  subtitle?: string;
  link: string;
  date: string;
  isNew?: boolean;
  isFeatured?: boolean; // User contribution flag
};

export function WhatsNewPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dateStr = thirtyDaysAgo.toISOString();

        // 1. Fetch recent documents
        const { data: docs } = await supabase
          .from('documents')
          .select('id, title, profession_slug, created_at, file_type')
          .eq('status', 'approved')
          .gt('created_at', dateStr)
          .order('created_at', { ascending: false })
          .limit(5);

        // 2. Fetch recent experiences
        const { data: exps } = await supabase
          .from('experiences')
          .select('id, name, profession, created_at') // Note: profession is name, not slug
          .eq('status', 'approved')
          .gt('created_at', dateStr)
          .order('created_at', { ascending: false })
          .limit(5);

        // 3. Fetch recent blogs
        const { data: blogs } = await supabase
          .from('blogs')
          .select('id, title, slug, created_at')
          .eq('is_published', true)
          .gt('created_at', dateStr)
          .order('created_at', { ascending: false })
          .limit(5);

        // 4. Fetch recent profession videos
        const { data: videos } = await supabase
          .from('professions')
          .select('slug, title, video_url, created_at')
          .not('video_url', 'is', null)
          .gt('created_at', dateStr)
          .order('created_at', { ascending: false })
          .limit(5);

        // Process and combine
        const newItems: UpdateItem[] = [];

        docs?.forEach(doc => {
          const profession = professionsList.find(p => p.slug === doc.profession_slug);
          let link = `/meslekler/${doc.profession_slug}`;
          
          if (profession?.customLink) {
            link = profession.customLink;
          }
          
          newItems.push({
            id: `doc-${doc.id}`,
            type: 'document',
            title: doc.title,
            subtitle: `${doc.file_type?.toUpperCase() || 'DOC'} • ${doc.profession_slug}`,
            link: `${link}?tab=documents`,
            date: doc.created_at,
            isNew: true
          });
        });

        exps?.forEach(exp => {
          // Try to create a link. Since we only have profession name, we might need a better way.
          // For now, we link to the main guide page if we can guess the slug, or just /meslekler
          // A simple slugify might work for common ones: "Veteriner Hekimliği" -> "veteriner-hekimligi"
          const slug = exp.profession
            .toLowerCase()
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/i̇/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
            
          const profession = professionsList.find(p => p.slug === slug);
          let link = `/meslekler/${slug}`;
          
          if (profession?.customLink) {
            link = profession.customLink;
          }

          newItems.push({
            id: `exp-${exp.id}`,
            type: 'experience',
            title: exp.profession,
            subtitle: `Paylaşan: ${exp.name}`,
            link: `${link}#experience-${exp.id}`,
            date: exp.created_at,
            isNew: true,
            isFeatured: true // Mark all experiences as featured
          });
        });

        blogs?.forEach(blog => {
          newItems.push({
            id: `blog-${blog.id}`,
            type: 'blog',
            title: blog.title,
            subtitle: 'Blog Yazısı',
            link: `/blog/${blog.slug}`,
            date: blog.created_at,
            isNew: true
          });
        });

        videos?.forEach(video => {
          const profession = professionsList.find(p => p.slug === video.slug);
          let link = `/meslekler/${video.slug}`;

          if (profession?.customLink) {
            link = profession.customLink;
          }

          newItems.push({
            id: `video-${video.slug}`,
            type: 'video',
            title: profession?.title || video.title || video.slug,
            subtitle: 'NotebookLM Videosu',
            link,
            date: video.created_at,
            isNew: true
          });
        });

        // Sort: Featured (experiences) first, then by date desc
        newItems.sort((a, b) => {
          // Featured items always come first
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          // Within same category, sort by date
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setItems(newItems);
        
        // Only open if there are items
        if (newItems.length > 0) {
          // Check session storage to see if we've already shown it THIS SESSION?
          // User said "her acilista ciksin" (appear on every open). 
          // Usually this means every page load or every session. 
          // I'll stick to showing it if there are items.
          setIsOpen(true);
        }
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  if (items.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-primary p-6 text-primary-foreground">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-primary-foreground">
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              Yeni Eklenenler
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/80 mt-2">
              Son 30 gün içinde platforma eklenen güncel içerikler.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <ScrollArea className="max-h-[60vh] p-6 bg-white dark:bg-slate-950">
          <div className="space-y-4">
            {items.map((item) => (
              <Link 
                key={item.id} 
                href={item.link}
                onClick={() => setIsOpen(false)}
                className={`flex items-start gap-4 p-3 rounded-lg transition-colors group border ${
                  item.isFeatured 
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700 shadow-sm'
                    : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-900 hover:border-slate-100 dark:hover:border-slate-800'
                }`}
              >
                <div className={`p-2 rounded-full shrink-0 relative ${
                  item.isFeatured 
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
                    : item.type === 'document' ? 'bg-secondary text-primary dark:bg-secondary/20 dark:text-accent' :
                      item.type === 'experience' ? 'bg-secondary text-primary dark:bg-secondary/20 dark:text-accent' :
                      'bg-secondary text-primary dark:bg-secondary/20 dark:text-accent'
                }`}>
                  {item.isFeatured && (
                    <Star className="w-3 h-3 absolute -top-1 -right-1 fill-amber-400 text-amber-500 animate-pulse" />
                  )}
                  {item.type === 'document' && <FileText className="w-5 h-5" />}
                  {item.type === 'experience' && <MessageSquare className="w-5 h-5" />}
                  {item.type === 'blog' && <PenTool className="w-5 h-5" />}
                  {item.type === 'video' && <PlayCircle className="w-5 h-5" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" className={`text-[10px] h-5 px-1.5 font-normal ${
                        item.isFeatured 
                          ? 'bg-amber-200 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200'
                          : 'bg-secondary text-primary dark:bg-secondary/20 dark:text-primary-foreground'
                      }`}>
                        {item.type === 'document'
                          ? 'Doküman'
                          : item.type === 'experience'
                            ? 'Tecrübe'
                            : item.type === 'blog'
                              ? 'Blog'
                              : 'Video'}
                      </Badge>
                      {item.isFeatured && (
                        <Badge className="text-[10px] h-5 px-1.5 font-medium bg-amber-500 text-white dark:bg-amber-600 border-0">
                          <Star className="w-2.5 h-2.5 mr-0.5 fill-white" />
                          Topluluktan
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 flex items-center gap-1 whitespace-nowrap">
                      <Calendar className="w-3 h-3" />
                      {formatDistanceToNow(new Date(item.date), { addSuffix: true, locale: tr })}
                    </span>
                  </div>
                  <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-xs text-slate-500 mt-1 truncate">
                      {item.subtitle}
                    </p>
                  )}
                </div>
                
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-primary dark:group-hover:text-accent transition-colors mt-1" />
              </Link>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={() => setIsOpen(false)}
            className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Kapat
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
