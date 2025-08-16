<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-section">
        <h1 class="error-code error-code-404">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-description">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
      </div>
      
      <div class="error-actions">
        <NuxtLink 
          to="/"
          class="error-primary-button"
        >
          Go Home
        </NuxtLink>
        
        <button 
          @click="handleGoBack"
          class="error-secondary-button"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from '../composables/useSEO'

// SEO composable
const { setPageMeta } = useSEO()

// Enhanced navigation handlers
const handleGoBack = () => {
  if (process.client && window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/', { replace: true })
  }
}

// SEO for error page
setPageMeta({
  title: 'Abdulbarry - Page Not Found',
  description: 'The page you are looking for does not exist. Please check the URL or navigate back to the homepage.',
  robots: 'noindex, nofollow'
})

defineOptions({ 
  name: 'ErrorPage'
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
@import './../assets/css/Error.css';

.error-tertiary-button {
  background: transparent;
  color: var(--text-muted, #6b7280);
  border: 1px solid var(--border, #d1d5db);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.error-tertiary-button:hover {
  background: var(--bg-secondary, #f3f4f6);
  border-color: var(--primary, #3b82f6);
}
</style>