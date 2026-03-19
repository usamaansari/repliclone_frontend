export type ReplicaStatus = 'pending' | 'processing' | 'active' | 'inactive' | 'failed';

export interface Replica {
  id: string;
  userId: string;

  replicaName: string;
  modelName?: string | null;

  trainVideoUrl: string;
  consentVideoUrl: string;
  callbackUrl?: string | null;

  tavusReplicaId?: string | null;
  tavusStatusRaw?: string | null;
  trainingProgress?: string | null;

  status: ReplicaStatus;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

