<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-section">
        <h1 class="error-code error-code-404">404</h1>
        <h2 class="error-title">Page Not Found</h2>
        <p class="error-description">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <p class="error-path">
          Requested path: <code>{{ $route.path }}</code>
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
          @click="$router.go(-1)"
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

// Get current route for debugging
const route = useRoute()

// Set 404 status code
setResponseStatus(404)

// SEO for 404 page
setPageMeta({
  title: 'Abdulbarry - Page Not Found',
  description: 'The page you are looking for could not be found. Please check the URL or navigate back to our homepage.',
  robots: 'noindex, nofollow' // Don't index 404 pages
})

// Page options
defineOptions({ 
  name: 'NotFoundPage'
})

// No layout for 404 page
definePageMeta({
  layout: false
})
</script>

<style scoped>
@import '../assets/css/Error.css';

.error-path {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: var(--text-muted, #6b7280);
}

.error-path code {
  background: var(--bg-secondary, #f3f4f6);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
}
</style>
