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
      <div v-if="isLoading" class="projects-grid">
        <ProjectSkeletonCard v-for="n in 6" :key="n" />
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="error-state">
        <Icon name="heroicons:exclamation-triangle" class="error-icon" />
        <h3 class="error-title">
          Failed to load projects
        </h3>
        <p class="error-message">
          {{ error?.message || error?.statusMessage || 'Something went wrong while fetching projects.' }}
        </p>
        <button
          @click="handleRefresh()"
          class="error-retry-button"
        >
          <Icon name="heroicons:arrow-path" class="error-retry-icon" />
          Try Again
        </button>
      </div>

      <!-- Projects Grid -->
      <div v-else-if="hasData" class="projects-grid">
        <ProjectCard v-for="(repo, index) in data" :key="repo.id" :repo="repo" :index="index" />
      </div>

      <!-- Empty State -->
      <div v-else-if="isEmpty" class="empty-state">
        <Icon name="heroicons:cube-transparent" class="empty-icon" />
        <h3 class="empty-title">
          No projects found
        </h3>
        <p class="empty-message">
          Check back later for new projects!
        </p>
      </div>

      <!-- Fallback State (should rarely show) -->
      <div v-else-if="showFallback" class="empty-state">
        <Icon name="heroicons:cube-transparent" class="empty-icon" />
        <h3 class="empty-title">
          Loading projects...
        </h3>
        <p class="empty-message">
          Please wait while we fetch your projects.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Enhanced SEO for projects page
const { setPageMeta, setBreadcrumbs, setStructuredData } = useSEO()

// Fetch repos through the reusable composable with better error handling
const { data, pending, error, refresh } = await useLazyAsyncData(
  'github-repos', 
  () => useGithubRepos(),
  {
    default: () => null, // Use null to distinguish between no data and empty data
    server: false, // Disable SSR to prevent hydration mismatches
    lazy: false, // Start fetching immediately
    // Ensure client-side fetching for consistent behavior
    transform: (data) => {
      // Ensure we always return a consistent structure
      if (data === null || data === undefined) {
        return null;
      }
      return Array.isArray(data) ? data : [];
    }
  }
)

// Handle client-side hydration
const isHydrated = ref(false)
onMounted(() => {
  isHydrated.value = true
})

// Computed properties for cleaner template logic
const isLoading = computed(() => {
  // Show loading if pending OR if we're not hydrated yet and have no data
  return pending.value || (!isHydrated.value && data.value === null)
})

const hasError = computed(() => !!error.value)

const hasData = computed(() => {
  // Only consider we have data if we have actual repos
  return data.value && Array.isArray(data.value) && data.value.length > 0
})

const isEmpty = computed(() => {
  // Show empty state if we're hydrated, not loading, no error, and have empty array
  return isHydrated.value && !pending.value && !hasError.value && data.value && Array.isArray(data.value) && data.value.length === 0
})

const showFallback = computed(() => {
  // This should rarely trigger - only if something unexpected happens
  return isHydrated.value && !pending.value && !hasError.value && !hasData.value && !isEmpty.value && data.value === null
})

// Enhanced refresh function with loading state
const handleRefresh = async () => {
  try {
    await refresh()
  } catch (refreshError) {
    console.error('Refresh failed:', refreshError)
  }
}

// Set comprehensive SEO meta
setPageMeta({
  title: 'Abdulbarry - Projects',
  description: 'Explore my open-source projects and contributions on GitHub. Vue.js, Nuxt.js, and TypeScript applications showcasing modern web development practices.',
  keywords: 'GitHub Projects, Vue.js Projects, Nuxt.js Applications, TypeScript Projects, Open Source, Frontend Portfolio, Web Development Projects',
  ogTitle: 'Abdulbarry - Projects Portfolio',
  ogDescription: 'Discover innovative web applications and open-source contributions using Vue.js, Nuxt.js, and modern web technologies.',
  ogImage: '/images/projects-og.jpg',
  ogType: 'website'
})

// Set breadcrumbs
setBreadcrumbs([
  { name: 'Home', url: '/' },
  { name: 'Projects', url: '/projects' }
])

// Add collection page structured data - only when we have valid data
watch(() => data.value, (repos) => {
  if (repos && Array.isArray(repos) && repos.length > 0) {
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
