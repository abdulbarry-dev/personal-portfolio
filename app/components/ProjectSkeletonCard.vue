<template>
  <div class="skeleton-card">
    <!-- Header Skeleton -->
    <div class="skeleton-header">
      <div class="skeleton-icon-container">
        <div class="skeleton-icon"></div>
        <div class="skeleton-title-container">
          <div class="skeleton-title"></div>
        </div>
      </div>
      <div class="skeleton-github-icon"></div>
    </div>

    <!-- Description Skeleton -->
    <div class="skeleton-description">
      <div class="skeleton-desc-line full"></div>
      <div class="skeleton-desc-line three-quarters"></div>
      <div class="skeleton-desc-line half"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure presentational skeleton; styles live in Projects.css
</script>

<style scoped>
@import '../assets/css/ProjectSkeletonCard.css';
</style>
