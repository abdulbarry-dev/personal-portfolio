<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-flex">
        <!-- Navigation Links -->
        <div class="navbar-links">
          <NuxtLink 
            to="/home" 
            class="navbar-link"
            active-class="router-link-active"
          >
            <Icon name="heroicons:home" class="navbar-icon" />
            <Transition 
              enter-active-class="nav-enter-active"
              enter-from-class="nav-enter-from"
              enter-to-class="nav-enter-to home-text"
              leave-active-class="nav-leave-active"
              leave-from-class="nav-leave-from home-text"
              leave-to-class="nav-leave-to"
            >
              <span v-if="isActiveRoute('/home')" class="navbar-text">Home</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/projects" 
            class="navbar-link"
            active-class="router-link-active"
          >
            <Icon name="heroicons:folder" class="navbar-icon" />
            <Transition 
              enter-active-class="nav-enter-active"
              enter-from-class="nav-enter-from"
              enter-to-class="nav-enter-to projects-text"
              leave-active-class="nav-leave-active"
              leave-from-class="nav-leave-from projects-text"
              leave-to-class="nav-leave-to"
            >
              <span v-if="isActiveRoute('/projects')" class="navbar-text">Projects</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/blog" 
            class="navbar-link"
            active-class="router-link-active"
          >
            <Icon name="heroicons:document-text" class="navbar-icon" />
            <Transition 
              enter-active-class="nav-enter-active"
              enter-from-class="nav-enter-from"
              enter-to-class="nav-enter-to blog-text"
              leave-active-class="nav-leave-active"
              leave-from-class="nav-leave-from blog-text"
              leave-to-class="nav-leave-to"
            >
              <span v-if="isActiveRoute('/blog')" class="navbar-text">Blog</span>
            </Transition>
          </NuxtLink>
          
          <NuxtLink 
            to="/contact" 
            class="navbar-link"
            active-class="router-link-active"
          >
            <Icon name="heroicons:envelope" class="navbar-icon" />
            <Transition 
              enter-active-class="nav-enter-active"
              enter-from-class="nav-enter-from"
              enter-to-class="nav-enter-to contact-text"
              leave-active-class="nav-leave-active"
              leave-from-class="nav-leave-from contact-text"
              leave-to-class="nav-leave-to"
            >
              <span v-if="isActiveRoute('/contact')" class="navbar-text">Contact</span>
            </Transition>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Import types for better type safety
interface RouteParams {
  path: string
  name?: string | null
}

// Get current route
const route = useRoute()

/**
 * Determines if the current route matches the given path
 * @param path - The path to check against current route
 * @returns boolean indicating if the route is active
 */
const isActiveRoute = (path: string): boolean => {
  const currentPath = route.path
  
  // Handle home route variations
  if (path === '/home') {
    return currentPath === '/' || currentPath === '/home'
  }
  
  // Handle blog route and sub-routes
  if (path === '/blog') {
    return currentPath === '/blog' || currentPath.startsWith('/blog/')
  }
  
  // Handle exact path matching for other routes
  return currentPath === path
}
</script>

<style scoped>
@import './../assets/css/NavBar.css';
</style>


