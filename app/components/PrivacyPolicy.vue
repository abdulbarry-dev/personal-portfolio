<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isVisible" 
        class="privacy-modal-overlay"
        :class="{ 'dark': isDark }"
        @click.self="closeModal"
      >
        <!-- Modal Content -->
        <div class="privacy-modal-content">
          <!-- Header -->
          <div class="privacy-modal-header">
            <h2 class="privacy-modal-title">Privacy Policy</h2>
            <button 
              @click="closeModal"
              class="privacy-close-button"
              aria-label="Close modal"
            >
              <Icon name="heroicons:x-mark" class="privacy-close-icon" />
            </button>
          </div>
          
          <!-- Content -->
          <div class="privacy-modal-body">
            <div class="privacy-content">
              <p class="privacy-last-updated">
                Last updated: {{ lastUpdated }}
              </p>
              
              <div class="privacy-sections">
                <section class="privacy-section">
                  <h3 class="privacy-section-title">Our Commitment to Your Privacy</h3>
                  <p class="privacy-section-text">
                    We deeply respect your privacy and are committed to protecting your personal information. 
                    This privacy policy explains how we collect, use, and safeguard your data when you subscribe 
                    to our newsletter.
                  </p>
                </section>

                <section class="privacy-section">
                  <h3 class="privacy-section-title">What Information We Collect</h3>
                  <ul class="privacy-list">
                    <li class="privacy-list-item">
                      <span class="privacy-list-strong">Email Address:</span> When you subscribe to our newsletter
                    </li>
                    <li class="privacy-list-item">
                      <span class="privacy-list-strong">Subscription Date:</span> To track when you joined our community
                    </li>
                    <li class="privacy-list-item">
                      <span class="privacy-list-strong">Interaction Data:</span> How you engage with our content (opens, clicks)
                    </li>
                  </ul>
                </section>

                <section class="privacy-section">
                  <h3 class="privacy-section-title">How We Use Your Information</h3>
                  <ul class="privacy-list">
                    <li class="privacy-list-item">Send you valuable content, updates, and insights</li>
                    <li class="privacy-list-item">Improve our content based on your interests</li>
                    <li class="privacy-list-item">Ensure our emails reach you successfully</li>
                    <li class="privacy-list-item">Maintain and improve our newsletter service</li>
                  </ul>
                </section>

                <section class="privacy-section">
                  <h3 class="privacy-section-title">Your Rights and Control</h3>
                  <div class="privacy-nested-content">
                    <p class="privacy-section-text">
                      <span class="privacy-list-strong">You have complete control over your data:</span>
                    </p>
                    <ul class="privacy-nested-list">
                      <li class="privacy-nested-list-item">
                        <span class="privacy-list-strong">Unsubscribe anytime:</span> Every email includes an easy unsubscribe link
                      </li>
                      <li class="privacy-nested-list-item">
                        <span class="privacy-list-strong">Data deletion:</span> Contact us to delete your information completely
                      </li>
                      <li class="privacy-nested-list-item">
                        <span class="privacy-list-strong">Data access:</span> Request a copy of your stored data
                      </li>
                      <li class="privacy-nested-list-item">
                        <span class="privacy-list-strong">Update preferences:</span> Modify your subscription settings
                      </li>
                    </ul>
                  </div>
                </section>

                <section class="privacy-section">
                  <h3 class="privacy-section-title">Data Security</h3>
                  <p class="privacy-section-text">
                    We use industry-standard security measures to protect your information. Your data is 
                    stored securely and encrypted. We never sell, rent, or share your email address with 
                    third parties for marketing purposes.
                  </p>
                </section>

                <section class="privacy-section">
                  <h3 class="privacy-section-title">No Spam Promise</h3>
                  <p class="privacy-section-text">
                    We respect your inbox. We only send valuable, relevant content and will never spam you. 
                    You can expect quality over quantity from our newsletter.
                  </p>
                </section>

                <section class="privacy-section">
                  <h3 class="privacy-section-title">Contact Us</h3>
                  <p class="privacy-section-text">
                    If you have any questions about this privacy policy or how we handle your data, 
                    please don't hesitate to contact us. We're here to help and ensure your privacy 
                    is protected.
                  </p>
                </section>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="privacy-modal-footer">
            <button 
              @click="closeModal"
              class="privacy-got-it-button"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PrivacyPolicy'
})

// Props
interface Props {
  isVisible: boolean
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  close: []
}>()

// Use theme composable to get current theme
const { isDark } = useTheme()

// Computed
const lastUpdated = computed(() => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Methods
const closeModal = () => {
  emit('close')
}

// Handle escape key
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isVisible) {
    closeModal()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

// Prevent body scroll and interactions when modal is open
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
    document.body.classList.add('modal-open')
  } else {
    document.body.style.overflow = ''
    document.body.classList.remove('modal-open')
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
  document.body.classList.remove('modal-open')
})
</script>

<style scoped>
@import './../assets/css/PrivacyPolicy.css';
</style>