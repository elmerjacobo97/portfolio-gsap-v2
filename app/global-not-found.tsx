import type { Metadata } from 'next'
import { Archivo, Space_Mono } from 'next/font/google'

import './globals.css'

import { site } from '@/data/site'
import { defaultLocale, localeTag } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { NotFoundContent } from '@/components/layout/NotFoundContent'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  display: 'swap',
})

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(defaultLocale)

  return {
    title: `${dict.notFound.title} — ${site.shortName}`,
    description: dict.notFound.body,
  }
}

/**
 * The global 404 bypasses `[locale]/layout.tsx`, so it owns the document shell,
 * fonts, and global stylesheet instead of relying on the localized layout.
 */
export default async function GlobalNotFound() {
  const dict = await getDictionary(defaultLocale)

  return (
    <html
      lang={localeTag[defaultLocale]}
      className={`${archivo.variable} ${spaceMono.variable}`}
    >
      <body className="bg-canvas text-text">
        <NotFoundContent copy={dict.notFound} href={`/${defaultLocale}`} />
      </body>
    </html>
  )
}
