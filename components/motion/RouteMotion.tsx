'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

/**
 * Renders nothing. On every route change, wait for React and layout, refresh
 * ScrollTrigger, then position the page at the URL hash (or at the top when no
 * hash exists) before lifting the curtain.
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

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const hash = window.location.hash.slice(1)
        const target = hash ? document.getElementById(hash) : null

        if (smoother) {
          smoother.scrollTo(target ?? 0, false, target ? 'top top' : undefined)
        } else if (target) {
          target.scrollIntoView()
        } else {
          window.scrollTo(0, 0)
        }

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
