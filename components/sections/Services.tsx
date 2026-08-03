'use client'

import { useRef, useState } from 'react'

import { services } from '@/data/services'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { Rule } from '@/components/ui/Rule'
import { gsap, ScrollTrigger, Flip, useGSAP } from '@/lib/gsap'
import { SectionHeader } from './SectionHeader'

export function Services({
  dict,
  locale,
}: {
  dict: Dictionary['services']
  locale: Locale
}) {
  const [open, setOpen] = useState<string | null>(services[0]?.code ?? null)
  const containerRef = useRef<HTMLDivElement>(null)
  const flipStateRef = useRef<ReturnType<typeof Flip.getState> | null>(null)

  // Group entrance: one ScrollTrigger.batch instead of one trigger per row,
  // so rows entering the viewport together read as a single reveal.
  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>('.svc-row')

      const triggers = ScrollTrigger.batch(rows, {
        start: 'top 85%',
        onEnter: (batch) =>
          gsap.from(batch, {
            yPercent: 8,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: 'power3.out',
            overwrite: true,
          }),
      })

      gsap.from('.svc-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.09,
      })

      return () => triggers.forEach((st) => st.kill())
    },
    { scope: containerRef },
  )

  // Flip captures the "before" DOM state synchronously in the click handler
  // (handleToggle), then this effect plays the transition to the new layout.
  useGSAP(
    () => {
      const state = flipStateRef.current
      if (!state) return
      flipStateRef.current = null

      Flip.from(state, {
        duration: 0.65,
        ease: 'power3.inOut',
        absolute: true,
        nested: true,
        onEnter: (els) =>
          gsap.from(els, { autoAlpha: 0, y: 24, stagger: 0.04, duration: 0.5 }),
        onLeave: (els) => gsap.to(els, { autoAlpha: 0, y: -16, duration: 0.3 }),
        // The accordion changes page height — every other ScrollTrigger's
        // start/end values are stale until this runs.
        onComplete: () => ScrollTrigger.refresh(),
      })
    },
    { scope: containerRef, dependencies: [open], revertOnUpdate: true },
  )

  const handleToggle = (code: string) => {
    flipStateRef.current = Flip.getState('.svc-row, .svc-body')
    setOpen((prev) => (prev === code ? null : code))
  }

  // contextSafe: handlers that CREATE tweens must be registered with the
  // GSAP context, otherwise those tweens survive unmount and leak.
  const { contextSafe } = useGSAP({ scope: containerRef })

  const handleEnter = contextSafe((row: HTMLElement, code: string) => {
    gsap.to(row.querySelector('.svc-fill'), {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: 0.5,
      ease: 'power3.out',
    })
    gsap.to(row.querySelectorAll('.svc-ink'), {
      color: 'var(--color-ink-950)',
      duration: 0.3,
    })
    gsap.to(row.querySelector('.svc-index'), {
      duration: 0.4,
      scrambleText: { text: code, chars: '0123456789/', speed: 0.6 },
    })
  })

  const handleLeave = contextSafe((row: HTMLElement) => {
    gsap.to(row.querySelector('.svc-fill'), {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 0.4,
      ease: 'power3.in',
    })
    gsap.to(row.querySelectorAll('.svc-ink'), { color: '', duration: 0.3 })
  })

  return (
    <section id="services" className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div ref={containerRef} className="mt-20">
        {services.map((service) => {
          const isOpen = open === service.code
          const panelId = `svc-panel-${service.code}`

          return (
            <div
              key={service.code}
              className="svc-row relative"
              onMouseEnter={(e) => handleEnter(e.currentTarget, service.code)}
              onMouseLeave={(e) => handleLeave(e.currentTarget)}
            >
              <Rule className="svc-rule" />

              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(service.code)}
                  className="relative w-full py-8 text-left"
                >
                  <span
                    aria-hidden
                    className="svc-fill bg-accent absolute inset-0 origin-left scale-x-0"
                  />
                  <span className="grid-page relative items-baseline">
                    <span className="u-label svc-index svc-ink col-span-2 md:col-span-1">
                      {service.code}
                    </span>
                    <span className="text-h2 u-wide svc-ink col-span-9 md:col-span-8">
                      {t(service.title, locale)}
                    </span>
                    <span
                      aria-hidden
                      className="u-meta svc-ink col-span-1 text-right md:col-span-3"
                    >
                      {isOpen ? '—' : '+'}
                    </span>
                  </span>
                </button>
              </h3>

              {isOpen ? (
                <div id={panelId} className="grid-page svc-body pb-12">
                  <p className="text-body text-chalk-200 col-span-12 max-w-[52ch] md:col-span-6 md:col-start-2">
                    {t(service.pitch, locale)}
                  </p>

                  <div className="col-span-12 mt-8 md:col-span-4 md:col-start-9 md:mt-0">
                    <p className="u-label mb-4">{dict.deliverables}</p>
                    <ul className="text-body text-chalk-200 space-y-2">
                      {t(service.deliverables, locale).map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="text-accent">
                            /
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}
        <Rule />
      </div>
    </section>
  )
}
