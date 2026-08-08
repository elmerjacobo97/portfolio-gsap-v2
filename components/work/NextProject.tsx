'use client'

import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, EASE, hoverDuration } from '@/lib/motion'
import { TransitionLink } from '@/components/motion/TransitionLink'

export function NextProject({
  project,
  locale,
  label,
}: {
  project: Project
  locale: Locale
  label: string
}) {
  const rootRef = useRef<HTMLElement>(null)
  const { contextSafe } = useGSAP({ scope: rootRef })

  const handleEnter = contextSafe((el: HTMLElement) => {
    gsap.to(el.querySelectorAll('.next-title, .next-arrow'), {
      x: 16,
      duration: hoverDuration(DUR.base - 0.1),
      ease: EASE.sweep,
      overwrite: 'auto',
    })
  })

  const handleLeave = contextSafe((el: HTMLElement) => {
    gsap.to(el.querySelectorAll('.next-title, .next-arrow'), {
      x: 0,
      duration: hoverDuration(DUR.base - 0.1),
      ease: EASE.sweep,
      overwrite: 'auto',
    })
  })

  return (
    <section
      ref={rootRef}
      onMouseEnter={(e) => handleEnter(e.currentTarget)}
      onMouseLeave={(e) => handleLeave(e.currentTarget)}
      className="border-rule border-t"
    >
      <TransitionLink
        href={`/${locale}/work/${project.slug}`}
        className="group block py-[var(--spacing-section)]"
      >
        <div className="grid-page">
          <p className="u-label text-accent col-span-12">{label}</p>
          <div className="col-span-12 mt-6 flex items-end justify-between gap-8">
            <h2 className="text-display u-wide next-title group-hover:text-accent min-w-0 transition-colors duration-300">
              {t(project.title, locale)}
            </h2>
            <ArrowUpRight
              aria-hidden
              size={40}
              strokeWidth={1.5}
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="next-arrow text-accent size-8 shrink-0 md:size-12"
            />
          </div>
        </div>
      </TransitionLink>
    </section>
  )
}
