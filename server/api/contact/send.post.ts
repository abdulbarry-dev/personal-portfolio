import { z } from 'zod'
import { getRequestIP, getHeader } from 'h3'

// Contact form validation schema
const ContactSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s\-'\.]+$/),
  email: z.string().email().max(100),
  query: z.enum(['general', 'project', 'freelance', 'job', 'consultation', 'other']),
  message: z.string().min(10).max(500)
})

// Simple in-memory rate limiting
const rateLimit = new Map<string, number[]>()
const RATE_LIMIT = { window: 15 * 60 * 1000, max: 3 } // 3 requests per 15 minutes

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const requests = rateLimit.get(ip) || []
  const validRequests = requests.filter(time => now - time < RATE_LIMIT.window)
  
  if (validRequests.length >= RATE_LIMIT.max) return true
  
  validRequests.push(now)
  rateLimit.set(ip, validRequests)
  return false
}

const sendEmail = async (data: z.infer<typeof ContactSchema>) => {
  const { formspreeEndpoint } = useRuntimeConfig().public
  
  if (!formspreeEndpoint) {
    throw createError({ statusCode: 500, statusMessage: 'Email service not configured' })
  }
  
  const form = new FormData()
  Object.entries(data).forEach(([key, value]) => form.append(key, value))
  form.append('_subject', `Contact: ${data.query}`)
  form.append('_replyto', data.email)
  
  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    body: form,
    headers: { 'Accept': 'application/json' }
  })
  
  if (!response.ok) {
    throw createError({ statusCode: response.status, statusMessage: 'Failed to send email' })
  }
}

export default defineEventHandler(async (event) => {
  // Rate limiting
  const clientIP = getRequestIP(event) || getHeader(event, 'x-forwarded-for') || 'unknown'
  if (isRateLimited(clientIP)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many requests. Please try again later.'
    })
  }
  
  // Validate request
  const body = await readBody(event)
  const result = ContactSchema.safeParse(body)
  
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation failed',
      data: result.error.errors
    })
  }
  
  // Sanitize and send
  const sanitizedData = {
    ...result.data,
    name: result.data.name.trim(),
    email: result.data.email.trim().toLowerCase(),
    message: result.data.message.trim()
  }
  
  await sendEmail(sanitizedData)
  
  return { success: true, message: 'Message sent successfully' }
})