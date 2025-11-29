import { NextRequest, NextResponse } from 'next/server'
import { getZiflowClient } from '@/lib/ziflow'
import { saveContent, updateContentStatus } from '@/lib/content-storage'

/**
 * POST /api/submit-for-approval
 *
 * Submit generated content to Ziflow for MLR approval
 *
 * Body:
 * - contentType: 'imcivree-email' | 'imcivree-banner'
 * - name: string (proof name)
 * - htmlContent: string (the generated HTML)
 * - audience: 'hcp' | 'patient'
 * - focus?: string (e.g., 'moa', 'weight-reduction')
 * - keyMessage?: string
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { contentType, name, htmlContent, audience, focus, keyMessage } = body

    if (!contentType || !name || !htmlContent) {
      return NextResponse.json(
        { error: 'Missing required fields: contentType, name, htmlContent' },
        { status: 400 }
      )
    }

    console.log('[ZIFLOW SUBMIT] Starting submission:', { contentType, name, audience })

    // Step 1: Save content to database
    const content = await saveContent({
      contentType: contentType === 'email' ? 'imcivree-email' : 'imcivree-banner',
      audience: audience || 'hcp',
      focus,
      keyMessage,
      htmlContent
    })

    if (!content) {
      return NextResponse.json(
        { error: 'Failed to save content to database' },
        { status: 500 }
      )
    }

    console.log('[ZIFLOW SUBMIT] Content saved:', content.id)

    // Step 2: Generate public URL for the HTML content
    // Use the serve-content endpoint which serves HTML from database
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://beautiful-cactus-21f97b.netlify.app'
    const publicUrl = `${baseUrl}/api/serve-content/${content.id}`

    console.log('[ZIFLOW SUBMIT] Content URL:', publicUrl)

    // Step 3: Submit to Ziflow
    const client = getZiflowClient()
    const proofName = `IMCIVREE ${contentType === 'email' ? 'Email' : 'Banner'} - ${audience.toUpperCase()} - ${name}`

    try {
      // Get the default folder (Ziflow Demo Project)
      const folders = await client.listFolders().catch(() => [])
      const defaultFolderId = folders.length > 0 ? folders[0].id : undefined

      const proof = await client.createProof({
        name: proofName,
        input: [{
          url: publicUrl,
          name: `${name}.html`
        }],
        folder_id: defaultFolderId,
        message: `Content Type: ${contentType}\nAudience: ${audience}\nFocus: ${focus || 'N/A'}\nKey Message: ${keyMessage || 'N/A'}`
      })

      console.log('[ZIFLOW SUBMIT] Proof created:', proof.id)

      // Step 4: Update content status with Ziflow proof ID
      await updateContentStatus(content.id, 'pending_review', proof.id)

      return NextResponse.json({
        success: true,
        message: 'Content submitted to Ziflow for MLR approval',
        contentId: content.id,
        proofId: proof.id,
        proofName: proof.name,
        proofUrl: proof.proof_url,
        fileUrl: publicUrl
      })
    } catch (ziflowError: any) {
      console.error('[ZIFLOW SUBMIT] Ziflow API error:', ziflowError)

      // Content is saved but Ziflow submission failed
      // Keep content as draft so user can retry
      return NextResponse.json({
        success: false,
        error: `Ziflow submission failed: ${ziflowError.message}`,
        contentId: content.id,
        fileUrl: publicUrl,
        canRetry: true
      }, { status: 502 })
    }
  } catch (error: any) {
    console.error('[ZIFLOW SUBMIT] Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit for approval' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/submit-for-approval
 *
 * Check Ziflow connection status and list available folders/workflows
 */
export async function GET() {
  try {
    const client = getZiflowClient()

    // Test the connection by listing folders and workflows
    const [folders, workflows] = await Promise.all([
      client.listFolders().catch(() => []),
      client.listWorkflows().catch(() => [])
    ])

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
