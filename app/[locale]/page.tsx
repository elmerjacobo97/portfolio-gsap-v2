import { notFound } from 'next/navigation'

import { getDictionary } from '@/i18n/get-dictionary'
import { hasLocale } from '@/i18n/config'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { Proof } from '@/components/sections/Proof'
import { Services } from '@/components/sections/Services'
import { Ticker } from '@/components/sections/Ticker'
import { Work } from '@/components/sections/Work'

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  const dict = await getDictionary(locale)

  return (
    <main id="main">
      <Hero dict={dict.hero} />
      <Ticker />
      <Services dict={dict.services} locale={locale} />
      <Work dict={dict.work} locale={locale} />
      <Proof dict={dict.proof} />
      <Process dict={dict.process} locale={locale} />
      <About dict={dict.about} />
      <Contact
        dict={dict.contact}
        closeLabel={dict.nav.close}
        locale={locale}
      />
    </main>
  )
}
