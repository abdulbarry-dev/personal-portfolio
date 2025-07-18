<!--
  Contact Page
  This page should contain:
  - Contact form with validation
  - Multiple contact methods (email, phone, social)
  - Office location or availability information
  - Response time expectations
  - FAQ section for common inquiries
  - Social media links
  - Professional availability status
  
  Contact Methods:
  - Contact form (primary)
  - Direct email link
  - Phone number (if applicable)
  - LinkedIn profile
  - Social media profiles
  - Calendar booking link (optional)
-->

<template>
  <div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        Contact
      </h1>
      <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        I'm always looking forward for new opportunities, and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
    </div>
    <ContactForm />
  </div>
</template>

<script setup>
defineOptions({
  name: 'ContactPage'
});
// Page logic will go here
// - Contact form handling
// - Form validation
// - Success/error states
// - SEO meta tags setup
// - Calendar integration (optional)
</script>
