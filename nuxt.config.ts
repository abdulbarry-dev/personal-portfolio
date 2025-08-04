export default defineNuxtConfig({
  // App configuration
  app: {
    baseURL: '/',
    buildAssetsDir: '_nuxt/',
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

  // PostCSS configuration
  postcss: {
    plugins: {
      // Only enable cssnano in production builds
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

  // CSS configuration
  css: [
    '~/app/assets/css/main.css'
  ],

  // Vite configuration
  vite: {
    resolve: {
      alias: {
        '@': '.',
        '~': '.',
        'assets': './app/assets'
      }
    }
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/eslint'
  ],

  // ESLint module configuration
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single'
      }
    }
  },

  // Content module configuration
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini']
    },
    markdown: {
      anchorLinks: false
    }
  },

  // SEO module configuration
  seo: {
    redirectToCanonicalSiteUrl: true
  },

  // Site configuration
  site: {
    url: process.env.NUXT_SITE_URL || 'https://abdulbarry.me',
    name: process.env.NUXT_SITE_NAME || 'Abdulbarry Personal Portfolio'
  },

  // Sitemap configuration
  sitemap: {
    hostname: process.env.NUXT_SITE_URL || 'https://abdulbarry.me',
    routes: [
      '/',
      '/about',
      '/contact',
      '/projects',
      '/blog'
    ]
  },

  // Runtime config
  runtimeConfig: {
    // Private keys (only available on server-side)
    // These are automatically prefixed with NUXT_
    
    // Public keys (exposed to client-side)
    public: {
      siteUrl: process.env.NUXT_SITE_URL || 'https://abdulbarry.me',
      siteName: process.env.NUXT_SITE_NAME || 'My Awesome Portfolio Website',
      formspreeEndpoint: process.env.NUXT_FORMSPREE_ENDPOINT || 'https://formspree.io/f/manbjooj',
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY
    }
  },

  // Compatibility settings
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  // SSR Settings
  ssr: true
})