'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authenticatedFetch } from '@/utils/api-client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

import { Sparkles, Loader2, ArrowLeft, Camera, Mic, Play, Upload } from 'lucide-react';
import type { ReplicaStatus } from '@/lib/types/replica';

const modelOptions: SelectOption[] = [
  { value: 'phoenix-4', label: 'phoenix-4 (recommended)' },
  { value: 'phoenix-3', label: 'phoenix-3 (older)' },
];

const statusLabel: Record<ReplicaStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  active: 'Active',
  inactive: 'Inactive',
  failed: 'Failed',
};

export default function CreateReplicaPage() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [replicaName, setReplicaName] = useState('');
  const [modelName, setModelName] = useState('phoenix-4');

  const [consentVideoUrl, setConsentVideoUrl] = useState<string>('');
  const [trainingVideoUrl, setTrainingVideoUrl] = useState<string>('');
  const callbackUrl = ''; // Quickstart uses an empty callback by default

  const uploadIdRef = useRef<string>(typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `upload-${Date.now()}`);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdReplica, setCreatedReplica] = useState<any>(null);

  const canSubmit = useMemo(() => {
    return Boolean(
      replicaName.trim() &&
        trainingVideoUrl.trim() &&
        consentVideoUrl.trim() &&
        !isSubmitting
    );
  }, [replicaName, trainingVideoUrl, consentVideoUrl, isSubmitting]);

  const handleCreateReplica = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setCreatedReplica(null);

      const response = await authenticatedFetch('/api/replicas/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          callback_url: callbackUrl,
          replica_name: replicaName.trim(),
          train_video_url: trainingVideoUrl.trim(),
          consent_video_url: consentVideoUrl.trim(),
          model_name: modelName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create replica');
      }

      const data = await response.json();
      setCreatedReplica(data.data);

      // Small UX improvement: redirect to detail page after creation
      if (data?.data?.id) {
        setTimeout(() => router.push(`/dashboard/replicas/${data.data.id}`), 1000);
      }
    } catch (err) {
      console.error('Error creating replica:', err);
      setError(err instanceof Error ? err.message : 'Failed to create replica');
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/dashboard/replicas">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">Create Replica</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Train your personal human replica using Tavus
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Replica Training Setup
                  </CardTitle>
                  <CardDescription>
                    Record consent + training videos in-app, upload them to Cloudinary, then Tavus will start training (typically 4–6 hours).
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {error && (
                    <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 mb-4">
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  {createdReplica && (
                    <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20 mb-4">
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Replica submitted successfully.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        DB ID: <span className="font-mono">{createdReplica.id}</span>
                      </p>
                      {createdReplica.status && (
                        <Badge variant="outline" className="mt-2">
                          Status: {statusLabel[createdReplica.status as ReplicaStatus] || createdReplica.status}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="space-y-6">
                    {/* Basic info always visible */}
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="replicaName">Replica Name *</Label>
                        <Input
                          id="replicaName"
                          value={replicaName}
                          onChange={(e) => setReplicaName(e.target.value)}
                          placeholder="e.g. Usama - Personal Replica"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="modelName">Model *</Label>
                        <Select
                          id="modelName"
                          options={modelOptions}
                          value={modelName}
                          onChange={(e) => setModelName(e.target.value)}
                        />
                      </div>
                    </form>

                    {/* Step indicator */}
                    <div className="flex items-center gap-2">
                      <Badge variant={step === 1 ? 'default' : 'outline'}>1. Consent</Badge>
                      <Badge variant={step === 2 ? 'default' : 'outline'}>2. Training</Badge>
                      <Badge variant={step === 3 ? 'default' : 'outline'}>3. Submit</Badge>
                    </div>

                    {/* Step 1: Consent recorder */}
                    {step === 1 && (
                      <RecorderBlock
                        title="Record Consent Video"
                        subtitle="Personal replicas require a verbal consent statement. Say: “I, (your name), am currently speaking and give consent to Tavus to create an AI clone of me by using the audio and video samples I provide. I understand that this AI clone can be used to create videos that look and sound like me.” Record clearly with your face visible."
                        icon={<Camera className="h-4 w-4" />}
                        kind="consent"
                        targetSeconds={25}
                        existingUrl={consentVideoUrl}
                        onUploaded={(url) => {
                          setConsentVideoUrl(url);
                          setStep(2);
                        }}
                        uploadId={uploadIdRef.current}
                      />
                    )}

                    {/* Step 2: Training recorder */}
                    {step === 2 && (
                      <RecorderBlock
                        title="Record Training Video"
                        subtitle="Record one continuous shot: 1 minute speaking + 1 minute listening. Keep the listening portion fully neutral with lips closed."
                        icon={<Mic className="h-4 w-4" />}
                        kind="training"
                        targetSeconds={120}
                        existingUrl={trainingVideoUrl}
                        onUploaded={(url) => {
                          setTrainingVideoUrl(url);
                          setStep(3);
                        }}
                        uploadId={uploadIdRef.current}
                      />
                    )}

                    {/* Step 3: Submit */}
                    {step === 3 && (
                      <form onSubmit={handleCreateReplica} className="space-y-6">
                        <div className="space-y-2">
                          <Label>Readiness</Label>
                          <div className="text-sm text-muted-foreground space-y-1">
                            <div>Consent uploaded: <span className="font-medium text-foreground">{consentVideoUrl ? 'Yes' : 'No'}</span></div>
                            <div>Training uploaded: <span className="font-medium text-foreground">{trainingVideoUrl ? 'Yes' : 'No'}</span></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Consent URL</Label>
                          <div className="text-xs text-muted-foreground break-all">
                            {consentVideoUrl || '—'}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Training URL</Label>
                          <div className="text-xs text-muted-foreground break-all">
                            {trainingVideoUrl || '—'}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button type="submit" disabled={!canSubmit}>
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              'Start Replica Training'
                            )}
                          </Button>

                          <Button
                            variant="outline"
                            type="button"
                            onClick={() => setStep(2)}
                            disabled={isSubmitting}
                          >
                            Re-record Training
                          </Button>

                          <Link href="/dashboard/replicas">
                            <Button variant="outline" type="button" disabled={isSubmitting}>
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </form>
                    )}
                  </div>
              </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function getSupportedRecorderMimeType(): string | undefined {
  const candidates = [
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm',
  ];
  if (typeof MediaRecorder === 'undefined') return undefined;
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported?.(c)) return c;
  }
  return undefined;
}

type RecorderKind = 'consent' | 'training';

function RecorderBlock(props: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  kind: RecorderKind;
  targetSeconds: number;
  uploadId: string;
  existingUrl: string;
  onUploaded: (url: string) => void;
}) {
  const {
    title,
    subtitle,
    icon,
    kind,
    targetSeconds,
    uploadId,
    existingUrl,
    onUploaded,
  } = props;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoStopTimerId, setAutoStopTimerId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (autoStopTimerId) window.clearTimeout(autoStopTimerId);
      try {
        streamRef.current?.getTracks().forEach((t) => t.stop());
      } catch {
        // ignore
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isRecording) return;
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      const sec = Math.floor((Date.now() - startedAt) / 1000);
      setElapsedSeconds(sec);
    }, 250);
    return () => window.clearInterval(interval);
  }, [isRecording]);

  const start = async () => {
    setError(null);
    setRecordedBlob(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);

    try {
      const mimeType = getSupportedRecorderMimeType();

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 25, max: 30 },
        },
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const finalMime = recorder.mimeType || 'video/webm';
        const blob = new Blob(chunksRef.current, { type: finalMime });
        setRecordedBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      };

      recorder.start(250);
      setIsRecording(true);
      setElapsedSeconds(0);

      // Auto stop so users record the required segment length.
      const id = window.setTimeout(() => {
        stop();
      }, targetSeconds * 1000);
      setAutoStopTimerId(id);
    } catch (e) {
      console.error('Recorder start error:', e);
      setError(e instanceof Error ? e.message : 'Failed to start recording. Check permissions.');
    }
  };

  const stop = async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    try {
      if (autoStopTimerId) window.clearTimeout(autoStopTimerId);
      setAutoStopTimerId(null);
    } catch {
      // ignore
    }

    try {
      setIsRecording(false);
      recorder.stop();
    } catch {
      // ignore
    }

    try {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    } catch {
      // ignore
    } finally {
      streamRef.current = null;
    }
  };

  const upload = async () => {
    if (!recordedBlob) return;
    setError(null);
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('file', recordedBlob, `${kind}-${uploadId}.webm`);
      form.append('type', kind);
      form.append('uploadId', uploadId);

      const resp = await authenticatedFetch('/api/cloudinary/upload-video', {
        method: 'POST',
        body: form,
      });

      if (!resp.ok) {
        const msg = await resp.text().catch(() => '');
        throw new Error(msg || 'Failed to upload video');
      }

      const data = await resp.json();
      const url = data?.data?.url as string | undefined;
      if (!url) throw new Error('Upload succeeded but Cloudinary URL missing');

      onUploaded(url);
    } catch (e) {
      console.error('Upload error:', e);
      setError(e instanceof Error ? e.message : 'Failed to upload. Try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {existingUrl ? (
        <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20">
          <div className="flex items-center gap-3">
            <Badge variant="outline">Uploaded</Badge>
            <div className="flex-1">
              <div className="text-sm font-medium">{title}</div>
              <div className="text-xs text-muted-foreground break-all mt-1">{existingUrl}</div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="p-4 rounded-lg border border-border bg-background">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {icon}
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
          <Badge variant="outline">{targetSeconds}s</Badge>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Live Preview</Label>
              <div className="relative rounded-md overflow-hidden border border-border bg-black">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className="w-full h-[260px] object-cover"
                />
                {isRecording ? (
                  <div className="absolute top-3 left-3 flex items-center gap-2 bg-destructive/10 border border-destructive/20 text-destructive px-2 py-1 rounded-md text-xs">
                    <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                    REC • {elapsedSeconds}s
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Recorded Preview</Label>
              <div className="relative rounded-md overflow-hidden border border-border bg-black">
                {previewUrl ? (
                  <video
                    src={previewUrl}
                    controls
                    playsInline
                    className="w-full h-[260px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[260px] flex items-center justify-center text-muted-foreground text-sm">
                    Record to see preview
                  </div>
                )}
              </div>
            </div>
          </div>

          {error ? (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          ) : null}

          <div className="flex items-center gap-3 flex-wrap">
            {!isRecording ? (
              <Button onClick={start} disabled={isUploading}>
                <Camera className="h-4 w-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <Button onClick={stop} variant="destructive" disabled={isUploading}>
                Stop
              </Button>
            )}

            <Button
              onClick={upload}
              disabled={!recordedBlob || isUploading}
              variant="outline"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
            </Button>

            <Badge variant="secondary" className="ml-auto">
              Tip: Use Firefox/Chrome on HTTPS, and keep the camera stable.
            </Badge>
          </div>
        </div>
      </div>

      {/* Next button is handled by onUploaded (which advances step) */}
    </div>
  );
}

