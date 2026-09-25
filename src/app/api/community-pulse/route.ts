import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

import { resolveCategoryRoute, resolveCategoryTitle } from '@/lib/route-resolver';
import { professionsList } from '@/data/professions-list';

export interface PulseItem {
  id: string;
  type: 'community_update' | 'literary' | 'experience' | 'guide' | 'document' | 'blog' | 'video';
  badge: string;
  badgeStyle: string; // Tailwind color styling
  title: string;
  teaser: string;
  link: string;
  source: string;
  timestamp: string;
}

function truncateText(text: string, maxLen = 140): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]*>/g, '').replace(/[\r\n]+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).trim() + '...';
}

export async function GET() {
  try {
    const items: PulseItem[] = [];
    
    // We only want items from the last 90 days to prevent very old items from sticking to the top
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const dateStr = ninetyDaysAgo.toISOString();

    // 1. Fetch latest community updates (Telegram field notes)
    try {
      const { data: communityUpdates } = await supabase
        .from('community_updates')
        .select('id, category_slug, title, content, badge_text, source_group, updated_at, created_at')
        .gt('updated_at', dateStr)
        .order('updated_at', { ascending: false, nullsFirst: false })
        .limit(30);

      if (communityUpdates) {
        for (const cu of communityUpdates) {
          const catName = resolveCategoryTitle(cu.category_slug);
          const route = resolveCategoryRoute(cu.category_slug);
          const itemTime = cu.updated_at || cu.created_at || new Date().toISOString();

          items.push({
            id: `cu-${cu.id}`,
            type: 'community_update',
            badge: catName,
            badgeStyle: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
            title: cu.title || `${catName} Saha Notu`,
            teaser: truncateText(cu.content, 130),
            link: `${route}?tab=updates#update-${cu.id}`,
            source: cu.badge_text || 'Saha Tecrübesi',
            timestamp: itemTime
          });
        }
      }
    } catch (cuErr) {
      console.error('Error fetching community_updates:', cuErr);
    }

    // 2. Fetch latest Gurbet Kalemleri (Literary Works)
    try {
      const { data: literaryWorks } = await supabase
        .from('literary_works')
        .select('id, title, author, type, excerpt, content, created_at')
        .gt('created_at', dateStr)
        .order('created_at', { ascending: false })
        .limit(3);

      if (literaryWorks) {
        for (const lw of literaryWorks) {
          const typeLabel = lw.type === 'siir' ? 'Şiir' : 'Deneme / Yazı';
          const authorInitial = lw.author ? (lw.author.length > 2 ? `${lw.author.substring(0, 1)}.` : lw.author) : 'Anonim';
          const snippet = lw.excerpt || truncateText(lw.content, 120);

          items.push({
            id: `lw-${lw.id}`,
            type: 'literary',
            badge: 'Gurbet Kalemleri',
            badgeStyle: 'bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-300 border-violet-200 dark:border-violet-800',
            title: lw.title && lw.title !== '...' ? lw.title : `Yeni ${typeLabel}`,
            teaser: snippet ? `"${snippet}" — ${authorInitial}` : `Topluluktan yeni ${typeLabel.toLowerCase()} yayında.`,
            link: `/gurbet-kalemleri?tab=featured&work=${lw.id}#work-${lw.id}`,
            source: typeLabel,
            timestamp: lw.created_at || new Date().toISOString()
          });
        }
      }
    } catch (lwErr) {
      console.error('Error fetching literary_works:', lwErr);
    }

    // 3. Fetch latest experiences
    try {
      const { data: experiences } = await supabase
        .from('experiences')
        .select('id, profession, name, created_at')
        .eq('status', 'approved')
        .gt('created_at', dateStr)
        .order('created_at', { ascending: false })
        .limit(3);

      if (experiences) {
        for (const exp of experiences) {
          const route = resolveCategoryRoute(exp.profession);

          items.push({
            id: `exp-${exp.id}`,
            type: 'experience',
            badge: exp.profession || 'Mesleki Tecrübe',
            badgeStyle: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800',
            title: `${exp.profession} Alanında Yeni Saha Tecrübesi`,
            teaser: `Almanya'da çalışan bir meslektaşımız süreçlerini ve tavsiyelerini aktardı.`,
            link: `${route}?tab=experiences#experience-${exp.id}`,
            source: 'Tecrübe Paylaşımı',
            timestamp: exp.created_at || new Date().toISOString()
          });
        }
      }
    } catch (expErr) {
      console.error('Error fetching experiences:', expErr);
    }
    
    // 4. Fetch latest documents
    try {
      const { data: docs } = await supabase
        .from('documents')
        .select('id, title, profession_slug, created_at, file_type')
        .eq('status', 'approved')
        .gt('created_at', dateStr)
        .order('created_at', { ascending: false })
        .limit(4);

      if (docs) {
        for (const doc of docs) {
          const profession = professionsList.find(p => p.slug === doc.profession_slug);
          const link = profession?.customLink || resolveCategoryRoute(doc.profession_slug);
          
          items.push({
            id: `doc-${doc.id}`,
            type: 'document',
            badge: 'Doküman',
            badgeStyle: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800',
            title: doc.title,
            teaser: `${doc.file_type?.toUpperCase() || 'DOC'} formatında yeni doküman eklendi. (${profession?.title || doc.profession_slug})`,
            link: `${link}?tab=documents`,
            source: 'Dosya Paylaşımı',
            timestamp: doc.created_at || new Date().toISOString()
          });
        }
      }
    } catch (docErr) {
      console.error('Error fetching documents:', docErr);
    }
    
    // 5. Fetch latest blogs
    try {
      const { data: blogs } = await supabase
        .from('blogs')
        .select('id, title, slug, created_at')
        .eq('is_published', true)
        .gt('created_at', dateStr)
        .order('created_at', { ascending: false })
        .limit(3);

      if (blogs) {
        for (const blog of blogs) {
          items.push({
            id: `blog-${blog.id}`,
            type: 'blog',
            badge: 'Blog',
            badgeStyle: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/60 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800',
            title: blog.title,
            teaser: `Yeni blog yazısı platformda yayında.`,
            link: `/blog/${blog.slug}`,
            source: 'Blog Yazısı',
            timestamp: blog.created_at || new Date().toISOString()
          });
        }
      }
    } catch (blogErr) {
      console.error('Error fetching blogs:', blogErr);
    }
    
    // 6. Fetch latest profession videos
    try {
      const { data: videos } = await supabase
        .from('professions')
        .select('slug, title, video_url, created_at')
        .not('video_url', 'is', null)
        .gt('created_at', dateStr)
        .order('created_at', { ascending: false })
        .limit(2);

      if (videos) {
        for (const video of videos) {
          const profession = professionsList.find(p => p.slug === video.slug);
          let link = profession?.customLink ? profession.customLink : resolveCategoryRoute(video.slug);

          items.push({
            id: `video-${video.slug}`,
            type: 'video',
            badge: 'Video',
            badgeStyle: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800',
            title: profession?.title || video.title || video.slug,
            teaser: `NotebookLM destekli sesli anlatım ve video rehberi eklendi.`,
            link,
            source: 'Video Rehber',
            timestamp: video.created_at || new Date().toISOString()
          });
        }
      }
    } catch (videoErr) {
      console.error('Error fetching videos:', videoErr);
    }

    // Sort all by timestamp descending
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const latestTimestamp = items.length > 0 ? items[0].timestamp : new Date().toISOString();

    return NextResponse.json({
      success: true,
      latestTimestamp,
      totalCount: items.length,
      items: items.slice(0, 15) // return top 15 items to show ALL recent Telegram field notes and more
    });
  } catch (error: any) {
    console.error('API /api/community-pulse error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

