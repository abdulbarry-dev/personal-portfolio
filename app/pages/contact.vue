<template>
  <div class="contact-container">
    <div class="contact-header">
      <h1 class="contact-title">
        Contact
      </h1>
      <p class="contact-description">
        I'm always looking forward for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
    </div>
    
    <div class="contact-form-wrapper">
      <ContactForm />
    </div>
  </div>
</template>

<script setup>
// Enhanced SEO for contact page with performance optimizations
const { setPageMeta, setBreadcrumbs, setStructuredData } = useSEO()

defineOptions({
  name: 'ContactPage'
})

// Set comprehensive SEO meta with computed values for better performance
const seoMeta = {
  title: 'Abdulbarry - Contact',
  description: 'Get in touch with Abdulbarry for collaboration opportunities, freelance Vue.js projects, or consulting. Available for frontend development work worldwide.',
  keywords: 'Contact Frontend Developer, Hire Vue.js Developer, Freelance Web Developer, Frontend Consulting, Web Development Services Tunisia',
  ogTitle: 'Abdulbarry - Contact Me',
  ogDescription: 'Ready to collaborate on your next Vue.js project? Let\'s discuss how I can help bring your ideas to life.',
  ogImage: '/images/contact-og.jpg',
  ogType: 'website'
}

// Set SEO meta data
setPageMeta(seoMeta)

// Set breadcrumbs
const breadcrumbs = [
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' }
]
setBreadcrumbs(breadcrumbs)

// Structured data for contact page
const contactStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Abdulbarry',
  description: 'Get in touch for collaboration opportunities and freelance work',
  mainEntity: {
    '@type': 'Person',
    name: 'Abdulbarry Guenichi',
    jobTitle: 'Frontend Developer',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Professional',
      availableLanguage: ['English', 'French', 'Arabic']
    }
  }
}

// Set structured data once on mount for better performance
onMounted(() => {
  setStructuredData(contactStructuredData)
})

// Page meta with preload hints for better performance
definePageMeta({
  layout: 'default',
  // Preload critical resources
  head: {
    link: [
      {
        rel: 'preload',
        href: '/api/contact/send',
        as: 'fetch',
        crossorigin: 'anonymous'
      }
    ]
  }
})
</script>

<style scoped>
@import './../assets/css/Contact.css';
</style>
