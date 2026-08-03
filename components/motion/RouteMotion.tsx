'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

/**
 * Renders nothing. On every route change: snap scroll to top, wait two
 * animation frames (one for React to commit the new tree, one for the browser
 * to lay it out), then refresh ScrollTrigger so its start/end values are
 * measured against the new page instead of the old one — and only then lift
 * the curtain, so the wipe never reveals an unmeasured page.
 */
export function RouteMotion() {
  const pathname = usePathname()
  const isFirst = useRef(true)

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    const smoother = ScrollSmoother.get()
    smoother?.scrollTo(0, false)

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        smoother?.paused(false)

        gsap.to('.curtain', {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 0.55,
          ease: 'expo.inOut',
        })
      })
    })

    return () => cancelAnimationFrame(raf)
  }, [pathname])

  return null
}
