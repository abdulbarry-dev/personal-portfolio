<script setup lang="ts">
interface Props {
  searchQuery: string
  placeholder?: string
}

interface Emits {
  (e: 'update:searchQuery', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search posts...'
})

const emit = defineEmits<Emits>()

// Local reactive value synced with parent
const query = computed({
  get: () => props.searchQuery,
  set: (value: string) => emit('update:searchQuery', value)
})
</script>

<template>
  <div class="relative">
    <input
      v-model="query"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
    />
    <Icon 
      name="heroicons:magnifying-glass" 
      class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" 
    />
  </div>
</template>
