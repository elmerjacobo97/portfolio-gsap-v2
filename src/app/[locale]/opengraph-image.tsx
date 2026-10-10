import { ImageResponse } from 'next/og'

import { site } from '@/shared/lib/site'
import { defaultLocale, hasLocale, locales } from '@/shared/i18n/config'
import { getDictionary } from '@/shared/i18n/get-dictionary'
import { OgLogo } from './_components/og-logo'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

/** In Next 16 `params` is a Promise here too. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: raw } = await params
  const locale = hasLocale(raw) ? raw : defaultLocale
  const dict = await getDictionary(locale)
  const socials = site.social.map((s) => s.label.toUpperCase()).join(' · ')

  // No custom font is loaded: next/og would need a .ttf shipped in the repo,
  // and Archivo's whole point is a variable wdth axis that Satori cannot use
  // anyway. The system grotesque keeps the card on-brand without the binary.
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#050505',
          color: '#F7F7F2',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <OgLogo />
          <span style={{ fontSize: 24, letterSpacing: 4, color: '#D4FF3F' }}>
            {dict.hero.available.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 118, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
            {dict.hero.lineOne.toUpperCase()}
          </div>
          <div style={{ fontSize: 118, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
            {dict.hero.lineTwo.toUpperCase()}
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 2, marginTop: 16, color: '#C9C9C2' }}>
            {dict.hero.role.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', height: 2, background: '#D4FF3F' }} />
          <div style={{ display: 'flex', fontSize: 28, color: '#C9C9C2' }}>
            {dict.hero.statement}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, letterSpacing: 3, color: '#8A8A82' }}>
            <span>{socials}</span>
            <span>{site.city.toUpperCase()}, {site.country}</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
