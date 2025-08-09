
const userName = 'abdulbarry-dev';
const reposApiUrl = `https://api.github.com/users/${userName}/repos`;

export const useGithubRepos = async () => {
  const { data, error } = await useFetch(reposApiUrl, {
    params: {
      sort: 'updated',
      per_page: 12,
    },
    // Performance optimizations
    key: `github-repos-${userName}`,
    server: true,
    lazy: true,
    default: () => [],
    transform: (data: any[]) => {
      // Transform and filter data on server for better performance
      return data?.slice(0, 12) || [];
    }
  });

  if (error.value) {
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching repos:', error.value);
    }
  }

  return data.value || [];
};
