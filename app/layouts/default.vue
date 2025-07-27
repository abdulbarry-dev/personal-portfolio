<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Persistent Navbar with floating behavior -->
    <NavBar />
    
    <!-- Main Content Area - This changes based on route -->
    <main class="flex-1 pt-20">
      <slot />
    </main>
    
    <!-- Persistent Notification Section -->
    <Notification />
    
    <!-- Persistent Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
// Components are auto-imported by Nuxt
</script>

<style scoped>
/* Layout-specific styles if needed */
</style>