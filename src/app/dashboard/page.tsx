'use client';

import React, { useState, useEffect } from 'react';
import { Conversation } from '@/components/cvi/components/conversation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { authenticatedFetch } from '@/utils/api-client';

const Dashboard = () => {
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [personaId, setPersonaId] = useState<string | null>(null);
  const [loadingPersona, setLoadingPersona] = useState(true);

  // Fetch user's clones to get persona_id
  useEffect(() => {
    const fetchPersonaId = async () => {
      try {
        setLoadingPersona(true);
        const response = await authenticatedFetch("/api/clones");
        
        if (!response.ok) {
          throw new Error("Failed to fetch clones");
        }

        const data = await response.json();
        const clones = data.data || [];
        
        // Find first clone with a persona_id (full pipeline clone)
        const cloneWithPersona = clones.find((clone: any) => clone.tavusPersonaId);
        
        if (cloneWithPersona) {
          setPersonaId(cloneWithPersona.tavusPersonaId);
        } else {
          setError("No personas found. Please create a clone with full pipeline first.");
        }
      } catch (err) {
        console.error("Error fetching clones:", err);
        if (err instanceof Error && !err.message.includes("Authentication expired")) {
          setError("Failed to load your clones. Please try again.");
        }
      } finally {
        setLoadingPersona(false);
      }
    };

    fetchPersonaId();
  }, []);

  const createConversation = async () => {
    if (!personaId) {
      setError("No persona available. Please create a clone with full pipeline first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authenticatedFetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          persona_id: personaId,
          conversation_name: "Dashboard Conversation",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create conversation");
      }

      const result = await response.json();
      setConversationUrl(result.data?.conversation_url || result.conversation_url);
    } catch (err) {
      // If it's a token expiration error, handleTokenExpiration already redirected
      // Otherwise, show the error message
      if (err instanceof Error && err.message.includes("Authentication expired")) {
        // User is being redirected, don't set error state
        return;
      }
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-start conversation when persona is loaded
  useEffect(() => {
    if (!loadingPersona && personaId && !conversationUrl && !isLoading) {
      createConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingPersona, personaId]);

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
                  {loadingPersona ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-muted-foreground text-sm">Loading your clones...</p>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={createConversation}
                        disabled={isLoading || !personaId}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading ? "Creating Conversation..." : "Start Conversation"}
                      </button>
                      {error && (
                        <div className="max-w-md text-center">
                          <p className="text-destructive text-sm mt-2">
                            {error}
                          </p>
                          {!personaId && (
                            <p className="text-muted-foreground text-xs mt-2">
                              Visit the Clones page to create your first persona with full pipeline.
                            </p>
                          )}
                        </div>
                      )}
                    </>
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