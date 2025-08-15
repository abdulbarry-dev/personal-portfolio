export default defineNitroPlugin((nitroApp) => {
  // Handle server-side errors
  nitroApp.hooks.hook('error', async (error: any, { event }: any) => {
    // Don't handle client-side hydration errors
    if (error.statusCode === 500 && error.message?.includes('hydration')) {
      return
    }

    // Set appropriate status codes
    if (!error.statusCode) {
      error.statusCode = 500
    }

    // Enhance error with additional context
    error.data = {
      ...error.data,
      timestamp: new Date().toISOString(),
      url: event?.node?.req?.url,
      userAgent: event?.node?.req?.headers?.['user-agent']
    }
  })

  // Handle request errors
  nitroApp.hooks.hook('request', async (event: any) => {
    // Add custom 404 handling for API routes
    if (event.node.req.url?.startsWith('/api/') && !event.node.req.url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
      const route = event.node.req.url
      
      // Check if it's a valid API route
      const validApiRoutes = ['/api/github/repos', '/api/newsletter/subscribe', '/api/contact/send', '/api/sitemap.xml']
      const isValidRoute = validApiRoutes.some(validRoute => route.startsWith(validRoute))
      
      if (!isValidRoute) {
        setResponseStatus(event, 404)
        setHeaders(event, {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Robots-Tag': 'noindex, nofollow'
        })
      }
    }
  })
})
