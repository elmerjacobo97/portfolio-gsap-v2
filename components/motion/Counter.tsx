'use client'

import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, OK } from '@/lib/motion'

/**
 * Counts up to the leading integer in `value` once, the first time it enters
 * the viewport. Non-numeric values ("∞") render statically — no match, no
 * tween.
 *
 * Under `prefers-reduced-motion: reduce` nothing runs at all: the server
 * already rendered the final string, so the correct reduced treatment is to
 * leave it alone rather than tween to a value it is showing.
 */
export function Counter({
  value,
  className,
}: {
  value: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      const match = /^(\d+)(.*)$/.exec(value)
      if (!el || !match) return

      const [, digits, suffix] = match
      const target = Number(digits)

      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const counter = { v: 0 }

        const tween = gsap.to(counter, {
          v: target,
          duration: DUR.slow * 1.3,
          ease: 'power2.out',
          snap: { v: 1 },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.v)}${suffix}`
          },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })

        // Restore the server-rendered string, not `0` — mm.revert() would
        // otherwise leave whatever frame the tween happened to be on.
        return () => {
          tween.kill()
          el.textContent = value
        }
      })

      return () => mm.revert()
    },
    { scope: ref, dependencies: [value] },
  )

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
