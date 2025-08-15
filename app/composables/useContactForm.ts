import { z } from 'zod'

// Shared validation schema
const ContactSchema = z.object({
  name: z.string().min(2).max(50).regex(/^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s\-'\.]+$/),
  email: z.string().email().max(100),
  query: z.enum(['general', 'project', 'freelance', 'job', 'consultation', 'other']),
  message: z.string().min(10).max(500)
})

type ContactForm = z.infer<typeof ContactSchema>
type ContactFormState = {
  name: string
  email: string
  query: string
  message: string
}

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
    errors: {} as Record<keyof ContactFormState, string>,
    successMessages: {} as Record<keyof ContactFormState, string>
  })
  
  // Validation helpers
  const validateField = (field: keyof ContactFormState) => {
    try {
      // Skip validation for empty query field if not submitted yet
      if (field === 'query' && !state.hasSubmitted && !form.query) {
        state.errors[field] = ''
        state.successMessages[field] = ''
        return true
      }
      
      const result = ContactSchema.shape[field].safeParse(form[field])
      
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
  
  const getFieldClass = (field: keyof ContactFormState) => {
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
    const isValid = Object.keys(form).every(field => validateField(field as keyof ContactFormState))
    
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
      // Convert form state to validated ContactForm type
      const formData: ContactForm = {
        name: form.name,
        email: form.email,
        query: form.query as ContactForm['query'],
        message: form.message
      }
      
      await $fetch('/api/contact/send', { method: 'POST', body: formData })
      
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
      const message = error.statusCode === 429 
        ? 'Too many requests. Please try again in 15 minutes.'
        : error.statusMessage || 'An error occurred. Please try again.'
      
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
