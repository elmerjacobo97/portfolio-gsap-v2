'use client'

/**
 * `#smooth-wrapper` / `#smooth-content` is the required ScrollSmoother markup.
 *
 * NON-NEGOTIABLE: the `transform` GSAP applies to #smooth-content creates a
 * new containing block, so any `position: fixed` descendant would become
 * fixed to the scrolling content instead of the viewport. Every fixed element
 * (Nav, GridOverlay, Cursor, ScrollProgress, Curtain, MobileMenu) MUST render
 * as a sibling of this component in app/[locale]/layout.tsx — never inside
 * `children`. If something needs to stick while scrolling, use ScrollTrigger
 * `pin`, not `position: fixed`.
 */

import { useRef } from 'react'

import { gsap, ScrollSmoother, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'

export function SmoothProvider({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        // ScrollSmoother.get() de-dupes across React 19 StrictMode's
        // double-invoke of effects in development.
        const smoother =
          ScrollSmoother.get() ??
          ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2,
            smoothTouch: 0, // native scroll on touch — keeps iOS momentum
            // Off, and it should stay off until something actually carries a
            // data-speed/data-lag attribute: with it on, ScrollSmoother walks
            // the content on every refresh looking for effect targets and
            // finds none. Parallax on this site comes from ScrollTrigger
            // scrubs, which do not need it.
            effects: false,
            ignoreMobileResize: true,
          })

        return () => smoother.kill()
      })

      return () => mm.revert()
    },
    { scope: wrapperRef },
  )

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content">{children}</div>
    </div>
  )
}
