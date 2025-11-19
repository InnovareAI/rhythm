import { NextRequest, NextResponse } from 'next/server'
import { listConversations, getConversation, deleteConversation } from '@/lib/conversation-storage'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const contentType = searchParams.get('contentType') as 'hcp-email' | 'social-media' | 'patient-email' | 'video' | null
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
    const conversationId = searchParams.get('id')

    // Get single conversation
    if (conversationId) {
      const conversation = await getConversation(conversationId)
      if (!conversation) {
        return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
      }
      return NextResponse.json(conversation)
    }

    // List conversations
    const conversations = await listConversations({
      contentType: contentType || undefined,
      limit,
      offset
    })

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('id')

    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID required' }, { status: 400 })
    }

    const success = await deleteConversation(conversationId)

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
