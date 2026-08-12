import type { MetadataRoute } from 'next'

import { site } from '@/data/site'
import { defaultLocale, locales } from '@/i18n/config'

const url = (path: string) => new URL(path, site.url).toString()

/** Every entry carries its own hreflang alternates, per Google's guidance. */
function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, url(`/${l}${path}`)])),
      'x-default': url(`/${defaultLocale}${path}`),
    },
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['']
  const lastModified = new Date()

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: url(`/${locale}${path}`),
      lastModified,
      changeFrequency: path === '' ? ('monthly' as const) : ('yearly' as const),
      priority: path === '' ? 1 : 0.8,
      alternates: alternates(path),
    })),
  )
}
