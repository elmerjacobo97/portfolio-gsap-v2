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
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: 'top 74%', once: true },
        })

        timeline
          .from('.contact-title', {
            clipPath: 'inset(0% 0% 100% 0%)',
            y: 48,
            duration: DUR.slow,
            ease: EASE.brutal,
            immediateRender: false,
          })
          .from(
            '.contact-lead',
            {
              opacity: 0,
              y: 18,
              duration: DUR.base,
              ease: EASE.settle,
              immediateRender: false,
            },
            '-=0.55',
          )
          .from(
            '.contact-column',
            {
              opacity: 0,
              y: 24,
              stagger: 0.12,
              duration: DUR.base,
              ease: EASE.settle,
              immediateRender: false,
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
        <h2 className="contact-title text-mega u-wide">{dict.title}</h2>
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
