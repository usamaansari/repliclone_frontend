'use client';

import React, { useState, useEffect } from 'react';
import { Conversation } from '@/components/cvi/components/conversation';

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        textAlign: "center",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Tavus CVI Integration</h1>
      {!conversationUrl ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={createConversation}
            disabled={isLoading}
            style={{
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              background: "#6a0dad",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.6 : 1,
            }}
          >
            {isLoading ? "Creating Conversation..." : "Start Conversation"}
          </button>
          {error && (
            <p style={{ color: "#ff6b6b", marginTop: "0.5rem" }}>
              {error}
            </p>
          )}
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "800px", height: "100%" }}>
          <Conversation
            conversationUrl={conversationUrl}
            onLeave={() => setConversationUrl(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;