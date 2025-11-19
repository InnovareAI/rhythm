import { NextRequest, NextResponse } from 'next/server'
import { getOpenRouter, defaultModel } from '@/lib/openrouter'
import { getHCPEmailPrompt } from '@/lib/prompts/hcp-email'
import { getSocialMediaPrompt } from '@/lib/prompts/social-media'
import { getVideoPrompt } from '@/lib/prompts/video'
import { generateImage, generateVideo } from '@/lib/fal'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatRequest = {
  messages: Message[]
  contentType: 'hcp-email' | 'social-media' | 'patient-email' | 'video'
}

// Simple state management for conversation context
type ConversationState = {
  step: number
  data: Record<string, any>
}

function getConversationState(messages: Message[]): ConversationState {
  // Parse conversation to extract collected information
  const state: ConversationState = {
    step: messages.filter(m => m.role === 'user').length,
    data: {}
  }

  return state
}

function getNextQuestion(contentType: string, state: ConversationState, lastUserMessage: string): { message: string; shouldGenerate: boolean } {
  const { step, data } = state
  const message = lastUserMessage.toLowerCase()

  if (contentType === 'hcp-email') {
    if (step === 1) {
      // Store product name
      data.productName = lastUserMessage
      return {
        message: `Great! Creating content for ${lastUserMessage}.\n\nWhat type of HCP email would you like to create?\n1. Mechanism of Action (MOA)\n2. Clinical Summary\n3. Dosing Information\n\nJust tell me the type or number.`,
        shouldGenerate: false
      }
    } else if (step === 2) {
      // Determine email type
      let emailType = ''
      if (message.includes('moa') || message.includes('mechanism') || message === '1') {
        emailType = 'moa'
        data.emailType = 'moa'
      } else if (message.includes('summary') || message === '2') {
        emailType = 'summary'
        data.emailType = 'summary'
      } else if (message.includes('dosing') || message === '3') {
        emailType = 'dosing'
        data.emailType = 'dosing'
      }

      if (emailType) {
        return {
          message: `Great! ${emailType.toUpperCase()} email it is.\n\nWho is your target audience?\n• Endocrinologists\n• Pediatricians\n• General Practitioners\n• Other (please specify)`,
          shouldGenerate: false
        }
      } else {
        return {
          message: 'Please select 1, 2, or 3, or type "MOA", "Summary", or "Dosing".',
          shouldGenerate: false
        }
      }
    } else if (step === 3) {
      // Store target audience
      data.targetAudience = lastUserMessage
      return {
        message: `Perfect! Targeting ${lastUserMessage}.\n\nWhat segment are they in?\n• Loyalists (already prescribe the product)\n• Champions (advocates for the product)\n• Open to learning\n• Skeptics/Need convincing`,
        shouldGenerate: false
      }
    } else if (step === 4) {
      // Store segment
      data.segment = lastUserMessage
      return {
        message: `Got it. What's the key message you want to convey?\n\nFor example:\n• How the product works (mechanism of action)\n• Clinical efficacy data\n• Dosing and administration guidance`,
        shouldGenerate: false
      }
    } else if (step === 5) {
      // Store key message
      data.keyMessage = lastUserMessage
      return {
        message: `Excellent! Do you want to emphasize any specific areas?\n\nType one or more:\n• Mechanism of action\n• Clinical efficacy\n• Safety profile\n• Dosing\n\nOr just say "generate" to create the email now.`,
        shouldGenerate: false
      }
    } else if (step >= 6) {
      // Generate content
      if (message.includes('generate') || message.includes('create') || message.includes('yes')) {
        data.emphasis = lastUserMessage.includes('generate') ? [] : [lastUserMessage]
        return {
          message: 'Generating your HCP email now...',
          shouldGenerate: true
        }
      } else {
        data.emphasis = [lastUserMessage]
        return {
          message: `Perfect! I'll emphasize ${lastUserMessage}.\n\nReady to generate? Type "generate" or provide more details.`,
          shouldGenerate: false
        }
      }
    }
  } else if (contentType === 'social-media') {
    if (step === 1) {
      // Store product name
      data.productName = lastUserMessage
      return {
        message: `Great! Creating content for ${lastUserMessage}.\n\nWhich platform are you creating content for?\n1. Facebook\n2. Instagram\n3. X (Twitter)\n\nJust tell me the platform or number.`,
        shouldGenerate: false
      }
    } else if (step === 2) {
      // Determine platform
      let platform = ''
      if (message.includes('facebook') || message === '1') {
        platform = 'facebook'
        data.platform = 'facebook'
      } else if (message.includes('instagram') || message === '2') {
        platform = 'instagram'
        data.platform = 'instagram'
      } else if (message.includes('twitter') || message.includes('x') || message === '3') {
        platform = 'twitter'
        data.platform = 'twitter'
      }

      if (platform) {
        return {
          message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} it is!\n\nWho is the target audience?\n• Patients\n• Caregivers/Family members\n• Healthcare professionals\n• General awareness`,
          shouldGenerate: false
        }
      } else {
        return {
          message: 'Please select 1, 2, or 3, or type the platform name.',
          shouldGenerate: false
        }
      }
    } else if (step === 3) {
      // Store target
      data.target = message.includes('patient') ? 'patient' :
                    message.includes('caregiver') || message.includes('family') ? 'caregiver' :
                    message.includes('hcp') || message.includes('professional') ? 'hcp' : 'patient'
      return {
        message: `Great! What's the key message?\n\nFor example:\n• Understanding the condition\n• Product as a treatment option\n• Patient support and resources\n• Living with the condition`,
        shouldGenerate: false
      }
    } else if (step >= 4) {
      // Generate content
      data.message = lastUserMessage
      return {
        message: 'Generating your social media post now...',
        shouldGenerate: true
      }
    }
  } else if (contentType === 'video') {
    if (step === 1) {
      // Store product name
      data.productName = lastUserMessage
      return {
        message: `Great! Creating content for ${lastUserMessage}.\n\nDo you have an image to use, or should we generate one?\n1. I'll provide an image URL\n2. Generate an image from a prompt\n\nJust tell me 1 or 2.`,
        shouldGenerate: false
      }
    } else if (step === 2) {
      // Store image source choice
      if (message.includes('provide') || message.includes('url') || message === '1') {
        data.imageSource = 'upload'
        return {
          message: `Perfect! Please provide the image URL.`,
          shouldGenerate: false
        }
      } else if (message.includes('generate') || message.includes('prompt') || message === '2') {
        data.imageSource = 'generate'
        return {
          message: `Great! Describe the image you want to generate.\n\nFor example:\n• Professional medical setting with diverse patients\n• Product packaging in a pharmacy\n• Healthcare professional consulting with patient`,
          shouldGenerate: false
        }
      } else {
        return {
          message: 'Please select 1 or 2.',
          shouldGenerate: false
        }
      }
    } else if (step === 3) {
      // Store image URL or prompt
      if (data.imageSource === 'upload') {
        data.imageUrl = lastUserMessage
      } else {
        data.imagePrompt = lastUserMessage
      }
      return {
        message: `Got it! What type of video animation would you like?\n1. Patient Story/Testimonial\n2. Disease Education\n3. Product Mechanism Animation\n4. Social Media Reel (15-30 sec)\n\nJust tell me the type or number.`,
        shouldGenerate: false
      }
    } else if (step === 4) {
      // Determine video type
      let videoType = ''
      if (message.includes('patient') || message.includes('story') || message.includes('testimonial') || message === '1') {
        videoType = 'patient-story'
        data.videoType = 'patient-story'
      } else if (message.includes('education') || message.includes('bbs') || message.includes('disease') || message === '2') {
        videoType = 'education'
        data.videoType = 'education'
      } else if (message.includes('mechanism') || message.includes('animation') || message === '3') {
        videoType = 'mechanism'
        data.videoType = 'mechanism'
      } else if (message.includes('reel') || message.includes('social') || message === '4') {
        videoType = 'reel'
        data.videoType = 'reel'
      }

      if (videoType) {
        return {
          message: `Great! ${videoType.replace('-', ' ')} video it is.\n\nWho is the target audience?\n• Patients\n• Caregivers/Family\n• Healthcare Professionals\n• General Awareness`,
          shouldGenerate: false
        }
      } else {
        return {
          message: 'Please select 1, 2, 3, or 4, or type the video type.',
          shouldGenerate: false
        }
      }
    } else if (step === 5) {
      // Store target
      data.targetAudience = lastUserMessage
      return {
        message: `Great! Describe how you want the video to animate.\n\nFor example:\n• Slow zoom in on product\n• Gentle pan across the scene\n• Subtle movement showing interaction\n• Camera slowly moving forward`,
        shouldGenerate: false
      }
    } else if (step >= 6) {
      // Store animation description as key message
      data.keyMessage = lastUserMessage
      return {
        message: 'Generating your video now (this may take 2-3 minutes)...',
        shouldGenerate: true
      }
    }
  }

  return {
    message: 'I need more information. Could you please clarify?',
    shouldGenerate: false
  }
}

async function generateContent(contentType: string, data: Record<string, any>): Promise<{ content: string; imageUrl?: string; videoUrl?: string }> {
  try {
    let systemPrompt = ''

    if (contentType === 'hcp-email') {
      systemPrompt = getHCPEmailPrompt({
        productName: data.productName || 'Product Name',
        emailType: data.emailType || 'moa',
        targetAudience: data.targetAudience || 'endocrinologists',
        segment: data.segment,
        keyMessage: data.keyMessage || 'Product mechanism of action',
        emphasis: data.emphasis || []
      })
    } else if (contentType === 'social-media') {
      systemPrompt = getSocialMediaPrompt({
        productName: data.productName || 'Product Name',
        platform: data.platform || 'instagram',
        target: data.target || 'patient',
        message: data.message || 'Understanding the condition',
        emphasis: data.emphasis || []
      })
    } else if (contentType === 'video') {
      systemPrompt = getVideoPrompt({
        productName: data.productName || 'Product Name',
        videoType: data.videoType || 'education',
        targetAudience: data.targetAudience || 'patients',
        duration: data.duration,
        keyMessage: data.keyMessage || 'Understanding the condition',
        emphasis: data.emphasis || []
      })
    }

    const openrouter = getOpenRouter()
    const completion = await openrouter.chat.completions.create({
      model: defaultModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: 'Please generate the content now following all compliance rules.' }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const content = completion.choices[0]?.message?.content || 'Failed to generate content'

    // For social media, generate an image
    let imageUrl: string | undefined
    let videoUrl: string | undefined

    if (contentType === 'social-media') {
      try {
        // Extract image prompt from the generated content
        const imagePromptMatch = content.match(/## 3\. CREATIVE IMAGE PROMPT[\s\S]*?(?=\n##|\n\*\*|$)/i)
        let imagePrompt = ''

        if (imagePromptMatch) {
          // Clean up the extracted section
          imagePrompt = imagePromptMatch[0]
            .replace(/## 3\. CREATIVE IMAGE PROMPT/i, '')
            .replace(/\*\*/g, '')
            .trim()
        }

        // Fallback to a generic prompt if extraction fails
        if (!imagePrompt) {
          imagePrompt = `Professional pharmaceutical social media image for ${data.productName || 'healthcare product'}, ${data.message || 'healthcare content'}, photorealistic, clean background, medical setting, diverse patient representation, calm and supportive atmosphere, teal color palette`
        }

        console.log('Generating image with prompt:', imagePrompt.substring(0, 200) + '...')
        imageUrl = await generateImage(imagePrompt)
        console.log('Image generated:', imageUrl)
      } catch (error) {
        console.error('Error generating image:', error)
        // Continue without image if generation fails
      }
    }

    // For video, use provided image or generate one, then animate it with Sora 2
    if (contentType === 'video') {
      try {
        // Check if user provided an image URL or we need to generate one
        if (data.imageSource === 'upload' && data.imageUrl) {
          // User provided an image URL
          imageUrl = data.imageUrl
          console.log('Using provided image URL:', imageUrl)
        } else if (data.imageSource === 'generate' && data.imagePrompt) {
          // Generate image from user's prompt
          console.log('Generating image for video with prompt:', data.imagePrompt)
          imageUrl = await generateImage(data.imagePrompt)
          console.log('Image generated for video:', imageUrl)
        }

        // Now generate video from the image
        if (imageUrl) {
          const videoPrompt = `${data.keyMessage || 'smooth camera movement'}, professional pharmaceutical content for ${data.productName || 'product'}, ${data.targetAudience} audience, calm atmosphere`

          console.log('Generating video with Sora 2...')
          videoUrl = await generateVideo(imageUrl, videoPrompt)
          console.log('Video generated:', videoUrl)
        }
      } catch (error) {
        console.error('Error generating video:', error)
        // Continue without video if generation fails
      }
    }

    return { content, imageUrl, videoUrl }
  } catch (error) {
    console.error('Error generating content:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { messages, contentType } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    const lastUserMessage = messages[messages.length - 1].content
    const state = getConversationState(messages)

    // Get next question or generate content
    const { message, shouldGenerate } = getNextQuestion(contentType, state, lastUserMessage)

    let generatedContent = null
    let imageUrl = null
    let videoUrl = null

    if (shouldGenerate) {
      const result = await generateContent(contentType, state.data)
      generatedContent = result.content
      imageUrl = result.imageUrl || null
      videoUrl = result.videoUrl || null
    }

    return NextResponse.json({
      message,
      generatedContent,
      imageUrl,
      videoUrl,
      state: state.data
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
