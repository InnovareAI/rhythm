'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface VideoGeneration {
  id: string
  type: 'video'
  product_name: string
  video_type: string
  target_audience: string
  image_prompt: string
  animation_prompt: string
  image_url: string
  video_url: string
  image_source: string
  created_at: string
}

interface Conversation {
  id: string
  type: 'hcp-email' | 'social-media'
  content_type: string
  state: any
  messages: Array<{
    role: string
    content: string
  }>
  created_at: string
}

type ContentItem = VideoGeneration | Conversation

export default function ContentHistoryPage() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)
  const [filter, setFilter] = useState<'all' | 'hcp-email' | 'social-media' | 'video'>('all')

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setIsLoading(true)

      // Fetch both conversations and videos in parallel
      const [conversationsRes, videosRes] = await Promise.all([
        fetch('/api/conversations'),
        fetch('/api/video-history')
      ])

      const conversationsData = conversationsRes.ok ? await conversationsRes.json() : { conversations: [] }
      const videosData = videosRes.ok ? await videosRes.json() : { videos: [] }

      // Map conversations to include type
      const conversations: Conversation[] = (conversationsData.conversations || []).map((conv: any) => ({
        ...conv,
        type: conv.content_type
      }))

      // Map videos to include type
      const videos: VideoGeneration[] = (videosData.videos || []).map((video: any) => ({
        ...video,
        type: 'video'
      }))

      // Merge and sort by created_at
      const allContent = [...conversations, ...videos].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )

      setContent(allContent)
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

  const getContentTypeLabel = (item: ContentItem) => {
    if (item.type === 'video') {
      const labels: Record<string, string> = {
        'patient-story': 'Patient Story Video',
        'education': 'Education Video',
        'mechanism': 'Mechanism Video',
        'reel': 'Social Media Reel'
      }
      return labels[(item as VideoGeneration).video_type] || 'Video'
    }
    return item.type === 'hcp-email' ? 'HCP Email' : 'Social Media Post'
  }

  const getContentTypeColor = (item: ContentItem) => {
    if (item.type === 'video') return 'text-[#FF6B35]'
    if (item.type === 'hcp-email') return 'text-[#007a80]'
    return 'text-purple-400'
  }

  const getContentTitle = (item: ContentItem) => {
    if (item.type === 'video') {
      return (item as VideoGeneration).product_name
    }
    const conv = item as Conversation
    return conv.state?.productName || conv.state?.brand || 'Content'
  }

  const filteredContent = content.filter(item => {
    if (filter === 'all') return true
    return item.type === filter
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-bold text-[#FF6B35]">
              3cubed
            </Link>
            <div className="h-6 w-px bg-gray-700" />
            <span className="text-sm font-medium text-gray-400">
              Content History
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat?type=hcp-email"
              className="rounded-lg bg-[#007a80] px-4 py-2 text-sm font-medium text-white hover:bg-[#006570]"
            >
              Create Email
            </Link>
            <Link
              href="/social-media-generator"
              className="rounded-lg bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600"
            >
              Create Social
            </Link>
            <Link
              href="/video-generator"
              className="rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#E65A2B]"
            >
              Create Video
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Content History</h1>
          <p className="mt-2 text-gray-400">
            View and download all your generated content - emails, social posts, and videos
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'border-b-2 border-[#FF6B35] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Content ({content.length})
          </button>
          <button
            onClick={() => setFilter('hcp-email')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'hcp-email'
                ? 'border-b-2 border-[#007a80] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Emails ({content.filter(c => c.type === 'hcp-email').length})
          </button>
          <button
            onClick={() => setFilter('social-media')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'social-media'
                ? 'border-b-2 border-purple-400 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Social Media ({content.filter(c => c.type === 'social-media').length})
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'video'
                ? 'border-b-2 border-[#FF6B35] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Videos ({content.filter(c => c.type === 'video').length})
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FF6B35] border-t-transparent"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-lg border border-red-500 bg-red-500/10 p-4">
            <div className="font-medium text-red-400">Error</div>
            <div className="mt-1 text-sm text-red-300">{error}</div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredContent.length === 0 && (
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-12 text-center">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-white">
              {filter === 'all' ? 'No content yet' : `No ${filter === 'hcp-email' ? 'emails' : filter === 'social-media' ? 'social posts' : 'videos'} yet`}
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Start creating content to see it here
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Link
                href="/chat?type=hcp-email"
                className="rounded-lg bg-[#007a80] px-6 py-3 text-sm font-medium text-white hover:bg-[#006570]"
              >
                Create Email
              </Link>
              <Link
                href="/social-media-generator"
                className="rounded-lg bg-purple-500 px-6 py-3 text-sm font-medium text-white hover:bg-purple-600"
              >
                Create Social Post
              </Link>
              <Link
                href="/video-generator"
                className="rounded-lg bg-[#FF6B35] px-6 py-3 text-sm font-medium text-white hover:bg-[#E65A2B]"
              >
                Create Video
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
                className="group cursor-pointer rounded-lg border border-gray-700 bg-gray-900 overflow-hidden transition-all hover:border-[#FF6B35]"
                onClick={() => setSelectedItem(item)}
              >
                {/* Content Preview */}
                {item.type === 'video' ? (
                  <div className="relative aspect-video bg-gray-800">
                    <video
                      src={(item as VideoGeneration).video_url}
                      className="h-full w-full object-cover"
                      muted
                      loop
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause()
                        e.currentTarget.currentTime = 0
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      🎬 Video
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 p-6 flex flex-col justify-center">
                    <div className="absolute top-2 right-2 rounded-lg bg-black/60 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {item.type === 'hcp-email' ? '✉️ Email' : '📱 Social'}
                    </div>
                    <div className="text-sm text-gray-400 line-clamp-4">
                      {(item as Conversation).messages.find(m => m.role === 'assistant')?.content.substring(0, 150)}...
                    </div>
                  </div>
                )}

                {/* Content Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-white truncate">{getContentTitle(item)}</h3>
                    <span className={`text-xs font-medium whitespace-nowrap ${getContentTypeColor(item)}`}>
                      {getContentTypeLabel(item)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{formatDate(item.created_at)}</span>
                    <span className="text-[#FF6B35]">View</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg border border-gray-700 bg-gray-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-700 bg-gray-900 p-4 z-10">
              <div>
                <h2 className="text-xl font-bold text-white">{getContentTitle(selectedItem)}</h2>
                <span className={`text-sm ${getContentTypeColor(selectedItem)}`}>
                  {getContentTypeLabel(selectedItem)}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedItem.type === 'video' ? (
                <>
                  {/* Video Player */}
                  <div>
                    <video
                      src={(selectedItem as VideoGeneration).video_url}
                      controls
                      loop
                      className="w-full rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <a
                      href={(selectedItem as VideoGeneration).video_url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block rounded-lg bg-[#FF6B35] px-6 py-3 text-sm font-medium text-white hover:bg-[#E65A2B]"
                    >
                      Download Video
                    </a>
                  </div>

                  {/* Source Image */}
                  {(selectedItem as VideoGeneration).image_url && (
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">Source Image</h3>
                      <img
                        src={(selectedItem as VideoGeneration).image_url}
                        alt="Source"
                        className="w-full rounded-lg border border-gray-700"
                      />
                    </div>
                  )}

                  {/* Video Details */}
                  <div className="space-y-4">
                    {(selectedItem as VideoGeneration).image_prompt && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Image Prompt</h4>
                        <p className="mt-1 text-sm text-gray-300">{(selectedItem as VideoGeneration).image_prompt}</p>
                      </div>
                    )}
                    {(selectedItem as VideoGeneration).animation_prompt && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Animation Prompt</h4>
                        <p className="mt-1 text-sm text-gray-300">{(selectedItem as VideoGeneration).animation_prompt}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-gray-400">Created</h4>
                      <p className="mt-1 text-white">{formatDate(selectedItem.created_at)}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Email/Social Media Content */}
                  <div className="prose prose-invert max-w-none">
                    {(selectedItem as Conversation).messages
                      .filter(m => m.role === 'assistant')
                      .map((msg, idx) => (
                        <div key={idx} className="whitespace-pre-wrap text-gray-300">
                          {msg.content}
                        </div>
                      ))}
                  </div>

                  {/* Generated Image for Social Media */}
                  {(selectedItem as Conversation).state?.imageUrl && (
                    <div>
                      <h3 className="mb-3 text-lg font-semibold text-white">Generated Image</h3>
                      <img
                        src={(selectedItem as Conversation).state.imageUrl}
                        alt="Generated"
                        className="w-full rounded-lg border border-gray-700"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Created</h4>
                    <p className="mt-1 text-white">{formatDate(selectedItem.created_at)}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
