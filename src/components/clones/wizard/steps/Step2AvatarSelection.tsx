'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CloneWizardData } from '@/lib/types/clone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Video, Image as ImageIcon, User, Loader2 } from 'lucide-react';
import { authenticatedFetch } from '@/utils/api-client';

interface TavusAvatar {
  avatar_id: string;
  name: string;
  type: 'photo' | 'video' | 'template';
  thumbnail_url?: string;
  preview_url?: string;
  industry?: string;
  tags?: string[];
}

interface Step2AvatarSelectionProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

export default function Step2AvatarSelection({ data, updateData }: Step2AvatarSelectionProps) {
  const [avatarType, setAvatarType] = useState<'upload' | 'prebuilt' | 'record'>(data.step2.avatarType || 'upload');
  const [tavusAvatars, setTavusAvatars] = useState<TavusAvatar[]>([]);
  const [loadingAvatars, setLoadingAvatars] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (avatarType === 'prebuilt') {
      fetchTavusAvatars();
    }
  }, [avatarType, data.step1?.industryType]);

  const fetchTavusAvatars = async () => {
    try {
      setLoadingAvatars(true);
      const industry = data.step1?.industryType || undefined;
      const params = new URLSearchParams({
        type: 'avatars',
        ...(industry && { industry }),
      });

      const response = await authenticatedFetch(`/api/tavus/resources?${params.toString()}`);
      if (response.ok) {
        const result = await response.json();
        setTavusAvatars(result.data?.avatars || []);
      }
    } catch (error) {
      console.error('Error fetching Tavus avatars:', error);
      // Continue with empty array - user can still upload
    } finally {
      setLoadingAvatars(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'video/mp4', 'video/quicktime'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid file (JPG, PNG, MP4, or MOV)');
        return;
      }
      updateData('step2', { avatarType: 'upload', uploadedFile: file });
    }
  };

  const handlePrebuiltSelect = (avatarId: string) => {
    updateData('step2', { avatarType: 'prebuilt', prebuiltAvatarId: avatarId });
  };

  const handleRecord = () => {
    // Webcam recording would be implemented here
    alert('Video recording feature will open in a modal. Ensure face is clearly visible with good lighting.');
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Avatar Selection Method</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Button
            type="button"
            variant={avatarType === 'upload' ? 'default' : 'outline'}
            className="h-24 flex-col"
            onClick={() => setAvatarType('upload')}
          >
            <Upload className="h-6 w-6 mb-2" />
            Upload Custom
          </Button>
          <Button
            type="button"
            variant={avatarType === 'prebuilt' ? 'default' : 'outline'}
            className="h-24 flex-col"
            onClick={() => setAvatarType('prebuilt')}
          >
            <ImageIcon className="h-6 w-6 mb-2" />
            Pre-built Avatars
          </Button>
          <Button
            type="button"
            variant={avatarType === 'record' ? 'default' : 'outline'}
            className="h-24 flex-col"
            onClick={() => setAvatarType('record')}
          >
            <Video className="h-6 w-6 mb-2" />
            Record Video
          </Button>
        </div>
      </div>

      {avatarType === 'upload' && (
        <div className="space-y-4">
          <div>
            <Label>Upload Video or Photo</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Supported formats: MP4, MOV, JPG, PNG. Ensure face is clearly visible with good lighting.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,video/mp4,video/quicktime"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-4 w-4 mr-2" />
              Choose File
            </Button>
            {data.step2.uploadedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {data.step2.uploadedFile.name}
              </p>
            )}
          </div>
        </div>
      )}

      {avatarType === 'prebuilt' && (
        <div className="space-y-4">
          <Label>Select Pre-built Avatar</Label>
          {loadingAvatars ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading avatars...</span>
            </div>
          ) : tavusAvatars.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {tavusAvatars.map((avatar) => (
                <button
                  key={avatar.avatar_id}
                  type="button"
                  onClick={() => {
                    handlePrebuiltSelect(avatar.avatar_id);
                    updateData('step2', { avatarUrl: avatar.preview_url || avatar.thumbnail_url });
                  }}
                  className={`p-4 border-2 rounded-lg hover:border-primary transition-colors ${
                    data.step2.prebuiltAvatarId === avatar.avatar_id ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  {avatar.thumbnail_url ? (
                    <img
                      src={avatar.thumbnail_url}
                      alt={avatar.name}
                      className="h-16 w-16 mx-auto object-cover rounded mb-2"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <User className={`h-12 w-12 mx-auto text-muted-foreground ${avatar.thumbnail_url ? 'hidden' : ''}`} />
                  <p className="text-sm mt-2 font-medium">{avatar.name}</p>
                  {avatar.industry && (
                    <p className="text-xs text-muted-foreground mt-1">{avatar.industry}</p>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 border-2 border-dashed rounded-lg text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                No pre-built avatars available. Please upload your own or configure Tavus API key.
              </p>
            </div>
          )}
        </div>
      )}

      {avatarType === 'record' && (
        <div className="space-y-4">
          <div>
            <Label>Record Video (30-60 seconds)</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-3">
              Requirements: Face clearly visible, good lighting, neutral background
            </p>
            <Button type="button" onClick={handleRecord}>
              <Video className="h-4 w-4 mr-2" />
              Start Recording
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
