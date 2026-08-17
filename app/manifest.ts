import type { MetadataRoute } from 'next'

import { site } from '@/data/site'

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
    ],
  }
}
