'use client';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authenticatedFetch } from '@/utils/api-client';
import { Replica } from '@/lib/types/replica';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

import {
  Plus,
  Activity,
  RefreshCw,
  Trash2,
  Users,
  MessageSquareMore,
} from 'lucide-react';

const statusOptions: SelectOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'failed', label: 'Failed' },
];

const modelOptions: SelectOption[] = [
  { value: '', label: 'All Models' },
  { value: 'phoenix-4', label: 'phoenix-4' },
  { value: 'phoenix-3', label: 'phoenix-3' },
];

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

export default function ReplicasPage() {
  const router = useRouter();
  const [replicas, setReplicas] = useState<Replica[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [modelFilter, setModelFilter] = useState('');

  const fetchReplicas = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (modelFilter) params.append('model', modelFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await authenticatedFetch(`/api/replicas?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch replicas');

      const data = await response.json();
      setReplicas(data.data || []);
    } catch (error) {
      console.error('Error fetching replicas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplicas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, modelFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReplicas();
  };

  const handleRefreshStatus = async (replicaId: string) => {
    try {
      const response = await authenticatedFetch(`/api/replicas/${replicaId}`);
      if (!response.ok) throw new Error('Failed to refresh replica status');

      const data = await response.json();
      const updatedReplica = data?.data?.replica as Replica;
      setReplicas((prev) => prev.map((r) => (r.id === replicaId ? updatedReplica : r)));
    } catch (error) {
      console.error('Error refreshing status:', error);
    }
  };

  const handleDelete = async (replicaId: string) => {
    if (!confirm('Delete this replica? This cannot be undone.')) return;
    try {
      const response = await authenticatedFetch(`/api/replicas/${replicaId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete replica');
      await fetchReplicas();
    } catch (error) {
      console.error('Error deleting replica:', error);
      alert('Failed to delete replica. Please try again.');
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="border-b border-border bg-background px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold">Replica Management</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Train your personal human replicas and manage their status
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link href="/dashboard/replicas/create-image">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Image Replica
                  </Button>
                </Link>
                <Link href="/dashboard/replicas/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Video Replica
                  </Button>
                </Link>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Input
                    placeholder="Search replicas by name or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-3"
                  />
                </div>
              </form>
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="Filter by status"
              />
              <Select
                options={modelOptions}
                value={modelFilter}
                onChange={(e) => setModelFilter(e.target.value)}
                placeholder="Filter by model"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Activity className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Loading replicas...</p>
                </div>
              </div>
            ) : replicas.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No replicas found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get started by creating your first personal human replica.
                </p>
                <Link href="/dashboard/replicas/create-image">
                  <Button>
                    <MessageSquareMore className="h-4 w-4 mr-2" />
                    Create Your First Image Replica
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Replicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{replicas.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {replicas.filter((r) => r.status === 'active').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Processing
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {replicas.filter((r) => r.status === 'processing').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {replicas.filter((r) => r.status === 'failed').length}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  {replicas.map((replica) => (
                    <Card key={replica.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <button
                            className="text-left flex-1"
                            onClick={() => router.push(`/dashboard/replicas/${replica.id}`)}
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{replica.replicaName}</h3>
                              <Badge variant={getStatusBadge(replica.status)}>{replica.status}</Badge>
                              {replica.modelName && (
                                <Badge variant="outline">{replica.modelName}</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>
                                Created: {replica.createdAt ? new Date(replica.createdAt).toLocaleDateString() : '—'}
                              </span>
                              {replica.tavusReplicaId && (
                                <span className="font-mono">
                                  Replica ID: {replica.tavusReplicaId.substring(0, 8)}...
                                </span>
                              )}
                            </div>
                            {replica.trainingProgress && (
                              <div className="text-sm text-muted-foreground mt-1">
                                Progress: {replica.trainingProgress}
                              </div>
                            )}
                          </button>

                          <div className="flex flex-col gap-2 items-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRefreshStatus(replica.id)}
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(replica.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

