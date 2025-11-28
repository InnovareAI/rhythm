import { NextRequest, NextResponse } from 'next/server'
import { generateImage } from '@/lib/fal'

export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    console.log('[API] Generate image endpoint called')
    console.log('[API] FAL_KEY exists:', !!process.env.FAL_KEY)

    const body = await request.json()
    const { prompt, productName } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    console.log('[API] Generating image for:', productName)
    console.log('[API] Prompt:', prompt)

    // Generate professional pharmaceutical image
    const enhancedPrompt = `Professional pharmaceutical marketing photograph: ${prompt}. High quality, clean, professional lighting, 4:3 portrait orientation, pharmaceutical advertising style.`

    const imageUrl = await generateImage(enhancedPrompt, 'portrait')

    console.log('[API] Image generated successfully:', imageUrl)

    return NextResponse.json({ imageUrl })
  } catch (error: any) {
    console.error('[API] Error generating image:', error)
    console.error('[API] Error stack:', error.stack)
    console.error('[API] Error details:', JSON.stringify({
      message: error.message,
      status: error.status,
      body: error.body,
      response: error.response
    }, null, 2))
    return NextResponse.json(
      { error: `Image generation failed: ${error.message || 'Unknown error'}` },
      { status: 500 }
    )
  }
}
