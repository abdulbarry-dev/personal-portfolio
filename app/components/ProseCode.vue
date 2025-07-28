<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array as () => number[],
    default: () => []
  }
})

const copied = ref(false)
const codeElement = ref<HTMLElement>()

const copyCode = async () => {
  let codeContent = props.code

  // If no code prop provided, extract from DOM element
  if (!codeContent && codeElement.value) {
    codeContent = codeElement.value.textContent || codeElement.value.innerText || ''
  }

  if (!codeContent.trim()) {
    console.warn('No code content found to copy')
    return
  }

  try {
    // Modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(codeContent.trim())
    } else {
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement('textarea')
      textArea.value = codeContent.trim()
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
    
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

const languageLabel = computed(() => {
  if (!props.language) return 'Code'
  
  const labels: Record<string, string> = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'vue': 'Vue',
    'html': 'HTML',
    'css': 'CSS',
    'bash': 'Terminal',
    'sh': 'Shell',
    'json': 'JSON',
    'yaml': 'YAML',
    'md': 'Markdown',
    'jsx': 'React',
    'tsx': 'React TypeScript',
    'python': 'Python',
    'py': 'Python',
    'sql': 'SQL',
    'php': 'PHP'
  }
  
  return labels[props.language?.toLowerCase()] || props.language?.toUpperCase() || 'Code'
})
</script>

<template>
  <div class="not-prose my-8">
    <div class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-gray-900/50 transition-colors duration-200">
      <!-- Header -->
      <div class="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
        <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          
          <!-- Language/Filename -->
          <div class="flex items-center gap-2 min-w-0">
            <span v-if="filename" class="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-mono bg-white dark:bg-gray-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-200 dark:border-gray-600 truncate">
              {{ filename }}
            </span>
            <span v-else-if="language" class="text-xs px-2 sm:px-3 py-1 sm:py-1 bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 text-white rounded-full font-medium">
              {{ languageLabel }}
            </span>
          </div>
        </div>

        <!-- Copy Button - Responsive -->
        <button
          @click="copyCode"
          class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-gray-700/80 rounded-md sm:rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-500 flex-shrink-0 transition-all duration-200"
          :class="{ 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/50 border-green-200 dark:border-green-700': copied }"
        >
          <Icon 
            v-if="copied" 
            name="heroicons:check" 
            class="w-3.5 h-3.5 sm:w-4 sm:h-4" 
          />
          <Icon 
            v-else 
            name="heroicons:clipboard-document" 
            class="w-3.5 h-3.5 sm:w-4 sm:h-4" 
          />
          <span class="font-medium hidden xs:inline sm:inline">{{ copied ? 'Copied!' : 'Copy' }}</span>
          <!-- Show abbreviated text on very small screens -->
          <span class="font-medium xs:hidden sm:hidden">{{ copied ? '✓' : '' }}</span>
        </button>
      </div>

      <!-- Code Content -->
      <div class="overflow-x-auto bg-gray-50 dark:bg-gray-900">
        <pre 
          ref="codeElement" 
          class="p-3 sm:p-4 text-xs sm:text-sm leading-relaxed text-gray-800 dark:text-gray-200 font-mono"
        ><slot /></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for code blocks */
pre::-webkit-scrollbar {
  height: 6px;
}

@media (min-width: 640px) {
  pre::-webkit-scrollbar {
    height: 8px;
  }
}

pre::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600;
  border-radius: 4px;
}

pre::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* Enhanced syntax highlighting for both themes */
pre code {
  background: transparent;
  @apply text-gray-800 dark:text-gray-200;
}

/* Ensure code content is properly formatted */
pre {
  white-space: pre;
  word-wrap: normal;
  overflow-x: auto;
}

/* Make sure the copy button doesn't affect code selection */
button {
  user-select: none;
}

/* Custom responsive breakpoint for extra small screens */
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
  .xs\:hidden {
    display: none;
  }
}

/* Dark mode specific enhancements */
.dark pre {
  color-scheme: dark;
}

/* Ensure proper contrast in dark mode */
.dark .bg-gradient-to-r.from-gray-50.to-gray-100 {
  background: linear-gradient(to right, rgb(55 65 81), rgb(75 85 99));
}
</style>