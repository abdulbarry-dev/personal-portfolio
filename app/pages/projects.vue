<template>
  <div class="projects-page">
    <div class="projects-container">
      <!-- Page Header -->
      <div class="projects-header">
        <h1 class="projects-title">
          My Projects
        </h1>
        <p class="projects-subtitle">
          A collection of my open-source projects and contributions on GitHub
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="projects-grid">
        <div
          v-for="n in 6"
          :key="n"
          class="loading-skeleton"
        >
          <!-- Header Skeleton -->
          <div class="skeleton-header">
            <div class="skeleton-icon-container">
              <div class="skeleton-icon"></div>
              <div class="skeleton-title-container">
                <div class="skeleton-title"></div>
              </div>
            </div>
          </div>
          
          <!-- Description Skeleton -->
          <div class="skeleton-description">
            <div class="skeleton-desc-line full"></div>
            <div class="skeleton-desc-line three-quarters"></div>
            <div class="skeleton-desc-line half"></div>
          </div>
          
          <!-- Stats Skeleton -->
          <div class="skeleton-stats">
            <div class="skeleton-stat-item">
              <div class="skeleton-stat-icon"></div>
              <div class="skeleton-stat-text"></div>
            </div>
            <div class="skeleton-stat-item">
              <div class="skeleton-stat-icon"></div>
              <div class="skeleton-stat-text small"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <Icon name="heroicons:exclamation-triangle" class="error-icon" />
        <h3 class="error-title">Failed to load projects</h3>
        <p class="error-message">{{ error.message || 'Something went wrong while fetching projects.' }}</p>
        <button 
          @click="refresh()" 
          class="error-retry-button"
        >
          <Icon name="heroicons:arrow-path" class="error-retry-icon" />
          Try Again
        </button>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="data && data.length > 0" class="projects-grid">
        <a
          v-for="(repo, index) in data"
          :key="repo.id"
          :href="repo.html_url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card animate-fade-in"
          :style="{ animationDelay: `${index * 100}ms` }"
          :aria-label="`View ${repo.name} project on GitHub`"
        >
          <!-- Project Icon & Title -->
          <div class="project-header">
            <div class="project-info">
              <div class="project-icon-container">
                <Icon 
                  name="heroicons:cube" 
                  class="project-icon"
                />
              </div>
              <div>
                <h3 class="project-title">
                  {{ repo.name }}
                </h3>
              </div>
            </div>
            
            <!-- GitHub Icon (Visual indicator) -->
            <div class="project-github-indicator">
              <Icon 
                name="logos:github-icon" 
                class="project-github-icon"
              />
            </div>
          </div>

          <!-- Description -->
          <p class="project-description line-clamp-3">
            {{ repo.description || 'No description available for this repository.' }}
          </p>

          <!-- Project Stats -->
          <div class="project-stats">
            <div class="project-stats-left">
              <!-- Language -->
              <div v-if="repo.language" class="project-language">
                <div 
                  class="language-dot"
                  :class="getLanguageColorClass(repo.language)"
                ></div>
                <span>{{ repo.language }}</span>
              </div>
              
              <!-- Stars -->
              <div v-if="repo.stargazers_count > 0" class="project-stat-item">
                <Icon name="heroicons:star" class="project-stat-icon" />
                <span>{{ repo.stargazers_count }}</span>
              </div>
              
              <!-- Forks -->
              <div v-if="repo.forks_count > 0" class="project-stat-item">
                <Icon name="heroicons:code-bracket" class="project-stat-icon" />
                <span>{{ repo.forks_count }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <Icon name="heroicons:cube-transparent" class="empty-icon" />
        <h3 class="empty-title">No projects found</h3>
        <p class="empty-message">Check back later for new projects!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './../assets/css/Projects.css';
</style>

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

// Function to get language-specific color classes
const getLanguageColorClass = (language) => {
  const normalizedLanguage = language.toLowerCase().replace(/[^a-z]/g, '')
  const languageMap = {
    'javascript': 'language-javascript',
    'typescript': 'language-typescript',
    'vue': 'language-vue',
    'react': 'language-react',
    'python': 'language-python',
    'java': 'language-java',
    'css': 'language-css',
    'html': 'language-html',
    'php': 'language-php',
    'go': 'language-go',
    'rust': 'language-rust',
    'c': 'language-cpp',
    'cpp': 'language-cpp',
    'csharp': 'language-csharp',
    'swift': 'language-swift',
    'kotlin': 'language-kotlin'
  }
  return languageMap[normalizedLanguage] || 'language-default'
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