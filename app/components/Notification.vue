<template>
  <section class="newsletter-section">
    <div class="newsletter-container">
      <div class="newsletter-flex">
        <!-- Left side - Heading -->
        <div class="newsletter-heading-section">
          <h1 class="newsletter-heading">
            Enjoy my content?<br>
            Stay updated with<br>
            my newsletter.
          </h1>
        </div>
        
        <!-- Right side - Form -->
        <div class="newsletter-form-section">
          <form @submit.prevent="handleSubmit" class="newsletter-form" :class="{ loading: isLoading }">
            <!-- Email Input and Button -->
            <div class="newsletter-input-container">
              <input 
                v-model="email"
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                required
                :disabled="isLoading"
                class="newsletter-email-input"
                :class="{ 
                  error: emailError, 
                  success: emailSuccess 
                }"
              />
              <button 
                type="submit"
                :disabled="isLoading || !email"
                class="newsletter-submit-button"
              >
                <Icon v-if="isLoading" name="svg-spinners:8-dots-rotate" class="newsletter-loading-icon" />
                <span>{{ isLoading ? 'Adding...' : 'Notify me' }}</span>
              </button>
            </div>
            
            <!-- Privacy Policy Text -->
            <p class="newsletter-privacy-text">
              No spam, just useful updates. 
              <button 
                @click="showPrivacyModal = true"
                class="newsletter-privacy-link"
                type="button"
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
const emailError = ref(false)
const emailSuccess = ref(false)

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

  // Reset states
  emailError.value = false
  emailSuccess.value = false

  // Validate email format
  if (!isValidEmail(email.value)) {
    emailError.value = true
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
      
      emailSuccess.value = true
      addNotification({
        type: 'success',
        title: 'Successfully Subscribed! 🎉',
        message: 'Thank you for subscribing to our newsletter.',
        duration: 5000
      })

      // Clear the email input after a delay
      setTimeout(() => {
        email.value = ''
        emailSuccess.value = false
      }, 2000)
    }
  } catch (error) {
    console.error('Subscription error:', error)
    emailError.value = true
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