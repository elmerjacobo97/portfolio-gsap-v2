'use client'

import { useRef } from 'react'

import { Pill } from '@/components/ui/Pill'
import { Rule } from '@/components/ui/Rule'
import type { Dictionary } from '@/i18n/dictionary'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { introDone } from '@/lib/intro'
import { OK } from '@/lib/motion'

export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Reduced-motion visitors get nothing in this branch at all — the
      // server-rendered lines stay exactly as painted, fully visible.
      mm.add(OK, () => {
        const entrance = gsap.timeline({ paused: true })

        entrance
          .from(
            '.hero-rule',
            {
              scaleX: 0,
              transformOrigin: 'left center',
              duration: 1.2,
              ease: 'expo.out',
            },
            0.15,
          )
          .from(
            '.hero-meta > *',
            {
              autoAlpha: 0,
              y: 14,
              stagger: 0.06,
              duration: 0.6,
              ease: 'power2.out',
            },
            0.5,
          )

        // The split is created only once the preloader is gone. Creating it
        // earlier would run the onSplit tween behind the intro overlay, and
        // the headline would already be settled by the time it lifts.
        let split: SplitText | undefined
        let cancelled = false

        introDone.then(() => {
          if (cancelled) return

          // autoSplit re-splits (and re-runs onSplit) when Archivo finishes
          // loading or the line width changes — the documented fix for
          // SplitText measuring against a fallback font.
          split = SplitText.create('.hero-line', {
            type: 'chars,words,lines',
            mask: 'lines',
            autoSplit: true,
            aria: 'auto',
            onSplit(self) {
              return gsap.from(self.chars, {
                yPercent: 110,
                duration: 1.15,
                stagger: { each: 0.022, from: 'start' },
                ease: 'power4.out',
              })
            },
          })

          entrance.play()
        })

        gsap.to('.pill-dot', {
          scale: 2.2,
          opacity: 0,
          repeat: -1,
          duration: 1.6,
          ease: 'power1.out',
        })

        gsap.to('.hero-inner', {
          yPercent: -18,
          autoAlpha: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        return () => {
          cancelled = true
          split?.revert()
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [] },
  )

  return (
    <section
      ref={rootRef}
      data-hero
      className="relative flex min-h-svh flex-col justify-between pt-28 pb-8"
    >
      <div className="hero-inner grid-page flex-1 content-center">
        {/*
         * Full 12 columns: `whitespace-nowrap` below means the longest line
         * cannot reflow, and SplitText's line mask clips anything that
         * overflows its box. Narrower here and the headline loses letters.
         */}
        <div className="col-span-12">
          <h1 className="text-mega u-wide text-text">
            {/*
             * Each line is its own block so SplitText can mask per line.
             * `whitespace-nowrap` is load-bearing: splitting into chars wraps
             * every character in its own element, and without it the browser
             * happily breaks a line mid-word (JACOBO → JAC / OBO).
             */}
            <span className="hero-line block whitespace-nowrap">
              {dict.lineOne}
            </span>
            <span className="hero-line block whitespace-nowrap">
              {dict.lineTwo}
            </span>
          </h1>
        </div>

        <div className="hero-meta col-span-12 mt-12 lg:col-span-3 lg:col-start-10 lg:text-right">
          <p className="u-label text-accent mb-4">{dict.role}</p>
          <ul className="u-meta text-text-dim space-y-1.5">
            {dict.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-lead text-chalk-200 col-span-12 mt-14 max-w-[24ch] lg:col-span-6">
          {dict.statement}
        </p>
      </div>

      <div className="grid-page">
        <Rule className="hero-rule col-span-12 mb-6" />
        <div className="col-span-12 flex items-center justify-between">
          <Pill>{dict.available}</Pill>
          <span className="u-label flex items-center gap-2">
            {dict.scroll}
            <span aria-hidden>↓</span>
          </span>
        </div>
      </div>
    </section>
  )
}
