<template>
  <div class="blog-page">
    <!-- Reading Progress Bar -->
    <div class="reading-progress-container">
      <div 
        class="reading-progress-bar"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>

    <main class="blog-main">
      <!-- Loading State -->
      <div v-if="pending" class="blog-skeleton-container">
        <!-- Navigation Skeleton -->
        <div class="blog-skeleton-nav">
          <div class="blog-skeleton-nav-item"></div>
        </div>

        <!-- Header Skeleton -->
        <div class="blog-skeleton-header">
          <div class="blog-skeleton-header-content">
            <div class="blog-skeleton-title"></div>
            <div class="blog-skeleton-subtitle"></div>
            <div class="blog-skeleton-meta"></div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <div class="blog-skeleton-content">
          <div v-for="n in 8" :key="n" class="blog-skeleton-paragraph">
            <div class="blog-skeleton-line full"></div>
            <div class="blog-skeleton-line five-sixths"></div>
            <div class="blog-skeleton-line four-fifths"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="blog-error-container">
        <div class="blog-error-card">
          <div class="blog-error-icon-container">
            <Icon name="heroicons:exclamation-triangle" class="blog-error-icon" />
          </div>
          
          <h1 class="blog-error-title">
            {{ error.statusCode === 404 ? 'Post Not Found' : 'Error Loading Post' }}
          </h1>
          <p class="blog-error-message">
            {{ error.statusCode === 404 
              ? "We couldn't find the blog post you were looking for or it may be empty."
              : 'Something went wrong while loading this blog post.'
            }}
          </p>
          
          <div class="blog-error-actions">
            <button
              v-if="error.statusCode !== 404"
              @click="refresh()"
              class="blog-error-button"
            >
              <Icon name="heroicons:arrow-path" class="blog-error-button-icon" />
              Try Again
            </button>
            <NuxtLink 
              to="/blog" 
              class="blog-error-button"
            >
              <Icon name="heroicons:arrow-left" class="blog-error-button-icon" />
              All Posts
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Success: Post Found -->
      <article v-else-if="post" class="blog-article">
        <!-- Navigation -->
        <div class="blog-nav">
          <NuxtLink 
            to="/blog" 
            class="blog-nav-link"
          >
            <Icon name="heroicons:arrow-left" class="blog-nav-icon" />
            <span class="blog-nav-text">All Posts</span>
          </NuxtLink>
        </div>

        <!-- Article Header -->
        <header class="blog-header">
          <!-- Post Counter -->
          <div class="blog-post-counter" v-if="blogData">
            <span class="blog-post-counter-badge">
              <Icon name="heroicons:document-text" class="blog-post-counter-icon" />
              Post {{ blogData.currentIndex }} of {{ blogData.totalPosts }}
            </span>
          </div>

          <!-- Title -->
          <h1 class="blog-title">
            {{ post.title }}
          </h1>

          <!-- Description -->
          <p v-if="post.description" class="blog-description">
            {{ post.description }}
          </p>

          <!-- Meta Information -->
          <div class="blog-meta">
            <div class="blog-meta-item">
              <Icon name="heroicons:calendar-days" class="blog-meta-icon date" />
              <time :datetime="post.date" class="blog-meta-text">{{ formattedDate }}</time>
            </div>
            <div class="blog-meta-divider"></div>
            <div class="blog-meta-item">
              <Icon name="heroicons:clock" class="blog-meta-icon time" />
              <span class="blog-meta-text">{{ readingTime }}</span>
            </div>
          </div>
        </header>

        <!-- Article Content -->
        <div class="blog-content-wrapper">
          <div class="blog-content-container">
            <div class="blog-prose">
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

<script setup lang="ts">
// Enhanced SEO for individual blog posts
const { setPageMeta, setOpenGraph, setTwitterCard, setArticleStructuredData, setBreadcrumbs } = useSEO()

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

// Handle 404 errors by redirecting to home page with notification
const { addNotification } = useNotifications()

watch(error, (currentError) => {
  if (currentError && currentError.statusCode === 404) {
    addNotification({
      type: 'warning',
      title: 'Blog Post Not Found',
      message: `The blog post "${slug}" does not exist or may have been removed. You've been redirected to the home page.`,
      duration: 7000
    })
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      navigateTo('/home', { replace: true })
    }, 2000)
  }
}, { immediate: true })

// Computed values using utility functions
const formattedDate = computed(() => formatDate(post.value?.date || ''))
const readingTime = computed(() => calculateReadingTime(post.value?.body?.toString() || ''))

// Enhanced SEO for blog posts
watch(post, (currentPost) => {
  if (currentPost) {
    const postImage = currentPost.image || '/images/blog-default-og.jpg'
    const postUrl = `/blog/${slug}`
    
    // Set comprehensive SEO meta
    setPageMeta({
      title: `Abdulbarry - ${currentPost.title}`,
      description: currentPost.description || `Read about ${currentPost.title} and learn from practical web development insights.`,
      keywords: `${currentPost.title}, Vue.js, Nuxt.js, Web Development, Frontend Development, ${currentPost.tags?.join(', ') || ''}`,
      author: 'Abdulbarry Guenichi',
      canonical: `https://abdulbarry.dev${postUrl}`
    })
    
    // Set Open Graph meta
    setOpenGraph({
      title: `Abdulbarry - ${currentPost.title}`,
      description: currentPost.description || `Learn about ${currentPost.title}`,
      image: postImage,
      type: 'article',
      url: `https://abdulbarry.dev${postUrl}`,
      siteName: 'Abdulbarry Blog'
    })
    
    // Set Twitter Card meta
    setTwitterCard({
      card: 'summary_large_image',
      title: `Abdulbarry - ${currentPost.title}`,
      description: currentPost.description || `Learn about ${currentPost.title}`,
      image: postImage
    })
    
    // Set breadcrumbs
    setBreadcrumbs([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: currentPost.title, url: postUrl }
    ])
    
    // Set article structured data
    setArticleStructuredData({
      title: currentPost.title,
      description: currentPost.description || '',
      datePublished: currentPost.date,
      dateModified: currentPost.updatedAt || currentPost.date,
      image: postImage,
      author: 'Abdulbarry Guenichi',
      url: `https://abdulbarry.dev${postUrl}`
    })
  }
}, { immediate: true })

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

<style scoped>
@import './../../assets/css/BlogPage.css';
</style>