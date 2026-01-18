'use client';

import React, { useState } from 'react';
import { CloneWizardData } from '@/lib/types/clone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Edit2, Loader2 } from 'lucide-react';

interface Step7ReviewDeployProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

export default function Step7ReviewDeploy({ data, updateData }: Step7ReviewDeployProps) {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const handleDeploy = async () => {
    setIsDeploying(true);
    setDeploymentStatus('processing');
    
    try {
      // Call API to create clone via Tavus.io
      const response = await fetch('/api/clones/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create clone');
      }

      const result = await response.json();
      setDeploymentStatus('success');
      
      // Clear draft after successful deployment
      if (typeof window !== 'undefined') {
        localStorage.removeItem('clone_wizard_draft');
      }
      
      // Redirect to clone detail page or dashboard
      const cloneId = result.data?.cloneId || result.data?.clone?.id;
      if (cloneId) {
        setTimeout(() => {
          window.location.href = `/dashboard/clones/${cloneId}`;
        }, 2000);
      } else {
        // Fallback to clones list if ID is not available
        setTimeout(() => {
          window.location.href = `/dashboard/clones`;
        }, 2000);
      }
    } catch (error) {
      console.error('Deployment error:', error);
      setDeploymentStatus('error');
      setIsDeploying(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Configuration Summary</h3>
        
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Basic Information
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p><strong>Name:</strong> {data.step1.name || 'Not set'}</p>
              <p><strong>Industry:</strong> {data.step1.industryType || 'Not set'}</p>
              <p><strong>Language:</strong> {data.step1.language || 'Not set'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Avatar
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Type:</strong> {data.step2.avatarType || 'Not configured'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Voice
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Type:</strong> {data.step3.voiceType || 'Not configured'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Personality
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Traits:</strong> {data.step4.personalityTraits?.join(', ') || 'None'}</p>
              <p><strong>Response Style:</strong> {data.step4.responseStyle || 'Not set'}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                Conversation Settings
                <Edit2 className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p><strong>Lead Questions:</strong> {data.step6.leadQualificationQuestions?.length || 0}</p>
              <p><strong>Appointment Booking:</strong> {data.step6.appointmentBookingEnabled ? 'Enabled' : 'Disabled'}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Processing Time Estimate</h4>
        <p className="text-sm text-muted-foreground">
          Clone generation typically takes 5-15 minutes. You'll be notified when it's ready.
        </p>
      </div>

      {deploymentStatus === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <span className="text-sm text-green-800 dark:text-green-200">
            Clone created successfully! Redirecting...
          </span>
        </div>
      )}

      {deploymentStatus === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-800 dark:text-red-200">
            An error occurred during deployment. Please try again.
          </p>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleDeploy}
          disabled={isDeploying || !data.step1.name}
          size="lg"
        >
          {isDeploying ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating Clone...
            </>
          ) : (
            'Generate Clone'
          )}
        </Button>
      </div>
    </div>
  );
}
