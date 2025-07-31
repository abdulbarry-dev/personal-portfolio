export default defineEventHandler(async (event) => {
  // Get the site URL from runtime config
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://abdulbarry.me'
  
  // Static routes
  const staticRoutes = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/projects', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' }
  ]
  
  // Blog routes
  const blogRoutes = [
    { url: '/blog/building-personal-portfolio', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/first-personal-blog', priority: '0.6', changefreq: 'monthly' },
    { url: '/blog/understanding-nuxt', priority: '0.6', changefreq: 'monthly' }
  ]
  
  // Combine all routes
  const allRoutes = [...staticRoutes, ...blogRoutes]
  
  // Current timestamp
  const currentDate = new Date().toISOString()
  
  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${siteUrl}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  // Set appropriate headers
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'max-age=3600') // Cache for 1 hour
  
  return sitemap
})
