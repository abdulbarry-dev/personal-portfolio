export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Enable static site generation
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  
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
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxt/eslint', 
    '@nuxt/content', 
    '@nuxt/icon', 
    '@nuxtjs/seo'
  ],
  
  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  
  css: ['~/assets/css/main.css'],
  
  content: {
    highlight: {
      theme: 'github-light'
    },
    markdown: {
      sanitize: true
    }
  },
  
  site: {  
    url: 'https://abdulbarry.me',
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