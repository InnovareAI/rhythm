import { NextRequest, NextResponse } from 'next/server'
import {
  saveZiflowFeedback,
  saveZiflowComment,
  getZiflowFeedback,
  listZiflowFeedback
} from '@/lib/content-storage'

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

/**
 * POST /api/ziflow-webhook
 *
 * Receives webhook events from Ziflow and persists to Supabase
 * Configure in Ziflow: Settings > Integrations > Webhooks
 * Webhook URL: https://your-domain.com/api/ziflow-webhook
 */
export async function POST(request: NextRequest) {
  try {
    const payload: ZiflowWebhookPayload = await request.json()

    console.log('[ZIFLOW WEBHOOK] Received:', payload.event, payload.proof?.name)

    const proofId = payload.proof?.id
    if (!proofId) {
      return NextResponse.json({ error: 'Missing proof ID' }, { status: 400 })
    }

    // Save or update feedback in Supabase
    const feedback = await saveZiflowFeedback({
      proofId,
      proofName: payload.proof.name,
      status: payload.proof.status,
      decision: payload.event === 'proof.decision' ? payload.proof.decision : undefined,
      currentStage: payload.proof.current_stage,
      lastEvent: payload.event
    })

    if (!feedback) {
      console.error('[ZIFLOW WEBHOOK] Failed to save feedback')
      return NextResponse.json({ error: 'Failed to save feedback' }, { status: 500 })
    }

    // Handle comments
    if (payload.event === 'proof.commented' && payload.comments) {
      for (const comment of payload.comments) {
        await saveZiflowComment({
          feedbackId: feedback.id,
          ziflowCommentId: comment.id,
          authorName: comment.author.name,
          authorEmail: comment.author.email,
          content: comment.content,
          annotationPage: comment.annotation?.page,
          annotationX: comment.annotation?.x,
          annotationY: comment.annotation?.y,
          commentCreatedAt: comment.created_at
        })
      }
      console.log('[ZIFLOW WEBHOOK] Saved', payload.comments.length, 'comments')
    }

    // Log decision events
    if (payload.event === 'proof.decision') {
      console.log('[ZIFLOW WEBHOOK] Decision:', payload.proof.decision)
      if (payload.proof.decision === 'changes_requested') {
        console.log('[ZIFLOW WEBHOOK] Changes requested - ready for LLM optimization')
      }
    }

    return NextResponse.json({
      received: true,
      event: payload.event,
      proofId,
      feedbackId: feedback.id
    })
  } catch (error: any) {
    console.error('[ZIFLOW WEBHOOK] Error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

/**
 * GET /api/ziflow-webhook?proofId=xxx
 *
 * Retrieve feedback from Supabase
 * - ?proofId=xxx - Get specific proof feedback with comments
 * - No params - List all feedback
 * - ?decision=changes_requested - Filter by decision
 */
export async function GET(request: NextRequest) {
  try {
    const proofId = request.nextUrl.searchParams.get('proofId')
    const decision = request.nextUrl.searchParams.get('decision') as 'approved' | 'rejected' | 'changes_requested' | null

    // Get specific proof feedback
    if (proofId) {
      const feedback = await getZiflowFeedback(proofId)
      if (!feedback) {
        return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
      }
      return NextResponse.json(feedback)
    }

    // List all feedback with optional filter
    const feedbackList = await listZiflowFeedback({
      decision: decision || undefined,
      limit: 50
    })

    return NextResponse.json({ feedback: feedbackList })
  } catch (error: any) {
    console.error('[ZIFLOW WEBHOOK] GET Error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
