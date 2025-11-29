import { NextRequest, NextResponse } from 'next/server'
import {
  saveContent,
  getContent,
  listContent,
  updateContentHtml,
  updateContentStatus,
  deleteContent,
  getContentVersions,
  uploadHtmlFile,
  ContentType,
  Audience,
  ContentStatus
} from '@/lib/content-storage'

/**
 * POST /api/save-content
 *
 * Save new IMCIVREE content to Supabase
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      contentType,
      audience,
      focus,
      keyMessage,
      htmlContent,
      parentId
    } = body

    // Validate required fields
    if (!contentType || !audience || !htmlContent) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, audience, htmlContent' },
        { status: 400 }
      )
    }

    // Validate content type
    if (!['imcivree-email', 'imcivree-banner'].includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid contentType. Must be imcivree-email or imcivree-banner' },
        { status: 400 }
      )
    }

    // Validate audience
    if (!['hcp', 'patient'].includes(audience)) {
      return NextResponse.json(
        { error: 'Invalid audience. Must be hcp or patient' },
        { status: 400 }
      )
    }

    // Save the content
    const content = await saveContent({
      contentType: contentType as ContentType,
      audience: audience as Audience,
      focus,
      keyMessage,
      htmlContent,
      parentId
    })

    if (!content) {
      return NextResponse.json(
        { error: 'Failed to save content' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      content
    })
  } catch (error: any) {
    console.error('[API] Error saving content:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/save-content
 *
 * Get content by ID or list all content
 * Query params:
 * - id: Get specific content
 * - contentType: Filter by type (imcivree-email, imcivree-banner)
 * - audience: Filter by audience (hcp, patient)
 * - status: Filter by status (draft, pending_review, approved, etc.)
 * - versions: If true and id provided, return version history
 * - limit: Number of results (default 20)
 * - offset: Pagination offset
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const contentType = searchParams.get('contentType') as ContentType | null
    const audience = searchParams.get('audience') as Audience | null
    const status = searchParams.get('status') as ContentStatus | null
    const versions = searchParams.get('versions') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get single content by ID
    if (id) {
      const content = await getContent(id)

      if (!content) {
        return NextResponse.json(
          { error: 'Content not found' },
          { status: 404 }
        )
      }

      // Include version history if requested
      if (versions) {
        const versionHistory = await getContentVersions(id)
        return NextResponse.json({
          content,
          versions: versionHistory
        })
      }

      return NextResponse.json({ content })
    }

    // List content with filters
    const contentList = await listContent({
      contentType: contentType || undefined,
      audience: audience || undefined,
      status: status || undefined,
      limit,
      offset
    })

    return NextResponse.json({
      content: contentList,
      pagination: {
        limit,
        offset,
        count: contentList.length
      }
    })
  } catch (error: any) {
    console.error('[API] Error fetching content:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/save-content
 *
 * Update existing content
 * Body:
 * - id: Content ID (required)
 * - htmlContent: Updated HTML (optional, creates new version)
 * - status: Updated status (optional)
 * - changeNotes: Notes about the change (optional)
 * - changeSource: user | ai_optimization | mlr_feedback (optional)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, htmlContent, status, changeNotes, changeSource, ziflowProofId } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    // Check if content exists
    const existing = await getContent(id)
    if (!existing) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    // Update HTML content (creates new version)
    if (htmlContent) {
      const success = await updateContentHtml(
        id,
        htmlContent,
        changeNotes,
        changeSource || 'user'
      )

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to update content' },
          { status: 500 }
        )
      }
    }

    // Update status
    if (status || ziflowProofId) {
      const success = await updateContentStatus(
        id,
        status || existing.status,
        ziflowProofId
      )

      if (!success) {
        return NextResponse.json(
          { error: 'Failed to update status' },
          { status: 500 }
        )
      }
    }

    // Get updated content
    const updatedContent = await getContent(id)

    return NextResponse.json({
      success: true,
      content: updatedContent
    })
  } catch (error: any) {
    console.error('[API] Error updating content:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/save-content?id=xxx
 *
 * Delete content by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Content ID is required' },
        { status: 400 }
      )
    }

    const success = await deleteContent(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete content' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      deleted: id
    })
  } catch (error: any) {
    console.error('[API] Error deleting content:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
