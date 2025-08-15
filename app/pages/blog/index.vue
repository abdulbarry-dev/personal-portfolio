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
// Enhanced SEO for blog listing page
const { setPageMeta, setBreadcrumbs, setStructuredData } = useSEO()

definePageMeta({
  layout: 'default'
})

// Set comprehensive SEO meta
setPageMeta({
  title: 'Abdulbarry - Blog',
  description: 'Discover valuable insights on Vue.js, Nuxt.js, TypeScript, web performance, and modern frontend development techniques. Learn from real-world experience.',
  keywords: 'Vue.js Blog, Nuxt.js Tutorials, TypeScript Guide, Frontend Development Blog, Web Performance Tips, JavaScript Best Practices',
  ogTitle: 'Abdulbarry - Web Development Blog',
  ogDescription: 'In-depth articles about Vue.js, Nuxt.js, and modern web development practices.',
  ogImage: '/images/blog-og.jpg',
  ogType: 'website'
})

// Set breadcrumbs
setBreadcrumbs([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' }
])

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

// Add blog structured data when posts are loaded
watch(validPosts, (posts) => {
  if (posts && posts.length > 0) {
    const blogData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Abdulbarry Blog',
      description: 'Web development insights and tutorials',
      url: 'https://abdulbarry.dev/blog',
      author: {
        '@type': 'Person',
        name: 'Abdulbarry Guenichi'
      },
      blogPost: posts.slice(0, 10).map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `https://abdulbarry.dev/blog/${getPostSlug(post.path)}`,
        author: {
          '@type': 'Person',
          name: 'Abdulbarry Guenichi'
        }
      }))
    }
    
    setStructuredData(blogData)
  }
}, { immediate: true })

const onTagToggle = () => {}
const onClearTags = () => {}
const clearSearch = () => searchQuery.value = ''
const clearTags = () => selectedTags.value = []
</script>