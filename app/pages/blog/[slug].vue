<template>
  <article class="bg-white">
    <!-- Reading Progress Bar -->
    <div 
      class="fixed top-0 left-0 h-1 bg-blue-600 transition-all duration-300 z-50"
      :style="{ width: `${readingProgress}%` }"
    ></div>

    <!-- Hero Section -->
    <header class="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-20"></div>
      <div v-if="post.image" class="absolute inset-0">
        <img 
          :src="post.image" 
          :alt="post.title"
          class="w-full h-full object-cover opacity-30"
        />
      </div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-300 mb-6">
          <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          <NuxtLink to="/blog" class="hover:text-white transition-colors">Blog</NuxtLink>
          <Icon name="heroicons:chevron-right" class="w-4 h-4" />
          <span class="text-gray-400">{{ post.title }}</span>
        </nav>

        <!-- Post Meta -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:calendar-days" class="w-4 h-4" />
            <time :datetime="post.publishedAt">{{ formatDate(post.publishedAt) }}</time>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:clock" class="w-4 h-4" />
            <span>{{ readingTime }} min read</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon name="heroicons:user" class="w-4 h-4" />
            <span>{{ post.author }}</span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
          {{ post.title }}
        </h1>

        <!-- Description -->
        <p class="text-xl text-gray-300 leading-relaxed max-w-3xl">
          {{ post.description }}
        </p>

        <!-- Tags -->
        <div v-if="post.tags" class="flex flex-wrap gap-2 mt-6">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        <!-- Table of Contents (Desktop) -->
        <aside class="lg:col-span-1 order-2 lg:order-1">
          <div class="sticky top-8 space-y-6">
            <!-- TOC -->
            <div v-if="tableOfContents.length > 0" class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Icon name="heroicons:list-bullet" class="w-5 h-5 mr-2" />
                Table of Contents
              </h3>
              <nav class="space-y-2">
                <a
                  v-for="heading in tableOfContents"
                  :key="heading.id"
                  :href="`#${heading.id}`"
                  :class="[
                    'block text-sm transition-colors duration-200 hover:text-blue-600',
                    heading.level === 2 ? 'font-medium text-gray-900' : 'text-gray-600 ml-4',
                    activeHeading === heading.id ? 'text-blue-600 font-medium' : ''
                  ]"
                  @click="scrollToHeading(heading.id)"
                >
                  {{ heading.text }}
                </a>
              </nav>
            </div>

            <!-- Social Share -->
            <div class="bg-gray-50 rounded-xl p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Share Article</h3>
              <div class="flex flex-col space-y-3">
                <button
                  @click="sharePost('twitter')"
                  class="flex items-center space-x-3 p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                >
                  <Icon name="lucide:twitter" class="w-5 h-5 text-blue-400" />
                  <span class="text-sm font-medium text-gray-700 group-hover:text-blue-600">Twitter</span>
                </button>
                <button
                  @click="sharePost('linkedin')"
                  class="flex items-center space-x-3 p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors duration-200 group"
                >
                  <Icon name="lucide:linkedin" class="w-5 h-5 text-blue-600" />
                  <span class="text-sm font-medium text-gray-700 group-hover:text-blue-600">LinkedIn</span>
                </button>
                <button
                  @click="copyLink"
                  class="flex items-center space-x-3 p-3 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                >
                  <Icon name="heroicons:link" class="w-5 h-5 text-gray-500" />
                  <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Copy Link</span>
                </button>
                <button
                  @click="printPost"
                  class="flex items-center space-x-3 p-3 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 group"
                >
                  <Icon name="heroicons:printer" class="w-5 h-5 text-gray-500" />
                  <span class="text-sm font-medium text-gray-700 group-hover:text-gray-900">Print</span>
                </button>
              </div>
            </div>

            <!-- Author Info (Mobile) -->
            <div class="lg:hidden bg-gray-50 rounded-xl p-6">
              <AuthorBio :author="authorInfo" />
            </div>
          </div>
        </aside>

        <!-- Article Content -->
        <main class="lg:col-span-3 order-1 lg:order-2">
          <div class="prose prose-lg prose-gray max-w-none">
            <!-- Article Body -->
            <div 
              class="article-content"
              v-html="post.body"
              @click="handleImageClick"
            ></div>
          </div>

          <!-- Article Footer -->
          <footer class="border-t border-gray-200 pt-8 mt-12">
            <!-- Tags -->
            <div v-if="post.tags" class="mb-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div class="flex flex-wrap gap-2">
                <NuxtLink
                  v-for="tag in post.tags"
                  :key="tag"
                  :to="`/blog?tag=${encodeURIComponent(tag)}`"
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors duration-200"
                >
                  {{ tag }}
                </NuxtLink>
              </div>
            </div>

            <!-- Author Bio (Desktop) -->
            <div class="hidden lg:block mb-12">
              <AuthorBio :author="authorInfo" />
            </div>

            <!-- Navigation -->
            <nav class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
              <NuxtLink
                v-if="prevPost"
                :to="prevPost._path"
                class="group flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 flex-1 sm:max-w-sm"
              >
                <Icon name="heroicons:arrow-left" class="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
                <div class="min-w-0">
                  <p class="text-sm text-gray-500 mb-1">Previous</p>
                  <h4 class="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                    {{ prevPost.title }}
                  </h4>
                </div>
              </NuxtLink>

              <NuxtLink
                v-if="nextPost"
                :to="nextPost._path"
                class="group flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors duration-200 flex-1 sm:max-w-sm text-right"
              >
                <div class="min-w-0">
                  <p class="text-sm text-gray-500 mb-1">Next</p>
                  <h4 class="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                    {{ nextPost.title }}
                  </h4>
                </div>
                <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400 group-hover:text-gray-600 flex-shrink-0" />
              </NuxtLink>
            </nav>

            <!-- Related Posts -->
            <section v-if="relatedPosts.length > 0" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article
                  v-for="relatedPost in relatedPosts"
                  :key="relatedPost._path"
                  class="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                >
                  <div v-if="relatedPost.image" class="aspect-video overflow-hidden">
                    <img
                      :src="relatedPost.image"
                      :alt="relatedPost.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div class="p-6">
                    <div class="flex items-center space-x-2 text-sm text-gray-500 mb-3">
                      <time :datetime="relatedPost.publishedAt">
                        {{ formatDate(relatedPost.publishedAt) }}
                      </time>
                      <span>•</span>
                      <span>{{ calculateReadingTime(relatedPost.body) }} min read</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      <NuxtLink :to="relatedPost._path">
                        {{ relatedPost.title }}
                      </NuxtLink>
                    </h3>
                    <p class="text-gray-600 text-sm line-clamp-2">
                      {{ relatedPost.description }}
                    </p>
                  </div>
                </article>
              </div>
            </section>

            <!-- Comments Section (Optional) -->
            <section class="border-t border-gray-200 pt-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">Comments</h2>
              <div class="bg-gray-50 rounded-xl p-8 text-center">
                <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Join the Discussion</h3>
                <p class="text-gray-600 mb-4">
                  Share your thoughts and engage with other readers.
                </p>
                <div class="flex justify-center space-x-4">
                  <button
                    @click="sharePost('twitter')"
                    class="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
                  >
                    Tweet about this
                  </button>
                  <button
                    @click="sharePost('linkedin')"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    Share on LinkedIn
                  </button>
                </div>
              </div>
            </section>
          </footer>
        </main>
      </div>
    </div>

    <!-- Image Modal -->
    <ImageModal 
      v-if="selectedImage" 
      :src="selectedImage" 
      @close="selectedImage = null" 
    />

    <!-- Back to Top Button -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 z-40"
      title="Back to top"
    >
      <Icon name="heroicons:arrow-up" class="w-5 h-5" />
    </button>
  </article>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Get route parameters
const route = useRoute()
const slug = route.params.slug

// Reactive data
const readingProgress = ref(0)
const activeHeading = ref('')
const selectedImage = ref(null)
const showBackToTop = ref(false)

// Fetch the blog post
const { data: post } = await queryContent('blog', slug).findOne()

if (!post) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found'
  })
}

// Fetch all posts for navigation and related posts
const { data: allPosts } = await queryContent('blog').sort({ publishedAt: -1 }).find()

// Computed properties
const readingTime = computed(() => {
  if (!post.body) return 0
  const wordsPerMinute = 200
  const wordCount = post.body.split(' ').length
  return Math.ceil(wordCount / wordsPerMinute)
})

const tableOfContents = computed(() => {
  if (!post.body) return []
  
  const headingRegex = /<h([2-3])[^>]*id="([^"]*)"[^>]*>([^<]*)<\/h[2-3]>/gi
  const headings = []
  let match
  
  while ((match = headingRegex.exec(post.body)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].trim()
    })
  }
  
  return headings
})

const currentPostIndex = computed(() => {
  return allPosts.findIndex(p => p._path === post._path)
})

const prevPost = computed(() => {
  const index = currentPostIndex.value
  return index < allPosts.length - 1 ? allPosts[index + 1] : null
})

const nextPost = computed(() => {
  const index = currentPostIndex.value
  return index > 0 ? allPosts[index - 1] : null
})

const relatedPosts = computed(() => {
  if (!post.tags) return []
  
  return allPosts
    .filter(p => p._path !== post._path)
    .filter(p => p.tags && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 4)
})

const authorInfo = computed(() => ({
  name: post.author || 'Abdulbarry',
  bio: 'Frontend Developer passionate about Vue.js, modern web technologies, and creating meaningful digital experiences.',
  avatar: '/images/profile-avatar.jpg',
  social: {
    github: 'https://github.com/abdulbarry',
    linkedin: 'https://linkedin.com/in/abdulbarry',
    twitter: 'https://twitter.com/abdulbarry'
  }
}))

// Methods
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const calculateReadingTime = (content) => {
  if (!content) return 0
  const wordsPerMinute = 200
  const wordCount = content.split(' ').length
  return Math.ceil(wordCount / wordsPerMinute)
}

const sharePost = (platform) => {
  const url = window.location.href
  const text = post.title
  
  let shareUrl = ''
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
      break
  }
  
  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href)
    // Add toast notification here
    console.log('Link copied to clipboard')
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

const printPost = () => {
  window.print()
}

const scrollToHeading = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleImageClick = (event) => {
  if (event.target.tagName === 'IMG') {
    selectedImage.value = event.target.src
  }
}

const updateReadingProgress = () => {
  const article = document.querySelector('.article-content')
  if (!article) return
  
  const articleTop = article.offsetTop
  const articleHeight = article.offsetHeight
  const windowHeight = window.innerHeight
  const scrollTop = window.pageYOffset
  
  const progress = Math.min(
    100,
    Math.max(0, ((scrollTop - articleTop + windowHeight) / articleHeight) * 100)
  )
  
  readingProgress.value = progress
  showBackToTop.value = scrollTop > 300
}

const updateActiveHeading = () => {
  const headings = tableOfContents.value
  const scrollTop = window.pageYOffset
  
  for (let i = headings.length - 1; i >= 0; i--) {
    const element = document.getElementById(headings[i].id)
    if (element && element.offsetTop <= scrollTop + 100) {
      activeHeading.value = headings[i].id
      break
    }
  }
}

const handleScroll = () => {
  updateReadingProgress()
  updateActiveHeading()
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// SEO and Meta
useSeoMeta({
  title: `${post.title} - Abdulbarry`,
  description: post.description,
  ogTitle: post.title,
  ogDescription: post.description,
  ogImage: post.image,
  ogType: 'article',
  articleAuthor: post.author,
  articlePublishedTime: post.publishedAt,
  articleSection: 'Technology',
  articleTag: post.tags,
  twitterCard: 'summary_large_image',
  twitterTitle: post.title,
  twitterDescription: post.description,
  twitterImage: post.image
})

// Structured Data for SEO
useSchemaOrg([
  defineArticle({
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      name: post.author,
      url: 'https://abdulbarry.dev'
    },
    publisher: {
      name: 'Abdulbarry',
      url: 'https://abdulbarry.dev'
    }
  })
])

// Page meta
definePageMeta({
  layout: 'default'
})
</script>

<script>
export default {
  name: 'BlogPostSlug'
}
</script>

<style scoped>
/* Reading progress bar */
.fixed {
  z-index: 9999;
}

/* Print styles */
@media print {
  .fixed,
  aside,
  nav,
  footer,
  button {
    display: none !important;
  }
  
  .prose {
    max-width: none !important;
  }
  
  .article-content {
    font-size: 12pt;
    line-height: 1.5;
  }
  
  .article-content h1,
  .article-content h2,
  .article-content h3 {
    page-break-after: avoid;
  }
  
  .article-content pre {
    page-break-inside: avoid;
    border: 1px solid #ccc;
    padding: 10pt;
  }
}

/* Enhanced prose styles */
:deep(.prose) {
  @apply text-gray-800;
}

:deep(.prose h1),
:deep(.prose h2),
:deep(.prose h3),
:deep(.prose h4) {
  @apply text-gray-900 font-bold;
  scroll-margin-top: 2rem;
}

:deep(.prose h2) {
  @apply text-2xl mt-12 mb-6;
}

:deep(.prose h3) {
  @apply text-xl mt-8 mb-4;
}

:deep(.prose p) {
  @apply mb-6 leading-relaxed;
}

:deep(.prose a) {
  @apply text-blue-600 hover:text-blue-700 transition-colors duration-200;
}

:deep(.prose code) {
  @apply bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm;
}

:deep(.prose pre) {
  @apply bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto;
}

:deep(.prose pre code) {
  @apply bg-transparent text-gray-100 p-0;
}

:deep(.prose blockquote) {
  @apply border-l-4 border-blue-500 pl-6 py-2 bg-blue-50 rounded-r-lg;
}

:deep(.prose img) {
  @apply rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105;
}

:deep(.prose table) {
  @apply w-full border-collapse border border-gray-200 rounded-lg overflow-hidden;
}

:deep(.prose th),
:deep(.prose td) {
  @apply border border-gray-200 px-4 py-2;
}

:deep(.prose th) {
  @apply bg-gray-50 font-semibold;
}

/* Line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>