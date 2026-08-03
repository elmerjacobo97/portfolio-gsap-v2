import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProject, nextProject, projectSlugs } from '@/data/projects'
import { hasLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { t } from '@/i18n/t'
import { site } from '@/data/site'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { CaseBody } from '@/components/work/CaseBody'
import { CaseHeader } from '@/components/work/CaseHeader'
import { CaseMetrics } from '@/components/work/CaseMetrics'
import { MediaPlate } from '@/components/work/MediaPlate'
import { NextProject } from '@/components/work/NextProject'

type Params = { locale: string; slug: string }

/** Only this segment's params — the locale comes from the parent layout. */
export function generateStaticParams() {
  return projectSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(locale)) return {}

  const project = getProject(slug)
  if (!project) return {}

  const title = `${t(project.title, locale)} — ${site.shortName}`

  return {
    metadataBase: new URL(site.url),
    title,
    description: t(project.summary, locale),
    alternates: {
      canonical: `/${locale}/work/${slug}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/work/${slug}`]),
        ['x-default', `/es/work/${slug}`],
      ]),
    },
  }
}

export default async function CaseStudy({
  params,
}: {
  params: Promise<Params>
}) {
  const { locale, slug } = await params
  if (!hasLocale(locale)) notFound()

  const project = getProject(slug)
  if (!project) notFound()

  const dict = await getDictionary(locale)
  const next = nextProject(slug)

  return (
    <main id="main">
      <CaseHeader project={project} locale={locale} dict={dict.work} />

      <div className="page-pad">
        <MediaPlate project={project} locale={locale} />
      </div>

      <div className="mt-[var(--spacing-section)]">
        <CaseMetrics project={project} locale={locale} />
      </div>

      <CaseBody project={project} locale={locale} />

      <div className="grid-page pb-[var(--spacing-section)]">
        <ArrowLink href={`/${locale}`} className="u-meta col-span-12">
          {dict.work.backHome}
        </ArrowLink>
      </div>

      {next && next.slug !== slug ? (
        <NextProject
          project={next}
          locale={locale}
          label={dict.work.nextCase}
        />
      ) : null}
    </main>
  )
}
