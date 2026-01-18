'use client';

import React, { useState } from 'react';
import { CloneWizardData } from '@/lib/types/clone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface Step6ConversationScenariosProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

export default function Step6ConversationScenarios({ data, updateData }: Step6ConversationScenariosProps) {
  const [newQuestion, setNewQuestion] = useState('');

  const addQuestion = () => {
    if (newQuestion.trim()) {
      const questions = data.step6.leadQualificationQuestions || [];
      updateData('step6', {
        leadQualificationQuestions: [...questions, newQuestion.trim()],
      });
      setNewQuestion('');
    }
  };

  const removeQuestion = (index: number) => {
    const questions = data.step6.leadQualificationQuestions || [];
    updateData('step6', {
      leadQualificationQuestions: questions.filter((_, i) => i !== index),
    });
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <div>
        <Label>Lead Qualification Questions</Label>
        <div className="flex gap-2 mt-2">
          <Input
            placeholder="Enter a question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addQuestion()}
          />
          <Button type="button" onClick={addQuestion}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          {data.step6.leadQualificationQuestions?.map((q, idx) => (
            <div key={idx} className="flex items-center gap-2 p-2 border rounded">
              <span className="flex-1 text-sm">{q}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(idx)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="appointment-booking"
          checked={data.step6.appointmentBookingEnabled || false}
          onChange={(e) =>
            updateData('step6', { appointmentBookingEnabled: e.target.checked })
          }
          className="rounded"
        />
        <Label htmlFor="appointment-booking">Enable Appointment Booking Flow</Label>
      </div>

      <div>
        <Label>Escalation Rules</Label>
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="escalation-enabled"
              checked={data.step6.escalationRules?.enabled || false}
              onChange={(e) =>
                updateData('step6', {
                  escalationRules: {
                    ...data.step6.escalationRules,
                    enabled: e.target.checked,
                  } as any,
                })
              }
              className="rounded"
            />
            <Label htmlFor="escalation-enabled">Enable Escalation to Human Agent</Label>
          </div>
          {data.step6.escalationRules?.enabled && (
            <div className="flex items-center gap-2 ml-6">
              <input
                type="checkbox"
                id="transfer-human"
                checked={data.step6.escalationRules?.transferToHuman || false}
                onChange={(e) =>
                  updateData('step6', {
                    escalationRules: {
                      ...data.step6.escalationRules,
                      transferToHuman: e.target.checked,
                    } as any,
                  })
                }
                className="rounded"
              />
              <Label htmlFor="transfer-human">Transfer to Human When Escalation Triggered</Label>
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>Business Hours Configuration</Label>
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="business-hours-enabled"
              checked={data.step6.businessHours?.enabled || false}
              onChange={(e) =>
                updateData('step6', {
                  businessHours: {
                    ...data.step6.businessHours,
                    enabled: e.target.checked,
                  } as any,
                })
              }
              className="rounded"
            />
            <Label htmlFor="business-hours-enabled">Enable Business Hours Restriction</Label>
          </div>
          {data.step6.businessHours?.enabled && (
            <div className="space-y-2 ml-6">
              {daysOfWeek.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Label className="w-24">{day}</Label>
                  <Input type="time" className="w-32" />
                  <span>to</span>
                  <Input type="time" className="w-32" />
                  <input type="checkbox" className="rounded" />
                  <Label className="text-xs">Closed</Label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <Label>After-Hours Message</Label>
        <Textarea
          placeholder="Enter message to show when outside business hours..."
          rows={3}
          value={data.step6.afterHoursMessage || ''}
          onChange={(e) => updateData('step6', { afterHoursMessage: e.target.value })}
          className="mt-2"
        />
      </div>
    </div>
  );
}
