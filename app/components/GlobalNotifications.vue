<template>
  <ClientOnly>
    <Teleport to="body">
      <div class="notification-container" :class="themeClass">
        <TransitionGroup
          name="notification"
          tag="div"
          class="space-y-3"
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
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
  pointer-events: none;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.notification-item {
  pointer-events: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  backdrop-filter: blur(16px);
  max-width: 100%;
  position: relative;
}

.dark-theme .notification-item {
  background: rgba(31, 41, 55, 0.95);
  border-color: rgba(75, 85, 99, 0.8);
  color: #f3f4f6;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  gap: 0.75rem;
  position: relative;
}

.notification-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  font-size: 0.875rem;
  font-weight: 600;
}

.notification-icon-svg {
  width: 1.25rem;
  height: 1.25rem;
}

.notification-success .notification-icon {
  color: #22c55e;
  background-color: rgba(34, 197, 94, 0.1);
}

.notification-error .notification-icon {
  color: #ef4444;
  background-color: rgba(239, 68, 68, 0.1);
}

.notification-warning .notification-icon {
  color: #f59e0b;
  background-color: rgba(245, 158, 11, 0.1);
}

.notification-info .notification-icon {
  color: #3b82f6;
  background-color: rgba(59, 130, 246, 0.1);
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.25;
  margin-bottom: 0.25rem;
}

.dark-theme .notification-title {
  color: #f9fafb;
}

.notification-message {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
  word-wrap: break-word;
}

.dark-theme .notification-message {
  color: #d1d5db;
}

.notification-close {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
}

.notification-close:hover {
  background-color: rgba(156, 163, 175, 0.1);
  color: #6b7280;
  transform: scale(1.1);
}

.dark-theme .notification-close:hover {
  background-color: rgba(75, 85, 99, 0.3);
  color: #9ca3af;
}

.close-icon {
  width: 1rem;
  height: 1rem;
}

.notification-progress {
  height: 0.25rem;
  background: #f3f4f6;
  overflow: hidden;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-item.dark-theme .notification-progress {
  background: #374151;
}

.progress-bar {
  height: 100%;
  width: 100%;
  animation: progress-shrink linear forwards;
}

.progress-success {
  background: #22c55e;
}

.progress-error {
  background: #ef4444;
}

.progress-warning {
  background: #f59e0b;
}

.progress-info {
  background: #3b82f6;
}

@keyframes progress-shrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}

.notification-enter-active {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.notification-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.95);
}

.notification-move {
  transition: transform 0.3s ease;
}

@media (max-width: 640px) {
  .notification-container {
    left: 1rem;
    right: 1rem;
    width: auto;
    max-width: none;
  }
}
</style>