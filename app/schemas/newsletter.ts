import { z } from 'zod'

// Newsletter subscription schema
export const NewsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
    .max(254, 'Email is too long')
    .transform(email => email.toLowerCase().trim()),
  
  // Additional validation for normalized email (for duplicate checking)
  normalized_email: z.string().optional(),
  subscribed_at: z.string().datetime().optional(),
  is_active: z.boolean().default(true)
})

// Email validation helper
export const EmailValidationSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long')
})

// Normalized email schema for duplicate checking
export const NormalizedEmailSchema = z.object({
  original_email: z.string().email(),
  normalized_email: z.string().email()
})

export type NewsletterSubscription = z.infer<typeof NewsletterSchema>
export type EmailValidation = z.infer<typeof EmailValidationSchema>
export type NormalizedEmail = z.infer<typeof NormalizedEmailSchema>
