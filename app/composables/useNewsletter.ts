import { EmailValidationSchema } from '../schemas/newsletter'
import { NewsletterService } from '../services/newsletter'
import { isValidEmail, isDisposableEmail } from '../utils/email'

interface NewsletterState {
  isLoading: boolean
  emailError: boolean
  emailSuccess: boolean
}

export const useNewsletter = () => {
  const { addNotification } = useNotifications()
  const { $supabase } = useNuxtApp()

  // Initialize newsletter service (may be null if Supabase unavailable)
  const newsletterService = $supabase ? new NewsletterService($supabase as any) : null

  // Reactive state
  const state = reactive<NewsletterState>({
    isLoading: false,
    emailError: false,
    emailSuccess: false
  })

  /**
   * Validate email with enhanced checks
   */
  const validateEmail = (email: string): { isValid: boolean; error?: string } => {
    try {
      // Basic validation with Zod
      EmailValidationSchema.parse({ email })
      
      // Additional checks
      if (!isValidEmail(email)) {
        return { isValid: false, error: 'Please enter a valid email address' }
      }
      
      if (isDisposableEmail(email)) {
        return { isValid: false, error: 'Disposable email addresses are not allowed' }
      }
      
      return { isValid: true }
    } catch (error: any) {
      const message = error.errors?.[0]?.message || 'Invalid email format'
      return { isValid: false, error: message }
    }
  }

  /**
   * Subscribe to newsletter with comprehensive error handling
   */
  const subscribeToNewsletter = async (email: string): Promise<boolean> => {
    if (state.isLoading) return false

    // Reset states
    state.emailError = false
    state.emailSuccess = false

    // Validate email
    const validation = validateEmail(email)
    if (!validation.isValid) {
      state.emailError = true
      addNotification({
        type: 'error',
        title: 'Invalid Email',
        message: validation.error || 'Please enter a valid email address',
        duration: 4000
      })
      return false
    }

    state.isLoading = true

    try {
      // Try client-side service if available, otherwise use server-side API
      if (newsletterService) {
        try {
          // Check if email already exists
          const emailExists = await newsletterService.checkEmailExists(email)

          if (emailExists) {
            addNotification({
              type: 'warning',
              title: 'Already Subscribed',
              message: 'Your email is already subscribed to our newsletter.',
              duration: 5000
            })
            return false
          }

          // Subscribe new email
          await newsletterService.subscribeEmail(email)
          
          state.emailSuccess = true
          addNotification({
            type: 'success',
            title: 'Successfully Subscribed!',
            message: 'Thank you for subscribing to our newsletter.',
            duration: 5000
          })

          return true
        } catch (clientError) {
          console.info('Client-side subscription failed, trying server-side API...', clientError)
          // Fall through to server-side API
        }
      }

      // Use server-side API (fallback or primary method)
      const response = await $fetch('/api/newsletter/subscribe', {
        method: 'POST',
        body: { email }
      }) as { success: boolean; message: string; code?: string }

      if (response.success) {
        state.emailSuccess = true
        addNotification({
          type: 'success',
          title: 'Successfully Subscribed!',
          message: 'Thank you for subscribing to our newsletter.',
          duration: 5000
        })
        return true
      } else if (response.code === 'ALREADY_SUBSCRIBED') {
        addNotification({
          type: 'warning',
          title: 'Already Subscribed',
          message: 'Your email is already subscribed to our newsletter.',
          duration: 5000
        })
        return false
      } else {
        throw new Error(response.message || 'Server-side subscription failed')
      }
    } catch (error: any) {
      console.error('Newsletter subscription error:', error)
      state.emailError = true
      
      // Handle specific error types
      let errorMessage = 'Something went wrong. Please try again later.'
      
      if (error.message?.includes('already subscribed')) {
        errorMessage = 'This email is already subscribed to our newsletter.'
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.'
      } else if (error.statusCode === 429) {
        errorMessage = 'Too many requests. Please try again in a few minutes.'
      } else if (error.statusCode === 503) {
        errorMessage = 'Newsletter service is temporarily unavailable. Please try again later.'
      }
      
      addNotification({
        type: 'error',
        title: 'Subscription Failed',
        message: errorMessage,
        duration: 5000
      })

      return false
    } finally {
      state.isLoading = false
    }
  }

  /**
   * Unsubscribe from newsletter
   */
  const unsubscribeFromNewsletter = async (email: string): Promise<boolean> => {
    const validation = validateEmail(email)
    if (!validation.isValid) {
      addNotification({
        type: 'error',
        title: 'Invalid Email',
        message: validation.error || 'Please enter a valid email address',
        duration: 4000
      })
      return false
    }

    try {
      if (newsletterService) {
        await newsletterService.unsubscribeEmail(email)
      } else {
        // Use server-side API for unsubscribe (would need to be implemented)
        throw new Error('Unsubscribe functionality not available')
      }
      
      addNotification({
        type: 'success',
        title: 'Unsubscribed',
        message: 'You have been successfully unsubscribed from our newsletter.',
        duration: 5000
      })

      return true
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Unsubscribe Failed',
        message: 'Failed to unsubscribe. Please try again later.',
        duration: 5000
      })
      return false
    }
  }

  /**
   * Get subscriber count for analytics
   */
  const getSubscriberCount = async (): Promise<number> => {
    try {
      if (newsletterService) {
        return await newsletterService.getSubscriberCount()
      }
      return 0
    } catch {
      return 0
    }
  }

  return {
    state: readonly(state),
    validateEmail,
    subscribeToNewsletter,
    unsubscribeFromNewsletter,
    getSubscriberCount
  }
}
