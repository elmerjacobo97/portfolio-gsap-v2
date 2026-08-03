import type { Metadata } from 'next'
import { Archivo, Space_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import '../globals.css'

import { getDictionary } from '@/i18n/get-dictionary'
import { hasLocale, locales, localeTag } from '@/i18n/config'
import { site } from '@/data/site'

/**
 * Archivo carries the whole display voice. It is one of the very few Google
 * fonts with a real `wdth` axis (62–125), so `wdth 118 / wght 800` gives the
 * expanded grotesque for headlines and `wdth 100 / wght 400` gives body copy —
 * from a single variable file. See the `u-wide` utility in globals.css.
 */
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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(locale)) return {}

  const dict = await getDictionary(locale)

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en',
        'x-default': '/es',
      },
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(locale)) notFound()

  return (
    // The font variables MUST sit on <html>. `--font-sans` is declared at
    // `:root`, and custom-property substitution happens where the property is
    // declared — putting them on <body> makes `var(--font-archivo)` resolve to
    // the guaranteed-invalid value and the whole type system falls back.
    <html
      lang={localeTag[locale]}
      className={`${archivo.variable} ${spaceMono.variable}`}
      // Extensions (LanguageTool, Grammarly…) stamp attributes on <html> before
      // React hydrates. Suppressing here covers only this element.
      suppressHydrationWarning
    >
      <body className="bg-canvas text-text">
        {/* Guarantees content for no-JS visitors and for the window before hydration. */}
        <noscript>
          <style>{`.anim-clip{visibility:visible!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  )
}
