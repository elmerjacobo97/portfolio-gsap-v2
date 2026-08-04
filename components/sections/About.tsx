'use client'

import Image from 'next/image'
import { useRef } from 'react'

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

        <div className="bg-ink-850 border-rule @container relative col-span-12 mt-16 aspect-4/5 overflow-hidden border sm:col-span-6 lg:col-span-5">
          <Image
            src="/images/profile/elmer-jacobo-portrait.png"
            alt={dict.portraitAlt}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw"
            className="object-cover grayscale"
          />
          <Image
            src="/images/profile/elmer-jacobo-portrait.png"
            alt=""
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw"
            className="about-portrait-color object-cover opacity-0"
          />
        </div>

        <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-16">
          <div className="about-bio space-y-6">
            {dict.bio.map((para) => (
              <p key={para} className="text-lead text-chalk-200">
                {para}
              </p>
            ))}
          </div>

          {/* gap-x-10 and min-w-0: at three equal columns inside a six-column
              band, "100%" at text-h1 all but touched the next cell and pushed
              its own label into the page gutter. */}
          <dl className="border-rule mt-14 grid grid-cols-3 gap-x-10 gap-y-8 border-t pt-10">
            {dict.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <Counter
                    value={stat.value}
                    className="text-h2 u-wide text-accent block"
                  />
                  <span className="u-label mt-3 block text-pretty">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
