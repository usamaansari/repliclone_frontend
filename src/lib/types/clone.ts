export type IndustryType = 'car_sales' | 'real_estate' | 'custom';

export type PersonalityTrait = 'professional' | 'friendly' | 'enthusiastic' | 'consultative';

export type ToneLevel = 'formal' | 'casual' | 'direct' | 'conversational';

export type ResponseStyle = 'concise' | 'detailed' | 'balanced';

export type CloneStatus = 'pending' | 'processing' | 'active' | 'inactive' | 'failed';

export interface CloneWizardData {
  // Step 1: Basic Information
  step1: {
    name: string;
    industryType: IndustryType;
    purpose: string;
    language: string;
  };

  // Step 2: Avatar Selection
  step2: {
    avatarType: 'upload' | 'prebuilt' | 'record';
    uploadedFile?: File;
    prebuiltAvatarId?: string;
    avatarUrl?: string;
    recordingData?: Blob;
  };

  // Step 3: Voice Configuration
  step3: {
    voiceType: 'upload' | 'library' | 'record';
    uploadedFile?: File;
    voiceLibraryId?: string;
    voiceId?: string;
    recordingData?: Blob;
  };

  // Step 4: Personality & Behavior
  step4: {
    personalityTraits: PersonalityTrait[];
    toneFormal: number; // 0-100 slider
    toneCasual: number; // 0-100 slider
    responseStyle: ResponseStyle;
    industryPreset?: string;
  };

  // Step 5: Knowledge Base & Training
  step5: {
    faqData?: {
      type: 'csv' | 'json' | 'manual';
      file?: File;
      content?: string;
    };
    trainingDocuments?: File[];
    companyPolicies?: string;
    inventoryData?: Record<string, any>; // For car sales
    propertyData?: Record<string, any>; // For real estate
  };

  // Step 6: Conversation Scenarios
  step6: {
    leadQualificationQuestions: string[];
    appointmentBookingEnabled: boolean;
    escalationRules: {
      enabled: boolean;
      conditions: string[];
      transferToHuman: boolean;
    };
    businessHours: {
      enabled: boolean;
      schedule: {
        [key: string]: { open: string; close: string; closed: boolean };
      };
    };
    afterHoursMessage?: string;
  };

  // Step 7: Review & Deploy
  step7: {
    reviewed: boolean;
  };
}

export interface Clone {
  id: string;
  userId: string;
  name: string;
  industryType: IndustryType;
  tavusReplicaId?: string;
  tavusPersonaId?: string;
  tavusDocumentIds?: string[];
  tavusObjectiveIds?: string[];
  tavusGuardrailsId?: string;
  status: CloneStatus;
  avatarUrl?: string;
  voiceId?: string;
  personalityTraits?: Record<string, any>;
  trainingData?: Record<string, any>;
  conversationURL?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
