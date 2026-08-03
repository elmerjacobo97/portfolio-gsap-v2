/**
 * Shared matchMedia queries. Every animated section branches on these instead
 * of a React `useState` for prefers-reduced-motion — a state branch causes a
 * hydration-safe-but-jarring flash; matchMedia inside useGSAP does not.
 */
export const OK = '(prefers-reduced-motion: no-preference)'
export const REDUCED = '(prefers-reduced-motion: reduce)'
export const DESKTOP = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
export const MOBILE = '(max-width: 767px)'
export const FINE = '(pointer: fine) and (prefers-reduced-motion: no-preference)'

export const EASE = {
  brutal: 'expo.out',
  cut: 'expo.inOut',
  elastic: 'elastic.out(1, 0.3)',
} as const

export const DUR = {
  fast: 0.35,
  base: 0.6,
  slow: 1.1,
} as const
