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

export async function generateImage(prompt: string): Promise<string> {
  initializeFal()

  try {
    const result = await fal.subscribe('fal-ai/flux-pro', {
      input: {
        prompt,
        image_size: 'square',
        num_inference_steps: 28,
        guidance_scale: 3.5,
        num_images: 1,
        enable_safety_checker: true,
        output_format: 'jpeg',
        safety_tolerance: '2'
      },
      logs: false,
      onQueueUpdate: (update) => {
        if (update.status === 'IN_PROGRESS') {
          console.log('Image generation in progress...')
        }
      },
    })

    // @ts-ignore - fal.ai types are not perfect
    const imageUrl = result.data?.images?.[0]?.url

    if (!imageUrl) {
      throw new Error('No image URL returned from fal.ai')
    }

    return imageUrl
  } catch (error) {
    console.error('Error generating image with fal.ai:', error)
    throw error
  }
}
