import 'server-only'

import { getYearsOfExperience } from '@/data/site'
import type { Dictionary } from './dictionary'
import type { Locale } from './config'

/**
 * Static import map, not a template-literal `import()`. The bundler can see
 * every branch, so each dictionary lands in its own chunk and only the
 * requested locale is ever loaded.
 */
const dictionaries = {
  es: () => import('./dictionaries/es').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
} satisfies Record<Locale, () => Promise<Dictionary>>

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dict = await dictionaries[locale]()
  const years = String(getYearsOfExperience())
  const fillYears = (text: string) => text.replaceAll('{years}', years)

  return {
    ...dict,
    about: {
      ...dict.about,
      bio: dict.about.bio.map(fillYears),
      stats: dict.about.stats.map((stat) => ({
        ...stat,
        value: fillYears(stat.value),
      })),
    },
  }
}
