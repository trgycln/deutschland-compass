import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Cache for 60 seconds

import { resolveCategoryRoute, resolveCategoryTitle } from '@/lib/route-resolver';

export interface PulseItem {
  id: string;
  type: 'community_update' | 'literary' | 'experience' | 'guide';
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

    // 1. Fetch latest community updates (Telegram field notes)
    try {
      const { data: communityUpdates } = await supabase
        .from('community_updates')
        .select('id, category_slug, title, content, badge_text, source_group, updated_at, created_at')
        .order('updated_at', { ascending: false, nullsFirst: false })
        .limit(5);

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
        .order('created_at', { ascending: false })
        .limit(2);

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

    // Sort all by timestamp descending
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const latestTimestamp = items.length > 0 ? items[0].timestamp : new Date().toISOString();

    return NextResponse.json({
      success: true,
      latestTimestamp,
      totalCount: items.length,
      items: items.slice(0, 7) // return top 7 items
    });
  } catch (error: any) {
    console.error('API /api/community-pulse error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
