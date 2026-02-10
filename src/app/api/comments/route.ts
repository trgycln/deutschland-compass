import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

    const { data, error } = await supabase
      .from('literary_work_comments')
      .select('*')
      .eq('work_id', workId)
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ comments: data || [] })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { workId, authorName, content } = body

    if (!workId || !authorName || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: workId, authorName, content' },
        { status: 400 }
      )
    }

    // Validate content length
    if (content.trim().length < 2 || content.trim().length > 500) {
      return NextResponse.json(
        { error: 'Comment must be between 2 and 500 characters' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('literary_work_comments')
      .insert([
        {
          work_id: workId,
          author_name: authorName.trim().substring(0, 100),
          content: content.trim(),
          status: 'approved',
        },
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ comment: data?.[0] }, { status: 201 })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
