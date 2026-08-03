import { site } from '@/data/site'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { CalButton } from '@/components/contact/CalButton'
import { ChannelRow } from '@/components/contact/ChannelRow'
import { ContactForm } from '@/components/contact/ContactForm'
import { WhatsAppLink } from '@/components/contact/WhatsAppLink'

export function Contact({
  dict,
  closeLabel,
  locale,
}: {
  dict: Dictionary['contact']
  closeLabel: string
  locale: Locale
}) {
  return (
    <section
      id="contact"
      className="border-rule grid-page border-t py-[var(--spacing-section)]"
    >
      <div className="col-span-12">
        <p className="u-label text-accent mb-5">{dict.index}</p>
        <h2 className="contact-title text-mega u-wide">{dict.title}</h2>
        <p className="text-lead text-chalk-200 mt-8 max-w-[42ch]">{dict.lead}</p>
      </div>

      <div className="col-span-12 mt-20 lg:col-span-6">
        <ContactForm dict={dict.form} locale={locale} />
      </div>

      {/* Ordered by friction: WhatsApp lowest, booking next, email last. */}
      <div className="col-span-12 mt-20 lg:col-span-5 lg:col-start-8">
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
