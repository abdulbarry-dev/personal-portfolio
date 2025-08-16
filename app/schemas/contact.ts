import { z } from 'zod'

// Contact form validation schema
export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s\-'\.]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    ),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  query: z.enum(['general', 'project', 'freelance', 'job', 'consultation', 'other'], {
    errorMap: () => ({ message: 'Please select a query type' })
  }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters')
})

// Contact form field types
export const ContactFieldSchema = {
  name: ContactSchema.shape.name,
  email: ContactSchema.shape.email,
  query: ContactSchema.shape.query,
  message: ContactSchema.shape.message
}

// Inferred types
export type ContactForm = z.infer<typeof ContactSchema>
export type ContactFormField = keyof ContactForm

// Form state type (for reactive form data)
export type ContactFormState = {
  name: string
  email: string
  query: string
  message: string
}

// Validation result type
export type ValidationResult = {
  isValid: boolean
  error?: string
}

// Query options for the select field
export const ContactQueryOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'project', label: 'Project Discussion' },
  { value: 'freelance', label: 'Freelance Work' },
  { value: 'job', label: 'Job Opportunity' },
  { value: 'consultation', label: 'Consultation' },
  { value: 'other', label: 'Other' }
] as const

export type ContactQueryOption = typeof ContactQueryOptions[number]['value']
