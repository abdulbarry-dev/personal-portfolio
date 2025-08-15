
const userName = 'abdulbarry-dev';
const reposApiUrl = `https://api.github.com/users/${userName}/repos`;

export const useGithubRepos = async () => {
  try {
    const { data, error } = await useFetch(reposApiUrl, {
      params: {
        sort: 'updated',
        per_page: 12,
      },
      // Performance optimizations
      key: `github-repos-${userName}`,
      server: false, // Disable SSR to avoid hydration mismatches
      lazy: false, // Ensure data is fetched before component renders
      timeout: 8000, // Match service worker timeout
      retry: 2, // Retry failed requests
      retryDelay: 1000, // Add delay between retries
      // Transform response data
      transform: (data: any[]) => {
        // Only transform if data exists and is an array
        if (Array.isArray(data) && data.length > 0) {
          return data.slice(0, 12);
        }
        // Return empty array for empty response
        if (Array.isArray(data) && data.length === 0) {
          return [];
        }
        return null;
      },
      // Add request headers for better GitHub API compatibility
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'personal-portfolio'
      }
    });

    // Handle errors explicitly
    if (error.value) {
      // Try server endpoint as fallback
      return await tryServerFallback();
    }

    // Handle null/undefined data
    if (data.value === null || data.value === undefined) {
      return await tryServerFallback();
    }

    return data.value;
  } catch (fetchError: any) {
    // Try server endpoint as fallback
    return await tryServerFallback();
  }
};

// Separate function for server fallback
async function tryServerFallback() {
  try {
    const { data, error } = await useFetch('/api/github/repos', {
      key: `github-repos-server-${userName}`,
      server: false,
      timeout: 10000,
      retry: 1
    });

    if (error.value) {
      throw createError({
        statusCode: error.value.statusCode || 500,
        statusMessage: error.value.statusMessage || 'Server endpoint also failed',
        data: error.value
      });
    }

    return data.value || [];
  } catch (serverError: any) {
    // If both direct and server endpoints fail, throw final error
    throw createError({
      statusCode: serverError.statusCode || 500,
      statusMessage: serverError.statusMessage || 'All GitHub API endpoints failed',
      data: serverError
    });
  }
}
