import * as bcrypt from 'bcryptjs';
import xss from 'xss';
import validator from 'validator';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12');

/**
 * Hash a plain text password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compare a plain text password with a hashed password
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate a random string for various purposes
 */
export const generateRandomString = (length: number = 32): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Validate email format using validator library
 */
export const isValidEmail = (email: string): boolean => {
  return validator.isEmail(email);
};

/**
 * Sanitize user input to prevent XSS attacks
 * Uses the xss library for comprehensive protection
 */
export const sanitizeString = (input: string | null | undefined): string => {
  if (!input) return '';
  
  // First trim and normalize
  let sanitized = input.trim();
  
  // Apply XSS filtering
  sanitized = xss(sanitized, {
    whiteList: {}, // No HTML tags allowed
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style'],
  });
  
  return sanitized;
};

/**
 * Sanitize HTML content (for rich text fields like descriptions)
 * Allows safe HTML tags only
 */
export const sanitizeHTML = (input: string | null | undefined): string => {
  if (!input) return '';
  
  return xss(input, {
    whiteList: {
      p: [],
      br: [],
      strong: [],
      em: [],
      u: [],
      ol: [],
      ul: [],
      li: [],
      a: ['href', 'title', 'target'],
    },
    stripIgnoreTag: true,
  });
};

/**
 * Validate and sanitize URL
 */
export const sanitizeURL = (url: string | null | undefined): string | null => {
  if (!url) return null;
  
  const trimmed = url.trim();
  if (!validator.isURL(trimmed, { require_protocol: true, protocols: ['http', 'https'] })) {
    return null;
  }
  
  return trimmed;
};

/**
 * Validate phone number format
 */
export const isValidPhone = (phone: string): boolean => {
  // Basic phone validation - accepts various formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return phoneRegex.test(phone) && cleaned.length >= 10 && cleaned.length <= 15;
};

/**
 * Sanitize numeric input
 */
export const sanitizeNumber = (input: any): number | null => {
  const num = parseFloat(input);
  return isNaN(num) ? null : num;
};

/**
 * Format error messages consistently
 */
export const formatError = (message: string, code?: string) => {
  return {
    error: true,
    message: sanitizeString(message),
    code: code || 'UNKNOWN_ERROR',
    timestamp: new Date().toISOString(),
  };
};

/**
 * Format success responses consistently
 */
export const formatSuccess = (data: any, message?: string) => {
  return {
    success: true,
    message: message ? sanitizeString(message) : 'Operation completed successfully',
    data,
    timestamp: new Date().toISOString(),
  };
};