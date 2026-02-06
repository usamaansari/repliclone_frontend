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

    // Parse request body - handle empty body gracefully
    let body: any = {};
    try {
      const contentType = req.headers.get('content-type');
      const contentLength = req.headers.get('content-length');
      
      // Try to parse JSON if content-type indicates JSON
      // Check content-length to avoid parsing empty bodies
      if (contentType?.includes('application/json')) {
        // If content-length is 0 or not set, body might be empty
        if (contentLength && parseInt(contentLength) > 0) {
          body = await req.json();
        } else if (!contentLength) {
          // Content-length not set, try to parse anyway (some clients don't send it)
          try {
            body = await req.json();
          } catch {
            // Body is empty or invalid, use empty object
            body = {};
          }
        }
        // If content-length is 0, body is empty, use empty object
      }
    } catch (parseError) {
      // If body parsing fails (e.g., invalid JSON), return error
      return NextResponse.json(
        formatError('Invalid JSON in request body. Please provide persona_id or replica_id.', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Use persona_id from body (required for full pipeline)
    // Only fallback to env if not provided (for legacy support)
    const personaId = body.persona_id || process.env.NEXT_PERSONA_ID;
    
    // Use replica_id from body if provided (from selected replica)
    // Only fallback to env if not provided (for legacy support)
    // Note: replica_id is optional when persona_id is provided (persona has default_replica_id)
    const replicaId = body.replica_id || process.env.NEXT_REPLICA_ID;

    if (!personaId && !replicaId) {
      return NextResponse.json(
        formatError('persona_id or replica_id is required. For full pipeline conversations, persona_id is required.', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Create conversation via Tavus API
    // For full pipeline, persona_id is required and replica_id is optional
    const conversationPayload: any = {
      conversation_name: body.conversation_name || 'Conversation',
      audio_only: body.audio_only,
      callback_url: body.callback_url,
      conversational_context: body.conversational_context,
      custom_greeting: body.custom_greeting,
    };

    // Add persona_id if available (preferred for full pipeline)
    if (personaId) {
      conversationPayload.persona_id = personaId;
    }
    
    // Add replica_id if provided (optional when persona_id is present)
    if (replicaId) {
      conversationPayload.replica_id = replicaId;
    }

    const conversation = await tavusApi.createConversation(conversationPayload);

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

