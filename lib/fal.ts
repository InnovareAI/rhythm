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
    // Use Flux Dev (active model - flux-pro is deprecated)
    console.log('[FAL IMAGE] Generating image with Flux Dev')
    console.log('[FAL IMAGE] Aspect ratio:', aspectRatio)
    console.log('[FAL IMAGE] Prompt:', prompt.substring(0, 150) + '...')

    const result: any = await fal.subscribe('fal-ai/flux/dev', {
      input: {
        prompt,
        image_size: aspectRatio === 'portrait' ? 'portrait_4_3' : 'square_hd',
        num_inference_steps: 20, // Reduced from 28 for faster generation (still good quality)
        guidance_scale: 3.5, // Default CFG scale
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg' // jpeg is faster than png
      },
      logs: true,
      onQueueUpdate: (update: any) => {
        console.log('[FAL IMAGE] Queue status:', update.status)
        if (update.status === 'IN_PROGRESS') {
          console.log('[FAL IMAGE] Image generation in progress...')
        }
      },
    })

    console.log('[FAL IMAGE] Full result:', JSON.stringify(result, null, 2))

    // @ts-ignore - fal.ai types are not perfect
    // Try multiple possible response structures
    const imageUrl = result.images?.[0]?.url ||
                     result.data?.images?.[0]?.url ||
                     result.image?.url ||
                     result.data?.image?.url

    if (!imageUrl) {
      console.error('[FAL IMAGE] No image URL found. Full result:', JSON.stringify(result, null, 2))
      throw new Error('No image URL returned from fal.ai')
    }

    console.log('[FAL IMAGE] Image generated successfully:', imageUrl)
    return imageUrl
  } catch (error: any) {
    console.error('[FAL IMAGE] Error generating image with fal.ai:', error)
    console.error('[FAL IMAGE] Error details:', {
      message: error.message,
      status: error.status,
      body: error.body,
      response: error.response
    })
    throw new Error(`Image generation failed: ${error.message || 'Unknown error'}`)
  }
}

export async function generateVideo(imageUrl: string, prompt: string): Promise<string> {
  initializeFal()

  try {
    console.log('[FAL VIDEO] Starting video generation with Kling 2.5 Turbo Pro')
    console.log('[FAL VIDEO] Image URL:', imageUrl)
    console.log('[FAL VIDEO] Prompt:', prompt)

    // Use queue instead of subscribe for better timeout handling
    const result = await fal.queue.submit('fal-ai/kling-video/v2.5-turbo/pro/image-to-video', {
      input: {
        image_url: imageUrl,
        prompt,
        duration: '5', // 5 seconds
        aspect_ratio: '16:9',
        cfg_scale: 0.5,
        negative_prompt: 'blur, distortion, low quality, artifacts, watermark, text'
      }
    })

    console.log('[FAL VIDEO] Queued video generation. Request ID:', result.request_id)

    // Poll for result with timeout
    const maxAttempts = 90 // 90 attempts * 2 seconds = 3 minutes max
    let attempts = 0

    while (attempts < maxAttempts) {
      const status: any = await fal.queue.status('fal-ai/kling-video/v2.5-turbo/pro/image-to-video', {
        requestId: result.request_id,
        logs: true
      })

      console.log(`[FAL VIDEO] Status check ${attempts + 1}:`, status.status)

      if (status.status === 'COMPLETED') {
        const finalResult = await fal.queue.result('fal-ai/kling-video/v2.5-turbo/pro/image-to-video', {
          requestId: result.request_id
        })

        console.log('[FAL VIDEO] Raw result:', JSON.stringify(finalResult, null, 2))

        // @ts-ignore
        const videoUrl = finalResult.data?.video?.url || finalResult.video?.url

        if (!videoUrl) {
          console.error('[FAL VIDEO] No video URL in result:', JSON.stringify(finalResult))
          throw new Error('No video URL returned from Kling')
        }

        console.log('[FAL VIDEO] Video generated successfully:', videoUrl)
        return videoUrl
      }

      if (status.status === 'FAILED') {
        console.error('[FAL VIDEO] Video generation failed:', status)
        throw new Error('Video generation failed')
      }

      // Wait 2 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 2000))
      attempts++
    }

    throw new Error('Video generation timed out after 3 minutes')
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
