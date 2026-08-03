'use client'

import { useState } from 'react'

import { services } from '@/data/services'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { SectionHeader } from './SectionHeader'

export function Services({
  dict,
  locale,
}: {
  dict: Dictionary['services']
  locale: Locale
}) {
  const [open, setOpen] = useState<string | null>(services[0]?.code ?? null)

  return (
    <section id="services" className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div className="mt-20">
        {services.map((service) => {
          const isOpen = open === service.code
          const panelId = `svc-panel-${service.code}`

          return (
            <div key={service.code} className="svc-row border-rule border-t">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : service.code)}
                  className="group grid-page hover:text-accent w-full items-baseline py-8 text-left transition-colors duration-300"
                >
                  <span className="u-label svc-index col-span-2 md:col-span-1">
                    {service.code}
                  </span>
                  <span className="text-h2 u-wide col-span-9 md:col-span-8">
                    {t(service.title, locale)}
                  </span>
                  <span
                    aria-hidden
                    className="u-meta col-span-1 text-right md:col-span-3"
                  >
                    {isOpen ? '—' : '+'}
                  </span>
                </button>
              </h3>

              {isOpen ? (
                <div id={panelId} className="grid-page svc-body pb-12">
                  <p className="text-body text-chalk-200 col-span-12 max-w-[52ch] md:col-span-6 md:col-start-2">
                    {t(service.pitch, locale)}
                  </p>

                  <div className="col-span-12 mt-8 md:col-span-4 md:col-start-9 md:mt-0">
                    <p className="u-label mb-4">{dict.deliverables}</p>
                    <ul className="text-body text-chalk-200 space-y-2">
                      {t(service.deliverables, locale).map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden className="text-accent">
                            /
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </div>
          )
        })}
        <div className="border-rule border-t" />
      </div>
    </section>
  )
}
