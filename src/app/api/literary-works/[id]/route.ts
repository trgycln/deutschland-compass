import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Service client for admin operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Next.js cache ayarları - her zaman dinamik veri
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    
    // Görüntülenme sayısını artır (önce RPC fonksiyonu dene, sonra direkt UPDATE)
    let updatedViews = data.views || 0;
    let updateSuccess = false;
    
    // Yöntem 1: SECURITY DEFINER fonksiyon (RLS bypass garantili)
    try {
      const { error: rpcError } = await supabaseAdmin.rpc('increment_literary_work_views', {
        work_id: parseInt(id)
      });
      
      if (!rpcError) {
        updatedViews = (data.views || 0) + 1;
        updateSuccess = true;
        console.log(`[Views] ✓ RPC Success - Work ${id} (${data.title}): ${data.views || 0} -> ${updatedViews}`);
      } else {
        console.error(`[Views] ✗ RPC failed for work ${id}:`, rpcError.message);
      }
    } catch (rpcErr) {
      console.warn('[Views] RPC Exception:', rpcErr);
    }
    
    // Yöntem 2: Eğer RPC başarısız olduysa, direkt UPDATE dene
    if (!updateSuccess) {
      try {
        const newViewCount = (data.views || 0) + 1;
        const { error: updateError } = await supabaseAdmin
          .from('literary_works')
          .update({ views: newViewCount })
          .eq('id', parseInt(id));
        
        if (!updateError) {
          updatedViews = newViewCount;
          updateSuccess = true;
          console.log(`[Views] ✓ Direct UPDATE Success - Work ${id}: ${data.views || 0} -> ${newViewCount}`);
        } else {
          console.error(`[Views] ✗ Direct UPDATE failed:`, updateError.message, updateError.details);
        }
      } catch (updateErr) {
        console.error('[Views] UPDATE Exception:', updateErr);
      }
    }
    
    if (!updateSuccess) {
      console.error(`[Views] ✗✗✗ BOTH METHODS FAILED for work ${id} ✗✗✗`);
    }
    
    // Güncellenmiş views ile döndür
    return NextResponse.json({ work: { ...data, views: updatedViews } });
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
