<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style scoped>
/* Custom prose enhancements for better readability */
.prose {
  color: #374151;
  line-height: 1.7;
}

.prose code:not(pre code) {
  @apply bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono;
  font-weight: 500;
}

.prose pre {
  @apply bg-transparent p-0 m-0;
}

/* Better blockquote styling */
.prose blockquote {
  @apply border-l-4 border-blue-500 bg-blue-50 py-2 px-4 my-6 italic;
}

.prose blockquote p {
  @apply text-blue-900 mb-0;
}

/* Table styling */
.prose table {
  @apply w-full border-collapse border border-gray-300 my-6;
}

.prose th,
.prose td {
  @apply border border-gray-300 px-4 py-2;
}

.prose th {
  @apply bg-gray-50 font-semibold text-gray-900;
}

/* Link styling */
.prose a {
  @apply text-blue-600 no-underline hover:text-blue-700 hover:underline;
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