declare global {
  interface Window {
    __INITIAL_THEME__?: boolean;
  }
}

export default defineNuxtPlugin(() => {
  // Only run on client side
  if (process.client) {
    // Theme constants
    const THEME_COLORS = {
      dark: '#1f2937',
      light: '#ffffff'
    } as const

    // Helper function to set meta theme color
    const setMetaThemeColor = (color: string): void => {
      let metaThemeColor: HTMLMetaElement | null = document.querySelector('meta[name="theme-color"]')
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta')
        metaThemeColor.name = 'theme-color'
        document.head.appendChild(metaThemeColor)
      }
      metaThemeColor.content = color
    }

    // Determine theme preference
    const savedTheme: string | null = localStorage.getItem('theme')
    const isDark: boolean = savedTheme === 'dark' || 
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    
    // Apply theme immediately
    document.documentElement.classList.toggle('dark', isDark)
    setMetaThemeColor(isDark ? THEME_COLORS.dark : THEME_COLORS.light)
    
    // Store initial theme in sessionStorage for the composable to read
    sessionStorage.setItem('__INITIAL_THEME__', isDark.toString())
  }
})