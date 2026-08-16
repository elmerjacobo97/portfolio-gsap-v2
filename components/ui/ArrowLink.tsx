import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/cn'
import { TransitionLink } from '@/components/motion/TransitionLink'

/**
 * Internal links go through the curtain wipe, external ones open in a new tab.
 * Keeping both behind one component is what stops half the internal links on
 * the site from wiping and the other half from jumping.
 */
export function ArrowLink({
  href,
  children,
  external,
  className,
  tone = 'default',
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
  tone?: 'default' | 'action'
}) {
  const classes = cn(
    'group/arrow-link inline-flex items-baseline gap-2 transition-[background-color,color] duration-200',
    tone === 'action'
      ? 'bg-accent-fill !text-on-accent min-h-11 whitespace-nowrap px-4 py-3 hover:bg-accent-fill/90 hover:!text-on-accent focus-visible:!outline-text'
      : 'text-text hover:text-accent',
    className,
  )

  const content = (
    <>
      <span>{children}</span>
      {/*
       * The arrow used to carry a `.arrow` class with no rule and no tween
       * behind it, so this — the site's most repeated affordance — was the one
       * that never moved. CSS rather than GSAP: it is a two-property hover on
       * a link, and the global reduced-motion block already neutralises it.
       */}
      <ArrowUpRight
        aria-hidden
        size={16}
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
        className="arrow inline-block transition-transform duration-300 ease-(--ease-brutal) group-hover/arrow-link:translate-x-1 group-hover/arrow-link:-translate-y-1 group-focus-visible/arrow-link:translate-x-1 group-focus-visible/arrow-link:-translate-y-1"
      />
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <TransitionLink href={href} className={classes}>
      {content}
    </TransitionLink>
  )
}
