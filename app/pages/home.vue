<template>
  <UserProfile />
</template>

<script setup>
// SEO and performance optimization
definePageMeta({
  title: 'Abdulbarry - Frontend Developer',
  description: 'Frontend Developer specializing in Vue.js, Nuxt.js, and TypeScript. Building fast, modern web applications.',
  prerender: true
})

// Performance: Critical resource hints
useHead({
  link: [
    {
      rel: 'preload',
      href: '/images/backgrounds/profile-picture.jpeg',
      as: 'image',
      type: 'image/jpeg'
    }
  ]
})
</script>

