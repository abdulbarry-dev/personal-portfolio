<template>
  <div class="contact-form-container">
    <form class="contact-form" @submit.prevent="handleSubmit">
      <!-- Name and Email Row -->
      <div class="form-row">
        <!-- Name Field -->
        <div class="field-wrapper">
          <label 
            for="name" 
            class="field-label"
          >
            Name <span class="required-asterisk">*</span>
          </label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            name="name"
            required
            placeholder="John Doe"
            class="form-input"
            :class="getFieldClass('name')"
            @blur="validateField('name')"
            @input="handleNameInput"
          >
          <p v-if="errors.name" class="error-message">{{ errors.name }}</p>
          <p v-if="successMessages.name" class="success-message">{{ successMessages.name }}</p>
        </div>

        <!-- Email Field -->
        <div class="field-wrapper">
          <label 
            for="email" 
            class="field-label"
          >
            Email <span class="required-asterisk">*</span>
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            required
            placeholder="john@doe.com"
            class="form-input"
            :class="getFieldClass('email')"
            @blur="validateField('email')"
          >
          <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
          <p v-if="successMessages.email" class="success-message">{{ successMessages.email }}</p>
        </div>
      </div>

      <!-- Query/Subject Field -->
      <div class="field-wrapper">
        <label 
          for="query" 
          class="field-label"
        >
          Query <span class="required-asterisk">*</span>
        </label>
        <div class="form-select-wrapper">
          <select
            id="query"
            v-model="form.query"
            name="query"
            required
            class="form-select"
            :class="getFieldClass('query')"
            @change="validateField('query')"
          >
            <option value="" disabled>Pick one</option>
            <option value="general">General Inquiry</option>
            <option value="project">Project Collaboration</option>
            <option value="freelance">Freelance Work</option>
            <option value="job">Job Opportunity</option>
            <option value="consultation">Consultation</option>
            <option value="other">Other</option>
          </select>
          <!-- Custom dropdown arrow -->
          <div class="select-arrow">
            <svg class="select-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <p v-if="errors.query" class="error-message">{{ errors.query }}</p>
        <p v-if="successMessages.query" class="success-message">{{ successMessages.query }}</p>
      </div>

      <!-- Message Field -->
      <div class="field-wrapper">
        <label 
          for="message" 
          class="field-label"
        >
          Message <span class="required-asterisk">*</span>
        </label>
        <textarea
          id="message"
          v-model="form.message"
          name="message"
          required
          rows="6"
          placeholder="Your message"
          class="form-textarea"
          :class="getFieldClass('message')"
          @blur="validateField('message')"
        ></textarea>
        <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
        <p v-if="successMessages.message" class="success-message">{{ successMessages.message }}</p>
        <p class="helper-text">{{ form.message.length }}/500 characters</p>
      </div>

      <!-- Submit Button -->
      <div class="submit-section">
        <button
          type="submit"
          :disabled="isLoading"
          class="submit-button"
        >
          <Icon 
            v-if="isLoading" 
            name="svg-spinners:8-dots-rotate" 
            class="button-icon" 
          />
          {{ isLoading ? 'Sending...' : 'Send message' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import './../assets/css/ContactForm.css';
</style>

<script setup>
// Enhanced ContactForm component with SEO structured data
const { setStructuredData } = useSEO()

defineOptions({
  name: 'ContactForm'
})

// Add structured data for the contact form on mount
onMounted(() => {
  const contactActionSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactAction',
    name: 'Contact Abdulbarry Guenichi',
    description: 'Get in touch for frontend development projects and collaboration',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://abdulbarry.dev/contact',
      contentType: 'text/html',
      encodingType: 'application/x-www-form-urlencoded',
      httpMethod: 'POST'
    },
    object: {
      '@type': 'Person',
      name: 'Abdulbarry Guenichi',
      jobTitle: 'Frontend Developer',
      email: 'contact@abdulbarry.dev',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Professional',
        availableLanguage: ['English', 'French', 'Arabic']
      }
    }
  }

  setStructuredData(contactActionSchema)
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
const hasSubmitted = ref(false)
const errors = reactive({
  name: '',
  email: '',
  query: '',
  message: ''
})

const successMessages = reactive({
  name: '',
  email: '',
  query: '',
  message: ''
})

// Get Formspree endpoint from environment variables
const config = useRuntimeConfig()
const FORMSPREE_ENDPOINT = config.public.formspreeEndpoint

// Name validation regex - only alphabetic characters, spaces, hyphens, and apostrophes
const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s\-'\.]+$/

// Get field class based on validation state
const getFieldClass = (fieldName) => {
  if (errors[fieldName]) {
    return 'error'
  }
  
  // Only show success state after first validation attempt or blur
  if (hasSubmitted.value || successMessages[fieldName]) {
    if (isFieldValid(fieldName)) {
      return 'success'
    }
  }
  
  return ''
}

// Check if individual field is valid
const isFieldValid = (fieldName) => {
  switch (fieldName) {
    case 'name':
      return form.name.trim().length >= 2 && 
             form.name.trim().length <= 50 && 
             nameRegex.test(form.name.trim())
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return form.email.trim() && emailRegex.test(form.email)
    case 'query':
      return form.query !== ''
    case 'message':
      return form.message.trim().length >= 10 && form.message.length <= 500
    default:
      return false
  }
}

// Validate individual field
const validateField = (fieldName) => {
  // Clear previous states
  errors[fieldName] = ''
  successMessages[fieldName] = ''
  
  let isValid = true
  
  switch (fieldName) {
    case 'name':
      const trimmedName = form.name.trim()
      
      if (!trimmedName) {
        errors.name = 'Name is required'
        isValid = false
      } else if (trimmedName.length < 2) {
        errors.name = 'Name must be at least 2 characters'
        isValid = false
      } else if (trimmedName.length > 50) {
        errors.name = 'Name must be less than 50 characters'
        isValid = false
      } else if (!nameRegex.test(trimmedName)) {
        errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes'
        isValid = false
      } else {
        successMessages.name = 'Looks good!'
      }
      break
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!form.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
      } else if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
      } else {
        successMessages.email = 'Valid email address!'
      }
      break
      
    case 'query':
      if (!form.query) {
        errors.query = 'Please select a query type'
        isValid = false
      } else {
        successMessages.query = 'Query type selected!'
      }
      break
      
    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required'
        isValid = false
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters'
        isValid = false
      } else if (form.message.length > 500) {
        errors.message = 'Message must be less than 500 characters'
        isValid = false
      } else {
        successMessages.message = 'Message looks great!'
      }
      break
  }
  
  return isValid
}

// Real-time input filtering for name field
const handleNameInput = (event) => {
  const value = event.target.value
  const filteredValue = value.replace(/[^a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s\-'\.]/g, '')
  
  if (value !== filteredValue) {
    form.name = filteredValue
    // Show a brief warning if invalid characters were filtered
    if (!errors.name) {
      errors.name = 'Only letters, spaces, hyphens, and apostrophes are allowed'
      setTimeout(() => {
        if (errors.name === 'Only letters, spaces, hyphens, and apostrophes are allowed') {
          errors.name = ''
        }
      }, 2000)
    }
  } else {
    form.name = value
  }
}

// Validation function for full form
const validateForm = () => {
  // Clear all previous states
  Object.keys(errors).forEach(key => {
    errors[key] = ''
    successMessages[key] = ''
  })

  let isValid = true
  
  // Validate all fields
  Object.keys(form).forEach(fieldName => {
    if (!validateField(fieldName)) {
      isValid = false
    }
  })

  return isValid
}

// Form submission handler with Formspree integration
const handleSubmit = async () => {
  hasSubmitted.value = true
  
  if (!validateForm()) {
    addNotification({
      type: 'error',
      title: 'Validation Error',
      message: 'Please correct the errors in the form and try again.',
      duration: 4000
    })
    return
  }

  // Check if Formspree endpoint is configured
  if (!FORMSPREE_ENDPOINT) {
    addNotification({
      type: 'error',
      title: 'Configuration Error',
      message: 'Contact form is not properly configured. Please try again later.',
      duration: 5000
    })
    
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('FORMSPREE_ENDPOINT is not configured in environment variables')
    }
    return
  }

  isLoading.value = true

  try {
    // Prepare form data for Formspree
    const formData = new FormData()
    formData.append('name', form.name.trim())
    formData.append('email', form.email.trim())
    formData.append('query', form.query)
    formData.append('message', form.message.trim())
    
    // Add additional metadata
    formData.append('_subject', `New contact form submission: ${form.query}`)
    formData.append('_replyto', form.email.trim())

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
      
      // Clear all states
      Object.keys(errors).forEach(key => {
        errors[key] = ''
        successMessages[key] = ''
      })
      
      // Reset submission state
      hasSubmitted.value = false
      
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
    
    // Only log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form submission error:', error)
    }
  } finally {
    isLoading.value = false
  }
}
</script>

