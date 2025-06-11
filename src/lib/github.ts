import { GitHubRepository, GitHubUser, GitHubStats } from '@/types';

// Configuration de base pour l'API GitHub
const GITHUB_API_BASE ='https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

// Headers communs pour les requêtes GitHub
const getHeaders = () => ({
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Portfolio-App',
  ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` }),
});

// Fonction utilitaire pour les requêtes API
async function githubFetch<T>(endpoint: string): Promise<T> {
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not configured');
  }

  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: getHeaders(),
    next: { revalidate: 900 }, // Cache pendant 15 minutes
  });

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded');
    }
    if (response.status === 401) {
      throw new Error('GitHub token is invalid');
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

// Récupérer les informations de l'utilisateur GitHub
export async function getGitHubUser(username?: string): Promise<GitHubUser> {
  const user = username || GITHUB_USERNAME;
  if (!user) {
    throw new Error('GitHub username not provided');
  }

  return githubFetch<GitHubUser>(`/users/${user}`);
}

// Récupérer tous les repositories publics
export async function getGitHubRepositories(
  username?: string,
  options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name';
    direction?: 'asc' | 'desc';
    per_page?: number;
    type?: 'all' | 'owner' | 'public' | 'private' | 'member';
  } = {}
): Promise<GitHubRepository[]> {
  const user = username || GITHUB_USERNAME;
  if (!user) {
    throw new Error('GitHub username not provided');
  }

  const {
    sort = 'updated',
    direction = 'desc',
    per_page = 100,
    type = 'owner'
  } = options;

  const queryParams = new URLSearchParams({
    sort,
    direction,
    per_page: per_page.toString(),
    type,
  });

  const repos = await githubFetch<GitHubRepository[]>(
    `/users/${user}/repos?${queryParams}`
  );

  // Filtrer les repositories intéressants
  return repos.filter(repo => 
    !repo.fork && // Exclure les forks
    !repo.archived && // Exclure les repos archivés
    repo.size > 0 && // Exclure les repos vides
    !repo.name.includes('.github.io') && // Exclure les sites GitHub Pages basiques
    repo.name !== user // Exclure le repo README personnel
  );
}

// Récupérer un repository spécifique
export async function getGitHubRepository(
  owner: string,
  repo: string
): Promise<GitHubRepository> {
  return githubFetch<GitHubRepository>(`/repos/${owner}/${repo}`);
}

// Récupérer les langages d'un repository
export async function getRepositoryLanguages(
  owner: string,
  repo: string
): Promise<Record<string, number>> {
  return githubFetch<Record<string, number>>(`/repos/${owner}/${repo}/languages`);
}

// Récupérer les statistiques GitHub globales
export async function getGitHubStats(username?: string): Promise<GitHubStats> {
  const user = username || GITHUB_USERNAME;
  if (!user) {
    throw new Error('GitHub username not provided');
  }

  const [, repos] = await Promise.all([
    getGitHubUser(user),
    getGitHubRepositories(user, { per_page: 100 })
  ]);

  // Calculer les statistiques
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  // Calculer les langages les plus utilisés
  const languageStats: Record<string, number> = {};
  
  for (const repo of repos) {
    if (repo.language) {
      languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
    }
  }

  const totalReposWithLanguage = Object.values(languageStats).reduce((sum, count) => sum + count, 0);
  
  const mostUsedLanguages = Object.entries(languageStats)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / totalReposWithLanguage) * 100)
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 langages

  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    mostUsedLanguages,
    lastUpdated: new Date(),
  };
}

// Récupérer le contenu du README d'un repository
export async function getRepositoryReadme(
  owner: string,
  repo: string
): Promise<string | null> {
  try {
    const response = await githubFetch<{ content: string; encoding: string }>(
      `/repos/${owner}/${repo}/readme`
    );
    
    if (response.encoding === 'base64') {
      return Buffer.from(response.content, 'base64').toString('utf-8');
    }
    
    return response.content;
  } catch {
    // README not found or not accessible
    return null;
  }
}

// Vérifier si le token GitHub est valide
export async function validateGitHubToken(): Promise<boolean> {
  try {
    await githubFetch('/user');
    return true;
  } catch {
    return false;
  }
}

// Récupérer les repositories populaires (avec le plus d'étoiles)
export async function getPopularRepositories(
  username?: string,
  limit: number = 6
): Promise<GitHubRepository[]> {
  const repos = await getGitHubRepositories(username);
  
  return repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit);
}

// Récupérer les repositories récents
export async function getRecentRepositories(
  username?: string,
  limit: number = 6
): Promise<GitHubRepository[]> {
  const repos = await getGitHubRepositories(username, {
    sort: 'updated',
    direction: 'desc'
  });
  
  return repos.slice(0, limit);
} 