import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

/**
 * `not-found.tsx` renders without route params, so it cannot know the locale.
 * It falls back to the default one — the same choice the root redirect makes.
 */
export default async function NotFound() {
  const dict = await getDictionary(defaultLocale)

  return (
    <main className="grid-page min-h-svh content-center py-[var(--spacing-section)]">
      <p className="text-numeral u-wide u-outline col-span-12">404</p>

      <span className="rule-h col-span-12 my-10" />

      <div className="col-span-12 lg:col-span-6">
        <h1 className="text-h1 u-wide">{dict.notFound.title}</h1>
        <p className="text-lead text-chalk-200 mt-6">{dict.notFound.body}</p>
        <Link
          href={`/${defaultLocale}`}
          className="u-meta text-accent mt-10 inline-block hover:underline"
        >
          {dict.notFound.cta}
          <ArrowUpRight
            aria-hidden
            size={16}
            strokeWidth={1.5}
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="ml-1 inline-block align-[-0.2em]"
          />
        </Link>
      </div>
    </main>
  )
}
