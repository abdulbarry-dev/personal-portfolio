export default defineNuxtConfig({
  // SSG Configuration for GitHub Pages
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  // GitHub Pages deployment settings
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/personal-portfolio/' : '/',
    buildAssetsDir: 'assets/',
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Enhanced build configuration
  build: {
    transpile: ['@nuxt/icon']
  },

  // CSS Configuration
  css: ['~/assets/css/main.css'],

  // PostCSS configuration to prevent Tailwind crashes
  postcss: {
    plugins: {
      '@tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
      ...(process.env.NODE_ENV === 'production' && {
        'cssnano': {
          preset: ['default', {
            discardComments: { removeAll: true },
            normalizeWhitespace: false,
            colormin: false,
            minifySelectors: false
          }]
        }
      })
    }
  },

  // Vite configuration for GitHub Pages
  vite: {
    css: {
      postcss: {
        plugins: [
          require('@tailwindcss/nesting'),
          require('tailwindcss'),
          require('autoprefixer'),
          ...(process.env.NODE_ENV === 'production' ? [
            require('cssnano')({
              preset: ['default', {
                discardComments: { removeAll: true },
                normalizeWhitespace: false,
                colormin: false,
                minifySelectors: false
              }]
            })
          ] : [])
        ]
      }
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        external: [],
        output: {
          manualChunks: undefined
        }
      }
    }
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/sitemap'
  ],



  // Runtime config
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_SITE_URL || 'https://abdulbarry-dev.github.io',
      siteName: process.env.NUXT_SITE_NAME || 'Abdulbarry Portfolio',
      formspreeEndpoint: process.env.NUXT_FORMSPREE_ENDPOINT || ''
    }
  },

  // Compatibility settings
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  // SSG Settings
  ssr: false,
})