'use client'

import { useRef } from 'react'

import { featured } from '@/data/projects'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { WorkCard } from '@/components/work/WorkCard'
import { gsap, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'
import { SectionHeader } from './SectionHeader'

export function Work({
  dict,
  locale,
}: {
  dict: Dictionary['work']
  locale: Locale
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.work-card')

        cards.forEach((card) => {
          const meta = card.querySelector<HTMLElement>('.work-meta')
          const media = card.querySelector<HTMLElement>('.work-media')
          const image = card.querySelector<HTMLImageElement>('.case-media')
          const title = card.querySelector<HTMLElement>('.work-title')
          const close = card.querySelectorAll<HTMLElement>('.work-close')

          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: 'top 78%' },
          })

          if (meta) {
            tl.from(meta, { opacity: 0, y: 12, duration: 0.45, ease: 'power3.out' })
          }

          if (media) {
            tl.fromTo(
              media,
              { clipPath: 'inset(0% 0% 100% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' },
              0.08,
            )
          }

          // Real screenshots get a counter-zoom under the clip reveal; the
          // CSS-only placeholder plate has no inner image to zoom.
          if (image) {
            tl.from(image, { scale: 1.18, duration: 1.4, ease: 'expo.out' }, 0.08)
          }

          if (title) {
            tl.from(
              title,
              {
                clipPath: 'inset(0% 0% 100% 0%)',
                y: 28,
                duration: 0.9,
                ease: 'power4.out',
              },
              '-=0.55',
            )
          }

          tl.from(
            close,
            { opacity: 0, y: 12, stagger: 0.06, duration: 0.45, ease: 'power3.out' },
            '-=0.45',
          )
        })
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <section id="work" className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div
        ref={containerRef}
        className="grid-page mt-16 gap-y-16 md:mt-20 md:gap-y-24 lg:gap-y-[12vh]"
      >
        {featured().map((project, i) => (
          <WorkCard
            key={project.slug}
            project={project}
            locale={locale}
            index={i}
            viewLabel={dict.viewCase}
          />
        ))}
      </div>
    </section>
  )
}
