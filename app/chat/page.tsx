'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Audience = 'hcp' | 'patient'

// HCP Segments for personalization (rare disease - no competitors)
const HCP_SEGMENTS = [
  { id: 'champion', name: 'Champion', description: 'Already prescribing and promoting IMCIVREE' },
  { id: 'aware', name: 'Aware', description: 'Knows about IMCIVREE but hasn\'t prescribed' },
  { id: 'unaware', name: 'Unaware', description: 'New to IMCIVREE, needs education' },
]

// Variable fields for personalization
type VariableFields = {
  doctorName: string
  practiceName: string
  specialty: string
  city: string
}

// Email types by audience
const EMAIL_TYPES = {
  hcp: [
    { id: 'moa', name: 'Mechanism of Action', description: 'Explain how IMCIVREE works' },
    { id: 'summary', name: 'Clinical Summary', description: 'Overview of clinical efficacy data' },
    { id: 'dosing', name: 'Dosing Information', description: 'Dosing and administration details' },
    { id: 'efficacy', name: 'Efficacy Data', description: 'Weight and hunger reduction results' },
  ],
  patient: [
    { id: 'getting-started', name: 'Getting Started', description: 'Beginning your IMCIVREE journey' },
    { id: 'what-to-expect', name: 'What to Expect', description: 'Treatment timeline and expectations' },
    { id: 'support', name: 'Support Resources', description: 'Rhythm InTune and caregiver support' },
  ],
}

function ChatContent() {
  const searchParams = useSearchParams()

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [isLoadingReview, setIsLoadingReview] = useState(true) // Prevent flash of empty state
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [contentId, setContentId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // IMCIVREE-specific state
  const [audience, setAudience] = useState<Audience>('hcp')
  const [emailType, setEmailType] = useState<string>('moa')
  const [step, setStep] = useState<'select' | 'chat'>('select')
  const [keyMessage, setKeyMessage] = useState<string>('')

  // HCP Segmentation
  const [hcpSegment, setHcpSegment] = useState<string>('aware')

  // Variable fields for personalization
  const [showPersonalization, setShowPersonalization] = useState(false)
  const [variableFields, setVariableFields] = useState<VariableFields>({
    doctorName: '',
    practiceName: '',
    specialty: '',
    city: ''
  })

  // Ziflow approval state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Ziflow feedback state (when editing content with feedback)
  const [ziflowFeedback, setZiflowFeedback] = useState<any>(null)
  const [editingContentId, setEditingContentId] = useState<string | null>(null)
  const [contentType, setContentType] = useState<'imcivree-email' | 'imcivree-banner'>('imcivree-email')

  // Helper function to build feedback summary message
  const buildFeedbackMessage = (content: any, feedback: any) => {
    if (!feedback?.comments?.length) {
      return `I've loaded your ${content.content_type === 'imcivree-email' ? 'email' : 'banner'} that's currently in MLR review.\n\n**Status:** Waiting for reviewer feedback\n\nYou can make edits now or wait for reviewer comments. Any changes you make can be resubmitted for approval.`
    }

    // Build detailed feedback summary with action items
    const feedbackSummary = feedback.comments
      .map((c: any, i: number) => {
        // Generate a suggested action for each comment
        const commentLower = (c.text || '').toLowerCase()
        let suggestedAction = 'Review and address this feedback'
        if (commentLower.includes('change') || commentLower.includes('update') || commentLower.includes('revise')) {
          suggestedAction = 'Make the requested revision'
        } else if (commentLower.includes('add') || commentLower.includes('include') || commentLower.includes('missing')) {
          suggestedAction = 'Add the requested content'
        } else if (commentLower.includes('remove') || commentLower.includes('delete')) {
          suggestedAction = 'Remove the flagged content'
        } else if (commentLower.includes('clarify') || commentLower.includes('unclear')) {
          suggestedAction = 'Clarify the messaging'
        } else if (commentLower.includes('compliance') || commentLower.includes('claim') || commentLower.includes('reference')) {
          suggestedAction = 'Verify compliance and add reference if needed'
        }
        return `### Comment ${i + 1} from ${c.authorName || 'Reviewer'}:
> "${c.text || 'No comment text'}"

**Suggested Action:** ${suggestedAction}`
      })
      .join('\n\n---\n\n')

    return `# 📋 MLR Review Feedback

Your ${content.content_type === 'imcivree-email' ? 'email' : 'banner'} has **${feedback.comments.length} comment${feedback.comments.length > 1 ? 's' : ''}** from the review team.

---

${feedbackSummary}

---

## 🎯 Next Steps

**Quick Actions:**
- Say **"Address all feedback"** and I'll revise the content to incorporate all comments
- Say **"Address comment 1"** to handle a specific comment
- Ask me **"Explain the feedback"** if you need clarification

**Or give me specific instructions**, for example:
- "Make the headline more clinical"
- "Add a reference for the efficacy claim"
- "Soften the language in paragraph 2"

What would you like me to do?`
  }

  // Load content from sessionStorage if editing existing content or review session
  useEffect(() => {
    // Check for review session first
    const reviewSession = sessionStorage.getItem('reviewSession')
    if (reviewSession) {
      try {
        const data = JSON.parse(reviewSession)
        sessionStorage.removeItem('reviewSession')

        const content = data.content
        let feedback = data.feedback

        // Set the content and state
        setGeneratedContent(content.html_content)
        setAudience(content.audience || 'hcp')
        setEmailType(content.focus || 'moa')
        setKeyMessage(content.key_message || '')
        setEditingContentId(content.id)
        setContentType(content.content_type || 'imcivree-email')
        setStep('chat')

        // If we have feedback with comments, display them
        if (feedback?.comments?.length > 0) {
          setZiflowFeedback(feedback)
          setMessages([{ role: 'assistant', content: buildFeedbackMessage(content, feedback) }])
          setIsLoadingReview(false)
        } else if (content.ziflow_proof_id) {
          // No feedback yet - try to fetch it fresh from Ziflow
          setMessages([{ role: 'assistant', content: 'Loading reviewer feedback from Ziflow...' }])

          fetch(`/api/ziflow-feedback/${content.ziflow_proof_id}`)
            .then(res => res.ok ? res.json() : null)
            .then(freshFeedback => {
              if (freshFeedback?.comments?.length > 0) {
                setZiflowFeedback(freshFeedback)
                setMessages([{ role: 'assistant', content: buildFeedbackMessage(content, freshFeedback) }])
              } else {
                setMessages([{ role: 'assistant', content: buildFeedbackMessage(content, null) }])
              }
              setIsLoadingReview(false)
            })
            .catch(err => {
              console.error('Error fetching Ziflow feedback:', err)
              setMessages([{ role: 'assistant', content: buildFeedbackMessage(content, null) }])
              setIsLoadingReview(false)
            })
          return // Don't set isLoadingReview false yet - wait for fetch
        } else {
          setMessages([{ role: 'assistant', content: buildFeedbackMessage(content, null) }])
          setIsLoadingReview(false)
        }
      } catch (e) {
        console.error('Error parsing reviewSession:', e)
        setIsLoadingReview(false)
      }
      return
    }

    // Check for edit content (from content history)
    const editContent = sessionStorage.getItem('editContent')
    if (editContent) {
      try {
        const data = JSON.parse(editContent)
        sessionStorage.removeItem('editContent')

        setGeneratedContent(data.html_content)
        setAudience(data.audience || 'hcp')
        setEmailType(data.focus || 'moa')
        setKeyMessage(data.key_message || '')
        setEditingContentId(data.id)
        setContentType(data.content_type || 'imcivree-email')
        setStep('chat')

        if (data.ziflow_feedback?.comments?.length > 0) {
          setZiflowFeedback(data.ziflow_feedback)
          setMessages([{
            role: 'assistant',
            content: `I've loaded your content with MLR feedback.\n\n${data.ziflow_feedback.comments.map((c: any) => `**${c.authorName}:** ${c.text}`).join('\n\n')}\n\nHow would you like me to address this feedback?`
          }])
        } else if (data.ziflow_proof_id) {
          setMessages([{
            role: 'assistant',
            content: `I've loaded your content that's in MLR review. No feedback yet.`
          }])
        }
      } catch (e) {
        console.error('Error parsing editContent:', e)
      }
      setIsLoadingReview(false)
      return
    }

    // No session data found - ready for new content
    setIsLoadingReview(false)
  }, [])

  // Save content to Supabase
  const saveContentToDatabase = async (htmlContent: string, parentId?: string) => {
    setIsSaving(true)
    setSaveStatus('saving')
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'imcivree-email',
          audience,
          focus: emailType,
          keyMessage,
          htmlContent,
          parentId
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save content')
      }

      const data = await response.json()
      if (data.content?.id) {
        setContentId(data.content.id)
        setSaveStatus('saved')
        console.log('[EMAIL] Content saved with ID:', data.content.id)
      }
    } catch (error) {
      console.error('[EMAIL] Error saving content:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  // Initialize greeting when entering chat (only for NEW content creation)
  useEffect(() => {
    // Skip if this is a review session (content already loaded)
    if (step === 'chat' && !generatedContent && !editingContentId) {
      const audienceLabel = audience === 'hcp' ? 'HCP' : 'Patient/Caregiver'
      const emailTypeObj = EMAIL_TYPES[audience].find(t => t.id === emailType)
      const segmentObj = audience === 'hcp' ? HCP_SEGMENTS.find(s => s.id === hcpSegment) : null

      const hasVariables = variableFields.doctorName || variableFields.practiceName

      setMessages([
        {
          role: 'assistant',
          content: `Great! I'll create an IMCIVREE ${audienceLabel} email focused on **${emailTypeObj?.name}**.

${audience === 'hcp' && segmentObj ? `**HCP Segment:** ${segmentObj.name} - ${segmentObj.description}` : ''}
${keyMessage ? `**Key Message:** "${keyMessage}"` : ''}
${hasVariables ? `**Personalization:** ${variableFields.doctorName ? `Dr. ${variableFields.doctorName}` : ''}${variableFields.practiceName ? ` at ${variableFields.practiceName}` : ''}` : ''}

I'm generating your compliant HTML email now with:
- Proper brand styling and colors
- Complete ISI (Important Safety Information)
- AMA-formatted references
- Approved messaging from the IMCIVREE message bank
${hasVariables ? '- Personalized variable fields ({{doctor_name}}, {{practice_name}}, etc.)' : ''}

Give me a moment...`
        }
      ])

      // Auto-generate the email
      generateEmail()
    }
  }, [step, generatedContent, editingContentId])

  const [streamingContent, setStreamingContent] = useState('')
  const [processingEmail, setProcessingEmail] = useState(false)
  const streamingRef = useRef<HTMLDivElement>(null)

  // Auto-scroll streaming content
  useEffect(() => {
    if (streamingRef.current) {
      streamingRef.current.scrollTop = streamingRef.current.scrollHeight
    }
  }, [streamingContent])

  const generateEmail = async () => {
    setIsLoading(true)
    setStreamingContent('')

    // Build segment context for HCP
    const segmentContext = audience === 'hcp'
      ? `HCP Segment: ${HCP_SEGMENTS.find(s => s.id === hcpSegment)?.name} (${HCP_SEGMENTS.find(s => s.id === hcpSegment)?.description})`
      : ''

    // Build variable fields instruction
    const variableContext = (variableFields.doctorName || variableFields.practiceName)
      ? `Include these personalization placeholders: ${variableFields.doctorName ? '{{doctor_name}} for "Dr. ' + variableFields.doctorName + '"' : ''} ${variableFields.practiceName ? '{{practice_name}} for "' + variableFields.practiceName + '"' : ''} ${variableFields.specialty ? '{{specialty}} for "' + variableFields.specialty + '"' : ''} ${variableFields.city ? '{{city}} for "' + variableFields.city + '"' : ''}`
      : ''

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Generate an IMCIVREE email for ${audience === 'hcp' ? 'healthcare professionals' : 'patients/caregivers'} about ${emailType}. ${segmentContext} ${keyMessage ? `Focus on: ${keyMessage}` : ''} ${variableContext}`
          }],
          contentType: 'imcivree-email',
          audience,
          emailType,
          keyMessage,
          hcpSegment: audience === 'hcp' ? hcpSegment : undefined,
          variableFields: (variableFields.doctorName || variableFields.practiceName) ? variableFields : undefined,
          conversationId
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.details || 'Failed to get response')
      }

      // Handle SSE streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = decoder.decode(value)
          const lines = text.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6)
                if (!jsonStr.trim()) continue

                const data = JSON.parse(jsonStr)
                console.log('[STREAM] Received:', data.done ? 'DONE' : 'chunk', data.chunk?.length || 0)

                if (data.chunk) {
                  fullContent += data.chunk
                  setStreamingContent(fullContent)
                }

                if (data.done) {
                  console.log('[STREAM] Done! Content length:', data.generatedContent?.length)
                  if (data.conversationId && !conversationId) {
                    setConversationId(data.conversationId)
                  }
                  setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Email generated!' }])
                  if (data.generatedContent) {
                    setGeneratedContent(data.generatedContent)
                    // Save to Supabase
                    saveContentToDatabase(data.generatedContent)
                  }
                  setStreamingContent('')
                }

                if (data.error) {
                  throw new Error(data.error)
                }
              } catch (e: any) {
                console.log('[STREAM] Parse error:', e.message, 'Line:', line.substring(0, 100))
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }

        // Show processing message while extracting HTML
        if (fullContent) {
          setStreamingContent('')
          setProcessingEmail(true)

          // Small delay for UX
          await new Promise(resolve => setTimeout(resolve, 500))

          console.log('[STREAM] Extracting HTML from content...')
          let htmlContent = fullContent
          const htmlMatch = fullContent.match(/```html\s*([\s\S]*?)\s*```/i)
          if (htmlMatch && htmlMatch[1]) {
            htmlContent = htmlMatch[1].trim()
          }
          if (htmlContent.includes('<table') || htmlContent.includes('<!DOCTYPE')) {
            setGeneratedContent(htmlContent)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Your email is ready!' }])
            // Save to Supabase (fallback case)
            if (!contentId) {
              saveContentToDatabase(htmlContent)
            }
          }
          setProcessingEmail(false)
        }
      }
    } catch (error: any) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again.`
      }])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setStreamingContent('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          contentType: 'imcivree-email',
          audience,
          emailType,
          conversationId
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.details || 'Failed to get response')
      }

      // Handle SSE streaming response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullContent = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const text = decoder.decode(value)
          const lines = text.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.slice(6)
                if (!jsonStr.trim()) continue

                const data = JSON.parse(jsonStr)

                if (data.chunk) {
                  fullContent += data.chunk
                  setStreamingContent(fullContent)
                }

                if (data.done) {
                  if (data.conversationId && !conversationId) {
                    setConversationId(data.conversationId)
                  }
                  // Only update email if generatedContent is provided (explicit email update)
                  if (data.generatedContent) {
                    setGeneratedContent(data.generatedContent)
                    setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Email updated!' }])
                    // Save revision to Supabase (with parent ID for versioning)
                    saveContentToDatabase(data.generatedContent, contentId || undefined)
                  } else if (data.message) {
                    // Conversational response - show in chat, don't touch email
                    setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
                  }
                  setStreamingContent('')
                }

                if (data.error) {
                  throw new Error(data.error)
                }
              } catch (parseError) {
                // Ignore parse errors for partial chunks
              }
            }
          }
        }

        // Check if response is conversational (no HTML) or an email update
        if (fullContent) {
          setStreamingContent('')

          // Check if response contains HTML email (starts with DOCTYPE/table or contains email structure)
          const isHtmlEmail = fullContent.includes('<!DOCTYPE') ||
                              fullContent.includes('<table') ||
                              fullContent.match(/```html\s*[\s\S]*?```/i)

          if (isHtmlEmail) {
            // This is an email update - extract HTML
            setProcessingEmail(true)
            await new Promise(resolve => setTimeout(resolve, 500))

            let htmlContent = fullContent
            const htmlMatch = fullContent.match(/```html\s*([\s\S]*?)\s*```/i)
            if (htmlMatch && htmlMatch[1]) {
              htmlContent = htmlMatch[1].trim()
            }
            setGeneratedContent(htmlContent)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Email updated!' }])
            // Save revision to Supabase
            saveContentToDatabase(htmlContent, contentId || undefined)
            setProcessingEmail(false)
          } else {
            // This is a conversational response - show in chat, don't touch email
            setMessages(prev => [...prev, { role: 'assistant', content: fullContent }])
          }
        }
      }
    } catch (error: any) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message || 'Unknown error'}. Please try again.`
      }])
      setStreamingContent('')
    } finally {
      setIsLoading(false)
    }
  }

  const startOver = () => {
    setStep('select')
    setMessages([])
    setGeneratedContent(null)
    setConversationId(null)
    setContentId(null)
    setKeyMessage('')
    setHcpSegment('aware')
    setVariableFields({
      doctorName: '',
      practiceName: '',
      specialty: '',
      city: ''
    })
    setSubmissionStatus('idle')
    setSaveStatus('idle')
  }

  // Submit to Ziflow for approval
  const submitToZiflow = async () => {
    if (!generatedContent) return

    setIsSubmitting(true)
    setSubmissionStatus('idle')

    try {
      const emailTypeObj = EMAIL_TYPES[audience].find(t => t.id === emailType)
      const response = await fetch('/api/submit-for-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'email',
          name: emailTypeObj?.name || emailType,
          htmlContent: generatedContent,
          audience,
          focus: emailType,
        }),
      })

      if (!response.ok) throw new Error('Failed to submit')

      const data = await response.json()
      setSubmissionStatus('success')
      console.log('Submitted to Ziflow:', data)
    } catch (error) {
      console.error('Ziflow submission error:', error)
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Selection screen
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f6fbfb] via-white to-[#f6fbfb]">
        {/* Header */}
        <header className="border-b border-[#007a80]/10 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#007a80]">
                3cubed
              </Link>
              <div className="h-6 w-px bg-[#007a80]/20" />
              <img
                src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png"
                alt="IMCIVREE"
                className="h-8"
              />
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/content-history"
                className="flex items-center gap-1 text-sm text-[#4a4f55] hover:text-[#007a80]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </Link>
              <Link
                href="/"
                className="text-sm text-[#4a4f55] hover:text-[#007a80]"
              >
                ← Back to Hub
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-12">
          <h1 className="text-3xl font-bold text-[#007a80] text-center mb-2">
            Create IMCIVREE Email
          </h1>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#007a80]/10 text-[#007a80]">
              Indication: Bardet-Biedl Syndrome (BBS)
            </span>
          </div>
          <p className="text-center text-[#4a4f55] mb-10">
            Select your audience and email type to get started
          </p>

          {/* Audience Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-[#007a80]/10 p-1">
              <button
                onClick={() => {
                  setAudience('hcp')
                  setEmailType('moa')
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  audience === 'hcp'
                    ? 'bg-[#007a80] text-white'
                    : 'text-[#007a80] hover:bg-[#007a80]/10'
                }`}
              >
                HCP (Healthcare Professional)
              </button>
              <button
                onClick={() => {
                  setAudience('patient')
                  setEmailType('getting-started')
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  audience === 'patient'
                    ? 'bg-[#007a80] text-white'
                    : 'text-[#007a80] hover:bg-[#007a80]/10'
                }`}
              >
                Patient / Caregiver
              </button>
            </div>
          </div>

          {/* Email Type Selection */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {EMAIL_TYPES[audience].map((type) => (
              <button
                key={type.id}
                onClick={() => setEmailType(type.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  emailType === type.id
                    ? 'border-[#007a80] bg-[#007a80]/5'
                    : 'border-gray-200 hover:border-[#007a80]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    emailType === type.id ? 'border-[#007a80] bg-[#007a80]' : 'border-gray-300'
                  }`}>
                    {emailType === type.id && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#007a80]">{type.name}</h3>
                    <p className="text-sm text-[#4a4f55] mt-1">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* HCP Segmentation (only for HCP audience) */}
          {audience === 'hcp' && (
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#4a4f55] mb-2">
                HCP Segment
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {HCP_SEGMENTS.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setHcpSegment(segment.id)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      hcpSegment === segment.id
                        ? 'border-[#007a80] bg-[#007a80]/5 ring-1 ring-[#007a80]'
                        : 'border-gray-200 hover:border-[#007a80]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        hcpSegment === segment.id ? 'bg-[#007a80]' : 'bg-gray-300'
                      }`} />
                      <span className="font-medium text-[#007a80] text-sm">{segment.name}</span>
                    </div>
                    <p className="text-xs text-[#4a4f55] mt-1 ml-5">{segment.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variable Fields (Optional - for personalization) */}
          {audience === 'hcp' && (
            <div className="mb-8 p-5 bg-[#f6fbfb] rounded-xl border border-[#007a80]/10">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPersonalization}
                  onChange={(e) => setShowPersonalization(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-[#007a80] focus:ring-[#007a80]/20"
                />
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium text-[#007a80]">
                    Enable Personalization Fields
                  </span>
                </div>
              </label>
              <p className="text-xs text-[#4a4f55] mt-2 ml-8">
                Add merge variables like {'{{doctor_name}}'} to your email
              </p>

              {showPersonalization && (
                <div className="grid gap-4 sm:grid-cols-2 mt-4 pt-4 border-t border-[#007a80]/10">
                  <div>
                    <label className="block text-xs font-medium text-[#4a4f55] mb-1">
                      Doctor Name
                    </label>
                    <input
                      type="text"
                      value={variableFields.doctorName}
                      onChange={(e) => setVariableFields(prev => ({ ...prev, doctorName: e.target.value }))}
                      placeholder="e.g., Smith"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-1 focus:ring-[#007a80]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a4f55] mb-1">
                      Practice Name
                    </label>
                    <input
                      type="text"
                      value={variableFields.practiceName}
                      onChange={(e) => setVariableFields(prev => ({ ...prev, practiceName: e.target.value }))}
                      placeholder="e.g., Bay Area Endocrinology"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-1 focus:ring-[#007a80]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a4f55] mb-1">
                      Specialty
                    </label>
                    <input
                      type="text"
                      value={variableFields.specialty}
                      onChange={(e) => setVariableFields(prev => ({ ...prev, specialty: e.target.value }))}
                      placeholder="e.g., Endocrinology"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-1 focus:ring-[#007a80]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#4a4f55] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={variableFields.city}
                      onChange={(e) => setVariableFields(prev => ({ ...prev, city: e.target.value }))}
                      placeholder="e.g., San Francisco"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-1 focus:ring-[#007a80]/20"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Key Message Input (Optional) */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#4a4f55] mb-2">
              Key Message Focus (Optional)
            </label>
            <input
              type="text"
              value={keyMessage}
              onChange={(e) => setKeyMessage(e.target.value)}
              placeholder="e.g., Weight reduction data, Getting started with treatment..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-2 focus:ring-[#007a80]/20"
            />
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={() => setStep('chat')}
              className="inline-flex items-center gap-2 rounded-full bg-[#007a80] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1c7b80]"
            >
              Generate Email
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </main>
      </div>
    )
  }

  // Chat interface
  return (
    <div className="flex h-screen flex-col bg-[#f6fbfb]">
      {/* Header */}
      <header className="border-b border-[#007a80]/10 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-[#007a80]">
              3cubed
            </Link>
            <div className="h-6 w-px bg-[#007a80]/20" />
            <img
              src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png"
              alt="IMCIVREE"
              className="h-8"
            />
            <div className="h-6 w-px bg-[#007a80]/20" />
            <span className="text-sm font-medium text-[#4a4f55]">
              {audience === 'hcp' ? 'HCP' : 'Patient'} {contentType === 'imcivree-banner' ? 'Banner' : 'Email'} • {EMAIL_TYPES[audience].find(t => t.id === emailType)?.name}
              {audience === 'hcp' && contentType !== 'imcivree-banner' && ` • ${HCP_SEGMENTS.find(s => s.id === hcpSegment)?.name}`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={startOver}
              className="text-sm text-[#4a4f55] hover:text-[#007a80]"
            >
              ← Start Over
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area - Left side */}
        <div className="flex flex-1 flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-3xl space-y-6">
              {/* Ziflow Feedback Banner */}
              {ziflowFeedback?.comments?.length > 0 && (
                <div className="bg-gradient-to-r from-[#f6fbfb] to-[#e8f4f4] border-2 border-[#007a80]/30 rounded-xl p-5 mb-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#007a80] rounded-full p-1.5">
                      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-[#007a80]">MLR Review Feedback</h3>
                    <span className="ml-auto px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                      {ziflowFeedback.comments.length} action{ziflowFeedback.comments.length > 1 ? 's' : ''} needed
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {ziflowFeedback.comments.map((comment: any, i: number) => (
                      <div key={i} className="bg-white rounded-lg p-3 border border-[#007a80]/20 shadow-sm">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-6 h-6 bg-[#007a80]/10 text-[#007a80] rounded-full flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-semibold text-[#007a80]">{comment.authorName}</span>
                            </div>
                            <p className="text-sm text-gray-700">{comment.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/70 rounded-lg p-3 border border-[#007a80]/20">
                    <p className="text-xs text-gray-600 mb-2 font-medium">Quick Actions:</p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setInput('Please address all the feedback and update the content accordingly.')
                          // Auto-submit
                          setTimeout(() => {
                            const form = document.querySelector('form')
                            form?.dispatchEvent(new Event('submit', { bubbles: true }))
                          }, 100)
                        }}
                        className="px-4 py-2 text-sm bg-[#007a80] text-white rounded-lg hover:bg-[#1c7b80] font-medium shadow-sm"
                      >
                        ✨ Address All Feedback
                      </button>
                      <button
                        onClick={() => setInput('Can you explain what the reviewer wants me to change?')}
                        className="px-4 py-2 text-sm border-2 border-[#007a80]/30 text-[#007a80] rounded-lg hover:bg-[#f6fbfb] font-medium"
                      >
                        🤔 Explain Feedback
                      </button>
                      <button
                        onClick={() => setZiflowFeedback(null)}
                        className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[#007a80] text-white'
                        : 'bg-white text-[#4a4f55] shadow-sm border border-[#007a80]/10'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && !streamingContent && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-sm border border-[#007a80]/10">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#007a80]" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#007a80]" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#007a80]" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Streaming content display */}
              {streamingContent && (
                <div className="flex justify-start">
                  <div
                    ref={streamingRef}
                    className="max-w-[80%] rounded-2xl bg-white border border-[#007a80]/10 text-[#4a4f55] px-4 py-3 font-mono text-xs max-h-96 overflow-y-auto scroll-smooth shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#007a80] text-[10px]">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-[#007a80]" />
                      Generating code...
                    </div>
                    <pre className="whitespace-pre-wrap break-words">{streamingContent}</pre>
                  </div>
                </div>
              )}

              {/* Processing email message */}
              {processingEmail && (
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-[#007a80] text-white px-6 py-4 shadow-lg animate-pulse">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-medium">Please wait, your email is being prepared...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#007a80]/10 bg-white p-4">
            <form onSubmit={sendMessage} className="mx-auto max-w-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask for changes or refinements..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-2 focus:ring-[#007a80]/20 disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-[#007a80] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1c7b80] disabled:bg-gray-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Panel - Right side (always visible) */}
        <div className="w-1/2 border-l border-[#007a80]/10 bg-white p-6 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#007a80]">{contentType === 'imcivree-banner' ? 'Banner Preview' : 'Email Preview'}</h3>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent)
                    alert('HTML copied to clipboard!')
                  }}
                  className="text-sm text-[#007a80] hover:text-[#1c7b80] px-3 py-1 rounded border border-[#007a80]/20 hover:bg-[#007a80]/5"
                >
                  Copy HTML
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedContent], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `imcivree-${audience}-${emailType}-${contentType === 'imcivree-banner' ? 'banner' : 'email'}.html`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="text-sm bg-[#007a80] text-white hover:bg-[#1c7b80] px-3 py-1 rounded"
                >
                  Download HTML
                </button>
                <button
                  onClick={submitToZiflow}
                  disabled={isSubmitting || submissionStatus === 'success'}
                  className={`text-sm px-3 py-1 rounded flex items-center gap-1 ${
                    submissionStatus === 'success'
                      ? 'bg-green-600 text-white'
                      : submissionStatus === 'error'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  } disabled:opacity-50`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </>
                  ) : submissionStatus === 'success' ? (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Sent to Ziflow
                    </>
                  ) : submissionStatus === 'error' ? (
                    'Retry Ziflow'
                  ) : (
                    <>
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Submit to Ziflow
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Email Preview */}
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 min-h-[500px]">
            {generatedContent ? (
              <iframe
                srcDoc={generatedContent}
                className="w-full h-[600px]"
                title={contentType === 'imcivree-banner' ? 'Banner Preview' : 'Email Preview'}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : isLoadingReview ? (
              <div className="flex items-center justify-center h-[500px] text-center text-[#4a4f55]">
                <div>
                  <div className="h-10 w-10 mx-auto animate-spin rounded-full border-4 border-[#007a80] border-t-transparent mb-3"></div>
                  <p className="text-sm">Loading content...</p>
                </div>
              </div>
            ) : streamingContent || isLoading ? (
              <div className="flex items-center justify-center h-[500px] text-center text-[#4a4f55]">
                <div>
                  <div className="mb-4 relative">
                    {/* Stopwatch animation */}
                    <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
                      {/* Outer circle */}
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#007a80" strokeWidth="2" opacity="0.2" />
                      {/* Progress circle */}
                      <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="#007a80"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        className="animate-[dash_2s_ease-in-out_infinite]"
                        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                      />
                      {/* Center dot */}
                      <circle cx="50" cy="50" r="4" fill="#007a80" />
                      {/* Second hand */}
                      <line
                        x1="50" y1="50" x2="50" y2="15"
                        stroke="#007a80"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-spin"
                        style={{ transformOrigin: 'center', animationDuration: '2s' }}
                      />
                      {/* Top button */}
                      <rect x="46" y="2" width="8" height="6" rx="1" fill="#007a80" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#007a80]">Generating email...</p>
                  <p className="text-xs text-[#4a4f55]/60 mt-1">This may take a moment</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-center text-[#4a4f55]">
                <div>
                  <div className="mb-3">
                    <svg className="w-16 h-16 mx-auto text-[#007a80]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm">Your email will appear here</p>
                  <p className="text-xs text-[#4a4f55]/60 mt-1">HTML Email Preview</p>
                </div>
              </div>
            )}
          </div>

          {/* Raw HTML (collapsed) */}
          {generatedContent && (
            <details className="mt-4">
              <summary className="text-sm text-[#4a4f55] cursor-pointer hover:text-[#007a80]">
                View HTML Code
              </summary>
              <pre className="mt-2 p-4 bg-white border border-[#007a80]/20 text-[#4a4f55] text-xs rounded-lg overflow-x-auto max-h-96">
                {generatedContent}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#f6fbfb]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#007a80] border-t-transparent"></div>
          <p className="mt-4 text-sm text-[#4a4f55]">Loading...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  )
}
