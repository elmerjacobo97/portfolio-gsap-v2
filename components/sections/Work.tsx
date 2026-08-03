import { featured } from '@/data/projects'
import type { Dictionary } from '@/i18n/dictionary'
import type { Locale } from '@/i18n/config'
import { WorkCard } from '@/components/work/WorkCard'
import { SectionHeader } from './SectionHeader'

export function Work({
  dict,
  locale,
}: {
  dict: Dictionary['work']
  locale: Locale
}) {
  return (
    <section id="work" className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
      </div>

      <div className="grid-page mt-20 lg:gap-y-[14vh]">
        {featured().map((project, i) => (
          <WorkCard
            key={project.slug}
            project={project}
            locale={locale}
            index={i}
            viewLabel={dict.viewCase}
          />
        ))}
      </div>
    </section>
  )
}
