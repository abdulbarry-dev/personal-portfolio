// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/content', '@nuxt/eslint', '@nuxtjs/tailwindcss', '@nuxt/icon'],

  // IMPORTANT: Content module configuration
  content: {
    // Highlight configuration for code blocks
    highlight: {
      theme: 'github-dark',
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    // Markdown configuration
    markdown: {
      anchorLinks: false
    }
  },
  
  // Auto-import configuration
  imports: {
    autoImport: true
  },
  
  // Ensure components are auto-imported
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  
  // Enable CSS processing
  css: ['~/assets/css/main.css'],

  // Configure layouts
  app: {
    head: {
      title: 'Abdulbarry - Frontend Developer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal portfolio of Abdulbarry, Frontend Developer based in Tunisia' }
      ]
    }
  }
})