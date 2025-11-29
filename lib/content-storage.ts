/**
 * IMCIVREE Content Storage
 *
 * Handles persistence of generated emails and banners to Supabase
 */

import { getSupabase } from './supabase'

// =============================================================================
// TYPES
// =============================================================================

export type ContentType = 'imcivree-email' | 'imcivree-banner'
export type Audience = 'hcp' | 'patient'
export type ContentStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'needs_changes'

export interface ImcivreeContent {
  id: string
  content_type: ContentType
  audience: Audience
  focus: string | null
  key_message: string | null
  html_content: string
  version: number
  parent_id: string | null
  status: ContentStatus
  ziflow_proof_id: string | null
  created_at: string
  updated_at: string
}

export interface ContentVersion {
  id: string
  content_id: string
  version: number
  html_content: string
  change_notes: string | null
  change_source: 'user' | 'ai_optimization' | 'mlr_feedback'
  created_at: string
}

export interface ZiflowFeedback {
  id: string
  proof_id: string
  proof_name: string | null
  content_id: string | null
  status: string | null
  decision: 'approved' | 'rejected' | 'changes_requested' | null
  current_stage: string | null
  last_event: string | null
  last_event_at: string | null
  created_at: string
  updated_at: string
  comments?: ZiflowComment[]
}

export interface ZiflowComment {
  id: string
  feedback_id: string
  ziflow_comment_id: string | null
  author_name: string
  author_email: string | null
  content: string
  annotation_page: number | null
  annotation_x: number | null
  annotation_y: number | null
  comment_created_at: string | null
  created_at: string
}

// =============================================================================
// CONTENT CRUD
// =============================================================================

/**
 * Save new IMCIVREE content
 */
export async function saveContent(params: {
  contentType: ContentType
  audience: Audience
  focus?: string
  keyMessage?: string
  htmlContent: string
  parentId?: string
}): Promise<ImcivreeContent | null> {
  try {
    const supabase = getSupabase()

    // If this is a revision, get the parent version
    let version = 1
    if (params.parentId) {
      const { data: parent } = await supabase
        .from('imcivree_content')
        .select('version')
        .eq('id', params.parentId)
        .single()

      if (parent) {
        version = parent.version + 1
      }
    }

    const { data, error } = await supabase
      .from('imcivree_content')
      .insert({
        content_type: params.contentType,
        audience: params.audience,
        focus: params.focus || null,
        key_message: params.keyMessage || null,
        html_content: params.htmlContent,
        version,
        parent_id: params.parentId || null,
        status: 'draft'
      })
      .select()
      .single()

    if (error) {
      console.error('[CONTENT] Error saving content:', error)
      return null
    }

    // Also save to versions table
    if (data) {
      await saveContentVersion({
        contentId: data.id,
        version: data.version,
        htmlContent: params.htmlContent,
        changeNotes: params.parentId ? 'Revision created' : 'Initial version',
        changeSource: 'user'
      })
    }

    console.log('[CONTENT] Saved content:', data.id)
    return data
  } catch (error) {
    console.error('[CONTENT] Exception saving content:', error)
    return null
  }
}

/**
 * Get content by ID
 */
export async function getContent(id: string): Promise<ImcivreeContent | null> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('imcivree_content')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('[CONTENT] Error fetching content:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[CONTENT] Exception fetching content:', error)
    return null
  }
}

/**
 * List all content with optional filters
 */
export async function listContent(params?: {
  contentType?: ContentType
  audience?: Audience
  status?: ContentStatus
  limit?: number
  offset?: number
}): Promise<ImcivreeContent[]> {
  try {
    const supabase = getSupabase()

    let query = supabase
      .from('imcivree_content')
      .select('*')
      .order('created_at', { ascending: false })

    if (params?.contentType) {
      query = query.eq('content_type', params.contentType)
    }
    if (params?.audience) {
      query = query.eq('audience', params.audience)
    }
    if (params?.status) {
      query = query.eq('status', params.status)
    }
    if (params?.limit) {
      query = query.limit(params.limit)
    }
    if (params?.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 20) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('[CONTENT] Error listing content:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[CONTENT] Exception listing content:', error)
    return []
  }
}

/**
 * Update content status
 */
export async function updateContentStatus(
  id: string,
  status: ContentStatus,
  ziflowProofId?: string
): Promise<boolean> {
  try {
    const supabase = getSupabase()

    const updateData: Record<string, any> = { status }
    if (ziflowProofId) {
      updateData.ziflow_proof_id = ziflowProofId
    }

    const { error } = await supabase
      .from('imcivree_content')
      .update(updateData)
      .eq('id', id)

    if (error) {
      console.error('[CONTENT] Error updating status:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[CONTENT] Exception updating status:', error)
    return false
  }
}

/**
 * Update content HTML (creates new version)
 */
export async function updateContentHtml(
  id: string,
  htmlContent: string,
  changeNotes?: string,
  changeSource: 'user' | 'ai_optimization' | 'mlr_feedback' = 'user'
): Promise<boolean> {
  try {
    const supabase = getSupabase()

    // Get current version
    const { data: current } = await supabase
      .from('imcivree_content')
      .select('version')
      .eq('id', id)
      .single()

    if (!current) return false

    const newVersion = current.version + 1

    // Update the content
    const { error } = await supabase
      .from('imcivree_content')
      .update({
        html_content: htmlContent,
        version: newVersion
      })
      .eq('id', id)

    if (error) {
      console.error('[CONTENT] Error updating content:', error)
      return false
    }

    // Save version history
    await saveContentVersion({
      contentId: id,
      version: newVersion,
      htmlContent,
      changeNotes,
      changeSource
    })

    return true
  } catch (error) {
    console.error('[CONTENT] Exception updating content:', error)
    return false
  }
}

/**
 * Delete content
 */
export async function deleteContent(id: string): Promise<boolean> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase
      .from('imcivree_content')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('[CONTENT] Error deleting content:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[CONTENT] Exception deleting content:', error)
    return false
  }
}

// =============================================================================
// VERSION HISTORY
// =============================================================================

/**
 * Save content version to history
 */
async function saveContentVersion(params: {
  contentId: string
  version: number
  htmlContent: string
  changeNotes?: string
  changeSource: 'user' | 'ai_optimization' | 'mlr_feedback'
}): Promise<boolean> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase
      .from('content_versions')
      .insert({
        content_id: params.contentId,
        version: params.version,
        html_content: params.htmlContent,
        change_notes: params.changeNotes || null,
        change_source: params.changeSource
      })

    if (error) {
      console.error('[CONTENT] Error saving version:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[CONTENT] Exception saving version:', error)
    return false
  }
}

/**
 * Get version history for content
 */
export async function getContentVersions(contentId: string): Promise<ContentVersion[]> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('content_versions')
      .select('*')
      .eq('content_id', contentId)
      .order('version', { ascending: false })

    if (error) {
      console.error('[CONTENT] Error fetching versions:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('[CONTENT] Exception fetching versions:', error)
    return []
  }
}

/**
 * Get specific version
 */
export async function getContentVersion(
  contentId: string,
  version: number
): Promise<ContentVersion | null> {
  try {
    const supabase = getSupabase()

    const { data, error } = await supabase
      .from('content_versions')
      .select('*')
      .eq('content_id', contentId)
      .eq('version', version)
      .single()

    if (error) {
      console.error('[CONTENT] Error fetching version:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('[CONTENT] Exception fetching version:', error)
    return null
  }
}

// =============================================================================
// ZIFLOW FEEDBACK
// =============================================================================

/**
 * Save or update Ziflow feedback
 */
export async function saveZiflowFeedback(params: {
  proofId: string
  proofName?: string
  contentId?: string
  status?: string
  decision?: 'approved' | 'rejected' | 'changes_requested'
  currentStage?: string
  lastEvent?: string
}): Promise<ZiflowFeedback | null> {
  try {
    const supabase = getSupabase()

    // Check if feedback already exists
    const { data: existing } = await supabase
      .from('ziflow_feedback')
      .select('id')
      .eq('proof_id', params.proofId)
      .single()

    if (existing) {
      // Update existing
      const { data, error } = await supabase
        .from('ziflow_feedback')
        .update({
          proof_name: params.proofName,
          content_id: params.contentId,
          status: params.status,
          decision: params.decision,
          current_stage: params.currentStage,
          last_event: params.lastEvent,
          last_event_at: new Date().toISOString()
        })
        .eq('proof_id', params.proofId)
        .select()
        .single()

      if (error) {
        console.error('[ZIFLOW] Error updating feedback:', error)
        return null
      }
      return data
    } else {
      // Insert new
      const { data, error } = await supabase
        .from('ziflow_feedback')
        .insert({
          proof_id: params.proofId,
          proof_name: params.proofName,
          content_id: params.contentId,
          status: params.status,
          decision: params.decision,
          current_stage: params.currentStage,
          last_event: params.lastEvent,
          last_event_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        console.error('[ZIFLOW] Error saving feedback:', error)
        return null
      }
      return data
    }
  } catch (error) {
    console.error('[ZIFLOW] Exception saving feedback:', error)
    return null
  }
}

/**
 * Save Ziflow comment
 */
export async function saveZiflowComment(params: {
  feedbackId: string
  ziflowCommentId?: string
  authorName: string
  authorEmail?: string
  content: string
  annotationPage?: number
  annotationX?: number
  annotationY?: number
  commentCreatedAt?: string
}): Promise<boolean> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase
      .from('ziflow_comments')
      .insert({
        feedback_id: params.feedbackId,
        ziflow_comment_id: params.ziflowCommentId,
        author_name: params.authorName,
        author_email: params.authorEmail,
        content: params.content,
        annotation_page: params.annotationPage,
        annotation_x: params.annotationX,
        annotation_y: params.annotationY,
        comment_created_at: params.commentCreatedAt
      })

    if (error) {
      console.error('[ZIFLOW] Error saving comment:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[ZIFLOW] Exception saving comment:', error)
    return false
  }
}

/**
 * Get feedback by proof ID
 */
export async function getZiflowFeedback(proofId: string): Promise<ZiflowFeedback | null> {
  try {
    const supabase = getSupabase()

    const { data: feedback, error } = await supabase
      .from('ziflow_feedback')
      .select('*')
      .eq('proof_id', proofId)
      .single()

    if (error || !feedback) {
      return null
    }

    // Get comments
    const { data: comments } = await supabase
      .from('ziflow_comments')
      .select('*')
      .eq('feedback_id', feedback.id)
      .order('created_at', { ascending: true })

    return {
      ...feedback,
      comments: comments || []
    }
  } catch (error) {
    console.error('[ZIFLOW] Exception fetching feedback:', error)
    return null
  }
}

/**
 * List all feedback with optional filters
 */
export async function listZiflowFeedback(params?: {
  contentId?: string
  decision?: 'approved' | 'rejected' | 'changes_requested'
  limit?: number
}): Promise<ZiflowFeedback[]> {
  try {
    const supabase = getSupabase()

    let query = supabase
      .from('ziflow_feedback')
      .select('*, ziflow_comments(*)')
      .order('updated_at', { ascending: false })

    if (params?.contentId) {
      query = query.eq('content_id', params.contentId)
    }
    if (params?.decision) {
      query = query.eq('decision', params.decision)
    }
    if (params?.limit) {
      query = query.limit(params.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('[ZIFLOW] Error listing feedback:', error)
      return []
    }

    return (data || []).map(item => ({
      ...item,
      comments: item.ziflow_comments || []
    }))
  } catch (error) {
    console.error('[ZIFLOW] Exception listing feedback:', error)
    return []
  }
}

// =============================================================================
// FILE STORAGE
// =============================================================================

/**
 * Upload HTML file to Supabase Storage and get public URL
 */
export async function uploadHtmlFile(
  htmlContent: string,
  filename: string
): Promise<string | null> {
  try {
    const supabase = getSupabase()

    // Create a blob from the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' })

    // Upload to storage
    const { data, error } = await supabase
      .storage
      .from('video-images')
      .upload(`html/${filename}`, blob, {
        contentType: 'text/html',
        upsert: true
      })

    if (error) {
      console.error('[STORAGE] Error uploading file:', error)
      return null
    }

    // Get public URL
    const { data: urlData } = supabase
      .storage
      .from('video-images')
      .getPublicUrl(`html/${filename}`)

    return urlData.publicUrl
  } catch (error) {
    console.error('[STORAGE] Exception uploading file:', error)
    return null
  }
}

/**
 * Delete HTML file from storage
 */
export async function deleteHtmlFile(filename: string): Promise<boolean> {
  try {
    const supabase = getSupabase()

    const { error } = await supabase
      .storage
      .from('video-images')
      .remove([`html/${filename}`])

    if (error) {
      console.error('[STORAGE] Error deleting file:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('[STORAGE] Exception deleting file:', error)
    return false
  }
}
