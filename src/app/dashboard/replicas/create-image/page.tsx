'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { authenticatedFetch } from '@/utils/api-client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';

import { ArrowLeft, Image as ImageIcon, Loader2, Upload } from 'lucide-react';

export default function CreateImageReplicaPage() {
  const router = useRouter();
  const uploadIdRef = useRef<string>(
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `upload-${Date.now()}`
  );

  const [replicaName, setReplicaName] = useState('');
  const [voiceName, setVoiceName] = useState('anna');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [trainImageUrl, setTrainImageUrl] = useState('');
  const [voiceOptions, setVoiceOptions] = useState<SelectOption[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        setVoicesLoading(true);
        const response = await authenticatedFetch('/api/tavus/resources?type=voices&limit=50&page=1&sort=asc');
        if (!response.ok) throw new Error('Failed to load voices');
        const data = await response.json().catch(() => null);

        const voices = Array.isArray(data?.data?.voices) ? data.data.voices : [];
        const options: SelectOption[] = voices
          .map((v: { voice_name?: string; name?: string }) => v.voice_name || v.name || '')
          .filter((name: string) => Boolean(name))
          .map((name: string) => ({ value: name, label: name }));

        const unique = Array.from(
          new Map(options.map((o: SelectOption) => [o.value, o])).values()
        );
        if (unique.length > 0) {
          setVoiceOptions(unique);
          setVoiceName(unique[0].value);
        } else {
          setVoiceOptions([{ value: 'anna', label: 'anna' }]);
          setVoiceName('anna');
        }
      } catch (e) {
        console.error('Failed loading voices:', e);
        setVoiceOptions([{ value: 'anna', label: 'anna' }]);
        setVoiceName('anna');
      } finally {
        setVoicesLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const canSubmit = useMemo(() => {
    return Boolean(replicaName.trim() && voiceName && trainImageUrl && !isSubmitting && !isUploading);
  }, [replicaName, voiceName, trainImageUrl, isSubmitting, isUploading]);

  const handleFileChange = (file: File | null) => {
    setError(null);
    setSuccessMessage(null);
    if (!file) {
      setSelectedFile(null);
      return;
    }

    const validMime = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validMime.includes(file.type)) {
      setError('Only JPG and PNG files are supported.');
      return;
    }

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      setIsUploading(true);
      setError(null);
      setSuccessMessage(null);

      const form = new FormData();
      form.append('file', selectedFile);
      form.append('uploadId', uploadIdRef.current);

      const resp = await authenticatedFetch('/api/cloudinary/upload-image', {
        method: 'POST',
        body: form,
      });

      const data = await resp.json().catch(() => null);
      if (!resp.ok) {
        throw new Error(data?.error?.message || 'Failed to upload image');
      }

      const imageUrl = data?.data?.url as string | undefined;
      if (!imageUrl) throw new Error('Cloudinary URL missing after upload');
      setTrainImageUrl(imageUrl);
      setSuccessMessage('Image uploaded successfully. You can now create the replica.');
    } catch (e) {
      console.error('Image upload error:', e);
      setError(e instanceof Error ? e.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      const response = await authenticatedFetch('/api/replicas/create-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          callback_url: '',
          replica_name: replicaName.trim(),
          train_image_url: trainImageUrl,
          voice_name: voiceName,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error?.message || 'Failed to create image replica');
      }

      setSuccessMessage('Image replica submitted successfully. Redirecting...');
      if (data?.data?.id) {
        setTimeout(() => router.push(`/dashboard/replicas/${data.data.id}`), 900);
      }
    } catch (e) {
      console.error('Create image replica error:', e);
      setError(e instanceof Error ? e.message : 'Failed to create image replica');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b border-border bg-background px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/replicas">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Create Image Replica</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload a headshot to Cloudinary, then train with Tavus via train_image_url.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Image Replica Setup
                  </CardTitle>
                  <CardDescription>
                    Use JPG/PNG only. Minimum resolution is 512x512. Upload a clear front-facing headshot with one person and even lighting.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                        {error}
                      </div>
                    )}
                    {successMessage && (
                      <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 text-sm text-green-600 dark:text-green-400">
                        {successMessage}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="replicaName">Replica Name *</Label>
                      <Input
                        id="replicaName"
                        value={replicaName}
                        onChange={(e) => setReplicaName(e.target.value)}
                        placeholder="e.g. Image Replica"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="voiceName">Voice Name *</Label>
                      <Select
                        id="voiceName"
                        options={voiceOptions}
                        value={voiceName}
                        onChange={(e) => setVoiceName(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        {voicesLoading
                          ? 'Loading stock voices from Tavus...'
                          : 'Live stock voices loaded from Tavus /v2/voices.'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="imageFile">Headshot (JPG/PNG) *</Label>
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      />
                      <p className="text-xs text-muted-foreground">
                        Best results: front-facing head and shoulders, no hats/glasses, hair away from face/neck, and neutral lighting.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button type="button" variant="outline" onClick={handleUpload} disabled={!selectedFile || isUploading || isSubmitting}>
                        <Upload className="h-4 w-4 mr-2" />
                        {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>Cloudinary Image URL</Label>
                      <div className="text-xs text-muted-foreground break-all">
                        {trainImageUrl || 'Upload image to generate URL'}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button type="submit" disabled={!canSubmit}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Creating...
                          </>
                        ) : (
                          'Create Image Replica'
                        )}
                      </Button>
                      <Link href="/dashboard/replicas">
                        <Button type="button" variant="outline" disabled={isSubmitting}>
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
