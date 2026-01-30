import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { clones } from '@/lib/db/schema';

// POST /api/clones/create-full-pipeline - Save clone data to database after full pipeline creation
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
    if (!body.name || !body.tavusPersonaId || !body.default_replica_id) {
      return NextResponse.json(
        formatError('name, tavusPersonaId, and default_replica_id are required', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Map industry_type to database enum values
    // Database only supports: 'car_sales', 'real_estate', 'custom'
    // Other values (education, healthcare, retail, finance) will be stored as 'custom'
    const industryType = body.industry_type || body.industryType || 'custom';
    const validIndustryTypes: ('car_sales' | 'real_estate' | 'custom')[] = ['car_sales', 'real_estate', 'custom'];
    const mappedIndustryType = validIndustryTypes.includes(industryType as any) 
      ? (industryType as 'car_sales' | 'real_estate' | 'custom')
      : 'custom';

    // Prepare clone data for database
    const cloneData = {
      userId: user.userId,
      name: body.name,
      industryType: mappedIndustryType,
      status: 'active' as const, // Since persona is already created, mark as active
      tavusReplicaId: body.default_replica_id, // This is the replica_id from the selected replica
      tavusPersonaId: body.tavusPersonaId,
      personalityTraits: body.system_prompt ? {
        system_prompt: body.system_prompt,
        context: body.context,
        perception_model: body.perception_model,
        smart_turn_detection: body.smart_turn_detection,
        industry_type: industryType, // Store original value in personalityTraits for reference
      } : null,
      isActive: true,
    };

    // Create clone in database
    const [newClone] = await db
      .insert(clones)
      .values(cloneData)
      .returning();

    return NextResponse.json({
      success: true,
      data: {
        cloneId: newClone.id,
        clone: newClone,
        message: 'Clone created successfully and saved to database.',
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating clone:', error);
    return NextResponse.json(
      formatError(
        error instanceof Error ? error.message : 'Failed to create clone',
        'INTERNAL_ERROR'
      ),
      { status: 500 }
    );
  }
}
