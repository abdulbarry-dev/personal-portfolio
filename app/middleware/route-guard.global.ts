export default defineNuxtRouteMiddleware((to) => {
  // List of valid routes (can be automated based on your pages)
  const validRoutes = [
    '/',
    '/home',
    '/projects',
    '/contact',
    '/blog',
    '/privacy-policy'
  ]

  // Check for valid dynamic routes
  const validDynamicRoutes = [
    /^\/blog\/[a-zA-Z0-9\-]+$/, // Blog posts: /blog/post-slug
  ]

  // Helper function to check if route is valid
  const isValidRoute = (path: string): boolean => {
    // Check exact matches
    if (validRoutes.includes(path)) {
      return true
    }

    // Check dynamic route patterns
    if (validDynamicRoutes.some(pattern => pattern.test(path))) {
      return true
    }

    return false
  }

  // Only run on client-side navigation
  if (process.client) {
    // Check if the route exists
    if (!isValidRoute(to.path)) {
      // Throw a 404 error which will be caught by error.vue
      throw createError({
        statusCode: 404,
        statusMessage: `Page not found: ${to.path}`,
        data: {
          path: to.path,
          timestamp: new Date().toISOString()
        }
      })
    }
  }
})
