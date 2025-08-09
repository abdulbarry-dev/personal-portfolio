<template>
  <div class="layout-container">
    <!-- Navbar - starts in normal flow, becomes fixed on scroll -->
    <NavBar />
    
    <!-- Main Content Area - This changes based on route -->
    <main class="main-content">
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

<style scoped>
.layout-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  /* Remove any top padding since navbar is now in normal flow initially */
}

/* Add smooth transitions for layout changes */
* {
  box-sizing: border-box;
}

/* Ensure smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Prevent horizontal scroll */
body {
  overflow-x: hidden;
}
</style>

<script setup>
// Components are auto-imported by Nuxt
</script>