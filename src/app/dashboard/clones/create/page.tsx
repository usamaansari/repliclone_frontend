'use client';

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import CloneWizard from '@/components/clones/wizard/CloneWizard';

export default function CreateClonePage() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <CloneWizard />
        </div>
      </div>
    </ProtectedRoute>
  );
}
