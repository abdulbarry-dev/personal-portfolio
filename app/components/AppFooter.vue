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
                @click="handleThemeToggle"
                class="footer-theme-toggle"
                :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
                :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
              >
                <Icon :name="currentThemeIcon" class="footer-theme-icon" />
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

// Theme state management without using the composable initially
const isDarkMode = ref(false)
const currentThemeIcon = ref('heroicons:moon')

// Check theme from document class directly
const checkCurrentTheme = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark')
    currentThemeIcon.value = isDarkMode.value ? 'heroicons:sun' : 'heroicons:moon'
  }
}

// Handle theme toggle without composable
const handleThemeToggle = () => {
  if (process.client) {
    const newTheme = !isDarkMode.value
    
    // Update document class directly
    document.documentElement.classList.toggle('dark', newTheme)
    
    // Update localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.content = newTheme ? '#1f2937' : '#ffffff'
    }
    
    // Update local state
    isDarkMode.value = newTheme
    currentThemeIcon.value = newTheme ? 'heroicons:sun' : 'heroicons:moon'
  }
}

// Initialize theme state on mount
onMounted(() => {
  checkCurrentTheme()
  
  // Watch for external theme changes (from other components)
  const observer = new MutationObserver(() => {
    checkCurrentTheme()
  })
  
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  onUnmounted(() => {
    observer.disconnect()
  })
})

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