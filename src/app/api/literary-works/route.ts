import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
    
    let query = supabase
      .from('literary_works')
      .select('*')
      .order('date', { ascending: false });
    
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
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ works: data, count: data?.length || 0 });
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
