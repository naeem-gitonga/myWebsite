// Site configuration for Open Graph and metadata
export const siteConfig = {
  // Base URL changes based on environment
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.naeemgitonga.com',
  siteName: 'Naeem Gitonga',
  author: 'Naeem Gitonga',
};

// Helper to get absolute URL
export function getAbsoluteUrl(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.baseUrl}${normalizedPath}`;
}
