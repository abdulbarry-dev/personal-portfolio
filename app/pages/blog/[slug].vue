<script setup lang="ts">
// Get the current URL slug
const route = useRoute()
const slug = route.params.slug as string

// Async data fetching with Nuxt 4 features
const { data: post, pending, error, refresh } = await useLazyAsyncData(`blog-post-${slug}`, async () => {
  try {
    const posts = await queryCollection('blog').all()
    const foundPost = posts.find(p => {
      const postSlug = p.path?.split('/').pop()
      return postSlug === slug
    })
    
    if (!foundPost) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Blog post not found'
      })
    }
    
    return foundPost
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

// Set SEO Metadata
useSeoMeta({
  title: () => post.value?.title || 'Post Not Found',
  description: () => post.value?.description || 'This blog post could not be found.',
  ogTitle: () => post.value?.title,
  ogDescription: () => post.value?.description,
  ogImage: () => post.value?.image || '/default-blog-image.jpg',
  twitterCard: 'summary_large_image',
})

// Helper functions
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const calculateReadingTime = (content: string) => {
  if (!content) return '5 min read'
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Progress bar for reading
const scrollProgress = ref(0)

onMounted(() => {
  const updateScrollProgress = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = (scrollTop / docHeight) * 100
    scrollProgress.value = Math.min(Math.max(progress, 0), 100)
  }

  window.addEventListener('scroll', updateScrollProgress)
  onUnmounted(() => window.removeEventListener('scroll', updateScrollProgress))
})

// Share functionality
const shareOnTwitter = () => {
  if (post.value) {
    const url = window.location.href
    const text = `Check out this article: ${post.value.title}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    console.log('Link copied to clipboard!')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

// Page meta
definePageMeta({
  layout: 'default'
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
    <!-- Reading Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
      <div 
        class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 transition-all duration-150 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <main class="pt-8 pb-16">
      <!-- Loading State -->
      <div v-if="pending" class="w-full">
        <!-- Navigation Skeleton -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div class="w-32 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        <!-- Header Skeleton -->
        <div class="text-center mb-8 px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto space-y-4">
            <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse"></div>
            <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto animate-pulse"></div>
            <div class="h-10 bg-gray-100 dark:bg-gray-800 rounded-lg w-80 mx-auto animate-pulse"></div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-b border-gray-200/50 dark:border-gray-700/50 py-12">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div v-for="n in 8" :key="n" class="space-y-3">
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center max-w-lg mx-auto px-4">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 sm:p-12">
          <div class="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
            <Icon name="heroicons:exclamation-triangle" class="w-10 h-10 text-red-500 dark:text-red-400" />
          </div>
          
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {{ error.statusCode === 404 ? 'Post Not Found' : 'Error Loading Post' }}
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {{ error.statusCode === 404 
              ? "We couldn't find the blog post you were looking for. It might have been moved or deleted."
              : 'Something went wrong while loading this blog post. Please try again.'
            }}
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              v-if="error.statusCode !== 404"
              @click="refresh()"
              class="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-medium rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
            >
              <Icon name="heroicons:arrow-path" class="w-4 h-4" />
              Try Again
            </button>
            <NuxtLink 
              to="/blog" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 text-white font-medium rounded-full hover:from-blue-600 hover:to-indigo-700 dark:hover:from-blue-500 dark:hover:to-indigo-600 transition-all duration-200"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4" />
              All Posts
            </NuxtLink>
            <NuxtLink 
              to="/" 
              class="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-200"
            >
              <Icon name="heroicons:home" class="w-4 h-4" />
              Home
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Success: Post Found -->
      <article v-else-if="post" class="w-full opacity-0 animate-fade-in">
        <!-- Navigation Container -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-8">
            <NuxtLink 
              to="/blog" 
              class="group inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-600 rounded-full transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span class="font-medium">Back to Blog</span>
            </NuxtLink>
          </nav>
        </div>

        <!-- Article Header - Full Width -->
        <header class="text-center mb-8 px-4 sm:px-6 lg:px-8">
          <!-- Title -->
          <h1 class="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6 max-w-6xl mx-auto">
            {{ post.title }}
          </h1>

          <!-- Description -->
          <p v-if="post.description" class="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-4xl mx-auto">
            {{ post.description }}
          </p>

          <!-- Meta Information -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-sm text-gray-600 dark:text-gray-400 bg-gray-50/80 dark:bg-gray-800/80 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700">
            <div class="flex items-center gap-2">
              <Icon name="heroicons:calendar-days" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <time :datetime="post.date" class="font-medium">{{ formatDate(post.date) }}</time>
            </div>
            <div class="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600"></div>
            <div class="flex items-center gap-2">
              <Icon name="heroicons:clock" class="w-4 h-4 text-green-600 dark:text-green-400" />
              <span class="font-medium">{{ calculateReadingTime(post.body?.toString() || '') }}</span>
            </div>
          </div>
        </header>

        <!-- Content Container - Full Width -->
        <div class="w-full">
          <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-b border-gray-200/50 dark:border-gray-700/50 overflow-hidden mb-12">
            <!-- Article Content -->
            <div class="prose prose-lg prose-slate dark:prose-invert max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-12 lg:py-16
              prose-headings:text-gray-900 dark:prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:leading-tight prose-h1:max-w-4xl prose-h1:mx-auto
              prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700 prose-h2:pb-3 prose-h2:max-w-5xl prose-h2:mx-auto
              prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:max-w-5xl prose-h3:mx-auto
              prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-6 prose-h4:max-w-5xl prose-h4:mx-auto
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:max-w-4xl prose-p:mx-auto
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
              prose-em:text-gray-800 dark:prose-em:text-gray-200 prose-em:italic
              prose-ul:mb-6 prose-ul:pl-6 prose-ul:max-w-4xl prose-ul:mx-auto
              prose-ol:mb-6 prose-ol:pl-6 prose-ol:max-w-4xl prose-ol:mx-auto
              prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:mb-2 prose-li:leading-relaxed
              prose-li:marker:text-blue-500 dark:prose-li:marker:text-blue-400
              prose-blockquote:border-l-4 prose-blockquote:border-blue-400 dark:prose-blockquote:border-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-50 prose-blockquote:to-indigo-50 dark:prose-blockquote:from-blue-900/20 dark:prose-blockquote:to-indigo-900/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:rounded-r-xl prose-blockquote:shadow-sm prose-blockquote:max-w-4xl prose-blockquote:mx-auto
              prose-blockquote:prose-p:text-blue-900 dark:prose-blockquote:prose-p:text-blue-100 prose-blockquote:prose-p:mb-0 prose-blockquote:prose-p:font-medium
              prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-700 prose-img:my-8 prose-img:max-w-5xl prose-img:mx-auto
              prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-12 prose-hr:max-w-4xl prose-hr:mx-auto
              prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600 prose-table:my-8 prose-table:rounded-lg prose-table:overflow-hidden prose-table:max-w-5xl prose-table:mx-auto
              prose-th:bg-gradient-to-r prose-th:from-gray-50 prose-th:to-gray-100 dark:prose-th:from-gray-800 dark:prose-th:to-gray-700 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:px-4 prose-th:py-3 prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-white
              prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-3 prose-td:bg-white dark:prose-td:bg-gray-800
            ">
              <ContentRenderer :value="post" />
            </div>
          </div>
        </div>

        <!-- Navigation Footer - Full Width -->
        <footer class="border-t border-gray-200 dark:border-gray-700 pt-8 px-4 sm:px-6 lg:px-8">
          <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <NuxtLink 
              to="/blog" 
              class="group inline-flex items-center gap-2 px-6 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full transition-all duration-200 hover:shadow-md hover:bg-white dark:hover:bg-gray-700"
            >
              <Icon name="heroicons:arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span class="font-medium">All Posts</span>
            </NuxtLink>
            
            <div class="flex items-center gap-4">
              <span class="text-sm text-gray-500 dark:text-gray-400">Share this article:</span>
              <div class="flex gap-2">
                <button 
                  @click="shareOnTwitter" 
                  class="p-2 text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-full transition-colors"
                  title="Share on Twitter"
                >
                  <Icon name="heroicons:share" class="w-5 h-5" />
                </button>
                <button 
                  @click="copyLink" 
                  class="p-2 text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/50 rounded-full transition-colors"
                  title="Copy link"
                >
                  <Icon name="heroicons:link" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </main>
  </div>
</template>

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

/* Custom scrollbar for the entire page */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-sm;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

/* Enhanced focus states for accessibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>