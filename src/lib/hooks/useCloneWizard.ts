'use client';

import { useState, useEffect, useCallback } from 'react';
import { CloneWizardData } from '@/lib/types/clone';

const WIZARD_STORAGE_KEY = 'clone_wizard_draft';

const initialWizardData: CloneWizardData = {
  step1: {
    name: '',
    industryType: 'car_sales',
    purpose: '',
    language: 'en',
  },
  step2: {
    avatarType: 'upload',
  },
  step3: {
    voiceType: 'upload',
  },
  step4: {
    personalityTraits: [],
    toneFormal: 50,
    toneCasual: 50,
    responseStyle: 'balanced',
  },
  step5: {
    trainingDocuments: [],
  },
  step6: {
    leadQualificationQuestions: [],
    appointmentBookingEnabled: false,
    escalationRules: {
      enabled: false,
      conditions: [],
      transferToHuman: false,
    },
    businessHours: {
      enabled: false,
      schedule: {},
    },
  },
  step7: {
    reviewed: false,
  },
};

export function useCloneWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<CloneWizardData>(() => {
    // Load from localStorage if exists
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialWizardData;
        }
      }
    }
    return initialWizardData;
  });

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(wizardData));
    }
  }, [wizardData]);

  const updateStepData = useCallback((step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => {
    setWizardData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 7) {
      setCurrentStep(step);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const clearDraft = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(WIZARD_STORAGE_KEY);
    }
    setWizardData(initialWizardData);
    setCurrentStep(1);
  }, []);

  const getProgress = useCallback(() => {
    return {
      current: currentStep,
      total: 7,
      percentage: Math.round((currentStep / 7) * 100),
    };
  }, [currentStep]);

  return {
    currentStep,
    wizardData,
    updateStepData,
    goToStep,
    nextStep,
    previousStep,
    clearDraft,
    getProgress,
  };
}
