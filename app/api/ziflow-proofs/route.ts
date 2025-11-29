import { NextRequest, NextResponse } from 'next/server'
import { getZiflowClient } from '@/lib/ziflow'

/**
 * GET /api/ziflow-proofs
 *
 * List all proofs from Ziflow
 */
export async function GET(request: NextRequest) {
  try {
    const client = getZiflowClient()
    const proofs = await client.listProofs()

    return NextResponse.json({
      success: true,
      count: proofs.length,
      proofs
    })
  } catch (error: any) {
    console.error('[ZIFLOW PROOFS] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to list proofs' },
      { status: 500 }
    )
  }
}
