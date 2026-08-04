'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { gsap, ScrollSmoother, useGSAP } from '@/lib/gsap'

/**
 * A <Link> that plays the curtain wipe before navigating.
 *
 * Deliberately NOT React's <ViewTransition>: that API snapshots the document,
 * but #smooth-content carries a live transform while the fixed chrome sits
 * outside it, so the snapshots come out wrong and the nav double-renders.
 */
export function TransitionLink({
  href,
  children,
  className,
  prefetch = true,
  onFocus,
  onBlur,
}: {
  href: string
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  /** Callers that animate on hover pass these to mirror the state on focus. */
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>
  onBlur?: React.FocusEventHandler<HTMLAnchorElement>
}) {
  const router = useRouter()
  const { contextSafe } = useGSAP()

  const handleClick = contextSafe((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle modified clicks (new tab, download, …).
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return
    }

    e.preventDefault()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(href)
      return
    }

    ScrollSmoother.get()?.paused(true)

    gsap.to('.curtain', {
      scaleY: 1,
      transformOrigin: 'bottom',
      duration: 0.55,
      ease: 'expo.inOut',
      onComplete: () => router.push(href),
    })
  })

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onClick={handleClick}
      onPointerEnter={() => router.prefetch(href)}
      onFocus={onFocus}
      onBlur={onBlur}
      className={className}
    >
      {children}
    </Link>
  )
}
