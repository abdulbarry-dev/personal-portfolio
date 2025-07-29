/*
 * Theme Management Composable
 * This composable should contain:
 * - Dark/light theme switching functionality
 * - Theme persistence in localStorage
 * - System theme preference detection
 * - Theme class application to document
 * - Reactive theme state management
 * 
 * Functions to export:
 * - useTheme() - main composable function
 * - toggleTheme() - switch between themes
 * - setTheme(theme) - set specific theme
 * - getCurrentTheme() - get current theme
 * - isSystemTheme() - check if using system preference
 * 
 * Return values:
 * - theme: Ref<'light' | 'dark' | 'system'>
 * - isDark: ComputedRef<boolean>
 * - toggleTheme: Function
 * - setTheme: Function
 */

import { computed, onMounted, readonly, watch } from 'vue'

export const useTheme = () => {
  // Use useState to create a global reactive state that persists across components
  const isDark = useState('theme-isDark', () => {
    // Initialize theme on server side as false (light mode default)
    if (process.server) return false
    
    // Client-side initialization
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme === 'dark'
    }
    
    // Detect system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Update document class and meta theme-color
  const updateDocumentClass = (dark) => {
    if (process.client) {
      const html = document.documentElement
      
      if (dark) {
        html.classList.add('dark')
        updateMetaThemeColor('#1f2937')
      } else {
        html.classList.remove('dark')
        updateMetaThemeColor('#ffffff')
      }
    }
  }

  // Update meta theme-color
  const updateMetaThemeColor = (color) => {
    if (process.client) {
      let metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.name = 'theme-color'
        document.head.appendChild(metaThemeColor)
      }
      metaThemeColor.content = color
    }
  }

  // Toggle between light and dark
  const toggleTheme = () => {
    isDark.value = !isDark.value
    const newTheme = isDark.value ? 'dark' : 'light'
    
    if (process.client) {
      localStorage.setItem('theme', newTheme)
      updateDocumentClass(isDark.value)
    }
  }

  // Get current theme icon
  const getThemeIcon = computed(() => {
    return isDark.value ? 'heroicons:sun' : 'heroicons:moon'
  })

  // Watch for theme changes and update document class
  watch(isDark, (newValue) => {
    updateDocumentClass(newValue)
  }, { immediate: true })

  // Initialize theme on client side
  onMounted(() => {
    // Apply the initial theme to the document
    updateDocumentClass(isDark.value)
    
    // Save initial theme to localStorage if not already saved
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    }
  })

  return {
    isDark: readonly(isDark),
    toggleTheme,
    getThemeIcon
  }
}
