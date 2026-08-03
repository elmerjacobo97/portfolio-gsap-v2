import { processSteps } from '@/data/process'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { Numeral } from '@/components/ui/Numeral'
import { SectionHeader } from './SectionHeader'

/**
 * Phase 1 renders the vertical stack only. Phase 3 adds the pinned horizontal
 * track behind a `(min-width: 768px)` matchMedia branch — this markup stays as
 * the mobile fallback, so nothing here gets thrown away.
 */
export function Process({
  dict,
  locale,
}: {
  dict: Dictionary['process']
  locale: Locale
}) {
  return (
    <section
      id="process"
      data-process
      className="border-rule border-t py-[var(--spacing-section)]"
    >
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div className="process-track mt-20">
        {processSteps.map((step) => (
          <article
            key={step.code}
            className="process-panel grid-page border-rule border-t py-14"
          >
            <div className="col-span-12 md:col-span-4">
              <Numeral className="leading-none">{step.code}</Numeral>
            </div>

            <div className="process-copy col-span-12 mt-6 md:col-span-7 md:col-start-6 md:mt-0 md:self-end">
              <h3 className="text-h2 u-wide">{t(step.title, locale)}</h3>
              <p className="text-body text-chalk-200 mt-5 max-w-[52ch]">
                {t(step.body, locale)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
