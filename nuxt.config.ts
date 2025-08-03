import tsconfigPaths from 'vite-tsconfig-paths'

export default defineNuxtConfig({
  // Vercel deployment configuration
  nitro: {
    preset: 'vercel',
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  // App configuration for Vercel
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

  // PostCSS configuration - More conservative approach
  postcss: {
    plugins: {
      '@tailwindcss/nesting': {},
      'tailwindcss': {},
      'autoprefixer': {},
      // Only enable cssnano in actual production builds
      ...(process.env.VERCEL_ENV === 'production' && {
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

  // Vite configuration
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

  // TailwindCSS configuration - Ensure it works in all environments
  tailwindcss: {
    cssPath: '~/app/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    viewer: true
  },

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