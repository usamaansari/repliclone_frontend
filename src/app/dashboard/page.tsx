'use client';

import React, { useState, useEffect } from 'react';
import { Conversation } from '@/components/cvi/components/conversation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { getAuthHeader } from '@/utils/auth';

const Dashboard = () => {
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createConversation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create conversation");
      }

      const data = await response.json();
      setConversationUrl(data.conversation_url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-start conversation when component mounts
  useEffect(() => {
    if (!conversationUrl && !isLoading) {
      createConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-6xl h-full flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold mb-8 text-foreground">
                ReplicloneAI - Car Sales Agent Integration
              </h1>
              {!conversationUrl ? (
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={createConversation}
                    disabled={isLoading}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isLoading ? "Creating Conversation..." : "Start Conversation"}
                  </button>
                  {error && (
                    <p className="text-destructive text-sm mt-2">
                      {error}
                    </p>
                  )}
                </div>
              ) : (
                <div className="w-full h-full max-h-[800px]">
                  <Conversation
                    conversationUrl={conversationUrl}
                    onLeave={() => setConversationUrl(null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;