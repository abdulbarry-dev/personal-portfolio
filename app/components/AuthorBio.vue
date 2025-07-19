<template>
  <div class="bg-white border border-gray-200 rounded-xl p-6">
    <div class="flex items-start space-x-4">
      <img
        :src="author.avatar"
        :alt="author.name"
        class="w-16 h-16 rounded-full object-cover"
      />
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ author.name }}</h3>
        <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ author.bio }}</p>
        <div class="flex items-center space-x-3">
          <a
            v-if="author.social.github"
            :href="author.social.github"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <Icon name="lucide:github" class="w-5 h-5" />
          </a>
          <a
            v-if="author.social.linkedin"
            :href="author.social.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            <Icon name="lucide:linkedin" class="w-5 h-5" />
          </a>
          <a
            v-if="author.social.twitter"
            :href="author.social.twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <Icon name="lucide:twitter" class="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  author: {
    type: Object,
    required: true
  }
})
</script>