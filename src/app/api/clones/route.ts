import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { clones } from '@/lib/db/schema';
import { eq, and, desc } from 'drizzle-orm';

// GET /api/clones - List all clones for authenticated user
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
    const industry = searchParams.get('industry');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = db.select().from(clones).where(eq(clones.userId, user.userId));

    // Apply filters
    const conditions = [eq(clones.userId, user.userId)];
    
    if (industry) {
      conditions.push(eq(clones.industryType, industry as any));
    }
    
    if (status) {
      conditions.push(eq(clones.status, status as any));
    }

    const allClones = await db
      .select()
      .from(clones)
      .where(and(...conditions))
      .orderBy(desc(clones.createdAt));

    // Apply search filter client-side (can be optimized with database query)
    let filteredClones = allClones;
    if (search) {
      const searchLower = search.toLowerCase();
      filteredClones = allClones.filter(
        (clone) =>
          clone.name.toLowerCase().includes(searchLower) ||
          clone.industryType?.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredClones,
      count: filteredClones.length,
    });
  } catch (error) {
    console.error('Error fetching clones:', error);
    return NextResponse.json(
      formatError('Failed to fetch clones', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
