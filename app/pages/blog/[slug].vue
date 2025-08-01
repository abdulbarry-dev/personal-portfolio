<script setup lang="ts">
import { 
  formatDate, 
  calculateReadingTime, 
  getPostSlug, 
  isValidPost, 
  sortPostsByDate 
} from '~/utils/blog'

// Get the current URL slug
const route = useRoute()
const slug = route.params.slug as string

// Async data fetching with optimized logic
const { data: blogData, pending, error, refresh } = await useLazyAsyncData(`blog-data-${slug}`, async () => {
  try {
    const allPosts = await queryCollection('blog').all()
    
    // Filter and sort posts using utility functions
    const validPosts = allPosts.filter(isValidPost)
    const sortedPosts = sortPostsByDate(validPosts)
    
    const currentIndex = sortedPosts.findIndex(p => {
      const postSlug = getPostSlug(p.path)
      return postSlug === slug
    })
    
    if (currentIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }
    
    const currentPost = sortedPosts[currentIndex]
    
    // Double-check current post validity
    if (!isValidPost(currentPost)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post is empty or invalid'
      })
    }
    
    const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
    
    return {
      currentPost,
      previousPost,
      nextPost,
      totalPosts: sortedPosts.length,
      currentIndex: currentIndex + 1
    }
  } catch (err) {
    if (typeof err === 'object' && err !== null && 'statusCode' in err && (err as any).statusCode === 404) {
      throw err
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch blog post'
    })
  }
})

// Extract current post for easier access
const post = computed(() => blogData.value?.currentPost)
const previousPost = computed(() => blogData.value?.previousPost)
const nextPost = computed(() => blogData.value?.nextPost)

// Computed values using utility functions
const formattedDate = computed(() => formatDate(post.value?.date || ''))
const readingTime = computed(() => calculateReadingTime(post.value?.body?.toString() || ''))

// Set SEO Metadata
useSeoMeta({
  title: () => post.value?.title || 'Post Not Found',
  description: () => post.value?.description || 'This blog post could not be found.',
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.image || '/default-blog-image.jpg',
  twitterCard: 'summary_large_image',
})

// Progress bar for reading
const scrollProgress = ref(0)

onMounted(() => {
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    scrollProgress.value = Math.min(Math.max(progress, 0), 100)
  }

  window.addEventListener('scroll', updateScrollProgress)
  onUnmounted(() => window.removeEventListener('scroll', updateScrollProgress))
})

// Page meta
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div 
        class="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <main class="pt-8 pb-16">
      <!-- Loading State -->
      <div v-if="pending" class="w-full">
        <!-- Navigation Skeleton -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div class="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <!-- Header Skeleton -->
        <div class="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto space-y-4">
            <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-4/5 mx-auto animate-pulse"></div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/5 mx-auto animate-pulse"></div>
            <div class="h-8 bg-gray-100 dark:bg-gray-800 rounded w-64 mx-auto animate-pulse"></div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div v-for="n in 8" :key="n" class="space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center max-w-lg mx-auto px-4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <div class="w-16 h-16 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {{ error.statusCode === 404 ? 'Post Not Found' : 'Error Loading Post' }}
          </h1>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ error.statusCode === 404 
              ? "We couldn't find the blog post you were looking for or it may be empty."
              : 'Something went wrong while loading this blog post.'
            }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              v-if="error.statusCode !== 404"
              @click="refresh()"
              class="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4" />
              Try Again
            </button>
            <NuxtLink 
              to="/blog" 
              class="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4" />
              All Posts
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Success: Post Found -->
      <article v-else-if="post" class="w-full">
        <!-- Navigation -->
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <NuxtLink 
            to="/blog" 
            class="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded transition-colors"
          >
            <Icon name="heroicons:arrow-left" class="w-4 h-4" />
            <span class="font-medium">All Posts</span>
          </NuxtLink>
        </div>

        <!-- Article Header -->
        <header class="text-center mb-12 px-4 sm:px-6 lg:px-8">
          <!-- Post Counter -->
          <div class="mb-4" v-if="blogData">
            <span class="inline-flex items-center gap-2 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-full">
              <Icon name="heroicons:document-text" class="w-4 h-4" />
              Post {{ blogData.currentIndex }} of {{ blogData.totalPosts }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6 max-w-4xl mx-auto">
            {{ post.title }}
          </h1>

          <!-- Description -->
          <p v-if="post.description" class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            {{ post.description }}
          </p>

          <!-- Meta Information -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg px-6 py-3 border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
            <div class="flex items-center gap-2">
              <Icon name="heroicons:calendar-days" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <time :datetime="post.date" class="font-medium">{{ formattedDate }}</time>
            </div>
            <div class="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:clock" class="w-4 h-4 text-green-600 dark:text-green-400" />
              <span class="font-medium">{{ readingTime }}</span>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <div class="w-full">
          <div class="bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700 mb-12">
            <div class="
              prose prose-lg prose-slate dark:prose-invert px-6 sm:px-8 lg:px-12 py-16 mx-auto max-w-5xl
              
              prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-headings:leading-tight
              prose-h1:text-4xl prose-h1:mb-10 prose-h1:mt-16 prose-h1:leading-tight
              prose-h2:text-3xl prose-h2:mb-8 prose-h2:mt-14 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-3 prose-h2:leading-tight
              prose-h3:text-2xl prose-h3:mb-6 prose-h3:mt-12 prose-h3:leading-tight
              prose-h4:text-xl prose-h4:mb-5 prose-h4:mt-10 prose-h4:leading-tight
              prose-h5:text-lg prose-h5:mb-4 prose-h5:mt-8
              prose-h6:text-base prose-h6:mb-3 prose-h6:mt-6
              
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg prose-p:tracking-wide
              
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium prose-a:decoration-2
              hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 hover:prose-a:underline hover:prose-a:underline-offset-4
              
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-em:text-gray-800 dark:prose-em:text-gray-200 prose-em:font-medium
              
              prose-ul:mb-8 prose-ul:space-y-3 prose-ol:mb-8 prose-ol:space-y-3
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-3 prose-li:leading-relaxed prose-li:text-lg
              prose-li:marker:text-blue-500 dark:prose-li:marker:text-blue-400
              
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 dark:prose-blockquote:border-blue-400 
              prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 
              prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:my-10 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-blockquote:shadow-sm
              prose-blockquote:prose-p:text-blue-900 dark:prose-blockquote:prose-p:text-blue-100 prose-blockquote:prose-p:text-xl prose-blockquote:prose-p:leading-relaxed
              
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12 prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700
              
              prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-12 prose-hr:border-t-2
              
              prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-sm prose-table:my-8
              prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-6 prose-th:py-4 prose-th:font-semibold prose-th:text-left
              prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-6 prose-td:py-4 prose-td:leading-relaxed
              
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-code:font-mono prose-code:font-medium prose-code:text-gray-800 dark:prose-code:text-gray-200
              prose-code:before:content-none prose-code:after:content-none
              
              prose-pre:hidden
            ">
              <ContentRenderer :value="post" />
            </div>
          </div>
        </div>

        <!-- Blog Post Navigation Component -->
        <BlogPostNavigation 
          :previous-post="previousPost" 
          :next-post="nextPost" 
        />
      </article>
    </main>
  </div>
</template>

<style scoped>
/* Simplified link hover effects */
:deep(.prose a) {
  transition: all 0.2s ease;
}

/* YouTube video responsive wrapper */
:deep(.prose iframe[src*="youtube"]) {
  width: 100%;
  max-width: 700px;
  height: 400px;
  margin: 2rem auto;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

:deep(.dark .prose iframe[src*="youtube"]) {
  border-color: #374151;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  :deep(.prose iframe[src*="youtube"]) {
    height: 225px;
    margin: 1rem auto;
  }
}
</style>
