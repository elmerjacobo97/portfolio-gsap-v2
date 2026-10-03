'use client'

import { useRef } from 'react'

import { personalProjects } from '../data/projects'
import type { Dictionary } from '@/shared/i18n/dictionary'
import type { Locale } from '@/shared/i18n/config'
import { ProjectCard } from './project-card'
import { gsap, useGSAP } from '@/shared/lib/gsap'
import { DUR, EASE, OK } from '@/shared/lib/motion'
import { SectionHeader } from '@/shared/components/ui/section-header'

export function Projects({
  dict,
  locale,
}: {
	dict: Dictionary['projects']
	locale: Locale
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const container = containerRef.current
        if (!container || container.getBoundingClientRect().top <= window.innerHeight) return

        const cards = Array.from(container.querySelectorAll<HTMLElement>('.project-card'))

        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: DUR.slow,
            ease: EASE.brutal,
            stagger: 0.12,
            scrollTrigger: { trigger: container, start: 'top 82%', once: true },
          },
        )
      })

      return () => mm.revert()
    },
    { scope: containerRef },
  )

  return (
    <section id="projects" className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div
        ref={containerRef}
        className="grid-page mt-16 gap-y-16 md:mt-20 md:gap-y-24 lg:gap-y-[12vh]"
      >
        {personalProjects().map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            locale={locale}
            index={i}
            openLabel={dict.openProject}
          />
        ))}
      </div>
    </section>
  )
}
