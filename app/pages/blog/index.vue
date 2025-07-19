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

// Alternative approach using Nuxt's built-in content API
const { data: posts, pending, error, refresh } = await useLazyAsyncData('blog-posts', async () => {
  console.log('Attempting to fetch blog posts using alternative method...')
  
  try {
    // Method 1: Use the content API directly
    console.log('Trying content API...')
    const response = await $fetch('/api/_content/query', {
      method: 'POST',
      body: {
        first: false,
        where: [
          { _path: { $regex: '^/blog' } },
          { _draft: { $ne: true } }
        ],
        sort: [{ publishedAt: -1 }]
      }
    })
    console.log('Content API response:', response)
    
    if (response && response.length > 0) {
      return response
    }
    
    // Method 2: Try a simpler API call
    const simpleResponse = await $fetch('/api/_content/query', {
      method: 'POST',
      body: {
        first: false
      }
    })
    console.log('Simple API response:', simpleResponse)
    
    // Filter for blog posts
    const blogPosts = simpleResponse.filter(item => 
      item._path && item._path.startsWith('/blog') && !item._draft
    )
    console.log('Filtered blog posts:', blogPosts)
    
    return blogPosts
    
  } catch (e) {
    console.error('Error fetching content via API:', e)
    
    // Method 3: Try using useContentQuery if available
    try {
      console.log('Trying useContentQuery...')
      const { data } = await useContentQuery()
      console.log('useContentQuery result:', data)
      
      if (data.value) {
        const blogPosts = data.value.filter(item => 
          item._path && item._path.startsWith('/blog') && !item._draft
        )
        return blogPosts
      }
    } catch (queryError) {
      console.error('useContentQuery also failed:', queryError)
    }
    
    return []
  }
}, {
  server: true,
  default: () => []
})

// Computed properties
const availableTags = computed(() => {
  if (!posts.value || posts.value.length === 0) return []
  
  const tagCounts = {}
  posts.value.forEach(post => { 
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

const filteredPosts = computed(() => {
  if (!posts.value || posts.value.length === 0) return []
  
  let filtered = [...posts.value].filter(post => !post.draft && !post._draft)
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      (post.title && post.title.toLowerCase().includes(query)) ||
      (post.description && post.description.toLowerCase().includes(query)) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(query)))
    )
  }
  
  // Filter by selected tags
  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post => 
      post.tags && Array.isArray(post.tags) && selectedTags.value.every(selectedTag => 
        post.tags.includes(selectedTag)
      )
    )
  }
  
  return filtered.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return 'No date'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (e) {
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
  navigateTo(path)
}

const refreshData = () => {
  refresh()
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