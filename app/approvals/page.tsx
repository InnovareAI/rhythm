'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ZiflowComment = {
  id: string
  feedback_id: string
  ziflow_comment_id: string
  author_name: string
  author_email: string
  content: string
  annotation_page?: number
  annotation_x?: number
  annotation_y?: number
  comment_created_at: string
  created_at: string
}

type ApprovalItem = {
  id: string
  proof_id: string
  proof_name: string
  status: string
  decision?: 'approved' | 'rejected' | 'changes_requested'
  current_stage?: string
  last_event: string
  created_at: string
  updated_at: string
  comments?: ZiflowComment[]
}

export default function ApprovalsPage() {
  const [items, setItems] = useState<ApprovalItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)

  useEffect(() => {
    fetchApprovals()
  }, [])

  const fetchApprovals = async () => {
    try {
      const response = await fetch('/api/ziflow-webhook')
      const data = await response.json()
      setItems(data.feedback || [])
    } catch (error) {
      console.error('Failed to fetch approvals:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (item: ApprovalItem) => {
    if (item.decision === 'approved') return 'bg-green-100 text-green-800'
    if (item.decision === 'changes_requested') return 'bg-yellow-100 text-yellow-800'
    if (item.decision === 'rejected') return 'bg-red-100 text-red-800'
    return 'bg-blue-100 text-blue-800'
  }

  const getStatusLabel = (item: ApprovalItem) => {
    if (item.decision === 'approved') return 'Approved'
    if (item.decision === 'changes_requested') return 'Needs Changes'
    if (item.decision === 'rejected') return 'Rejected'
    return 'Pending Review'
  }

  const handleOptimize = async (item: ApprovalItem) => {
    const commentCount = item.comments?.length || 0
    if (commentCount === 0) {
      alert('No feedback available to optimize')
      return
    }

    setIsOptimizing(true)
    setSelectedItem(item)

    try {
      // This would call the optimize endpoint with the original content
      // For now, show a placeholder
      alert(`Optimization would use ${commentCount} feedback comments to improve the content.`)
    } catch (error) {
      console.error('Optimization error:', error)
    } finally {
      setIsOptimizing(false)
    }
  }

  // Group items by status
  const pendingItems = items.filter(i => !i.decision)
  const needsChangesItems = items.filter(i => i.decision === 'changes_requested')
  const approvedItems = items.filter(i => i.decision === 'approved')

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
              Approval Queue
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/content-history"
              className="flex items-center gap-1 text-sm text-[#4a4f55] hover:text-[#007a80]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
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

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#007a80]">Approval Queue</h1>
            <p className="text-[#4a4f55] mt-1">Track content submissions and MLR feedback</p>
          </div>
          <button
            onClick={fetchApprovals}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-[#007a80] text-white rounded-lg hover:bg-[#1c7b80]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#007a80] border-t-transparent"></div>
            <p className="mt-4 text-sm text-[#4a4f55]">Loading approvals...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-[#007a80]">No submissions yet</h3>
            <p className="mt-2 text-sm text-[#4a4f55]">
              Generate emails or banners and click "Submit to Ziflow" to start the approval process.
            </p>
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
          </div>
        ) : (
          <div className="space-y-8">
            {/* Needs Changes Section */}
            {needsChangesItems.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-yellow-700 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Needs Changes ({needsChangesItems.length})
                </h2>
                <div className="grid gap-4">
                  {needsChangesItems.map((item) => (
                    <div key={item.proof_id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#007a80]">{item.proof_name}</h3>
                          <p className="text-sm text-[#4a4f55] mt-1">
                            {item.comments?.length || 0} feedback comment{(item.comments?.length || 0) !== 1 ? 's' : ''}
                          </p>
                        </div>
                        <button
                          onClick={() => handleOptimize(item)}
                          disabled={isOptimizing}
                          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Optimize with AI
                        </button>
                      </div>
                      {(item.comments?.length || 0) > 0 && (
                        <div className="mt-4 space-y-2">
                          {item.comments?.map((comment) => (
                            <div key={comment.id} className="bg-white rounded-lg p-3 border border-yellow-100">
                              <p className="text-sm text-[#4a4f55]">{comment.content}</p>
                              <p className="text-xs text-gray-400 mt-1">— {comment.author_name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pending Review Section */}
            {pendingItems.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Pending Review ({pendingItems.length})
                </h2>
                <div className="grid gap-4">
                  {pendingItems.map((item) => (
                    <div key={item.proof_id} className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#007a80]">{item.proof_name}</h3>
                          <p className="text-sm text-[#4a4f55] mt-1">
                            Submitted {new Date(item.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                          Awaiting Review
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Approved Section */}
            {approvedItems.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Approved ({approvedItems.length})
                </h2>
                <div className="grid gap-4">
                  {approvedItems.map((item) => (
                    <div key={item.proof_id} className="bg-green-50 border border-green-200 rounded-xl p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#007a80]">{item.proof_name}</h3>
                          <p className="text-sm text-[#4a4f55] mt-1">
                            Approved {new Date(item.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                          Ready to Use
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Webhook Setup Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="font-semibold text-[#007a80] mb-2">Ziflow Webhook Setup</h3>
          <p className="text-sm text-[#4a4f55] mb-4">
            To receive real-time feedback from Ziflow, configure a webhook in your Ziflow settings:
          </p>
          <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm">
            <span className="text-gray-500">Webhook URL:</span>{' '}
            <code className="text-purple-600">https://your-domain.com/api/ziflow-webhook</code>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Events: proof.commented, proof.decision, proof.stage_changed
          </p>
        </div>
      </main>
    </div>
  )
}
