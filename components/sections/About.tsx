'use client'

import { useRef } from 'react'

import { site } from '@/data/site'
import type { Dictionary } from '@/i18n/dictionary'
import { Counter } from '@/components/motion/Counter'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'
import { SectionHeader } from './SectionHeader'

export function About({ dict }: { dict: Dictionary['about'] }) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        const split = SplitText.create('.about-bio p', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          // 'auto' would add aria-label to a <p>, where it is prohibited.
          // Safe to skip here: splitting by line keeps whole words in order,
          // so the text still reads correctly.
          aria: 'none',
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 100,
              autoAlpha: 0,
              stagger: 0.06,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: { trigger: '.about-bio', start: 'top 75%' },
            })
          },
        })

        // Cross-fade only ever touches opacity — never `filter: grayscale()`,
        // which forces a full repaint of the layer on every frame on mobile.
        gsap.to('.about-portrait-color', {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 60%',
            end: 'bottom center',
            scrub: true,
          },
        })

        return () => split.revert()
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section id="about" ref={rootRef} className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} />

        {/* Portrait well. Grayscale plate under a colour plate that fades in
            on scroll — both CSS-only placeholders until there is a photo. */}
        <div
          aria-hidden
          className="bg-ink-850 border-rule relative col-span-12 mt-16 aspect-4/5 overflow-hidden border sm:col-span-6 lg:col-span-5"
        >
          <span className="bg-accent/70 absolute top-1/2 -left-1/4 h-px w-[150%] origin-center -rotate-45" />
          <span className="about-portrait-color bg-accent/10 absolute inset-0 opacity-0" />
          <span className="u-meta text-chalk-400 absolute right-5 bottom-5">
            {site.city}, {site.country}
          </span>
        </div>

        <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-16">
          <div className="about-bio space-y-6">
            {dict.bio.map((para) => (
              <p key={para} className="text-lead text-chalk-200">
                {para}
              </p>
            ))}
          </div>

          <dl className="border-rule mt-14 grid grid-cols-3 gap-6 border-t pt-10">
            {dict.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Counter
                    value={stat.value}
                    className="text-h1 u-wide text-accent block"
                  />
                  <span className="u-label mt-2 block">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
