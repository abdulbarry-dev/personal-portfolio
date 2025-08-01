<script setup lang="ts">
interface Props {
  allTags: Map<string, number>
  selectedTags: string[]
}

interface Emits {
  (e: 'update:selectedTags', tags: string[]): void
  (e: 'toggle-tag', tag: string): void
  (e: 'clear-tags'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

/**
 * Toggle a tag selection
 */
const toggleTag = (tag: string) => {
  const currentTags = [...props.selectedTags]
  const index = currentTags.indexOf(tag)
  
  if (index > -1) {
    currentTags.splice(index, 1)
  } else {
    currentTags.push(tag)
  }
  
  emit('update:selectedTags', currentTags)
  emit('toggle-tag', tag)
}

/**
 * Clear all selected tags
 */
const clearAllTags = () => {
  emit('update:selectedTags', [])
  emit('clear-tags')
}

/**
 * Check if a tag is currently selected
 */
const isTagSelected = (tag: string) => props.selectedTags.includes(tag)

/**
 * Get button classes for a tag
 */
const getTagButtonClasses = (tag: string) => [
  'px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105',
  isTagSelected(tag)
    ? 'bg-blue-600 dark:bg-blue-500 text-white'
    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
]
</script>

<template>
  <div 
    v-if="allTags.size > 0" 
    class="flex items-center flex-wrap gap-2"
  >
    <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
      Filter by tag(s):
    </span>
    
    <!-- Tag Buttons -->
    <button
      v-for="[tag, count] in allTags"
      :key="tag"
      :class="getTagButtonClasses(tag)"
      @click="toggleTag(tag)"
      :aria-pressed="isTagSelected(tag)"
      :title="`Filter by ${tag} (${count} posts)`"
    >
      {{ tag }} ({{ count }})
    </button>
    
    <!-- Clear All Tags Button -->
    <button
      v-if="selectedTags.length > 0"
      @click="clearAllTags"
      class="px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/70 rounded-full transition-colors duration-200"
      title="Clear all tag filters"
    >
      Clear all
    </button>
  </div>
</template>
