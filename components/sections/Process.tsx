'use client'

import { useRef } from 'react'

import { processSteps } from '@/data/process'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { Numeral } from '@/components/ui/Numeral'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { DESKTOP, MOBILE } from '@/lib/motion'
import { SectionHeader } from './SectionHeader'

export function Process({
  dict,
  locale,
}: {
  dict: Dictionary['process']
  locale: Locale
}) {
  const rootRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(DESKTOP, () => {
        const pin = pinRef.current
        const panels = gsap.utils.toArray<HTMLElement>('.process-panel')
        if (!pin || panels.length < 2) return

        // Function form for `end` + invalidateOnRefresh: the distance depends
        // on the pin width, which changes on resize. A static string would go
        // stale and the track would stop short (or overshoot).
        const track = gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => '+=' + pin.offsetWidth * (panels.length - 1),
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: 0.3,
              ease: 'power1.inOut',
            },
            onUpdate: (self) =>
              gsap.set('.process-progress', { scaleX: self.progress }),
          },
        })

        // containerAnimation is mandatory for any ScrollTrigger whose trigger
        // lives inside a horizontally-scrolled container — without it the
        // start/end values are measured against the page, not the track.
        panels.forEach((panel) => {
          const copy = panel.querySelector('.process-copy')
          if (!copy) return

          gsap.from(copy, {
            autoAlpha: 0,
            x: 80,
            ease: 'none',
            scrollTrigger: {
              containerAnimation: track,
              trigger: panel,
              start: 'left 70%',
              end: 'left 35%',
              scrub: true,
            },
          })
        })

        return () => {
          track.scrollTrigger?.kill()
          track.kill()
        }
      })

      // No pin at all on mobile. A pinned horizontal track on a phone is the
      // single most reliable way to break scrolling.
      mm.add(MOBILE, () => {
        const batched = ScrollTrigger.batch('.process-panel', {
          start: 'top 85%',
          onEnter: (batch) =>
            gsap.from(batch, {
              autoAlpha: 0,
              y: 40,
              stagger: 0.1,
              duration: 0.7,
              overwrite: true,
            }),
        })

        return () => batched.forEach((st) => st.kill())
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      id="process"
      ref={rootRef}
      data-process
      className="border-rule border-t"
    >
      <div className="grid-page pt-[var(--spacing-section)] pb-16">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div
        ref={pinRef}
        className="process-pin relative md:h-svh md:overflow-hidden"
      >
        <div className="process-track md:flex md:h-full md:flex-nowrap">
          {processSteps.map((step) => (
            <article
              key={step.code}
              className="process-panel border-rule grid-page border-t py-14 md:h-full md:w-screen md:shrink-0 md:content-center md:border-t-0 md:py-0"
            >
              <div className="col-span-12 md:col-span-4">
                <Numeral className="leading-none">{step.code}</Numeral>
              </div>

              <div className="process-copy col-span-12 mt-6 md:col-span-7 md:col-start-6 md:mt-0 md:self-center">
                <h3 className="text-h2 u-wide">{t(step.title, locale)}</h3>
                <p className="text-body text-chalk-200 mt-5 max-w-[52ch]">
                  {t(step.body, locale)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div
          aria-hidden
          className="bg-rule absolute inset-x-0 bottom-0 hidden h-px md:block"
        >
          <span className="process-progress bg-accent block h-full w-full origin-left scale-x-0" />
        </div>
      </div>
    </section>
  )
}
