<script setup lang="ts">

interface BlogPost {
  title: string
  path: string
}

interface Props {
  previousPost?: BlogPost | null
  nextPost?: BlogPost | null
}

const props = defineProps<Props>()

/**
 * Navigation button component data
 */
const navigationData = computed(() => ({
  previous: {
    post: props.previousPost,
    slug: props.previousPost ? getPostSlug(props.previousPost.path) : null,
    direction: 'previous',
    label: 'Previous Post',
    iconName: 'heroicons:arrow-left',
    colorClasses: 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50'
  },
  next: {
    post: props.nextPost,
    slug: props.nextPost ? getPostSlug(props.nextPost.path) : null,
    direction: 'next',
    label: 'Next Post',
    iconName: 'heroicons:arrow-right',
    colorClasses: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50'
  }
}))
</script>

<template>
  <footer class="blog-nav-footer">
    <div class="blog-nav-container">
      <!-- Navigation Grid -->
      <div class="blog-nav-grid">
        <!-- Previous Post -->
        <div>
          <NuxtLink 
            v-if="previousPost"
            :to="`/blog/${navigationData.previous.slug}`"
            class="blog-nav-link"
          >
            <div class="blog-nav-content">
              <div class="blog-nav-icon-container blog-nav-icon-previous">
                <Icon :name="navigationData.previous.iconName" class="blog-nav-icon blog-nav-icon-previous-active" />
              </div>
              <div class="blog-nav-text">
                <p class="blog-nav-label blog-nav-label-previous">
                  {{ navigationData.previous.label }}
                </p>
                <h3 class="blog-nav-title line-clamp-2">
                  {{ previousPost.title }}
                </h3>
              </div>
            </div>
          </NuxtLink>
          
          <!-- Disabled Previous Button -->
          <div v-else class="blog-nav-disabled">
            <div class="blog-nav-content">
              <div class="blog-nav-icon-container blog-nav-icon-disabled">
                <Icon name="heroicons:arrow-left" class="blog-nav-icon blog-nav-icon-disabled" />
              </div>
              <div class="blog-nav-text">
                <p class="blog-nav-label blog-nav-label-disabled">
                  Previous Post
                </p>
                <h3 class="blog-nav-title blog-nav-title-disabled">
                  No previous post
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Post -->
        <div>
          <NuxtLink 
            v-if="nextPost"
            :to="`/blog/${navigationData.next.slug}`"
            class="blog-nav-link"
          >
            <div class="blog-nav-content">
              <div class="blog-nav-text blog-nav-text-right">
                <p class="blog-nav-label blog-nav-label-next">
                  {{ navigationData.next.label }}
                </p>
                <h3 class="blog-nav-title line-clamp-2">
                  {{ nextPost.title }}
                </h3>
              </div>
              <div class="blog-nav-icon-container blog-nav-icon-next">
                <Icon :name="navigationData.next.iconName" class="blog-nav-icon blog-nav-icon-next-active" />
              </div>
            </div>
          </NuxtLink>
          
          <!-- Disabled Next Button -->
          <div v-else class="blog-nav-disabled">
            <div class="blog-nav-content">
              <div class="blog-nav-text blog-nav-text-right">
                <p class="blog-nav-label blog-nav-label-disabled">
                  Next Post
                </p>
                <h3 class="blog-nav-title blog-nav-title-disabled">
                  No next post
                </h3>
              </div>
              <div class="blog-nav-icon-container blog-nav-icon-disabled">
                <Icon name="heroicons:arrow-right" class="blog-nav-icon blog-nav-icon-disabled" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Blog Link -->
      <div class="blog-nav-back-section">
        <NuxtLink to="/blog" class="blog-nav-back-link">
          <Icon name="heroicons:squares-2x2" class="blog-nav-back-icon" />
          <span>View All Posts</span>
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@import './../assets/css/BlogPostNavigation.css';
</style>
