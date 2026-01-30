/**
 * Tavus.io API Service
 * Handles all interactions with the Tavus.io API
 */

export interface CreateReplicaPayload {
  name: string;
  video_url?: string;
  image_url?: string;
  voice_url?: string;
  configuration?: {
    personality_traits?: string[];
    tone?: {
      formal?: number;
      casual?: number;
    };
    response_style?: string;
    training_data?: any;
  };
}

export interface CreateReplicaResponse {
  replica_id: string;
  status: 'pending' | 'processing' | 'active' | 'failed';
  processing_time_estimate?: number;
  message?: string;
}

export interface ReplicaStatus {
  replica_id: string;
  status: 'pending' | 'processing' | 'active' | 'failed';
  progress?: number;
  error?: string;
  video_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface UpdateReplicaPayload {
  name?: string;
  configuration?: {
    personality_traits?: string[];
    tone?: {
      formal?: number;
      casual?: number;
    };
    response_style?: string;
    training_data?: any;
  };
}

// Conversation APIs
export interface CreateConversationPayload {
  persona_id: string;
  replica_id?: string; // Optional if persona has default replica
  audio_only?: boolean;
  conversation_name?: string;
  callback_url?: string;
  conversational_context?: Record<string, any>;
  custom_greeting?: string;
  memory_stores?: string[];
  document_ids?: string[];
  document_retrieval_strategy?: string;
  document_tags?: string[];
}

export interface Conversation {
  conversation_id: string;
  conversation_url: string;
  status: 'active' | 'ended';
  persona_id?: string;
  replica_id?: string;
  created_at?: string;
  updated_at?: string;
  ended_at?: string;
  transcript?: string;
  shutdown_reason?: string;
}

// Legacy conversation interface for backward compatibility
export interface ConversationPayload {
  replica_id: string;
  user_message: string;
  context?: Record<string, any>;
  response_format?: 'text' | 'audio' | 'video';
}

export interface ConversationResponse {
  response: string;
  audio_url?: string;
  video_url?: string;
  conversation_id?: string;
}

// Persona APIs
export interface CreatePersonaPayload {
  name?: string; // Legacy support
  persona_name?: string; // Full pipeline uses persona_name
  system_prompt?: string;
  pipeline_mode?: 'full' | 'echo';
  replica_id?: string; // Legacy support
  default_replica_id?: string; // Full pipeline uses default_replica_id
  document_ids?: string[];
  document_tags?: string[];
  conversational_context?: Record<string, any>;
  context?: string; // Full pipeline context
  layers?: {
    perception?: {
      perception_model?: string; // e.g., "raven-0"
    };
    stt?: {
      smart_turn_detection?: boolean;
    };
    llm?: {
      model?: string;
      temperature?: number;
      max_tokens?: number;
    };
    tts?: {
      voice_id?: string;
      speed?: number;
    };
  };
}

export interface Persona {
  persona_id: string;
  name: string;
  system_prompt?: string;
  pipeline_mode?: 'full' | 'echo';
  replica_id?: string;
  document_ids?: string[];
  created_at?: string;
  updated_at?: string;
}

// Objectives APIs
export interface CreateObjectivePayload {
  name: string;
  description?: string;
  objective_type?: string;
  priority?: number;
  enabled?: boolean;
  conditions?: Record<string, any>;
}

export interface Objective {
  objective_id: string;
  name: string;
  description?: string;
  objective_type?: string;
  priority?: number;
  enabled?: boolean;
  conditions?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

// Guardrails APIs
export interface CreateGuardrailsPayload {
  name: string;
  description?: string;
  rules?: string[];
  enabled?: boolean;
  severity?: 'low' | 'medium' | 'high';
}

export interface Guardrails {
  guardrails_id: string;
  name: string;
  description?: string;
  rules?: string[];
  enabled?: boolean;
  severity?: 'low' | 'medium' | 'high';
  created_at?: string;
  updated_at?: string;
}

// Knowledge Base/Documents APIs
export interface CreateDocumentPayload {
  name: string;
  document_type: 'url' | 'text' | 'file';
  content?: string; // For text type
  url?: string; // For url type
  file_url?: string; // For file type
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface Document {
  document_id: string;
  name: string;
  document_type: 'url' | 'text' | 'file';
  status: 'processing' | 'ready' | 'failed';
  content?: string;
  url?: string;
  file_url?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  error?: string;
}

// Video Generation APIs
export interface GenerateVideoPayload {
  replica_id: string;
  script: string; // Required unless audio_url provided
  audio_url?: string;
  video_name?: string;
  background_url?: string;
  background_source_url?: string;
  callback_url?: string;
  fast?: boolean;
  transparent_background?: boolean;
  watermark_image_url?: string;
}

export interface Video {
  video_id: string;
  replica_id: string;
  status: 'queued' | 'generating' | 'ready' | 'failed';
  script?: string;
  video_name?: string;
  hosted_url?: string;
  download_url?: string;
  thumbnail_url?: string;
  duration?: number;
  created_at?: string;
  updated_at?: string;
  error?: string;
}

export interface TavusResource {
  id: string;
  name: string;
  description?: string;
  thumbnail_url?: string;
  preview_url?: string;
  category?: string;
  tags?: string[];
}

export interface TavusReplica {
  replica_id: string;
  replica_name: string;
  thumbnail_video_url?: string;
  training_progress?: string;
  status: 'started' | 'completed' | 'error';
  created_at?: string;
  replica_type?: 'user' | 'system';
}

export interface TavusVoice {
  voice_id: string;
  name: string;
  gender?: 'male' | 'female' | 'neutral';
  age_range?: string;
  accent?: string;
  language?: string;
  preview_url?: string;
}

export interface TavusAvatar {
  avatar_id: string;
  name: string;
  type: 'photo' | 'video' | 'template';
  thumbnail_url?: string;
  preview_url?: string;
  industry?: string;
  tags?: string[];
}

class TavusApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = (process.env.NEXT_TAVUS_API_KEY || '').trim();
    this.baseUrl = process.env.NEXT_TAVUS_API_BASE_URL || 'https://tavusapi.com/v2';
    
    if (!this.apiKey) {
      console.warn('NEXT_TAVUS_API_KEY is not configured - Tavus integration will be disabled');
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey,
    };
  }

  /**
   * Create a fetch with timeout using AbortController for better control
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeoutMs = 30000
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      // Provide better error messages for timeout/abort errors
      if (error.name === 'AbortError' || error.code === 'UND_ERR_CONNECT_TIMEOUT') {
        throw new Error(`Tavus API request timed out after ${timeoutMs}ms. The API may be slow or unreachable.`);
      }
      throw error;
    }
  }

  /**
   * Create a new replica
   * POST /replicas
   */
  async createReplica(payload: CreateReplicaPayload): Promise<CreateReplicaResponse> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured. Please set NEXT_TAVUS_API_KEY environment variable.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/replicas`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(30000), // 30 second timeout instead of default 10s
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        replica_id: data.replica_id || data.id,
        status: data.status || 'pending',
        processing_time_estimate: data.processing_time_estimate || 900, // Default 15 minutes
        message: data.message,
      };
    } catch (error) {
      console.error('Error creating replica:', error);
      throw error;
    }
  }

  /**
   * Get replica status
   * GET /replicas/{replica_id}
   */
  async getReplicaStatus(replicaId: string): Promise<ReplicaStatus> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/replicas/${replicaId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        replica_id: data.replica_id || data.id,
        status: data.status || 'pending',
        progress: data.progress,
        error: data.error,
        video_url: data.video_url,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error getting replica status:', error);
      throw error;
    }
  }

  /**
   * Update replica configuration
   * PATCH /replicas/{replica_id}
   */
  async updateReplica(replicaId: string, payload: UpdateReplicaPayload): Promise<ReplicaStatus> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/replicas/${replicaId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        replica_id: data.replica_id || data.id,
        status: data.status || 'active',
        progress: data.progress,
        error: data.error,
        video_url: data.video_url,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error updating replica:', error);
      throw error;
    }
  }

  /**
   * Create a new conversation
   * POST /conversations
   */
  async createConversation(payload: CreateConversationPayload): Promise<Conversation> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/conversations`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        conversation_id: data.conversation_id || data.id,
        conversation_url: data.conversation_url,
        status: data.status || 'active',
        persona_id: data.persona_id,
        replica_id: data.replica_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  }

  /**
   * Get conversation details
   * GET /conversations/{conversation_id}
   */
  async getConversation(conversationId: string, verbose = false): Promise<Conversation> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const url = `${this.baseUrl}/conversations/${conversationId}${verbose ? '?verbose=true' : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        conversation_id: data.conversation_id || data.id,
        conversation_url: data.conversation_url,
        status: data.status,
        persona_id: data.persona_id,
        replica_id: data.replica_id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        ended_at: data.ended_at,
        transcript: data.transcript,
        shutdown_reason: data.shutdown_reason,
      };
    } catch (error) {
      console.error('Error getting conversation:', error);
      throw error;
    }
  }

  /**
   * List conversations
   * GET /conversations
   */
  async listConversations(params?: { limit?: number; offset?: number }): Promise<Conversation[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      
      const url = `${this.baseUrl}/conversations${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const conversations = Array.isArray(data) ? data : (data.conversations || []);
      
      return conversations.map((item: any) => ({
        conversation_id: item.conversation_id || item.id,
        conversation_url: item.conversation_url,
        status: item.status,
        persona_id: item.persona_id,
        replica_id: item.replica_id,
        created_at: item.created_at,
        updated_at: item.updated_at,
        ended_at: item.ended_at,
      }));
    } catch (error) {
      console.error('Error listing conversations:', error);
      throw error;
    }
  }

  /**
   * End a conversation
   * POST /conversations/{conversation_id}/end
   */
  async endConversation(conversationId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/conversations/${conversationId}/end`, {
        method: 'POST',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Conversation ended successfully',
      };
    } catch (error) {
      console.error('Error ending conversation:', error);
      throw error;
    }
  }

  /**
   * Delete a conversation
   * DELETE /conversations/{conversation_id}
   */
  async deleteConversation(conversationId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/conversations/${conversationId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Conversation deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  }

  /**
   * Legacy: Generate conversation with replica (backward compatibility)
   * This is deprecated - use createConversation instead
   * @deprecated Use createConversation instead
   */
  async generateConversation(payload: ConversationPayload): Promise<ConversationResponse> {
    console.warn('generateConversation is deprecated. Use createConversation instead.');
    
    // This is a legacy method - keeping for backward compatibility
    // In practice, you'd want to create a conversation first, then interact with it
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/conversations`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          replica_id: payload.replica_id,
          user_message: payload.user_message,
          context: payload.context || {},
          response_format: payload.response_format || 'text',
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        response: data.response || data.message,
        audio_url: data.audio_url,
        video_url: data.video_url,
        conversation_id: data.conversation_id || data.id,
      };
    } catch (error) {
      console.error('Error generating conversation:', error);
      throw error;
    }
  }

  /**
   * Delete replica
   * DELETE /replicas/{replica_id}
   */
  async deleteReplica(replicaId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/replicas/${replicaId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Replica deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting replica:', error);
      throw error;
    }
  }

  /**
   * Poll replica status until it's ready or failed
   * Useful for waiting during clone creation
   */
  async pollReplicaStatus(
    replicaId: string,
    options?: {
      interval?: number;
      maxAttempts?: number;
      onStatusUpdate?: (status: ReplicaStatus) => void;
    }
  ): Promise<ReplicaStatus> {
    const interval = options?.interval || 5000; // 5 seconds
    const maxAttempts = options?.maxAttempts || 180; // 15 minutes max (180 * 5s)

    let attempts = 0;

    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        try {
          attempts++;
          const status = await this.getReplicaStatus(replicaId);

          if (options?.onStatusUpdate) {
            options.onStatusUpdate(status);
          }

          if (status.status === 'active' || status.status === 'failed') {
            resolve(status);
            return;
          }

          if (attempts >= maxAttempts) {
            reject(new Error('Polling timeout: Replica did not complete in expected time'));
            return;
          }

          // Continue polling
          setTimeout(checkStatus, interval);
        } catch (error) {
          reject(error);
        }
      };

      checkStatus();
    });
  }

  /**
   * List all replicas/templates
   * GET /replicas or /templates
   */
  async listReplicas(params?: {
    limit?: number;
    page?: number;
    verbose?: boolean;
    replica_type?: 'user' | 'system';
    replica_ids?: string[];
  }): Promise<TavusReplica[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.verbose) queryParams.append('verbose', 'true');
      if (params?.replica_type) queryParams.append('replica_type', params.replica_type);
      if (params?.replica_ids && params.replica_ids.length > 0) {
        queryParams.append('replica_ids', params.replica_ids.join(','));
      }

      const url = `${this.baseUrl}/replicas${queryParams.toString() ? `?${queryParams}` : ''}`;
      
      const response = await this.fetchWithTimeout(
        url,
        {
          method: 'GET',
          headers: this.getHeaders(),
        },
        30000 // 30 second timeout
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      // Handle the new API response format with data array
      const replicas = data.data || [];
      
      return replicas.map((item: any) => ({
        replica_id: item.replica_id,
        replica_name: item.replica_name || item.name,
        thumbnail_video_url: item.thumbnail_video_url,
        training_progress: item.training_progress,
        status: item.status,
        created_at: item.created_at,
        replica_type: item.replica_type,
      }));
    } catch (error) {
      console.error('Error listing replicas:', error);
      throw error;
    }
  }

  /**
   * List available voices
   * GET /voices
   */
  async listVoices(): Promise<TavusVoice[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await this.fetchWithTimeout(
        `${this.baseUrl}/voices`,
        {
          method: 'GET',
          headers: this.getHeaders(),
        },
        30000 // 30 second timeout
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const voices = Array.isArray(data) ? data : (data.voices || []);
      
      return voices.map((item: any) => ({
        voice_id: item.voice_id || item.id,
        name: item.name || item.label,
        gender: item.gender,
        age_range: item.age_range,
        accent: item.accent,
        language: item.language || 'en',
        preview_url: item.preview_url || item.audio_url,
      }));
    } catch (error) {
      console.error('Error listing voices:', error);
      throw error;
    }
  }

  /**
   * List available avatars/templates
   * GET /avatars or /templates
   */
  async listAvatars(industry?: string): Promise<TavusAvatar[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      // Try avatars endpoint first
      let url = `${this.baseUrl}/avatars`;
      if (industry) {
        url += `?industry=${industry}`;
      }

      let response = await this.fetchWithTimeout(
        url,
        {
          method: 'GET',
          headers: this.getHeaders(),
        },
        30000 // 30 second timeout
      );

      if (response.status === 404) {
        // Try templates endpoint
        url = `${this.baseUrl}/templates`;
        if (industry) {
          url += `?industry=${industry}`;
        }
        response = await this.fetchWithTimeout(
          url,
          {
            method: 'GET',
            headers: this.getHeaders(),
          },
          30000 // 30 second timeout
        );
      }

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const avatars = Array.isArray(data) ? data : (data.avatars || data.templates || []);
      
      return avatars.map((item: any) => ({
        avatar_id: item.avatar_id || item.id || item.template_id,
        name: item.name || item.title,
        type: item.type || (item.video_url ? 'video' : 'photo'),
        thumbnail_url: item.thumbnail_url || item.image_url,
        preview_url: item.preview_url || item.video_url || item.image_url,
        industry: item.industry,
        tags: item.tags,
      }));
    } catch (error) {
      console.error('Error listing avatars:', error);
      throw error;
    }
  }

  // ========== Persona APIs ==========

  /**
   * Create a persona
   * POST /personas
   */
  async createPersona(payload: CreatePersonaPayload): Promise<Persona> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      // Normalize payload for API - support both legacy and full pipeline formats
      const apiPayload: any = {
        ...(payload.persona_name || payload.name ? { persona_name: payload.persona_name || payload.name } : {}),
        ...(payload.system_prompt ? { system_prompt: payload.system_prompt } : {}),
        ...(payload.pipeline_mode ? { pipeline_mode: payload.pipeline_mode } : {}),
        ...(payload.default_replica_id || payload.replica_id ? { default_replica_id: payload.default_replica_id || payload.replica_id } : {}),
        ...(payload.context ? { context: payload.context } : {}),
        ...(payload.document_ids ? { document_ids: payload.document_ids } : {}),
        ...(payload.document_tags ? { document_tags: payload.document_tags } : {}),
        ...(payload.conversational_context ? { conversational_context: payload.conversational_context } : {}),
        ...(payload.layers ? { layers: payload.layers } : {}),
      };

      const response = await fetch(`${this.baseUrl}/personas`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        persona_id: data.persona_id || data.id,
        name: data.name || data.persona_name,
        system_prompt: data.system_prompt,
        pipeline_mode: data.pipeline_mode,
        replica_id: data.replica_id || data.default_replica_id,
        document_ids: data.document_ids,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error creating persona:', error);
      throw error;
    }
  }

  /**
   * Get persona
   * GET /personas/{persona_id}
   */
  async getPersona(personaId: string): Promise<Persona> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/personas/${personaId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        persona_id: data.persona_id || data.id,
        name: data.name,
        system_prompt: data.system_prompt,
        pipeline_mode: data.pipeline_mode,
        replica_id: data.replica_id,
        document_ids: data.document_ids,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error getting persona:', error);
      throw error;
    }
  }

  /**
   * List personas
   * GET /personas
   */
  async listPersonas(params?: { limit?: number; offset?: number }): Promise<Persona[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      
      const url = `${this.baseUrl}/personas${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const personas = Array.isArray(data) ? data : (data.personas || []);
      
      return personas.map((item: any) => ({
        persona_id: item.persona_id || item.id,
        name: item.name,
        system_prompt: item.system_prompt,
        pipeline_mode: item.pipeline_mode,
        replica_id: item.replica_id,
        document_ids: item.document_ids,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
    } catch (error) {
      console.error('Error listing personas:', error);
      throw error;
    }
  }

  /**
   * Update persona
   * PATCH /personas/{persona_id}
   */
  async updatePersona(personaId: string, payload: Partial<CreatePersonaPayload>): Promise<Persona> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/personas/${personaId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        persona_id: data.persona_id || data.id,
        name: data.name,
        system_prompt: data.system_prompt,
        pipeline_mode: data.pipeline_mode,
        replica_id: data.replica_id,
        document_ids: data.document_ids,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error updating persona:', error);
      throw error;
    }
  }

  /**
   * Delete persona
   * DELETE /personas/{persona_id}
   */
  async deletePersona(personaId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/personas/${personaId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Persona deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting persona:', error);
      throw error;
    }
  }

  // ========== Objectives APIs ==========

  /**
   * Create objective
   * POST /objectives
   */
  async createObjective(payload: CreateObjectivePayload): Promise<Objective> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/objectives`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        objective_id: data.objective_id || data.id,
        name: data.name,
        description: data.description,
        objective_type: data.objective_type,
        priority: data.priority,
        enabled: data.enabled,
        conditions: data.conditions,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error creating objective:', error);
      throw error;
    }
  }

  /**
   * Get objective
   * GET /objectives/{objective_id}
   */
  async getObjective(objectiveId: string): Promise<Objective> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/objectives/${objectiveId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        objective_id: data.objective_id || data.id,
        name: data.name,
        description: data.description,
        objective_type: data.objective_type,
        priority: data.priority,
        enabled: data.enabled,
        conditions: data.conditions,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error getting objective:', error);
      throw error;
    }
  }

  /**
   * List all objectives
   * GET /objectives
   */
  async listObjectives(params?: { limit?: number; offset?: number }): Promise<Objective[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      
      const url = `${this.baseUrl}/objectives${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const objectives = Array.isArray(data) ? data : (data.objectives || []);
      
      return objectives.map((item: any) => ({
        objective_id: item.objective_id || item.id,
        name: item.name,
        description: item.description,
        objective_type: item.objective_type,
        priority: item.priority,
        enabled: item.enabled,
        conditions: item.conditions,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
    } catch (error) {
      console.error('Error listing objectives:', error);
      throw error;
    }
  }

  /**
   * Update objective
   * PATCH /objectives/{objective_id}
   */
  async updateObjective(objectiveId: string, payload: Partial<CreateObjectivePayload>): Promise<Objective> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/objectives/${objectiveId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        objective_id: data.objective_id || data.id,
        name: data.name,
        description: data.description,
        objective_type: data.objective_type,
        priority: data.priority,
        enabled: data.enabled,
        conditions: data.conditions,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error updating objective:', error);
      throw error;
    }
  }

  /**
   * Delete objective
   * DELETE /objectives/{objective_id}
   */
  async deleteObjective(objectiveId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/objectives/${objectiveId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Objective deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting objective:', error);
      throw error;
    }
  }

  // ========== Guardrails APIs ==========

  /**
   * Create guardrails
   * POST /guardrails
   */
  async createGuardrails(payload: CreateGuardrailsPayload): Promise<Guardrails> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/guardrails`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        guardrails_id: data.guardrails_id || data.id,
        name: data.name,
        description: data.description,
        rules: data.rules,
        enabled: data.enabled,
        severity: data.severity,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error creating guardrails:', error);
      throw error;
    }
  }

  /**
   * Get guardrails (one set)
   * GET /guardrails/{guardrails_id}
   */
  async getGuardrails(guardrailsId: string): Promise<Guardrails> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/guardrails/${guardrailsId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        guardrails_id: data.guardrails_id || data.id,
        name: data.name,
        description: data.description,
        rules: data.rules,
        enabled: data.enabled,
        severity: data.severity,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error getting guardrails:', error);
      throw error;
    }
  }

  /**
   * List all guardrails sets
   * GET /guardrails
   */
  async listGuardrails(params?: { limit?: number; offset?: number }): Promise<Guardrails[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      
      const url = `${this.baseUrl}/guardrails${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const guardrails = Array.isArray(data) ? data : (data.guardrails || []);
      
      return guardrails.map((item: any) => ({
        guardrails_id: item.guardrails_id || item.id,
        name: item.name,
        description: item.description,
        rules: item.rules,
        enabled: item.enabled,
        severity: item.severity,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
    } catch (error) {
      console.error('Error listing guardrails:', error);
      throw error;
    }
  }

  /**
   * Update guardrails
   * PATCH /guardrails/{guardrails_id}
   */
  async updateGuardrails(guardrailsId: string, payload: Partial<CreateGuardrailsPayload>): Promise<Guardrails> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/guardrails/${guardrailsId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        guardrails_id: data.guardrails_id || data.id,
        name: data.name,
        description: data.description,
        rules: data.rules,
        enabled: data.enabled,
        severity: data.severity,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    } catch (error) {
      console.error('Error updating guardrails:', error);
      throw error;
    }
  }

  /**
   * Delete guardrails
   * DELETE /guardrails/{guardrails_id}
   */
  async deleteGuardrails(guardrailsId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/guardrails/${guardrailsId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Guardrails deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting guardrails:', error);
      throw error;
    }
  }

  // ========== Knowledge Base/Documents APIs ==========

  /**
   * Create document
   * POST /documents
   */
  async createDocument(payload: CreateDocumentPayload): Promise<Document> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/documents`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        document_id: data.document_id || data.id,
        name: data.name,
        document_type: data.document_type,
        status: data.status || 'processing',
        content: data.content,
        url: data.url,
        file_url: data.file_url,
        tags: data.tags,
        metadata: data.metadata,
        created_at: data.created_at,
        updated_at: data.updated_at,
        error: data.error,
      };
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  /**
   * Get document
   * GET /documents/{document_id}
   */
  async getDocument(documentId: string): Promise<Document> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/documents/${documentId}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        document_id: data.document_id || data.id,
        name: data.name,
        document_type: data.document_type,
        status: data.status,
        content: data.content,
        url: data.url,
        file_url: data.file_url,
        tags: data.tags,
        metadata: data.metadata,
        created_at: data.created_at,
        updated_at: data.updated_at,
        error: data.error,
      };
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  /**
   * List documents
   * GET /documents
   */
  async listDocuments(params?: { limit?: number; offset?: number; tags?: string[] }): Promise<Document[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      if (params?.tags) {
        params.tags.forEach(tag => queryParams.append('tags', tag));
      }
      
      const url = `${this.baseUrl}/documents${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const documents = Array.isArray(data) ? data : (data.documents || []);
      
      return documents.map((item: any) => ({
        document_id: item.document_id || item.id,
        name: item.name,
        document_type: item.document_type,
        status: item.status,
        content: item.content,
        url: item.url,
        file_url: item.file_url,
        tags: item.tags,
        metadata: item.metadata,
        created_at: item.created_at,
        updated_at: item.updated_at,
        error: item.error,
      }));
    } catch (error) {
      console.error('Error listing documents:', error);
      throw error;
    }
  }

  /**
   * Update document
   * PATCH /documents/{document_id}
   */
  async updateDocument(documentId: string, payload: Partial<CreateDocumentPayload>): Promise<Document> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/documents/${documentId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        document_id: data.document_id || data.id,
        name: data.name,
        document_type: data.document_type,
        status: data.status,
        content: data.content,
        url: data.url,
        file_url: data.file_url,
        tags: data.tags,
        metadata: data.metadata,
        created_at: data.created_at,
        updated_at: data.updated_at,
        error: data.error,
      };
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  /**
   * Delete document
   * DELETE /documents/{document_id}
   */
  async deleteDocument(documentId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/documents/${documentId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Document deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // ========== Video Generation APIs ==========

  /**
   * Generate video
   * POST /videos
   */
  async generateVideo(payload: GenerateVideoPayload): Promise<Video> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/videos`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        video_id: data.video_id || data.id,
        replica_id: data.replica_id,
        status: data.status || 'queued',
        script: data.script,
        video_name: data.video_name,
        hosted_url: data.hosted_url,
        download_url: data.download_url,
        thumbnail_url: data.thumbnail_url,
        duration: data.duration,
        created_at: data.created_at,
        updated_at: data.updated_at,
        error: data.error,
      };
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  /**
   * Get video
   * GET /videos/{video_id}
   */
  async getVideo(videoId: string, verbose = false): Promise<Video> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const url = `${this.baseUrl}/videos/${videoId}${verbose ? '?verbose=true' : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        video_id: data.video_id || data.id,
        replica_id: data.replica_id,
        status: data.status,
        script: data.script,
        video_name: data.video_name,
        hosted_url: data.hosted_url,
        download_url: data.download_url,
        thumbnail_url: data.thumbnail_url,
        duration: data.duration,
        created_at: data.created_at,
        updated_at: data.updated_at,
        error: data.error,
      };
    } catch (error) {
      console.error('Error getting video:', error);
      throw error;
    }
  }

  /**
   * List videos
   * GET /videos
   */
  async listVideos(params?: { limit?: number; offset?: number }): Promise<Video[]> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const queryParams = new URLSearchParams();
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.offset) queryParams.append('offset', params.offset.toString());
      
      const url = `${this.baseUrl}/videos${queryParams.toString() ? `?${queryParams}` : ''}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      const videos = Array.isArray(data) ? data : (data.videos || []);
      
      return videos.map((item: any) => ({
        video_id: item.video_id || item.id,
        replica_id: item.replica_id,
        status: item.status,
        script: item.script,
        video_name: item.video_name,
        hosted_url: item.hosted_url,
        download_url: item.download_url,
        thumbnail_url: item.thumbnail_url,
        duration: item.duration,
        created_at: item.created_at,
        updated_at: item.updated_at,
        error: item.error,
      }));
    } catch (error) {
      console.error('Error listing videos:', error);
      throw error;
    }
  }

  /**
   * Delete video
   * DELETE /videos/{video_id}
   */
  async deleteVideo(videoId: string): Promise<{ success: boolean; message?: string }> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json().catch(() => ({}));
      
      return {
        success: true,
        message: data.message || 'Video deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  }

  /**
   * Rename video
   * PATCH /videos/{video_id}
   */
  async renameVideo(videoId: string, videoName: string): Promise<Video> {
    if (!this.apiKey) {
      throw new Error('Tavus API key is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/videos/${videoId}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ video_name: videoName }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Tavus API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();
      
      return {
        video_id: data.video_id || data.id,
        replica_id: data.replica_id,
        status: data.status,
        script: data.script,
        video_name: data.video_name,
        hosted_url: data.hosted_url,
        download_url: data.download_url,
        thumbnail_url: data.thumbnail_url,
        duration: data.duration,
        created_at: data.created_at,
        updated_at: data.updated_at,
        error: data.error,
      };
    } catch (error) {
      console.error('Error renaming video:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const tavusApi = new TavusApiService();
