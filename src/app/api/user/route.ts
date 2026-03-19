import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError, formatSuccess } from '@/utils/helpers';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/user - Get current user information
export async function GET(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const [userData] = await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        companyName: users.companyName,
        phone: users.phone,
        city: users.city,
        industry: users.industry,
        address1: users.address1,
        address2: users.address2,
        province: users.province,
        postalCode: users.postalCode,
        country: users.country,
        subscriptionTier: users.subscriptionTier,
        subscriptionStatus: users.subscriptionStatus,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, user.userId))
      .limit(1);

    if (!userData) {
      return NextResponse.json(
        formatError('User not found', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    return NextResponse.json(formatSuccess(userData, 'User retrieved successfully'));
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      formatError('Failed to fetch user', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

// PATCH /api/user - Update current user information
export async function PATCH(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body = await req.json();

    // Build update data object
    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only update fields that are provided
    if (body.firstName !== undefined) updateData.firstName = body.firstName;
    if (body.lastName !== undefined) updateData.lastName = body.lastName;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.companyName !== undefined) updateData.companyName = body.companyName;

    // Update user in database
    const [updatedUser] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, user.userId))
      .returning({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        companyName: users.companyName,
        phone: users.phone,
        city: users.city,
        industry: users.industry,
        address1: users.address1,
        address2: users.address2,
        province: users.province,
        postalCode: users.postalCode,
        country: users.country,
        subscriptionTier: users.subscriptionTier,
        subscriptionStatus: users.subscriptionStatus,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    if (!updatedUser) {
      return NextResponse.json(
        formatError('User not found', 'NOT_FOUND'),
        { status: 404 }
      );
    }

    return NextResponse.json(
      formatSuccess(updatedUser, 'User updated successfully')
    );
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      formatError('Failed to update user', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
