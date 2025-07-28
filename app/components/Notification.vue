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
          <div class="flex flex-col space-y-4">
            <!-- Email Input and Button -->
            <div class="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Enter your email"
                class="flex-1 px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button 
                type="submit"
                class="px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200 whitespace-nowrap shadow-lg"
              >
                Notify me
              </button>
            </div>
            
            <!-- Privacy Policy Text -->
            <p class="text-gray-300 text-sm text-center sm:text-left">
              No spam, just useful updates. 
              <a href="#privacy-policy" class="text-white font-semibold hover:underline focus:underline transition-all duration-200">
                Read privacy policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div v-if="notifications.length" class="fixed bottom-4 right-4 z-50 space-y-2">
    <TransitionGroup
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform translate-x-full"
      enter-to-class="opacity-100 transform translate-x-0"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-x-0"
      leave-to-class="opacity-0 transform translate-x-full"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 dark:ring-gray-700 overflow-hidden"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <Icon 
                v-if="notification.type === 'success'" 
                name="heroicons:check-circle" 
                class="h-6 w-6 text-green-400 dark:text-green-300" 
              />
              <Icon 
                v-else-if="notification.type === 'error'" 
                name="heroicons:x-circle" 
                class="h-6 w-6 text-red-400 dark:text-red-300" 
              />
              <Icon 
                v-else-if="notification.type === 'warning'" 
                name="heroicons:exclamation-triangle" 
                class="h-6 w-6 text-yellow-400 dark:text-yellow-300" 
              />
              <Icon 
                v-else 
                name="heroicons:information-circle" 
                class="h-6 w-6 text-blue-400 dark:text-blue-300" 
              />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ notification.title }}
              </p>
              <p v-if="notification.message" class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ notification.message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="removeNotification(notification.id)"
                class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
              >
                <span class="sr-only">Close</span>
                <Icon name="heroicons:x-mark" class="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
defineOptions({
  name: 'NewsletterSubscription'
})

// Notification store
const notifications = ref([])

// Add notification function
const addNotification = (notification) => {
  const id = Date.now()
  const newNotification = {
    id,
    type: 'info',
    title: '',
    message: '',
    duration: 5000,
    ...notification
  }
  
  notifications.value.push(newNotification)
  
  // Auto remove after duration
  if (newNotification.duration > 0) {
    setTimeout(() => {
      removeNotification(id)
    }, newNotification.duration)
  }
}

// Remove notification function
const removeNotification = (id) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

// Expose functions globally
if (process.client) {
  window.$notify = addNotification
}

// Provide to child components
provide('notify', addNotification)
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

.newsletter-section button:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.25);
}

/* Animation for smooth transitions */
.newsletter-section * {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>