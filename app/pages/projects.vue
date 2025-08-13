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
        <ProjectSkeletonCard v-for="n in 6" :key="n" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <Icon name="heroicons:exclamation-triangle" class="error-icon" />
        <h3 class="error-title">
          Failed to load projects
        </h3>
        <p class="error-message">
          {{ error.message || 'Something went wrong while fetching projects.' }}
        </p>
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
        <ProjectCard v-for="(repo, index) in data" :key="repo.id" :repo="repo" :index="index" />
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <Icon name="heroicons:cube-transparent" class="empty-icon" />
        <h3 class="empty-title">
          No projects found
        </h3>
        <p class="empty-message">
          Check back later for new projects!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Enhanced SEO for projects page
const { setPageMeta, setBreadcrumbs, setStructuredData } = useSEO()

// Fetch repos through the reusable composable
const { data, pending, error, refresh } = await useLazyAsyncData('github-repos', () => useGithubRepos())

// Set comprehensive SEO meta
setPageMeta({
  title: 'Projects - Abdulbarry Guenichi | Open Source Portfolio',
  description: 'Explore my open-source projects and contributions on GitHub. Vue.js, Nuxt.js, and TypeScript applications showcasing modern web development practices.',
  keywords: 'GitHub Projects, Vue.js Projects, Nuxt.js Applications, TypeScript Projects, Open Source, Frontend Portfolio, Web Development Projects',
  ogTitle: 'Projects Portfolio - Abdulbarry Guenichi',
  ogDescription: 'Discover innovative web applications and open-source contributions using Vue.js, Nuxt.js, and modern web technologies.',
  ogImage: '/images/projects-og.jpg',
  ogType: 'website'
})

// Set breadcrumbs
setBreadcrumbs([
  { name: 'Home', url: '/' },
  { name: 'Projects', url: '/projects' }
])

// Add collection page structured data
watch(data, (repos) => {
  if (repos && repos.length > 0) {
    const projectsData = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Projects by Abdulbarry Guenichi',
      description: 'A collection of open-source projects and contributions',
      numberOfItems: repos.length,
      itemListElement: repos.slice(0, 10).map((repo, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'SoftwareApplication',
          name: repo.name,
          description: repo.description || 'No description available',
          url: repo.html_url,
          programmingLanguage: repo.language || 'JavaScript',
          author: {
            '@type': 'Person',
            name: 'Abdulbarry Guenichi'
          }
        }
      }))
    }
    
    setStructuredData(projectsData)
  }
}, { immediate: true })

// Function to get language-specific color classes
const getLanguageColorClass = (language) => {
  const normalizedLanguage = language.toLowerCase().replace(/[^a-z]/g, '')
  const languageMap = {
    javascript: 'language-javascript',
    typescript: 'language-typescript',
    vue: 'language-vue',
    react: 'language-react',
    python: 'language-python',
    java: 'language-java',
    css: 'language-css',
    html: 'language-html',
    php: 'language-php',
    go: 'language-go',
    rust: 'language-rust',
    c: 'language-cpp',
    cpp: 'language-cpp',
    csharp: 'language-csharp',
    swift: 'language-swift',
    kotlin: 'language-kotlin',
  }
  return languageMap[normalizedLanguage] || 'language-default'
}

// Page meta
definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
@import '../assets/css/ProjectsPage.css';
</style>
