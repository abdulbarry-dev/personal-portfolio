<template>
  <UserProfile />
</template>

<script setup>
// SEO and performance optimization
definePageMeta({
  title: 'Abdulbarry Guenichi - Frontend Developer | Vue.js & Nuxt.js Expert',
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
  ],
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover'
    },
    {
      name: 'theme-color',
      content: '#1f2937'
    },
    {
      name: 'color-scheme',
      content: 'dark light'
    }
  ]
})
</script>

