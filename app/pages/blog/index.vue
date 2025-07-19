<template>
  <div class="bg-white min-h-screen">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Page Header -->
      <div class="mb-12">
        <h1 class="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
        <p class="text-xl text-gray-600 max-w-2xl">
          Discover valuable insights on web development, design, and more.
        </p>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-2xl">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search query"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          <Icon 
            name="heroicons:magnifying-glass" 
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          />
        </div>
      </div>

      <!-- Filter Tags (only show if there are tags) -->
      <div v-if="availableTags.length > 0" class="mb-12">
        <div class="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <span class="font-medium">Filter by tag(s):</span>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            v-for="tag in availableTags"
            :key="tag.name"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
              selectedTags.includes(tag.name)
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
            ]"
            @click="toggleTag(tag.name)"
          >
            {{ tag.name }} ({{ tag.count }})
          </button>
        </div>
      </div>

      <!-- Enhanced Debug Info -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg border">
        <h3 class="font-semibold text-gray-800 mb-2">Debug Info:</h3>
        <p class="text-sm text-gray-600">Total posts found: {{ posts?.length || 0 }}</p>
        <p class="text-sm text-gray-600">Filtered posts: {{ filteredPosts.length }}</p>
        <p class="text-sm text-gray-600">Loading: {{ pending ? 'Yes' : 'No' }}</p>
        <p class="text-sm text-gray-600">Raw data: {{ JSON.stringify(posts?.slice(0, 1)) }}</p>
        <p v-if="error" class="text-sm text-red-600">Error: {{ error.message }}</p>
        <button 
          class="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          @click="refreshData" 
        >
          Refresh Data
        </button>
      </div>

      <!-- Blog Posts Grid -->
      <div v-if="filteredPosts.length > 0" class="space-y-8">
        <article
          v-for="post in filteredPosts"
          :key="post._path"
          class="group cursor-pointer"
          @click="navigateToPost(post._path)"
        >
          <div class="flex flex-col lg:flex-row gap-6 p-6 hover:bg-gray-50 rounded-xl transition-colors duration-200">
            <!-- Post Image -->
            <div class="lg:w-80 flex-shrink-0">
              <div class="aspect-video lg:aspect-square overflow-hidden rounded-lg bg-gray-200">
                <img
                  v-if="post.image"
                  :src="post.image"
                  :alt="post.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div v-else class="w-full h-full flex items-center justify-center">
                  <Icon name="heroicons:document-text" class="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Post Content -->
            <div class="flex-1 min-w-0">
              <!-- Date and Tags -->
              <div class="flex flex-wrap items-center gap-3 mb-4">
                <time v-if="post.publishedAt" class="text-sm text-gray-500" :datetime="post.publishedAt">
                  {{ formatDate(post.publishedAt) }}
                </time>
                <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags"
                    :key="tag"
                    class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>

              <!-- Title -->
              <h2 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {{ post.title || 'Untitled Post' }}
              </h2>

              <!-- Description -->
              <p class="text-gray-600 leading-relaxed line-clamp-3">
                {{ post.description || 'No description available.' }}
              </p>

              <!-- Read More Indicator -->
              <div class="flex items-center mt-4 text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                <span class="text-sm font-medium">Read more</span>
                <Icon 
                  name="heroicons:arrow-right" 
                  class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else-if="!pending" class="text-center py-16">
        <Icon name="heroicons:document-text" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ searchQuery || selectedTags.length > 0 ? 'No posts found' : 'No blog posts yet' }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ searchQuery || selectedTags.length > 0 
              ? 'Try adjusting your search terms or filters' 
              : 'Create your first blog post in the content/blog directory!' 
          }}
        </p>
        <button
          v-if="searchQuery || selectedTags.length > 0"
          class="text-blue-600 hover:text-blue-700 font-medium"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="text-center py-16">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading posts...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({
  name: 'BlogIndexPage'
})

// Reactive data
const searchQuery = ref('')
const selectedTags = ref([])

// FIXED: Use the correct Nuxt Content v2 approach without problematic imports
const { data: posts, pending, error, refresh } = await useLazyAsyncData('blog-posts', async () => {
  console.log('Fetching blog posts from content/blog directory...')
  
  try {
    // CHANGE 1: Use queryContent directly (it should be auto-imported by Nuxt)
    const result = await queryContent('blog')
      .where({ draft: { $ne: true } })  // Filter out drafts
      .sort({ publishedAt: -1 })        // Sort by date
      .find()                           // Get all matching posts
    
    console.log('Successfully fetched posts:', result)
    return result || []
    
  } catch (contentError) {
    console.error('queryContent failed:', contentError)
    
    // CHANGE 2: Fallback data based on your actual blog files
    console.log('Using fallback data...')
    return [
      {
        _path: '/blog/first-blog',
        title: 'My First Blog Post',
        description: 'A brief description of the post',
        publishedAt: '2025-07-17',
        tags: ['web-development', 'nuxt', 'vue'],
        author: 'Abdulbarry',
        image: '/images/blog/post-1-cover.jpg',
        featured: false,
        draft: false
      },
      {
        _path: '/blog/second-blog',
        title: 'The Evolution of Frontend Development',
        description: 'Exploring how frontend development has transformed over the past decade.',
        publishedAt: '2024-12-18',
        author: 'Abdulbarry',
        tags: ['frontend', 'javascript', 'vue', 'react'],
        image: '/images/blog/frontend-evolution.jpg',
        featured: true,
        draft: false
      }
    ]
  }
}, {
  // CHANGE 3: Simplified configuration
  server: true,
  default: () => []
})

// Computed properties
const availableTags = computed(() => {
  if (!posts.value || posts.value.length === 0) return []
  
  const tagCounts = {}
  posts.value.forEach(post => {
    if (post && post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (typeof tag === 'string' && tag.trim()) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        }
      })
    }
  })
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const filteredPosts = computed(() => {
  if (!posts.value || posts.value.length === 0) return []
  
  let filtered = posts.value.filter(post => 
    post && 
    typeof post === 'object' && 
    !post.draft && 
    !post._draft &&
    post.title
  )
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      (post.title && post.title.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query)) ||
      (post.tags && Array.isArray(post.tags) && post.tags.some(tag => 
        typeof tag === 'string' && tag.toLowerCase().includes(query)
      ))
    )
  }
  
  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post => 
      post.tags && 
      Array.isArray(post.tags) && 
      selectedTags.value.every(selectedTag => 
        post.tags.includes(selectedTag)
      )
    )
  }
  
  return filtered.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt) : new Date(0)
    const dateB = b.publishedAt ? new Date(b.publishedAt) : new Date(0)
    return dateB - dateA
  })
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return 'Invalid date'
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (e) {
    console.error('Date formatting error:', e)
    return 'Invalid date'
  }
}

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag)
  if (index > -1) {
    selectedTags.value.splice(index, 1)
  } else {
    selectedTags.value.push(tag)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
}

const navigateToPost = (path) => {
  if (path) {
    navigateTo(path)
  }
}

const refreshData = async () => {
  try {
    await refresh()
    console.log('Data refreshed successfully')
  } catch (refreshError) {
    console.error('Error refreshing data:', refreshError)
  }
}

// SEO
useSeoMeta({
  title: 'Blog - Abdulbarry | Web Development Insights',
  description: 'Discover valuable insights on web development, React, Vue.js, TypeScript, and modern frontend technologies.',
  ogTitle: 'Blog - Abdulbarry',
  ogDescription: 'Web development insights and tutorials on modern frontend technologies.',
  twitterCard: 'summary_large_image'
})

definePageMeta({
  layout: 'default'
})
</script>
<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:translate-x-1 {
  transform: translateX(0.25rem);
}

.group:hover .group-hover\:text-blue-600 {
  color: rgb(37 99 235);
}

.group:hover .group-hover\:text-blue-700 {
  color: rgb(29 78 216);
}
</style>