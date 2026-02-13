import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/literary-works/[id] - Tekil eser getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const { data, error } = await supabase
      .from('literary_works')
      .select('*')
      .eq('id', parseInt(id))
      .eq('is_approved', true)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Eser bulunamadı' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Görüntülenme sayısını artır (hata vermez)
    try {
      await supabase.rpc('increment_literary_work_views', { work_id: parseInt(id) });
    } catch (viewErr) {
      // Fonksiyon yoksa yoksay, eser yine return et
      console.warn('Views increment failed:', viewErr);
    }
    
    return NextResponse.json({ work: data });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/literary-works/[id] - Eseri güncelle (admin için)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { title, author, date, type, tags, content } = body;

    // Validation
    if (!title || !author || !date || !type || !content) {
      return NextResponse.json(
        { error: 'Zorunlu alanlar eksik: title, author, date, type, content' },
        { status: 400 }
      );
    }

    // Eseri güncelle
    const { data, error } = await supabase
      .from('literary_works')
      .update({
        title,
        author,
        date,
        type,
        tags: tags || [],
        content,
        updated_at: new Date().toISOString()
      })
      .eq('id', parseInt(id))
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Eser başarıyla güncellendi',
      work: data
    });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
