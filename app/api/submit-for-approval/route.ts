import { NextRequest, NextResponse } from 'next/server'
import { getZiflowClient } from '@/lib/ziflow'

/**
 * POST /api/submit-for-approval
 *
 * Submit generated content to Ziflow for MLR approval
 *
 * Body:
 * - contentType: 'email' | 'banner'
 * - name: string (proof name)
 * - htmlContent: string (the generated HTML)
 * - audience: 'hcp' | 'patient'
 * - focus?: string (e.g., 'moa', 'weight-reduction')
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentType, name, htmlContent, audience, focus } = body

    if (!contentType || !name || !htmlContent) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, name, htmlContent' },
        { status: 400 }
      )
    }

    // For Ziflow, we need to provide a URL to the file
    // We'll create a temporary blob URL or use a data URL approach
    // For production, you'd upload to S3/Cloudinary and get a public URL

    // Create a base64 data URL for the HTML content
    const base64Content = Buffer.from(htmlContent).toString('base64')
    const dataUrl = `data:text/html;base64,${base64Content}`

    // Note: Ziflow requires an accessible URL, not a data URL
    // For now, we'll store content and return a public URL
    // In production, upload to S3 or similar

    const client = getZiflowClient()

    // Generate proof name with metadata
    const proofName = `IMCIVREE ${contentType.toUpperCase()} - ${audience.toUpperCase()} - ${name}`
    const timestamp = new Date().toISOString().split('T')[0]

    // For the MVP, we'll need to host the HTML somewhere accessible
    // Option 1: Upload to our own server and provide URL
    // Option 2: Use Netlify Functions to serve the content temporarily
    // Option 3: Upload to S3 with presigned URL

    // For now, return instructions on what's needed
    const response = {
      success: true,
      message: 'Content prepared for Ziflow submission',
      proofDetails: {
        name: proofName,
        contentType,
        audience,
        focus,
        timestamp,
        contentLength: htmlContent.length,
      },
      // In production, this would be the actual Ziflow proof response
      nextSteps: [
        'Content needs to be hosted at a public URL',
        'Then submitted to Ziflow via API',
        'Webhook will notify when reviewed',
      ],
      // Store content ID for webhook reference
      contentId: `${contentType}-${audience}-${Date.now()}`,
    }

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Submit for approval error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit for approval' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/submit-for-approval
 *
 * Check Ziflow connection status
 */
export async function GET() {
  try {
    const client = getZiflowClient()

    // Test the connection by listing folders
    const folders = await client.listFolders()
    const workflows = await client.listWorkflows()

    return NextResponse.json({
      connected: true,
      folders,
      workflows,
    })
  } catch (error: any) {
    return NextResponse.json({
      connected: false,
      error: error.message,
    })
  }
}
