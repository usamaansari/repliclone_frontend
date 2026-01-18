'use client';

import React from 'react';
import { useCloneWizard } from '@/lib/hooks/useCloneWizard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Save, Loader2 } from 'lucide-react';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2AvatarSelection from './steps/Step2AvatarSelection';
import Step3VoiceConfig from './steps/Step3VoiceConfig';
import Step4Personality from './steps/Step4Personality';
import Step5KnowledgeBase from './steps/Step5KnowledgeBase';
import Step6ConversationScenarios from './steps/Step6ConversationScenarios';
import Step7ReviewDeploy from './steps/Step7ReviewDeploy';

const stepComponents = [
  Step1BasicInfo,
  Step2AvatarSelection,
  Step3VoiceConfig,
  Step4Personality,
  Step5KnowledgeBase,
  Step6ConversationScenarios,
  Step7ReviewDeploy,
];

const stepTitles = [
  'Basic Information',
  'Avatar Selection',
  'Voice Configuration',
  'Personality & Behavior',
  'Knowledge Base & Training',
  'Conversation Scenarios',
  'Review & Deploy',
];

export default function CloneWizard() {
  const {
    currentStep,
    wizardData,
    updateStepData,
    goToStep,
    nextStep,
    previousStep,
    getProgress,
  } = useCloneWizard();

  const progress = getProgress();
  const CurrentStepComponent = stepComponents[currentStep - 1];

  const handleNext = () => {
    // Validation would go here before moving to next step
    nextStep();
  };

  const handlePrevious = () => {
    previousStep();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Create New Clone</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep} of 7: {stepTitles[currentStep - 1]}
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
              {progress.percentage}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progress.percentage}%` }}
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
              <button
                key={stepNum}
                onClick={() => goToStep(stepNum)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : isCompleted
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={wizardData}
              updateData={updateStepData}
            />
          </CardContent>
        </Card>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              // Save as draft - already handled by auto-save
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>

          {currentStep < 7 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => {
              // Handle deploy
              console.log('Deploying clone...', wizardData);
            }}>
              Deploy Clone
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
