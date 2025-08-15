export default defineEventHandler(async (event) => {
  const userName = 'abdulbarry-dev'
  const reposApiUrl = `https://api.github.com/users/${userName}/repos`
  
  try {
    // Add CORS headers for client-side requests
    setHeaders(event, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'max-age=300' // Cache for 5 minutes
    })

    const response = await $fetch(reposApiUrl, {
      params: {
        sort: 'updated',
        per_page: 12,
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'personal-portfolio-server'
      },
      timeout: 10000, // Server can have longer timeout
      retry: 2
    })

    // Transform and validate response
    if (!Array.isArray(response)) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Invalid response format from GitHub API'
      })
    }

    // Filter and return only the needed data
    const repos = response.slice(0, 12).map(repo => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
      topics: repo.topics || []
    }))

    return repos
  } catch (error: any) {
    console.error('GitHub API server error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch GitHub repositories'
    })
  }
})
