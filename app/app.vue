<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-200">
    <NuxtLayout>
      <div class="flex-1">
        <NuxtPage />
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
/* Custom prose enhancements for better readability */
.prose {
  @apply text-gray-700 dark:text-gray-300;
  line-height: 1.7;
}

.prose code:not(pre code) {
  @apply bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono;
  font-weight: 500;
}

.prose pre {
  @apply bg-transparent p-0 m-0;
}

/* Better blockquote styling */
.prose blockquote {
  @apply border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 py-2 px-4 my-6 italic;
}

.prose blockquote p {
  @apply text-blue-900 dark:text-blue-100 mb-0;
}

/* Table styling */
.prose table {
  @apply w-full border-collapse border border-gray-300 dark:border-gray-700 my-6;
}

.prose th,
.prose td {
  @apply border border-gray-300 dark:border-gray-700 px-4 py-2;
}

.prose th {
  @apply bg-gray-50 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100;
}

/* Link styling */
.prose a {
  @apply text-blue-600 dark:text-blue-400 no-underline hover:text-blue-700 dark:hover:text-blue-300 hover:underline;
  font-weight: 500;
}

/* List styling */
.prose ul {
  @apply list-disc pl-6;
}

.prose ol {
  @apply list-decimal pl-6;
}

.prose li {
  @apply mb-1;
}
</style>