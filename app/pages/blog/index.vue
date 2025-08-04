<template>
  <div class="blog-list-page">
    <!-- Page Header -->
    <header class="blog-header">
      <h1 class="blog-title">Blog</h1>
      <p class="blog-subtitle">
        Discover valuable insights on web development, design, and more.
      </p>
    </header>

    <!-- Loading State -->
    <BlogLoadingSkeleton v-if="pending" :count="6" />

    <!-- Error State -->
    <div v-else-if="error" class="blog-error-state">
      <Icon name="heroicons:exclamation-triangle" class="blog-error-icon" />
      <h3 class="blog-error-title">Failed to load blog posts</h3>
      <p class="blog-error-message">
        {{ error.message || 'Something went wrong while fetching blog posts.' }}
      </p>
      <button 
        @click="refresh()" 
        class="blog-error-retry-button"
      >
        <Icon name="heroicons:arrow-path" class="blog-error-retry-icon" />
        Try Again
      </button>
    </div>

    <!-- Content Loaded -->
    <div v-else>
      <!-- Search Bar -->
      <div class="blog-search-section">
        <BlogSearchBar 
          v-model:search-query="searchQuery"
          placeholder="Search blog posts..."
        />
      </div>

      <!-- Tags Filter -->
      <div class="blog-tags-section">
        <BlogTagsFilter 
          :all-tags="allTags"
          v-model:selected-tags="selectedTags"
          @toggle-tag="onTagToggle"
          @clear-tags="onClearTags"
        />
      </div>

      <!-- Blog Posts Grid - Flexible and Responsive -->
      <div v-if="filteredPosts.length" class="blog-posts-grid">
        <div
          v-for="(post, index) in filteredPosts"
          :key="post.path || post.id"
          class="blog-post-item"
          :style="{ animationDelay: `${300 + index * 100}ms` }"
        >
          <BlogCard :post="post" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="blog-empty-state">
        <Icon name="heroicons:document-magnifying-glass" class="blog-empty-icon" />
        <h3 class="blog-empty-title">No blog posts found</h3>
        <p class="blog-empty-message">
          {{ searchQuery || selectedTags.length > 0 
            ? 'Try adjusting your search criteria or filters.' 
            : 'Check back later for new content!' 
          }}
        </p>
        
        <!-- Reset Filters Button -->
        <div v-if="searchQuery || selectedTags.length > 0" class="blog-reset-filters">
          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="blog-reset-button"
          >
            Clear search
          </button>
          <button
            v-if="selectedTags.length > 0"
            @click="clearTags"
            class="blog-reset-button"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './../../assets/css/BlogList.css';
</style>

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