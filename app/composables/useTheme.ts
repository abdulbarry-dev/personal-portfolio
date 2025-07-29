import { computed, onMounted, readonly, watch, onUnmounted } from 'vue'

export const useTheme = () => {
  // Use useState with simplified initialization
  const isDark = useState('theme-isDark', () => {
    // On server side, return false to prevent hydration mismatch
    if (process.server) return false
    
    // On client side, check sessionStorage for plugin's decision
    if (process.client) {
      const initialTheme = sessionStorage.getItem('__INITIAL_THEME__')
      if (initialTheme !== null) {
        return initialTheme === 'true'
      }
      
      // Fallback logic
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light') return false
      if (savedTheme === 'dark') return true
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    return false
  })

  // Get system preference
  const getSystemPreference = (): boolean => {
    if (process.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  // Update document class and meta theme-color
  const updateDocumentClass = (dark: boolean): void => {
    if (process.client) {
      const html = document.documentElement
      html.classList.toggle('dark', dark)
      updateMetaThemeColor(dark ? '#1f2937' : '#ffffff')
    }
  }

  // Update meta theme-color
  const updateMetaThemeColor = (color: string): void => {
    if (process.client) {
      let metaThemeColor: HTMLMetaElement | null = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.name = 'theme-color'
        document.head.appendChild(metaThemeColor)
      }
      metaThemeColor.content = color
    }
  }

  // Simple toggle between light and dark
  const toggleTheme = (): void => {
    if (process.client) {
      isDark.value = !isDark.value
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      updateDocumentClass(isDark.value)
    }
  }

  // Set specific theme
  const setTheme = (theme: 'light' | 'dark'): void => {
    if (process.client) {
      isDark.value = theme === 'dark'
      localStorage.setItem('theme', theme)
      updateDocumentClass(isDark.value)
    }
  }

  // Computed properties
  const getCurrentTheme = computed(() => isDark.value ? 'dark' : 'light')
  const getThemeIcon = computed(() => isDark.value ? 'heroicons:sun' : 'heroicons:moon')
  const getThemeLabel = computed(() => isDark.value ? 'Light' : 'Dark')

  // System theme listener
  const setupSystemThemeListener = () => {
    if (process.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const savedTheme = localStorage.getItem('theme')
        if (!savedTheme) {
          isDark.value = e.matches
          updateDocumentClass(isDark.value)
        }
      }
      
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
    return undefined
  }

  // Watch for theme changes (only after initialization)
  let isInitialized = false
  watch(isDark, (newValue) => {
    if (isInitialized && process.client) {
      updateDocumentClass(newValue)
    }
  })

  let cleanup: (() => void) | undefined

  onMounted(() => {
    cleanup = setupSystemThemeListener()
    isInitialized = true
  })

  onUnmounted(() => {
    if (cleanup) cleanup()
  })

  return {
    isDark: readonly(isDark),
    getCurrentTheme,
    getThemeIcon,
    getThemeLabel,
    toggleTheme,
    setTheme,
    getSystemPreference
  }
}