'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Loader2, CheckCircle2, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authenticatedFetch } from '@/utils/api-client';

interface PersonaData {
  persona_name: string;
  system_prompt: string;
  context: string;
  default_replica_id: string;
  perception_model: string;
  smart_turn_detection: boolean;
  industry_type: string;
}

interface ConversationData {
  conversation_name: string;
  persona_id: string;
}

interface JoinData {
  conversation_url: string;
  conversation_id: string;
}

const stepTitles = [
  'Create Persona',
  'Create Conversation',
  'Join Conversation',
];

export default function Clone2Wizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Step 1: Persona data
  const [personaData, setPersonaData] = useState<PersonaData>({
    persona_name: '',
    system_prompt: '',
    context: '',
    default_replica_id: '',
    perception_model: 'raven-0',
    smart_turn_detection: true,
    industry_type: 'custom',
  });
  
  // Step 2: Conversation data
  const [conversationData, setConversationData] = useState<ConversationData>({
    conversation_name: '',
    persona_id: '',
  });
  
  // Step 3: Join data
  const [joinData, setJoinData] = useState<JoinData>({
    conversation_url: '',
    conversation_id: '',
  });

  const [createdPersonaId, setCreatedPersonaId] = useState<string | null>(null);
  const [createdCloneId, setCreatedCloneId] = useState<string | null>(null);
  const [selectedReplicaId, setSelectedReplicaId] = useState<string | null>(null);
  const [availableReplicas, setAvailableReplicas] = useState<Array<{
    replica_id: string;
    replica_name: string;
    thumbnail_video_url?: string;
    status?: string;
    replica_type?: string;
  }>>([]);
  const [loadingReplicas, setLoadingReplicas] = useState(true);

  // Fetch available replicas on mount
  React.useEffect(() => {
    const fetchReplicas = async () => {
      try {
        setLoadingReplicas(true);
        const response = await authenticatedFetch('/api/tavus/resources?type=replicas&verbose=true');
        if (!response.ok) {
          throw new Error('Failed to fetch replicas');
        }
        const data = await response.json();
        console.log('Replicas data:', data); // Debug log
        if (data.success && data.data.replicas) {
          const mappedReplicas = data.data.replicas.map((r: any) => ({
            replica_id: r.replica_id || r.id,
            replica_name: r.replica_name || r.name,
            thumbnail_video_url: r.thumbnail_video_url,
            status: r.status,
            replica_type: r.replica_type,
            training_progress: r.training_progress,
            created_at: r.created_at,
          }));
          console.log('Mapped replicas:', mappedReplicas); // Debug log
          setAvailableReplicas(mappedReplicas);
        } else {
          console.warn('No replicas found in response:', data);
        }
      } catch (err) {
        console.error('Error fetching replicas:', err);
        // Don't show error to user, just leave replicas empty
      } finally {
        setLoadingReplicas(false);
      }
    };
    fetchReplicas();
  }, []);

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate Step 1
      if (!personaData.persona_name || !personaData.system_prompt || !personaData.default_replica_id || !personaData.industry_type) {
        setError('Please fill in all required fields: Persona Name, System Prompt, Industry Type, and select a Replica');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Create persona with full pipeline via API route
        const response = await authenticatedFetch('/api/personas/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            persona_name: personaData.persona_name,
            system_prompt: personaData.system_prompt,
            default_replica_id: personaData.default_replica_id,
            context: personaData.context,
            perception_model: personaData.perception_model,
            smart_turn_detection: personaData.smart_turn_detection,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create persona');
        }

        const result = await response.json();
        const persona = result.data;
        
        setCreatedPersonaId(persona.persona_id);
        setConversationData(prev => ({ ...prev, persona_id: persona.persona_id }));
        
        // Save clone to database
        try {
          const cloneResponse = await authenticatedFetch('/api/clones/create-full-pipeline', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: personaData.persona_name,
              tavusPersonaId: persona.persona_id,
              default_replica_id: personaData.default_replica_id, // This is the replica_id from selected replica
              system_prompt: personaData.system_prompt,
              context: personaData.context,
              perception_model: personaData.perception_model,
              smart_turn_detection: personaData.smart_turn_detection,
              industry_type: personaData.industry_type,
            }),
          });

          if (!cloneResponse.ok) {
            console.error('Failed to save clone to database, but persona was created');
            // Show warning but continue
            setError('Persona created successfully, but failed to save to database. You can still proceed.');
          } else {
            // Success - clone saved to database
            const cloneResult = await cloneResponse.json();
            if (cloneResult.data?.cloneId) {
              setCreatedCloneId(cloneResult.data.cloneId);
            }
            console.log('Clone saved to database successfully');
          }
        } catch (dbError) {
          console.error('Error saving clone to database:', dbError);
          // Continue even if database save fails - persona is already created
          setError('Persona created successfully, but failed to save to database. You can still proceed.');
        }
        
        setCurrentStep(2);
      } catch (err: any) {
        setError(err.message || 'Failed to create persona');
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      // Validate Step 2
      if (!conversationData.conversation_name || !conversationData.persona_id) {
        setError('Please fill in the conversation name');
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        // Create conversation via API route
        const response = await authenticatedFetch('/api/conversations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            persona_id: conversationData.persona_id,
            conversation_name: conversationData.conversation_name,
            replica_id: selectedReplicaId || personaData.default_replica_id, // Use selected replica ID
            clone_id: createdCloneId, // Pass clone ID to save conversation to database
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create conversation');
        }

        const result = await response.json();
        const conversation = result.data;
        
        setJoinData({
          conversation_url: conversation.conversation_url || '',
          conversation_id: conversation.conversation_id,
        });
        setCurrentStep(3);
      } catch (err: any) {
        setError(err.message || 'Failed to create conversation');
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleJoinConversation = () => {
    if (joinData.conversation_url) {
      window.open(joinData.conversation_url, '_blank');
    }
  };

  const progress = ((currentStep - 1) / 3) * 100;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create Clone (Full Pipeline)</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep} of 3: {stepTitles[currentStep - 1]}
            </p>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Progress
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="mt-4 flex items-center justify-between">
          {stepTitles.map((title, index) => {
            const stepNum = index + 1;
            const isActive = currentStep === stepNum;
            const isCompleted = currentStep > stepNum;
            return (
              <div
                key={stepNum}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isActive
                      ? 'bg-primary-foreground text-primary'
                      : isCompleted
                      ? 'bg-secondary-foreground text-secondary'
                      : 'bg-muted'
                  }`}
                >
                  {isCompleted ? '✓' : stepNum}
                </span>
                <span className="hidden sm:inline">{title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Create a persona with full pipeline capabilities including perception and speech recognition'}
              {currentStep === 2 && 'Create a new conversation using your persona'}
              {currentStep === 3 && 'Join your conversation and start interacting with your AI clone'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Step 1: Create Persona */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="persona_name">Persona Name *</Label>
                  <Input
                    id="persona_name"
                    placeholder="e.g., Interviewer"
                    value={personaData.persona_name}
                    onChange={(e) => setPersonaData(prev => ({ ...prev, persona_name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry_type">Industry Type *</Label>
                  <Select
                    placeholder="Select industry type..."
                    options={[
                      { value: 'car_sales', label: 'Car Sales' },
                      { value: 'real_estate', label: 'Real Estate' },
                      { value: 'custom', label: 'Custom' },
                    ]}
                    value={personaData.industry_type}
                    onChange={(e) => setPersonaData(prev => ({ ...prev, industry_type: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="system_prompt">System Prompt *</Label>
                  <Textarea
                    id="system_prompt"
                    placeholder="e.g., As an Interviewer, you are a skilled professional who conducts thoughtful and structured interviews..."
                    rows={4}
                    value={personaData.system_prompt}
                    onChange={(e) => setPersonaData(prev => ({ ...prev, system_prompt: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="context">Context</Label>
                  <Textarea
                    id="context"
                    placeholder="e.g., You have a track record of conducting interviews that put candidates at ease..."
                    rows={3}
                    value={personaData.context}
                    onChange={(e) => setPersonaData(prev => ({ ...prev, context: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default_replica_id">Select Replica *</Label>
                  {loadingReplicas ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground py-8">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Loading available replicas...</span>
                    </div>
                  ) : availableReplicas.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {availableReplicas.map((replica) => {
                        const isSelected = personaData.default_replica_id === replica.replica_id;
                        return (
                          <button
                            key={replica.replica_id}
                            type="button"
                            onClick={() => {
                              setPersonaData(prev => ({ ...prev, default_replica_id: replica.replica_id }));
                              setSelectedReplicaId(replica.replica_id);
                            }}
                            className={`relative group border-2 rounded-lg overflow-hidden transition-all ${
                              isSelected
                                ? 'border-primary ring-2 ring-primary ring-offset-2'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            {replica.thumbnail_video_url ? (
                              <div className="aspect-video bg-muted relative overflow-hidden group">
                                <video
                                  src={replica.thumbnail_video_url}
                                  className="w-full h-full object-cover"
                                  muted
                                  playsInline
                                  loop
                                  preload="metadata"
                                  onMouseEnter={(e) => {
                                    // Play video on hover
                                    const video = e.currentTarget;
                                    video.play().catch(() => {
                                      // Ignore autoplay errors
                                    });
                                  }}
                                  onMouseLeave={(e) => {
                                    // Pause video when not hovering
                                    const video = e.currentTarget;
                                    video.pause();
                                    video.currentTime = 0;
                                  }}
                                  onError={(e) => {
                                    // Fallback if video fails to load
                                    const target = e.currentTarget;
                                    target.style.display = 'none';
                                    // Show placeholder
                                    const placeholder = target.parentElement?.querySelector('.video-placeholder') as HTMLElement;
                                    if (placeholder) {
                                      placeholder.style.display = 'flex';
                                    }
                                  }}
                                />
                                {/* Placeholder for failed videos */}
                                <div className="video-placeholder absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center" style={{ display: 'none' }}>
                                  <div className="text-center">
                                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                                      <span className="text-2xl">👤</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">No Preview</p>
                                  </div>
                                </div>
                                {isSelected && (
                                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center z-10 border-2 border-primary">
                                    <CheckCircle2 className="h-8 w-8 text-primary bg-background rounded-full" />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                                <div className="text-center p-2">
                                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                                    <span className="text-3xl">👤</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">No Preview</p>
                                </div>
                                {isSelected && (
                                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                    <CheckCircle2 className="h-8 w-8 text-primary" />
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="p-2 bg-background">
                              <p className="text-xs font-medium truncate">{replica.replica_name}</p>
                              {replica.replica_type && (
                                <p className="text-xs text-muted-foreground capitalize">
                                  {replica.replica_type}
                                </p>
                              )}
                              {replica.status && (
                                <p className={`text-xs mt-1 ${
                                  replica.status === 'completed' ? 'text-green-600' :
                                  replica.status === 'error' ? 'text-red-600' :
                                  'text-yellow-600'
                                }`}>
                                  {replica.status}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <>
                      <Input
                        id="default_replica_id"
                        placeholder="e.g., rfe12d8b9597"
                        value={personaData.default_replica_id}
                        onChange={(e) => {
                          setPersonaData(prev => ({ ...prev, default_replica_id: e.target.value }));
                          setSelectedReplicaId(e.target.value);
                        }}
                      />
                      <p className="text-xs text-muted-foreground">
                        No replicas found. Enter the replica ID manually (e.g., Phoenix-3 stock replica ID)
                      </p>
                    </>
                  )}
                  {!loadingReplicas && availableReplicas.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Click on a replica image to select it. Selected replica: {personaData.default_replica_id || 'None'}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="perception_model">Perception Model</Label>
                  <Input
                    id="perception_model"
                    placeholder="e.g., raven-0"
                    value={personaData.perception_model}
                    onChange={(e) => setPersonaData(prev => ({ ...prev, perception_model: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enables screen sharing and visual perception capabilities
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="smart_turn_detection"
                    checked={personaData.smart_turn_detection}
                    onChange={(e) => setPersonaData(prev => ({ ...prev, smart_turn_detection: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="smart_turn_detection" className="cursor-pointer">
                    Enable Smart Turn Detection (Sparrow model)
                  </Label>
                </div>
              </div>
            )}

            {/* Step 2: Create Conversation */}
            {currentStep === 2 && (
              <div className="space-y-4">
                {createdPersonaId && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-medium">Persona Created Successfully!</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                      Persona ID: {createdPersonaId}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="conversation_name">Conversation Name *</Label>
                  <Input
                    id="conversation_name"
                    placeholder="e.g., Interview User"
                    value={conversationData.conversation_name}
                    onChange={(e) => setConversationData(prev => ({ ...prev, conversation_name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="persona_id">Persona ID</Label>
                  <Input
                    id="persona_id"
                    value={conversationData.persona_id}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Join Conversation */}
            {currentStep === 3 && (
              <div className="space-y-4">
                {joinData.conversation_url && (
                  <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
                      Conversation Created Successfully!
                    </h3>
                    <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                      Conversation ID: {joinData.conversation_id}
                    </p>
                    <Button
                      onClick={handleJoinConversation}
                      className="w-full sm:w-auto"
                      size="lg"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Join Conversation
                    </Button>
                  </div>
                )}

                {joinData.conversation_url && (
                  <div className="space-y-2">
                    <Label>Conversation URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={joinData.conversation_url}
                        readOnly
                        className="bg-muted"
                      />
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(joinData.conversation_url);
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1 || loading}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 3 ? (
            <Button onClick={handleNext} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          ) : (
            <Button onClick={() => router.push('/dashboard/clones')}>
              Back to Clones
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
