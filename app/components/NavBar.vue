<template>
  <!-- Spacer div to maintain layout when navbar becomes fixed -->
  <div v-if="isScrolled" class="navbar-spacer"></div>
  
  <nav class="navbar" :class="navbarClasses">
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
              <span v-if="isActiveRoute('/')" class="navbar-text">Home</span>
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
            @click="handleBlogClick"
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

<style scoped>
@import './../assets/css/NavBar.css';

/* Spacer to maintain layout when navbar becomes fixed */
.navbar-spacer {
  height: 6rem; /* Same height as navbar + margins */
  width: 100%;
}

/* Responsive spacer heights */
@media (max-width: 475px) {
  .navbar-spacer {
    height: 4.5rem; /* 3.5rem navbar + 1rem margins */
  }
}

@media (min-width: 476px) and (max-width: 640px) {
  .navbar-spacer {
    height: 5.5rem; /* 4rem navbar + 1.5rem margins */
  }
}

@media (min-width: 641px) {
  .navbar-spacer {
    height: 6rem; /* 4rem navbar + 2rem margins */
  }
}
</style>

<script setup>
const route = useRoute()

// Scroll state management
const isScrolled = ref(false)
const scrollThreshold = 80

// Computed class for navbar state
const navbarClasses = computed(() => ({
  'navbar-fixed': isScrolled.value,
  'navbar-static': !isScrolled.value
}))

// Simple scroll handler
const handleScroll = () => {
  if (process.client) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    isScrolled.value = scrollTop > scrollThreshold
  }
}

// Setup scroll listener
onMounted(() => {
  if (process.client) {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

// Cleanup scroll listener
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})

const handleBlogClick = () => {
  console.log('Blog link clicked!')
  console.log('Current route:', route.path)
}

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


