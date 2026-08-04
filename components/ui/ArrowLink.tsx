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
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  className?: string
}) {
  const classes = cn(
    'group text-text hover:text-accent inline-flex items-baseline gap-2 transition-colors duration-200',
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
      <span
        aria-hidden
        className="arrow inline-block transition-transform duration-300 ease-(--ease-brutal) group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1"
      >
        ↗
      </span>
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
