export default defineNuxtPlugin(() => {
  // Handle global client-side errors (only run after hydration)
  if (process.client) {
    // Wait for hydration to complete before setting up error handlers
    onMounted(() => {
      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        console.warn('Unhandled promise rejection:', event.reason)
        // Only navigate for critical errors, not during prerendering
        if (event.reason?.statusCode && event.reason.statusCode >= 500) {
          // Use error.vue instead of pages/error.vue for app-level errors
          throw createError({
            statusCode: event.reason.statusCode,
            statusMessage: 'Application Error'
          })
        }
      })

      // Handle general JavaScript errors
      window.addEventListener('error', (event) => {
        // Handle chunk loading errors (usually from deployments)
        if (event.error?.name === 'ChunkLoadError' || event.error?.message?.includes('Loading chunk')) {
          console.warn('Chunk loading error detected, reloading page')
          window.location.reload()
        }
      })
    })
  }
})
