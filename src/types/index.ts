// Types pour les projets GitHub
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  fork: boolean;
  private: boolean;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

// Types pour les projets personnels
export interface PersonalProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  images?: string[];
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'other';
  status: 'completed' | 'in-progress' | 'archived';
  created_at: Date;
  updated_at: Date;
}

// Type unifié pour tous les projets
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  images?: string[];
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'other';
  status: 'completed' | 'in-progress' | 'archived';
  source: 'github' | 'personal';
  stars?: number;
  forks?: number;
  language?: string;
  created_at: Date;
  updated_at: Date;
}

// Types pour les filtres
export interface ProjectFilters {
  search?: string;
  category?: string;
  technology?: string;
  source?: 'github' | 'personal' | 'all';
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'archived';
}

// Types pour les stats
export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  mostUsedLanguages: Array<{
    language: string;
    count: number;
    percentage: number;
  }>;
  lastUpdated: Date;
}

// Types pour l'utilisateur GitHub
export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  blog: string | null;
  location: string | null;
  email: string | null;
  company: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 