'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ContentItem {
  id: string
  content_type: 'imcivree-email' | 'imcivree-banner'
  audience: 'hcp' | 'patient'
  focus: string | null
  html_content: string
  status: string
  ziflow_proof_id: string | null
  created_at: string
}

interface ZiflowComment {
  id: string
  text: string
  authorName: string
  createdAt: string
}

export default function ReviewsPage() {
  const router = useRouter()
  const [content, setContent] = useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [feedbackMap, setFeedbackMap] = useState<Record<string, any>>({})

  useEffect(() => {
    fetchPendingReviews()
  }, [])

  const fetchPendingReviews = async () => {
    try {
      setIsLoading(true)
      // Fetch content that's been submitted for review
      const response = await fetch('/api/save-content?status=pending_review&limit=50')
      if (response.ok) {
        const data = await response.json()
        const items = data.content || []
        setContent(items)

        // Fetch feedback for each item with a proof ID
        for (const item of items) {
          if (item.ziflow_proof_id) {
            fetchFeedback(item.ziflow_proof_id)
          }
        }
      }
    } catch (err) {
      console.error('Error fetching reviews:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFeedback = async (proofId: string) => {
    try {
      const response = await fetch(`/api/ziflow-feedback/${proofId}`)
      if (response.ok) {
        const data = await response.json()
        setFeedbackMap(prev => ({ ...prev, [proofId]: data }))
      }
    } catch (err) {
      console.error('Error fetching feedback:', err)
    }
  }

  const openReviewSession = (item: ContentItem) => {
    // Store content and feedback for the chat page to pick up
    const feedback = item.ziflow_proof_id ? feedbackMap[item.ziflow_proof_id] : null
    sessionStorage.setItem('reviewSession', JSON.stringify({
      content: item,
      feedback: feedback
    }))
    // Navigate to chat with review mode
    router.push(`/chat?review=${item.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFocusLabel = (focus: string | null) => {
    const labels: Record<string, string> = {
      'moa': 'Mechanism of Action',
      'summary': 'Clinical Summary',
      'dosing': 'Dosing',
      'efficacy': 'Efficacy Data',
      'efficacy-weight': 'Weight Reduction',
      'efficacy-hunger': 'Hunger Reduction',
    }
    return labels[focus || ''] || focus || 'General'
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
            <span className="text-lg font-medium text-[#007a80]">
              Ziflow Reviews
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

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#007a80]">MLR Review Feedback</h1>
          <p className="text-[#4a4f55] mt-1">Content awaiting review or with reviewer comments</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#007a80] border-t-transparent"></div>
            <p className="mt-4 text-sm text-[#4a4f55]">Loading reviews...</p>
          </div>
        ) : content.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-[#007a80]">No content in review</h3>
            <p className="mt-2 text-sm text-[#4a4f55]">
              Submit content to Ziflow to see it here.
            </p>
            <Link
              href="/chat"
              className="mt-6 inline-block px-6 py-2 bg-[#007a80] text-white rounded-lg hover:bg-[#1c7b80]"
            >
              Create Content
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {content.map((item) => {
              const feedback = item.ziflow_proof_id ? feedbackMap[item.ziflow_proof_id] : null
              const hasComments = feedback?.comments?.length > 0

              return (
                <div
                  key={item.id}
                  onClick={() => openReviewSession(item)}
                  className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all hover:shadow-lg ${
                    hasComments ? 'border-orange-300 hover:border-orange-400' : 'border-[#007a80]/30 hover:border-[#007a80]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Preview Thumbnail */}
                    <div className="w-24 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.content_type === 'imcivree-banner' ? (
                        <iframe
                          srcDoc={item.html_content}
                          className="w-full h-full pointer-events-none"
                          style={{ transform: 'scale(0.15)', transformOrigin: 'top left', width: '666%', height: '666%' }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <svg className="h-8 w-8 text-[#007a80]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                          item.content_type === 'imcivree-email' ? 'bg-[#007a80]/10 text-[#007a80]' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.content_type === 'imcivree-email' ? 'Email' : 'Banner'}
                        </span>
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                          {item.audience.toUpperCase()}
                        </span>
                        {hasComments && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-orange-100 text-orange-700 rounded flex items-center gap-1">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            {feedback.comments.length} comment{feedback.comments.length > 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-[#007a80] truncate">
                        {getFocusLabel(item.focus)}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted {formatDate(item.created_at)}
                      </p>

                      {/* Preview of first comment */}
                      {hasComments && (
                        <div className="mt-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                          <p className="text-xs text-orange-800 font-medium">{feedback.comments[0].authorName}:</p>
                          <p className="text-xs text-gray-700 line-clamp-1">{feedback.comments[0].text}</p>
                        </div>
                      )}
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 self-center">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
