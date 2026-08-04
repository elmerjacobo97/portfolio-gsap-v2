'use client'

import { useRef } from 'react'

import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, FINE } from '@/lib/motion'

/** Everything the dot should react to. Opt anything else in with `data-cursor`. */
const INTERACTIVE = 'a, button, [data-cursor]'

/**
 * Custom cursor dot. Only active under `(pointer: fine)` — touch devices
 * never see it. `quickTo` gives a cheap, GPU-friendly follow instead of
 * re-tweening `x`/`y` on every mousemove.
 *
 * Over anything interactive it swells into a lens. `mix-blend-difference` is
 * already on the element, so the swollen disc inverts the type underneath
 * rather than covering it — the reaction costs one `scale` and no layout.
 * A bespoke cursor that never acknowledges a link reads as broken, which is
 * what this was doing before.
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
      // gsap.to, not quickTo: quickTo cannot take the `scale` shorthand
      // ("scale not eligible for reset"), and this fires on entering a link,
      // not on every frame, so there is nothing for quickTo to save.
      const resize = (value: number) =>
        gsap.to(dot, {
          scale: value,
          duration: DUR.fast,
          ease: 'power3.out',
          overwrite: 'auto',
        })

      const onMove = (e: PointerEvent) => {
        moveX(e.clientX)
        moveY(e.clientY)
      }

      // One delegated listener rather than a pair per element. `pointerover`
      // bubbles and fires on every element the pointer enters, so leaving a
      // link fires it again on whatever is underneath — `closest` returns null
      // there and the dot shrinks. Both directions, one handler.
      let active: Element | null = null

      const onOver = (e: PointerEvent) => {
        const target = e.target
        const hit =
          target instanceof Element ? target.closest(INTERACTIVE) : null
        if (hit === active) return
        active = hit
        resize(hit ? 3.6 : 1)
      }

      window.addEventListener('pointermove', onMove)
      document.addEventListener('pointerover', onOver)

      return () => {
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
      }
    })

    return () => mm.revert()
  })

  return (
    <div
      ref={dotRef}
      aria-hidden
      /*
     * The reduced-motion query is part of the CSS, not just the matchMedia
     * branch: without it the dot still renders for reduced-motion visitors on
     * a fine pointer, frozen at the top-left corner because no mousemove
     * listener is ever attached.
     */
    className="cursor-dot bg-accent pointer-events-none fixed top-0 left-0 z-[80] hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-difference [@media(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block"
    />
  )
}
