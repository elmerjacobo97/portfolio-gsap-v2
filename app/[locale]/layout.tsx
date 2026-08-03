import type { Metadata } from 'next'
import { Archivo, Space_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import '../globals.css'

import { getDictionary } from '@/i18n/get-dictionary'
import { hasLocale, locales, localeTag } from '@/i18n/config'
import { site } from '@/data/site'
import { Footer } from '@/components/layout/Footer'
import { GridOverlay } from '@/components/layout/GridOverlay'
import { Nav } from '@/components/layout/Nav'
import { SkipLink } from '@/components/layout/SkipLink'
import { Curtain } from '@/components/motion/Curtain'
import { Cursor } from '@/components/motion/Cursor'
import { Intro } from '@/components/motion/Intro'
import { RouteMotion } from '@/components/motion/RouteMotion'
import { ScrollProgress } from '@/components/motion/ScrollProgress'
import { SmoothProvider } from '@/components/motion/SmoothProvider'

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

  const dict = await getDictionary(locale)

  // Absolute, not bare hashes: on a case-study page `#services` does not
  // exist, and a bare hash link would silently do nothing. Nav intercepts
  // these for a smooth scroll only when the target is on the current page.
  const navLinks = [
    { href: `/${locale}#services`, label: dict.nav.services },
    { href: `/${locale}#work`, label: dict.nav.work },
    { href: `/${locale}#process`, label: dict.nav.process },
    { href: `/${locale}#contact`, label: dict.nav.contact },
  ]

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
        {/*
         * Guarantees content for no-JS visitors and for the window before
         * hydration. The intro is server-rendered so it covers the page from
         * the first paint — without JS to dismiss it, it must not render.
         */}
        <noscript>
          <style>{`.anim-clip{visibility:visible!important}.intro{display:none!important}`}</style>
        </noscript>

        {/*
         * Everything down to (and including) <Cursor/> is `position: fixed`
         * chrome. It MUST stay a sibling of <SmoothProvider/> — the transform
         * ScrollSmoother applies to #smooth-content creates a containing
         * block, so a fixed element nested inside it would scroll with the
         * page instead of staying pinned to the viewport.
         */}
        <SkipLink label={dict.nav.skipToContent} />
        <GridOverlay />
        <Nav
          locale={locale}
          links={navLinks}
          switchLabel={dict.nav.switchTo}
          menuLabel={dict.nav.menu}
          closeLabel={dict.nav.close}
        />
        <ScrollProgress />
        <Cursor />
        <Curtain />
        <Intro />

        <SmoothProvider>
          <div className="relative z-10">
            {children}
            <Footer dict={dict.footer} locale={locale} />
          </div>
        </SmoothProvider>

        <RouteMotion />
      </body>
    </html>
  )
}
