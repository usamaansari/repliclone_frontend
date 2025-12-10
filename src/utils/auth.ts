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

/**
 * Handle token expiration by logging out and redirecting to login
 */
export const handleTokenExpiration = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  try {
    // Call logout API to clear server-side cookies
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    // Always remove token from localStorage and redirect
    removeAuthToken();
    window.location.href = "/login";
  }
};

