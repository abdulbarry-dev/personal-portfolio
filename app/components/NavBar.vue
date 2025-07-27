<template>
  <nav class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-sm z-50 backdrop-blur-sm transition-all duration-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center items-center h-16">
        <!-- Navigation - Icons with text only when active -->
        <div class="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
          <NuxtLink 
            to="/" 
            class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150 ease-out"
            active-class="text-gray-900"
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
              <span v-if="$route.path === '/'" class="text-sm font-medium whitespace-nowrap overflow-hidden">Home</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/projects" 
            class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150 ease-out"
            active-class="text-gray-900"
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
              <span v-if="$route.path === '/projects'" class="text-sm font-medium whitespace-nowrap overflow-hidden">Projects</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/blog" 
            class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150 ease-out"
            active-class="text-gray-900"
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
              <span v-if="$route.path === '/blog'" class="text-sm font-medium whitespace-nowrap overflow-hidden">Blog</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-150 ease-out"
            active-class="text-gray-900"
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
              <span v-if="$route.path === '/contact'" class="text-sm font-medium whitespace-nowrap overflow-hidden">Contact</span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const handleBlogClick = () => {
  console.log('Blog link clicked!')
  console.log('Current route:', useRoute().path)
}
</script>