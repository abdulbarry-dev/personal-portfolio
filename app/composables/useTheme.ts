import { computed, onMounted, readonly, watch, onUnmounted } from 'vue'

export const useTheme = () => {
  const isDark = useState('theme-isDark', () => {
    if (process.server) return false
    
    if (process.client) {
      const sessionTheme = sessionStorage.getItem('__INITIAL_THEME__')
      if (sessionTheme !== null) {
        return sessionTheme === 'true'
      }
      
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme !== null) {
        return savedTheme === 'dark'
      }
      
      const storedPreference = sessionStorage.getItem('user-theme-preference')
      if (storedPreference !== null) {
        return storedPreference === 'dark'
      }
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    return false
  })

  const hasUserPreference = computed(() => {
    if (process.client) {
      return localStorage.getItem('theme') !== null || 
             sessionStorage.getItem('user-theme-preference') !== null
    }
    return false
  })

  const getSystemPreference = (): boolean => {
    if (process.client) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  }

  const updateDocumentClass = (dark: boolean): void => {
    if (process.client) {
      const html = document.documentElement
      html.classList.toggle('dark', dark)
      updateMetaThemeColor(dark ? '#1f2937' : '#ffffff')
    }
  }

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

  const saveUserPreference = (theme: 'light' | 'dark'): void => {
    if (process.client) {
      localStorage.setItem('theme', theme)
      sessionStorage.setItem('user-theme-preference', theme)
      sessionStorage.setItem('__INITIAL_THEME__', theme === 'dark' ? 'true' : 'false')
    }
  }

  const toggleTheme = (): void => {
    if (process.client) {
      const newTheme = !isDark.value
      isDark.value = newTheme
      saveUserPreference(newTheme ? 'dark' : 'light')
      updateDocumentClass(newTheme)
    }
  }

  const setTheme = (theme: 'light' | 'dark'): void => {
    if (process.client) {
      isDark.value = theme === 'dark'
      saveUserPreference(theme)
      updateDocumentClass(isDark.value)
    }
  }

  const followSystemTheme = (): void => {
    if (process.client) {
      localStorage.removeItem('theme')
      sessionStorage.removeItem('user-theme-preference')
      sessionStorage.removeItem('__INITIAL_THEME__')
      
      const systemPreference = getSystemPreference()
      isDark.value = systemPreference
      updateDocumentClass(isDark.value)
    }
  }

  const getCurrentTheme = computed(() => isDark.value ? 'dark' : 'light')
  const getThemeIcon = computed(() => isDark.value ? 'heroicons:sun' : 'heroicons:moon')
  const getThemeLabel = computed(() => isDark.value ? 'Light' : 'Dark')

  const setupSystemThemeListener = () => {
    if (process.client) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        if (!hasUserPreference.value) {
          isDark.value = e.matches
          updateDocumentClass(isDark.value)
        }
      }
      
      mediaQuery.addEventListener('change', handleSystemThemeChange)
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
    return undefined
  }

  watch(isDark, (newValue) => {
    if (process.client) {
      updateDocumentClass(newValue)
    }
  })

  let cleanup: (() => void) | undefined

  onMounted(() => {
    updateDocumentClass(isDark.value)
    cleanup = setupSystemThemeListener()
  })

  onUnmounted(() => {
    if (cleanup) cleanup()
  })

  return {
    isDark: readonly(isDark),
    hasUserPreference,
    getCurrentTheme,
    getThemeIcon,
    getThemeLabel,
    toggleTheme,
    setTheme,
    followSystemTheme,
    getSystemPreference
  }
}