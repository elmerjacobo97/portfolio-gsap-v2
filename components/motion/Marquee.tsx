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
          paused: true,
        })

        const setTimeScale = gsap.quickTo(loop, 'timeScale', {
          duration: 0.4,
          ease: 'power2',
        })

        const trigger = ScrollTrigger.create({
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
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
        <div className="marquee-copy-primary flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="marquee-copy-clone flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  )
}
