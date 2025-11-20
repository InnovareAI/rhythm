import * as fal from '@fal-ai/serverless-client'

// Lazy initialization
let _initialized = false

function initializeFal() {
  if (!_initialized) {
    if (!process.env.FAL_KEY) {
      throw new Error('FAL_KEY environment variable is required')
    }
    fal.config({
      credentials: process.env.FAL_KEY
    })
    _initialized = true
  }
}

export async function generateImage(prompt: string, aspectRatio: 'square' | 'portrait' = 'portrait'): Promise<string> {
  initializeFal()

  try {
    // Use Flux Dev (schnell) for faster generation (2-4 seconds vs 10-15 seconds for Pro)
    console.log('[FAL IMAGE] Generating image with Flux Schnell (fast mode)')
    console.log('[FAL IMAGE] Aspect ratio:', aspectRatio)
    console.log('[FAL IMAGE] Prompt:', prompt.substring(0, 150) + '...')

    const result = await fal.subscribe('fal-ai/flux/schnell', {
      input: {
        prompt,
        image_size: aspectRatio === 'portrait' ? 'portrait_4_3' : 'square',
        num_inference_steps: 4, // Schnell only needs 1-4 steps
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg'
      },
      logs: true,
      timeout: 30000, // 30 second timeout
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('[FAL IMAGE] Image generation in progress...')
        }
      },
    })

    console.log('[FAL IMAGE] Result received:', JSON.stringify(result).substring(0, 200))

    // @ts-ignore - fal.ai types are not perfect
    const imageUrl = result.data?.images?.[0]?.url

    if (!imageUrl) {
      console.error('[FAL IMAGE] No image URL in result:', JSON.stringify(result))
      throw new Error('No image URL returned from fal.ai')
    }

    console.log('[FAL IMAGE] Image generated successfully:', imageUrl)
    return imageUrl
  } catch (error) {
    console.error('[FAL IMAGE] Error generating image with fal.ai:', error)
    throw error
  }
}

export async function generateVideo(imageUrl: string, prompt: string): Promise<string> {
  initializeFal()

  try {
    console.log('[FAL VIDEO] Starting video generation with Minimax Video-01')
    console.log('[FAL VIDEO] Image URL:', imageUrl)
    console.log('[FAL VIDEO] Prompt:', prompt)

    const result = await fal.subscribe('fal-ai/minimax/video-01', {
      input: {
        image_url: imageUrl,
        prompt,
      },
      logs: true, // Enable logs to see what's happening
      onQueueUpdate: (update) => {
        console.log('[FAL VIDEO] Queue update:', JSON.stringify(update))
        if (update.status === 'IN_PROGRESS') {
          console.log('[FAL VIDEO] Video generation in progress...')
        }
      },
    })

    console.log('[FAL VIDEO] Raw result:', JSON.stringify(result, null, 2))

    // @ts-ignore - fal.ai types are not perfect
    const videoUrl = result.video?.url || result.data?.video?.url

    if (!videoUrl) {
      console.error('[FAL VIDEO] No video URL in result. Full result:', JSON.stringify(result))
      throw new Error('No video URL returned from fal.ai')
    }

    console.log('[FAL VIDEO] Video generated successfully:', videoUrl)
    return videoUrl
  } catch (error: any) {
    console.error('[FAL VIDEO] Error generating video:', error)
    console.error('[FAL VIDEO] Error details:', {
      message: error.message,
      status: error.status,
      body: error.body,
      stack: error.stack
    })
    throw error
  }
}
