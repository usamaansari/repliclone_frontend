'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeft,
  Edit,
  Play,
  Pause,
  Trash2,
  RefreshCw,
  MessageSquare,
  Activity,
  Settings,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import { authenticatedFetch } from '@/utils/api-client';
import { Clone } from '@/lib/types/clone';

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

export default function CloneDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cloneId = params.id as string;
  
  const [clone, setClone] = useState<Clone | null>(null);
  const [tavusStatus, setTavusStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (cloneId) {
      fetchCloneDetails();
    }
  }, [cloneId]);

  const fetchCloneDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authenticatedFetch(`/api/clones/${cloneId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch clone details');
      }
      
      const data = await response.json();
      setClone(data.data.clone);
      setTavusStatus(data.data.tavusStatus);
    } catch (err) {
      console.error('Error fetching clone:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clone details');
    } finally {
      setLoading(false);
    }
  };

  const refreshStatus = async () => {
    try {
      setIsRefreshing(true);
      const response = await authenticatedFetch(`/api/clones/${cloneId}/status?poll=false`);
      
      if (response.ok) {
        const data = await response.json();
        setTavusStatus(data.data.tavusStatus);
        if (clone && data.data.clone_status) {
          setClone({ ...clone, status: data.data.clone_status });
        }
      }
    } catch (err) {
      console.error('Error refreshing status:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleTestConversation = async () => {
    if (!testMessage.trim() || !clone) return;

    try {
      setIsTesting(true);
      setTestResponse(null);
      
      const response = await authenticatedFetch(`/api/clones/${cloneId}/conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_message: testMessage,
          response_format: 'text',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate conversation');
      }

      const data = await response.json();
      setTestResponse(data.data.response || 'No response received');
      setTestMessage('');
    } catch (err) {
      console.error('Error testing conversation:', err);
      setTestResponse(err instanceof Error ? err.message : 'Failed to generate conversation');
    } finally {
      setIsTesting(false);
    }
  };

  const handleToggleActive = async () => {
    if (!clone) return;

    try {
      const response = await authenticatedFetch(`/api/clones/${cloneId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isActive: !clone.isActive,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setClone(data.data);
      }
    } catch (err) {
      console.error('Error toggling clone status:', err);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this clone? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await authenticatedFetch(`/api/clones/${cloneId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/dashboard/clones');
      }
    } catch (err) {
      console.error('Error deleting clone:', err);
      alert('Failed to delete clone. Please try again.');
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

  if (error || !clone) {
    return (
      <ProtectedRoute>
        <div className="flex h-screen w-full bg-background">
          <Sidebar />
          <div className="flex-1 flex items-center justify-center">
            <Card className="max-w-md">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <XCircle className="h-12 w-12 text-destructive mx-auto" />
                  <h3 className="text-lg font-semibold">Clone Not Found</h3>
                  <p className="text-sm text-muted-foreground">
                    {error || 'The clone you are looking for does not exist or you do not have permission to view it.'}
                  </p>
                  <Link href="/dashboard/clones">
                    <Button>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Clones
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/dashboard/clones">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">{clone.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getStatusBadge(clone.status)}>
                      {clone.status}
                    </Badge>
                    {clone.industryType && (
                      <Badge variant="outline">
                        {clone.industryType.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshStatus}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh Status
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleActive}
                >
                  {clone.isActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  )}
                </Button>
                <Link href={`/dashboard/clones/${cloneId}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-6">
              {/* Status & Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{clone.status}</div>
                    {tavusStatus && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Tavus: {tavusStatus.status}
                      </p>
                    )}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Created
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium">
                      {new Date(clone.createdAt).toLocaleDateString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(clone.createdAt).toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Conversations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">Total conversations</p>
                  </CardContent>
                </Card>
              </div>

              {/* Clone Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Clone Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-sm text-muted-foreground mt-1">{clone.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Industry Type</label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {clone.industryType?.replace('_', ' ') || 'Not set'}
                    </p>
                  </div>
                  {clone.tavusReplicaId && (
                    <div>
                      <label className="text-sm font-medium">Tavus Replica ID</label>
                      <p className="text-sm text-muted-foreground mt-1 font-mono">
                        {clone.tavusReplicaId}
                      </p>
                    </div>
                  )}
                  {clone.avatarUrl && (
                    <div>
                      <label className="text-sm font-medium">Avatar URL</label>
                      <p className="text-sm text-muted-foreground mt-1 break-all">
                        {clone.avatarUrl}
                      </p>
                    </div>
                  )}
                  {clone.voiceId && (
                    <div>
                      <label className="text-sm font-medium">Voice ID</label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {clone.voiceId}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Test Conversation */}
              {clone.status === 'active' && clone.isActive && (
                <Card>
                  <CardHeader>
                    <CardTitle>Test Conversation</CardTitle>
                    <CardDescription>
                      Test your clone by sending a message and receiving an AI response
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Textarea
                        placeholder="Type your message here..."
                        value={testMessage}
                        onChange={(e) => setTestMessage(e.target.value)}
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.ctrlKey) {
                            handleTestConversation();
                          }
                        }}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Press Ctrl+Enter to send
                      </p>
                    </div>
                    <Button
                      onClick={handleTestConversation}
                      disabled={!testMessage.trim() || isTesting}
                    >
                      {isTesting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    {testResponse && (
                      <div className="p-4 bg-muted rounded-lg">
                        <label className="text-sm font-medium mb-2 block">Response</label>
                        <p className="text-sm">{testResponse}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
