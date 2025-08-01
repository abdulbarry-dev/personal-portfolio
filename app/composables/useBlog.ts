/**
 * Blog composable for shared blog functionality
 * Provides common blog operations and state management
 */

import { 
  isValidPost,
  extractTagsWithCounts,
  filterPostsBySearch,
  filterPostsByTags,
  sortPostsByDate
} from '~/utils/blog'

export const useBlog = () => {
  /**
   * Fetch all blog posts
   */
  const fetchBlogPosts = async () => {
    try {
      const blogPosts = await queryCollection('blog').all()
      return blogPosts
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch blog posts'
      })
    }
  }

  /**
   * Get valid and sorted blog posts
   */
  const getValidSortedPosts = (posts: any[]) => {
    const validPosts = posts.filter(isValidPost)
    return sortPostsByDate(validPosts)
  }

  /**
   * Create filtered posts based on search and tags
   */
  const createFilteredPosts = (posts: any[], searchQuery: string, selectedTags: string[]) => {
    let filtered = posts
    
    // Apply search filter
    filtered = filterPostsBySearch(filtered, searchQuery)
    
    // Apply tag filters
    filtered = filterPostsByTags(filtered, selectedTags)
    
    return filtered
  }

  /**
   * Get blog post navigation data
   */
  const getBlogNavigation = (posts: any[], currentSlug: string) => {
    const validSortedPosts = getValidSortedPosts(posts)
    
    const currentIndex = validSortedPosts.findIndex(p => {
      const postSlug = p.path?.split('/').pop()
      return postSlug === currentSlug
    })
    
    if (currentIndex === -1) {
      return null
    }
    
    const currentPost = validSortedPosts[currentIndex]
    const previousPost = currentIndex > 0 ? validSortedPosts[currentIndex - 1] : null
    const nextPost = currentIndex < validSortedPosts.length - 1 ? validSortedPosts[currentIndex + 1] : null
    
    return {
      currentPost,
      previousPost,
      nextPost,
      totalPosts: validSortedPosts.length,
      currentIndex: currentIndex + 1
    }
  }

  return {
    fetchBlogPosts,
    getValidSortedPosts,
    createFilteredPosts,
    getBlogNavigation,
    // Re-export utility functions for convenience
    isValidPost,
    extractTagsWithCounts,
    filterPostsBySearch,
    filterPostsByTags,
    sortPostsByDate
  }
}
