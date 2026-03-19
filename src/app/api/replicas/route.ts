import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { replicas } from '@/lib/db/schema';
import { and, desc, eq } from 'drizzle-orm';

// GET /api/replicas - List replicas for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const status = searchParams.get('status');
    const model = searchParams.get('model');
    const search = searchParams.get('search');

    // DB filtering first (for performance), search is applied client-side below (matches existing clones pattern)
    const conditions = [eq(replicas.userId, user.userId)];
    if (status) conditions.push(eq(replicas.status, status as any));
    if (model) conditions.push(eq(replicas.modelName, model));

    const allReplicas = await db
      .select()
      .from(replicas)
      .where(and(...conditions))
      .orderBy(desc(replicas.createdAt));

    const filteredReplicas = search
      ? allReplicas.filter((r) => {
          const haystack = `${r.replicaName} ${r.modelName ?? ''}`.toLowerCase();
          return haystack.includes(search.toLowerCase());
        })
      : allReplicas;

    return NextResponse.json({
      success: true,
      data: filteredReplicas,
      count: filteredReplicas.length,
    });
  } catch (error) {
    console.error('Error fetching replicas:', error);
    return NextResponse.json(
      formatError('Failed to fetch replicas', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

