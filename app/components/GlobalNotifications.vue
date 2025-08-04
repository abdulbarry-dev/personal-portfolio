<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="notification-container" :class="themeClass">
        <TransitionGroup
          name="notification"
          tag="div"
          class="notification-list"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class="'notification-' + notification.type"
          >
            <div class="notification-content">
              <div class="notification-icon">
                <svg v-if="notification.type === 'success'" class="notification-icon-svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="notification.type === 'error'" class="notification-icon-svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="notification.type === 'warning'" class="notification-icon-svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <svg v-else class="notification-icon-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <div class="notification-text">
                <div class="notification-title">{{ notification.title }}</div>
                <div v-if="notification.message" class="notification-message">
                  {{ notification.message }}
                </div>
              </div>
              
              <button
                @click="removeNotification(notification.id)"
                class="notification-close"
                :aria-label="`Close ${notification.type} notification`"
              >
                <svg class="close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div 
              v-if="notification.duration > 0"
              class="notification-progress"
            >
              <div 
                class="progress-bar"
                :class="'progress-' + notification.type"
                :style="{ animationDuration: notification.duration + 'ms' }"
              ></div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<script setup>
const { notifications, removeNotification } = useNotifications()
const { isDark } = useTheme()

const currentTheme = ref('light')

const updateTheme = () => {
  if (process.client) {
    const htmlElement = document.documentElement
    const hasDarkClass = htmlElement.classList.contains('dark')
    currentTheme.value = hasDarkClass ? 'dark' : 'light'
  }
}

watch(isDark, updateTheme, { immediate: true })

onMounted(() => {
  updateTheme()
  
  if (process.client) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          updateTheme()
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    onUnmounted(() => {
      observer.disconnect()
    })
  }
})

const themeClass = computed(() => currentTheme.value === 'dark' ? 'dark-theme' : '')
</script>

<style scoped>
@import './../assets/css/GlobalNotifications.css';
</style>