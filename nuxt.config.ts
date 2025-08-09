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
        { name: 'format-detection', content: 'telephone=no' },
        
        // Theme colors for mobile browsers
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        
        // Open Graph meta tags
        { property: 'og:image', content: '/images/icons/android-chrome-512x512.png' },
        { name: 'twitter:image', content: '/images/icons/android-chrome-512x512.png' }
      ],
      link: [
        // Standard favicon
        { rel: 'icon', type: 'image/x-icon', href: '/images/icons/favicon.ico' },
        
        // PNG favicons for better quality
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/icons/favicon-32x32.png' },
        
        // Apple touch icons
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icons/apple-touch-icon.png' },
        
        // Android chrome icons
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/icons/android-chrome-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/images/icons/android-chrome-512x512.png' },
        
        // Web app manifest
        { rel: 'manifest', href: '/images/icons/site.webmanifest' }
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
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/eslint'
  ],

  // Image module configuration for Lighthouse optimization
  image: {
    // Use default providers without custom Uploadcare config
    // Quality settings
    quality: 85,
    // Format optimization
    format: ['webp', 'avif', 'png', 'jpg'],
    // Responsive images
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    // Performance optimizations
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          quality: 90,
          width: 48,
          height: 48
        }
      },
      profile: {
        modifiers: {
          format: 'webp',
          quality: 85,
          width: 320,
          height: 320
        }
      }
    }
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