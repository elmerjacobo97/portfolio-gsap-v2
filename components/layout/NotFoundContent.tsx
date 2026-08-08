import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Dictionary } from '@/i18n/dictionary'

type NotFoundContentProps = {
  copy: Dictionary['notFound']
  href: string
}

export function NotFoundContent({ copy, href }: NotFoundContentProps) {
  return (
    <main
      id="main"
      className="grid-page min-h-svh content-center py-[var(--spacing-section)] text-center"
    >
      <p className="text-numeral u-wide u-outline col-span-12">404</p>

      <div className="col-span-12 mt-10 lg:col-span-6 lg:col-start-4">
        <h1 className="text-h1 u-wide">{copy.title}</h1>
        <p className="text-lead text-chalk-200 mt-6">{copy.body}</p>
        <Link
          href={href}
          className="u-meta text-accent mt-10 inline-block hover:underline"
        >
          {copy.cta}
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
