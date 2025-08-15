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
          <form @submit.prevent="handleSubmit" class="newsletter-form" :class="{ loading: state.isLoading }">
            <!-- Email Input and Button -->
            <div class="newsletter-input-container">
              <input 
                v-model="email"
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                required
                :disabled="state.isLoading"
                class="newsletter-email-input"
                :class="{ 
                  error: state.emailError, 
                  success: state.emailSuccess 
                }"
              />
              <button 
                type="submit"
                :disabled="state.isLoading || !email"
                class="newsletter-submit-button"
              >
                <Icon v-if="state.isLoading" name="svg-spinners:8-dots-rotate" class="newsletter-loading-icon" />
                <span>{{ state.isLoading ? 'Adding...' : 'Notify me' }}</span>
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

// Use the newsletter composable
const { state, subscribeToNewsletter } = useNewsletter()

// Reactive variables
const email = ref('')
const showPrivacyModal = ref(false)

// Handle form submission
const handleSubmit = async () => {
  if (!email.value || state.isLoading) return

  const success = await subscribeToNewsletter(email.value)
  
  if (success) {
    // Clear the email input after successful subscription
    setTimeout(() => {
      email.value = ''
    }, 2000)
  }
}
</script>