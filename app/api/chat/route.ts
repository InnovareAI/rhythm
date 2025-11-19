import { NextRequest, NextResponse } from 'next/server'
import { getOpenRouter, defaultModel } from '@/lib/openrouter'
import { getHCPEmailPrompt } from '@/lib/prompts/hcp-email'
import { getSocialMediaPrompt } from '@/lib/prompts/social-media'
import { getVideoPrompt } from '@/lib/prompts/video'

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
    } else if (step === 2) {
      // Store target audience
      data.targetAudience = lastUserMessage
      return {
        message: `Perfect! Targeting ${lastUserMessage}.\n\nWhat segment are they in?\n• Loyalists (already prescribe IMCIVREE)\n• Champions (advocates for the product)\n• Open to learning\n• Skeptics/Need convincing`,
        shouldGenerate: false
      }
    } else if (step === 3) {
      // Store segment
      data.segment = lastUserMessage
      return {
        message: `Got it. What's the key message you want to convey?\n\nFor example:\n• How IMCIVREE works through the MC4R pathway\n• Clinical efficacy in BBS patients\n• Dosing and administration guidance`,
        shouldGenerate: false
      }
    } else if (step === 4) {
      // Store key message
      data.keyMessage = lastUserMessage
      return {
        message: `Excellent! Do you want to emphasize any specific areas?\n\nType one or more:\n• Mechanism of action\n• Clinical efficacy\n• Safety profile\n• Dosing\n\nOr just say "generate" to create the email now.`,
        shouldGenerate: false
      }
    } else if (step >= 5) {
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
          message: `${platform.charAt(0).toUpperCase() + platform.slice(1)} it is!\n\nWho is the target audience?\n• Patients with BBS\n• Caregivers/Family members\n• Healthcare professionals\n• General awareness`,
          shouldGenerate: false
        }
      } else {
        return {
          message: 'Please select 1, 2, or 3, or type the platform name.',
          shouldGenerate: false
        }
      }
    } else if (step === 2) {
      // Store target
      data.target = message.includes('patient') ? 'patient' :
                    message.includes('caregiver') || message.includes('family') ? 'caregiver' :
                    message.includes('hcp') || message.includes('professional') ? 'hcp' : 'patient'
      return {
        message: `Great! What's the key message?\n\nFor example:\n• Understanding BBS and genetic obesity\n• IMCIVREE as a treatment option\n• Patient support and resources\n• Living with BBS`,
        shouldGenerate: false
      }
    } else if (step >= 3) {
      // Generate content
      data.message = lastUserMessage
      return {
        message: 'Generating your social media post now...',
        shouldGenerate: true
      }
    }
  } else if (contentType === 'video') {
    if (step === 1) {
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
          message: `Great! ${videoType.replace('-', ' ')} video it is.\n\nWhat duration would you like?\n• 15-30 seconds (Social media reel)\n• 60 seconds (Short explainer)\n• 90 seconds (Full story)\n\nOr specify your preferred length.`,
          shouldGenerate: false
        }
      } else {
        return {
          message: 'Please select 1, 2, 3, or 4, or type the video type.',
          shouldGenerate: false
        }
      }
    } else if (step === 2) {
      // Store duration
      data.duration = lastUserMessage
      return {
        message: `Perfect! Who is the target audience?\n• Patients\n• Caregivers/Family\n• Healthcare Professionals\n• General Awareness`,
        shouldGenerate: false
      }
    } else if (step === 3) {
      // Store target
      data.targetAudience = lastUserMessage
      return {
        message: `Great! What's the key message or story you want to tell?\n\nFor example:\n• Understanding the genetic condition\n• Living with the condition\n• How the treatment works\n• Patient support resources`,
        shouldGenerate: false
      }
    } else if (step >= 4) {
      // Generate content
      data.keyMessage = lastUserMessage
      return {
        message: 'Generating your video script and concept now...',
        shouldGenerate: true
      }
    }
  }

  return {
    message: 'I need more information. Could you please clarify?',
    shouldGenerate: false
  }
}

async function generateContent(contentType: string, data: Record<string, any>): Promise<string> {
  try {
    let systemPrompt = ''

    if (contentType === 'hcp-email') {
      systemPrompt = getHCPEmailPrompt({
        emailType: data.emailType || 'moa',
        targetAudience: data.targetAudience || 'endocrinologists',
        segment: data.segment,
        keyMessage: data.keyMessage || 'IMCIVREE mechanism of action',
        emphasis: data.emphasis || []
      })
    } else if (contentType === 'social-media') {
      systemPrompt = getSocialMediaPrompt({
        platform: data.platform || 'instagram',
        target: data.target || 'patient',
        message: data.message || 'Understanding BBS',
        emphasis: data.emphasis || []
      })
    } else if (contentType === 'video') {
      systemPrompt = getVideoPrompt({
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

    return completion.choices[0]?.message?.content || 'Failed to generate content'
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

    if (shouldGenerate) {
      generatedContent = await generateContent(contentType, state.data)
    }

    return NextResponse.json({
      message,
      generatedContent,
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
