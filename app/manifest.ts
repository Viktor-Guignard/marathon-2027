import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
const base = process.env.GITHUB_PAGES === 'true' ? '/marathon-2027' : '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: `${base}/`,
    name: 'Stride · Marathon 2027',
    short_name: 'Stride',
    description: 'Ton carnet personnel de préparation marathon.',
    start_url: `${base}/`,
    scope: `${base}/`,
    display: 'standalone',
    background_color: '#f7f8f5',
    theme_color: '#f7f8f5',
    icons: [
      { src: `${base}/icons/icon-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${base}/icons/icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${base}/icons/icon-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
