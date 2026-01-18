import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { clones } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { tavusApi } from '@/lib/services/tavus';

// GET /api/clones/[id] - Get clone details including Tavus status
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

    // Get clone from database
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

    // Get Tavus replica status if replica_id exists
    let tavusStatus = null;
    if (clone.tavusReplicaId) {
      try {
        tavusStatus = await tavusApi.getReplicaStatus(clone.tavusReplicaId);
      } catch (error) {
        console.error('Error fetching Tavus status:', error);
        // Continue without Tavus status if API call fails
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        clone,
        tavusStatus,
      },
    });
  } catch (error) {
    console.error('Error fetching clone:', error);
    return NextResponse.json(
      formatError('Failed to fetch clone', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

// PATCH /api/clones/[id] - Update clone configuration
export async function PATCH(
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

    // Update clone in database
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (body.name) updateData.name = body.name;
    if (body.industryType) updateData.industryType = body.industryType;
    if (body.isActive !== undefined) updateData.isActive = body.isActive;
    if (body.personalityTraits) updateData.personalityTraits = body.personalityTraits;
    if (body.trainingData) updateData.trainingData = body.trainingData;

    const [updatedClone] = await db
      .update(clones)
      .set(updateData)
      .where(eq(clones.id, cloneId))
      .returning();

    // Update Tavus replica if replica_id exists and configuration changed
    if (clone.tavusReplicaId && (body.personalityTraits || body.trainingData)) {
      try {
        await tavusApi.updateReplica(clone.tavusReplicaId, {
          name: body.name || clone.name,
          configuration: {
            personality_traits: body.personalityTraits?.traits,
            tone: body.personalityTraits ? {
              formal: body.personalityTraits.toneFormal,
              casual: body.personalityTraits.toneCasual,
            } : undefined,
            response_style: body.personalityTraits?.responseStyle,
            training_data: body.trainingData,
          },
        });
      } catch (error) {
        console.error('Error updating Tavus replica:', error);
        // Continue even if Tavus update fails
      }
    }

    return NextResponse.json({
      success: true,
      data: updatedClone,
    });
  } catch (error) {
    console.error('Error updating clone:', error);
    return NextResponse.json(
      formatError('Failed to update clone', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

// DELETE /api/clones/[id] - Delete clone and Tavus replica
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

    const { id: cloneId } = await params;

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

    // Delete Tavus replica if exists
    if (clone.tavusReplicaId) {
      try {
        await tavusApi.deleteReplica(clone.tavusReplicaId);
      } catch (error) {
        console.error('Error deleting Tavus replica:', error);
        // Continue with database deletion even if Tavus deletion fails
      }
    }

    // Delete clone from database
    await db
      .delete(clones)
      .where(eq(clones.id, cloneId));

    return NextResponse.json({
      success: true,
      message: 'Clone deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting clone:', error);
    return NextResponse.json(
      formatError('Failed to delete clone', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
