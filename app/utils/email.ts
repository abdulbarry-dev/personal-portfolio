import type { NormalizedEmail } from '../schemas/newsletter'

/**
 * Normalize email addresses to handle provider-specific variations
 * Primarily handles Gmail dot notation and aliases
 */
export const normalizeEmail = (email: string): NormalizedEmail => {
  const trimmedEmail = email.toLowerCase().trim()
  const [localPart, domain] = trimmedEmail.split('@')
  
  if (!localPart || !domain) {
    throw new Error('Invalid email format')
  }
  
  // Gmail domains that ignore dots in local part
  const gmailDomains = ['gmail.com', 'googlemail.com']
  
  let normalizedLocalPart = localPart
  
  if (gmailDomains.includes(domain)) {
    // Remove dots and handle + aliases for Gmail
    normalizedLocalPart = localPart.split('+')[0]?.replace(/\./g, '') || localPart
  }
  
  return {
    original_email: trimmedEmail,
    normalized_email: `${normalizedLocalPart}@${domain}`
  }
}

/**
 * Validate email format with additional checks
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

/**
 * Check if email domain is from a disposable email service
 */
export const isDisposableEmail = (email: string): boolean => {
  const disposableDomains = [
    '10minutemail.com',
    'guerrillamail.com',
    'tempmail.org',
    'throwaway.email'
    // Add more as needed
  ]
  
  const domain = email.split('@')[1]
  return domain ? disposableDomains.includes(domain.toLowerCase()) : false
}
