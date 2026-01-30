import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';
import { tavusApi } from '@/lib/services/tavus';

// GET /api/tavus/resources - Get Tavus resources (replicas, voices, avatars)
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
    const resourceType = searchParams.get('type') || 'all'; // all, replicas, voices, avatars
    const industry = searchParams.get('industry') || undefined;

    // Check if Tavus API is configured - return early to avoid timeout
    if (!process.env.NEXT_TAVUS_API_KEY) {
      return NextResponse.json({
        success: true,
        data: {
          replicas: [],
          voices: [],
          avatars: [],
          message: 'Tavus API key is not configured. Resources will be empty.',
        },
      });
    }

    // Additional check: if API key is empty string (from environment but not set)
    if (process.env.NEXT_TAVUS_API_KEY.trim() === '') {
      return NextResponse.json({
        success: true,
        data: {
          replicas: [],
          voices: [],
          avatars: [],
          message: 'Tavus API key is empty. Please configure NEXT_TAVUS_API_KEY in your environment.',
        },
      });
    }

    const results: any = {
      replicas: [],
      voices: [],
      avatars: [],
    };

    try {
      if (resourceType === 'all' || resourceType === 'replicas') {
        try {
          const verbose = searchParams.get('verbose') === 'true';
          const replicaType = searchParams.get('replica_type') as 'user' | 'system' | undefined;
          const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
          const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined;
          
          results.replicas = await tavusApi.listReplicas({
            verbose,
            replica_type: replicaType,
            limit,
            page,
          });
        } catch (error) {
          console.error('Error fetching replicas:', error);
          // Continue with empty array
        }
      }

      if (resourceType === 'all' || resourceType === 'voices') {
        try {
          results.voices = await tavusApi.listVoices();
        } catch (error) {
          console.error('Error fetching voices:', error);
          // Continue with empty array
        }
      }

      if (resourceType === 'all' || resourceType === 'avatars') {
        try {
          results.avatars = await tavusApi.listAvatars(industry);
        } catch (error) {
          console.error('Error fetching avatars:', error);
          // Continue with empty array
        }
      }
    } catch (error) {
      console.error('Error fetching Tavus resources:', error);
      // Return partial results even if some fail
    }

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error('Error in resources endpoint:', error);
    return NextResponse.json(
      formatError('Failed to fetch resources', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
