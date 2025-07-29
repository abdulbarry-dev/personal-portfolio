<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 transition-colors duration-200">
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- Name and Email Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name Field -->
        <div class="space-y-2">
          <label 
            for="name" 
            class="block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Name <span class="text-red-500 dark:text-red-400">*</span>
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            required
            placeholder="John Doe"
            class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 hover:bg-white dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            :class="{ 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 bg-red-50/30 dark:bg-red-900/30': errors.name }"
          >
          <p v-if="errors.name" class="text-sm text-red-600 dark:text-red-400">{{ errors.name }}</p>
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label 
            for="email" 
            class="block text-sm font-semibold text-gray-900 dark:text-white"
          >
            Email <span class="text-red-500 dark:text-red-400">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            required
            placeholder="john@doe.com"
            class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 hover:bg-white dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            :class="{ 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 bg-red-50/30 dark:bg-red-900/30': errors.email }"
          >
          <p v-if="errors.email" class="text-sm text-red-600 dark:text-red-400">{{ errors.email }}</p>
        </div>
      </div>

      <!-- Query/Subject Field -->
      <div class="space-y-2">
        <label 
          for="query" 
          class="block text-sm font-semibold text-gray-900 dark:text-white"
        >
          Query <span class="text-red-500 dark:text-red-400">*</span>
        </label>
        <div class="relative">
          <select
            id="query"
            v-model="form.query"
            name="query"
            required
            class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 appearance-none hover:bg-white dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
            :class="{ 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 bg-red-50/30 dark:bg-red-900/30': errors.query }"
          >
            <option value="" disabled class="text-gray-400 dark:text-gray-500">Pick one</option>
            <option value="general" class="text-gray-900 dark:text-white">General Inquiry</option>
            <option value="project" class="text-gray-900 dark:text-white">Project Collaboration</option>
            <option value="freelance" class="text-gray-900 dark:text-white">Freelance Work</option>
            <option value="job" class="text-gray-900 dark:text-white">Job Opportunity</option>
            <option value="consultation" class="text-gray-900 dark:text-white">Consultation</option>
            <option value="other" class="text-gray-900 dark:text-white">Other</option>
          </select>
          <!-- Custom dropdown arrow -->
          <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p v-if="errors.query" class="text-sm text-red-600 dark:text-red-400">{{ errors.query }}</p>
      </div>

      <!-- Message Field -->
      <div class="space-y-2">
        <label 
          for="message" 
          class="block text-sm font-semibold text-gray-900 dark:text-white"
        >
          Message <span class="text-red-500 dark:text-red-400">*</span>
        </label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          required
          rows="6"
          placeholder="Your message"
          class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 resize-vertical hover:bg-white dark:hover:bg-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
          :class="{ 'border-red-500 dark:border-red-400 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400 bg-red-50/30 dark:bg-red-900/30': errors.message }"
        ></textarea>
        <p v-if="errors.message" class="text-sm text-red-600 dark:text-red-400">{{ errors.message }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ form.message.length }}/500 characters</p>
      </div>

      <!-- Submit Button -->
      <div class="pt-4">
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full md:w-auto px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Icon 
            v-if="isLoading" 
            name="svg-spinners:8-dots-rotate" 
            class="w-5 h-5 mr-2" 
          />
          {{ isLoading ? 'Sending...' : 'Send message' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
defineOptions({
  name: 'ContactForm'
})

// Use the notification system
const { addNotification } = useNotifications()

// Form data
const form = reactive({
  name: '',
  email: '',
  query: '',
  message: ''
})

// Form state
const isLoading = ref(false)
const errors = reactive({
  name: '',
  email: '',
  query: '',
  message: ''
})

// Formspree endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/manbjooj'

// Validation function
const validateForm = () => {
  Object.keys(errors).forEach(key => {
    errors[key] = ''
  })

  let isValid = true

  if (!form.name.trim()) {
    errors.name = 'Name is required'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!form.query) {
    errors.query = 'Please select a query type'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Message is required'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
    isValid = false
  } else if (form.message.length > 500) {
    errors.message = 'Message must be less than 500 characters'
    isValid = false
  }

  return isValid
}

// Form submission handler with Formspree integration
const handleSubmit = async () => {
  if (!validateForm()) {
    addNotification({
      type: 'error',
      title: 'Validation Error',
      message: 'Please correct the errors in the form and try again.',
      duration: 4000
    })
    return
  }

  isLoading.value = true

  try {
    // Prepare form data for Formspree
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('query', form.query)
    formData.append('message', form.message)
    
    // Add additional metadata
    formData.append('_subject', `New contact form submission: ${form.query}`)
    formData.append('_replyto', form.email)

    // Submit to Formspree
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })

    if (response.ok) {
      addNotification({
        type: 'success',
        title: 'Message Sent Successfully! 🎉',
        message: "Thank you for reaching out! I'll get back to you as soon as possible.",
        duration: 6000
      })
      
      // Clear form on successful submission
      Object.keys(form).forEach(key => {
        form[key] = ''
      })
    } else {
      // Handle Formspree error responses
      const errorData = await response.json()
      
      let errorMessage = 'There was a problem with your submission. Please try again.'
      
      if (errorData.errors) {
        // Handle validation errors from Formspree
        const errorMessages = errorData.errors.map(error => error.message).join(', ')
        errorMessage = `Validation error: ${errorMessages}`
      }
      
      addNotification({
        type: 'error',
        title: 'Oops! Something went wrong',
        message: errorMessage,
        duration: 5000
      })
    }
  } catch (error) {
    // Handle network errors
    let errorMessage = 'An unexpected error occurred. Please try again later.'
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      errorMessage = 'Network error. Please check your connection and try again.'
    }
    
    addNotification({
      type: 'error',
      title: 'Connection Error',
      message: errorMessage,
      duration: 5000
    })
  } finally {
    isLoading.value = false
  }
}
</script>