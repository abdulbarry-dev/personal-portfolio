<template>
  <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Profile Section -->
        <div class="md:col-span-1">
          <div class="flex items-center space-x-3 mb-6">
            <img 
              :src="profileData.avatar || '/images/logos/AGS-logo-v1.png'" 
              :alt="profileData.name"
              class="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            >
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ profileData.name }}</h3>
              <p class="text-base text-gray-600 dark:text-gray-400 font-medium">{{ profileData.title }}</p>
            </div>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-5 mb-6">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 transform hover:scale-110"
            >
              <component :is="social.icon" class="w-7 h-7" />
            </a>
          </div>

          <!-- Theme Toggle Button - Simple Circle -->
          <div class="mb-6">
            <button
              @click="handleThemeToggle"
              class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-md hover:shadow-lg flex items-center justify-center"
              :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <Icon :name="currentThemeIcon" class="w-5 h-5" />
            </button>
          </div>
          
          <!-- Copyright -->
          <p class="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            {{ currentYear }} - {{ profileData.name }}.<br>
            All Rights Reserved.
          </p>
        </div>

        <!-- General Navigation -->
        <div class="md:col-span-1">
          <h4 class="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
            General
          </h4>
          <ul class="space-y-4">
            <li v-for="link in generalLinks" :key="link.name">
              <NuxtLink 
                :to="link.to"
                class="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 text-base font-medium hover:underline"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Writing Section -->
        <div class="md:col-span-1">
          <h4 class="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-5">
            Writing
          </h4>
          <ul class="space-y-4">
            <li v-for="link in writingLinks" :key="link.name">
              <NuxtLink 
                :to="link.to"
                class="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 text-base font-medium hover:underline"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

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

// Social media links - LinkedIn, Instagram, GitHub
const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/guenichi-abdulbarry/',
    icon: markRaw(() => h('svg', {
      class: 'w-7 h-7',
      fill: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
      })
    ]))
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/abdulbarry.guenichi/',
    icon: markRaw(() => h('svg', {
      class: 'w-7 h-7',
      fill: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
      })
    ]))
  },
  {
    name: 'GitHub',
    url: 'https://github.com/abdulbarry-dev',
    icon: markRaw(() => h('svg', {
      class: 'w-7 h-7',
      fill: 'currentColor',
      viewBox: '0 0 24 24'
    }, [
      h('path', {
        fillRule: 'evenodd',
        d: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
        clipRule: 'evenodd'
      })
    ]))
  }
]

// Navigation links
const generalLinks = [
  { name: 'Home', to: '/' },
  { name: 'Projects', to: '/projects' },
  { name: 'Contact', to: '/contact' }
]

const writingLinks = [
  { name: 'Blog', to: '/blog' }
]
</script>