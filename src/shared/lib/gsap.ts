'use client'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

// Module-level registration, deep imports only — never `gsap/all`, which
// would pull every plugin (including ones we don't use) into the bundle.
// Same rule applies to this list: a plugin lands here when a component
// imports it, not before.
gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  ScrambleTextPlugin,
)

gsap.defaults({ ease: 'power3.out', duration: 0.8 })
ScrollTrigger.config({ ignoreMobileResize: true })

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  // Dev-only console access for the leak checks described in the plan:
  // `ScrollTrigger.getAll().length` and `ScrollSmoother.get()`. Stripped
  // from the production bundle by the NODE_ENV check above.
  Object.assign(window, { gsap, ScrollTrigger, ScrollSmoother })
}

export {
  gsap,
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Flip,
  ScrambleTextPlugin,
}
