'use client'

import { useRef } from 'react'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { gsap, useGSAP } from '@/lib/gsap'
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
    gsap.to(el.querySelectorAll('.next-title'), {
      x: 16,
      duration: 0.5,
      ease: 'power3.out',
    })
  })

  const handleLeave = contextSafe((el: HTMLElement) => {
    gsap.to(el.querySelectorAll('.next-title'), {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
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
          <h2 className="text-display u-wide next-title group-hover:text-accent col-span-12 mt-6 transition-colors duration-300">
            {t(project.title, locale)}
          </h2>
        </div>
      </TransitionLink>
    </section>
  )
}
