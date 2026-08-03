'use client'

import { useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const bar = barRef.current
    if (!bar) return

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
    })

    return () => trigger.kill()
  })

  return (
    <div
      aria-hidden
      className="bg-rule fixed inset-x-0 top-0 z-[70] h-0.5"
    >
      <span
        ref={barRef}
        className="bg-accent block h-full w-full origin-left scale-x-0"
      />
    </div>
  )
}
