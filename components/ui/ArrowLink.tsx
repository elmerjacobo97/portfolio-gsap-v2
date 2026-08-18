import { ArrowDown, ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/cn'
import type { AnalyticsEvent } from '@/lib/analytics'
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
  direction = 'up-right',
  analyticsEvent,
  analyticsSource,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
  tone?: 'default' | 'action'
  direction?: 'up-right' | 'down'
  analyticsEvent?: AnalyticsEvent
  analyticsSource?: string
}) {
  const classes = cn(
    'group/arrow-link inline-flex gap-2 transition-[background-color,color] duration-200',
    tone === 'action'
      ? 'items-center justify-center bg-accent-fill !text-on-accent min-h-11 whitespace-nowrap px-4 py-3 hover:bg-accent-fill/90 hover:!text-on-accent focus-visible:!outline-text'
      : 'items-baseline text-text hover:text-accent',
    className,
  )

  const Icon = direction === 'down' ? ArrowDown : ArrowUpRight
  const iconMotion =
    direction === 'down'
      ? 'group-hover/arrow-link:translate-y-1 group-focus-visible/arrow-link:translate-y-1'
      : 'group-hover/arrow-link:translate-x-1 group-hover/arrow-link:-translate-y-1 group-focus-visible/arrow-link:translate-x-1 group-focus-visible/arrow-link:-translate-y-1'

  const content = (
    <>
      <span>{children}</span>
      {/*
       * The arrow used to carry a `.arrow` class with no rule and no tween
       * behind it, so this — the site's most repeated affordance — was the one
       * that never moved. CSS rather than GSAP: it is a two-property hover on
       * a link, and the global reduced-motion block already neutralises it.
       */}
      <Icon
        aria-hidden
        size={16}
        strokeWidth={1.5}
        strokeLinecap="square"
        strokeLinejoin="miter"
        className={cn(
          'arrow inline-block transition-transform duration-300 ease-(--ease-brutal)',
          iconMotion,
        )}
      />
    </>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics-event={analyticsEvent}
        data-analytics-source={analyticsSource}
        className={classes}
      >
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
