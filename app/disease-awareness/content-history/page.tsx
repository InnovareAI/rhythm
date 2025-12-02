'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ContentItem {
  id: string
  content_type: 'da-email' | 'da-banner'
  audience: 'hcp'
  focus: string | null
  key_message: string | null
  html_content: string
  version: number
  status: 'draft' | 'pending_review' | 'approved' | 'rejected' | 'needs_changes'
  ziflow_proof_id: string | null
  created_at: string
  updated_at: string
}

interface ContentVersion {
  id: string
  content_id: string
  version_number: number
  html_content: string
  change_notes: string | null
  change_source: string
  created_at: string
}

export default function DAContentHistoryPage() {
  const router = useRouter()
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [showVersions, setShowVersions] = useState(false)
  const [versions, setVersions] = useState<ContentVersion[]>([])
  const [loadingVersions, setLoadingVersions] = useState(false)

  // Filters
  const [typeFilter, setTypeFilter] = useState<'all' | 'da-email' | 'da-banner'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchHistory()
  }, [typeFilter])

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      // Filter to disease-awareness content types
      if (typeFilter !== 'all') {
        params.set('contentType', typeFilter)
      }
      params.set('limit', '100')

      const response = await fetch(`/api/save-content?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      // Filter to only da- (disease awareness) content
      const daContent = (data.content || []).filter((item: ContentItem) =>
        item.content_type.startsWith('da-')
      )
      setContent(daContent)
      setError(null)
    } catch (err: any) {
      console.error('Error fetching history:', err)
      setError(err.message || 'Failed to load content history')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchVersions = async (id: string) => {
    try {
      setLoadingVersions(true)
      const response = await fetch(`/api/save-content?id=${id}&versions=true`)
      if (response.ok) {
        const data = await response.json()
        setVersions(data.versions || [])
      }
    } catch (err) {
      console.error('Error fetching versions:', err)
    } finally {
      setLoadingVersions(false)
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

  const getContentTypeLabel = (item: ContentItem) => {
    return item.content_type === 'da-email' ? 'Email' : 'Banner'
  }

  const getFocusLabel = (item: ContentItem) => {
    const focusLabels: Record<string, string> = {
      'hcp-what-is-aho': 'What is aHO',
      'hcp-mechanism': 'Hypothalamic Pathway',
      'hcp-recognition': 'Recognizing aHO',
      'hcp-cinematic-injury': 'HO from Injury',
      'hcp-cinematic-mc4r': 'MC4R Pathway',
      'hcp-cinematic-hyperphagia': 'Hyperphagia Prevalence',
      'hcp-cinematic-weight-gain': 'Weight Gain Timeline',
      'hcp-cinematic-screening': 'Early Screening',
      'hcp-disease-education': 'Disease Education',
    }
    return focusLabels[item.focus || ''] || item.focus || 'General'
  }

  // Client-side filtering for search
  const filteredContent = useMemo(() => {
    let filtered = content

    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(item => item.content_type === typeFilter)
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => {
        const focus = getFocusLabel(item).toLowerCase()
        const keyMessage = (item.key_message || '').toLowerCase()
        return focus.includes(query) || keyMessage.includes(query)
      })
    }

    return filtered
  }, [content, typeFilter, searchQuery])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending_review': return 'bg-blue-100 text-blue-800'
      case 'needs_changes': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approved'
      case 'pending_review': return 'Pending Review'
      case 'needs_changes': return 'Needs Changes'
      case 'rejected': return 'Rejected'
      default: return 'Draft'
    }
  }

  const copyHtml = async (item: ContentItem) => {
    try {
      await navigator.clipboard.writeText(item.html_content)
      alert('HTML copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const downloadHtml = (item: ContentItem) => {
    const blob = new Blob([item.html_content], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `disease-education-${item.content_type.includes('email') ? 'email' : 'banner'}-${item.id.slice(0, 8)}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const deleteContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const response = await fetch(`/api/save-content?id=${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setContent(prev => prev.filter(item => item.id !== id))
        if (selectedItem?.id === id) {
          setSelectedItem(null)
        }
      }
    } catch (err) {
      console.error('Failed to delete:', err)
    }
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
            <span className="text-lg font-medium text-[#1a1652]">
              Disease Education
            </span>
            <div className="h-6 w-px bg-[#1a1652]/20" />
            <span className="text-lg font-medium text-[#00a7df]">
              Content History
            </span>
          </div>
          <Link
            href="/disease-awareness"
            className="text-sm text-[#4a4f55] hover:text-[#1a1652]"
          >
            ← Back to Hub
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1652]">Content History</h1>
            <p className="text-[#4a4f55] mt-1">View and manage your disease education content</p>
          </div>
          <button
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-[#1a1652] to-[#00a7df] text-white rounded-lg hover:opacity-90"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-[#1a1652]/10 p-4 mb-6">
          {/* Search */}
          <div className="relative mb-4">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by focus area or key message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1652]/20 focus:border-[#1a1652]"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Content Type</label>
              <div className="flex gap-1">
                {(['all', 'da-email', 'da-banner'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypeFilter(f)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      typeFilter === f
                        ? 'bg-gradient-to-r from-[#1a1652] to-[#00a7df] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'da-email' ? 'Emails' : 'Banners'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filters count */}
          {(typeFilter !== 'all' || searchQuery) && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Showing {filteredContent.length} of {content.length} items
              </span>
              <button
                onClick={() => {
                  setTypeFilter('all')
                  setSearchQuery('')
                }}
                className="text-xs text-[#1a1652] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#1a1652] border-t-transparent"></div>
            <p className="mt-4 text-sm text-[#4a4f55]">Loading content...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchHistory}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
            >
              Try Again
            </button>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#1a1652]/10">
            <svg className="mx-auto h-16 w-16 text-[#1a1652]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-[#1a1652]">
              {content.length === 0 ? 'No content yet' : 'No matching content'}
            </h3>
            <p className="mt-2 text-sm text-[#4a4f55]">
              {content.length === 0
                ? 'Generate some disease education content to see it here.'
                : 'Try adjusting your search or filters.'}
            </p>
            {content.length === 0 && (
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  href="/disease-awareness/chat"
                  className="px-6 py-2 bg-gradient-to-r from-[#1a1652] to-[#00a7df] text-white rounded-lg hover:opacity-90"
                >
                  Create Email
                </Link>
                <Link
                  href="/disease-awareness/banner-generator"
                  className="px-6 py-2 border border-[#1a1652] text-[#1a1652] rounded-lg hover:bg-[#1a1652]/5"
                >
                  Create Banner
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#1a1652]/10 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Preview */}
                <div className="h-40 bg-gray-50 relative overflow-hidden">
                  {item.content_type === 'da-banner' ? (
                    <iframe
                      srcDoc={item.html_content}
                      className="w-full h-full pointer-events-none"
                      style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}
                      sandbox="allow-same-origin allow-scripts"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <svg className="h-16 w-16 text-[#1a1652]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#1a1652]/10 text-[#1a1652] rounded">
                      {getContentTypeLabel(item)}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#00a7df]/10 text-[#00a7df] rounded">
                      HCP
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#1a1652] line-clamp-1">
                    {getFocusLabel(item)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(item.created_at)}
                    {item.version > 1 && ` • v${item.version}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#1a1652]/10 text-[#1a1652] rounded">
                      {getContentTypeLabel(selectedItem)}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#00a7df]/10 text-[#00a7df] rounded">
                      HCP
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(selectedItem.status)}`}>
                      {getStatusLabel(selectedItem.status)}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#1a1652]">{getFocusLabel(selectedItem)}</h2>
                  <p className="text-xs text-gray-500">
                    {formatDate(selectedItem.created_at)}
                    {selectedItem.version > 1 && ` • Version ${selectedItem.version}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Version History Toggle */}
                  {selectedItem.version > 1 && (
                    <button
                      onClick={() => {
                        setShowVersions(!showVersions)
                        if (!showVersions && versions.length === 0) {
                          fetchVersions(selectedItem.id)
                        }
                      }}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                        showVersions
                          ? 'bg-[#1a1652]/10 text-[#1a1652]'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <svg className="inline h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {showVersions ? 'Hide' : 'Show'} History
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedItem(null)
                      setShowVersions(false)
                      setVersions([])
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Version History Panel */}
              {showVersions && (
                <div className="p-4 bg-[#1a1652]/5 border-b border-[#1a1652]/10">
                  <h3 className="text-sm font-semibold text-[#1a1652] mb-3">Version History</h3>
                  {loadingVersions ? (
                    <div className="text-center py-4">
                      <div className="h-6 w-6 mx-auto animate-spin rounded-full border-2 border-[#1a1652] border-t-transparent"></div>
                    </div>
                  ) : versions.length === 0 ? (
                    <p className="text-sm text-[#1a1652]/70">No version history available</p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-auto">
                      {versions.map((v) => (
                        <div
                          key={v.id}
                          className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#1a1652]/10"
                        >
                          <div>
                            <span className="text-sm font-medium text-[#1a1652]">v{v.version_number}</span>
                            <span className="text-xs text-gray-500 ml-2">{formatDate(v.created_at)}</span>
                            {v.change_notes && (
                              <p className="text-xs text-gray-600 mt-0.5">{v.change_notes}</p>
                            )}
                            <span className="text-xs text-[#00a7df] ml-2">({v.change_source})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Preview */}
              <div className="flex-1 overflow-auto p-4 bg-gray-50">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <iframe
                    srcDoc={selectedItem.html_content}
                    className="w-full"
                    style={{
                      height: selectedItem.content_type === 'da-banner' ? '320px' : '600px',
                      maxHeight: '70vh'
                    }}
                    sandbox="allow-same-origin allow-scripts"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <button
                  onClick={() => deleteContent(selectedItem.id)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Delete
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Store the content in sessionStorage for the generator to pick up
                      sessionStorage.setItem('editContent', JSON.stringify({
                        id: selectedItem.id,
                        content_type: selectedItem.content_type,
                        audience: selectedItem.audience,
                        focus: selectedItem.focus,
                        key_message: selectedItem.key_message,
                        html_content: selectedItem.html_content
                      }))
                      // Navigate to the appropriate generator
                      router.push(selectedItem.content_type === 'da-email'
                        ? '/disease-awareness/chat'
                        : '/disease-awareness/banner-generator')
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-sm bg-[#1a1652] text-white rounded-lg hover:opacity-90"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit / Create Revision
                  </button>
                  <button
                    onClick={() => copyHtml(selectedItem)}
                    className="px-4 py-2 text-sm border border-[#1a1652] text-[#1a1652] rounded-lg hover:bg-[#1a1652]/5"
                  >
                    Copy HTML
                  </button>
                  <button
                    onClick={() => downloadHtml(selectedItem)}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-[#1a1652] to-[#00a7df] text-white rounded-lg hover:opacity-90"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
