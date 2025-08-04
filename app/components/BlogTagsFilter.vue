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
  'tag-button',
  isTagSelected(tag) ? 'tag-button-selected' : 'tag-button-unselected'
]
</script>

<template>
  <div 
    v-if="allTags.size > 0" 
    class="tags-filter-container"
  >
    <span class="tags-filter-label">
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
      class="clear-all-button"
      title="Clear all tag filters"
    >
      Clear all
    </button>
  </div>
</template>

<style scoped>
@import './../assets/css/BlogTagsFilter.css';
</style>
