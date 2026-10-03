import type { MetadataRoute } from 'next'

import { site } from '@/shared/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.shortName} | ${site.role}`,
    short_name: site.shortName,
    description:
      'Portfolio de Elmer Jacobo, product engineer y desarrollador full stack.',
    start_url: '/es',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#050505',
    theme_color: '#d4ff3f',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
