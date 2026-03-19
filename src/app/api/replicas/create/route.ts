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
      // During training we often get intermediate/unknown values; treat them as "processing"
      return 'processing';
  }
}

// POST /api/replicas/create - Create a personal human replica with Tavus training
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
    const trainVideoUrl = body.train_video_url;
    const consentVideoUrl = body.consent_video_url;
    const modelName = body.model_name || 'phoenix-4';
    const callbackUrl = body.callback_url ?? '';

    if (!replicaName || !trainVideoUrl || !consentVideoUrl) {
      return NextResponse.json(
        formatError(
          'replica_name, train_video_url, and consent_video_url are required',
          'VALIDATION_ERROR'
        ),
        { status: 400 }
      );
    }

    // Create record in DB first (so we can reference it while Tavus trains in background)
    const [newReplica] = await db
      .insert(replicas)
      .values({
        userId: user.userId,
        replicaName,
        modelName,
        callbackUrl,
        trainVideoUrl,
        consentVideoUrl,
        status: 'pending',
      })
      .returning();

    // Fire and forget (we still wait for Tavus to create the training job to get replica_id)
    const tavusCreate = await tavusApi.createHumanReplica({
      callback_url: callbackUrl,
      replica_name: replicaName,
      train_video_url: trainVideoUrl,
      consent_video_url: consentVideoUrl,
      model_name: modelName,
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

    return NextResponse.json({
      success: true,
      data: updatedReplica,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating replica:', error);
    return NextResponse.json(
      formatError('Failed to create replica', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

