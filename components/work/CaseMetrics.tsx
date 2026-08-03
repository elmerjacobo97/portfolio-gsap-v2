import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'

export function CaseMetrics({
  project,
  locale,
}: {
  project: Project
  locale: Locale
}) {
  if (project.metrics.length === 0) return null

  return (
    <dl className="border-rule grid-page border-y py-16">
      {project.metrics.map((metric) => (
        <div key={metric.label[locale]} className="col-span-12 md:col-span-4">
          <dt className="sr-only">{metric.label[locale]}</dt>
          <dd>
            <span className="text-h1 u-wide text-accent block">
              {metric.value}
            </span>
            <span className="u-label mt-3 block">{metric.label[locale]}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
