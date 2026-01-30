import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { tavusApi } from '@/lib/services/tavus';

// POST /api/personas/create - Create a persona using Tavus full pipeline
export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await req.json();

    // Validate required fields
    if (!body.persona_name || !body.system_prompt || !body.default_replica_id) {
      return NextResponse.json(
        formatError('persona_name, system_prompt, and default_replica_id are required', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Create persona with full pipeline
    const persona = await tavusApi.createPersona({
      persona_name: body.persona_name,
      system_prompt: body.system_prompt,
      pipeline_mode: 'full',
      default_replica_id: body.default_replica_id,
      context: body.context,
      layers: body.layers || {
        perception: body.perception_model ? {
          perception_model: body.perception_model,
        } : undefined,
        stt: {
          smart_turn_detection: body.smart_turn_detection !== false,
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: persona,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating persona:', error);
    return NextResponse.json(
      formatError(
        error instanceof Error ? error.message : 'Failed to create persona',
        'INTERNAL_ERROR'
      ),
      { status: 500 }
    );
  }
}
