'use client'

import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'

/**
 * Counts up to the leading integer in `value` once, the first time it enters
 * the viewport. Non-numeric values ("∞") render statically — no match, no
 * tween.
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
      const counter = { v: 0 }

      const tween = gsap.to(counter, {
        v: target,
        duration: 1.4,
        ease: 'power2.out',
        snap: { v: 1 },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.v)}${suffix}`
        },
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      })

      return () => tween.kill()
    },
    { scope: ref, dependencies: [value] },
  )

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
