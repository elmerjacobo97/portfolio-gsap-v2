'use client'

import { useRef } from 'react'

import { featured } from '@/data/projects'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { WorkCard } from '@/components/work/WorkCard'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
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
        const splits: SplitText[] = []

        cards.forEach((card) => {
          const media = card.querySelector<HTMLElement>('.work-media')
          const image = card.querySelector<HTMLImageElement>('.case-media')
          const title = card.querySelector<HTMLElement>('.work-title')

          const tl = gsap.timeline({
            scrollTrigger: { trigger: card, start: 'top 78%' },
          })

          if (media) {
            tl.fromTo(
              media,
              { clipPath: 'inset(0% 0% 100% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'expo.out' },
            )
          }

          // Real screenshots get a counter-zoom under the clip reveal; the
          // CSS-only placeholder plate has no inner image to zoom.
          if (image) {
            tl.from(image, { scale: 1.18, duration: 1.4, ease: 'expo.out' }, '<')
          }

          if (title) {
            splits.push(
              SplitText.create(title, {
                type: 'lines',
                mask: 'lines',
                autoSplit: true,
                onSplit(self) {
                  return gsap.from(self.lines, {
                    yPercent: 110,
                    stagger: 0.08,
                    duration: 0.9,
                    ease: 'power4.out',
                    scrollTrigger: { trigger: card, start: 'top 80%' },
                  })
                },
              }),
            )
          }
        })

        return () => splits.forEach((s) => s.revert())
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

      <div ref={containerRef} className="grid-page mt-20 lg:gap-y-[14vh]">
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
