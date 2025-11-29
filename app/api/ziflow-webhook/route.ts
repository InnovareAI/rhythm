import { NextRequest, NextResponse } from 'next/server'

/**
 * Ziflow Webhook Events:
 * - proof.processed: Proof is ready for review
 * - proof.commented: New comment added
 * - proof.decision: Decision made (approved/rejected/changes_requested)
 * - proof.stage_changed: Workflow stage changed
 */

interface ZiflowWebhookPayload {
  event: string
  proof: {
    id: string
    name: string
    status: string
    current_stage?: string
    decision?: 'approved' | 'rejected' | 'changes_requested'
  }
  comments?: Array<{
    id: string
    author: {
      name: string
      email: string
    }
    content: string
    created_at: string
    annotation?: {
      page: number
      x: number
      y: number
    }
  }>
  timestamp: string
}

// In-memory store for feedback (use database in production)
const feedbackStore = new Map<string, {
  proofId: string
  proofName: string
  status: string
  decision?: string
  comments: Array<{
    author: string
    content: string
    timestamp: string
  }>
  receivedAt: string
}>()

/**
 * POST /api/ziflow-webhook
 *
 * Receives webhook events from Ziflow
 * Configure in Ziflow: Settings > Integrations > Webhooks
 * Webhook URL: https://your-domain.com/api/ziflow-webhook
 */
export async function POST(request: NextRequest) {
  try {
    const payload: ZiflowWebhookPayload = await request.json()

    console.log('Ziflow webhook received:', payload.event, payload.proof?.name)

    const proofId = payload.proof?.id
    if (!proofId) {
      return NextResponse.json({ error: 'Missing proof ID' }, { status: 400 })
    }

    // Get existing feedback or create new entry
    const existing = feedbackStore.get(proofId) || {
      proofId,
      proofName: payload.proof.name,
      status: payload.proof.status,
      comments: [],
      receivedAt: new Date().toISOString(),
    }

    // Update based on event type
    switch (payload.event) {
      case 'proof.commented':
        if (payload.comments) {
          const newComments = payload.comments.map(c => ({
            author: c.author.name,
            content: c.content,
            timestamp: c.created_at,
          }))
          existing.comments.push(...newComments)
        }
        break

      case 'proof.decision':
        existing.decision = payload.proof.decision
        existing.status = payload.proof.status
        break

      case 'proof.stage_changed':
        existing.status = payload.proof.current_stage || payload.proof.status
        break
    }

    feedbackStore.set(proofId, existing)

    // If decision requires changes, trigger optimization
    if (payload.event === 'proof.decision' && payload.proof.decision === 'changes_requested') {
      console.log('Changes requested - ready for LLM optimization')
      // Could trigger automatic optimization here
    }

    return NextResponse.json({
      received: true,
      event: payload.event,
      proofId,
    })
  } catch (error: any) {
    console.error('Ziflow webhook error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ziflow-webhook?proofId=xxx
 *
 * Retrieve collected feedback for a proof
 */
export async function GET(request: NextRequest) {
  const proofId = request.nextUrl.searchParams.get('proofId')

  if (proofId) {
    const feedback = feedbackStore.get(proofId)
    if (!feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }
    return NextResponse.json(feedback)
  }

  // Return all feedback entries
  const allFeedback = Array.from(feedbackStore.entries()).map(([id, data]) => ({
    id,
    ...data,
  }))

  return NextResponse.json({ feedback: allFeedback })
}
