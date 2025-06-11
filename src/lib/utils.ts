import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utilitaire pour combiner les classes Tailwind CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Fonction pour formater une date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

// Fonction pour formater un nombre (ex: 1000 -> 1k)
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("fr-FR").format(num);
}

// Fonction pour générer un slug à partir d'un titre
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Fonction pour extraire le nom du repository depuis une URL GitHub
export function extractRepoName(url: string): string {
  const match = url.match(/github\.com\/[^\/]+\/([^\/]+)/);
  return match ? match[1] : '';
}

// Fonction pour obtenir la couleur d'un langage de programmation
export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#239120',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    SCSS: '#c6538c',
    Vue: '#4FC08D',
    React: '#61DAFB',
    Angular: '#DD0031',
    Svelte: '#ff3e00',
  };
  
  return colors[language] || '#6b7280';
}

// Fonction pour déboucer une fonction (utile pour la recherche)
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Fonction pour tronquer du texte
export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

// Fonction pour valider une URL
export function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch {
    // L'erreur est ignorée intentionnellement : URL invalide
    return false;
  }
}

// Fonction pour calculer le temps de lecture estimé
export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
} 