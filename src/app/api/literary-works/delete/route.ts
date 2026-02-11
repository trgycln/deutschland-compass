import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workId = searchParams.get('id')

    if (!workId) {
      return NextResponse.json(
        { error: 'Work ID is required' },
        { status: 400 }
      )
    }

    // Şiiri sil
    const { error } = await supabase
      .from('literary_works')
      .delete()
      .eq('id', parseInt(workId))

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Şiir başarıyla silindi'
    })
  } catch (err: any) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to delete work' },
      { status: 500 }
    )
  }
}
