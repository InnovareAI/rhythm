'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { DA_BANNER_FOCUS, getDABannerTemplate, hasDABannerTemplate } from '@/lib/content-templates/disease-awareness-banners'

export default function DiseaseAwarenessBannerGenerator() {
  const [bannerFocus, setBannerFocus] = useState<string>('disease-education')
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
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/disease-awareness" className="text-[#00a7df] hover:text-[#1a1652] transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-[#1a1652]">Disease Awareness Banner Generator</h1>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1652]">Create HCP Education Banner</h2>
              <p className="mt-2 text-[#4a4f55]">Select a focus area for your 728x250 animated banner</p>
            </div>

            {/* Banner Specs Info */}
            <div className="mb-6 p-4 rounded-xl bg-[#1a1652]/5 border border-[#1a1652]/10">
              <h3 className="font-semibold text-[#1a1652] mb-2">Banner Specifications</h3>
              <ul className="text-sm text-[#4a4f55] space-y-1">
                <li>• Dimensions: 728 x 250 pixels (IAB Leaderboard)</li>
                <li>• 5 frames with smooth fade transitions</li>
                <li>• Scrolling references bar at bottom</li>
                <li>• Purple/teal color scheme</li>
              </ul>
            </div>

            <div className="space-y-4">
              {DA_BANNER_FOCUS.map((focus) => (
                <button
                  key={focus.id}
                  onClick={() => setBannerFocus(focus.id)}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    bannerFocus === focus.id
                      ? 'border-[#00a7df] bg-[#c9f1fe]/20'
                      : 'border-[#1a1652]/20 hover:border-[#00a7df]/50'
                  }`}
                >
                  <h3 className="font-semibold text-[#1a1652]">{focus.name}</h3>
                </button>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={generateBanner}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-8 py-3 text-white font-semibold transition-opacity hover:opacity-90"
              >
                Generate Banner
                <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
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
