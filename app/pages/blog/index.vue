<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-200">
    <!-- Page Header -->
    <header class="mb-12">
      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">Blog</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        Discover valuable insights on web development, design, and more.
      </p>
    </header>

    <!-- Loading State -->
    <BlogLoadingSkeleton v-if="pending" :count="6" />

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-16">
      <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-400 dark:text-red-300 mx-auto mb-4" />
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Failed to load blog posts</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ error.message || 'Something went wrong while fetching blog posts.' }}
      </p>
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
      <div class="mb-6 opacity-0 animate-fade-in" style="animation-delay: 100ms">
        <BlogSearchBar 
          v-model:search-query="searchQuery"
          placeholder="Search blog posts..."
        />
      </div>

      <!-- Tags Filter -->
      <div 
        class="mb-12 opacity-0 animate-fade-in" 
        style="animation-delay: 200ms"
      >
        <BlogTagsFilter 
          :all-tags="allTags"
          v-model:selected-tags="selectedTags"
          @toggle-tag="onTagToggle"
          @clear-tags="onClearTags"
        />
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
            v-if="searchQuery"
            @click="clearSearch"
            class="px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/70 rounded-lg transition-colors duration-200"
          >
            Clear search
          </button>
          <button
            v-if="selectedTags.length > 0"
            @click="clearTags"
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
definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'Blog - Abdulbarry',
  description: 'Discover valuable insights on web development, design, and more.',
})

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

const searchQuery = ref('')
const selectedTags = ref<string[]>([])

const validPosts = computed(() => {
  if (!posts.value) return []
  return posts.value.filter(isValidPost)
})

const allTags = computed(() => extractTagsWithCounts(validPosts.value))

const filteredPosts = computed(() => {
  let filtered = validPosts.value
  filtered = filterPostsBySearch(filtered, searchQuery.value)
  filtered = filterPostsByTags(filtered, selectedTags.value)
  return filtered
})

const onTagToggle = () => {}
const onClearTags = () => {}
const clearSearch = () => searchQuery.value = ''
const clearTags = () => selectedTags.value = []
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