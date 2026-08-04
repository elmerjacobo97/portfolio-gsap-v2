import { site } from '@/data/site'
import { services } from '@/data/services'
import type { Locale } from '@/i18n/config'
import { localeTag } from '@/i18n/config'
import { t } from '@/i18n/t'

function serializeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

/**
 * Person + ProfessionalService. Emitted as one @graph so both entities can
 * cross-reference each other by @id instead of being duplicated.
 */
export function JsonLd({
  locale,
  description,
}: {
  locale: Locale
  description: string
}) {
  const personId = `${site.url}/#person`
  const businessId = `${site.url}/#business`

  const graph = [
    {
      '@type': 'Person',
      '@id': personId,
      name: site.name,
      alternateName: site.shortName,
      jobTitle: site.role,
      email: `mailto:${site.email}`,
      telephone: site.phone,
      url: `${site.url}/${locale}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.city,
        addressCountry: site.country,
      },
      sameAs: site.social.map((s) => s.href),
      knowsAbout: site.stack,
    },
    {
      '@type': 'ProfessionalService',
      '@id': businessId,
      name: site.shortName,
      description,
      url: `${site.url}/${locale}`,
      founder: { '@id': personId },
      areaServed: 'Worldwide',
      availableLanguage: Object.values(localeTag),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: site.role,
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: t(service.title, locale),
            description: t(service.pitch, locale),
          },
        })),
      },
    },
  ]
  const serializedGraph = serializeJsonLd({
    '@context': 'https://schema.org',
    '@graph': graph,
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializedGraph }}
    />
  )
}
