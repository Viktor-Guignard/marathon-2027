import type { NextConfig } from 'next';
const onGitHubPages = process.env.GITHUB_PAGES === 'true';
const nextConfig: NextConfig = {
  ...(onGitHubPages ? { output: 'export', basePath: '/marathon-2027' } : {}),
  trailingSlash: true,
};
export default nextConfig;
