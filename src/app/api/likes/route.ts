import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Get IP address from request
function getClientIdentifier(request: NextRequest): string {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown'
  return ip.trim()
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workId = searchParams.get('workId')

    if (!workId) {
      return NextResponse.json(
        { error: 'workId parameter is required' },
        { status: 400 }
      )
    }

    // Toplam beğeni sayısını getir
    const { count, error: countError } = await supabase
      .from('literary_work_likes')
      .select('*', { count: 'exact', head: true })
      .eq('work_id', workId)

    if (countError) {
      console.error('Supabase error:', countError)
      return NextResponse.json({ error: countError.message }, { status: 500 })
    }

    // Kullanıcının bu eseri beğenip beğenmediğini kontrol et
    const clientIdentifier = getClientIdentifier(request)
    const { data: userLike } = await supabase
      .from('literary_work_likes')
      .select('id')
      .eq('work_id', workId)
      .eq('user_identifier', clientIdentifier)
      .maybeSingle()

    return NextResponse.json({
      count: count || 0,
      userLiked: !!userLike,
    })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch likes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { workId } = body

    if (!workId) {
      return NextResponse.json(
        { error: 'workId is required' },
        { status: 400 }
      )
    }

    const clientIdentifier = getClientIdentifier(request)

    // Önceden beğenip beğenmediğini kontrol et
    const { data: existingLike } = await supabase
      .from('literary_work_likes')
      .select('id')
      .eq('work_id', workId)
      .eq('user_identifier', clientIdentifier)
      .maybeSingle()

    if (existingLike) {
      // Varsa beğeniyi sil (toggle)
      const { error: deleteError } = await supabase
        .from('literary_work_likes')
        .delete()
        .eq('id', existingLike.id)

      if (deleteError) {
        console.error('Supabase error:', deleteError)
        return NextResponse.json({ error: deleteError.message }, { status: 500 })
      }

      // Yeni toplam sayısını getir
      const { count } = await supabase
        .from('literary_work_likes')
        .select('*', { count: 'exact', head: true })
        .eq('work_id', workId)

      return NextResponse.json({
        action: 'unlike',
        count: count || 0,
        userLiked: false,
      })
    } else {
      // Yeni beğeni ekle
      const { error: insertError } = await supabase
        .from('literary_work_likes')
        .insert([
          {
            work_id: workId,
            user_identifier: clientIdentifier,
          },
        ])

      if (insertError) {
        console.error('Supabase error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }

      // Yeni toplam sayısını getir
      const { count } = await supabase
        .from('literary_work_likes')
        .select('*', { count: 'exact', head: true })
        .eq('work_id', workId)

      return NextResponse.json({
        action: 'like',
        count: (count || 0) + 1,
        userLiked: true,
      })
    }
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to process like' },
      { status: 500 }
    )
  }
}
