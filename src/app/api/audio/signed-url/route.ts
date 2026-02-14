import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const workId = body?.workId
    const fileName = (body?.fileName as string | undefined) || ''

    if (!workId || !fileName) {
      return NextResponse.json(
        { error: 'workId and fileName are required' },
        { status: 400 }
      )
    }

    const extension = fileName.toLowerCase().split('.').pop() || 'mp3'
    const uploadFileName = `work_${workId}_${Date.now()}.${extension}`
    const filePath = `audio/${uploadFileName}`

    const { data, error } = await supabase.storage
      .from('literary-works-audio')
      .createSignedUploadUrl(filePath, 60 * 10)

    if (error || !data?.signedUrl) {
      return NextResponse.json(
        { error: error?.message || 'Failed to create signed upload url' },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('literary-works-audio')
      .getPublicUrl(filePath)

    return NextResponse.json({
      signedUrl: data.signedUrl,
      path: data.path || filePath,
      publicUrl,
    })
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Failed to create signed upload url'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
