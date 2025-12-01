"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Link from "next/link";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import { setAuthToken } from "@/utils/auth";
import axios from "axios";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setError(null);
      const { confirmPassword, ...registerData } = data;

      await axios.post("/api/auth/register", registerData);

      // Auto-login after registration
      try {
        const loginResponse = await axios.post("/api/auth/login", {
          email: data.email,
          password: data.password,
        });

        const loginResult = loginResponse.data;

        if (loginResult.data?.token) {
          setAuthToken(loginResult.data.token);
          router.push("/dashboard");
        } else {
          // Registration successful but auto-login failed, redirect to login
          router.push("/login");
        }
      } catch (loginError) {
        // Registration successful but auto-login failed, redirect to login
        console.error("Auto-login error:", loginError);
        router.push("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Register Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

        <div className="container mx-auto max-w-md relative z-10">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold">
                Create an account
              </CardTitle>
              <CardDescription>
                Enter your information to get started with ReplicloneAI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="bg-background"
                            />
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
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                            {...field}
                            className="bg-background"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              {...field}
                              className="bg-background pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm your password"
                              {...field}
                              className="bg-background pr-10"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && (
                    <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting
                      ? "Creating account..."
                      : "Create account"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
