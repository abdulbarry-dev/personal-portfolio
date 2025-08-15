export default defineNuxtPlugin(() => {
  // Handle global client-side errors
  if (process.client) {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      // Navigate to error page for critical errors
      if (event.reason?.statusCode && event.reason.statusCode >= 400) {
        navigateTo('/error', { replace: true })
      }
    })

    // Handle general JavaScript errors
    window.addEventListener('error', (event) => {
      // Only navigate to error page for critical errors
      if (event.error?.name === 'ChunkLoadError' || event.error?.message?.includes('Loading chunk')) {
        // Handle chunk loading errors (usually from deployments)
        window.location.reload()
      }
    })
  }
})
