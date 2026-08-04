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

    // Links to the current document (the brand mark from /es#services back to
    // /es, for example) do not trigger RouteMotion because pathname is
    // unchanged. Handle them in place; otherwise the curtain would cover the
    // page and never receive the route-change signal that retracts it.
    const sameDocument =
      e.currentTarget.pathname === window.location.pathname &&
      e.currentTarget.search === window.location.search

    if (sameDocument) {
      const hash = e.currentTarget.hash.slice(1)
      const target = hash ? document.getElementById(hash) : null
      const smoother = ScrollSmoother.get()

      window.history.replaceState(
        null,
        '',
        `${e.currentTarget.pathname}${e.currentTarget.search}${e.currentTarget.hash}`,
      )

      if (smoother) {
        smoother.scrollTo(target ?? 0, true, target ? 'top top' : undefined)
      } else if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

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
