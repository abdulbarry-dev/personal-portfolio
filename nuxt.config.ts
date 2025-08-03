import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  // SSG Configuration for GitHub Pages
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  // GitHub Pages deployment settings
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/' : '/',
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

  // PostCSS configuration
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

  // Vite configuration to handle custom paths
  vite: {
    plugins: [tsconfigPaths()],
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
    '@nuxtjs/tailwindcss',
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
    url: 'https://abdulbarry.me',
    name: 'Abdulbarry Personal Portfolio'
  },

  // Sitemap configuration
  sitemap: {
    hostname: 'https://abdulbarry.me',
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
    public: {
      siteUrl: process.env.NUXT_SITE_URL || 'https://abdulbarry.me',
      siteName: process.env.NUXT_SITE_NAME || 'Abdulbarry Personal Portfolio',
      formspreeEndpoint: process.env.NUXT_FORMSPREE_ENDPOINT || ''
    }
  },

  // Compatibility settings
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  
  // SSG Settings
  ssr: true
})