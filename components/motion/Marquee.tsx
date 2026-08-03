'use client'

import { useRef } from 'react'

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'
import { cn } from '@/lib/cn'

/**
 * Infinite horizontal loop. `children` is rendered twice and the track moves
 * -50%, so the seam is invisible. Scroll direction flips `timeScale` through
 * a `quickTo` — the easing on that flip is what makes it read as intentional
 * rather than as a glitch.
 */
export function Marquee({
  children,
  duration = 26,
  className,
  trackClassName,
}: {
  children: React.ReactNode
  duration?: number
  className?: string
  trackClassName?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const track = rootRef.current?.querySelector('.marquee-track')
        if (!track) return

        const loop = gsap.to(track, {
          xPercent: -50,
          repeat: -1,
          duration,
          ease: 'none',
        })

        const setTimeScale = gsap.quickTo(loop, 'timeScale', {
          duration: 0.4,
          ease: 'power2',
        })

        const trigger = ScrollTrigger.create({
          onUpdate: (self) => setTimeScale(self.direction === 1 ? 1 : -1),
        })

        return () => {
          trigger.kill()
          loop.kill()
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <div ref={rootRef} className={cn('overflow-hidden', className)}>
      <div className={cn('marquee-track flex w-max', trackClassName)}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
