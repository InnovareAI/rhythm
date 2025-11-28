import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const maxDuration = 10

export async function POST(request: NextRequest) {
  try {
    console.log('[UPLOAD] Received upload request')

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      console.error('[UPLOAD] No file in request')
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    console.log('[UPLOAD] File details:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      console.error('[UPLOAD] Invalid file type:', file.type)
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a JPEG, PNG, or WebP image.' },
        { status: 400 }
      )
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.error('[UPLOAD] File too large:', file.size)
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    const supabase = getSupabase()
    console.log('[UPLOAD] Supabase client initialized')

    // Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    if (bucketsError) {
      console.error('[UPLOAD] Error listing buckets:', bucketsError)
    } else {
      console.log('[UPLOAD] Available buckets:', buckets?.map(b => b.name))
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const extension = file.name.split('.').pop()
    const filename = `video-source-${timestamp}-${randomString}.${extension}`

    console.log('[UPLOAD] Uploading file:', filename)
    console.log('[UPLOAD] Buffer size:', buffer.length)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('video-images')
      .upload(filename, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('[UPLOAD] Error uploading to Supabase:', error)
      console.error('[UPLOAD] Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: `Upload failed: ${error.message || 'Unknown error'}` },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('video-images')
      .getPublicUrl(filename)

    console.log('[UPLOAD] Upload successful. Public URL:', publicUrl)

    return NextResponse.json({
      imageUrl: publicUrl,
      filename: data.path
    })
  } catch (error: any) {
    console.error('[UPLOAD] Error processing upload:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    )
  }
}
