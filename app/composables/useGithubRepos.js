
const userName = 'abdulbarry-dev';
const reposApiUrl = `https://api.github.com/users/${userName}/repos`;


export const useGithubRepos = async () => {
  const { data, error } = await useFetch(reposApiUrl, {
    params: {
      sort: 'updated',
      per_page: 12,
    }
  });

  if (error.value) {
    console.error('Error fetching repos:', error.value);
  }

  return data.value || [];
};
