import type { NextConfig } from 'next'

import { defaultLocale } from './i18n/config'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${defaultLocale}`,
        // 307, not 308: a permanent redirect gets cached by the browser and
        // would fight the Accept-Language negotiation planned for Phase 6.
        permanent: false,
      },
    ]
  },
  experimental: {
    // The root layout is `[locale]`, so invalid locale paths can throw
    // `notFound()` before that segment's `not-found.tsx` is mounted.
    globalNotFound: true,
    serverActions: {
      // A text contact form never needs the 1 MB default.
      bodySizeLimit: '64kb',
    },
  },
}

export default nextConfig
