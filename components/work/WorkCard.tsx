import Link from 'next/link'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { cn } from '@/lib/cn'
import { MediaPlate } from './MediaPlate'

/** Column placement alternates so the grid never reads as a table of cards. */
const PLACEMENT = [
  'lg:col-span-7 lg:col-start-1',
  'lg:col-span-7 lg:col-start-6 lg:mt-[12vh]',
  'lg:col-span-8 lg:col-start-1',
] as const

export function WorkCard({
  project,
  locale,
  index,
  viewLabel,
}: {
  project: Project
  locale: Locale
  index: number
  viewLabel: string
}) {
  return (
    <article
      className={cn(
        'work-card col-span-12 mt-20 first:mt-0 lg:mt-0',
        PLACEMENT[index % PLACEMENT.length],
      )}
    >
      <Link href={`/${locale}/work/${project.slug}`} className="group block">
        <div className="u-meta text-text-dim work-meta flex flex-wrap gap-x-4 gap-y-1">
          <span>{project.year}</span>
          <span aria-hidden className="text-ink-600">
            /
          </span>
          <span>{t(project.role, locale)}</span>
          <span aria-hidden className="text-ink-600">
            /
          </span>
          <span>{project.stack.slice(0, 3).join(' · ')}</span>
        </div>

        <MediaPlate
          project={project}
          locale={locale}
          className="work-media mt-5"
        />

        <div className="mt-6 flex items-baseline justify-between gap-6">
          <h3 className="text-h2 u-wide work-title group-hover:text-accent transition-colors duration-300">
            {t(project.title, locale)}
          </h3>
          <span className="u-label text-accent shrink-0">
            {viewLabel} <span aria-hidden>↗</span>
          </span>
        </div>

        <p className="text-body text-chalk-200 mt-3 max-w-[46ch]">
          {t(project.tagline, locale)}
        </p>
      </Link>
    </article>
  )
}
