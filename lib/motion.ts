/**
 * Shared matchMedia queries. Every animated section branches on these instead
 * of a React `useState` for prefers-reduced-motion — a state branch causes a
 * hydration-safe-but-jarring flash; matchMedia inside useGSAP does not.
 */
export const OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const DESKTOP = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
/**
 * The reduced-motion clause is not optional here: this is the query the mobile
 * branch of a section pairs with DESKTOP, and without it the mobile branch is
 * the one hole through which animation reaches a user who asked for none.
 */
export const MOBILE = '(max-width: 767px) and (prefers-reduced-motion: no-preference)'
export const FINE = '(pointer: fine) and (prefers-reduced-motion: no-preference)'

/**
 * The motion vocabulary. Four gestures, each with one job — reach for the name,
 * not the curve, so the whole site accelerates the same way.
 */
export const EASE = {
  /** Entrances and reveals. Fast out of the gate, long settle. */
  brutal: 'expo.out',
  /** Anything that leaves and comes back: curtains, accordions, Flip. */
  cut: 'expo.inOut',
  /** Hover fills sweeping in, arrows travelling. */
  sweep: 'power3.out',
  /** Hover fills retreating — leaves should be quicker than enters. */
  retreat: 'power3.in',
  /** Type landing after a mask reveal. */
  settle: 'power4.out',
} as const

export const DUR = {
  /** Hover leaves, small state flips. */
  fast: 0.35,
  /** Hover enters, most UI transitions. */
  base: 0.6,
  /** Section reveals, curtain, clip wipes. */
  slow: 1.1,
} as const

/**
 * Duration for a pointer-state tween (hover fills, arrow travel, the cursor).
 *
 * These run from event handlers, not from inside a `gsap.matchMedia` block, so
 * they need their own answer for reduced motion. Skipping them outright is the
 * wrong one: hover feedback is how a pointer user learns something is
 * interactive, and the CSS `transition-duration` override next to it keeps the
 * `:hover` half of the same affordance. Land on the end state instantly.
 */
export function hoverDuration(seconds: number) {
  if (typeof window === 'undefined') return seconds
  return window.matchMedia(REDUCED).matches ? 0 : seconds
}
