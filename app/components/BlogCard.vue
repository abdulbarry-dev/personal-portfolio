<script setup lang="ts">
import { formatDate, calculateReadingTime } from '~/utils/blog'

// Component props with proper typing
interface BlogPost {
  title: string
  description?: string
  date?: string
  tags?: string[]
  author?: string
  path?: string
  _path?: string
  readingTime?: string
  body?: any
}

interface Props {
  post: BlogPost
}

const props = defineProps<Props>()

// Computed values for better performance
const formattedDate = computed(() => formatDate(props.post.date || ''))
const readingTime = computed(() => {
  if (props.post.readingTime) return props.post.readingTime
  return calculateReadingTime(props.post.body || props.post.description || '', 200)
})
const postUrl = computed(() => props.post._path || props.post.path || '')
const displayTags = computed(() => props.post.tags?.slice(0, 4) || [])
const extraTagsCount = computed(() => Math.max(0, (props.post.tags?.length || 0) - 4))
</script>

<template>
  <NuxtLink 
    :to="postUrl" 
    class="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden h-full"
  >
    <article class="flex flex-col h-full p-6 sm:p-8">
      <!-- Header Section -->
      <header class="flex items-start justify-between mb-4">
        <div class="flex items-center space-x-3">
          <!-- Date Badge -->
          <div class="flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium">
            <Icon name="heroicons:calendar-days" class="w-3 h-3 mr-1" />
            <time v-if="post.date" :datetime="post.date">
              {{ formattedDate }}
            </time>
          </div>
          
          <!-- Reading Time -->
          <div class="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
            <Icon name="heroicons:clock" class="w-3 h-3 mr-1" />
            {{ readingTime }}
          </div>
        </div>
        
        <!-- Arrow Icon -->
        <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Icon name="heroicons:arrow-up-right" class="w-5 h-5 text-blue-500 dark:text-blue-400" />
        </div>
      </header>

      <!-- Main Content -->
      <div class="flex-grow">
        <!-- Title -->
        <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight line-clamp-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {{ post.title }}
        </h2>
        
        <!-- Description -->
        <p v-if="post.description" class="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 line-clamp-4">
          {{ post.description }}
        </p>
        
        <!-- Author (if available) -->
        <div v-if="post.author" class="flex items-center mb-4">
          <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <Icon name="heroicons:user" class="w-4 h-4 text-white" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ post.author }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">Author</p>
          </div>
        </div>
      </div>

      <!-- Footer Section with Tags and Read More -->
      <footer class="mt-auto pt-6 border-t border-gray-100 dark:border-gray-700">
        <!-- Tags -->
        <div v-if="displayTags.length > 0" class="mb-4">
          <div class="flex items-center flex-wrap gap-2">
            <span class="text-xs font-medium text-gray-500 dark:text-gray-400 mr-1">Topics:</span>
            <span 
              v-for="tag in displayTags" 
              :key="tag" 
              class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors duration-200"
            >
              #{{ tag }}
            </span>
            <span 
              v-if="extraTagsCount > 0" 
              class="inline-flex items-center px-2.5 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              +{{ extraTagsCount }} more
            </span>
          </div>
        </div>
        
        <!-- Read More Section -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div class="flex items-center">
              <Icon name="heroicons:eye" class="w-4 h-4 mr-1" />
              <span>Read full article</span>
            </div>
          </div>
          
          <div class="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
            <span class="mr-2">Continue reading</span>
            <Icon name="heroicons:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </footer>
    </article>
  </NuxtLink>
</template>

<style scoped>
/* Enhanced line clamp utility */
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-clamp-4 {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Fallback for browsers that don't support line-clamp */
@supports not (-webkit-line-clamp: 3) {
  .line-clamp-3 {
    max-height: 3.6em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .line-clamp-4 {
    max-height: 4.8em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Smooth hover effects */
.group:hover {
  transform: translateY(-2px);
}

/* Enhanced focus states for accessibility */
.group:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}
</style>