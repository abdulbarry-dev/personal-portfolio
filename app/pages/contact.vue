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
defineOptions({
  name: 'ContactPage'
})

// SEO
useSeoMeta({
  title: 'Contact - Abdulbarry',
  description: "Get in touch with Abdulbarry for collaboration opportunities, freelance work, or just to say hello. I'm always open to discussing new projects.",
})

// Page meta
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
@import './../assets/css/Contact.css';
</style>
