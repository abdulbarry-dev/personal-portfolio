export const useNotifications = () => {
  // Create a global reactive state that persists across components
  const notifications = useState('notifications', () => [])

  // Add notification function
  const addNotification = (notification) => {
    const id = Date.now() + Math.random() // Ensure unique ID
    const newNotification = {
      id,
      type: 'info',
      title: '',
      message: '',
      duration: 5000,
      ...notification
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
  const removeNotification = (id) => {
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