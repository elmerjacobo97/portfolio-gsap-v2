import { notFound } from 'next/navigation'

import { getDictionary } from '@/i18n/get-dictionary'
import { hasLocale } from '@/i18n/config'
import { site } from '@/data/site'
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <main className="min-h-svh">
      {/* Phase 0 checkpoint: type scale, colour and the 12-col bed. */}
      <div className="grid-page items-center py-6">
        <span className="u-label col-span-6">{site.shortName}</span>
        <div className="col-span-6 flex justify-end">
          <LocaleSwitcher locale={locale} label={dict.nav.switchTo} />
        </div>
      </div>

      <span className="rule-h" />

      <section className="grid-page py-[var(--spacing-section)]">
        <div className="col-span-12">
          <p className="u-label text-accent mb-6">{dict.hero.available}</p>
          <h1 className="text-mega u-wide text-text">
            <span className="block">{dict.hero.lineOne}</span>
            <span className="block">{dict.hero.lineTwo}</span>
          </h1>
        </div>

        <p className="text-lead text-chalk-200 col-span-12 mt-16 max-w-[26ch] lg:col-span-6">
          {dict.hero.statement}
        </p>

        <ul className="u-meta text-text-dim col-span-12 mt-10 space-y-2 lg:col-span-3 lg:col-start-10 lg:mt-16 lg:text-right">
          {dict.hero.meta.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <span className="rule-h" />

      {/* Type-scale proof sheet — deleted in Phase 1 once real sections land. */}
      <section className="grid-page py-[var(--spacing-section)]">
        <div className="col-span-12 space-y-10">
          <h2 className="text-display u-wide">{dict.services.title}</h2>
          <h3 className="text-h1 u-wide">{dict.work.title}</h3>
          <h4 className="text-h2 u-wide">{dict.process.title}</h4>
          <p className="text-body text-chalk-200 max-w-[60ch]">
            {dict.services.lead}
          </p>
          <p className="u-meta text-text-dim">{site.stack.join(' · ')}</p>
          <p className="text-numeral u-wide u-outline">01</p>
        </div>
      </section>
    </main>
  )
}
