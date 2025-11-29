import { NextRequest, NextResponse } from 'next/server'
import { getContent } from '@/lib/content-storage'

/**
 * GET /api/serve-content/[id]
 *
 * Serves the HTML content for a given content ID
 * This endpoint provides a public URL for Ziflow to download
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return new NextResponse('Content ID required', { status: 400 })
    }

    const content = await getContent(id)

    if (!content) {
      return new NextResponse('Content not found', { status: 404 })
    }

    // Return the HTML content with proper headers
    return new NextResponse(content.html_content, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `inline; filename="${id}.html"`,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error: any) {
    console.error('[SERVE CONTENT] Error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
