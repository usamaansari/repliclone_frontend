import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { clones } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { tavusApi } from '@/lib/services/tavus';

// GET /api/clones/[id]/status - Get replica status with polling option
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

    const { id: cloneId } = await params;
    const searchParams = req.nextUrl.searchParams;
    const poll = searchParams.get('poll') === 'true';

    // Verify clone belongs to user
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

    if (!clone.tavusReplicaId) {
      return NextResponse.json({
        success: true,
        data: {
          clone_status: clone.status,
          tavus_status: null,
          message: 'No Tavus replica ID associated with this clone',
        },
      });
    }

    let tavusStatus;
    try {
      if (poll) {
        // Poll until status is active or failed
        tavusStatus = await tavusApi.pollReplicaStatus(clone.tavusReplicaId, {
          interval: 5000,
          maxAttempts: 180, // 15 minutes
        });

        // Update clone status in database based on Tavus status
        if (tavusStatus.status === 'active' || tavusStatus.status === 'failed') {
          await db
            .update(clones)
            .set({
              status: tavusStatus.status,
              updatedAt: new Date(),
            })
            .where(eq(clones.id, cloneId));
        }
      } else {
        // Just get current status
        tavusStatus = await tavusApi.getReplicaStatus(clone.tavusReplicaId);
      }
    } catch (error) {
      console.error('Error fetching Tavus status:', error);
      return NextResponse.json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch replica status',
        data: {
          clone_status: clone.status,
          tavus_status: null,
        },
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: {
        clone_status: clone.status,
        tavus_status: tavusStatus,
      },
    });
  } catch (error) {
    console.error('Error fetching clone status:', error);
    return NextResponse.json(
      formatError('Failed to fetch clone status', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
