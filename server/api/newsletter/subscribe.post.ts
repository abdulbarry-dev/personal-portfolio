import { z } from 'zod'
import { EmailValidationSchema } from '~/schemas/newsletter'
import { NewsletterService } from '~/services/newsletter'
import { createClient } from '@supabase/supabase-js'
import { getRequestIP, getHeader } from 'h3'

// Rate limiting for newsletter subscriptions
const rateLimit = new Map<string, number[]>()
const RATE_LIMIT = { window: 15 * 60 * 1000, max: 5 } // 5 requests per 15 minutes

const isRateLimited = (ip: string): boolean => {
  const now = Date.now()
  const requests = rateLimit.get(ip) || []
  const validRequests = requests.filter(time => now - time < RATE_LIMIT.window)
  
  if (validRequests.length >= RATE_LIMIT.max) return true
  
  validRequests.push(now)
  rateLimit.set(ip, validRequests)
  return false
}

export default defineEventHandler(async (event) => {
  // Rate limiting
  const clientIP = getRequestIP(event) || getHeader(event, 'x-forwarded-for') || 'unknown'
  if (isRateLimited(clientIP)) {
    throw createError({
      statusCode: 429,
      statusMessage: 'Too many subscription attempts. Please try again later.'
    })
  }

  // Validate request method
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  // Parse and validate request body
  const body = await readBody(event)
  
  try {
    const { email } = EmailValidationSchema.parse(body)
    
    // Initialize Supabase client
    const config = useRuntimeConfig()
    
    if (!config.public.supabaseUrl || !config.public.supabaseAnonKey) {
      throw createError({
        statusCode: 503,
        statusMessage: 'Newsletter service is not configured'
      })
    }

    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey
    )

    // Initialize newsletter service
    const newsletterService = new NewsletterService(supabase)

    // Check if email already exists
    const emailExists = await newsletterService.checkEmailExists(email)
    
    if (emailExists) {
      return {
        success: false,
        message: 'Email is already subscribed to our newsletter',
        code: 'ALREADY_SUBSCRIBED'
      }
    }

    // Subscribe email
    const subscription = await newsletterService.subscribeEmail(email)

    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: {
        email: subscription.email,
        subscribed_at: subscription.subscribed_at
      }
    }
  } catch (error: any) {
    // Handle validation errors
    if (error.errors) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid email format',
        data: error.errors
      })
    }

    // Handle service errors
    if (error.message?.includes('already subscribed')) {
      return {
        success: false,
        message: 'Email is already subscribed',
        code: 'ALREADY_SUBSCRIBED'
      }
    }

    // Generic error handling
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to process newsletter subscription'
    })
  }
})
