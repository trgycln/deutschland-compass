import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/authors/top - En aktif yazarları listele
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '8');

    // Tüm onaylı eserleri al
    const { data: works, error } = await supabase
      .from('literary_works')
      .select('author, likes, views')
      .eq('is_approved', true);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!works || works.length === 0) {
      return NextResponse.json({ authors: [] });
    }

    // Yazarları grupla ve istatistik hesapla
    const authorStats = new Map<string, { count: number; totalLikes: number; totalViews: number }>();

    works.forEach((work: any) => {
      const authorName = work.author;
      if (!authorStats.has(authorName)) {
        authorStats.set(authorName, { count: 0, totalLikes: 0, totalViews: 0 });
      }
      const stats = authorStats.get(authorName)!;
      stats.count += 1;
      stats.totalLikes += work.likes || 0;
      stats.totalViews += work.views || 0;
    });

    // Array'e çevir ve sırala (eser sayısına göre)
    const topAuthors = Array.from(authorStats.entries())
      .map(([name, stats]) => ({
        name,
        workCount: stats.count,
        totalLikes: stats.totalLikes,
        totalViews: stats.totalViews,
        avgLikes: Math.round(stats.totalLikes / stats.count),
      }))
      .sort((a, b) => b.workCount - a.workCount || b.totalLikes - a.totalLikes)
      .slice(0, limit);

    return NextResponse.json({ authors: topAuthors });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
