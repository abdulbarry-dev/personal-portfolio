<template>
  <NuxtLink 
    :to="postUrl" 
    class="blog-card"
  >
    <article class="blog-card-article">
      <!-- Header Section -->
      <header class="blog-card-header">
        <div class="blog-card-badges">
          <!-- Date Badge -->
          <div class="blog-card-date-badge">
            <Icon name="heroicons:calendar-days" class="blog-card-date-icon" />
            <time v-if="post.date" :datetime="post.date">
              {{ formattedDate }}
            </time>
          </div>
          
          <!-- Reading Time -->
          <div class="blog-card-time-badge">
            <Icon name="heroicons:clock" class="blog-card-time-icon" />
            {{ readingTime }}
          </div>
        </div>
        
        <!-- Arrow Icon -->
        <div class="blog-card-arrow">
          <Icon name="heroicons:arrow-up-right" class="blog-card-arrow-icon" />
        </div>
      </header>

      <!-- Main Content -->
      <div class="blog-card-content">
        <!-- Title -->
        <h2 class="blog-card-title line-clamp-3">
          {{ post.title }}
        </h2>
        
        <!-- Description -->
        <p v-if="post.description" class="blog-card-description line-clamp-4">
          {{ post.description }}
        </p>
        
        <!-- Author (if available) -->
        <div v-if="post.author" class="blog-card-author">
          <div class="blog-card-author-avatar">
            <Icon name="heroicons:user" class="blog-card-author-icon" />
          </div>
          <div class="blog-card-author-info">
            <p class="blog-card-author-name">{{ post.author }}</p>
            <p class="blog-card-author-role">Author</p>
          </div>
        </div>
      </div>

      <!-- Footer Section with Tags and Read More -->
      <footer class="blog-card-footer">
        <!-- Tags -->
        <div v-if="displayTags.length > 0" class="blog-card-tags">
          <div class="blog-card-tags-container">
            <span class="blog-card-tags-label">Topics:</span>
            <span 
              v-for="tag in displayTags" 
              :key="tag" 
              class="blog-card-tag"
            >
              #{{ tag }}
            </span>
            <span 
              v-if="extraTagsCount > 0" 
              class="blog-card-tag-extra"
            >
              +{{ extraTagsCount }} more
            </span>
          </div>
        </div>
        
        <!-- Read More Section -->
        <div class="blog-card-read-more">
          <div class="blog-card-read-more-info">
            <div class="blog-card-read-more-item">
              <Icon name="heroicons:eye" class="blog-card-read-more-icon" />
              <span>Read full article</span>
            </div>
          </div>
          
          <div class="blog-card-continue">
            <span class="blog-card-continue-text">Continue reading</span>
            <Icon name="heroicons:arrow-right" class="blog-card-continue-icon" />
          </div>
        </div>
      </footer>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
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

<style scoped>
@import './../assets/css/BlogCard.css';
</style>