'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { locales, type Locale } from '@/i18n/config'

/**
 * Slugs are deliberately not translated, so switching locale is a pure swap of
 * path segment 0 — it works identically on `/es` and on `/es/work/<slug>`.
 */
export function LocaleSwitcher({
  locale,
  label,
}: {
  locale: Locale
  label: string
}) {
  const pathname = usePathname()
  const other = locales.find((l) => l !== locale) ?? locale

  const segments = pathname.split('/')
  segments[1] = other
  const href = segments.join('/') || `/${other}`

  return (
    <Link
      href={href}
      prefetch
      aria-label={label}
      className="u-meta text-text-dim hover:text-accent transition-colors duration-200"
    >
      <span aria-hidden className={locale === 'es' ? 'text-text' : undefined}>
        ES
      </span>
      <span aria-hidden className="text-ink-600 mx-1">
        /
      </span>
      <span aria-hidden className={locale === 'en' ? 'text-text' : undefined}>
        EN
      </span>
    </Link>
  )
}
