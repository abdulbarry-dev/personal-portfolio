import type { SupabaseClient } from '@supabase/supabase-js'
import { NewsletterSchema, type NewsletterSubscription } from '../schemas/newsletter'
import { normalizeEmail } from '../utils/email'

export class NewsletterService {
  private supabase: SupabaseClient | null
  private tableName = 'newsletter_subscribers'

  constructor(supabase: SupabaseClient | null) {
    this.supabase = supabase
  }

  /**
   * Check if Supabase client is available
   */
  private ensureSupabaseClient(): SupabaseClient {
    if (!this.supabase) {
      throw new Error('Supabase client not available. Please check your configuration.')
    }
    return this.supabase
  }

  /**
   * Check if an email already exists in the newsletter
   */
  async checkEmailExists(email: string): Promise<boolean> {
    const client = this.ensureSupabaseClient()
    
    try {
      const { normalized_email } = normalizeEmail(email)
      
      const { data, error } = await client
        .from(this.tableName)
        .select('id')
        .eq('normalized_email', normalized_email)
        .eq('is_active', true)
        .single()

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is "No rows found" which means email doesn't exist
        throw error
      }

      return !!data
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return false
      }
      throw new Error(`Failed to check email existence: ${error.message}`)
    }
  }

  /**
   * Subscribe an email to the newsletter
   */
  async subscribeEmail(email: string): Promise<NewsletterSubscription> {
    const client = this.ensureSupabaseClient()
    
    try {
      // Validate email with Zod
      const validatedEmail = NewsletterSchema.shape.email.parse(email)
      const { original_email, normalized_email } = normalizeEmail(validatedEmail)
      
      const subscriptionData = NewsletterSchema.parse({
        email: original_email,
        normalized_email,
        subscribed_at: new Date().toISOString(),
        is_active: true
      })

      const { data, error } = await client
        .from(this.tableName)
        .insert([subscriptionData])
        .select()
        .single()

      if (error) {
        throw error
      }

      if (!data) {
        throw new Error('No data returned from subscription')
      }

      return data as NewsletterSubscription
    } catch (error: any) {
      if (error.code === '23505') {
        // PostgreSQL unique constraint violation
        throw new Error('Email is already subscribed')
      }
      throw new Error(`Failed to subscribe email: ${error.message}`)
    }
  }

  /**
   * Unsubscribe an email from the newsletter
   */
  async unsubscribeEmail(email: string): Promise<boolean> {
    const client = this.ensureSupabaseClient()
    
    try {
      const { normalized_email } = normalizeEmail(email)
      
      const { error } = await client
        .from(this.tableName)
        .update({ is_active: false })
        .eq('normalized_email', normalized_email)

      if (error) {
        throw error
      }

      return true
    } catch (error: any) {
      throw new Error(`Failed to unsubscribe email: ${error.message}`)
    }
  }

  /**
   * Get subscriber count (for analytics)
   */
  async getSubscriberCount(): Promise<number> {
    const client = this.ensureSupabaseClient()
    
    try {
      const { count, error } = await client
        .from(this.tableName)
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      if (error) {
        throw error
      }

      return count || 0
    } catch (error: any) {
      throw new Error(`Failed to get subscriber count: ${error.message}`)
    }
  }

  /**
   * Health check for the service
   */
  async healthCheck(): Promise<boolean> {
    try {
      // If no Supabase client, return false immediately
      if (!this.supabase) {
        console.warn('Newsletter: Supabase client not available')
        return false
      }

      const client = this.ensureSupabaseClient()
      
      // Simple query to check if the service is working
      const { data, error } = await client
        .from(this.tableName)
        .select('id')
        .limit(1)

      if (error) {
        console.warn('Newsletter health check failed:', error.message)
        return false
      }

      return true
    } catch (error: any) {
      console.warn('Newsletter health check error:', error.message)
      return false
    }
  }
}
