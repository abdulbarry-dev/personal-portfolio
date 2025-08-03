<template>
  <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-900/50 z-50 transition-all duration-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center items-center h-16">
        <!-- Navigation - Icons with text only when active -->
        <div class="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
          <NuxtLink 
            to="/home" 
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-out"
            active-class="text-gray-900 dark:text-white"
          >
            <Icon name="heroicons:home" class="w-5 h-5 flex-shrink-0" />
            <Transition 
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-w-0 ml-0"
              enter-to-class="opacity-100 max-w-20 ml-2"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-w-20 ml-2"
              leave-to-class="opacity-0 max-w-0 ml-0"
            >
              <span v-if="isActiveRoute('/')" class="text-sm font-medium whitespace-nowrap overflow-hidden text-gray-900 dark:text-white">Home</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/projects" 
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-out"
            active-class="text-gray-900 dark:text-white"
          >
            <Icon name="heroicons:folder" class="w-5 h-5 flex-shrink-0" />
            <Transition 
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-w-0 ml-0"
              enter-to-class="opacity-100 max-w-24 ml-2"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-w-24 ml-2"
              leave-to-class="opacity-0 max-w-0 ml-0"
            >
              <span v-if="isActiveRoute('/projects')" class="text-sm font-medium whitespace-nowrap overflow-hidden text-gray-900 dark:text-white">Projects</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/blog" 
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-out"
            active-class="text-gray-900 dark:text-white"
            @click="handleBlogClick"
          >
            <Icon name="heroicons:document-text" class="w-5 h-5 flex-shrink-0" />
            <Transition 
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-w-0 ml-0"
              enter-to-class="opacity-100 max-w-16 ml-2"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-w-16 ml-2"
              leave-to-class="opacity-0 max-w-0 ml-0"
            >
              <span v-if="isActiveRoute('/blog')" class="text-sm font-medium whitespace-nowrap overflow-hidden text-gray-900 dark:text-white">Blog</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-150 ease-out"
            active-class="text-gray-900 dark:text-white"
          >
            <Icon name="heroicons:envelope" class="w-5 h-5 flex-shrink-0" />
            <Transition 
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 max-w-0 ml-0"
              enter-to-class="opacity-100 max-w-20 ml-2"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 max-w-20 ml-2"
              leave-to-class="opacity-0 max-w-0 ml-0"
            >
              <span v-if="isActiveRoute('/contact')" class="text-sm font-medium whitespace-nowrap overflow-hidden text-gray-900 dark:text-white">Contact</span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const route = useRoute()

const handleBlogClick = () => {
  console.log('Blog link clicked!')
  console.log('Current route:', route.path)
}

// Helper function to check if route is active
const isActiveRoute = (path) => {
  if (path === '/') {
    return route.path === '/' || route.path === '/home'
  }
  if (path === '/blog') {
    return route.path === '/blog' || route.path.startsWith('/blog/')
  }
  return route.path === path
}
</script>

<style scoped>
/* Enhanced backdrop blur for better visibility in both themes */
nav {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Ensure proper contrast in both themes */
.dark nav {
  background-color: rgba(31, 41, 55, 0.9);
  border-color: rgba(75, 85, 99, 0.8);
}

nav {
  background-color: rgba(255, 255, 255, 0.9);
  border-color: rgba(229, 231, 235, 0.8);
}

/* Smooth transitions for theme changes */
nav, nav * {
  transition-property: background-color, border-color, color;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>