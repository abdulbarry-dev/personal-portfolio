<script setup lang="ts">
interface Props {
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 6
})
</script>

<template>
  <div class="skeleton-container">
    <!-- Search Bar Skeleton -->
    <div class="skeleton-search">
      <div class="skeleton-search-bar"></div>
    </div>
    
    <!-- Tags Skeleton -->
    <div class="skeleton-tags">
      <div class="skeleton-tags-label"></div>
      <div v-for="n in 4" :key="n" class="skeleton-tag"></div>
    </div>
    
    <!-- Blog Cards Skeleton Grid -->
    <div class="skeleton-grid">
      <div v-for="n in count" :key="n" class="skeleton-card">
        <div class="skeleton-card-content">
          <!-- Card Header -->
          <div class="skeleton-card-body">
            <!-- Date and Reading Time Badges -->
            <div class="skeleton-badges">
              <div class="skeleton-badge-date"></div>
              <div class="skeleton-badge-time"></div>
            </div>
            
            <!-- Title -->
            <div class="skeleton-title">
              <div class="skeleton-title-line1"></div>
              <div class="skeleton-title-line2"></div>
            </div>
            
            <!-- Description -->
            <div class="skeleton-description">
              <div class="skeleton-desc-line1"></div>
              <div class="skeleton-desc-line2"></div>
              <div class="skeleton-desc-line3"></div>
            </div>
            
            <!-- Tags -->
            <div class="skeleton-footer">
              <div class="skeleton-footer-tag1"></div>
              <div class="skeleton-footer-tag2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import './../assets/css/BlogLoadingSkeleton.css';
</style>
