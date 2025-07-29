<template>
  <ClientOnly>
    <Teleport to="body">
      <div 
        v-if="notifications && notifications.length > 0"
        class="notification-container"
      >
        <TransitionGroup
          name="notification"
          tag="div"
          class="notification-list"
        >
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item"
            :class=" [
              'notification-' + notification.type,
              { 'dark-theme': isDark }
            ]"
          >
            <div class="notification-content">
              <div class="notification-icon">
                <!-- Success Icon -->
                <svg 
                  v-if="notification.type === 'success'" 
                  class="icon success-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <!-- Error Icon -->
                <svg 
                  v-else-if="notification.type === 'error'" 
                  class="icon error-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <!-- Warning Icon -->
                <svg 
                  v-else-if="notification.type === 'warning'" 
                  class="icon warning-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <!-- Info Icon -->
                <svg 
                  v-else 
                  class="icon info-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
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
            
            <!-- Progress Bar -->
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

// Debug: Watch theme changes
watch(isDark, (newValue) => {
  console.log('Theme changed in notifications:', newValue ? 'dark' : 'light')
}, { immediate: true })
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  width: 384px;
  max-width: calc(100vw - 2rem);
  pointer-events: none;
}

.notification-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification-item {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  pointer-events: auto;
  width: 100%;
  min-height: 80px;
  /* Smooth theme transition */
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-item.dark-theme {
  background: #1f2937;
  border-color: #374151;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

.notification-content {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  gap: 0.75rem;
}

.notification-icon {
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.125rem;
  /* Smooth icon background transition */
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
              color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-success .notification-icon {
  background: #dcfce7;
  color: #16a34a;
}

.notification-error .notification-icon {
  background: #fef2f2;
  color: #dc2626;
}

.notification-warning .notification-icon {
  background: #fefce8;
  color: #ca8a04;
}

.notification-info .notification-icon {
  background: #eff6ff;
  color: #2563eb;
}

.notification-item.dark-theme .notification-success .notification-icon {
  background: #14532d;
  color: #4ade80;
}

.notification-item.dark-theme .notification-error .notification-icon {
  background: #7f1d1d;
  color: #f87171;
}

.notification-item.dark-theme .notification-warning .notification-icon {
  background: #713f12;
  color: #fbbf24;
}

.notification-item.dark-theme .notification-info .notification-icon {
  background: #1e3a8a;
  color: #60a5fa;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.notification-text {
  flex: 1;
  min-width: 0;
}

.notification-title {
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  color: #111827;
  margin-bottom: 0.25rem;
  /* Smooth text color transition */
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-message {
  font-size: 0.875rem;
  line-height: 1.4;
  color: #6b7280;
  /* Smooth text color transition */
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-item.dark-theme .notification-title {
  color: #f9fafb;
}

.notification-item.dark-theme .notification-message {
  color: #d1d5db;
}

.notification-close {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  border: none;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Smooth button transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-close:hover {
  background: #f3f4f6;
  color: #6b7280;
}

.notification-item.dark-theme .notification-close {
  color: #6b7280;
}

.notification-item.dark-theme .notification-close:hover {
  background: #374151;
  color: #d1d5db;
}

.close-icon {
  width: 1rem;
  height: 1rem;
}

.notification-progress {
  height: 0.25rem;
  background: #f3f4f6;
  overflow: hidden;
  /* Smooth progress bar background transition */
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

/* Animations */
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

/* Mobile responsive */
@media (max-width: 640px) {
  .notification-container {
    left: 1rem;
    right: 1rem;
    width: auto;
    max-width: none;
  }
}
</style>