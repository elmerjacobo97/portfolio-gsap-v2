'use client'

import { useRef } from 'react'

import { testimonials } from '@/data/testimonials'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, EASE, OK } from '@/lib/motion'

export function Testimonials({
  dict,
  locale,
}: {
  dict: Dictionary['testimonials']
  locale: Locale
}) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const rows = gsap.utils.toArray<HTMLElement>('.testimonial-row')

        rows.forEach((row) => {
          const rule = row.querySelector('.testimonial-rule')
          const quote = row.querySelector('.testimonial-quote')
          const attribution = row.querySelector('.testimonial-attribution')

          const timeline = gsap.timeline({
            scrollTrigger: { trigger: row, start: 'top 82%' },
          })

          timeline
            .from(rule, {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: DUR.base,
              ease: EASE.sweep,
              immediateRender: false,
            })
            .from(
              quote,
              {
                opacity: 0,
                y: 48,
                duration: DUR.slow,
                ease: EASE.brutal,
                immediateRender: false,
              },
              '-=0.35',
            )
            .from(
              attribution,
              {
                opacity: 0,
                y: 16,
                duration: DUR.base,
                ease: EASE.settle,
                immediateRender: false,
              },
              '-=0.65',
            )
        })
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      id="testimonials"
      ref={rootRef}
      aria-labelledby="testimonials-title"
      className="border-rule bg-ink-900 text-text relative overflow-hidden border-y"
    >
      <span
        aria-hidden
        className="plate-bed pointer-events-none absolute inset-0 opacity-15"
      />

      <header className="grid-page relative py-[var(--spacing-section)]">
        <div className="col-span-12 lg:col-span-7">
          <p className="u-label text-accent mb-5">{dict.index}</p>
          <h2 id="testimonials-title" className="text-h1 u-wide max-w-[12ch]">
            {dict.title}
          </h2>
          <p className="text-lead text-chalk-200 mt-8 max-w-[44ch]">{dict.lead}</p>
        </div>

        <p className="u-meta border-rule text-accent col-span-12 mt-12 border-y py-4 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:self-end">
          {dict.draftLabel}
        </p>
      </header>

      <div className="relative pb-[var(--spacing-section)]">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.code}
            className="testimonial-row grid-page relative py-14 md:py-20"
          >
            <span
              aria-hidden
              className="testimonial-rule bg-rule absolute inset-x-[var(--spacing-gutter)] top-0 h-px origin-left"
            />

            <span
              aria-hidden
              className="u-wide text-accent col-span-2 text-[clamp(4.5rem,10vw,10rem)] leading-[0.62] opacity-35"
            >
              “
            </span>

            <div className="col-span-10 md:col-span-9 lg:col-span-8 lg:col-start-4">
              <blockquote>
                <p className="testimonial-quote font-display text-[clamp(1.7rem,3.8vw,4.5rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-balance">
                  {t(testimonial.quote, locale)}
                </p>
              </blockquote>

              <figcaption className="testimonial-attribution border-rule mt-10 grid gap-4 border-t pt-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
                <div>
                  <p className="u-meta">{t(testimonial.name, locale)}</p>
                  <p className="text-body text-chalk-200 mt-2">
                    {t(testimonial.role, locale)} · {t(testimonial.company, locale)}
                  </p>
                </div>
                <p className="u-label text-accent md:text-center">{testimonial.code}</p>
                <p className="u-label md:text-right">{dict.pendingLabel}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  )
}
