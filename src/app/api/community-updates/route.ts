import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { initialCommunityUpdates } from '@/data/initial-community-updates';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category_slug');
    const limit = parseInt(searchParams.get('limit') || '20');

    let query = supabase
      .from('community_updates')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (categorySlug) {
      query = query.eq('category_slug', categorySlug);
    }

    const { data, error } = await query;

    if (error) {
      // Return fallback data if table not yet migrated
      console.warn('Supabase query error, returning initial fallback data:', error.message);
      const filtered = categorySlug
        ? initialCommunityUpdates.filter(u => u.category_slug === categorySlug)
        : initialCommunityUpdates;
      return NextResponse.json({ data: filtered, fallback: true });
    }

    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Basic authorization check with SUPABASE_SERVICE_ROLE_KEY or ADMIN_PASSWORD
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.ADMIN_PASSWORD;

    if (expectedSecret && authHeader !== `Bearer ${expectedSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      category_slug,
      title,
      content,
      source_group,
      source_url,
      update_type,
      badge_text,
      importance,
      is_approved = true,
    } = body;

    if (!category_slug || !title || !content) {
      return NextResponse.json(
        { error: 'category_slug, title, and content are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('community_updates')
      .insert([
        {
          category_slug,
          title,
          content,
          source_group: source_group || 'Telegram Topluluğu',
          source_url,
          update_type: update_type || 'tip',
          badge_text: badge_text || 'Yeni Güncelleme',
          importance: importance || 'normal',
          is_approved,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
