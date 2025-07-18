<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section (Left) -->
        <div class="flex-shrink-0">
          <router-link to="/" class="flex items-center">
            <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors duration-300">
              <img 
                src="/images/logos/AGS-logo-v1.png" 
                alt="Logo" 
                class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation Links (Right) -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
            >
              Home
            </router-link>
            <router-link 
              to="/projects" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
            >
              Projects
            </router-link>
            <router-link 
              to="/blog" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
            >
              Blog
            </router-link>
            <router-link 
              to="/contact" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Contact
            </router-link>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-md transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                v-if="!mobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div 
      v-if="mobileMenuOpen" 
      class="md:hidden bg-white border-t border-gray-200 shadow-lg"
      @click="mobileMenuOpen = false"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          to="/"
          class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          active-class="text-blue-600 bg-blue-50"
        >
          Home
        </router-link>
        <router-link
          to="/projects"
          class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          active-class="text-blue-600 bg-blue-50"
        >
          Projects
        </router-link>
        <router-link
          to="/blog"
          class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
          active-class="text-blue-600 bg-blue-50"
        >
          Blog
        </router-link>
        <router-link
          to="/contact"
          class="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 mx-3 mt-4"
        >
          Contact
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

// Close mobile menu when clicking outside or on route change
const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Close mobile menu on route change
onMounted(() => {
  const router = useRouter()
  router.afterEach(() => {
    closeMobileMenu()
  })
})
</script> 