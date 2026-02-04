import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { tavusApi } from '@/lib/services/tavus';
import { db } from '@/lib/db';
import { conversations, clones } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await req.json();

    // Use persona_id from body (required for full pipeline)
    // Only fallback to env if not provided (for legacy support)
    const personaId = body.persona_id || process.env.NEXT_PERSONA_ID;
    
    // Use replica_id from body if provided (from selected replica)
    // Only fallback to env if not provided (for legacy support)
    const replicaId = body.replica_id || process.env.NEXT_REPLICA_ID;

    if (!personaId && !replicaId) {
      return NextResponse.json(
        formatError('persona_id or replica_id is required', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Create conversation via Tavus API
    const conversation = await tavusApi.createConversation({
      persona_id: personaId,
      replica_id: replicaId, // This will use the selected replica_id from clone creation
      conversation_name: body.conversation_name,
      audio_only: body.audio_only,
      callback_url: body.callback_url,
      conversational_context: body.conversational_context,
      custom_greeting: body.custom_greeting,
    });

    // Save conversation to database if clone_id is provided
    if (body.clone_id && conversation.conversation_url) {
      try {
        await db.insert(conversations).values({
          cloneId: body.clone_id,
          visitorId: user.userId,
          sessionData: {
            tavus_conversation_id: conversation.conversation_id,
            conversation_url: conversation.conversation_url,
            status: conversation.status,
            persona_id: personaId,
            replica_id: replicaId,
          },
          startedAt: new Date(),
        });

        // Update clone with conversationURL
        await db
          .update(clones)
          .set({
            conversationURL: conversation.conversation_url,
            updatedAt: new Date(),
          })
          .where(eq(clones.id, body.clone_id));
      } catch (dbError) {
        console.error('Error saving conversation to database:', dbError);
        // Continue even if database save fails - conversation is already created
      }
    }

    return NextResponse.json({
      success: true,
      data: conversation,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    return NextResponse.json(
      formatError(
        error instanceof Error ? error.message : 'Failed to create conversation',
        'INTERNAL_ERROR'
      ),
      { status: 500 }
    );
  }
}

