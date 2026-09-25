/**
 * Form and input validation utilities
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const isValidSubdomain = (subdomain) => {
  if (!subdomain || typeof subdomain !== 'string') return false;
  const re = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
  return re.test(subdomain.toLowerCase());
};

export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};
