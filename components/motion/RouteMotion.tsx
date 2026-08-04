'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

import { gsap, ScrollSmoother, ScrollTrigger } from '@/lib/gsap'
import { DUR, EASE, REDUCED } from '@/lib/motion'

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

    let innerRaf = 0

    const outerRaf = requestAnimationFrame(() => {
      innerRaf = requestAnimationFrame(() => {
        ScrollTrigger.refresh()
        const smoother = ScrollSmoother.get()
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

        const curtain = document.querySelector('.curtain')
        const hidden = { scaleY: 0, transformOrigin: 'top' }

        if (window.matchMedia(REDUCED).matches) {
          gsap.set(curtain, hidden)
        } else {
          gsap.to(curtain, {
            ...hidden,
            duration: DUR.base,
            ease: EASE.cut,
            overwrite: 'auto',
          })
        }
      })
    })

    return () => {
      cancelAnimationFrame(outerRaf)
      cancelAnimationFrame(innerRaf)
    }
  }, [pathname])

  return null
}
