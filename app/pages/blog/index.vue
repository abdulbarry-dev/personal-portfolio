<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
    <!-- Page Header -->
    <div class="mb-12">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Discover valuable insights on web development, design, and more.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-8">
      <!-- Search Bar Skeleton -->
      <div class="relative">
        <div class="w-full h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
      
      <!-- Tags Skeleton -->
      <div class="flex items-center flex-wrap gap-2">
        <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div v-for="n in 4" :key="n" class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>
      
      <!-- Blog Cards Skeleton -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
            <div class="h-48 bg-gray-300 dark:bg-gray-600"></div>
            <div class="p-6 space-y-3">
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
              <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              <div class="flex gap-2 mt-4">
                <div class="h-6 w-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div class="h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-400 dark:text-red-300 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load blog posts</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">{{ error.message || 'Something went wrong while fetching blog posts.' }}</p>
      <button 
        @click="refresh()" 
        class="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
      >
        <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
        Try Again
      </button>
    </div>

    <!-- Content Loaded -->
    <div v-else>
      <!-- Search Bar -->
      <div class="relative mb-6 opacity-0 animate-fade-in" style="animation-delay: 100ms">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search blog posts..."
          class="w-full pl-4 pr-10 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200"
        />
        <Icon name="heroicons:magnifying-glass" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      </div>

      <!-- Tags Filter -->
      <div 
        v-if="allTags.size > 0" 
        class="flex items-center flex-wrap gap-2 mb-12 opacity-0 animate-fade-in" 
        style="animation-delay: 200ms"
      >
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Filter by tag(s):</span>
        <button
          v-for="[tag, count] in allTags"
          :key="tag"
          @click="toggleTag(tag)"
          :class=" [
            'px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105',
            selectedTags.includes(tag)
              ? 'bg-blue-600 dark:bg-blue-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          ]"
        >
          {{ tag }} ({{ count }})
        </button>
        
        <!-- Clear Filters Button -->
        <button
          v-if="selectedTags.length > 0"
          @click="selectedTags = []"
          class="px-3 py-1 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/70 rounded-full transition-colors duration-200"
        >
          Clear all
        </button>
      </div>

      <!-- Blog Posts Grid -->
      <div v-if="filteredPosts.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        <div
          v-for="(post, index) in filteredPosts"
          :key="post.path || post.id"
          class="opacity-0 animate-fade-in hover:transform hover:scale-[1.02] transition-all duration-300 flex"
          :style="{ animationDelay: `${300 + index * 100}ms` }"
        >
          <BlogCard :post="post" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16 opacity-0 animate-fade-in" style="animation-delay: 300ms">
        <Icon name="heroicons:document-magnifying-glass" class="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No blog posts found</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ searchQuery || selectedTags.length > 0 
            ? 'Try adjusting your search criteria or filters.' 
            : 'Check back later for new content!' 
          }}
        </p>
        
        <!-- Reset Filters Button -->
        <div v-if="searchQuery || selectedTags.length > 0" class="flex justify-center gap-4">
          <button
            @click="searchQuery = ''"
            v-if="searchQuery"
            class="px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/70 rounded-lg transition-colors duration-200"
          >
            Clear search
          </button>
          <button
            @click="selectedTags = []"
            v-if="selectedTags.length > 0"
            class="px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/70 rounded-lg transition-colors duration-200"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Async data fetching with Nuxt 4 features
const { data: posts, pending, error, refresh } = await useLazyAsyncData('blog-posts', async () => {
  try {
    const blogPosts = await queryCollection('blog').all()
    return blogPosts
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog posts'
    })
  }
})

// Reactive search and filter state
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

// Computed properties
const validPosts = computed(() => {
  if (!posts.value) return []
  return posts.value.filter(post => post && post.title && post.path)
})

const allTags = computed(() => {
  const tags = new Map<string, number>()
  validPosts.value.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tags.set(tag, (tags.get(tag) || 0) + 1)
      })
    }
  })
  return tags
})

const filteredPosts = computed(() => {
  let filtered = validPosts.value

  // Apply search filter
  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      (post.description && post.description.toLowerCase().includes(lowerCaseQuery)) ||
      (post.body && JSON.stringify(post.body).toLowerCase().includes(lowerCaseQuery))
    )
  }

  // Apply tag filters
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post =>
      post.tags && post.tags.some(tag => selectedTags.value.includes(tag))
    )
  }

  return filtered
})

// Methods
const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

// Page meta
definePageMeta({
  layout: 'default'
})

// SEO
useSeoMeta({
  title: 'Blog - Abdulbarry',
  description: 'Discover valuable insights on web development, design, and more.',
})
</script>

<style scoped>
/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* Pulse animation for loading skeletons */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>