interface SEOMeta {
  title?: string
  description?: string
  keywords?: string
  author?: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
}

interface OpenGraphMeta {
  title: string
  description: string
  image: string
  type?: string
  url?: string
  siteName?: string
}

interface TwitterCardMeta {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player'
  title: string
  description: string
  image: string
  creator?: string
  site?: string
}

interface StructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

// Site-wide defaults
const DEFAULT_SEO = {
  siteName: 'Abdulbarry Guenichi - Frontend Developer',
  author: 'Abdulbarry Guenichi',
  creator: '@abdulbarry_dev',
  site: '@abdulbarry_dev',
  siteUrl: 'https://abdulbarry.dev',
  defaultImage: '/images/og-default.jpg',
  defaultDescription: 'Frontend Developer specializing in Vue.js, Nuxt.js, and TypeScript. Building fast, modern, and accessible web applications.',
  keywords: 'Vue.js, Nuxt.js, TypeScript, Frontend Developer, Web Development, JavaScript, CSS, HTML, React, Performance Optimization'
} as const

export function useSEO() {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  // Get current URL
  const getCurrentUrl = () => {
    const baseUrl = runtimeConfig.public.siteUrl || DEFAULT_SEO.siteUrl
    return `${baseUrl}${route.path}`
  }

  // Set basic page meta tags
  const setPageMeta = (meta: SEOMeta) => {
    const title = meta.title || DEFAULT_SEO.siteName
    const description = meta.description || DEFAULT_SEO.defaultDescription
    const canonical = meta.canonical || getCurrentUrl()
    const keywords = meta.keywords || DEFAULT_SEO.keywords
    const author = meta.author || DEFAULT_SEO.author

    useSeoMeta({
      title,
      description,
      keywords,
      author,
      robots: 'index,follow',
      
      // Open Graph (fallback if not set explicitly)
      ogTitle: meta.ogTitle || title,
      ogDescription: meta.ogDescription || description,
      ogImage: meta.ogImage || DEFAULT_SEO.defaultImage,
      ogType: (meta.ogType as any) || 'website',
      ogUrl: canonical,
      ogSiteName: DEFAULT_SEO.siteName,
      ogLocale: 'en_US',
      
      // Twitter Card (fallback if not set explicitly)
      twitterCard: 'summary_large_image',
      twitterTitle: meta.twitterTitle || title,
      twitterDescription: meta.twitterDescription || description,
      twitterImage: meta.twitterImage || meta.ogImage || DEFAULT_SEO.defaultImage,
      twitterCreator: DEFAULT_SEO.creator,
      twitterSite: DEFAULT_SEO.site
    })

    // Additional head meta
    useHead({
      link: [
        { rel: 'canonical', href: canonical },
        { rel: 'alternate', type: 'application/rss+xml', title: `${DEFAULT_SEO.siteName} - Blog`, href: '/rss.xml' }
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#1f2937' },
        { name: 'color-scheme', content: 'dark light' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'googlebot', content: 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1' }
      ]
    })
  }

  // Set Open Graph specific tags
  const setOpenGraph = (og: OpenGraphMeta) => {
    const url = og.url || getCurrentUrl()
    
    useSeoMeta({
      ogTitle: og.title,
      ogDescription: og.description,
      ogImage: og.image,
      ogType: (og.type as any) || 'website',
      ogUrl: url,
      ogSiteName: og.siteName || DEFAULT_SEO.siteName,
      ogLocale: 'en_US'
    })

    // Add structured Open Graph images
    if (og.image) {
      useHead({
        meta: [
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'og:image:type', content: 'image/jpeg' },
          { property: 'og:image:alt', content: og.title }
        ]
      })
    }
  }

  // Set Twitter Card specific tags
  const setTwitterCard = (twitter: TwitterCardMeta) => {
    useSeoMeta({
      twitterCard: twitter.card || 'summary_large_image',
      twitterTitle: twitter.title,
      twitterDescription: twitter.description,
      twitterImage: twitter.image,
      twitterCreator: twitter.creator || DEFAULT_SEO.creator,
      twitterSite: twitter.site || DEFAULT_SEO.site
    })

    // Add Twitter specific meta
    useHead({
      meta: [
        { name: 'twitter:image:alt', content: twitter.title }
      ]
    })
  }

  // Set JSON-LD structured data
  const setStructuredData = (data: StructuredData | StructuredData[]) => {
    const structuredData = Array.isArray(data) ? data : [data]
    
    useHead({
      script: structuredData.map(item => ({
        type: 'application/ld+json',
        innerHTML: JSON.stringify(item)
      }))
    })
  }

  // Generate breadcrumb structured data
  const setBreadcrumbs = (breadcrumbs: Array<{ name: string; url: string }>) => {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${DEFAULT_SEO.siteUrl}${crumb.url}`
      }))
    }

    setStructuredData(breadcrumbData)
  }

  // Generate article structured data
  const setArticleStructuredData = (article: {
    title: string
    description: string
    datePublished: string
    dateModified?: string
    image?: string
    author?: string
    url?: string
  }) => {
    const articleData: any = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      author: {
        '@type': 'Person',
        name: article.author || DEFAULT_SEO.author,
        url: DEFAULT_SEO.siteUrl
      },
      publisher: {
        '@type': 'Person',
        name: DEFAULT_SEO.author,
        url: DEFAULT_SEO.siteUrl
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': article.url || getCurrentUrl()
      }
    }

    if (article.image) {
      articleData.image = {
        '@type': 'ImageObject',
        url: article.image,
        width: 1200,
        height: 630
      }
    }

    setStructuredData(articleData)
  }

  // Generate person/author structured data
  const setPersonStructuredData = () => {
    const personData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: DEFAULT_SEO.author,
      jobTitle: 'Frontend Developer',
      url: DEFAULT_SEO.siteUrl,
      sameAs: [
        'https://github.com/abdulbarry-dev',
        'https://linkedin.com/in/abdulbarry-guenichi',
        'https://twitter.com/abdulbarry_dev'
      ],
      knowsAbout: [
        'Vue.js',
        'Nuxt.js',
        'TypeScript',
        'JavaScript',
        'Frontend Development',
        'Web Performance',
        'User Experience'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Freelance'
      }
    }

    setStructuredData(personData)
  }

  // Generate website structured data
  const setWebsiteStructuredData = () => {
    const websiteData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: DEFAULT_SEO.siteName,
      url: DEFAULT_SEO.siteUrl,
      description: DEFAULT_SEO.defaultDescription,
      author: {
        '@type': 'Person',
        name: DEFAULT_SEO.author
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${DEFAULT_SEO.siteUrl}/blog?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }

    setStructuredData(websiteData)
  }

  return {
    setPageMeta,
    setOpenGraph,
    setTwitterCard,
    setStructuredData,
    setBreadcrumbs,
    setArticleStructuredData,
    setPersonStructuredData,
    setWebsiteStructuredData,
    getCurrentUrl,
    DEFAULT_SEO
  }
}