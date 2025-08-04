<script setup lang="ts">
interface Props {
  searchQuery: string
  placeholder?: string
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

// Local reactive value synced with parent
const query = computed({
  get: () => props.searchQuery,
  set: (value: string) => emit('update:searchQuery', value)
})
</script>

<template>
  <div class="search-container">
    <input
      v-model="query"
      type="text"
      class="search-input"
      :placeholder="props.placeholder ?? 'Search posts...'"
    />
    <Icon 
      name="heroicons:magnifying-glass" 
      class="search-icon" 
    />
  </div>
</template>

<style scoped>
@import './../assets/css/BlogSearchBar.css';
</style>
