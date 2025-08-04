<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-section">
        <h1 class="error-code error-code-500">500</h1>
        <h2 class="error-title">Something went wrong</h2>
        <p class="error-description">An unexpected error has occurred. Please try again later.</p>
      </div>
      
      <div class="error-actions">
        <NuxtLink 
          to="/home"
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
defineOptions({ 
  name: 'ErrorPage'
})

definePageMeta({
  layout: false // Don't use any layout for error page
})
</script>

<style scoped>
@import './../assets/css/error.css';
</style>