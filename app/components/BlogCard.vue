<script setup lang="ts">
defineProps({
  post: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
</script>

<template>
  <NuxtLink 
    :to="post._path || post.path" 
    class="group block bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out overflow-hidden"
  >
    <article class="flex flex-col h-full p-4 sm:p-6">
      <!-- Metadata: Date -->
      <div class="mb-3">
        <time 
          v-if="post.date" 
          :datetime="post.date" 
          class="text-xs sm:text-sm text-gray-500 font-medium"
        >
          {{ formatDate(post.date) }}
        </time>
      </div>

      <!-- Main Content: Title and Description -->
      <div class="flex-grow">
        <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {{ post.title }}
        </h2>
        <p class="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 mb-3 sm:mb-4">
          {{ post.description }}
        </p>
      </div>

      <!-- Footer: Tags and Read More -->
      <div class="mt-auto pt-3 sm:pt-4 border-t border-gray-100">
        <!-- Tags -->
        <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-3 sm:mb-0" v-if="post.tags && post.tags.length">
          <span 
            v-for="tag in post.tags.slice(0, 3)" 
            :key="tag" 
            class="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full whitespace-nowrap"
          >
            #{{ tag }}
          </span>
          <span 
            v-if="post.tags.length > 3" 
            class="px-2 sm:px-2.5 py-0.5 sm:py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full"
          >
            +{{ post.tags.length - 3 }} more
          </span>
        </div>
        
        <!-- Read More hint -->
        <div class="flex items-center justify-between">
          <div class="flex-1"></div>
          <div class="flex items-center text-xs sm:text-sm font-semibold text-blue-600 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            <span class="hidden sm:inline">Read More</span>
            <span class="sm:hidden">Read</span>
            <Icon name="heroicons:arrow-right-20-solid" class="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </div>
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
/* Enhanced line clamp utility with better browser support */
.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Fallback for browsers that don't support line-clamp */
@supports not (-webkit-line-clamp: 3) {
  .line-clamp-2 {
    max-height: 2.4em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .line-clamp-3 {
    max-height: 3.6em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Ensure cards maintain consistent height on all screen sizes */
@media (min-width: 768px) {
  article {
    min-height: 280px;
  }
}

@media (min-width: 1024px) {
  article {
    min-height: 320px;
  }
}
</style>