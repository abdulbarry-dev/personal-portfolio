<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-section">
        <h1 class="error-code" :class="errorClass">{{ error.statusCode || 500 }}</h1>
        <h2 class="error-title">{{ errorTitle }}</h2>
        <p class="error-description">{{ errorDescription }}</p>
      </div>
      
      <div class="error-actions">
        <NuxtLink 
          to="/"
          class="error-primary-button"
        >
          Go Home
        </NuxtLink>
        
        <button 
          @click="handleClearError"
          class="error-secondary-button"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from './composables/useSEO'

// Define props for error handling
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

// SEO composable
const { setPageMeta } = useSEO()

// Computed properties for dynamic error content
const errorClass = computed(() => {
  const statusCode = props.error.statusCode || 500
  return statusCode === 404 ? 'error-code-404' : 'error-code-500'
})

const errorTitle = computed(() => {
  const statusCode = props.error.statusCode || 500
  
  switch (statusCode) {
    case 404:
      return 'Page Not Found'
    case 500:
      return 'Internal Server Error'
    case 403:
      return 'Forbidden Access'
    case 400:
      return 'Bad Request'
    default:
      return 'Something Went Wrong'
  }
})

const errorDescription = computed(() => {
  const statusCode = props.error.statusCode || 500
  
  switch (statusCode) {
    case 404:
      return 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
    case 500:
      return 'An unexpected error has occurred on our servers. Please try again later.'
    case 403:
      return 'You do not have permission to access this resource.'
    case 400:
      return 'The request could not be understood by the server due to malformed syntax.'
    default:
      return 'An unexpected error has occurred. Please try again later.'
  }
})

// Handle clear error with better UX
const handleClearError = async () => {
  try {
    // Clear the error and navigate to home
    await clearError({ redirect: '/' })
  } catch (err) {
    // Fallback: force navigation to home
    await navigateTo('/', { replace: true })
  }
}

// Set dynamic SEO based on error type
setPageMeta({
  title: `Abdulbarry - ${errorTitle.value}`,
  description: errorDescription.value,
  robots: 'noindex, nofollow', // Don't index error pages
})

// Page options
defineOptions({ 
  name: 'ErrorPage'
})

// No layout for error page
definePageMeta({
  layout: false
})
</script>

<style scoped>
@import './assets/css/Error.css';
</style>
