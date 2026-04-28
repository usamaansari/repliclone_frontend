import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/utils/auth-server';
import { formatError } from '@/utils/helpers';

function getEnv(name: string): string {
  const val = process.env[name];
  if (!val) throw new Error(`Missing environment variable: ${name}`);
  return val;
}

// POST /api/cloudinary/upload-image
// Expects multipart/form-data with:
// - file: image blob (jpg/jpeg/png)
// - uploadId: client-generated id
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
    const uploadId = formData.get('uploadId');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        formatError('Missing image file', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    if (typeof uploadId !== 'string' || uploadId.trim().length < 6) {
      return NextResponse.json(
        formatError('Invalid uploadId', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const allowedMime = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!file.type || !allowedMime.includes(file.type)) {
      return NextResponse.json(
        formatError('Only JPG and PNG are supported', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const maxBytes = 20 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        formatError('Image file too large (max 20MB)', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    const cloudName = getEnv('CLOUDINARY_CLOUD_NAME');
    const uploadPreset = getEnv('CLOUDINARY_UPLOAD_PRESET');
    const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const folder = `repliclone/replicas/${user.userId}/image/${uploadId}`;

    const cloudForm = new FormData();
    cloudForm.append('file', file, `upload-image-${uploadId}`);
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
    const width = typeof data?.width === 'number' ? data.width : 0;
    const height = typeof data?.height === 'number' ? data.height : 0;

    if (!secureUrl) {
      return NextResponse.json(
        formatError('Cloudinary did not return secure_url', 'INTERNAL_ERROR'),
        { status: 500 }
      );
    }

    if (width < 512 || height < 512) {
      return NextResponse.json(
        formatError('Image must be at least 512x512 pixels', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        url: secureUrl,
        publicId: publicId || null,
        width,
        height,
      },
    });
  } catch (error) {
    console.error('Cloudinary image upload error:', error);
    return NextResponse.json(
      formatError('Failed to upload image', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}
