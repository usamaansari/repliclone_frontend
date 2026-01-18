'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CloneWizardData } from '@/lib/types/clone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Mic, Headphones, Loader2 } from 'lucide-react';
import { authenticatedFetch } from '@/utils/api-client';

interface TavusVoice {
  voice_id: string;
  name: string;
  gender?: 'male' | 'female' | 'neutral';
  age_range?: string;
  accent?: string;
  language?: string;
  preview_url?: string;
}

interface Step3VoiceConfigProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

export default function Step3VoiceConfig({ data, updateData }: Step3VoiceConfigProps) {
  const [voiceType, setVoiceType] = useState<'upload' | 'library' | 'record'>(data.step3.voiceType || 'upload');
  const [tavusVoices, setTavusVoices] = useState<TavusVoice[]>([]);
  const [loadingVoices, setLoadingVoices] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (voiceType === 'library') {
      fetchTavusVoices();
    }
  }, [voiceType]);

  const fetchTavusVoices = async () => {
    try {
      setLoadingVoices(true);
      const response = await authenticatedFetch('/api/tavus/resources?type=voices');
      if (response.ok) {
        const result = await response.json();
        setTavusVoices(result.data?.voices || []);
      }
    } catch (error) {
      console.error('Error fetching Tavus voices:', error);
      // Continue with empty array - user can still upload
    } finally {
      setLoadingVoices(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type and duration (would need actual audio validation)
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid audio file (MP3 or WAV, minimum 30 seconds)');
        return;
      }
      updateData('step3', { voiceType: 'upload', uploadedFile: file });
    }
  };

  const handleLibrarySelect = (voiceId: string) => {
    updateData('step3', { voiceType: 'library', voiceLibraryId: voiceId });
  };

  const handleRecord = () => {
    // Audio recording would be implemented here (2-minute sample)
    alert('Voice recording will start. Please speak for 2 minutes.');
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Voice Configuration Method</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Button
            type="button"
            variant={voiceType === 'upload' ? 'default' : 'outline'}
            className="h-24 flex-col"
            onClick={() => setVoiceType('upload')}
          >
            <Upload className="h-6 w-6 mb-2" />
            Upload Sample
          </Button>
          <Button
            type="button"
            variant={voiceType === 'library' ? 'default' : 'outline'}
            className="h-24 flex-col"
            onClick={() => setVoiceType('library')}
          >
            <Headphones className="h-6 w-6 mb-2" />
            Voice Library
          </Button>
          <Button
            type="button"
            variant={voiceType === 'record' ? 'default' : 'outline'}
            className="h-24 flex-col"
            onClick={() => setVoiceType('record')}
          >
            <Mic className="h-6 w-6 mb-2" />
            Record Voice
          </Button>
        </div>
      </div>

      {voiceType === 'upload' && (
        <div className="space-y-4">
          <div>
            <Label>Upload Voice Sample (MP3 or WAV - 30 seconds minimum)</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/mpeg,audio/wav,audio/mp3"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose Audio File
            </Button>
            {data.step3.uploadedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {data.step3.uploadedFile.name}
              </p>
            )}
          </div>
        </div>
      )}

      {voiceType === 'library' && (
        <div className="space-y-4">
          <Label>Select from Voice Library</Label>
          {loadingVoices ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading voices...</span>
            </div>
          ) : tavusVoices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['male', 'female', 'neutral'].map((gender) => {
                const voicesForGender = tavusVoices.filter(v => v.gender === gender || (!v.gender && gender === 'neutral'));
                if (voicesForGender.length === 0) return null;

                return (
                  <div key={gender} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2 capitalize">{gender} Voices</h4>
                    <div className="space-y-2">
                      {voicesForGender.map((voice) => (
                        <button
                          key={voice.voice_id}
                          type="button"
                          onClick={() => {
                            handleLibrarySelect(voice.voice_id);
                            updateData('step3', { voiceId: voice.voice_id });
                          }}
                          className={`w-full text-left p-3 rounded border transition-colors ${
                            data.step3.voiceLibraryId === voice.voice_id
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{voice.name}</p>
                              <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                                {voice.age_range && <span>{voice.age_range}</span>}
                                {voice.accent && <span>• {voice.accent}</span>}
                                {voice.language && <span>• {voice.language.toUpperCase()}</span>}
                              </div>
                            </div>
                            {voice.preview_url && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const audio = new Audio(voice.preview_url);
                                  audio.play();
                                }}
                              >
                                <Headphones className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
              {/* Show voices without gender classification */}
              {tavusVoices.filter(v => !v.gender).length > 0 && (
                <div className="border rounded-lg p-4 md:col-span-2">
                  <h4 className="font-medium mb-2">Other Voices</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tavusVoices.filter(v => !v.gender).map((voice) => (
                      <button
                        key={voice.voice_id}
                        type="button"
                        onClick={() => {
                          handleLibrarySelect(voice.voice_id);
                          updateData('step3', { voiceId: voice.voice_id });
                        }}
                        className={`w-full text-left p-2 rounded border ${
                          data.step3.voiceLibraryId === voice.voice_id
                            ? 'border-primary bg-primary/10'
                            : 'border-border'
                        }`}
                      >
                        {voice.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <Headphones className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No voices available in library. Please upload your own or configure Tavus API key.
              </p>
            </div>
          )}
        </div>
      )}

      {voiceType === 'record' && (
        <div className="space-y-4">
          <div>
            <Label>Record Voice (2-minute sample)</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Speak naturally for 2 minutes. This will be used for voice cloning.
            </p>
            <Button type="button" onClick={handleRecord}>
              <Mic className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
          </div>
        </div>
      )}

      {(data.step3.uploadedFile || data.step3.voiceLibraryId) && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <Label>Preview</Label>
          <Button type="button" variant="outline" size="sm" className="mt-2">
            <Headphones className="h-4 w-4 mr-2" />
            Play Preview
          </Button>
        </div>
      )}
    </div>
  );
}
