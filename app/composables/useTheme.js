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
