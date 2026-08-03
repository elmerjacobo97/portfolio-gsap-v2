'use client'

/**
 * Full-screen wipe played between routes. Fixed, so it must stay a sibling of
 * <SmoothProvider/>, never inside it.
 *
 * Starts at scaleY 0 (invisible). <TransitionLink/> drives it down from the
 * bottom before navigating; <RouteMotion/> lifts it off the top once the new
 * page has committed and been measured.
 */
export function Curtain() {
  return (
    <div
      aria-hidden
      // The hidden state lives in globals.css (see the `.curtain` rule) —
      // Tailwind's scale utilities use the CSS `scale` property and would
      // override anything GSAP writes to `transform`.
      className="curtain bg-accent pointer-events-none fixed inset-0 z-[90]"
    />
  )
}
