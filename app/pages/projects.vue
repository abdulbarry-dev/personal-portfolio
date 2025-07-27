<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <!-- Page Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          My Projects
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          A collection of my open-source projects and contributions on GitHub
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
          v-for="n in 6"
          :key="n"
          class="bg-white border border-gray-200 rounded-xl p-6 animate-pulse"
        >
          <!-- Header Skeleton -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div class="space-y-2">
                <div class="h-5 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
            <div class="w-6 h-6 bg-gray-200 rounded"></div>
          </div>
          
          <!-- Description Skeleton -->
          <div class="space-y-2 mb-6">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          
          <!-- Stats Skeleton -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-gray-200 rounded-full"></div>
              <div class="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div class="flex items-center space-x-1">
              <div class="w-4 h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-8"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-300 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Failed to load projects</h3>
        <p class="text-gray-600 mb-4">{{ error.message || 'Something went wrong while fetching projects.' }}</p>
        <button 
          @click="refresh()" 
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Icon name="heroicons:arrow-path" class="w-4 h-4 mr-2" />
          Try Again
        </button>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="data && data.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div
          v-for="(repo, index) in data"
          :key="repo.id"
          class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-in"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Project Icon & Title -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-200">
                <Icon 
                  name="heroicons:cube" 
                  class="w-6 h-6 text-gray-600"
                />
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {{ repo.name }}
                </h3>
              </div>
            </div>
            
            <!-- External Link Icon -->
            <a
              :href="repo.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-100 rounded-lg"
            >
              <Icon 
                name="heroicons:arrow-top-right-on-square" 
                class="w-4 h-4 text-gray-500 hover:text-gray-700"
              />
            </a>
          </div>

          <!-- Description -->
          <p class="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
            {{ repo.description || 'No description available for this repository.' }}
          </p>

          <!-- Project Stats -->
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div class="flex items-center space-x-4">
              <!-- Language -->
              <div v-if="repo.language" class="flex items-center space-x-1">
                <div 
                  class="w-3 h-3 rounded-full"
                  :class="getLanguageColor(repo.language)"
                ></div>
                <span>{{ repo.language }}</span>
              </div>
              
              <!-- Stars -->
              <div v-if="repo.stargazers_count > 0" class="flex items-center space-x-1">
                <Icon name="heroicons:star" class="w-4 h-4" />
                <span>{{ repo.stargazers_count }}</span>
              </div>
              
              <!-- Forks -->
              <div v-if="repo.forks_count > 0" class="flex items-center space-x-1">
                <Icon name="heroicons:code-bracket" class="w-4 h-4" />
                <span>{{ repo.forks_count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <Icon name="heroicons:cube-transparent" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
        <p class="text-gray-600">Check back later for new projects!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Async data fetching with Nuxt 4 features
const { data, pending, error, refresh } = await useLazyAsyncData('github-repos', async () => {
  const userName = 'abdulbarry-dev'
  const reposApiUrl = `https://api.github.com/users/${userName}/repos`
  
  try {
    const response = await $fetch(reposApiUrl, {
      params: {
        sort: 'updated',
        per_page: 12,
      }
    })
    return response
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch GitHub repositories'
    })
  }
})

// Function to get language-specific colors
const getLanguageColor = (language) => {
  const colors = {
    'JavaScript': 'bg-yellow-400',
    'TypeScript': 'bg-blue-500',
    'Vue': 'bg-green-500',
    'React': 'bg-cyan-400',
    'Python': 'bg-blue-600',
    'Java': 'bg-orange-500',
    'CSS': 'bg-purple-500',
    'HTML': 'bg-red-500',
    'PHP': 'bg-indigo-500',
    'Go': 'bg-cyan-600',
    'Rust': 'bg-orange-600',
    'C++': 'bg-pink-500',
    'C#': 'bg-purple-600',
    'Swift': 'bg-orange-400',
    'Kotlin': 'bg-purple-400'
  }
  return colors[language] || 'bg-gray-400'
}

// Page meta
definePageMeta({
  layout: 'default'
})

// SEO
useSeoMeta({
  title: 'Projects - Abdulbarry',
  description: 'Explore my open-source projects and contributions on GitHub',
})
</script>

<style scoped>
/* Line clamp for description text */
.line-clamp-3 {
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Fade in animation for project cards */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}

/* Pulse animation for loading skeletons */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced hover effects */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

/* Custom scrollbar for long descriptions */
.line-clamp-3::-webkit-scrollbar {
  display: none;
}
</style>