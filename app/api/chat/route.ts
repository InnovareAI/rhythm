import { NextRequest, NextResponse } from 'next/server'
import { getOpenRouter, defaultModel } from '@/lib/openrouter'
import { getHCPEmailPrompt } from '@/lib/prompts/hcp-email'
import { getSocialMediaPrompt } from '@/lib/prompts/social-media'
import { getVideoPrompt } from '@/lib/prompts/video'
import { generateImage, generateVideo } from '@/lib/fal'
import { searchBrandInfo } from '@/lib/brand-search'
import { createConversation, updateConversation, saveMessage, saveGeneratedContent } from '@/lib/conversation-storage'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ChatRequest = {
  messages: Message[]
  contentType: 'hcp-email' | 'social-media' | 'patient-email' | 'video'
  conversationId?: string
}

// Simple state management for conversation context
type ConversationState = {
  step: number
  data: Record<string, any>
}

function getConversationState(messages: Message[], contentType: string): ConversationState {
  // Parse conversation to extract collected information
  const userMessages = messages.filter(m => m.role === 'user')
  const step = userMessages.length
  const data: Record<string, any> = {}

  // Reconstruct state from message history based on content type
  if (contentType === 'video' && userMessages.length > 0) {
    // Step 1: Product name
    if (userMessages.length >= 1) {
      data.productName = userMessages[0].content
    }

    // Step 2: Image source (upload or generate)
    if (userMessages.length >= 2) {
      const msg = userMessages[1].content.toLowerCase()
      if (msg.includes('provide') || msg.includes('url') || msg === '1') {
        data.imageSource = 'upload'
      } else if (msg.includes('generate') || msg.includes('prompt') || msg === '2') {
        data.imageSource = 'generate'
      }
    }

    // Step 3: Image URL or prompt
    if (userMessages.length >= 3) {
      if (data.imageSource === 'upload') {
        data.imageUrl = userMessages[2].content
      } else {
        data.imagePrompt = userMessages[2].content
      }
    }

    // Step 4: Video type
    if (userMessages.length >= 4) {
      const msg = userMessages[3].content.toLowerCase()
      if (msg.includes('patient') || msg.includes('story') || msg.includes('testimonial') || msg === '1') {
        data.videoType = 'patient-story'
      } else if (msg.includes('education') || msg.includes('disease') || msg === '2') {
        data.videoType = 'education'
      } else if (msg.includes('mechanism') || msg.includes('animation') || msg === '3') {
        data.videoType = 'mechanism'
      } else if (msg.includes('reel') || msg.includes('social') || msg === '4') {
        data.videoType = 'reel'
      }
    }

    // Step 5: Target audience
    if (userMessages.length >= 5) {
      data.targetAudience = userMessages[4].content
    }

    // Step 6: Animation description (key message)
    if (userMessages.length >= 6) {
      data.keyMessage = userMessages[5].content
    }
  } else if (contentType === 'hcp-email' && userMessages.length > 0) {
    // Step 1: Product name
    if (userMessages.length >= 1) {
      data.productName = userMessages[0].content
    }

    // Step 2: Email type
    if (userMessages.length >= 2) {
      const msg = userMessages[1].content.toLowerCase()
      if (msg.includes('moa') || msg.includes('mechanism') || msg === '1') {
        data.emailType = 'moa'
      } else if (msg.includes('summary') || msg === '2') {
        data.emailType = 'summary'
      } else if (msg.includes('dosing') || msg === '3') {
        data.emailType = 'dosing'
      }
    }

    // Step 3: Target audience
    if (userMessages.length >= 3) {
      data.targetAudience = userMessages[2].content
    }

    // Step 4: Segment
    if (userMessages.length >= 4) {
      data.segment = userMessages[3].content
    }

    // Step 5: Key message
    if (userMessages.length >= 5) {
      data.keyMessage = userMessages[4].content
    }

    // Step 6: Emphasis
    if (userMessages.length >= 6) {
      const msg = userMessages[5].content
      if (!msg.toLowerCase().includes('generate')) {
        data.emphasis = [msg]
      }
    }
  } else if (contentType === 'social-media' && userMessages.length > 0) {
    // Step 1: Product name
    if (userMessages.length >= 1) {
      data.productName = userMessages[0].content
    }

    // Step 2: Platform
    if (userMessages.length >= 2) {
      const msg = userMessages[1].content.toLowerCase()
      if (msg.includes('facebook') || msg === '1') {
        data.platform = 'facebook'
      } else if (msg.includes('instagram') || msg === '2') {
        data.platform = 'instagram'
      } else if (msg.includes('twitter') || msg.includes('x') || msg === '3') {
        data.platform = 'twitter'
      }
    }

    // Step 3: Target
    if (userMessages.length >= 3) {
      const msg = userMessages[2].content.toLowerCase()
      data.target = msg.includes('patient') ? 'patient' :
                    msg.includes('caregiver') || msg.includes('family') ? 'caregiver' :
                    msg.includes('hcp') || msg.includes('professional') ? 'hcp' : 'patient'
    }

    // Step 4: Message
    if (userMessages.length >= 4) {
      data.message = userMessages[3].content
    }
  }

  return { step, data }
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
    let content = ''

    // For video, we don't need LLM text content, just the video
    if (contentType !== 'video') {
      if (contentType === 'hcp-email') {
        systemPrompt = getHCPEmailPrompt({
          productName: data.productName || 'Product Name',
          emailType: data.emailType || 'moa',
          targetAudience: data.targetAudience || 'endocrinologists',
          segment: data.segment,
          keyMessage: data.keyMessage || 'Product mechanism of action',
          emphasis: data.emphasis || [],
          brandInfo: data.brandInfo
        })
      } else if (contentType === 'social-media') {
        systemPrompt = getSocialMediaPrompt({
          productName: data.productName || 'Product Name',
          platform: data.platform || 'instagram',
          target: data.target || 'patient',
          message: data.message || 'Understanding the condition',
          emphasis: data.emphasis || [],
          brandInfo: data.brandInfo
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

      content = completion.choices[0]?.message?.content || 'Failed to generate content'
    } else {
      // For video, just provide basic info
      content = `**Video Generated**\n\nProduct: ${data.productName}\nType: ${data.videoType}\nAudience: ${data.targetAudience}\nAnimation: ${data.keyMessage}`
    }

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
      console.log('[VIDEO] Starting video generation. Data:', JSON.stringify(data))
      try {
        // Check if user provided an image URL or we need to generate one
        if (data.imageSource === 'upload' && data.imageUrl) {
          // User provided an image URL
          imageUrl = data.imageUrl
          console.log('[VIDEO] Using provided image URL:', imageUrl)
        } else if (data.imageSource === 'generate' && data.imagePrompt) {
          // Generate image from user's prompt
          console.log('[VIDEO] Generating image for video with prompt:', data.imagePrompt)
          imageUrl = await generateImage(data.imagePrompt)
          console.log('[VIDEO] Image generated for video:', imageUrl)
        } else {
          console.error('[VIDEO] No valid image source! imageSource:', data.imageSource, 'imageUrl:', data.imageUrl, 'imagePrompt:', data.imagePrompt)
        }

        // Now generate video from the image
        if (imageUrl) {
          const videoPrompt = `${data.keyMessage || 'smooth camera movement'}, professional pharmaceutical content for ${data.productName || 'product'}, ${data.targetAudience} audience, calm atmosphere`

          console.log('[VIDEO] Generating video with Sora 2. Prompt:', videoPrompt)
          videoUrl = await generateVideo(imageUrl, videoPrompt)
          console.log('[VIDEO] Video generated successfully:', videoUrl)
        } else {
          console.error('[VIDEO] No imageUrl available for video generation!')
        }
      } catch (error) {
        console.error('[VIDEO] Error generating video:', error)
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
    const { messages, contentType, conversationId: providedConversationId } = body

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    const lastUserMessage = messages[messages.length - 1].content
    const state = getConversationState(messages, contentType)

    console.log('[STATE] Step:', state.step, 'Data:', JSON.stringify(state.data))

    // Handle conversation ID - create new or use existing
    let conversationId = providedConversationId

    if (!conversationId && state.step === 1) {
      // Create new conversation on first message
      console.log('[API] Creating new conversation...')
      conversationId = await createConversation({
        contentType,
        productName: state.data.productName,
        stateData: state.data
      })
      console.log('[API] Created conversation ID:', conversationId)
    }

    // Save the user message if we have a conversation ID
    if (conversationId) {
      await saveMessage({
        conversationId,
        role: 'user',
        content: lastUserMessage
      })
    }

    // If this is step 1 (product name entry) and we don't have brand info yet, search for it
    if (state.step === 1 && state.data.productName && !state.data.brandInfo) {
      console.log('[API] Step 1: Searching for brand info...')
      try {
        const brandInfo = await searchBrandInfo(state.data.productName)
        state.data.brandInfo = brandInfo
        console.log('[API] Brand info retrieved:', JSON.stringify(brandInfo, null, 2))

        // Update conversation with brand info
        if (conversationId) {
          await updateConversation({
            conversationId,
            productName: state.data.productName,
            brandInfo,
            stateData: state.data
          })
        }
      } catch (error) {
        console.error('[API] Failed to retrieve brand info:', error)
        // Continue without brand info
      }
    }

    // Update conversation state data
    if (conversationId && state.step > 1) {
      await updateConversation({
        conversationId,
        stateData: state.data
      })
    }

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

      // Save generated content to database
      if (conversationId && generatedContent) {
        await saveGeneratedContent({
          conversationId,
          content: generatedContent,
          imageUrl: imageUrl || undefined,
          videoUrl: videoUrl || undefined
        })
      }
    }

    // Save assistant message if we have a conversation ID
    if (conversationId) {
      await saveMessage({
        conversationId,
        role: 'assistant',
        content: message
      })
    }

    return NextResponse.json({
      message,
      generatedContent,
      imageUrl,
      videoUrl,
      state: state.data,
      conversationId
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
