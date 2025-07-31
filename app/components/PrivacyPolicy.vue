<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isVisible" 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <!-- Modal Content -->
        <div class="relative bg-gray-900 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-700">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 class="text-2xl font-bold text-white">Privacy Policy</h2>
            <button 
              @click="closeModal"
              class="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              aria-label="Close modal"
            >
              <Icon name="heroicons:x-mark" class="w-6 h-6" />
            </button>
          </div>
          
          <!-- Content -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            <div class="prose prose-invert prose-lg max-w-none">
              <p class="text-gray-300 mb-6">
                Last updated: {{ lastUpdated }}
              </p>
              
              <div class="space-y-6">
                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">Our Commitment to Your Privacy</h3>
                  <p class="text-gray-300 leading-relaxed">
                    We deeply respect your privacy and are committed to protecting your personal information. 
                    This privacy policy explains how we collect, use, and safeguard your data when you subscribe 
                    to our newsletter.
                  </p>
                </section>

                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">What Information We Collect</h3>
                  <ul class="text-gray-300 space-y-2">
                    <li>• <strong>Email Address:</strong> When you subscribe to our newsletter</li>
                    <li>• <strong>Subscription Date:</strong> To track when you joined our community</li>
                    <li>• <strong>Interaction Data:</strong> How you engage with our content (opens, clicks)</li>
                  </ul>
                </section>

                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">How We Use Your Information</h3>
                  <ul class="text-gray-300 space-y-2">
                    <li>• Send you valuable content, updates, and insights</li>
                    <li>• Improve our content based on your interests</li>
                    <li>• Ensure our emails reach you successfully</li>
                    <li>• Maintain and improve our newsletter service</li>
                  </ul>
                </section>

                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">Your Rights and Control</h3>
                  <div class="text-gray-300 space-y-3">
                    <p><strong>You have complete control over your data:</strong></p>
                    <ul class="space-y-2">
                      <li>• <strong>Unsubscribe anytime:</strong> Every email includes an easy unsubscribe link</li>
                      <li>• <strong>Data deletion:</strong> Contact us to delete your information completely</li>
                      <li>• <strong>Data access:</strong> Request a copy of your stored data</li>
                      <li>• <strong>Update preferences:</strong> Modify your subscription settings</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">Data Security</h3>
                  <p class="text-gray-300 leading-relaxed">
                    We use industry-standard security measures to protect your information. Your data is 
                    stored securely and encrypted. We never sell, rent, or share your email address with 
                    third parties for marketing purposes.
                  </p>
                </section>

                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">No Spam Promise</h3>
                  <p class="text-gray-300 leading-relaxed">
                    We respect your inbox. We only send valuable, relevant content and will never spam you. 
                    You can expect quality over quantity from our newsletter.
                  </p>
                </section>

                <section>
                  <h3 class="text-xl font-semibold text-white mb-3">Contact Us</h3>
                  <p class="text-gray-300 leading-relaxed">
                    If you have any questions about this privacy policy or how we handle your data, 
                    please don't hesitate to contact us. We're here to help and ensure your privacy 
                    is protected.
                  </p>
                </section>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="flex justify-end p-6 border-t border-gray-700">
            <button 
              @click="closeModal"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
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

// Prevent body scroll when modal is open
watch(() => props.isVisible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
/* Modal transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Custom scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(55, 65, 81, 0.3);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* Prose styling adjustments */
.prose h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1rem;
}

.prose ul {
  margin-bottom: 1rem;
}
</style>