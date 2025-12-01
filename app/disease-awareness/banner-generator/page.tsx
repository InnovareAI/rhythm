'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { DA_BANNER_FOCUS, getDABannerTemplate, hasDABannerTemplate } from '@/lib/content-templates/disease-awareness-banners'

// Target HCP segments for disease awareness
const HCP_SEGMENTS = [
  { id: 'endocrinologist', name: 'Endocrinologist', description: 'Hormone and metabolic specialists' },
  { id: 'pediatrician', name: 'Pediatrician', description: 'Pediatric care providers' },
  { id: 'obesity-specialist', name: 'Obesity Specialist', description: 'Obesity & nutrition specialists' },
]

export default function DiseaseAwarenessBannerGenerator() {
  const [bannerFocus, setBannerFocus] = useState<string>('hcp-disease-education')
  const [hcpSegment, setHcpSegment] = useState<string>('endocrinologist')
  const [step, setStep] = useState<'select' | 'generating' | 'preview'>('select')
  const [generatedContent, setGeneratedContent] = useState<string | null>(null)
  const [streamingContent, setStreamingContent] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(false)
  const previewRef = useRef<HTMLIFrameElement>(null)

  const generateBanner = async () => {
    setStep('generating')
    setIsGenerating(true)
    setStreamingContent('')

    // Check for pre-built template
    if (hasDABannerTemplate(bannerFocus)) {
      const template = getDABannerTemplate(bannerFocus)
      if (template) {
        // Simulate typing animation for template
        const htmlContent = template.html
        const totalChars = htmlContent.length
        const totalDuration = 4000 // 4 seconds
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
    a.download = `disease-awareness-banner-${bannerFocus}.html`
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
              Create HCP Education Banner
            </h1>
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1a1652]/10 text-[#1a1652]">
                Acquired Hypothalamic Obesity (aHO)
              </span>
            </div>
            <p className="text-center text-[#4a4f55] mb-10">
              Select a focus area for your 728x250 animated banner
            </p>

            {/* Banner Specs Info */}
            <div className="mb-8 p-4 rounded-xl bg-[#1a1652]/5 border border-[#1a1652]/10">
              <h3 className="font-semibold text-[#1a1652] mb-2">Banner Specifications</h3>
              <ul className="text-sm text-[#4a4f55] space-y-1">
                <li>• Dimensions: 728 x 250 pixels (IAB Leaderboard)</li>
                <li>• 5 frames with smooth fade transitions</li>
                <li>• Scrolling references bar at bottom</li>
                <li>• Purple/teal color scheme</li>
              </ul>
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

            {/* Banner Focus Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-[#4a4f55] mb-2">
                Banner Focus
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {DA_BANNER_FOCUS.map((focus) => (
                  <button
                    key={focus.id}
                    onClick={() => setBannerFocus(focus.id)}
                    className={`text-left p-5 rounded-xl border-2 transition-all ${
                      bannerFocus === focus.id
                        ? 'border-[#00a7df] bg-[#c9f1fe]/20'
                        : 'border-[#1a1652]/20 hover:border-[#00a7df]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        bannerFocus === focus.id ? 'border-[#00a7df] bg-[#00a7df]' : 'border-gray-300'
                      }`}>
                        {bannerFocus === focus.id && (
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1652]">{focus.name}</h3>
                        <p className="text-sm text-[#4a4f55] mt-1">{focus.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateBanner}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-8 py-4 text-lg font-semibold text-white transition-opacity hover:opacity-90"
              >
                Generate Banner
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </>
        )}

        {(step === 'generating' || step === 'preview') && (
          <div className="space-y-8">
            {/* Banner Preview */}
            <div className="flex justify-center">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-[#1a1652] px-4 py-2 flex items-center justify-between">
                  <span className="text-white text-sm font-medium">Banner Preview (728 x 250)</span>
                  {isGenerating && (
                    <span className="text-[#00a7df] text-xs animate-pulse">Generating...</span>
                  )}
                </div>
                <div className="p-4 bg-gray-100">
                  {(streamingContent || generatedContent) ? (
                    <iframe
                      ref={previewRef}
                      srcDoc={streamingContent || generatedContent || ''}
                      className="border-0"
                      style={{ width: '728px', height: '250px' }}
                      title="Banner Preview"
                      sandbox="allow-same-origin allow-scripts"
                    />
                  ) : (
                    <div className="flex items-center justify-center text-[#4a4f55]" style={{ width: '728px', height: '250px' }}>
                      Preview will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Code Preview */}
            <div className="bg-[#1a1652] rounded-xl p-4 overflow-hidden max-w-4xl mx-auto">
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
              <pre className="text-[#c9f1fe] text-xs font-mono overflow-auto max-h-[300px] whitespace-pre-wrap">
                {streamingContent || generatedContent || '// Generating...'}
              </pre>
            </div>

            {step === 'preview' && (
              <div className="flex justify-center gap-4">
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
          </div>
        )}
      </main>
    </div>
  )
}
