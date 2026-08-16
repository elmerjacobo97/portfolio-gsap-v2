import { locales, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { getDictionary } from '@/i18n/get-dictionary'
import { LocalizedNotFoundContent } from '@/components/layout/NotFoundContent'

export default async function NotFound() {
  const dictionaries = await Promise.all(
    locales.map(async (locale) => [locale, (await getDictionary(locale)).notFound] as const),
  )
  const copies = Object.fromEntries(dictionaries) as Record<
    Locale,
    Dictionary['notFound']
  >

  return <LocalizedNotFoundContent copies={copies} />
}
