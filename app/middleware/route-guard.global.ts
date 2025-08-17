export default defineNuxtRouteMiddleware((to) => {
  // List of valid routes (can be automated based on your pages)
  const validRoutes = [
    '/',
    '/home',
    '/projects',
    '/contact',
    '/blog',
    '/error'
  ]

  // Check for valid dynamic routes
  const validDynamicRoutes = [
    /^\/blog\/[a-zA-Z0-9\-]+$/, // Blog posts: /blog/post-slug
  ]

  // Helper function to normalize paths (remove trailing slashes)
  const normalizePath = (path: string): string => {
    if (path === '/') return path // Keep root as is
    return path.replace(/\/$/, '') // Remove trailing slash for all other paths
  }

  // Helper function to check if route is valid
  const isValidRoute = (path: string): boolean => {
    const normalizedPath = normalizePath(path)
    
    // Check exact matches
    if (validRoutes.includes(normalizedPath)) {
      return true
    }

    // Check dynamic route patterns
    if (validDynamicRoutes.some(pattern => pattern.test(normalizedPath))) {
      return true
    }

    return false
  }

  // Handle trailing slash redirects
  if (to.path !== '/' && to.path.endsWith('/')) {
    const cleanPath = normalizePath(to.path)
    
    // Only redirect if the clean path is a valid route
    if (isValidRoute(cleanPath)) {
      return navigateTo(cleanPath, { redirectCode: 301 })
    }
  }

  // Check if the route exists (after normalization)
  if (!isValidRoute(to.path)) {
    // On client side, check if we came from GitHub Pages redirect
    if (process.client) {
      // Clear any stored redirect to prevent loops
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.removeItem('redirect')
      }
    }
    
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
})
