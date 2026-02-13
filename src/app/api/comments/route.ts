import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// GET - Approved comments for specific work
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workId = searchParams.get('workId')
    const adminMode = searchParams.get('admin') === 'true'

    if (!workId) {
      return NextResponse.json(
        { error: 'workId parameter is required' },
        { status: 400 }
      )
    }

    let query = supabaseAdmin
      .from('literary_work_comments')
      .select('*')
      .eq('work_id', workId)
    
    // If not admin, only show approved comments
    if (!adminMode) {
      query = query.eq('status', 'approved')
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })

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

    // Validate content length (minimum 2 characters)
    if (content.trim().length < 2) {
      return NextResponse.json(
        { error: 'Comment must be at least 2 characters' },
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

// PUT - Update comment (admin only)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, author_name, content } = body

    if (!id || !author_name || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: id, author_name, content' },
        { status: 400 }
      )
    }

    // Validate content length (minimum 2 characters)
    if (content.trim().length < 2) {
      return NextResponse.json(
        { error: 'Comment must be at least 2 characters' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('literary_work_comments')
      .update({
        author_name: author_name.trim().substring(0, 100),
        content: content.trim(),
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ comment: data }, { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to update comment' },
      { status: 500 }
    )
  }
}

// DELETE - Delete comment (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Comment ID is required' },
        { status: 400 }
      )
    }

    const { error } = await supabaseAdmin
      .from('literary_work_comments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Comment deleted' }, { status: 200 })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to delete comment' },
      { status: 500 }
    )
  }
}
