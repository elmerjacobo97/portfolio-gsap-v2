'use client'

import Link from 'next/link'
import { useRef } from 'react'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { MediaPlate } from './MediaPlate'

/** Column placement alternates so the grid never reads as a table of cards. */
const PLACEMENT = [
  'lg:col-span-7 lg:col-start-1',
  'lg:col-span-7 lg:col-start-6 lg:mt-[12vh]',
  'lg:col-span-8 lg:col-start-1',
] as const

export function WorkCard({
  project,
  locale,
  index,
  viewLabel,
}: {
  project: Project
  locale: Locale
  index: number
  viewLabel: string
}) {
  const rootRef = useRef<HTMLElement>(null)
  const { contextSafe } = useGSAP({ scope: rootRef })

  // The card element comes from the event, not the ref — reading a ref inside
  // a function created during render is exactly what react-hooks/refs forbids.
  const handleEnter = contextSafe((card: HTMLElement) => {
    gsap.to(card.querySelectorAll('.work-media'), {
      scale: 1.02,
      duration: 0.6,
      ease: 'power3.out',
    })
    gsap.to(card.querySelectorAll('.work-arrow'), {
      x: 6,
      y: -6,
      duration: 0.35,
      ease: 'power3.out',
    })
  })

  const handleLeave = contextSafe((card: HTMLElement) => {
    gsap.to(card.querySelectorAll('.work-media'), {
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
    })
    gsap.to(card.querySelectorAll('.work-arrow'), {
      x: 0,
      y: 0,
      duration: 0.35,
      ease: 'power3.out',
    })
  })

  return (
    <article
      ref={rootRef}
      onMouseEnter={(e) => handleEnter(e.currentTarget)}
      onMouseLeave={(e) => handleLeave(e.currentTarget)}
      className={cn(
        'work-card col-span-12 mt-20 first:mt-0 lg:mt-0',
        PLACEMENT[index % PLACEMENT.length],
      )}
    >
      <Link href={`/${locale}/work/${project.slug}`} className="group block">
        <div className="u-meta text-text-dim work-meta flex flex-wrap gap-x-4 gap-y-1">
          <span>{project.year}</span>
          <span aria-hidden className="text-ink-600">
            /
          </span>
          <span>{t(project.role, locale)}</span>
          <span aria-hidden className="text-ink-600">
            /
          </span>
          <span>{project.stack.slice(0, 3).join(' · ')}</span>
        </div>

        <MediaPlate
          project={project}
          locale={locale}
          className="work-media mt-5"
        />

        <div className="mt-6 flex items-baseline justify-between gap-6">
          <h3 className="text-h2 u-wide work-title group-hover:text-accent transition-colors duration-300">
            {t(project.title, locale)}
          </h3>
          <span className="u-label text-accent flex shrink-0 items-baseline gap-2">
            {viewLabel}
            <span aria-hidden className="work-arrow inline-block">
              ↗
            </span>
          </span>
        </div>

        <p className="text-body text-chalk-200 mt-3 max-w-[46ch]">
          {t(project.tagline, locale)}
        </p>
      </Link>
    </article>
  )
}
