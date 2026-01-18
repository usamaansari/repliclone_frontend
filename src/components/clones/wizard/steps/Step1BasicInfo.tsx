'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectOption } from '@/components/ui/select';
import { CloneWizardData } from '@/lib/types/clone';

interface Step1BasicInfoProps {
  data: CloneWizardData;
  updateData: (step: keyof CloneWizardData, data: Partial<CloneWizardData[keyof CloneWizardData]>) => void;
}

interface Step1FormValues {
  name: string;
  industryType: 'car_sales' | 'real_estate' | 'custom';
  purpose: string;
  language: string;
}

const industryOptions: SelectOption[] = [
  { value: 'car_sales', label: 'Car Sales' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'custom', label: 'Custom' },
];

const languageOptions: SelectOption[] = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

export default function Step1BasicInfo({ data, updateData }: Step1BasicInfoProps) {
  const form = useForm<Step1FormValues>({
    defaultValues: {
      name: data.step1.name,
      industryType: data.step1.industryType,
      purpose: data.step1.purpose,
      language: data.step1.language,
    },
  });

  const onSubmit = (values: Step1FormValues) => {
    updateData('step1', values);
  };

  // Update data on change
  React.useEffect(() => {
    const subscription = form.watch((values) => {
      updateData('step1', values as Step1FormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, updateData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Clone Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name for your clone" {...field} />
              </FormControl>
              <FormDescription>
                Choose a descriptive name for your AI clone (e.g., "Car Sales Assistant")
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industryType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry Type *</FormLabel>
              <FormControl>
                <Select
                  options={industryOptions}
                  placeholder="Select industry type"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value as 'car_sales' | 'real_estate' | 'custom')}
                />
              </FormControl>
              <FormDescription>
                Select the industry your clone will serve
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purpose / Goal Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the purpose and goals of this clone..."
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain what this clone will help achieve for your business
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language Preference *</FormLabel>
              <FormControl>
                <Select
                  options={languageOptions}
                  placeholder="Select language"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormDescription>
                Primary language for clone conversations
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
