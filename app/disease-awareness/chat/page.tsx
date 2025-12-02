'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { DA_EMAIL_TYPES, getDATemplate, hasDATemplate } from '@/lib/content-templates/disease-awareness-emails'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

function EmailContent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [emailType, setEmailType] = useState<string>('hcp-what-is-aho')
  const [step, setStep] = useState<'select' | 'chat'>('select')
  const [streamingContent, setStreamingContent] = useState('')
  const [processingEmail, setProcessingEmail] = useState(false)
  const streamingRef = useRef<HTMLDivElement>(null)

  // Ziflow approval state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Submit to Ziflow for approval
  const submitToZiflow = async () => {
    if (!generatedContent) return

    setIsSubmitting(true)
    setSubmissionStatus('idle')

    try {
      const emailTypeObj = DA_EMAIL_TYPES.find(t => t.id === emailType)
      const response = await fetch('/api/submit-for-approval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'email',
          name: emailTypeObj?.name || emailType,
          htmlContent: generatedContent,
          audience: 'hcp',
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

  // Auto-scroll streaming content
  useEffect(() => {
    if (streamingRef.current) {
      streamingRef.current.scrollTop = streamingRef.current.scrollHeight
    }
  }, [streamingContent])

  // Initialize greeting and generate when entering chat
  useEffect(() => {
    if (step === 'chat' && !generatedContent) {
      const emailTypeObj = DA_EMAIL_TYPES.find(t => t.id === emailType)

      setMessages([
        {
          role: 'assistant',
          content: `Great! I'll create an HCP education email focused on **${emailTypeObj?.name}**.

I'm generating your disease awareness email now with:
- Purple/teal brand styling
- Educational content about aHO
- Scientific references
- Professional formatting

Give me a moment...`
        }
      ])

      // Auto-generate the email
      generateEmail()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Save content to database
  const saveToDatabase = async (html: string) => {
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: 'da-email',
          audience: 'hcp',
          focus: emailType,
          htmlContent: html
        })
      })
      if (!response.ok) {
        const err = await response.json()
        console.error('Failed to save email to database:', err)
      } else {
        console.log('Email saved to database')
      }
    } catch (error) {
      console.error('Error saving email:', error)
    }
  }

  const generateEmail = async () => {
    setIsLoading(true)
    setStreamingContent('')

    // Check for pre-built template
    if (hasDATemplate(emailType)) {
      const template = getDATemplate(emailType)
      if (template) {
        // Simulate smooth coding animation
        const htmlContent = template.html
        const totalDuration = 10000 // 10 seconds
        const totalChars = htmlContent.length

        const simulateTyping = () => {
          return new Promise<void>((resolve) => {
            const startTime = performance.now()

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime
              const progress = Math.min(elapsed / totalDuration, 1)
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
        setProcessingEmail(true)
        await new Promise(resolve => setTimeout(resolve, 500))
        setProcessingEmail(false)

        setGeneratedContent(htmlContent)

        // Save to database
        await saveToDatabase(htmlContent)

        setMessages(prev => [...prev, {
          role: 'assistant',
          content: `Your email is ready! You can download the HTML or copy to clipboard.`
        }])
        setIsLoading(false)
        return
      }
    }

    // Fallback
    setGeneratedContent('<p>Template not found</p>')
    setIsLoading(false)
  }

  const startOver = () => {
    setStep('select')
    setMessages([])
    setGeneratedContent(null)
    setStreamingContent('')
  }

  // Selection screen
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f2f8] via-white to-[#f9f2f8]">
        {/* Header */}
        <header className="border-b border-[#1a1652]/10 bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold text-[#1a1652]">
                3cubed
              </Link>
              <div className="h-6 w-px bg-[#1a1652]/20" />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-lg font-medium text-[#1a1652]">
                Disease Awareness
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/disease-awareness/content-history"
                className="flex items-center gap-1 text-sm text-[#4a4f55] hover:text-[#1a1652]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </Link>
              <Link
                href="/disease-awareness"
                className="text-sm text-[#4a4f55] hover:text-[#1a1652]"
              >
                ← Back to Hub
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-6 py-12">
          <h1 className="text-3xl font-bold text-[#1a1652] text-center mb-2">
            Create HCP Education Email
          </h1>
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1a1652]/10 text-[#1a1652]">
              Acquired Hypothalamic Obesity (aHO)
            </span>
          </div>
          <p className="text-center text-[#4a4f55] mb-10">
            Select an email type to generate disease awareness content
          </p>

          {/* Email Type Selection */}
          <div className="grid gap-4 sm:grid-cols-2 mb-8">
            {DA_EMAIL_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setEmailType(type.id)}
                className={`text-left p-5 rounded-xl border-2 transition-all ${
                  emailType === type.id
                    ? 'border-[#00a7df] bg-[#00a7df]/5'
                    : 'border-gray-200 hover:border-[#00a7df]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    emailType === type.id ? 'border-[#00a7df] bg-[#00a7df]' : 'border-gray-300'
                  }`}>
                    {emailType === type.id && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1652]">{type.name}</h3>
                    <p className="text-sm text-[#4a4f55] mt-1">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Target HCP Segments Info */}
          <div className="mb-8 p-4 bg-[#1a1652]/5 rounded-lg">
            <h4 className="font-medium text-[#1a1652] mb-2">Target HCP Segments</h4>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1a1652] border border-[#1a1652]/20">
                Endocrinologists
              </span>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1a1652] border border-[#1a1652]/20">
                Pediatricians
              </span>
              <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-medium text-[#1a1652] border border-[#1a1652]/20">
                Obesity & Nutrition Specialists
              </span>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={() => setStep('chat')}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
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
    <div className="flex h-screen flex-col bg-[#f9f2f8]">
      {/* Header */}
      <header className="border-b border-[#1a1652]/10 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-[#1a1652]">
              3cubed
            </Link>
            <div className="h-6 w-px bg-[#1a1652]/20" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-lg font-medium text-[#1a1652]">
              Disease Education
            </span>
            <span className="text-sm text-[#4a4f55]">
              • HCP Email • {DA_EMAIL_TYPES.find(t => t.id === emailType)?.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={startOver}
              className="text-sm text-[#4a4f55] hover:text-[#1a1652]"
            >
              ← Start Over
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area - Left side */}
        <div className="flex flex-1 flex-col border-r border-[#1a1652]/10">
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
                        ? 'bg-[#1a1652] text-white'
                        : 'bg-white text-[#4a4f55] shadow-sm border border-[#1a1652]/10'
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
                    className="max-w-[80%] rounded-2xl bg-white border border-[#1a1652]/10 text-[#4a4f55] px-4 py-3 font-mono text-xs max-h-96 overflow-y-auto scroll-smooth shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#00a7df] text-[10px]">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-[#00a7df]" />
                      Generating email...
                    </div>
                    <pre className="whitespace-pre-wrap break-words">{streamingContent}</pre>
                  </div>
                </div>
              )}

              {/* Processing Email Message */}
              {processingEmail && (
                <div className="flex justify-center">
                  <div className="rounded-2xl bg-gradient-to-r from-[#1a1652] to-[#00a7df] text-white px-6 py-4 shadow-lg animate-pulse">
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

              {isLoading && !streamingContent && !processingEmail && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-sm border border-[#1a1652]/10">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#1a1652]" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#1a1652]" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#1a1652]" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-[#1a1652]/10 bg-white p-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Request changes or ask questions..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm text-[#4a4f55] placeholder-gray-400 focus:border-[#1a1652] focus:outline-none focus:ring-2 focus:ring-[#1a1652]/20 disabled:bg-gray-100"
                />
                <button
                  type="button"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel - Right side */}
        <div className="w-1/2 bg-white p-6 overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#1a1652]">Email Preview</h3>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedContent)
                    alert('HTML copied to clipboard!')
                  }}
                  className="text-sm text-[#1a1652] hover:text-[#00a7df] px-3 py-1 rounded border border-[#1a1652]/20 hover:bg-[#1a1652]/5"
                >
                  Copy HTML
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedContent], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `disease-education-${emailType}.html`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="text-sm bg-gradient-to-r from-[#1a1652] to-[#00a7df] text-white hover:opacity-90 px-3 py-1 rounded"
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
                className="w-full h-[600px] border-0"
                title="Email Preview"
              />
            ) : streamingContent || isLoading ? (
              <div className="flex items-center justify-center h-[500px] text-center text-[#4a4f55]">
                <div>
                  <div className="mb-4 relative">
                    <svg className="w-20 h-20 mx-auto" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1652" strokeWidth="2" opacity="0.2" />
                      <circle
                        cx="50" cy="50" r="45"
                        fill="none"
                        stroke="#00a7df"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        className="animate-[dash_2s_ease-in-out_infinite]"
                        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                      />
                      <circle cx="50" cy="50" r="4" fill="#1a1652" />
                      <line
                        x1="50" y1="50" x2="50" y2="15"
                        stroke="#1a1652"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-spin"
                        style={{ transformOrigin: 'center', animationDuration: '2s' }}
                      />
                      <rect x="46" y="2" width="8" height="6" rx="1" fill="#1a1652" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-[#1a1652]">Generating email...</p>
                  <p className="text-xs text-[#4a4f55]/60 mt-1">This may take a moment</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-center text-[#4a4f55]">
                <div>
                  <div className="mb-3">
                    <svg className="w-16 h-16 mx-auto text-[#1a1652]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
              <summary className="text-sm text-[#4a4f55] cursor-pointer hover:text-[#1a1652]">
                View HTML Code
              </summary>
              <pre className="mt-2 p-4 bg-white border border-[#1a1652]/20 text-[#4a4f55] text-xs rounded-lg overflow-x-auto max-h-96">
                {generatedContent}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )
}

export default function DiseaseAwarenessEmailPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-[#f9f2f8]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#1a1652] border-t-transparent"></div>
          <p className="mt-4 text-sm text-[#4a4f55]">Loading...</p>
        </div>
      </div>
    }>
      <EmailContent />
    </Suspense>
  )
}
