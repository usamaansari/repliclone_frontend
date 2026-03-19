'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { authenticatedFetch } from '@/utils/api-client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Settings, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { removeAuthToken } from '@/utils/auth';
import axios from 'axios';

const settingsSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional().or(z.literal('')),
  lastName: z.string().min(1, 'Last name is required').optional().or(z.literal('')),
  phone: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  company: z.string().optional().or(z.literal('')),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      company: '',
    },
  });

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await authenticatedFetch('/api/user');

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const result = await response.json();
        const userData = result.data;

        // Populate form with user data
        form.reset({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          phone: userData.phone || '',
          city: userData.city || '',
          company: userData.companyName || '',
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setIsSaving(true);
      setError(null);
      setSuccessMessage(null);

      // Prepare update payload (only include fields that have values)
      const updatePayload: any = {};
      if (data.firstName) updatePayload.firstName = data.firstName;
      if (data.lastName) updatePayload.lastName = data.lastName;
      if (data.phone) updatePayload.phone = data.phone;
      if (data.city) updatePayload.city = data.city;
      if (data.company) updatePayload.companyName = data.company;

      const response = await authenticatedFetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update settings');
      }

      setSuccessMessage('Settings updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error updating settings:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update settings. Please try again.');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await axios.post('/api/auth/logout');
      removeAuthToken();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      removeAuthToken();
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6" />
                  <h1 className="text-3xl font-bold">Settings</h1>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                            <p className="text-sm text-destructive">{error}</p>
                          </div>
                        )}

                        {successMessage && (
                          <div className="p-3 rounded-md bg-green-500/10 border border-green-500/20">
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {successMessage}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your city" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center justify-between pt-4 border-t">
                          <Button
                            type="submit"
                            disabled={isSaving}
                            className="min-w-[120px]"
                          >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </Button>

                          <Button
                            type="button"
                            variant="destructive"
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            {isLoggingOut ? 'Logging out...' : 'Logout'}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
