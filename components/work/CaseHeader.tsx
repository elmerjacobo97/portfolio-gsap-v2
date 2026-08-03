import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { t } from '@/i18n/t'
import { ArrowLink } from '@/components/ui/ArrowLink'
import { Rule } from '@/components/ui/Rule'

export function CaseHeader({
  project,
  locale,
  dict,
}: {
  project: Project
  locale: Locale
  dict: Dictionary['work']
}) {
  const facts = [
    { label: dict.client, value: project.client },
    { label: dict.year, value: String(project.year) },
    { label: dict.role, value: t(project.role, locale) },
    { label: dict.stack, value: project.stack.join(' · ') },
  ]

  return (
    <header className="grid-page pt-40 pb-16">
      <h1 className="text-display u-wide col-span-12">
        {t(project.title, locale)}
      </h1>

      <p className="text-lead text-chalk-200 col-span-12 mt-8 max-w-[46ch] lg:col-span-6">
        {t(project.tagline, locale)}
      </p>

      <Rule className="col-span-12 mt-16" />

      <dl className="col-span-12 mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="u-label">{fact.label}</dt>
            <dd className="u-meta text-text mt-2">{fact.value}</dd>
          </div>
        ))}
      </dl>

      {project.liveUrl || project.repoUrl ? (
        <div className="u-meta col-span-12 mt-10 flex flex-wrap gap-8">
          {project.liveUrl ? (
            <ArrowLink href={project.liveUrl} external>
              {dict.liveSite}
            </ArrowLink>
          ) : null}
          {project.repoUrl ? (
            <ArrowLink href={project.repoUrl} external>
              {dict.repository}
            </ArrowLink>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
