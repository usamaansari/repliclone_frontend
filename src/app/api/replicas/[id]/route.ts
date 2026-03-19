import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { replicas } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { tavusApi } from '@/lib/services/tavus';

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

// GET /api/replicas/[id] - Fetch replica + current Tavus training status
export async function GET(
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

    const { id: replicaId } = await params;

    const [replica] = await db
      .select()
      .from(replicas)
      .where(and(eq(replicas.id, replicaId), eq(replicas.userId, user.userId)));

    if (!replica) {
      return NextResponse.json(
        formatError('Replica not found', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    let tavusStatus: any = null;
    if (replica.tavusReplicaId) {
      try {
        tavusStatus = await tavusApi.getReplicaStatus(replica.tavusReplicaId);
        const mapped = mapTavusStatusToReplicaStatus(tavusStatus?.status);

        // Keep DB status in sync (best-effort)
        if (mapped && mapped !== replica.status) {
          await db
            .update(replicas)
            .set({
              status: mapped,
              tavusStatusRaw: tavusStatus?.status,
              trainingProgress:
                typeof tavusStatus?.progress !== 'undefined'
                  ? String(tavusStatus.progress)
                  : replica.trainingProgress,
              updatedAt: new Date(),
            })
            .where(and(eq(replicas.id, replicaId), eq(replicas.userId, user.userId)));
        }
      } catch (error) {
        console.error('Error fetching Tavus status:', error);
      }
    }

    const [replicaWithUpdatedStatus] = await db
      .select()
      .from(replicas)
      .where(and(eq(replicas.id, replicaId), eq(replicas.userId, user.userId)))
      .limit(1);

    return NextResponse.json({
      success: true,
      data: {
        replica: replicaWithUpdatedStatus || replica,
        tavusStatus,
      },
    });
  } catch (error) {
    console.error('Error fetching replica:', error);
    return NextResponse.json(
      formatError('Failed to fetch replica', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

// DELETE /api/replicas/[id] - Delete replica + Tavus replica (if exists)
export async function DELETE(
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

    const { id: replicaId } = await params;

    const [replica] = await db
      .select()
      .from(replicas)
      .where(and(eq(replicas.id, replicaId), eq(replicas.userId, user.userId)));

    if (!replica) {
      return NextResponse.json(
        formatError('Replica not found', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    if (replica.tavusReplicaId) {
      try {
        await tavusApi.deleteReplica(replica.tavusReplicaId);
      } catch (error) {
        // Best-effort delete; continue with DB removal
        console.error('Error deleting Tavus replica:', error);
      }
    }

    await db.delete(replicas).where(eq(replicas.id, replicaId));

    return NextResponse.json({
      success: true,
      message: 'Replica deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting replica:', error);
    return NextResponse.json(
      formatError('Failed to delete replica', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

