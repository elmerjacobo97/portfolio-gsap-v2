import Link from 'next/link'

import { cn } from '@/lib/cn'

/**
 * Renders a next/link for internal routes and a plain anchor for external ones.
 * The arrow is a separate span so Phase 2 can tween it independently on hover.
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
      <span aria-hidden className="arrow inline-block">
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
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
