/**
 * Blog utilities for common operations
 * These functions are used across blog-related components
 */

/**
 * Format a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Calculate reading time based on content
 * @param content - Post content (string or object)
 * @param wordsPerMinute - Reading speed (default: 200)
 * @returns Reading time string
 */
export function calculateReadingTime(content: string | object, wordsPerMinute = 200): string {
  if (!content) return '5 min read'
  
  let text = ''
  if (typeof content === 'string') {
    text = content
  } else {
    text = JSON.stringify(content)
  }
  
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Extract slug from a post path
 * @param path - Full post path
 * @returns Slug string
 */
export function getPostSlug(path: string): string {
  return path?.split('/').pop() || ''
}

/**
 * Validate if a post has all required fields
 * @param post - Blog post object
 * @returns Boolean indicating if post is valid
 */
export function isValidPost(post: any): boolean {
  return !!(
    post &&
    post.title &&
    post.title.trim().length > 0 &&
    post.body &&
    post.body.toString().trim().length > 0 &&
    post.date &&
    post.path
  )
}

/**
 * Sort posts by date (newest first)
 * @param posts - Array of blog posts
 * @returns Sorted posts array
 */
export function sortPostsByDate(posts: any[]): any[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date || '').getTime()
    const dateB = new Date(b.date || '').getTime()
    return dateB - dateA
  })
}

/**
 * Filter posts by search query
 * @param posts - Array of blog posts
 * @param query - Search query string
 * @returns Filtered posts array
 */
export function filterPostsBySearch(posts: any[], query: string): any[] {
  if (!query) return posts
  
  const lowerCaseQuery = query.toLowerCase()
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerCaseQuery) ||
    (post.description && post.description.toLowerCase().includes(lowerCaseQuery)) ||
    (post.body && JSON.stringify(post.body).toLowerCase().includes(lowerCaseQuery))
  )
}

/**
 * Filter posts by selected tags
 * @param posts - Array of blog posts
 * @param selectedTags - Array of selected tag strings
 * @returns Filtered posts array
 */
export function filterPostsByTags(posts: any[], selectedTags: string[]): any[] {
  if (selectedTags.length === 0) return posts
  
  return posts.filter(post =>
    post.tags && post.tags.some((tag: string) => selectedTags.includes(tag))
  )
}

/**
 * Extract all tags from posts with their counts
 * @param posts - Array of blog posts
 * @returns Map of tags with their occurrence counts
 */
export function extractTagsWithCounts(posts: any[]): Map<string, number> {
  const tags = new Map<string, number>()
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach((tag: string) => {
        tags.set(tag, (tags.get(tag) || 0) + 1)
      })
    }
  })
  
  return tags
}
