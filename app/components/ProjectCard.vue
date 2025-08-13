<template>
	<a
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
					<Icon name="heroicons:cube" class="project-icon" />
				</div>
				<div>
					<h3 class="project-title">{{ repo.name }}</h3>
				</div>
			</div>

			<!-- GitHub Icon (Visual indicator) -->
			<div class="project-github-indicator">
				<Icon name="logos:github-icon" class="project-github-icon" />
			</div>
		</div>

		<!-- Description -->
		<p class="project-description line-clamp-3">
			{{ repo.description || 'No description available for this repository.' }}
		</p>
	</a>
</template>

<script setup lang="ts">
interface Repo {
	id: number | string
	name: string
	html_url: string
	description?: string | null
}

defineProps<{
	repo: Repo
	index: number
}>()
</script>

<style scoped>
/* Uses styles from Projects.css via parent page import */
</style>
