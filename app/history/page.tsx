'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type Conversation = {
  id: string
  contentType: 'hcp-email' | 'social-media' | 'patient-email' | 'video'
  productName?: string
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
  generatedContent?: {
    content: string
    imageUrl?: string
    videoUrl?: string
  }
  createdAt: string
  updatedAt: string
}

export default function HistoryPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    loadConversations()
  }, [filter])

  const loadConversations = async () => {
    setIsLoading(true)
    try {
      const url = filter
        ? `/api/conversations?contentType=${filter}`
        : '/api/conversations'

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to load conversations')

      const data = await response.json()
      setConversations(data.conversations || [])
    } catch (error) {
      console.error('Error loading conversations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteConversation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this conversation?')) return

    try {
      const response = await fetch(`/api/conversations?id=${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete conversation')

      // Remove from UI
      setConversations(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting conversation:', error)
      alert('Failed to delete conversation')
    }
  }

  const getContentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'hcp-email': 'HCP Email',
      'social-media': 'Social Media',
      'video': 'Short Video',
      'patient-email': 'Patient Email'
    }
    return labels[type] || type
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

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
            <span className="text-lg font-medium text-white">
              Conversation History
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="border-b border-gray-800 bg-gray-900 px-6 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === null
                ? 'bg-[#FF6B35] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('hcp-email')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'hcp-email'
                ? 'bg-[#FF6B35] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            HCP Email
          </button>
          <button
            onClick={() => setFilter('social-media')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'social-media'
                ? 'bg-[#FF6B35] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Social Media
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'video'
                ? 'bg-[#FF6B35] text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Video
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {isLoading ? (
          <div className="text-center">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#FF6B35] border-t-transparent"></div>
            <p className="mt-4 text-sm text-gray-400">Loading conversations...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-400">No conversations found</p>
            <Link
              href="/"
              className="mt-4 inline-block text-[#FF6B35] hover:text-[#E65A2B]"
            >
              Start a new conversation →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className="rounded-lg border border-gray-800 bg-gray-900 p-4 transition-colors hover:border-gray-700"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#FF6B35]/10 px-3 py-1 text-xs font-medium text-[#FF6B35]">
                    {getContentTypeLabel(conversation.contentType)}
                  </span>
                  <button
                    onClick={() => deleteConversation(conversation.id)}
                    className="text-gray-500 hover:text-red-500"
                    title="Delete conversation"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <h3 className="mb-2 text-lg font-semibold text-white">
                  {conversation.productName || 'Untitled'}
                </h3>

                <p className="mb-3 line-clamp-2 text-sm text-gray-400">
                  {conversation.messages.find(m => m.role === 'user')?.content || 'No messages'}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatDate(conversation.createdAt)}</span>
                  <span>{conversation.messages.length} messages</span>
                </div>

                {conversation.generatedContent && (
                  <div className="mt-3 rounded bg-gray-800 p-2 text-xs text-gray-400">
                    ✓ Content generated
                    {conversation.generatedContent.imageUrl && ' • Image'}
                    {conversation.generatedContent.videoUrl && ' • Video'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
