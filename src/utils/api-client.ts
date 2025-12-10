"use client";

import { getAuthHeader, handleTokenExpiration } from "./auth";

/**
 * Custom fetch wrapper that automatically handles authentication
 * and token expiration (401 responses)
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // Merge auth headers with existing headers
  const authHeaders = getAuthHeader();
  const headers = {
    ...options.headers,
    ...authHeaders,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Handle token expiration
  if (response.status === 401) {
    await handleTokenExpiration();
    // Throw an error to prevent further processing
    throw new Error("Authentication expired. Please log in again.");
  }

  return response;
}

