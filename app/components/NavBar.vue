<template>
  <nav class="bg-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="text-xl font-bold text-gray-900">
            <img src="./../assets/images/logos/AGS-logo-v1.png" alt="AG Solutions Logo" class="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <NuxtLink 
              to="/" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
            >
              Home
            </NuxtLink>
            <NuxtLink 
              to="/projects" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
            >
              Projects
            </NuxtLink>
            <NuxtLink 
              to="/blog" 
              class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-blue-50"
              active-class="text-blue-600 bg-blue-50"
              @click="handleBlogClick"
            >
              Blog
            </NuxtLink>
            <NuxtLink 
              to="/contact" 
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Contact
            </NuxtLink>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          >
            <Icon :name="mobileMenuOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="mobileMenuOpen" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white">
          <NuxtLink 
            to="/"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            active-class="text-blue-600 bg-blue-50"
            @click="closeMobileMenu"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/projects"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            active-class="text-blue-600 bg-blue-50"
            @click="closeMobileMenu"
          >
            Projects
          </NuxtLink>
          <NuxtLink 
            to="/blog"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            active-class="text-blue-600 bg-blue-50"
            @click="closeMobileMenu"
          >
            Blog
          </NuxtLink>
          <NuxtLink 
            to="/contact"
            class="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            @click="closeMobileMenu"
          >
            Contact
          </NuxtLink>
        </div>
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

const handleBlogClick = () => {
  console.log('Blog link clicked!')
  console.log('Current route:', useRoute().path)
}
</script>