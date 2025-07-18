/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue"
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'border-radius': 'border-radius 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
        'border-radius': {
          '0%, 100%': {
            'border-radius': '20px',
          },
          '25%': {
            'border-radius': '30px 20px 20px 30px',
          },
          '50%': {
            'border-radius': '20px',
          },
          '75%': {
            'border-radius': '20px 30px 30px 20px',
          },
        },
      },
    },
  },
  plugins: [],
}

