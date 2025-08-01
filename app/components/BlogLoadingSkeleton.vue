<script setup lang="ts">
interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 6
})
</script>

<template>
  <div class="space-y-8">
    <!-- Search Bar Skeleton -->
    <div class="relative">
      <div class="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    </div>
    
    <!-- Tags Skeleton -->
    <div class="flex items-center flex-wrap gap-2">
      <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      <div v-for="n in 4" :key="n" class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
    </div>
    
    <!-- Blog Cards Skeleton Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <div 
        v-for="n in count" 
        :key="n" 
        class="animate-pulse"
      >
        <div class="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
          <!-- Card Header -->
          <div class="p-6 sm:p-8 space-y-4">
            <!-- Date and Reading Time Badges -->
            <div class="flex space-x-3">
              <div class="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div class="h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
            
            <!-- Title -->
            <div class="space-y-2">
              <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
            
            <!-- Description -->
            <div class="space-y-2">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
            </div>
            
            <!-- Tags -->
            <div class="flex gap-2 pt-4 border-t border-gray-300 dark:border-gray-600">
              <div class="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div class="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
