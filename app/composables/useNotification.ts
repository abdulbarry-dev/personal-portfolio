interface Notification {
  id: number
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration: number
}

interface AddNotificationOptions {
  type?: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export const useNotifications = () => {
  // Create a global reactive state that persists across components
  const notifications = useState<Notification[]>('notifications', () => [])

  // Add notification function
  const addNotification = (notification: AddNotificationOptions) => {
    const id = Date.now() + Math.random() // Ensure unique ID
    const newNotification: Notification = {
      id,
      type: notification.type || 'info',
      title: notification.title,
      message: notification.message || '',
      duration: notification.duration || 5000
    }
    
    notifications.value.push(newNotification)
    
    // Auto remove after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
  }

  // Remove notification function
  const removeNotification = (id: number) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  // Clear all notifications
  const clearNotifications = () => {
    notifications.value = []
  }

  return {
    notifications: readonly(notifications),
    addNotification,
    removeNotification,
    clearNotifications
  }
}