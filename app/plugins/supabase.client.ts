import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin<{
  supabase: SupabaseClient<any, 'public', any> | null
}>((nuxtApp) => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey

  // Validate environment variables
  let supabase: SupabaseClient<any, 'public', any> | null = null
  
  // Debug environment variables during build
  if (process.env.NODE_ENV !== 'development') {
    console.log('Supabase config check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseAnonKey,
      urlLength: supabaseUrl?.length || 0,
      keyLength: supabaseAnonKey?.length || 0
    })
  }
  
  if (!supabaseUrl || !supabaseAnonKey) {
    const logLevel = process.env.NODE_ENV === 'development' ? 'warn' : 'log'
    console[logLevel]('Supabase configuration missing. Newsletter functionality will be disabled.', {
      url: supabaseUrl ? '✓ configured' : '✗ missing',
      key: supabaseAnonKey ? '✓ configured' : '✗ missing',
      environment: process.env.NODE_ENV
    })
    // supabase remains null - graceful degradation
  } else {
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false, // Disable auth persistence for newsletter only
          autoRefreshToken: false,
          detectSessionInUrl: false
        },
        global: {
          headers: {
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        },
        db: {
          schema: 'public'
        }
      })

      // Test connection in development
      if (process.env.NODE_ENV === 'development') {
        supabase
          .from('newsletter_subscribers')
          .select('count', { count: 'exact', head: true })
          .then(({ error }) => {
            if (error) {
              console.warn('Supabase connection test failed:', error.message)
            } else {
              console.info('✓ Supabase connection established')
            }
          })
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to initialize Supabase client:', error)
      }
      supabase = null
    }
  }

  return {
    provide: {
      supabase
    }
  }
})
