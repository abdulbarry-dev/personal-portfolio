<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <div class="mb-8">
        <h1 class="text-6xl font-bold text-gray-900 mb-4">500</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-2">Something went wrong</h2>
        <p class="text-gray-600">An unexpected error has occurred. Please try again later.</p>
      </div>
      
      <div class="space-y-4">
        <NuxtLink 
          to="/"
          class="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          Go Home
        </NuxtLink>
        
        <button 
          @click="$router.go(-1)"
          class="block w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:text-gray-900 transition-colors duration-200"
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