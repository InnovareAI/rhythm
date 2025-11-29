'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ContentItem {
  id: string
  content_type: 'imcivree-email' | 'imcivree-banner'
  audience: 'hcp' | 'patient'
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

export default function ContentHistoryPage() {
  const router = useRouter()
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [showVersions, setShowVersions] = useState(false)
  const [versions, setVersions] = useState<ContentVersion[]>([])
  const [loadingVersions, setLoadingVersions] = useState(false)

  // Ziflow feedback state
  const [ziflowFeedback, setZiflowFeedback] = useState<any>(null)
  const [loadingFeedback, setLoadingFeedback] = useState(false)

  // Filters
  const [typeFilter, setTypeFilter] = useState<'all' | 'imcivree-email' | 'imcivree-banner'>('all')
  const [audienceFilter, setAudienceFilter] = useState<'all' | 'hcp' | 'patient'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending_review' | 'approved' | 'rejected' | 'needs_changes'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchHistory()
  }, [typeFilter, audienceFilter, statusFilter])

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (typeFilter !== 'all') {
        params.set('contentType', typeFilter)
      }
      if (audienceFilter !== 'all') {
        params.set('audience', audienceFilter)
      }
      if (statusFilter !== 'all') {
        params.set('status', statusFilter)
      }
      params.set('limit', '100')

      const response = await fetch(`/api/save-content?${params}`)

      if (!response.ok) {
        throw new Error('Failed to fetch history')
      }

      const data = await response.json()
      setContent(data.content || [])
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

  const fetchZiflowFeedback = async (proofId: string) => {
    try {
      setLoadingFeedback(true)
      const response = await fetch(`/api/ziflow-feedback/${proofId}`)
      if (response.ok) {
        const data = await response.json()
        setZiflowFeedback(data)
      }
    } catch (err) {
      console.error('Error fetching Ziflow feedback:', err)
    } finally {
      setLoadingFeedback(false)
    }
  }

  // Fetch Ziflow feedback when selecting an item with a proof ID
  useEffect(() => {
    if (selectedItem?.ziflow_proof_id) {
      fetchZiflowFeedback(selectedItem.ziflow_proof_id)
    } else {
      setZiflowFeedback(null)
    }
  }, [selectedItem?.ziflow_proof_id])

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
    return item.content_type === 'imcivree-email' ? 'Email' : 'Banner'
  }

  const getAudienceLabel = (item: ContentItem) => {
    return item.audience === 'hcp' ? 'HCP' : 'Patient'
  }

  const getFocusLabel = (item: ContentItem) => {
    const focusLabels: Record<string, string> = {
      'moa': 'Mechanism of Action',
      'summary': 'Clinical Summary',
      'dosing': 'Dosing Information',
      'efficacy': 'Efficacy Data',
      'efficacy-weight': 'Weight Reduction',
      'efficacy-hunger': 'Hunger Reduction',
      'treatment': 'Treatment Journey',
      'getting-started': 'Getting Started',
      'what-to-expect': 'What to Expect',
      'support': 'Support Resources',
      'understanding': 'Understanding BBS',
      'hope': 'Path Forward'
    }
    return focusLabels[item.focus || ''] || item.focus || 'General'
  }

  // Client-side filtering for search
  const filteredContent = useMemo(() => {
    if (!searchQuery.trim()) return content
    const query = searchQuery.toLowerCase()
    return content.filter(item => {
      const focus = getFocusLabel(item).toLowerCase()
      const keyMessage = (item.key_message || '').toLowerCase()
      return focus.includes(query) || keyMessage.includes(query)
    })
  }, [content, searchQuery])

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
    a.download = `imcivree-${item.content_type.split('-')[1]}-${item.id.slice(0, 8)}.html`
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
          <Link
            href="/"
            className="text-sm text-[#4a4f55] hover:text-[#007a80]"
          >
            ← Back to Hub
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#007a80]">Content History</h1>
            <p className="text-[#4a4f55] mt-1">View and manage your generated emails and banners</p>
          </div>
          <button
            onClick={fetchHistory}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#007a80] text-white rounded-lg hover:bg-[#1c7b80]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007a80]/20 focus:border-[#007a80]"
            />
          </div>

          {/* Filter Rows */}
          <div className="flex flex-wrap gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Content Type</label>
              <div className="flex gap-1">
                {(['all', 'imcivree-email', 'imcivree-banner'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setTypeFilter(f)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      typeFilter === f
                        ? 'bg-[#007a80] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'imcivree-email' ? 'Emails' : 'Banners'}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Audience</label>
              <div className="flex gap-1">
                {(['all', 'hcp', 'patient'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setAudienceFilter(f)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      audienceFilter === f
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'hcp' ? 'HCP' : 'Patient'}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
              <div className="flex gap-1">
                {(['all', 'draft', 'pending_review', 'approved', 'needs_changes'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                      statusFilter === f
                        ? f === 'approved' ? 'bg-green-600 text-white'
                        : f === 'pending_review' ? 'bg-blue-600 text-white'
                        : f === 'needs_changes' ? 'bg-yellow-500 text-white'
                        : 'bg-gray-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {f === 'all' ? 'All' : f === 'pending_review' ? 'In Review' : f === 'needs_changes' ? 'Needs Changes' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filters count */}
          {(typeFilter !== 'all' || audienceFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
            <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Showing {filteredContent.length} of {content.length} items
              </span>
              <button
                onClick={() => {
                  setTypeFilter('all')
                  setAudienceFilter('all')
                  setStatusFilter('all')
                  setSearchQuery('')
                }}
                className="text-xs text-[#007a80] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#007a80] border-t-transparent"></div>
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
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-[#007a80]">
              {content.length === 0 ? 'No content yet' : 'No matching content'}
            </h3>
            <p className="mt-2 text-sm text-[#4a4f55]">
              {content.length === 0
                ? 'Generate some emails or banners to see them here.'
                : 'Try adjusting your search or filters.'}
            </p>
            {content.length === 0 && (
              <div className="mt-6 flex justify-center gap-4">
                <Link
                  href="/chat"
                  className="px-6 py-2 bg-[#007a80] text-white rounded-lg hover:bg-[#1c7b80]"
                >
                  Create Email
                </Link>
                <Link
                  href="/banner-generator"
                  className="px-6 py-2 border border-[#007a80] text-[#007a80] rounded-lg hover:bg-[#007a80]/5"
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
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                {/* Preview */}
                <div className="h-40 bg-gray-50 relative overflow-hidden">
                  {item.content_type === 'imcivree-banner' ? (
                    <iframe
                      srcDoc={item.html_content}
                      className="w-full h-full pointer-events-none"
                      style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}
                      sandbox="allow-same-origin"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <svg className="h-16 w-16 text-[#007a80]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#007a80]/10 text-[#007a80] rounded">
                      {getContentTypeLabel(item)}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                      {getAudienceLabel(item)}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#007a80] line-clamp-1">
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
                    <span className="px-2 py-0.5 text-xs font-medium bg-[#007a80]/10 text-[#007a80] rounded">
                      {getContentTypeLabel(selectedItem)}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded">
                      {getAudienceLabel(selectedItem)}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${getStatusColor(selectedItem.status)}`}>
                      {getStatusLabel(selectedItem.status)}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-[#007a80]">{getFocusLabel(selectedItem)}</h2>
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
                          ? 'bg-purple-100 text-purple-700'
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
                <div className="p-4 bg-purple-50 border-b border-purple-100">
                  <h3 className="text-sm font-semibold text-purple-800 mb-3">Version History</h3>
                  {loadingVersions ? (
                    <div className="text-center py-4">
                      <div className="h-6 w-6 mx-auto animate-spin rounded-full border-2 border-purple-600 border-t-transparent"></div>
                    </div>
                  ) : versions.length === 0 ? (
                    <p className="text-sm text-purple-600">No version history available</p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-auto">
                      {versions.map((v) => (
                        <div
                          key={v.id}
                          className="flex items-center justify-between p-2 bg-white rounded-lg border border-purple-100"
                        >
                          <div>
                            <span className="text-sm font-medium text-purple-800">v{v.version_number}</span>
                            <span className="text-xs text-gray-500 ml-2">{formatDate(v.created_at)}</span>
                            {v.change_notes && (
                              <p className="text-xs text-gray-600 mt-0.5">{v.change_notes}</p>
                            )}
                            <span className="text-xs text-purple-600 ml-2">({v.change_source})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Ziflow Feedback Panel */}
              {selectedItem.ziflow_proof_id && (
                <div className="p-4 bg-blue-50 border-b border-blue-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      MLR Review Feedback
                    </h3>
                    {ziflowFeedback?.proofUrl && (
                      <a
                        href={ziflowFeedback.proofUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View in Ziflow →
                      </a>
                    )}
                  </div>
                  {loadingFeedback ? (
                    <div className="text-center py-4">
                      <div className="h-6 w-6 mx-auto animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  ) : ziflowFeedback?.comments?.length > 0 ? (
                    <div className="space-y-2 max-h-48 overflow-auto">
                      {ziflowFeedback.comments.map((comment: any) => (
                        <div
                          key={comment.id}
                          className="p-3 bg-white rounded-lg border border-blue-100"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-blue-800">
                              {comment.authorName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {comment.createdAt && formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 bg-white rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-600">
                        {ziflowFeedback?.status === 'in_progress'
                          ? 'Waiting for reviewer feedback...'
                          : 'No comments yet'}
                      </p>
                      <button
                        onClick={() => selectedItem.ziflow_proof_id && fetchZiflowFeedback(selectedItem.ziflow_proof_id)}
                        className="mt-2 text-xs text-blue-700 hover:underline"
                      >
                        Refresh
                      </button>
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
                      height: selectedItem.content_type === 'imcivree-banner' ? '250px' : '600px',
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
                        html_content: selectedItem.html_content,
                        ziflow_proof_id: selectedItem.ziflow_proof_id,
                        ziflow_feedback: ziflowFeedback
                      }))
                      // Navigate to the appropriate generator
                      router.push(selectedItem.content_type === 'imcivree-email' ? '/chat' : '/chat?type=banner')
                    }}
                    className="flex items-center gap-1 px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {ziflowFeedback?.comments?.length > 0 ? 'Address Feedback' : 'Edit / Create Revision'}
                  </button>
                  <button
                    onClick={() => copyHtml(selectedItem)}
                    className="px-4 py-2 text-sm border border-[#007a80] text-[#007a80] rounded-lg hover:bg-[#007a80]/5"
                  >
                    Copy HTML
                  </button>
                  <button
                    onClick={() => downloadHtml(selectedItem)}
                    className="px-4 py-2 text-sm bg-[#007a80] text-white rounded-lg hover:bg-[#1c7b80]"
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
