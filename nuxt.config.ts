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
  { rel: 'manifest', href: '/images/icons/site.webmanifest' },

  // Performance: preconnect and DNS prefetch for external origins
  { rel: 'preconnect', href: 'https://ucarecdn.com', crossorigin: '' },
  { rel: 'dns-prefetch', href: '//ucarecdn.com' },
  { rel: 'preconnect', href: 'https://api.github.com', crossorigin: '' },
  { rel: 'dns-prefetch', href: '//api.github.com' },
  { rel: 'preconnect', href: 'https://supabase.co', crossorigin: '' },
  { rel: 'dns-prefetch', href: '//supabase.co' }
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
    },
    define: {
      __VUE_PROD_DEVTOOLS__: false
    },
    build: {
      sourcemap: process.env.NODE_ENV === 'development'
    }
  },

  // Modules
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxt/eslint',
    '@vite-pwa/nuxt'
  ],

  // PWA Configuration
  pwa: {
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    strategies: 'generateSW',
    manifest: {
      name: process.env.NUXT_SITE_NAME || 'Abdulbarry Personal Portfolio',
      short_name: 'ABD Portfolio',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      theme_color: '#0b1221',
      background_color: '#0b1221',
      icons: [
        { src: '/images/logos/AGS-logo-v1.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
        { src: '/images/logos/AGS-logo-v1.png', sizes: '512x512', type: 'image/png', purpose: 'any' }
      ]
    },
    workbox: {
      navigateFallback: '/200.html',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,txt,woff2}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/ucarecdn\.com\/.*\.(?:png|jpe?g|webp|avif|gif|svg)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'ucarecdn-images',
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 200, maxAgeSeconds: 31536000 }
          }
        },
        {
          urlPattern: /\.(?:png|jpe?g|webp|gif|svg|ico)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'local-images',
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 200, maxAgeSeconds: 31536000 }
          }
        },
        {
          urlPattern: /^https:\/\/api\.github\.com\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'github-api',
            networkTimeoutSeconds: 8, // Match composable timeout
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 100, maxAgeSeconds: 300 }
          }
        },
        {
          urlPattern: /^https:\/\/.*supabase\.co\/.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'supabase-api',
            networkTimeoutSeconds: 5,
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 100, maxAgeSeconds: 300 }
          }
        },
        {
          urlPattern: /\.(?:js|css)$/i,
          handler: 'StaleWhileRevalidate',
          options: { cacheName: 'assets', cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: /\/(?:home|projects|contact|blog)(?:\/.*)?$/,
          handler: 'NetworkFirst',
          options: { cacheName: 'pages', cacheableResponse: { statuses: [0, 200] } }
        }
      ]
    }
  },

  // Nuxt Icon configuration: use local collections to prevent prerender timeouts
  icon: {
    // Avoid fetching from Iconify during build/prerender
    fallbackToApi: false,
    serverBundle: {
      // Bundle only the collections we use
      collections: ['heroicons', 'mdi', 'logos'],
      // Keep JSON external to speed bundling (Node 20+ supports JSON imports)
      externalizeIconsJson: true
    },
    clientBundle: {
      // Include statically used icons in client to reduce runtime fetches
      scan: true,
      includeCustomCollections: true,
      // Generous limit to avoid failing builds
      sizeLimitKb: 512
    }
  },

  // Nitro server configuration for faster first response
  nitro: {
    // Generate brotli/gzip versions of public assets (used when running a Nitro server)
    compressPublicAssets: true,
    // GitHub Pages specific configuration
    output: {
      publicDir: 'dist'
    },
    prerender: {
      // Ensure key routes are statically generated and crawl linked pages
      routes: ['/', '/home', '/contact', '/projects', '/blog'],
      crawlLinks: true
    }
  },

  // Route rules for caching, prerendering and headers (applies in Nitro environments)
  routeRules: {
  '/': { prerender: true },
  '/home': { prerender: true },
    '/contact': { prerender: true },
    '/projects': { prerender: true },
    '/blog': { prerender: true },
    // Error pages
    '/error': { headers: { 'X-Robots-Tag': 'noindex, nofollow' } },
    // Static assets
    '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    // Handle DevTools files
    '/installHook.js.map': { redirect: { to: '/', statusCode: 302 } },
    '/hook.js.map': { redirect: { to: '/', statusCode: 302 } },
    // Default caching for all other routes
    '/**': { headers: { 'cache-control': 'public, max-age=600, s-maxage=86400, stale-while-revalidate=604800' } }
  },

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

  // Content module configuration (use defaults for compatibility)
  // content: {},

  // SEO module configuration
  seo: {
    // Avoid unexpected extra redirects in non-prod environments
    redirectToCanonicalSiteUrl: process.env.NODE_ENV === 'production'
  },


  // Site configuration
  site: {
    url: process.env.NUXT_SITE_URL || 'https://abdulbarry.me',
    name: process.env.NUXT_SITE_NAME || 'Abdulbarry Personal Portfolio'
  },

  // Sitemap configuration (use defaults; site.url is defined above)
  // sitemap: {},

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
  devtools: { 
    enabled: process.env.NODE_ENV === 'development',
    timeline: {
      enabled: true
    }
  },
  
  // SSR Settings
  ssr: true
})