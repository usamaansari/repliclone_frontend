'use client';

import React from 'react';
import { CloneWizardData } from '@/lib/types/clone';
import { Label } from '@/components/ui/label';
import { Select, SelectOption } from '@/components/ui/select';

interface Step4PersonalityProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

const personalityOptions: SelectOption[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'consultative', label: 'Consultative' },
];

const responseStyleOptions: SelectOption[] = [
  { value: 'concise', label: 'Concise' },
  { value: 'detailed', label: 'Detailed' },
  { value: 'balanced', label: 'Balanced' },
];

export default function Step4Personality({ data, updateData }: Step4PersonalityProps) {
  const handleTraitToggle = (trait: string) => {
    const traits = data.step4.personalityTraits || [];
    const newTraits = traits.includes(trait as any)
      ? traits.filter((t) => t !== trait)
      : [...traits, trait as any];
    updateData('step4', { personalityTraits: newTraits });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Personality Traits (Select Multiple)</Label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          {personalityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleTraitToggle(option.value)}
              className={`p-4 border-2 rounded-lg text-center transition-colors ${
                data.step4.personalityTraits?.includes(option.value as any)
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label>Tone: Formal ↔ Casual</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={data.step4.toneFormal || 50}
          onChange={(e) => updateData('step4', { toneFormal: parseInt(e.target.value) })}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Formal</span>
          <span>Casual</span>
        </div>
      </div>

      <div>
        <Label>Tone: Direct ↔ Conversational</Label>
        <input
          type="range"
          min="0"
          max="100"
          value={data.step4.toneCasual || 50}
          onChange={(e) => updateData('step4', { toneCasual: parseInt(e.target.value) })}
          className="w-full mt-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Direct</span>
          <span>Conversational</span>
        </div>
      </div>

      <div>
        <Label>Response Style</Label>
        <Select
          options={responseStyleOptions}
          value={data.step4.responseStyle || 'balanced'}
          onChange={(e) => updateData('step4', { responseStyle: e.target.value as any })}
          className="mt-2"
        />
      </div>
    </div>
  );
}
