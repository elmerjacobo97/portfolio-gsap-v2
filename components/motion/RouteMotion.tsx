'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

/**
 * Renders nothing. On every route change: snap scroll to top, wait two
 * animation frames (one for React to commit the new tree, one for the
 * browser to lay it out), then refresh ScrollTrigger so its start/end values
 * are measured against the new page instead of the old one.
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

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    })
  }, [pathname])

  return null
}
