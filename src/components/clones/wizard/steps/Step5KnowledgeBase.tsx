'use client';

import React, { useState, useRef } from 'react';
import { CloneWizardData } from '@/lib/types/clone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';

interface Step5KnowledgeBaseProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

export default function Step5KnowledgeBase({ data, updateData }: Step5KnowledgeBaseProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleFAQUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData('step5', {
        faqData: {
          type: file.name.endsWith('.csv') ? 'csv' : 'json',
          file,
        },
      });
    }
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      updateData('step5', {
        trainingDocuments: [...(data.step5.trainingDocuments || []), ...files],
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>FAQ Upload (CSV, JSON, or Manual Entry)</Label>
        <div className="space-y-3 mt-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.json"
            onChange={handleFAQUpload}
            className="hidden"
          />
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2" />
            Upload FAQ File
          </Button>
          <div className="mt-3">
            <Label>Or Enter FAQs Manually</Label>
            <Textarea
              placeholder="Enter FAQ data in JSON format: {&quot;question&quot;: &quot;answer&quot;, ...}"
              rows={6}
              value={data.step5.faqData?.content || ''}
              onChange={(e) =>
                updateData('step5', {
                  faqData: { type: 'manual', content: e.target.value },
                })
              }
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {data.step1.industryType === 'car_sales' && (
        <div>
          <Label>Car Inventory Data</Label>
          <Textarea
            placeholder="Enter vehicle specifications, pricing, and inventory data (JSON format)..."
            rows={8}
            className="mt-2 font-mono text-xs"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include vehicle specifications, pricing information, and available inventory
          </p>
        </div>
      )}

      {data.step1.industryType === 'real_estate' && (
        <div>
          <Label>Property Data</Label>
          <Textarea
            placeholder="Enter property listings, neighborhood information, and pricing trends (JSON format)..."
            rows={8}
            className="mt-2 font-mono text-xs"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Include property listings, neighborhood information, and pricing trends
          </p>
        </div>
      )}

      <div>
        <Label>Company Policies and Guidelines</Label>
        <Textarea
          placeholder="Enter company policies, guidelines, and procedures..."
          rows={6}
          value={data.step5.companyPolicies || ''}
          onChange={(e) => updateData('step5', { companyPolicies: e.target.value })}
          className="mt-2"
        />
      </div>

      <div>
        <Label>Training Documents (PDF, DOCX)</Label>
        <input
          ref={docInputRef}
          type="file"
          accept=".pdf,.docx"
          multiple
          onChange={handleDocUpload}
          className="hidden"
        />
        <Button type="button" variant="outline" onClick={() => docInputRef.current?.click()} className="mt-2">
          <Upload className="h-4 w-4 mr-2" />
          Upload Training Documents
        </Button>
        {data.step5.trainingDocuments && data.step5.trainingDocuments.length > 0 && (
          <div className="mt-3 space-y-2">
            {data.step5.trainingDocuments.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{doc.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
