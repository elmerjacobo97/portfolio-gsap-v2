import type { Metadata } from 'next'

import { defaultLocale, locales, type Locale } from '@/i18n/config'

/**
 * Builds canonical + hreflang alternates for a path that exists in every
 * locale. `path` is the part AFTER the locale segment, e.g. '' or '/work/x'.
 */
export function buildAlternates(locale: Locale, path = ''): Metadata['alternates'] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
      'x-default': `/${defaultLocale}${path}`,
    },
  }
}
