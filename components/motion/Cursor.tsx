'use client'

import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { FINE } from '@/lib/motion'

/**
 * Custom cursor dot. Only active under `(pointer: fine)` — touch devices
 * never see it. `quickTo` gives a cheap, GPU-friendly follow instead of
 * re-tweening `x`/`y` on every mousemove.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(FINE, () => {
      const dot = dotRef.current
      if (!dot) return

      const moveX = gsap.quickTo(dot, 'x', { duration: 0.35, ease: 'power3' })
      const moveY = gsap.quickTo(dot, 'y', { duration: 0.35, ease: 'power3' })

      const onMove = (e: PointerEvent) => {
        moveX(e.clientX)
        moveY(e.clientY)
      }

      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    })

    return () => mm.revert()
  })

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="cursor-dot bg-accent pointer-events-none fixed top-0 left-0 z-[80] hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference [@media(pointer:fine)]:block"
    />
  )
}
