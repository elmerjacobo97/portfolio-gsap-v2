'use client'

/**
 * One-shot signal between <Intro/> and the hero timeline.
 *
 * A promise rather than a DOM event because ordering is not guaranteed: when
 * the intro is skipped (already seen this session, or reduced motion) it
 * resolves during its own effect, which may run before the hero has attached
 * a listener. A promise is order-independent — a late `.then()` still fires.
 */
let resolveIntro: () => void = () => {}

export const introDone = new Promise<void>((resolve) => {
  resolveIntro = resolve
})

export function markIntroDone() {
  resolveIntro()
}

// Safety net: if <Intro/> is ever removed from the tree, the hero must still
// animate. Resolving twice is a no-op.
if (typeof window !== 'undefined') {
  setTimeout(markIntroDone, 3000)
}
