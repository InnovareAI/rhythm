'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Conversation {
  id: string
  content_type: 'imcivree-email' | 'imcivree-banner'
  state: {
    audience?: string
    emailType?: string
    bannerFocus?: string
    keyMessage?: string
  }
  messages: Array<{
    role: string
    content: string
  }>
  generated_content?: string
  created_at: string
}

export default function ContentHistoryPage() {
  const [content, setContent] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<Conversation | null>(null)
  const [filter, setFilter] = useState<'all' | 'imcivree-email' | 'imcivree-banner'>('all')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/conversations')

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      setContent(data.conversations || [])
      setError(null)
    } catch (err: any) {
      console.error('Error fetching history:', err)
      setError(err.message || 'Failed to load content history')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getContentTypeLabel = (item: Conversation) => {
    if (item.content_type === 'imcivree-email') {
      return 'Email'
    }
    if (item.content_type === 'imcivree-banner') {
      return 'Banner'
    }
    return 'Content'
  }

  const getAudienceLabel = (item: Conversation) => {
    return item.state?.audience === 'hcp' ? 'HCP' : 'Patient'
  }

  const getContentTitle = (item: Conversation) => {
    if (item.content_type === 'imcivree-email') {
      const types: Record<string, string> = {
        'moa': 'Mechanism of Action',
        'summary': 'Clinical Summary',
        'dosing': 'Dosing Information',
        'efficacy': 'Efficacy Data',
        'getting-started': 'Getting Started',
        'what-to-expect': 'What to Expect',
        'support': 'Support Resources',
      }
      return types[item.state?.emailType || ''] || 'Email'
    }
    if (item.content_type === 'imcivree-banner') {
      const types: Record<string, string> = {
        'moa': 'Mechanism of Action',
        'efficacy-weight': 'Weight Reduction',
        'efficacy-hunger': 'Hunger Reduction',
        'treatment': 'Treatment Journey',
        'understanding': 'Understanding BBS',
        'hope': 'Path Forward',
        'support': 'Support Available',
      }
      return types[item.state?.bannerFocus || ''] || 'Banner'
    }
    return 'Content'
  }

  const filteredContent = content.filter(item => {
    if (filter === 'all') return true
    return item.content_type === filter
  })

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('HTML copied to clipboard!')
  }

  const downloadHtml = (item: Conversation) => {
    if (!item.generated_content) return
    const blob = new Blob([item.generated_content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `imcivree-${item.content_type}-${item.id}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

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
              Content History
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="rounded-lg bg-[#007a80] px-4 py-2 text-sm font-medium text-white hover:bg-[#1c7b80]"
            >
              Create Email
            </Link>
            <Link
              href="/banner-generator"
              className="rounded-lg border border-[#007a80] px-4 py-2 text-sm font-medium text-[#007a80] hover:bg-[#007a80]/5"
            >
              Create Banner
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

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#007a80]">Content History</h1>
          <p className="mt-2 text-[#4a4f55]">
            View and download all your generated emails and banners
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 border-b border-[#007a80]/10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'border-b-2 border-[#007a80] text-[#007a80]'
                : 'text-[#4a4f55] hover:text-[#007a80]'
            }`}
          >
            All Content ({content.length})
          </button>
          <button
            onClick={() => setFilter('imcivree-email')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'imcivree-email'
                ? 'border-b-2 border-[#007a80] text-[#007a80]'
                : 'text-[#4a4f55] hover:text-[#007a80]'
            }`}
          >
            Emails ({content.filter(c => c.content_type === 'imcivree-email').length})
          </button>
          <button
            onClick={() => setFilter('imcivree-banner')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'imcivree-banner'
                ? 'border-b-2 border-[#007a80] text-[#007a80]'
                : 'text-[#4a4f55] hover:text-[#007a80]'
            }`}
          >
            Banners ({content.filter(c => c.content_type === 'imcivree-banner').length})
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#007a80] border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-4">
            <div className="font-medium text-red-800">Error</div>
            <div className="mt-1 text-sm text-red-600">{error}</div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredContent.length === 0 && (
          <div className="rounded-xl border-2 border-dashed border-[#007a80]/20 bg-white p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-[#007a80]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-[#007a80]">
              {filter === 'all' ? 'No content yet' : `No ${filter === 'imcivree-email' ? 'emails' : 'banners'} yet`}
            </h3>
            <p className="mt-2 text-sm text-[#4a4f55]">
              Start creating content to see it here
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <Link
                href="/chat"
                className="rounded-lg bg-[#007a80] px-6 py-3 text-sm font-medium text-white hover:bg-[#1c7b80]"
              >
                Create Email
              </Link>
              <Link
                href="/banner-generator"
                className="rounded-lg border border-[#007a80] px-6 py-3 text-sm font-medium text-[#007a80] hover:bg-[#007a80]/5"
              >
                Create Banner
              </Link>
            </div>
          </div>
        )}

        {/* Content Grid */}
        {!isLoading && !error && filteredContent.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer rounded-xl border border-[#007a80]/10 bg-white overflow-hidden shadow-sm transition-all hover:shadow-lg hover:border-[#007a80]/30"
                onClick={() => setSelectedItem(item)}
              >
                {/* Content Preview */}
                <div className="relative aspect-video bg-gradient-to-br from-[#f6fbfb] to-[#e8f4f4] p-4 flex items-center justify-center">
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className="rounded-full bg-[#007a80] px-2 py-0.5 text-xs font-medium text-white">
                      {getContentTypeLabel(item)}
                    </span>
                    <span className="rounded-full bg-[#007a80]/10 px-2 py-0.5 text-xs font-medium text-[#007a80]">
                      {getAudienceLabel(item)}
                    </span>
                  </div>
                  {item.content_type === 'imcivree-banner' && item.generated_content ? (
                    <div className="w-full h-full flex items-center justify-center overflow-hidden rounded">
                      <iframe
                        srcDoc={item.generated_content}
                        className="w-full h-full transform scale-50 origin-center pointer-events-none"
                        title="Banner Preview"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-[#007a80]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#007a80] truncate">{getContentTitle(item)}</h3>
                  {item.state?.keyMessage && (
                    <p className="mt-1 text-sm text-[#4a4f55] truncate">"{item.state.keyMessage}"</p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-xs text-[#4a4f55]">
                    <span>{formatDate(item.created_at)}</span>
                    <span className="text-[#007a80] font-medium group-hover:underline">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-[#007a80]/20 bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#007a80]/10 bg-white p-4 z-10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#007a80] px-2 py-0.5 text-xs font-medium text-white">
                    {getContentTypeLabel(selectedItem)}
                  </span>
                  <span className="rounded-full bg-[#007a80]/10 px-2 py-0.5 text-xs font-medium text-[#007a80]">
                    {getAudienceLabel(selectedItem)}
                  </span>
                </div>
                <h2 className="mt-2 text-xl font-bold text-[#007a80]">{getContentTitle(selectedItem)}</h2>
              </div>
              <div className="flex items-center gap-2">
                {selectedItem.generated_content && (
                  <>
                    <button
                      onClick={() => copyToClipboard(selectedItem.generated_content!)}
                      className="rounded-lg border border-[#007a80]/20 px-3 py-1.5 text-sm text-[#007a80] hover:bg-[#007a80]/5"
                    >
                      Copy HTML
                    </button>
                    <button
                      onClick={() => downloadHtml(selectedItem)}
                      className="rounded-lg bg-[#007a80] px-3 py-1.5 text-sm text-white hover:bg-[#1c7b80]"
                    >
                      Download
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="ml-2 text-[#4a4f55] hover:text-[#007a80]"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              {selectedItem.generated_content ? (
                <div className="space-y-6">
                  {/* Preview */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-[#4a4f55]">Preview</h3>
                    <div className="rounded-lg border border-[#007a80]/10 overflow-hidden bg-gray-50">
                      <iframe
                        srcDoc={selectedItem.generated_content}
                        className={`w-full ${selectedItem.content_type === 'imcivree-banner' ? 'h-[320px]' : 'h-[600px]'}`}
                        title="Content Preview"
                      />
                    </div>
                  </div>

                  {/* HTML Code */}
                  <details className="rounded-lg border border-[#007a80]/10">
                    <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-[#007a80] hover:bg-[#007a80]/5">
                      View HTML Code
                    </summary>
                    <pre className="p-4 bg-gray-50 text-xs text-[#4a4f55] overflow-x-auto max-h-96">
                      {selectedItem.generated_content}
                    </pre>
                  </details>
                </div>
              ) : (
                <div className="text-center py-12 text-[#4a4f55]">
                  <p>No generated content available for this item.</p>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-[#007a80]/10 text-sm text-[#4a4f55]">
                Created: {formatDate(selectedItem.created_at)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
