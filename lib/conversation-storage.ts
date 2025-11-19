import { supabase } from './supabase'

export type Message = {
  role: 'user' | 'assistant'
  content: string
}

export type Conversation = {
  id: string
  contentType: 'hcp-email' | 'social-media' | 'patient-email' | 'video'
  productName?: string
  brandInfo?: any
  stateData?: any
  messages: Message[]
  generatedContent?: {
    content: string
    imageUrl?: string
    videoUrl?: string
  }
  createdAt: string
  updatedAt: string
}

export async function createConversation(params: {
  contentType: 'hcp-email' | 'social-media' | 'patient-email' | 'video'
  productName?: string
  brandInfo?: any
  stateData?: any
}): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        content_type: params.contentType,
        product_name: params.productName,
        brand_info: params.brandInfo,
        state_data: params.stateData
      })
      .select('id')
      .single()

    if (error) {
      console.error('[STORAGE] Error creating conversation:', error)
      return null
    }

    console.log('[STORAGE] Created conversation:', data.id)
    return data.id
  } catch (error) {
    console.error('[STORAGE] Exception creating conversation:', error)
    return null
  }
}

export async function updateConversation(params: {
  conversationId: string
  productName?: string
  brandInfo?: any
  stateData?: any
}): Promise<boolean> {
  try {
    const updateData: any = {}
    if (params.productName) updateData.product_name = params.productName
    if (params.brandInfo) updateData.brand_info = params.brandInfo
    if (params.stateData) updateData.state_data = params.stateData

    const { error } = await supabase
      .from('conversations')
      .update(updateData)
      .eq('id', params.conversationId)

    if (error) {
      console.error('[STORAGE] Error updating conversation:', error)
      return false
    }

    console.log('[STORAGE] Updated conversation:', params.conversationId)
    return true
  } catch (error) {
    console.error('[STORAGE] Exception updating conversation:', error)
    return false
  }
}

export async function saveMessage(params: {
  conversationId: string
  role: 'user' | 'assistant'
  content: string
}): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('messages')
      .insert({
        conversation_id: params.conversationId,
        role: params.role,
        content: params.content
      })

    if (error) {
      console.error('[STORAGE] Error saving message:', error)
      return false
    }

    console.log('[STORAGE] Saved message for conversation:', params.conversationId)
    return true
  } catch (error) {
    console.error('[STORAGE] Exception saving message:', error)
    return false
  }
}

export async function saveGeneratedContent(params: {
  conversationId: string
  content: string
  imageUrl?: string
  videoUrl?: string
}): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('generated_content')
      .insert({
        conversation_id: params.conversationId,
        content: params.content,
        image_url: params.imageUrl,
        video_url: params.videoUrl
      })

    if (error) {
      console.error('[STORAGE] Error saving generated content:', error)
      return false
    }

    console.log('[STORAGE] Saved generated content for conversation:', params.conversationId)
    return true
  } catch (error) {
    console.error('[STORAGE] Exception saving generated content:', error)
    return false
  }
}

export async function getConversation(conversationId: string): Promise<Conversation | null> {
  try {
    // Fetch conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .single()

    if (convError || !conversation) {
      console.error('[STORAGE] Error fetching conversation:', convError)
      return null
    }

    // Fetch messages
    const { data: messages, error: msgError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (msgError) {
      console.error('[STORAGE] Error fetching messages:', msgError)
      return null
    }

    // Fetch generated content
    const { data: generatedContent, error: genError } = await supabase
      .from('generated_content')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (genError && genError.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('[STORAGE] Error fetching generated content:', genError)
    }

    return {
      id: conversation.id,
      contentType: conversation.content_type,
      productName: conversation.product_name,
      brandInfo: conversation.brand_info,
      stateData: conversation.state_data,
      messages: messages?.map((m: any) => ({
        role: m.role,
        content: m.content
      })) || [],
      generatedContent: generatedContent ? {
        content: generatedContent.content,
        imageUrl: generatedContent.image_url,
        videoUrl: generatedContent.video_url
      } : undefined,
      createdAt: conversation.created_at,
      updatedAt: conversation.updated_at
    }
  } catch (error) {
    console.error('[STORAGE] Exception fetching conversation:', error)
    return null
  }
}

export async function listConversations(params?: {
  contentType?: 'hcp-email' | 'social-media' | 'patient-email' | 'video'
  limit?: number
  offset?: number
}): Promise<Conversation[]> {
  try {
    let query = supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: false })

    if (params?.contentType) {
      query = query.eq('content_type', params.contentType)
    }

    if (params?.limit) {
      query = query.limit(params.limit)
    }

    if (params?.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1)
    }

    const { data: conversations, error } = await query

    if (error) {
      console.error('[STORAGE] Error listing conversations:', error)
      return []
    }

    // Fetch messages for each conversation
    const conversationsWithMessages = await Promise.all(
      (conversations || []).map(async (conv: any) => {
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: true })

        const { data: generatedContent } = await supabase
          .from('generated_content')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        return {
          id: conv.id,
          contentType: conv.content_type,
          productName: conv.product_name,
          brandInfo: conv.brand_info,
          stateData: conv.state_data,
          messages: messages?.map((m: any) => ({
            role: m.role,
            content: m.content
          })) || [],
          generatedContent: generatedContent ? {
            content: generatedContent.content,
            imageUrl: generatedContent.image_url,
            videoUrl: generatedContent.video_url
          } : undefined,
          createdAt: conv.created_at,
          updatedAt: conv.updated_at
        }
      })
    )

    return conversationsWithMessages
  } catch (error) {
    console.error('[STORAGE] Exception listing conversations:', error)
    return []
  }
}

export async function deleteConversation(conversationId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversationId)

    if (error) {
      console.error('[STORAGE] Error deleting conversation:', error)
      return false
    }

    console.log('[STORAGE] Deleted conversation:', conversationId)
    return true
  } catch (error) {
    console.error('[STORAGE] Exception deleting conversation:', error)
    return false
  }
}
