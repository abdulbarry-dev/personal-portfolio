import { createClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const supabaseUrl = config.public.supabaseUrl
  const supabaseAnonKey = config.public.supabaseAnonKey

  // Validate environment variables
  let supabase: ReturnType<typeof createClient> | null = null;
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Supabase configuration missing. Please check your environment variables:', {
        url: supabaseUrl ? 'configured' : 'missing',
        key: supabaseAnonKey ? 'configured' : 'missing'
      })
    }
    // supabase remains null
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false // Disable auth persistence for newsletter only
      },
      global: {
        headers: {
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    })
  }

  return {
    provide: {
      supabase
    }
  }
})
