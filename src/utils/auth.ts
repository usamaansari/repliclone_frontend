"use client";

/**
 * Store authentication token in localStorage
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", token);
  }
};

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token");
  }
  return null;
};

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-token");
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * Get authorization header for API requests
 */
export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

