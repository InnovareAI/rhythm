'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { DA_EMAIL_TYPES, getDATemplate, hasDATemplate } from '@/lib/content-templates/disease-awareness-emails'

// Target HCP segments for disease awareness
const HCP_SEGMENTS = [
  { id: 'endocrinologist', name: 'Endocrinologist', description: 'Hormone and metabolic specialists' },
  { id: 'pediatrician', name: 'Pediatrician', description: 'Pediatric care providers' },
  { id: 'obesity-specialist', name: 'Obesity Specialist', description: 'Obesity & nutrition specialists' },
]

export default function DiseaseAwarenessEmailGenerator() {
  const [emailType, setEmailType] = useState<string>('hcp-what-is-aho')
  const [hcpSegment, setHcpSegment] = useState<string>('endocrinologist')
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
            <span className="text-sm font-medium text-[#1a1652]">Disease Awareness</span>
          </div>
          <div className="flex items-center gap-4">
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
        {step === 'select' && (
          <>
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

            {/* Target HCP Segments Info */}
            <div className="mb-8 p-4 rounded-xl bg-[#1a1652]/5 border border-[#1a1652]/10">
              <h3 className="font-semibold text-[#1a1652] mb-2">Target HCP Segments</h3>
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

            {/* HCP Segment Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#4a4f55] mb-2">
                HCP Segment
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {HCP_SEGMENTS.map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setHcpSegment(segment.id)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      hcpSegment === segment.id
                        ? 'border-[#00a7df] bg-[#c9f1fe]/20 ring-1 ring-[#00a7df]'
                        : 'border-[#1a1652]/20 hover:border-[#00a7df]/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        hcpSegment === segment.id ? 'bg-[#00a7df]' : 'bg-gray-300'
                      }`} />
                      <span className="font-medium text-[#1a1652] text-sm">{segment.name}</span>
                    </div>
                    <p className="text-xs text-[#4a4f55] mt-1 ml-5">{segment.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#4a4f55] mb-2">
                Email Type
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {DA_EMAIL_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setEmailType(type.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      emailType === type.id
                        ? 'border-[#00a7df] bg-[#c9f1fe]/20'
                        : 'border-[#1a1652]/20 hover:border-[#00a7df]/50'
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
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateEmail}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
              >
                Generate Email
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </>
        )}

        {(step === 'generating' || step === 'preview') && (
          <div className="fixed inset-0 top-[65px] flex">
            {/* Left: Code Generation */}
            <div className="w-1/2 bg-[#1a1652] p-6 overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1652] to-[#00a7df] border border-[#00a7df]/30">
                    <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span className="text-[#00a7df] font-mono text-sm font-medium">HTML Output</span>
                  {isGenerating && (
                    <span className="text-[#c9f1fe] text-xs animate-pulse">Generating...</span>
                  )}
                </div>
                {step === 'preview' && (
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="text-xs text-[#c9f1fe] hover:text-white transition-colors px-3 py-1 rounded border border-[#c9f1fe]/30 hover:border-[#c9f1fe]"
                    >
                      Copy
                    </button>
                    <button
                      onClick={downloadHtml}
                      className="text-xs bg-[#00a7df] text-white hover:bg-[#00a7df]/80 transition-colors px-3 py-1 rounded"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
              <pre className="text-[#c9f1fe] text-xs font-mono overflow-auto flex-1 whitespace-pre-wrap bg-[#0f0d2e] rounded-lg p-4">
                {streamingContent || generatedContent || '// Generating...'}
              </pre>

              {step === 'preview' && (
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {
                      setStep('select')
                      setGeneratedContent(null)
                      setStreamingContent('')
                    }}
                    className="inline-flex items-center rounded-full border-2 border-[#c9f1fe]/30 px-4 py-2 text-[#c9f1fe] text-sm font-medium transition-colors hover:border-[#c9f1fe] hover:bg-[#c9f1fe]/10"
                  >
                    ← Create Another
                  </button>
                  <Link
                    href="/disease-awareness"
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-[#00a7df] to-[#1a1652] px-4 py-2 text-white text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    Back to Hub
                  </Link>
                </div>
              )}
            </div>

            {/* Right: Email Preview */}
            <div className="w-1/2 bg-white p-6 overflow-auto border-l border-[#1a1652]/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#1a1652]">Email Preview</h3>
                {isGenerating && (
                  <span className="text-[#00a7df] text-sm animate-pulse">Generating...</span>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 min-h-[500px]">
                {(streamingContent || generatedContent) ? (
                  <iframe
                    ref={previewRef}
                    srcDoc={streamingContent || generatedContent || ''}
                    className="w-full h-[600px] border-0"
                    title="Email Preview"
                  />
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
        )}
      </main>
    </div>
  )
}
