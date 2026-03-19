'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { authenticatedFetch } from '@/utils/api-client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { ArrowLeft, RefreshCw, Loader2, Trash2, XCircle } from 'lucide-react';
import type { Replica, ReplicaStatus } from '@/lib/types/replica';

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    processing: 'secondary',
    pending: 'secondary',
    inactive: 'outline',
    failed: 'destructive',
  };
  return variants[status] || 'outline';
};

export default function ReplicaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const replicaId = params.id as string;

  const [replica, setReplica] = useState<Replica | null>(null);
  const [tavusStatus, setTavusStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchReplica = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(`/api/replicas/${replicaId}`);
      if (!response.ok) throw new Error('Failed to load replica details');

      const data = await response.json();
      setReplica(data?.data?.replica || null);
      setTavusStatus(data?.data?.tavusStatus || null);
    } catch (err) {
      console.error('Error fetching replica:', err);
      setError(err instanceof Error ? err.message : 'Failed to load replica details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (replicaId) fetchReplica();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replicaId]);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await fetchReplica();
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this replica? This cannot be undone.')) return;
    try {
      const response = await authenticatedFetch(`/api/replicas/${replicaId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete replica');
      router.push('/dashboard/replicas');
    } catch (err) {
      console.error('Error deleting replica:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete replica');
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen w-full bg-background">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (error || !replica) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen w-full bg-background">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <Card className="max-w-md">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <XCircle className="h-12 w-12 text-destructive mx-auto" />
                  <h3 className="text-lg font-semibold">Replica Not Found</h3>
                  <p className="text-sm text-muted-foreground">{error || 'You do not have permission to view this replica.'}</p>
                  <Link href="/dashboard/replicas">
                    <Button>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Replicas
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-border bg-background px-6 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href="/dashboard/replicas">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">{replica.replicaName}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getStatusBadge(replica.status)}>{replica.status}</Badge>
                    {replica.modelName && <Badge variant="outline">{replica.modelName}</Badge>}
                    {!replica.isActive && <Badge variant="secondary">Inactive</Badge>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Training & Tavus Status</CardTitle>
                  <CardDescription>Replica status is updated by fetching Tavus training progress.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tavusStatus?.status && (
                    <div>
                      <div className="text-sm text-muted-foreground">Tavus status</div>
                      <div className="mt-1 font-medium">{String(tavusStatus.status)}</div>
                    </div>
                  )}
                  {tavusStatus?.progress !== undefined && (
                    <div>
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="mt-1 font-medium">{String(tavusStatus.progress)}</div>
                    </div>
                  )}
                  {replica.tavusReplicaId && (
                    <div>
                      <div className="text-sm text-muted-foreground">Tavus replica id</div>
                      <div className="mt-1 font-mono text-sm">
                        {replica.tavusReplicaId}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                  <CardDescription>These are the training and consent video URLs you submitted.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Training video</div>
                    <div className="mt-1 font-mono text-sm break-all">
                      {replica.trainVideoUrl}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Consent video</div>
                    <div className="mt-1 font-mono text-sm break-all">
                      {replica.consentVideoUrl}
                    </div>
                  </div>
                  {replica.callbackUrl !== undefined && (
                    <div>
                      <div className="text-sm text-muted-foreground">Callback URL</div>
                      <div className="mt-1 font-mono text-sm break-all">
                        {replica.callbackUrl || '—'}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

