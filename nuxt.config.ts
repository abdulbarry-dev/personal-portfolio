// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Enable static site generation
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  
  // GitHub Pages configuration
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/personal-portfolio/' : '/',
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
    '@nuxtjs/sitemap',
    '@nuxt/eslint', 
    '@nuxt/content', 
    '@nuxtjs/tailwindcss', 
    '@nuxt/icon', 
    '@nuxtjs/seo'
  ],
  
  // Content module configuration
  content: {
    highlight: {
      theme: 'github-light'
    },
    markdown: {
      // Ensure safe rendering
      sanitize: true
    }
  },
  
  site: {  
    url: process.env.NUXT_SITE_URL || 'https://yourusername.github.io/personal-portfolio',
    name: process.env.NUXT_SITE_NAME || 'Abdulbarry Portfolio',
  },
  
  imports: {
    autoImport: true
  },
  
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  
  css: ['~/assets/css/main.css']
})