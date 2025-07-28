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

import { ref, computed, onMounted, readonly } from 'vue'

export const useTheme = () => {
  // Reactive theme state - only 'light' or 'dark'
  const isDark = ref(false)

  // Initialize theme on client side
  const initTheme = () => {
    if (process.client) {
      // Get saved theme from localStorage or detect system preference
      const savedTheme = localStorage.getItem('theme')
      
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        // Detect system preference
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        // Save the detected preference
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      }
      
      updateDocumentClass(isDark.value)
    }
  }

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
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.name = 'theme-color'
      document.head.appendChild(metaThemeColor)
    }
    metaThemeColor.content = color
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

  // Initialize theme when composable is used
  onMounted(() => {
    initTheme()
  })

  return {
    isDark: readonly(isDark),
    toggleTheme,
    getThemeIcon
  }
}
