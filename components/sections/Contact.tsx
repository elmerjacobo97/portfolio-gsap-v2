'use client'

import { useRef } from 'react'

import { site } from '@/data/site'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { CalButton } from '@/components/contact/CalButton'
import { ChannelRow } from '@/components/contact/ChannelRow'
import { ContactForm } from '@/components/contact/ContactForm'
import { WhatsAppLink } from '@/components/contact/WhatsAppLink'
import { gsap, useGSAP } from '@/lib/gsap'
import { DUR, EASE, OK } from '@/lib/motion'

export function Contact({
  dict,
  closeLabel,
  locale,
}: {
  dict: Dictionary['contact']
  closeLabel: string
  locale: Locale
}) {
  const rootRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(OK, () => {
        const root = rootRef.current
        if (!root || root.getBoundingClientRect().top <= window.innerHeight) return

        const title = root.querySelector('.contact-title')
        const lead = root.querySelector('.contact-lead')
        const columns = root.querySelectorAll('.contact-column')

        gsap.set(title, { yPercent: 108 })
        gsap.set(lead, { opacity: 0, y: 14 })
        gsap.set(columns, { opacity: 0, y: 20 })

        const timeline = gsap.timeline({
          scrollTrigger: { trigger: root, start: 'top 76%', once: true },
        })

        timeline
          .to(title, {
            yPercent: 0,
            duration: DUR.slow,
            ease: EASE.brutal,
          })
          .to(
            lead,
            {
              opacity: 1,
              y: 0,
              duration: DUR.base,
              ease: EASE.settle,
            },
            '-=0.55',
          )
          .to(
            columns,
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: DUR.base,
              ease: EASE.settle,
            },
            '-=0.3',
          )
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <section
      id="contact"
      ref={rootRef}
      className="border-rule grid-page border-t py-[var(--spacing-section)]"
    >
      <div className="col-span-12">
        <p className="u-label text-accent mb-5">{dict.index}</p>
        <div className="contact-title-mask -mb-[0.14em] overflow-hidden pb-[0.14em]">
          <h2 className="contact-title u-wide text-[clamp(3.25rem,11.8vw,14rem)] leading-[0.82] tracking-[-0.045em]">
            {dict.title}
          </h2>
        </div>
        <p className="contact-lead text-lead text-chalk-200 mt-8 max-w-[42ch]">
          {dict.lead}
        </p>
      </div>

      <div className="contact-column order-2 col-span-12 mt-14 lg:order-none lg:col-span-6 lg:mt-20">
        <ContactForm dict={dict.form} locale={locale} />
      </div>

      {/* Ordered by friction: WhatsApp lowest, booking next, email last. */}
      <div className="contact-column order-1 col-span-12 mt-14 lg:order-none lg:col-span-5 lg:col-start-8 lg:mt-20">
        <p className="u-label mb-2">{dict.channelsTitle}</p>
        <WhatsAppLink label={dict.whatsapp} prefill={dict.whatsappPrefill} />
        <CalButton label={dict.booking} closeLabel={closeLabel} />
        <ChannelRow
          label="Email"
          value={site.email}
          href={`mailto:${site.email}`}
        />
        <span className="rule-h" />
      </div>
    </section>
  )
}
