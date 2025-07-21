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
    month: 'short',
    day: 'numeric',
  });
};
</script>

<template>
  <NuxtLink :to="post._path || post.path" class="group block">
    <article class="grid md:grid-cols-[250px_1fr] gap-6 items-center">
      <div class="aspect-video md:aspect-square rounded-xl overflow-hidden">
        <img 
          v-if="post.cover" 
          :src="post.cover" 
          alt="Blog post cover" 
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      </div>
      <div>
        <div class="flex items-center gap-4 text-sm text-gray-500 mb-2">
          <time :datetime="post.date">{{ formatDate(post.date) }}</time>
          <div class="flex items-center gap-2">
            <span 
              v-for="tag in post.tags" 
              :key="tag" 
              class="px-2 py-0.5 bg-gray-100 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {{ post.title }}
        </h2>
        <p class="text-gray-600 leading-relaxed">
          {{ post.description }}
        </p>
      </div>
    </article>
  </NuxtLink>
</template>