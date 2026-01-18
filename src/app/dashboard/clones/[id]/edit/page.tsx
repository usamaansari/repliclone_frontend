'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Loader2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { authenticatedFetch } from '@/utils/api-client';
import { Clone } from '@/lib/types/clone';

const industryOptions: SelectOption[] = [
  { value: 'car_sales', label: 'Car Sales' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'custom', label: 'Custom' },
];

export default function CloneEditPage() {
  const params = useParams();
  const router = useRouter();
  const cloneId = params.id as string;

  const [clone, setClone] = useState<Clone | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [industryType, setIndustryType] = useState<'car_sales' | 'real_estate' | 'custom'>('car_sales');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (cloneId) {
      fetchClone();
    }
  }, [cloneId]);

  const fetchClone = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await authenticatedFetch(`/api/clones/${cloneId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch clone details');
      }

      const data = await response.json();
      const cloneData = data.data.clone as Clone;
      setClone(cloneData);
      setName(cloneData.name);
      setIndustryType(cloneData.industryType || 'car_sales');
      setIsActive(cloneData.isActive ?? true);
    } catch (err) {
      console.error('Error fetching clone:', err);
      setError(err instanceof Error ? err.message : 'Failed to load clone details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Clone name is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const response = await authenticatedFetch(`/api/clones/${cloneId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          industryType,
          isActive,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update clone');
      }

      // Redirect to clone detail page
      router.push(`/dashboard/clones/${cloneId}`);
    } catch (err) {
      console.error('Error updating clone:', err);
      setError(err instanceof Error ? err.message : 'Failed to update clone');
    } finally {
      setSaving(false);
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

  if (error && !clone) {
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
                  <p className="text-sm text-muted-foreground">{error}</p>
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
                <Link href={`/dashboard/clones/${cloneId}`}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">Edit Clone</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Update clone configuration and settings
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSave} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="name">Clone Name *</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter clone name"
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry Type</Label>
                      <Select
                        id="industry"
                        options={industryOptions}
                        value={industryType}
                        onChange={(e) => setIndustryType(e.target.value as any)}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="isActive">Active</Label>
                      <p className="text-sm text-muted-foreground">
                        Active clones can be used in conversations
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {clone && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Clone Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Status</Label>
                        <div className="mt-2">
                          <Badge variant="outline">{clone.status}</Badge>
                        </div>
                      </div>
                      {clone.tavusReplicaId && (
                        <div>
                          <Label>Tavus Replica ID</Label>
                          <p className="text-sm text-muted-foreground mt-1 font-mono">
                            {clone.tavusReplicaId}
                          </p>
                        </div>
                      )}
                      <div>
                        <Label>Created At</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(clone.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <Label>Last Updated</Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(clone.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <Link href={`/dashboard/clones/${cloneId}`}>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
