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
          <p v-if="state.errors.name" class="error-message">{{ state.errors.name }}</p>
          <p v-if="state.successMessages.name" class="success-message">{{ state.successMessages.name }}</p>
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
          <p v-if="state.errors.email" class="error-message">{{ state.errors.email }}</p>
          <p v-if="state.successMessages.email" class="success-message">{{ state.successMessages.email }}</p>
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
        <p v-if="state.errors.query" class="error-message">{{ state.errors.query }}</p>
        <p v-if="state.successMessages.query" class="success-message">{{ state.successMessages.query }}</p>
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
        <p v-if="state.errors.message" class="error-message">{{ state.errors.message }}</p>
        <p v-if="state.successMessages.message" class="success-message">{{ state.successMessages.message }}</p>
        <p class="helper-text">{{ form.message.length }}/500 characters</p>
      </div>

      <!-- Submit Button -->
      <div class="submit-section">
        <button
          type="submit"
          :disabled="state.isLoading"
          class="submit-button"
        >
          <Icon 
            v-if="state.isLoading" 
            name="svg-spinners:8-dots-rotate" 
            class="button-icon" 
          />
          {{ state.isLoading ? 'Sending...' : 'Send message' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
@import './../assets/css/ContactForm.css';
</style>

<script setup>
// Enhanced ContactForm component with separated API logic
const { setStructuredData } = useSEO()

defineOptions({
  name: 'ContactForm'
})

// Use the contact form composable
const {
  form,
  state,
  getFieldClass,
  validateField,
  handleNameInput,
  submitForm
} = useContactForm()

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

// Form submission handler
const handleSubmit = async () => {
  await submitForm()
}
</script>

