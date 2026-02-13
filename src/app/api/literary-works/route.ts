import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Next.js cache ayarları - her zaman dinamik veri
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/literary-works - Tüm eserleri listele (filtreleme ile)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Query parametreleri
    const author = searchParams.get('author');
    const type = searchParams.get('type');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const onlyApproved = searchParams.get('approved') !== 'false'; // Default true
    const sort = searchParams.get('sort') || 'recent'; // recent, likes, trending, views, listens
    const limit = parseInt(searchParams.get('limit') || '1000');
    
    let query = supabase
      .from('literary_works')
      .select('*');
    
    // Filtreler
    if (onlyApproved) {
      query = query.eq('is_approved', true);
    }
    
    if (author && author !== 'all') {
      query = query.eq('author', author);
    }
    
    if (type && type !== 'all') {
      query = query.eq('type', type);
    }
    
    if (tag && tag !== 'all') {
      query = query.contains('tags', [tag]);
    }
    
    // Metin araması (title, author, content)
    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%,content.ilike.%${search}%`);
    }
    
    // Not: likes ve views metrikleri uygulama taraf31nda hesaplan31yor
    // Bu nedenle s1amay31 API taraf31nda yapaca1f31z
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    const works = data || [];

    const workIds = works.map((work: any) => work.id).filter((id: any) => id !== null);
    const likeCounts = new Map<number, number>();
    const listenCounts = new Map<number, number>();

    if (workIds.length > 0) {
      const { data: likesData, error: likesError } = await supabase
        .from('literary_work_likes')
        .select('work_id')
        .in('work_id', workIds);

      if (likesError) {
        console.error('Supabase likes error:', likesError);
      } else {
        (likesData || []).forEach((like: any) => {
          likeCounts.set(like.work_id, (likeCounts.get(like.work_id) || 0) + 1);
        });
      }
    }

    // Views artık literary_works.views field'ından geliyor (literary_work_views tablosu kullanılmıyor)

    if (workIds.length > 0) {
      const { data: listensData, error: listensError } = await supabase
        .from('literary_work_listens')
        .select('work_id')
        .in('work_id', workIds);

      if (listensError) {
        console.error('Supabase listens error:', listensError);
      } else {
        (listensData || []).forEach((listen: any) => {
          listenCounts.set(listen.work_id, (listenCounts.get(listen.work_id) || 0) + 1);
        });
      }
    }

    const enrichedWorks = works.map((work: any) => {
      const computedLikes = likeCounts.get(work.id) || 0;
      const computedListens = listenCounts.get(work.id) || 0;
      const views = typeof work.views === 'number' ? work.views : 0;

      return {
        ...work,
        likes: computedLikes,
        views,
        listens: computedListens,
      };
    });

    let sortedWorks = enrichedWorks;

    if (sort === 'likes') {
      sortedWorks = [...enrichedWorks].sort((a, b) => {
        const likeDiff = (b.likes || 0) - (a.likes || 0);
        if (likeDiff !== 0) return likeDiff;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    } else if (sort === 'views') {
      sortedWorks = [...enrichedWorks].sort((a, b) => {
        const viewDiff = (b.views || 0) - (a.views || 0);
        if (viewDiff !== 0) return viewDiff;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
      
      // Debug: İlk 10 eserin views değerlerini logla
      console.log('[Views Sort] Top 10 works by views:');
      sortedWorks.slice(0, 10).forEach((w, idx) => {
        console.log(`  ${idx + 1}. ${w.title} by ${w.author}: ${w.views} views`);
      });
    } else if (sort === 'listens') {
      sortedWorks = [...enrichedWorks].sort((a, b) => {
        const listenDiff = (b.listens || 0) - (a.listens || 0);
        if (listenDiff !== 0) return listenDiff;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    } else if (sort === 'trending') {
      sortedWorks = [...enrichedWorks].sort((a, b) => {
        const scoreA = (a.views || 0) + (a.likes || 0) * 2;
        const scoreB = (b.views || 0) + (b.likes || 0) * 2;
        const scoreDiff = scoreB - scoreA;
        if (scoreDiff !== 0) return scoreDiff;
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    } else {
      sortedWorks = [...enrichedWorks].sort((a, b) => {
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      });
    }

    const limitedWorks = sortedWorks.slice(0, limit);

    return NextResponse.json({ works: limitedWorks, count: limitedWorks.length });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/literary-works - Yeni eser ekle
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, author, date, type, tags, content } = body;
    
    // Validation
    if (!title || !author || !date || !type || !content) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik: title, author, date, type, content' },
        { status: 400 }
      );
    }
    
    // Yeni eser ekle (direkt yayınla)
    const { data, error } = await supabase
      .from('literary_works')
      .insert([
        {
          title,
          author,
          date,
          type,
          tags: tags || [],
          content,
          is_approved: true, // Direkt yayınla
          submitted_by: 'user' // TODO: Auth eklenince kullanıcı bilgisi
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: true, 
      work: data,
      message: 'Eseriniz başarıyla yayınlanmıştır.'
    }, { status: 201 });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
