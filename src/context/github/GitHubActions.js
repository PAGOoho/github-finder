import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  console.log();

  return response.data.items;
};

export const getUserAndRepos = async (username) => {
  const [userResponse, reposResponse] = await Promise.all([
    github.get(`/users/${username}`),
    github.get(`/users/${username}/repos`),
  ]);

  return { user: userResponse.data, repos: reposResponse.data };
};
