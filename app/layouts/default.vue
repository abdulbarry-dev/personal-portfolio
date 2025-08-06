<template>
  <div>
    <!-- Persistent Navbar with floating behavior -->
    <NavBar />
    
    <!-- Main Content Area - This changes based on route -->
    <main>
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