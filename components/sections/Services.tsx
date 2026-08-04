'use client'

import { useCallback, useRef, useState } from 'react'

import { services } from '@/data/services'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { Rule } from '@/components/ui/Rule'
import { cn } from '@/lib/cn'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { DUR, EASE, hoverDuration } from '@/lib/motion'
import { SectionHeader } from './SectionHeader'

/**
 * When a row counts as lit. Must stay identical to the selector in
 * globals.css that turns `.svc-ink` to ink — the acid fill lives in GSAP and
 * the ink colour lives in CSS, and the two disagreeing is what produced black
 * text on a black row.
 */
const LIT = ':hover, :has(:focus-visible)'

export function Services({
  dict,
  locale,
}: {
  dict: Dictionary['services']
  locale: Locale
}) {
  const [open, setOpen] = useState<string | null>(services[0]?.code ?? null)
  const containerRef = useRef<HTMLDivElement>(null)
  const accordionRef = useRef<gsap.core.Timeline | null>(null)

  /**
   * Reconciles every row's hover styling against what is really under the
   * pointer.
   *
   * Opening a panel moves the rows below it while the pointer stays put, and a
   * row that slides out from under the cursor never receives `mouseleave` —
   * its acid fill stays swept in over a row nobody is pointing at.
   *
   * The ink colour is CSS `:hover` (see globals.css) precisely so it cannot
   * desync. The fill has to stay in GSAP because it flips transform-origin
   * between enter and leave, so it gets reconciled here instead: `:hover` is
   * the browser's own answer to "what is under the pointer", which beats
   * inferring it from events that did not fire.
   */
  const syncHoverState = useCallback(() => {
    const rows = containerRef.current?.querySelectorAll<HTMLElement>('.svc-row')

    rows?.forEach((row) => {
      if (row.matches(LIT)) return

      const fill = row.querySelector('.svc-fill')
      const index = row.querySelector<HTMLElement>('.svc-index')

      gsap.set(fill, { scaleX: 0, transformOrigin: 'right center' })

      if (index) {
        gsap.killTweensOf(index)
        index.textContent = row.dataset.code ?? index.textContent
      }
    })
  }, [])

  // Panels stay mounted so interrupted transitions can continue from their
  // current height instead of reconciling entering/leaving DOM nodes.
  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>(
        '.svc-panel',
        containerRef.current,
      )

      panels.forEach((panel) => {
        const isOpen = panel.dataset.code === open
        gsap.set(panel, { height: isOpen ? 'auto' : 0 })
        gsap.set(panel.querySelector('.svc-body'), {
          autoAlpha: isOpen ? 1 : 0,
          y: 0,
        })
      })

      return () => accordionRef.current?.kill()
    },
    { scope: containerRef },
  )

  // contextSafe: handlers that CREATE tweens must be registered with the
  // GSAP context, otherwise those tweens survive unmount and leak.
  const { contextSafe } = useGSAP({ scope: containerRef })

  const handleToggle = (code: string) => {
    const next = open === code ? null : code
    const panels = gsap.utils.toArray<HTMLElement>(
      '.svc-panel',
      containerRef.current,
    )

    accordionRef.current?.kill()

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const timeline = gsap.timeline({
      defaults: { ease: EASE.cut, overwrite: 'auto' },
      onComplete: () => {
        panels.forEach((panel) => {
          const body = panel.querySelector('.svc-body')
          if (panel.dataset.code === next) {
            gsap.set(panel, { height: 'auto' })
            gsap.set(body, { clearProps: 'opacity,visibility,transform' })
          } else {
            gsap.set(panel, { height: 0 })
            gsap.set(body, { autoAlpha: 0, y: 0 })
          }
        })
        syncHoverState()
        requestAnimationFrame(() => ScrollTrigger.refresh())
      },
    })

    panels.forEach((panel) => {
      const body = panel.querySelector('.svc-body')
      const isNext = panel.dataset.code === next

      timeline.to(
        panel,
        {
          height: isNext ? 'auto' : 0,
          duration: reduced ? 0 : isNext ? 0.45 : DUR.fast,
        },
        0,
      )
      timeline.to(
        body,
        {
          autoAlpha: isNext ? 1 : 0,
          y: isNext ? 0 : -8,
          duration: reduced ? 0 : isNext ? DUR.fast + 0.05 : DUR.fast,
        },
        isNext ? 0.05 : 0,
      )
    })

    accordionRef.current = timeline
    setOpen(next)
  }

  const handleEnter = contextSafe((row: HTMLElement, code: string) => {
    gsap.to(row.querySelector('.svc-fill'), {
      scaleX: 1,
      transformOrigin: 'left center',
      duration: hoverDuration(DUR.base - 0.1),
      ease: EASE.sweep,
      overwrite: 'auto',
    })
    gsap.to(row.querySelector('.svc-index'), {
      duration: hoverDuration(DUR.fast + 0.05),
      scrambleText: { text: code, chars: '0123456789/', speed: 0.6 },
      overwrite: 'auto',
    })
  })

  const handleLeave = contextSafe((row: HTMLElement, code: string) => {
    // The pointer leaving does not un-light a row the keyboard is still on,
    // and blurring does not un-light one the pointer is still over. Without
    // this the fill retracted while the CSS rule kept the ink, which is the
    // black-on-black state again.
    if (row.matches(LIT)) return

    gsap.to(row.querySelector('.svc-fill'), {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: hoverDuration(DUR.fast),
      ease: EASE.retreat,
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
          const buttonId = `svc-button-${service.code}`

          return (
            <div
              key={service.code}
              data-code={service.code}
              className="svc-row relative"
              onMouseEnter={(e) => handleEnter(e.currentTarget, service.code)}
              onMouseLeave={(e) => handleLeave(e.currentTarget, service.code)}
            >
              <Rule className="svc-rule" />

              <h3>
                <button
                  id={buttonId}
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
                     * the same `:hover` colour rule as `.svc-ink`.
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

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                data-code={service.code}
                className="svc-panel overflow-hidden"
              >
                {/* Pitch and deliverables share the title's column band. */}
                <div className="grid-page svc-body pb-14">
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
              </div>
            </div>
          )
        })}
        <Rule />
      </div>
    </section>
  )
}
