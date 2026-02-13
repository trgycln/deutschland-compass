import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Next.js cache ayarları - her zaman dinamik veri
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

    const { count, error: countError } = await supabase
      .from('literary_work_listens')
      .select('*', { count: 'exact', head: true })
      .eq('work_id', workId)

    if (countError) {
      console.error('Supabase error:', countError)
      return NextResponse.json({ error: countError.message }, { status: 500 })
    }

    const clientIdentifier = getClientIdentifier(request)
    const { data: userListen } = await supabase
      .from('literary_work_listens')
      .select('id')
      .eq('work_id', workId)
      .eq('user_identifier', clientIdentifier)
      .maybeSingle()

    return NextResponse.json({
      count: count || 0,
      userListened: !!userListen,
    })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch listens' },
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

    const { data: existingListen } = await supabase
      .from('literary_work_listens')
      .select('id')
      .eq('work_id', workId)
      .eq('user_identifier', clientIdentifier)
      .maybeSingle()

    if (!existingListen) {
      const { error: insertError } = await supabase
        .from('literary_work_listens')
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
    }

    const { count } = await supabase
      .from('literary_work_listens')
      .select('*', { count: 'exact', head: true })
      .eq('work_id', workId)

    return NextResponse.json({
      action: existingListen ? 'exists' : 'listen',
      count: count || 0,
      userListened: true,
    })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to process listen' },
      { status: 500 }
    )
  }
}
