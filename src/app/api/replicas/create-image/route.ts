import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { replicas } from '@/lib/db/schema';
import { tavusApi } from '@/lib/services/tavus';
import { eq } from 'drizzle-orm';

type ReplicaStatus = 'pending' | 'processing' | 'active' | 'inactive' | 'failed';

function mapTavusStatusToReplicaStatus(tavusStatus?: string | null): ReplicaStatus {
  const s = (tavusStatus || '').toLowerCase();
  switch (s) {
    case 'pending':
      return 'pending';
    case 'processing':
    case 'started':
      return 'processing';
    case 'active':
    case 'completed':
      return 'active';
    case 'inactive':
      return 'inactive';
    case 'failed':
    case 'error':
      return 'failed';
    default:
      return 'processing';
  }
}

// POST /api/replicas/create-image
// Creates image-based Tavus replica with train_image_url + voice_name
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

    const replicaName = body.replica_name;
    const trainImageUrl = body.train_image_url;
    const callbackUrl = body.callback_url ?? '';
    const voiceNameRaw = body.voice_name;
    const voiceName = typeof voiceNameRaw === 'string' ? voiceNameRaw.trim().toLowerCase() : '';

    if (!replicaName || !trainImageUrl || !voiceName) {
      return NextResponse.json(
        formatError(
          'replica_name, train_image_url, and voice_name are required',
          'VALIDATION_ERROR'
        ),
        { status: 400 }
      );
    }

    const voiceNameFormat = /^[a-z0-9_-]{2,80}$/;
    if (!voiceNameFormat.test(voiceName)) {
      return NextResponse.json(
        formatError(
          'voice_name must be a valid Tavus slug (lowercase letters, numbers, _ or -)',
          'VALIDATION_ERROR'
        ),
        { status: 400 }
      );
    }

    const [newReplica] = await db
      .insert(replicas)
      .values({
        userId: user.userId,
        replicaName,
        modelName: 'image',
        callbackUrl,
        // Keep schema backward-compatible while storing image source.
        trainVideoUrl: trainImageUrl,
        consentVideoUrl: `voice_name:${voiceName}`,
        status: 'pending',
      })
      .returning();

    const tavusCreate = await tavusApi.createImageReplica({
      callback_url: callbackUrl,
      replica_name: replicaName,
      train_image_url: trainImageUrl,
      voice_name: voiceName,
    });

    const mappedStatus = mapTavusStatusToReplicaStatus(tavusCreate.status);

    const [updatedReplica] = await db
      .update(replicas)
      .set({
        tavusReplicaId: tavusCreate.replica_id,
        status: mappedStatus,
        tavusStatusRaw: tavusCreate.status,
        trainingProgress: tavusCreate.training_progress,
        updatedAt: new Date(),
      })
      .where(eq(replicas.id, newReplica.id))
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: updatedReplica,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating image replica:', error);
    return NextResponse.json(
      formatError('Failed to create image replica', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
