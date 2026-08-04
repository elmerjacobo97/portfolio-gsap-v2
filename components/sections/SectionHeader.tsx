'use client'

import { useRef } from 'react'

import { Rule } from '@/components/ui/Rule'
import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, EASE, OK } from '@/lib/motion'

export function SectionHeader({
  index,
  title,
  lead,
}: {
  index: string
  title: string
  lead?: string
}) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        const index = root.querySelector('.section-header-index')
        const title = root.querySelector('.section-header-title')
        const leadCopy = root.querySelector('.section-header-lead')
        const rule = root.querySelector('.section-header-rule')
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top 82%', once: true },
        })

        timeline
          .from(index, {
            opacity: 0,
            y: 12,
            duration: DUR.fast,
            ease: EASE.settle,
            immediateRender: false,
          })
          .from(
            title,
            {
              clipPath: 'inset(0% 0% 100% 0%)',
              y: 32,
              duration: DUR.slow,
              ease: EASE.brutal,
              immediateRender: false,
            },
            0.08,
          )

        if (leadCopy) {
          timeline.from(
            leadCopy,
            {
              opacity: 0,
              y: 18,
              duration: DUR.base,
              ease: EASE.settle,
              immediateRender: false,
            },
            0.28,
          )
        }

        timeline.from(
          rule,
          {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: DUR.slow,
            ease: EASE.brutal,
            immediateRender: false,
          },
          0.2,
        )
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <header
      ref={rootRef}
      className="section-header col-span-12 grid grid-cols-12 gap-x-[var(--spacing-gutter)]"
    >
      {/* The index sits on its own line: baseline-aligning an 11px mono label
          against a 68px display title reads as a collision, not a pairing. */}
      <p className="section-header-index u-label text-accent col-span-12 mb-5">
        {index}
      </p>
      <h2 className="section-header-title text-h1 u-wide col-span-12 lg:col-span-6">
        {title}
      </h2>

      {lead ? (
        <p className="section-header-lead text-lead text-chalk-200 col-span-12 mt-8 max-w-[46ch] lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-end">
          {lead}
        </p>
      ) : null}

      <Rule className="section-header-rule col-span-12 mt-8" />
    </header>
  )
}
