'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { DA_EMAIL_TYPES, getDATemplate, hasDATemplate } from '@/lib/content-templates/disease-awareness-emails'

export default function DiseaseAwarenessEmailGenerator() {
  const [emailType, setEmailType] = useState<string>('what-is-aho')
  const [step, setStep] = useState<'select' | 'generating' | 'preview'>('select')
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [streamingContent, setStreamingContent] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef<HTMLIFrameElement>(null)

  const generateEmail = async () => {
    setStep('generating')
    setIsGenerating(true)
    setStreamingContent('')

    // Check for pre-built template
    if (hasDATemplate(emailType)) {
      const template = getDATemplate(emailType)
      if (template) {
        // Simulate typing animation for template
        const htmlContent = template.html
        const totalChars = htmlContent.length
        const totalDuration = 3000 // 3 seconds
        const startTime = performance.now()

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / totalDuration, 1)
          const easedProgress = 1 - (1 - progress) * (1 - progress) // easeOutQuad
          const currentIndex = Math.floor(easedProgress * totalChars)
          setStreamingContent(htmlContent.substring(0, currentIndex))

          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            setGeneratedContent(htmlContent)
            setStep('preview')
            setIsGenerating(false)
          }
        }
        requestAnimationFrame(animate)
        return
      }
    }

    // Fallback: No template found
    setGeneratedContent('<p>Template not found</p>')
    setStep('preview')
    setIsGenerating(false)
  }

  const downloadHtml = () => {
    if (!generatedContent) return
    const blob = new Blob([generatedContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `disease-awareness-${emailType}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    if (!generatedContent) return
    await navigator.clipboard.writeText(generatedContent)
    alert('HTML copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f2f8] via-white to-[#f9f2f8]">
      {/* Header */}
      <header className="border-b border-[#1a1652]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/disease-awareness" className="text-[#00a7df] hover:text-[#1a1652] transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-[#1a1652]">Disease Awareness Email Generator</h1>
            </div>
            <span className="text-sm font-medium text-[#1a1652]/60">HCP Education</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {step === 'select' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
                  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1652]">Create HCP Education Email</h2>
              <p className="mt-2 text-[#4a4f55]">Select an email type to generate disease awareness content</p>
            </div>

            <div className="space-y-4">
              {DA_EMAIL_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setEmailType(type.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    emailType === type.id
                      ? 'border-[#00a7df] bg-[#c9f1fe]/20'
                      : 'border-[#1a1652]/20 hover:border-[#00a7df]/50'
                  }`}
                >
                  <h3 className="font-semibold text-[#1a1652]">{type.name}</h3>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={generateEmail}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-8 py-3 text-white font-semibold transition-opacity hover:opacity-90"
              >
                Generate Email
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {(step === 'generating' || step === 'preview') && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Preview */}
            <div className="bg-[#1a1652] rounded-xl p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#00a7df] font-mono text-sm">HTML Output</span>
                {step === 'preview' && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-xs text-[#c9f1fe] hover:text-white transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={downloadHtml}
                      className="text-xs text-[#c9f1fe] hover:text-white transition-colors"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
              <pre className="text-[#c9f1fe] text-xs font-mono overflow-auto max-h-[500px] whitespace-pre-wrap">
                {streamingContent || generatedContent || '// Generating...'}
              </pre>
            </div>

            {/* Email Preview */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1a1652] px-4 py-2 flex items-center justify-between">
                <span className="text-white text-sm font-medium">Email Preview</span>
                {isGenerating && (
                  <span className="text-[#00a7df] text-xs animate-pulse">Generating...</span>
                )}
              </div>
              <div className="h-[500px] overflow-auto">
                {(streamingContent || generatedContent) ? (
                  <iframe
                    ref={previewRef}
                    srcDoc={streamingContent || generatedContent || ''}
                    className="w-full h-full border-0"
                    title="Email Preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#4a4f55]">
                    Preview will appear here
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 'preview' && (
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => {
                setStep('select')
                setGeneratedContent(null)
                setStreamingContent('')
              }}
              className="inline-flex items-center rounded-full border-2 border-[#1a1652] px-6 py-2 text-[#1a1652] font-semibold transition-colors hover:bg-[#1a1652] hover:text-white"
            >
              Create Another
            </button>
            <Link
              href="/disease-awareness"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-6 py-2 text-white font-semibold transition-opacity hover:opacity-90"
            >
              Back to Hub
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
