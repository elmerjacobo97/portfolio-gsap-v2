import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getProject, nextProject, projectSlugs } from '@/data/projects'
import { hasLocale } from '@/i18n/config'
import { buildAlternates } from '@/lib/seo'
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

  // Bare title only: the root layout's `title.template` appends
  // " — Elmer Jacobo". Adding the suffix here too produced
  // "Operations dashboard — Elmer Jacobo — Elmer Jacobo".
  const title = t(project.title, locale)
  const description = t(project.summary, locale)
  const fullTitle = `${title} — ${site.shortName}`

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: buildAlternates(locale, `/work/${slug}`),
    // OG/Twitter titles bypass the template, so they carry the suffix.
    openGraph: {
      type: 'article',
      title: fullTitle,
      description,
      url: `/${locale}/work/${slug}`,
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description },
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
        <MediaPlate project={project} locale={locale} wide />
      </div>

      <div className="mt-[var(--spacing-section)]">
        <CaseMetrics project={project} locale={locale} />
      </div>

      <CaseBody project={project} locale={locale} />

      <div className="grid-page pb-[var(--spacing-section)]">
        <ArrowLink href={`/${locale}#work`} className="u-meta col-span-12">
          {dict.work.backWork}
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
