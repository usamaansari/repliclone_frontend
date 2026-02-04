'use client';

import React, { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Play,
  Pause,
  Copy,
  MoreVertical,
  TrendingUp,
  MessageSquare,
  Users,
  Activity,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authenticatedFetch } from '@/utils/api-client';
import { Clone } from '@/lib/types/clone';

const statusOptions: SelectOption[] = [
  { value: '', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'failed', label: 'Failed' },
];

const industryOptions: SelectOption[] = [
  { value: '', label: 'All Industries' },
  { value: 'car_sales', label: 'Car Sales' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'custom', label: 'Custom' },
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

export default function ClonesPage() {
  const router = useRouter();
  const [clones, setClones] = useState<Clone[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  useEffect(() => {
    fetchClones();
  }, [statusFilter, industryFilter]);

  const fetchClones = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (industryFilter) params.append('industry', industryFilter);
      if (searchTerm) params.append('search', searchTerm);

      const response = await authenticatedFetch(`/api/clones?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch clones');
      }
      const data = await response.json();
      setClones(data.data || []);
    } catch (error) {
      console.error('Error fetching clones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchClones();
  };

  const handleCloneAction = async (cloneId: string, action: 'activate' | 'pause' | 'delete') => {
    try {
      // API routes for these actions would be created separately
      console.log(`Performing ${action} on clone ${cloneId}`);
      // After action, refresh clones
      fetchClones();
    } catch (error) {
      console.error(`Error ${action} clone:`, error);
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
                <h1 className="text-2xl font-bold">Clone Management</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Create and manage your AI clones
                </p>
              </div>
              <Link href="/dashboard/clones/clone-2">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Clone
                </Button>
              </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <form onSubmit={handleSearch} className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clones by name or industry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
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
                options={industryOptions}
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                placeholder="Filter by industry"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Activity className="h-8 w-8 animate-spin mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Loading clones...</p>
                </div>
              </div>
            ) : clones.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No clones found</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchTerm || statusFilter || industryFilter
                    ? 'Try adjusting your filters'
                    : 'Get started by creating your first AI clone'}
                </p>
                <Link href="/dashboard/clones/clone-2">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Clone
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Clones
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{clones.length}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Active
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {clones.filter((c) => c.status === 'active').length}
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
                        {clones.filter((c) => c.status === 'processing').length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Conversations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold flex items-center gap-1">
                        <MessageSquare className="h-5 w-5 text-muted-foreground" />
                        <span>0</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Clones List */}
                <div className="space-y-3">
                  {clones.map((clone) => (
                    <Card key={clone.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{clone.name}</h3>
                              <Badge variant={getStatusBadge(clone.status)}>
                                {clone.status}
                              </Badge>
                              {clone.industryType && (
                                <Badge variant="outline">
                                  {clone.industryType.replace('_', ' ')}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Created: {new Date(clone.createdAt).toLocaleDateString()}</span>
                              {clone.tavusReplicaId && (
                                <span>Replica ID: {clone.tavusReplicaId.substring(0, 8)}...</span>
                              )}
                            </div>
                            {clone.conversationURL && (
                              <div className="mt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => window.open(clone.conversationURL, '_blank')}
                                  className="text-xs"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Join Conversation
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Link href={`/dashboard/clones/${clone.id}`}>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleCloneAction(
                                  clone.id,
                                  clone.isActive ? 'pause' : 'activate'
                                )
                              }
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
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCloneAction(clone.id, 'delete')}
                            >
                              <Trash2 className="h-4 w-4" />
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
