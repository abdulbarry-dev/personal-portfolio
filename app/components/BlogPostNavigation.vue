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
  <footer class="border-t border-gray-200 dark:border-gray-700 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <!-- Navigation Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Previous Post -->
        <div>
          <NuxtLink 
            v-if="previousPost"
            :to="`/blog/${navigationData.previous.slug}`"
            class="group block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:shadow-md transition-all duration-200"
          >
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                <Icon :name="navigationData.previous.iconName" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                  {{ navigationData.previous.label }}
                </p>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2">
                  {{ previousPost.title }}
                </h3>
              </div>
            </div>
          </NuxtLink>
          
          <!-- Disabled Previous Button -->
          <div 
            v-else 
            class="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded opacity-50"
          >
            <div class="flex items-center gap-3">
              <div class="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Icon name="heroicons:arrow-left" class="w-4 h-4 text-gray-400" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-medium text-gray-400 mb-1">
                  Previous Post
                </p>
                <h3 class="text-sm font-semibold text-gray-400">
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
            class="group block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:shadow-md transition-all duration-200"
          >
            <div class="flex items-center gap-3">
              <div class="flex-1 min-w-0 text-right">
                <p class="text-xs font-medium text-green-600 dark:text-green-400 mb-1">
                  {{ navigationData.next.label }}
                </p>
                <h3 class="text-sm font-semibold text-gray-900 dark:text-white leading-tight line-clamp-2">
                  {{ nextPost.title }}
                </h3>
              </div>
              <div class="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                <Icon :name="navigationData.next.iconName" class="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </NuxtLink>
          
          <!-- Disabled Next Button -->
          <div 
            v-else 
            class="p-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded opacity-50"
          >
            <div class="flex items-center gap-3">
              <div class="flex-1 min-w-0 text-right">
                <p class="text-xs font-medium text-gray-400 mb-1">
                  Next Post
                </p>
                <h3 class="text-sm font-semibold text-gray-400">
                  No next post
                </h3>
              </div>
              <div class="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Icon name="heroicons:arrow-right" class="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back to Blog Link -->
      <div class="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <NuxtLink 
          to="/blog" 
          class="inline-flex items-center gap-2 px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded hover:shadow-sm transition-all duration-200"
        >
          <Icon name="heroicons:squares-2x2" class="w-4 h-4" />
          <span class="font-medium">View All Posts</span>
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
