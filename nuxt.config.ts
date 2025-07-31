export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Runtime configuration for environment variables
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
      siteUrl: process.env.NUXT_SITE_URL || 'https://abdulbarry.me'
    }
  },
  
  // Enable static site generation
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
      crawlLinks: true
    }
  },
  
  // Static Site Generation settings
  ssr: true,
  target: 'static',
  
  app: {
    baseURL: '/',
    head: {
      title: 'Abdulbarry - Frontend Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal portfolio of Abdulbarry, Frontend Developer based in Tunisia' }
      ]
    }
  },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content', 
    '@nuxt/icon', 
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/eslint'
  ],
  
  // Explicit Tailwind configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js'
  },
  
  // PostCSS configuration for better CSS processing
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  // Site configuration for SEO and Sitemap
  site: {  
    url: 'https://abdulbarry.me',
    name: 'Abdulbarry Portfolio',
    description: 'Personal portfolio of Abdulbarry, Frontend Developer based in Tunisia',
    defaultLocale: 'en'
  },
  
  // Sitemap configuration
  sitemap: {
    sources: [
      // Define static routes
      '/',
      '/about',
      '/contact',
      '/projects',
      '/blog',
      '/blog/building-personal-portfolio',
      '/blog/first-personal-blog',
      '/blog/understanding-nuxt'
    ]
  },
  
  // SEO configuration
  seo: {
    redirectToCanonicalSiteUrl: true
  },
  
  imports: {
    autoImport: true
  },
  
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ]
})