import 'server-only'

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
  return dictionaries[locale]()
}
