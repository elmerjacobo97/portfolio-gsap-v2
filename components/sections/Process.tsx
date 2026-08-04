'use client'

import { useRef, useState } from 'react'

import { processSteps } from '@/data/process'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { cn } from '@/lib/cn'
import { Numeral } from '@/components/ui/Numeral'
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { DESKTOP, DUR, EASE, MOBILE } from '@/lib/motion'
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
  const trackTweenRef = useRef<gsap.core.Tween | null>(null)
  const [activeStep, setActiveStep] = useState(0)

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
            // Tighter than before on purpose. Every in-between position shows
            // two panels at once, so the less time spent there the better —
            // the snap is what keeps a step reading as a whole step.
            snap: {
              snapTo: 1 / (panels.length - 1),
              duration: { min: 0.15, max: 0.4 },
              delay: 0.05,
              ease: 'power2.inOut',
              // The default projects the landing point from scroll velocity.
              // Stacked on ScrollSmoother's own momentum that overshot by a
              // whole panel — one flick from step 01 landed on step 03. Snap
              // to whichever step is actually closest instead.
              inertia: false,
            },
            onUpdate: (self) =>
              {
                gsap.set('.process-progress', { scaleX: self.progress })
                const next = Math.round(self.progress * (panels.length - 1))
                setActiveStep((current) => (current === next ? current : next))
              },
          },
        })
        trackTweenRef.current = track

        // containerAnimation is mandatory for any ScrollTrigger whose trigger
        // lives inside a horizontally-scrolled container — without it the
        // start/end values are measured against the page, not the track.
        const panelTriggers: ScrollTrigger[] = []

        panels.forEach((panel) => {
          const copy = panel.querySelector('.process-copy')
          const numeral = panel.querySelector('.process-numeral')

          if (copy) {
            const reveal = gsap.from(copy, {
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
            if (reveal.scrollTrigger) panelTriggers.push(reveal.scrollTrigger)
          }

          if (numeral) {
            // The step you are actually on is the one whose numeral is lit.
            // Outline-only numerals at ink-600 on a near-black canvas were
            // effectively invisible, and nothing marked the active panel.
            const ignite = gsap.to(numeral, {
              webkitTextStrokeColor: 'var(--color-accent)',
              duration: DUR.base,
              ease: EASE.sweep,
              scrollTrigger: {
                containerAnimation: track,
                trigger: panel,
                start: 'left 60%',
                end: 'right 40%',
                toggleActions: 'play reverse play reverse',
              },
            })
            if (ignite.scrollTrigger) panelTriggers.push(ignite.scrollTrigger)
          }
        })

        return () => {
          panelTriggers.forEach((st) => st.kill())
          track.scrollTrigger?.kill()
          track.kill()
          trackTweenRef.current = null
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

  const handleStep = (index: number) => {
    const trigger = trackTweenRef.current?.scrollTrigger
    if (!trigger) return

    const progress = index / (processSteps.length - 1)
    const destination = trigger.start + (trigger.end - trigger.start) * progress
    const smoother = ScrollSmoother.get()

    if (smoother) {
      smoother.scrollTo(destination, true)
    } else {
      window.scrollTo({ top: destination, behavior: 'smooth' })
    }
  }

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
        className="process-pin relative"
      >
        <div className="process-track">
          {processSteps.map((step) => (
            /*
             * Numeral and copy share one column band. They used to sit at
             * opposite gutters of a 100vw panel, which meant that for most of
             * the scrub you were looking at the numeral of one step next to
             * the copy of another — panel 03's title reading under a "04".
             * Same band, stacked top and bottom: every intermediate frame now
             * shows one coherent step, and the panel's full height is used.
             */
            <article
              key={step.code}
              className="process-panel border-rule grid-page border-t py-14"
            >
              <div className="col-span-12 md:col-span-8 md:col-start-2">
                <Numeral className="process-numeral leading-none">
                  {step.code}
                </Numeral>
              </div>

              <div className="process-copy col-span-12 mt-8 md:col-span-6 md:col-start-2 md:mt-0">
                <h3 className="text-h2 u-wide">{t(step.title, locale)}</h3>
                <p className="text-lead text-chalk-200 mt-5 max-w-[48ch]">
                  {t(step.body, locale)}
                </p>
              </div>

              {/* Where you are in the sequence — the pinned track hides the
                  page scrollbar's usual answer to that question. */}
              <p className="u-meta text-text-dim col-span-12 mt-10 md:col-span-3 md:col-start-10 md:mt-0 md:self-end md:text-right">
                <span className="text-accent">{step.code}</span>
                {` / ${String(processSteps.length).padStart(2, '0')}`}
              </p>
            </article>
          ))}
        </div>

        <nav
          aria-label={dict.jumpTo}
          className="process-step-nav border-rule bg-canvas/90 absolute top-6 right-[var(--spacing-gutter)] z-10 hidden border backdrop-blur-sm"
        >
          {processSteps.map((step, index) => (
            <button
              key={step.code}
              type="button"
              aria-label={`${dict.jumpTo} ${step.code}`}
              aria-current={activeStep === index ? 'step' : undefined}
              onClick={() => handleStep(index)}
              className={cn(
                'u-meta border-rule min-h-11 min-w-12 border-r px-3 transition-colors last:border-r-0',
                activeStep === index
                  ? 'bg-accent text-ink-950'
                  : 'text-text-dim hover:text-text',
              )}
            >
              {step.code}
            </button>
          ))}
        </nav>

        {/* 2px, not the usual hairline: pinned to the very bottom edge of the
            viewport, 1px reads as an artifact rather than a readout. */}
        <div
          aria-hidden
          className="process-progress-shell bg-rule absolute inset-x-0 bottom-0 hidden h-0.5"
        >
          <span className="process-progress bg-accent block h-full w-full origin-left scale-x-0" />
        </div>
      </div>
    </section>
  )
}
