<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:opacity-75">
    <NuxtLink :to="post._path">
      <img v-if="post.cover" :src="`/images/blog/${post.cover}`" alt="Blog Post Cover Image" class="w-full h-48 object-cover">
      <div v-else class="w-full h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">No Image</span>
      </div>
    </NuxtLink>
    <div class="p-6">
      <h2 class="text-xl font-bold mb-2">{{ post.title }}</h2>
      <p class="text-gray-700 mb-4">{{ post.description }}</p>
      <NuxtLink :to="post._path"
        class="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded float-right mb-8">Read More
      </NuxtLink>
    </div>
  </div>
</template>