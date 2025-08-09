<template>
  <footer class="app-footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-grid">
          
          <!-- Profile Section -->
          <div class="footer-profile-section">
            <div class="footer-profile-header">
              <img 
                :src="profileData.avatar || '/images/logos/AGS-logo-v1.png'" 
                :alt="profileData.name"
                class="footer-profile-avatar"
              >
              <div class="footer-profile-info">
                <h3>{{ profileData.name }}</h3>
                <p>{{ profileData.title }}</p>
              </div>
            </div>
            
            <!-- Contact Information -->
            <div class="footer-contact-info">
              <div class="footer-contact-item">
                <Icon name="heroicons:envelope" class="footer-contact-icon" />
                <a 
                  href="mailto:contact@abdulbarry.me" 
                  class="footer-contact-link"
                  aria-label="Send email to contact@abdulbarry.me"
                >
                  contact@abdulbarry.me
                </a>
              </div>
              <div class="footer-contact-item">
                <Icon name="heroicons:phone" class="footer-contact-icon" />
                <a 
                  href="tel:+21626100791" 
                  class="footer-contact-link"
                  aria-label="Call +216 26 100 791"
                >
                  +216 26 100 791
                </a>
              </div>
            </div>
            
            <!-- Social Links -->
            <div class="footer-social-links">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.url" 
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-link"
              >
                <Icon :name="social.icon" class="footer-social-icon" />
              </a>
            </div>

            <!-- Theme Toggle Button -->
            <div class="footer-theme-toggle-container">
              <button
                @click="toggleTheme"
                class="footer-theme-toggle"
                :title="`Switch to ${getThemeLabel} mode`"
                :aria-label="`Switch to ${getThemeLabel} mode`"
              >
                <Icon :name="getThemeIcon" class="footer-theme-icon" />
              </button>
            </div>
            
            <!-- Copyright -->
            <p class="footer-copyright">
              {{ currentYear }} - {{ profileData.name }}.<br>
              All Rights Reserved.
            </p>
          </div>

          <!-- General Navigation -->
          <div class="footer-nav-section">
            <h4 class="footer-nav-heading">
              General
            </h4>
            <ul class="footer-nav-list">
              <li v-for="link in generalLinks" :key="link.name" class="footer-nav-item">
                <NuxtLink 
                  :to="link.to"
                  class="footer-nav-link"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Writing Section -->
          <div class="footer-nav-section">
            <h4 class="footer-nav-heading">
              Writing
            </h4>
            <ul class="footer-nav-list">
              <li v-for="link in writingLinks" :key="link.name" class="footer-nav-item">
                <NuxtLink 
                  :to="link.to"
                  class="footer-nav-link"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import './../assets/css/AppFooter.css';
</style>

<script setup>
const profileData = {
  name: 'Abdelbari Guenichi',
  title: 'Frontend Developer',
  avatar: '/images/logos/AGS-logo-v1.png'
}

// Current year for copyright
const currentYear = computed(() => new Date().getFullYear())

// Use the theme composable
const { toggleTheme, getThemeIcon, getThemeLabel } = useTheme()

// Social media links using Nuxt Icon module
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/guenichi-abdulbarry/',
    icon: 'mdi:linkedin'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/abdulbarry.guenichi/',
    icon: 'mdi:instagram'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/abdulbarry-dev',
    icon: 'mdi:github'
  }
]

// Navigation links
const generalLinks = [
  { name: 'Home', to: '/home' },
  { name: 'Projects', to: '/projects' },
  { name: 'Contact', to: '/contact' }
]

const writingLinks = [
  { name: 'Blog', to: '/blog' }
]
</script>