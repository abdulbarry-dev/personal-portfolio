<template>
  <UserProfile />
</template>

<script setup>
// Enhanced SEO implementation
const { setPageMeta, setPersonStructuredData, setWebsiteStructuredData } = useSEO()
const { addNotification } = useNotifications()
const route = useRoute()

// Check if user was redirected from a 404 page
onMounted(() => {
  const fromPath = route.query.from
  if (fromPath && typeof fromPath === 'string') {
    addNotification({
      type: 'warning',
      title: 'Page Not Found',
      message: `The path "${fromPath}" does not exist. You've been redirected to the home page.`,
      duration: 6000
    })
    
    // Clean up the URL by removing the query parameter
    const router = useRouter()
    router.replace({ query: {} })
  }
})

// Set comprehensive SEO meta
setPageMeta({
  title: 'Abdulbarry - Profile',
  description: 'Frontend Developer specializing in Vue.js, Nuxt.js, and TypeScript. Building fast, modern, and accessible web applications with performance optimization in Tunisia.',
  keywords: 'Vue.js Developer, Nuxt.js Expert, TypeScript Developer, Frontend Developer Tunisia, JavaScript Developer, Web Performance, Modern Web Development, Freelance Developer',
  author: 'Abdulbarry Guenichi',
  ogTitle: 'Abdulbarry - Frontend Developer Profile',
  ogDescription: 'Passionate Frontend Developer creating exceptional web experiences with Vue.js, Nuxt.js, and TypeScript. Available for freelance projects.',
  ogImage: 'https://ucarecdn.com/110979a9-b932-4d48-a30d-989f1d2892b6/profilepicture.webp',
  ogType: 'profile',
  twitterTitle: 'Abdulbarry - Frontend Developer Profile',
  twitterDescription: 'Vue.js & Nuxt.js Expert building modern web applications',
  twitterImage: 'https://ucarecdn.com/110979a9-b932-4d48-a30d-989f1d2892b6/profilepicture.webp'
})

// Add structured data for person and website
setPersonStructuredData()
setWebsiteStructuredData()

// Page meta configuration
definePageMeta({
  title: 'Abdulbarry - Profile',
  description: 'Frontend Developer specializing in Vue.js, Nuxt.js, and TypeScript. Building fast, modern, and accessible web applications with performance optimization.',
  prerender: true,
  index: true,
  sitemap: {
    priority: 1.0,
    changefreq: 'monthly'
  }
})

// Performance: Critical resource optimization
useHead({
  link: [
    {
      rel: 'preload',
      href: 'https://ucarecdn.com/110979a9-b932-4d48-a30d-989f1d2892b6/profilepicture.webp',
      as: 'image',
      type: 'image/webp',
      crossorigin: ''
    },
    {
      rel: 'prefetch',
      href: 'https://ucarecdn.com/49e424aa-077b-43e8-8fff-91cf492c2c2f/profilepicture.jpeg',
      as: 'image',
      type: 'image/jpeg'
    }
  ]
})
</script>

