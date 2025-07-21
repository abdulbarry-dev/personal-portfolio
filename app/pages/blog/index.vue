<script setup lang="ts">
import { ref, computed } from 'vue';

// This logic remains as you requested.
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').all())

const searchQuery = ref('');
const selectedTags = ref<string[]>([]);

const validPosts = computed(() => {
  if (!posts.value) return [];
  return posts.value.filter(post => post && post.title && post.path);
});

const allTags = computed(() => {
  const tags = new Map<string, number>();
  validPosts.value.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        tags.set(tag, (tags.get(tag) || 0) + 1);
      });
    }
  });
  return tags;
});

const filteredPosts = computed(() => {
  let filtered = validPosts.value;

  if (searchQuery.value) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter(post =>
      post.title.toLowerCase().includes(lowerCaseQuery) ||
      (post.description && post.description.toLowerCase().includes(lowerCaseQuery))
    );
  }

  if (selectedTags.value.length > 0) {
    filtered = filtered.filter(post =>
      post.tags && post.tags.some(tag => selectedTags.value.includes(tag))
    );
  }

  return filtered;
});

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tag);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mb-12">
      <h1 class="text-5xl font-bold text-gray-900 mb-4">Blog</h1>
      <p class="text-lg text-gray-600">
        Discover valuable insights on web development, design, and more.
      </p>
    </div>

    <div class="relative mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search query"
        class="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <Icon name="heroicons:magnifying-glass" class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>

    <div v-if="allTags.size > 0" class="flex items-center flex-wrap gap-2 mb-12">
      <span class="text-sm font-medium text-gray-700 mr-2">Filter by tag(s):</span>
      <button
        v-for="[tag, count] in allTags"
        :key="tag"
        @click="toggleTag(tag)"
        :class="[
          'px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200',
          selectedTags.includes(tag)
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ tag }} ({{ count }})
      </button>
    </div>

    <div v-if="filteredPosts.length" class="space-y-12">
      <BlogCard v-for="post in filteredPosts" :key="post.path || post.id" :post="post" />
    </div>
    <div v-else class="text-center text-gray-500 py-10">
      <p>No blog posts found matching your</p>
    </div>
    </div>
</template>