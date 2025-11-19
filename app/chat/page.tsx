'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type ContentType = 'hcp-email' | 'social-media' | 'patient-email' | 'video'

function ChatContent() {
  const searchParams = useSearchParams()
  const contentType = (searchParams?.get('type') as ContentType) || 'hcp-email'

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)

  useEffect(() => {
    // Initialize conversation with greeting
    const greetings: Record<ContentType, string> = {
      'hcp-email': `Hi! I'll help you create a compliant HCP email for IMCIVREE. Let's start with a few questions.\n\nWhat type of HCP email would you like to create?\n1. Mechanism of Action (MOA)\n2. Clinical Summary\n3. Dosing Information\n\nJust tell me the type or number.`,
      'social-media': `Hi! I'll help you create compliant social media content for IMCIVREE. Let's gather some information.\n\nWhich platform are you creating content for?\n1. Facebook\n2. Instagram\n3. X (Twitter)\n\nJust tell me the platform or number.`,
      'video': `Hi! I'll help you create a short video script and concept for IMCIVREE.\n\nWhat type of video would you like to create?\n1. Patient Story/Testimonial\n2. Disease Education (BBS Overview)\n3. Product Mechanism Animation\n4. Social Media Reel (15-30 sec)\n\nJust tell me the type or number.`,
      'patient-email': 'Hi! Patient email generation is coming soon. Please select another content type for now.'
    }

    setMessages([
      { role: 'assistant', content: greetings[contentType] }
    ])
  }, [contentType])

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
          contentType
        })
      })

      if (!response.ok) throw new Error('Failed to get response')

      const data = await response.json()

      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])

      if (data.generatedContent) {
        setGeneratedContent(data.generatedContent)
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

  const getContentTypeLabel = (type: ContentType) => {
    const labels = {
      'hcp-email': 'HCP Email',
      'social-media': 'Social Media',
      'video': 'Short Video',
      'patient-email': 'Patient Email'
    }
    return labels[type] || type
  }

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-[#FF6B35]">
              3cubed
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <span className="text-sm font-medium text-gray-600">
              {getContentTypeLabel(contentType)}
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← Back
          </Link>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
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
                        ? 'bg-[#FF6B35] text-white'
                        : 'bg-white text-gray-900 shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF6B35]" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF6B35]" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 animate-bounce rounded-full bg-[#FF6B35]" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-4">
            <form onSubmit={sendMessage} className="mx-auto max-w-3xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:border-[#FF6B35] focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 disabled:bg-gray-100"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E65A2B] disabled:bg-gray-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Panel */}
        {generatedContent && (
          <div className="w-1/2 border-l border-gray-200 bg-white p-6 overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedContent)
                  alert('Content copied to clipboard!')
                }}
                className="text-sm text-[#FF6B35] hover:text-[#E65A2B]"
              >
                Copy
              </button>
            </div>
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: generatedContent }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#FF6B35] border-t-transparent"></div>
          <p className="mt-4 text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  )
}
