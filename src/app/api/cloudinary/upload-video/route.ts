import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';

type UploadType = 'consent' | 'training';

function getEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing environment variable: ${name}`);
  return val;
}

// POST /api/cloudinary/upload-video
// Expects multipart/form-data with:
// - file: video blob
// - type: "consent" | "training"
// - uploadId: client-generated id to group uploads
export async function POST(req: NextRequest) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json(
        formatError('Authentication required', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file');
    const type = formData.get('type');
    const uploadId = formData.get('uploadId');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        formatError('Missing video file', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    if (typeof type !== 'string' || (type !== 'consent' && type !== 'training')) {
      return NextResponse.json(
        formatError('Invalid upload type', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    if (typeof uploadId !== 'string' || uploadId.trim().length < 6) {
      return NextResponse.json(
        formatError('Invalid uploadId', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const maxBytes = 750 * 1024 * 1024; // Tavus: 750MB max (we enforce same cap for safety)
    if (file.size > maxBytes) {
      return NextResponse.json(
        formatError('Video file too large', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Cloudinary unsigned upload preset (create an "unsigned" upload preset in Cloudinary).
    // If you prefer signed uploads, we can change this endpoint later.
    const cloudName = getEnv('CLOUDINARY_CLOUD_NAME');
    const uploadPreset = getEnv('CLOUDINARY_UPLOAD_PRESET'); // must be unsigned
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;

    const folder = `repliclone/replicas/${user.userId}/${type}/${uploadId}`;
    const allowedMime = [
      'video/webm',
      'video/mp4',
      'application/octet-stream', // some browsers report generic blob type
    ];
    if (file.type && !allowedMime.includes(file.type)) {
      // Don't hard-fail because some browsers may report a generic mime.
      // However, if it's clearly not a video type, reject.
      if (!file.type.startsWith('video/')) {
        return NextResponse.json(
          formatError(`Unsupported mime type: ${file.type}`, 'VALIDATION_ERROR'),
          { status: 400 }
        );
      }
    }

    const cloudForm = new FormData();
    cloudForm.append('file', file, `upload-${type}-${uploadId}.webm`);
    cloudForm.append('upload_preset', uploadPreset);
    cloudForm.append('folder', folder);

    const cloudResp = await fetch(endpoint, {
      method: 'POST',
      body: cloudForm,
    });

    if (!cloudResp.ok) {
      const text = await cloudResp.text().catch(() => '');
      throw new Error(`Cloudinary upload failed: ${cloudResp.status} ${text}`);
    }

    const data = await cloudResp.json();

    const secureUrl: string | undefined = data?.secure_url;
    const publicId: string | undefined = data?.public_id;

    if (!secureUrl) {
      return NextResponse.json(
        formatError('Cloudinary did not return secure_url', 'INTERNAL_ERROR'),
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: secureUrl,
        publicId: publicId || null,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      formatError('Failed to upload video', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

