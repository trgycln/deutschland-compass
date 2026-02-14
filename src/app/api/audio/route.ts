import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Service role key'i kullan (dosya yükleme için daha güvenli)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Next.js 15+ App Router configuration
export const maxDuration = 60; // 60 saniye timeout

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const workId = formData.get('workId') as string

    if (!file || !workId) {
      return NextResponse.json(
        { error: 'File and workId are required' },
        { status: 400 }
      )
    }

    // Ses dosyalarını kabul et (MP3, MPEG, WAV, OGG, FLAC, AAC, WebM, vb.)
    const allowedAudioTypes = [
      'audio/mpeg',      // MP3 / MPEG
      'audio/mp3',       // MP3
      'audio/wav',       // WAV
      'audio/ogg',       // OGG
      'audio/flac',      // FLAC
      'audio/aac',       // AAC
      'audio/webm',      // WebM
      'audio/x-wav',     // WAV (alternatif)
      'audio/x-mpeg',    // MPEG (alternatif)
      'audio/x-m4a',     // M4A (alternatif)
    ]
    
    const audioExtensions = ['mp3', 'wav', 'ogg', 'flac', 'aac', 'webm', 'mpeg', 'm4a']
    const fileName = file.name.toLowerCase()
    const fileExtension = fileName.split('.').pop() || ''
    const isAllowedMimeType = allowedAudioTypes.includes(file.type)
    const isAllowedExtension = audioExtensions.includes(fileExtension)
    const isGenericAudio = file.type.includes('audio/')
    
    console.log('File validation on API:', {
      fileName,
      fileType: file.type,
      fileExtension,
      isAllowedMimeType,
      isAllowedExtension,
      isGenericAudio,
    })
    
    if (!isAllowedMimeType && !isAllowedExtension && !isGenericAudio) {
      console.log('Validation failed - rejecting file')
      return NextResponse.json(
        { error: 'Ses dosyası yükleyiniz (MP3, MPEG, WAV, OGG, FLAC, AAC, WebM, vb.)' },
        { status: 400 }
      )
    }
    
    console.log('File validation passed')

    // Maksimum 50MB
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 50MB' },
        { status: 400 }
      )
    }

    const buffer = await file.arrayBuffer()
    const uploadFileName = `work_${workId}_${Date.now()}.mp3`
    const filePath = `audio/${uploadFileName}`
    
    console.log('Uploading to Supabase:', {
      uploadFileName,
      filePath,
      size: buffer.byteLength,
      contentType: 'audio/mpeg',
    })

    // Dosyayı Supabase Storage'a yükle
    const { data, error: uploadError } = await supabase.storage
      .from('literary-works-audio')
      .upload(filePath, buffer, {
        contentType: 'audio/mpeg',
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        { error: `Failed to upload audio file: ${uploadError.message}` },
        { status: 500 }
      )
    }
    
    console.log('Supabase upload success:', data)

    // Public URL'i al
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('literary-works-audio')
      .getPublicUrl(filePath)

    // Database'e audio_url'i kaydet
    const { error: updateError } = await supabase
      .from('literary_works')
      .update({ audio_url: publicUrl })
      .eq('id', workId)

    if (updateError) {
      console.error('Update error:', updateError)
      // Storage'dan dosyayı sil
      await supabase.storage
        .from('literary-works-audio')
        .remove([filePath])
      return NextResponse.json(
        { error: 'Failed to save audio URL to database' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        audioUrl: publicUrl,
        message: 'Audio file uploaded successfully',
      },
      { status: 201 }
    )
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to upload audio' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const workId = searchParams.get('workId')
    const audioUrl = searchParams.get('audioUrl')

    if (!workId || !audioUrl) {
      return NextResponse.json(
        { error: 'workId and audioUrl are required' },
        { status: 400 }
      )
    }

    // Storage'dan dosya yolunu çıkar
    const filePath = audioUrl.split('/').slice(-2).join('/')

    // Storage'dan sil
    const { error: deleteError } = await supabase.storage
      .from('literary-works-audio')
      .remove([filePath])

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json(
        { error: 'Failed to delete audio file' },
        { status: 500 }
      )
    }

    // Database'den URL'i sil
    const { error: updateError } = await supabase
      .from('literary_works')
      .update({ audio_url: null })
      .eq('id', workId)

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update database' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Audio file deleted successfully',
    })
  } catch (err) {
    console.error('Error:', err)
    return NextResponse.json(
      { error: 'Failed to delete audio' },
      { status: 500 }
    )
  }
}
