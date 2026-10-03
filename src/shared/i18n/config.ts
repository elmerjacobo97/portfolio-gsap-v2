export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Full BCP-47 tags, for <html lang> and Intl formatters. */
export const localeTag: Record<Locale, string> = {
  es: 'es-PE',
  en: 'en-US',
}
