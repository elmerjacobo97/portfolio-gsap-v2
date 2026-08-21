import { ImageResponse } from 'next/og'

import { site } from '@/data/site'
import { defaultLocale, hasLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'

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

  // The card has room for ~110 characters of lead before it crowds the mark.
  const lead =
    dict.blog.lead.length > 110 ? `${dict.blog.lead.slice(0, 110).trimEnd()}…` : dict.blog.lead

  // Same card language as the home OG image: system grotesque, acid on near-black.
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
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, letterSpacing: 4, color: '#8A8A82' }}>
          <span>{site.shortName.toUpperCase()}</span>
          <span style={{ color: '#D4FF3F' }}>{site.city.toUpperCase()}, {site.country}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
            {dict.blog.title.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', height: 2, background: '#D4FF3F' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 48, fontSize: 28 }}>
            <span style={{ color: '#C9C9C2' }}>{lead}</span>
            <span style={{ color: '#8A8A82', letterSpacing: 3, flexShrink: 0 }}>
              {site.role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
