'use client';

import React, { useState, useEffect, useId } from 'react';
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

function FacebookLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#1877F2"
        d="M13.5 22v-9h3l.5-4h-3.5V7.5c0-1.1.3-1.8 1.9-1.8H17V2.1c-.4-.1-1.7-.2-3.2-.2-3 0-5 1.8-5 5.2V9H5v4h3.8v9h4.7Z"
      />
    </svg>
  );
}

function InstagramLogo(props: React.SVGProps<SVGSVGElement>) {
  const gradientId = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F56040" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#F56040" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#4C5FD7" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M7.2 2h9.6C19.3 2 21 3.7 21 6.2v11.6c0 2.5-1.7 4.2-4.2 4.2H7.2C4.7 22 3 20.3 3 17.8V6.2C3 3.7 4.7 2 7.2 2Zm9.6 2H7.2C6 4 5 5 5 6.2v11.6C5 19 6 20 7.2 20h9.6c1.2 0 2.2-1 2.2-2.2V6.2C19.2 5 18.2 4 16.8 4Zm-4.8 4.3c2.9 0 5.2 2.3 5.2 5.2S14.9 18.7 12 18.7 6.8 16.4 6.8 13.5s2.3-5.2 5.2-5.2Zm0 2c-1.8 0-3.2 1.4-3.2 3.2S10.2 16.7 12 16.7s3.2-1.4 3.2-3.2S13.8 10.3 12 10.3ZM17.4 8.1a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2Z"
      />
    </svg>
  );
}

function LinkedInLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="#0A66C2"
        d="M6.5 6.8c0 1.1-.8 2-2 2s-2-.9-2-2 .8-2 2-2 2 .9 2 2ZM2.6 21.5V9.2h3.8v12.3H2.6Zm7 0V9.2h3.6v1.7h.1c.5-.9 1.6-1.9 3.3-1.9 3.5 0 4.1 2.3 4.1 5.4v7.1h-3.8v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3v6.4H9.6Z"
      />
    </svg>
  );
}

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

  const getCloneShareUrl = (clone: Clone) => {
    if (clone.conversationURL) return clone.conversationURL;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    return origin ? `${origin}/dashboard/clones/${clone.id}` : `/dashboard/clones/${clone.id}`;
  };

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
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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
                          <div className="flex w-full flex-col gap-3 lg:w-auto lg:items-end">
                            <div className="flex flex-wrap items-center gap-2">
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

                            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/40 px-3 py-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                Share:
                              </span>
                              {/* Facebook/LinkedIn support URL-based share endpoints. Instagram uses a mobile share sheet fallback. */}
                              <Button
                                asChild
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Share on Facebook"
                              >
                                <a
                                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                    getCloneShareUrl(clone)
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FacebookLogo className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Share on Instagram"
                                onClick={() => {
                                  const shareUrl = getCloneShareUrl(clone);
                                  const shareText = `Check out this AI clone: ${clone.name}`;

                                  if (typeof navigator !== 'undefined' && (navigator as any).share) {
                                    (navigator as any)
                                      .share({ url: shareUrl, text: shareText })
                                      .catch(() => window.open(`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`, '_blank', 'noopener,noreferrer'));
                                    return;
                                  }

                                  window.open(
                                    `https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`,
                                    '_blank',
                                    'noopener,noreferrer'
                                  );
                                }}
                              >
                                <InstagramLogo className="h-4 w-4" />
                              </Button>
                              <Button
                                asChild
                                variant="ghost"
                                size="icon-sm"
                                aria-label="Share on LinkedIn"
                              >
                                <a
                                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                                    getCloneShareUrl(clone)
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <LinkedInLogo className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
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
