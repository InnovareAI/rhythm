'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { hasBannerTemplate, getBannerTemplate } from '@/lib/content-templates/imcivree-banners'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Audience = 'hcp' | 'patient'

// Banner focus options by audience
const BANNER_FOCUS = {
  hcp: [
    { id: 'moa', name: 'Mechanism of Action', description: 'Focus on MC4R pathway and how IMCIVREE works' },
    { id: 'efficacy-weight', name: 'Weight Reduction', description: 'Highlight BMI and weight reduction data' },
    { id: 'efficacy-hunger', name: 'Hunger Reduction', description: 'Focus on hunger control and hyperphagia' },
    { id: 'treatment', name: 'Treatment Journey', description: 'Timeline and treatment expectations' },
  ],
  patient: [
    { id: 'understanding', name: 'Understanding BBS', description: 'Disease education for patients/caregivers' },
    { id: 'hope', name: 'Path Forward', description: 'Hopeful messaging about treatment options' },
    { id: 'support', name: 'Support Available', description: 'Rhythm InTune and caregiver resources' },
  ],
}

function BannerContent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [contentId, setContentId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  // IMCIVREE-specific state
  const [audience, setAudience] = useState<Audience>('hcp')
  const [bannerFocus, setBannerFocus] = useState<string>('moa')
  const [step, setStep] = useState<'select' | 'chat'>('select')
  const [keyMessage, setKeyMessage] = useState<string>('')

  // Save content to Supabase
  const saveContentToDatabase = async (htmlContent: string, parentId?: string) => {
    setIsSaving(true)
    setSaveStatus('saving')
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'imcivree-banner',
          audience,
          focus: bannerFocus,
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
        console.log('[BANNER] Content saved with ID:', data.content.id)
      }
    } catch (error) {
      console.error('[BANNER] Error saving content:', error)
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  // Initialize greeting when entering chat
  useEffect(() => {
    if (step === 'chat') {
      const audienceLabel = audience === 'hcp' ? 'HCP' : 'Patient/Caregiver'
      const focusObj = BANNER_FOCUS[audience].find(f => f.id === bannerFocus)

      setMessages([
        {
          role: 'assistant',
          content: `Great! I'll create an IMCIVREE ${audienceLabel} animated banner ad focused on **${focusObj?.name}**.

${keyMessage ? `Your key message focus: "${keyMessage}"` : ''}

I'm generating your compliant animated banner now with:
- ${audience === 'hcp' ? '5-frame' : '2-screen'} structure with approved messaging
- Continuous scrolling ISI (Important Safety Information)
- IMCIVREE brand colors and styling
- Smooth frame transitions
- "Learn more" CTA on final frame

Give me a moment...`
        }
      ])

      // Auto-generate the banner
      generateBanner()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, audience, bannerFocus])

  const [streamingContent, setStreamingContent] = useState('')
  const [processingBanner, setProcessingBanner] = useState(false)
  const streamingRef = useRef<HTMLDivElement>(null)

  // Ziflow approval state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Auto-scroll streaming content
  useEffect(() => {
    if (streamingRef.current) {
      streamingRef.current.scrollTop = streamingRef.current.scrollHeight
    }
  }, [streamingContent])

  const generateBanner = async () => {
    setIsLoading(true)
    setStreamingContent('')

    // Check for hardcoded template first (unless custom keyMessage is provided)
    if (!keyMessage && hasBannerTemplate(audience, bannerFocus)) {
      const template = getBannerTemplate(audience, bannerFocus)
      if (template) {
        // Use hardcoded template with simulated coding animation
        console.log('[BANNER] Using hardcoded template:', audience, bannerFocus)

        // Simulate smooth coding animation over 45 seconds using requestAnimationFrame
        const htmlContent = template.html
        const totalDuration = 45000 // 45 seconds
        const totalChars = htmlContent.length

        const simulateTyping = () => {
          return new Promise<void>((resolve) => {
            const startTime = performance.now()

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / totalDuration, 1)

              // Use easeOutQuad for smoother feel at the end
              const easedProgress = 1 - (1 - progress) * (1 - progress)
              const currentIndex = Math.floor(easedProgress * totalChars)

              setStreamingContent(htmlContent.substring(0, currentIndex))

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setStreamingContent(htmlContent)
                resolve()
              }
            }

            requestAnimationFrame(animate)
          })
        }

        await simulateTyping()

        // Brief pause then show final result
        setStreamingContent('')
        setProcessingBanner(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setProcessingBanner(false)

        setGeneratedContent(htmlContent)
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Your banner is ready! You can ask me to make modifications, or download as-is.`
        }])

        // Save to Supabase
        saveContentToDatabase(htmlContent)
        setIsLoading(false)
        return
      }
    }

    // Otherwise, use LLM generation for custom variations
    console.log('[BANNER] Using LLM generation for custom banner')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Generate an IMCIVREE banner ad for ${audience === 'hcp' ? 'healthcare professionals' : 'patients/caregivers'} focused on ${bannerFocus}. ${keyMessage ? `Key message: ${keyMessage}` : ''}`
          }],
          contentType: 'imcivree-banner',
          audience,
          bannerFocus,
          keyMessage,
          conversationId
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to get response')
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
                  setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Banner generated!' }])
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
              } catch (e) {
                // Ignore parse errors
              }
            }
          }
        }

        // Fallback extraction (only if not already processed)
        if (fullContent && !generatedContent) {
          setStreamingContent('')
          setProcessingBanner(true)
          await new Promise(resolve => setTimeout(resolve, 500))

          let htmlContent = fullContent
          const htmlMatch = fullContent.match(/```html\s*([\s\S]*?)\s*```/i)
          if (htmlMatch && htmlMatch[1]) {
            htmlContent = htmlMatch[1].trim()
          }
          if (htmlContent.includes('<') && htmlContent.includes('>')) {
            setGeneratedContent(htmlContent)
            setMessages(prev => [...prev, { role: 'assistant', content: 'Your banner is ready!' }])
            // Save to Supabase
            saveContentToDatabase(htmlContent)
          }
          setProcessingBanner(false)
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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          contentType: 'imcivree-banner',
          audience,
          bannerFocus,
          conversationId
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      if (data.conversationId && !conversationId) {
        setConversationId(data.conversationId)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])

      if (data.generatedContent) {
        setGeneratedContent(data.generatedContent)
        // Save revision to Supabase (with parent ID for versioning)
        saveContentToDatabase(data.generatedContent, contentId || undefined)
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
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
    setSubmissionStatus('idle')
    setSaveStatus('idle')
  }

  // Submit to Ziflow for approval
  const submitToZiflow = async () => {
    if (!generatedContent) return

    setIsSubmitting(true)
    setSubmissionStatus('idle')

    try {
      const focusObj = BANNER_FOCUS[audience].find(f => f.id === bannerFocus)
      const response = await fetch('/api/submit-for-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'banner',
          name: focusObj?.name || bannerFocus,
          htmlContent: generatedContent,
          audience,
          focus: bannerFocus,
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
              <div className="h-6 w-px bg-[#007a80]/20" />
              <span className="text-lg font-medium text-[#007a80]">
                Let's create a banner
              </span>
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
            Create IMCIVREE Banner Ad
          </h1>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#007a80]/10 text-[#007a80]">
              Indication: Bardet-Biedl Syndrome (BBS)
            </span>
          </div>
          <p className="text-center text-[#4a4f55] mb-10">
            Generate animated 728x250 leaderboard banners with scrolling ISI
          </p>

          {/* Audience Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-full bg-[#007a80]/10 p-1">
              <button
                onClick={() => {
                  setAudience('hcp')
                  setBannerFocus('moa')
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
                  setBannerFocus('understanding')
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

          {/* Banner Focus Selection */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {BANNER_FOCUS[audience].map((focus) => (
              <button
                key={focus.id}
                onClick={() => setBannerFocus(focus.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  bannerFocus === focus.id
                    ? 'border-[#007a80] bg-[#007a80]/5'
                    : 'border-gray-200 hover:border-[#007a80]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    bannerFocus === focus.id ? 'border-[#007a80] bg-[#007a80]' : 'border-gray-300'
                  }`}>
                    {bannerFocus === focus.id && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#007a80]">{focus.name}</h3>
                    <p className="text-sm text-[#4a4f55] mt-1">{focus.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Key Message Input (Optional) */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[#4a4f55] mb-2">
              Key Message Focus (Optional)
            </label>
            <input
              type="text"
              value={keyMessage}
              onChange={(e) => setKeyMessage(e.target.value)}
              placeholder="e.g., First and only treatment for BBS, Meaningful weight reduction..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[#4a4f55] placeholder-gray-400 focus:border-[#007a80] focus:outline-none focus:ring-2 focus:ring-[#007a80]/20"
            />
          </div>

          {/* Banner Specs Info - Dynamic based on audience */}
          <div className="mb-8 p-4 bg-[#007a80]/5 rounded-lg">
            <h4 className="font-medium text-[#007a80] mb-2">Banner Specifications</h4>
            <ul className="text-sm text-[#4a4f55] space-y-1">
              <li>• Size: 728 × 250 pixels (Leaderboard)</li>
              <li>• Format: Animated HTML/CSS/JS</li>
              {audience === 'hcp' ? (
                <>
                  <li>• 5 frames with smooth fade transitions</li>
                  <li>• Continuous scrolling ISI at bottom</li>
                </>
              ) : (
                <>
                  <li>• 2 screens with fade transitions</li>
                  <li>• Scrolling ISI with 3-second pause at end</li>
                </>
              )}
              <li>• "Learn more" CTA button</li>
            </ul>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={() => setStep('chat')}
              className="inline-flex items-center gap-2 rounded-full bg-[#007a80] px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1c7b80]"
            >
              Generate Banner
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
            <span className="text-lg font-medium text-[#007a80]">
              Let's create a banner
            </span>
            <span className="text-sm text-[#4a4f55]">
              • {audience === 'hcp' ? 'HCP' : 'Patient'} • {BANNER_FOCUS[audience].find(f => f.id === bannerFocus)?.name}
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

              {/* Streaming Code Display */}
              {streamingContent && (
                <div className="flex justify-start">
                  <div
                    ref={streamingRef}
                    className="max-w-[80%] rounded-2xl bg-white border border-[#007a80]/10 text-[#4a4f55] px-4 py-3 font-mono text-xs max-h-96 overflow-y-auto scroll-smooth shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#007a80] text-[10px]">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-[#007a80]" />
                      Generating banner code...
                    </div>
                    <pre className="whitespace-pre-wrap break-words">{streamingContent}</pre>
                  </div>
                </div>
              )}

              {/* Processing Banner Message */}
              {processingBanner && (
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-[#007a80] text-white px-6 py-4 shadow-lg animate-pulse">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="font-medium">Please wait, your banner is being prepared...</span>
                    </div>
                  </div>
                </div>
              )}

              {isLoading && !streamingContent && !processingBanner && (
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
            <h3 className="text-lg font-semibold text-[#007a80]">Banner Preview</h3>
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
                    a.download = `imcivree-${audience}-${bannerFocus}-banner.html`
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

          {/* Banner Preview */}
          <div className="mb-4 p-4 bg-gray-100 rounded-lg overflow-auto">
            {generatedContent ? (
              <div className="flex justify-center p-2">
                <div className="shadow-lg bg-white rounded overflow-hidden">
                  <iframe
                    srcDoc={generatedContent}
                    width="760"
                    height="320"
                    className="border-0 block"
                    title="Banner Preview"
                    style={{ margin: 0, padding: 0 }}
                  />
                </div>
              </div>
            ) : streamingContent || isLoading ? (
              <div className="text-center text-[#4a4f55] py-16">
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
                <p className="text-sm font-medium text-[#007a80]">Generating banner...</p>
                <p className="text-xs text-[#4a4f55]/60 mt-1">This may take a moment</p>
              </div>
            ) : (
              <div className="text-center text-[#4a4f55] py-20">
                <div className="mb-3">
                  <svg className="w-16 h-16 mx-auto text-[#007a80]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm">Your banner will appear here</p>
                <p className="text-xs text-[#4a4f55]/60 mt-1">728 × 300 pixels</p>
              </div>
            )}
          </div>

          {/* Banner Specs */}
          {generatedContent && (
            <>
              <div className="mb-4 text-xs text-[#4a4f55] text-center">
                728 × 300 pixels (Leaderboard + ISI Bar) • Animated HTML Banner
              </div>

              {/* Raw HTML (collapsed) */}
              <details className="mt-4">
                <summary className="text-sm text-[#4a4f55] cursor-pointer hover:text-[#007a80]">
                  View HTML Code
                </summary>
                <pre className="mt-2 p-4 bg-white border border-[#007a80]/20 text-[#4a4f55] text-xs rounded-lg overflow-x-auto max-h-96">
                  {generatedContent}
                </pre>
              </details>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function BannerGeneratorPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#f6fbfb]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#007a80] border-t-transparent"></div>
          <p className="mt-4 text-sm text-[#4a4f55]">Loading...</p>
        </div>
      </div>
    }>
      <BannerContent />
    </Suspense>
  )
}
