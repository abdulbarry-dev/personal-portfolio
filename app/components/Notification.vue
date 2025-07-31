<template>
  <section class="newsletter-section">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
        <!-- Left side - Heading -->
        <div class="flex-1 text-center lg:text-left lg:pr-8">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Enjoy my content?<br>
            Stay updated with<br>
            my newsletter.
          </h1>
        </div>
        
        <!-- Right side - Form -->
        <div class="flex-1 max-w-md mx-auto lg:mx-0">
          <form @submit.prevent="handleSubmit" class="flex flex-col space-y-4">
            <!-- Email Input and Button -->
            <div class="flex flex-col sm:flex-row gap-3">
              <input 
                v-model="email"
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                required
                :disabled="isLoading"
                class="flex-1 px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                type="submit"
                :disabled="isLoading || !email"
                class="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 whitespace-nowrap shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
              >
                <Icon v-if="isLoading" name="svg-spinners:8-dots-rotate" class="w-5 h-5 mr-2" />
                <span>{{ isLoading ? 'Adding...' : 'Notify me' }}</span>
              </button>
            </div>
            
            <!-- Privacy Policy Text -->
            <p class="text-gray-300 text-sm text-center sm:text-left">
              No spam, just useful updates. 
              <button 
                @click="showPrivacyModal = true"
                class="text-white font-semibold hover:underline focus:underline transition-all duration-200 cursor-pointer bg-transparent border-none p-0"
              >
                Read privacy policy.
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Privacy Policy Modal -->
    <PrivacyPolicy 
      :is-visible="showPrivacyModal" 
      @close="showPrivacyModal = false" 
    />
  </section>
</template>

<script setup>
defineOptions({
  name: 'NewsletterSubscription'
})

// Use the global notification system
const { addNotification } = useNotifications()

// Reactive variables
const email = ref('')
const isLoading = ref(false)
const showPrivacyModal = ref(false)

// Get Supabase instance
const { $supabase } = useNuxtApp()

// Email validation function
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Normalize email addresses (handle Gmail dot variations)
const normalizeEmail = (email) => {
  const trimmedEmail = email.toLowerCase().trim()
  const [localPart, domain] = trimmedEmail.split('@')
  
  // Gmail domains that ignore dots in local part
  const gmailDomains = [
    'gmail.com',
    'googlemail.com' // Alternative Gmail domain in some countries
  ]
  
  // If it's a Gmail address, remove dots from local part
  if (gmailDomains.includes(domain)) {
    const normalizedLocalPart = localPart.replace(/\./g, '')
    return `${normalizedLocalPart}@${domain}`
  }
  
  // For other email providers, return as is
  return trimmedEmail
}

// Check if email exists in database
const checkEmailExists = async (email) => {
  try {
    const normalizedEmail = normalizeEmail(email)
    
    const { data, error } = await $supabase
      .from('newsletter_subscribers')
      .select('email, normalized_email')
      .eq('normalized_email', normalizedEmail)
      .single()

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "No rows found" which means email doesn't exist
      throw error
    }

    return !!data // Return true if data exists, false otherwise
  } catch (error) {
    console.error('Error checking email:', error)
    throw error
  }
}

// Subscribe email to newsletter
const subscribeEmail = async (email) => {
  try {
    const originalEmail = email.toLowerCase().trim()
    const normalizedEmail = normalizeEmail(email)
    
    const { data, error } = await $supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email: originalEmail, // Store the original email as entered
          normalized_email: normalizedEmail, // Store normalized version for duplicate checking
          subscribed_at: new Date().toISOString(),
          is_active: true
        }
      ])
      .select()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error subscribing email:', error)
    throw error
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!email.value || isLoading.value) return

  // Validate email format
  if (!isValidEmail(email.value)) {
    addNotification({
      type: 'error',
      title: 'Invalid Email',
      message: 'Please enter a valid email address.',
      duration: 4000
    })
    return
  }

  isLoading.value = true

  try {
    // Check if email already exists (using normalized comparison)
    const emailExists = await checkEmailExists(email.value)

    if (emailExists) {
      // Email already subscribed
      addNotification({
        type: 'warning',
        title: 'Already Subscribed',
        message: 'Your email is already subscribed to our newsletter.',
        duration: 5000
      })
    } else {
      // Subscribe new email
      await subscribeEmail(email.value)
      
      addNotification({
        type: 'success',
        title: 'Successfully Subscribed! 🎉',
        message: 'Thank you for subscribing to our newsletter.',
        duration: 5000
      })

      // Clear the email input
      email.value = ''
    }
  } catch (error) {
    console.error('Subscription error:', error)
    addNotification({
      type: 'error',
      title: 'Subscription Failed',
      message: 'Something went wrong. Please try again later.',
      duration: 5000
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.newsletter-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #3730a3 75%, #7c3aed 100%);
  min-height: 60vh;
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%);
  pointer-events: none;
}

.newsletter-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.02) 50%, transparent 70%);
  pointer-events: none;
}

/* Mobile First Responsive Design */
@media (max-width: 640px) {
  .newsletter-section {
    min-height: 50vh;
  }
  
  .newsletter-section h1 {
    font-size: 2rem;
    line-height: 1.2;
  }
  
  .newsletter-section .flex-col.space-y-4 {
    gap: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .newsletter-section h1 {
    font-size: 2.5rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .newsletter-section h1 {
    font-size: 3rem;
  }
}

@media (min-width: 1025px) {
  .newsletter-section {
    min-height: 60vh;
  }
}

/* Enhanced focus states for accessibility */
.newsletter-section input:focus,
.newsletter-section button:focus {
  transform: translateY(-1px);
}

.newsletter-section button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
}

/* Animation for smooth transitions */
.newsletter-section * {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Loading state styles */
.newsletter-section button:disabled {
  transform: none;
}
</style>