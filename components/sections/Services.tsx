'use client'

import { useRef, useState } from 'react'

import { services } from '@/data/services'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, EASE, hoverDuration } from '@/lib/motion'
import { SectionHeader } from './SectionHeader'

export function Services({
  dict,
  locale,
}: {
  dict: Dictionary['services']
  locale: Locale
}) {
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLElement>(null)
  const transitionRef = useRef<gsap.core.Timeline | null>(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.service-panel')
      panels.forEach((panel, index) => {
        gsap.set(panel, {
          autoAlpha: index === 0 ? 1 : 0,
          clipPath:
            index === 0 ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
          zIndex: index === 0 ? 2 : 1,
        })
      })

      return () => transitionRef.current?.kill()
    },
    { scope: rootRef },
  )

  const { contextSafe } = useGSAP({ scope: rootRef })

  const selectService = (next: number, root: HTMLElement) => {
    if (next === active) return

    const panels = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll('.service-panel'),
    )
    const indicators = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll('.service-indicator'),
    )
    const outgoing = panels[active]
    const incoming = panels[next]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!outgoing || !incoming) return
    transitionRef.current?.kill()
    panels.forEach((panel, index) => {
      if (index === active || index === next) return
      gsap.set(panel, {
        autoAlpha: 0,
        clipPath: 'inset(100% 0% 0% 0%)',
        clearProps: 'transform',
        zIndex: 1,
      })
    })

    const timeline = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => {
        panels.forEach((panel, index) => {
          if (index === next) return
          gsap.set(panel, {
            autoAlpha: 0,
            clipPath: 'inset(100% 0% 0% 0%)',
            clearProps: 'transform',
            zIndex: 1,
          })
        })
        gsap.set(incoming, { clearProps: 'transform', zIndex: 2 })
      },
    })

    timeline
      .set(incoming, {
        autoAlpha: 1,
        clipPath: 'inset(100% 0% 0% 0%)',
        y: 22,
        zIndex: 3,
      })
      .to(
        outgoing,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: -18,
          duration: reduced ? 0 : DUR.fast + 0.05,
          ease: EASE.retreat,
        },
        0,
      )
      .to(
        incoming,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          y: 0,
          duration: reduced ? 0 : DUR.base + 0.1,
          ease: EASE.brutal,
        },
        reduced ? 0 : 0.12,
      )
      .to(
        indicators,
        {
          scaleX: (index) => (index === next ? 1 : 0),
          transformOrigin: (index) => (index === next ? 'left center' : 'right center'),
          duration: reduced ? 0 : DUR.fast,
          ease: EASE.sweep,
        },
        0,
      )
      .from(
        incoming.querySelectorAll('.service-panel-copy > *'),
        {
          opacity: 0,
          y: 18,
          stagger: 0.05,
          duration: reduced ? 0 : DUR.fast,
          ease: EASE.settle,
        },
        reduced ? 0 : 0.3,
      )
      .from(
        incoming.querySelectorAll('.service-deliverable'),
        {
          opacity: 0,
          x: 14,
          stagger: 0.04,
          duration: reduced ? 0 : DUR.fast,
          ease: EASE.sweep,
        },
        reduced ? 0 : 0.42,
      )

    transitionRef.current = timeline
    setActive(next)
  }

  const enterTab = contextSafe((button: HTMLButtonElement) => {
    if (button.getAttribute('aria-pressed') === 'true') return
    gsap.to(button.querySelector('.service-title'), {
      x: 8,
      duration: hoverDuration(DUR.fast),
      ease: EASE.sweep,
      overwrite: 'auto',
    })
  })

  const leaveTab = contextSafe((button: HTMLButtonElement) => {
    gsap.to(button.querySelector('.service-title'), {
      x: 0,
      duration: hoverDuration(DUR.fast),
      ease: EASE.sweep,
      overwrite: 'auto',
    })
  })

  return (
    <section
      id="services"
      ref={rootRef}
      className="py-[var(--spacing-section)]"
    >
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div className="grid-page mt-12 items-stretch md:mt-16 lg:mt-20">
        <div className="border-rule col-span-12 flex flex-col border-t lg:col-span-5">
          {services.map((service, index) => {
            const selected = index === active
            const panelId = `service-panel-${service.code}`

            return (
              <button
                key={service.code}
                id={`service-button-${service.code}`}
                type="button"
                aria-pressed={selected}
                aria-controls={panelId}
                onClick={(event) =>
                  selectService(index, event.currentTarget.closest('section')!)
                }
                onMouseEnter={(event) => enterTab(event.currentTarget)}
                onMouseLeave={(event) => leaveTab(event.currentTarget)}
                onFocus={(event) => enterTab(event.currentTarget)}
                onBlur={(event) => leaveTab(event.currentTarget)}
                className="border-rule group relative grid w-full flex-1 grid-cols-[3rem_1fr_auto] items-center gap-4 overflow-hidden border-b py-5 text-left md:grid-cols-[4rem_1fr_auto] lg:py-8"
              >
                <span
                  aria-hidden
                  className="service-indicator bg-accent absolute inset-x-0 bottom-0 block h-0.5 origin-left"
                  style={{ transform: `scaleX(${index === 0 ? 1 : 0})` }}
                />
                <span
                  className={cn(
                    'u-meta transition-colors duration-300',
                    selected ? 'text-accent' : 'text-text-dim',
                  )}
                >
                  {service.code}
                </span>
                <span
                  className={cn(
                    'service-title text-h3 u-wide transition-colors duration-300',
                    selected ? 'text-text' : 'text-chalk-200 group-hover:text-text',
                  )}
                >
                  {t(service.title, locale)}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'u-meta transition-transform duration-500',
                    selected ? 'text-accent rotate-45' : 'text-text-dim',
                  )}
                >
                  ↗
                </span>
              </button>
            )
          })}
        </div>

        <div className="border-rule bg-ink-900 relative col-span-12 grid overflow-hidden border-x border-b lg:col-span-7 lg:min-h-[42rem] lg:border-t lg:border-l-0">
          <span className="plate-bed absolute inset-0 opacity-40" />
          {services.map((service, index) => {
            const selected = index === active

            return (
              <article
                key={service.code}
                id={`service-panel-${service.code}`}
                aria-labelledby={`service-button-${service.code}`}
                aria-hidden={!selected}
                className={cn(
                  'service-panel col-start-1 row-start-1 flex flex-col justify-between p-6 sm:p-10 lg:p-12',
                  selected ? 'pointer-events-auto' : 'pointer-events-none',
                )}
              >
                <div className="service-panel-copy relative z-10">
                  <div className="flex items-start justify-between gap-6">
                    <p className="u-label text-accent">Service / {service.code}</p>
                    <span
                      aria-hidden
                      className="u-wide text-[clamp(4rem,12cqw,9rem)] leading-[0.7] text-transparent [-webkit-text-stroke:1px_var(--color-ink-600)]"
                    >
                      {service.code}
                    </span>
                  </div>

                  <h3 className="text-h1 u-wide mt-12 max-w-[13ch]">
                    {t(service.title, locale)}
                  </h3>
                  <p className="text-lead text-chalk-200 mt-6 max-w-[42ch]">
                    {t(service.pitch, locale)}
                  </p>
                </div>

                <div className="service-panel-deliverables relative z-10 mt-12 lg:grid lg:grid-cols-[8rem_1fr] lg:gap-8">
                  <p className="u-label mb-4 lg:mb-0">{dict.deliverables}</p>
                  <ul className="border-rule border-t">
                    {t(service.deliverables, locale).map((item) => (
                      <li
                        key={item}
                        className="service-deliverable text-body text-chalk-200 border-rule flex gap-4 border-b py-3"
                      >
                        <span aria-hidden className="text-accent">
                          /
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
