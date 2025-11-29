import { NextRequest, NextResponse } from 'next/server'
import { getZiflowClient } from '@/lib/ziflow'

/**
 * GET /api/ziflow-feedback/[proofId]
 *
 * Fetch comments and review status from Ziflow for a proof
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ proofId: string }> }
) {
  try {
    const { proofId } = await params

    if (!proofId) {
      return NextResponse.json(
        { error: 'Proof ID required' },
        { status: 400 }
      )
    }

    const client = getZiflowClient()

    // Fetch proof details and comments in parallel
    const [proof, comments] = await Promise.all([
      client.getProof(proofId),
      fetchComments(proofId)
    ])

    return NextResponse.json({
      proofId,
      name: proof.name,
      status: proof.status,
      comments: comments,
      proofUrl: `https://3cubed-1.ziflow.io/proof/${proofId}`,
    })
  } catch (error: any) {
    console.error('[ZIFLOW FEEDBACK] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

// Fetch comments from Ziflow API
async function fetchComments(proofId: string) {
  const apiKey = process.env.ZIFLOW_API_KEY
  if (!apiKey) {
    throw new Error('ZIFLOW_API_KEY not set')
  }

  const response = await fetch(
    `https://api.ziflow.io/v1/proofs/${proofId}/comments`,
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    console.error('[ZIFLOW] Comments fetch error:', error)
    return []
  }

  const data = await response.json()

  // Transform comments to a simpler format
  // Ziflow comment structure: "comment" field contains the text, "reviewer" contains author info
  return (data || []).map((c: any) => ({
    id: c.id,
    text: c.comment || c.body || c.message || c.text || c.content || '',
    author: c.reviewer?.email || c.author?.email || 'Reviewer',
    authorName: c.reviewer?.email?.split('@')[0] || 'Reviewer',
    createdAt: c.created_at || c.createdAt,
    status: c.comment_resolve?.type || 'unresolved',
    page: c.location?.page || 1,
  }))
}
