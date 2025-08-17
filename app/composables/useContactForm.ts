import { 
  ContactSchema, 
  ContactFieldSchema,
  type ContactForm, 
  type ContactFormState, 
  type ContactFormField 
} from '../schemas/contact'

export const useContactForm = () => {
  const { addNotification } = useNotifications()
  
  // Form state
  const form = reactive<ContactFormState>({
    name: '',
    email: '',
    query: '',
    message: ''
  })
  
  const state = reactive({
    isLoading: false,
    hasSubmitted: false,
    errors: {} as Record<ContactFormField, string>,
    successMessages: {} as Record<ContactFormField, string>
  })
  
  // Validation helpers
  const validateField = (field: ContactFormField) => {
    try {
      // Skip validation for empty query field if not submitted yet
      if (field === 'query' && !state.hasSubmitted && !form.query) {
        state.errors[field] = ''
        state.successMessages[field] = ''
        return true
      }
      
      const result = ContactFieldSchema[field].safeParse(form[field])
      
      if (result.success) {
        state.errors[field] = ''
        state.successMessages[field] = state.hasSubmitted ? '✓' : ''
        return true
      } else {
        state.errors[field] = result.error.errors[0]?.message || 'Invalid input'
        state.successMessages[field] = ''
        return false
      }
    } catch (error) {
      state.errors[field] = 'Validation error'
      state.successMessages[field] = ''
      return false
    }
  }
  
  const getFieldClass = (field: ContactFormField) => {
    if (state.errors[field]) return 'error'
    if (state.successMessages[field]) return 'success'
    return ''
  }
  
  const handleNameInput = (event: Event) => {
    const input = event.target as HTMLInputElement
    const filtered = input.value.replace(/[^a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s\-'\.]/g, '')
    if (input.value !== filtered) {
      form.name = filtered
      input.value = filtered
    }
  }
  
  const submitForm = async () => {
    state.hasSubmitted = true
    
    // Validate all fields
    const isValid = Object.keys(form).every(field => validateField(field as ContactFormField))
    
    if (!isValid) {
      addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please correct the errors and try again.',
        duration: 4000
      })
      return false
    }
    
    state.isLoading = true
    
    try {
      // Get runtime config for Formspree endpoint
      const { formspreeEndpoint } = useRuntimeConfig().public
      
      if (!formspreeEndpoint) {
        throw new Error('Email service not configured')
      }
      
      // Convert form state to validated ContactForm type
      const formData: ContactForm = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        query: form.query as ContactForm['query'],
        message: form.message.trim()
      }
      
      // Validate the form data with Zod
      const validatedData = ContactSchema.parse(formData)
      
      // Create FormData for Formspree submission
      const submitData = new FormData()
      submitData.append('name', validatedData.name)
      submitData.append('email', validatedData.email)
      submitData.append('query', validatedData.query)
      submitData.append('message', validatedData.message)
      submitData.append('_subject', `Contact: ${validatedData.query}`)
      submitData.append('_replyto', validatedData.email)
      
      // Submit directly to Formspree
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: submitData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || 'Failed to send message')
      }
      
      addNotification({
        type: 'success',
        title: 'Message Sent! 🎉',
        message: "Thank you! I'll get back to you soon.",
        duration: 6000
      })
      
      // Reset form
      Object.assign(form, { name: '', email: '', query: '', message: '' })
      Object.assign(state, { hasSubmitted: false, errors: {}, successMessages: {} })
      
      return true
    } catch (error: any) {
      console.error('Contact form submission error:', error)
      
      let message = 'An error occurred. Please try again.'
      
      // Handle different error types
      if (error.message?.includes('not configured')) {
        message = 'Email service is not configured. Please try again later.'
      } else if (error.message?.includes('Failed to send')) {
        message = error.message
      } else if (error.name === 'ZodError') {
        message = 'Please check your input and try again.'
      }
      
      addNotification({
        type: 'error',
        title: 'Failed to Send',
        message,
        duration: 5000
      })
      
      return false
    } finally {
      state.isLoading = false
    }
  }
  
  return {
    form,
    state,
    validateField,
    getFieldClass,
    handleNameInput,
    submitForm
  }
}
