<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200 relative">
    <!-- Persistent Navbar with floating behavior -->
    <NavBar />
    
    <!-- Main Content Area - This changes based on route -->
    <main class="flex-1 pt-20">
      <slot />
    </main>
    
    <!-- Newsletter Component (if on home page) -->
      <Notification />
    
    <!-- Global Notifications -->
    <ClientOnly>
      <GlobalNotifications />
    </ClientOnly>
    
    <!-- Persistent Footer -->
    <AppFooter />
  </div>
</template>

<script setup>
// Components are auto-imported by Nuxt
</script>