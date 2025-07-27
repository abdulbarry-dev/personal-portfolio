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
  
  // Custom domain configuration (no baseURL needed)
  app: {
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
  
  // Tailwind CSS configuration
  css: ['~/assets/css/main.css'],
  
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
    url: 'http://abdulbarry.me',
    name: 'Abdulbarry Portfolio',
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