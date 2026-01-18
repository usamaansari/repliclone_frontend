import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { clones, conversations } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { tavusApi } from '@/lib/services/tavus';

// POST /api/clones/[id]/conversation - Create a real-time video conversation with clone
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const { id: cloneId } = await params;
    const body = await req.json();
    const { 
      audio_only, 
      conversation_name, 
      callback_url, 
      conversational_context, 
      custom_greeting,
      document_ids,
      document_tags 
    } = body;

    // Verify clone belongs to user and is active
    const [clone] = await db
      .select()
      .from(clones)
      .where(and(eq(clones.id, cloneId), eq(clones.userId, user.userId)));

    if (!clone) {
      return NextResponse.json(
        formatError('Clone not found', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (!clone.isActive || clone.status !== 'active') {
      return NextResponse.json(
        formatError('Clone is not active', 'INVALID_STATE'),
        { status: 400 }
      );
    }

    // Require persona_id (which should be created during clone setup)
    if (!clone.tavusPersonaId) {
      return NextResponse.json(
        formatError('Clone persona is not available. Please ensure the clone is fully configured.', 'INVALID_STATE'),
        { status: 400 }
      );
    }

    // Create conversation via Tavus API using Persona
    let conversation;
    try {
      conversation = await tavusApi.createConversation({
        persona_id: clone.tavusPersonaId,
        replica_id: clone.tavusReplicaId || undefined, // Optional if persona has default replica
        audio_only: audio_only || false,
        conversation_name: conversation_name || `${clone.name} - Conversation`,
        callback_url,
        conversational_context: conversational_context || {},
        custom_greeting,
        document_ids: document_ids || (clone.tavusDocumentIds as string[]) || undefined,
        document_tags: document_tags || undefined,
      });
    } catch (error) {
      console.error('Error creating conversation:', error);
      return NextResponse.json(
        formatError(
          error instanceof Error ? error.message : 'Failed to create conversation',
          'TAVUS_API_ERROR'
        ),
        { status: 500 }
      );
    }

    // Store conversation reference in database
    try {
      await db.insert(conversations).values({
        cloneId: clone.id,
        visitorId: user.userId,
        sessionData: {
          tavus_conversation_id: conversation.conversation_id,
          conversation_url: conversation.conversation_url,
          status: conversation.status,
        },
        startedAt: new Date(),
      });
    } catch (dbError) {
      console.error('Error storing conversation in database:', dbError);
      // Continue even if database storage fails
    }

    return NextResponse.json({
      success: true,
      data: {
        conversation_id: conversation.conversation_id,
        conversation_url: conversation.conversation_url,
        status: conversation.status,
        message: 'Conversation created successfully. Use conversation_url to join the video session.',
      },
    });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      formatError('Failed to create conversation', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
