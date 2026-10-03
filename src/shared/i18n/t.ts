import type { Locale } from './config'

/** Every translatable field in `data/*` is stored as a record keyed by locale. */
export type Localized<T = string> = Record<Locale, T>

export function t<T>(field: Localized<T>, locale: Locale): T {
  return field[locale]
}
