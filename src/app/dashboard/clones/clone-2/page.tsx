'use client';

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import Clone2Wizard from '@/components/clones/wizard/Clone2Wizard';

export default function Clone2Page() {
  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Clone2Wizard />
        </div>
      </div>
    </ProtectedRoute>
  );
}
