import type { MetadataRoute } from 'next'

import { site } from '@/shared/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.shortName} | Desarrollador full stack`,
    short_name: site.shortName,
    description:
      'Portfolio de Elmer Jacobo: landing pages, webs, apps móviles y sistemas a medida.',
    start_url: '/es',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#080d14',
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
