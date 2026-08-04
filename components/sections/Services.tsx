'use client'

import { useRef, useState } from 'react'

import { services } from '@/data/services'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { Rule } from '@/components/ui/Rule'
import { cn } from '@/lib/cn'
import { gsap, ScrollTrigger, Flip, useGSAP } from '@/lib/gsap'
import { DUR, EASE, OK, REDUCED, hoverDuration } from '@/lib/motion'
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
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>('.svc-row')

        const triggers = ScrollTrigger.batch(rows, {
          start: 'top 85%',
          onEnter: (batch) => {
            gsap.from(batch, {
              yPercent: 8,
              autoAlpha: 0,
              duration: DUR.base + 0.2,
              stagger: 0.09,
              ease: EASE.sweep,
              overwrite: true,
            })
            // The rule draws with its own row. Previously this ran once on
            // mount for every rule at once, so rows still below the fold had
            // already spent their reveal by the time they were seen.
            gsap.from(
              batch.map((row) => row.querySelector('.svc-rule')),
              {
                scaleX: 0,
                transformOrigin: 'left center',
                duration: DUR.slow,
                ease: EASE.brutal,
                stagger: 0.09,
                overwrite: true,
              },
            )
          },
        })

        return () => triggers.forEach((st) => st.kill())
      })

      return () => mm.revert()
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

      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        Flip.from(state, {
          duration: DUR.base + 0.05,
          ease: EASE.cut,
          absolute: true,
          nested: true,
          onEnter: (els) =>
            gsap.from(els, {
              autoAlpha: 0,
              y: 24,
              stagger: 0.04,
              duration: DUR.fast + 0.15,
            }),
          onLeave: (els) =>
            gsap.to(els, { autoAlpha: 0, y: -16, duration: DUR.fast }),
          // The accordion changes page height — every other ScrollTrigger's
          // start/end values are stale until this runs.
          onComplete: () => ScrollTrigger.refresh(),
        })
      })

      // Reduced motion still needs the layout measured again: React already
      // swapped the panel in, the animation is the only thing being skipped.
      mm.add(REDUCED, () => {
        ScrollTrigger.refresh()
      })

      return () => mm.revert()
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
      duration: hoverDuration(DUR.base - 0.1),
      ease: EASE.sweep,
      overwrite: 'auto',
    })
    gsap.to(row.querySelectorAll('.svc-ink'), {
      color: 'var(--color-ink-950)',
      duration: hoverDuration(DUR.fast - 0.05),
      overwrite: 'auto',
    })
    gsap.to(row.querySelector('.svc-index'), {
      duration: hoverDuration(DUR.fast + 0.05),
      scrambleText: { text: code, chars: '0123456789/', speed: 0.6 },
      overwrite: 'auto',
    })
  })

  const handleLeave = contextSafe((row: HTMLElement, code: string) => {
    gsap.to(row.querySelector('.svc-fill'), {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: hoverDuration(DUR.fast),
      ease: EASE.retreat,
      overwrite: 'auto',
    })
    gsap.to(row.querySelectorAll('.svc-ink'), {
      color: '',
      duration: hoverDuration(DUR.fast - 0.05),
      overwrite: 'auto',
    })
    // The scramble is a one-way tween with no reverse. Leaving mid-flight used
    // to let it keep chewing on an element the pointer had already left, so
    // the index could sit on a garbage frame; kill it and restore the code.
    const index = row.querySelector('.svc-index')
    if (index) {
      gsap.killTweensOf(index)
      index.textContent = code
    }
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
              onMouseLeave={(e) => handleLeave(e.currentTarget, service.code)}
            >
              <Rule className="svc-rule" />

              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleToggle(service.code)}
                  // Keyboard gets the same fill as the pointer. Without these
                  // the row was the only affordance in the section that a
                  // tabbing user could not see reacting.
                  onFocus={(e) =>
                    handleEnter(e.currentTarget.closest('.svc-row')!, service.code)
                  }
                  onBlur={(e) =>
                    handleLeave(e.currentTarget.closest('.svc-row')!, service.code)
                  }
                  className="relative w-full py-8 text-left"
                >
                  <span
                    aria-hidden
                    className="svc-fill bg-accent absolute inset-0 origin-left scale-x-0"
                  />
                  <span className="grid-page relative items-center">
                    <span className="u-label svc-index svc-ink col-span-2 md:col-span-1">
                      {service.code}
                    </span>
                    <span className="text-h2 u-wide svc-ink col-span-8 md:col-span-8">
                      {t(service.title, locale)}
                    </span>
                    {/*
                     * The accordion's whole affordance used to be a 13px "+"
                     * glyph in the gutter. Two rules that cross and uncross
                     * read at a glance and animate; `bg-current` keeps them on
                     * the same colour tween as `.svc-ink`.
                     */}
                    <span className="col-span-2 flex justify-end md:col-span-3">
                      <span
                        aria-hidden
                        className="svc-ink relative block size-6 md:size-8"
                      >
                        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                        <span
                          className={cn(
                            'absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current transition-transform duration-500 ease-(--ease-brutal)',
                            isOpen ? 'rotate-0' : 'rotate-90',
                          )}
                        />
                      </span>
                    </span>
                  </span>
                </button>
              </h3>

              {isOpen ? (
                /*
                 * Pitch and deliverables sit side by side under the title
                 * rather than pinned to opposite gutters — the old 2/9 split
                 * left columns 5–8 empty across the widest part of the row.
                 */
                <div id={panelId} className="grid-page svc-body pb-14">
                  <p className="text-lead text-chalk-200 col-span-12 max-w-[46ch] md:col-span-5 md:col-start-2">
                    {t(service.pitch, locale)}
                  </p>

                  <div className="col-span-12 mt-8 md:col-span-4 md:col-start-8 md:mt-0">
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
