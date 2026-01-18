import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { db } from '@/lib/db';
import { clones } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { CloneWizardData } from '@/lib/types/clone';
import { tavusApi } from '@/lib/services/tavus';

// POST /api/clones/create - Create a new clone with Tavus.io integration
export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const body: CloneWizardData = await req.json();

    // Validate required fields
    if (!body.step1?.name) {
      return NextResponse.json(
        formatError('Clone name is required', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Prepare clone data for database
    const cloneData = {
      userId: user.userId,
      name: body.step1.name,
      industryType: body.step1.industryType || 'custom',
      status: 'pending' as const,
      personalityTraits: body.step4 ? {
        traits: body.step4.personalityTraits,
        toneFormal: body.step4.toneFormal,
        toneCasual: body.step4.toneCasual,
        responseStyle: body.step4.responseStyle,
      } : null,
      trainingData: body.step5 ? {
        faqData: body.step5.faqData,
        companyPolicies: body.step5.companyPolicies,
        ...(body.step1.industryType === 'car_sales' && { inventoryData: body.step5.inventoryData }),
        ...(body.step1.industryType === 'real_estate' && { propertyData: body.step5.propertyData }),
      } : null,
      avatarUrl: body.step2?.avatarUrl || null,
      voiceId: body.step3?.voiceId || body.step3?.voiceLibraryId || null,
    };

    // Create clone in database first
    const [newClone] = await db
      .insert(clones)
      .values({
        ...cloneData,
        status: 'pending',
      })
      .returning();

    // Call Tavus.io APIs to create replica, persona, documents, objectives, and guardrails
    let tavusReplicaId: string | null = null;
    let tavusPersonaId: string | null = null;
    let tavusDocumentIds: string[] = [];
    let tavusObjectiveIds: string[] = [];
    let tavusGuardrailsId: string | null = null;
    let tavusStatus: 'pending' | 'processing' | 'active' | 'failed' = 'failed';
    let processingTimeEstimate: number | undefined;

    try {
      // Step 1: Create Knowledge Base Documents (if training data exists)
      if (body.step5) {
        const documentPromises: Promise<string>[] = [];

        // Create document from company policies (text)
        if (body.step5.companyPolicies) {
          const policyDocPromise = tavusApi.createDocument({
            name: `${body.step1.name} - Company Policies`,
            document_type: 'text',
            content: body.step5.companyPolicies,
            tags: ['policies', body.step1.industryType],
          }).then(doc => doc.document_id);
          documentPromises.push(policyDocPromise);
        }

        // Create document from FAQ data (text)
        if (body.step5.faqData?.content) {
          const faqContent = typeof body.step5.faqData.content === 'string' 
            ? body.step5.faqData.content 
            : JSON.stringify(body.step5.faqData.content);
          const faqDocPromise = tavusApi.createDocument({
            name: `${body.step1.name} - FAQs`,
            document_type: 'text',
            content: faqContent,
            tags: ['faq', body.step1.industryType],
          }).then(doc => doc.document_id);
          documentPromises.push(faqDocPromise);
        }

        // Create document from inventory/property data (if exists)
        if (body.step1.industryType === 'car_sales' && body.step5.inventoryData) {
          const inventoryDocPromise = tavusApi.createDocument({
            name: `${body.step1.name} - Inventory Data`,
            document_type: 'text',
            content: JSON.stringify(body.step5.inventoryData),
            tags: ['inventory', 'car_sales'],
          }).then(doc => doc.document_id);
          documentPromises.push(inventoryDocPromise);
        }

        if (body.step1.industryType === 'real_estate' && body.step5.propertyData) {
          const propertyDocPromise = tavusApi.createDocument({
            name: `${body.step1.name} - Property Data`,
            document_type: 'text',
            content: JSON.stringify(body.step5.propertyData),
            tags: ['properties', 'real_estate'],
          }).then(doc => doc.document_id);
          documentPromises.push(propertyDocPromise);
        }

        // Wait for all documents to be created
        if (documentPromises.length > 0) {
          tavusDocumentIds = await Promise.all(documentPromises);
        }
      }

      // Step 2: Create Replica
      const tavusReplicaPayload = {
        name: body.step1.name,
        ...(body.step2?.avatarUrl && { video_url: body.step2.avatarUrl }),
        ...(body.step2?.avatarUrl && { image_url: body.step2.avatarUrl }),
        ...(body.step3?.voiceId && { voice_url: body.step3.voiceId }),
        configuration: {
          ...(body.step4 && {
            personality_traits: body.step4.personalityTraits,
            tone: {
              formal: body.step4.toneFormal,
              casual: body.step4.toneCasual,
            },
            response_style: body.step4.responseStyle,
          }),
        },
      };

      const tavusReplicaResult = await tavusApi.createReplica(tavusReplicaPayload);
      tavusReplicaId = tavusReplicaResult.replica_id;
      tavusStatus = tavusReplicaResult.status;
      processingTimeEstimate = tavusReplicaResult.processing_time_estimate;

      // Step 3: Create Persona with system prompt and document references
      let systemPrompt = '';
      if (body.step4) {
        const traits = body.step4.personalityTraits?.join(', ') || '';
        const tone = body.step4.toneFormal > body.step4.toneCasual ? 'formal' : 'casual';
        systemPrompt = `You are a ${traits} AI assistant with a ${tone} tone. Your response style is ${body.step4.responseStyle}.`;
      }
      if (body.step1.purpose) {
        systemPrompt += ` Your purpose: ${body.step1.purpose}.`;
      }

      const tavusPersonaResult = await tavusApi.createPersona({
        name: `${body.step1.name} - Persona`,
        system_prompt: systemPrompt || undefined,
        pipeline_mode: 'full',
        replica_id: tavusReplicaId,
        document_ids: tavusDocumentIds.length > 0 ? tavusDocumentIds : undefined,
        conversational_context: body.step5 ? {
          industry: body.step1.industryType,
          language: body.step1.language,
        } : undefined,
      });
      tavusPersonaId = tavusPersonaResult.persona_id;

      // Step 4: Create Objectives (if conversation scenarios are defined)
      if (body.step6) {
        // Objective for lead qualification
        if (body.step6.leadQualificationQuestions?.length > 0) {
          const leadQualificationObjective = await tavusApi.createObjective({
            name: `${body.step1.name} - Lead Qualification`,
            description: 'Qualify leads by asking relevant questions',
            enabled: true,
            priority: 1,
            conditions: {
              questions: body.step6.leadQualificationQuestions,
            },
          });
          tavusObjectiveIds.push(leadQualificationObjective.objective_id);
        }

        // Objective for appointment booking
        if (body.step6.appointmentBookingEnabled) {
          const appointmentObjective = await tavusApi.createObjective({
            name: `${body.step1.name} - Appointment Booking`,
            description: 'Book appointments with qualified leads',
            enabled: true,
            priority: 2,
          });
          tavusObjectiveIds.push(appointmentObjective.objective_id);
        }
      }

      // Step 5: Create Guardrails (based on escalation rules and business hours)
      if (body.step6) {
        const guardrailRules: string[] = [];

        // Add escalation rules
        if (body.step6.escalationRules?.enabled && body.step6.escalationRules?.conditions?.length) {
          guardrailRules.push(
            `Escalate to human agent when: ${body.step6.escalationRules.conditions.join(', ')}`
          );
        }

        // Add business hours rules
        if (body.step6.businessHours?.enabled) {
          guardrailRules.push('Respect business hours when booking appointments');
          if (body.step6.afterHoursMessage) {
            guardrailRules.push(`After hours message: ${body.step6.afterHoursMessage}`);
          }
        }

        // Add industry-specific guardrails
        if (body.step1.industryType === 'car_sales') {
          guardrailRules.push('Always verify inventory availability before promising specific vehicles');
        }
        if (body.step1.industryType === 'real_estate') {
          guardrailRules.push('Always verify property availability and schedule viewings appropriately');
        }

        if (guardrailRules.length > 0) {
          const guardrailsResult = await tavusApi.createGuardrails({
            name: `${body.step1.name} - Guardrails`,
            description: 'Safety and behavior guardrails for conversation',
            rules: guardrailRules,
            enabled: true,
            severity: 'high',
          });
          tavusGuardrailsId = guardrailsResult.guardrails_id;
        }
      }

      // Update clone with all Tavus IDs
      await db
        .update(clones)
        .set({
          tavusReplicaId,
          tavusPersonaId,
          tavusDocumentIds: tavusDocumentIds.length > 0 ? tavusDocumentIds : null,
          tavusObjectiveIds: tavusObjectiveIds.length > 0 ? tavusObjectiveIds : null,
          tavusGuardrailsId,
          status: (tavusStatus === 'pending' ? 'processing' : tavusStatus) as 'pending' | 'processing' | 'active' | 'inactive' | 'failed',
        })
        .where(eq(clones.id, newClone.id));
    } catch (tavusError) {
      console.error('Tavus.io integration error:', tavusError);
      
      // If we partially succeeded, still update with what we have
      await db
        .update(clones)
        .set({
          tavusReplicaId,
          tavusPersonaId,
          tavusDocumentIds: tavusDocumentIds.length > 0 ? tavusDocumentIds : null,
          tavusObjectiveIds: tavusObjectiveIds.length > 0 ? tavusObjectiveIds : null,
          tavusGuardrailsId,
          status: 'failed',
        })
        .where(eq(clones.id, newClone.id));
    }

    // Fetch updated clone
    const [updatedClone] = await db
      .select()
      .from(clones)
      .where(eq(clones.id, newClone.id));

    return NextResponse.json({
      success: true,
      data: {
        cloneId: updatedClone.id,
        clone: updatedClone,
        tavusReplicaId,
        status: updatedClone.status,
        message: updatedClone.status === 'processing' 
          ? `Clone is being created. Estimated time: ${processingTimeEstimate ? Math.round(processingTimeEstimate / 60) : 15} minutes.`
          : updatedClone.status === 'failed'
          ? 'Clone creation started but Tavus.io integration failed. Please check your configuration.'
          : 'Clone created successfully with Persona, Knowledge Base, Objectives, and Guardrails.',
        processing_time_estimate: processingTimeEstimate,
        tavusPersonaId,
        tavusDocumentIds,
        tavusObjectiveIds,
        tavusGuardrailsId,
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
