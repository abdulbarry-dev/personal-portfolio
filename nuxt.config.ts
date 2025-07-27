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
      sanitize: true
    }
  },
  
  site: {  
    url: process.env.NUXT_SITE_URL,
    name: process.env.NUXT_SITE_NAME,
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