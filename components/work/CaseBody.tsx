import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'

/** Pure renderer of the typed blocks in `data/projects.ts`. */
export function CaseBody({
  project,
  locale,
}: {
  project: Project
  locale: Locale
}) {
  return (
    <div className="grid-page py-[var(--spacing-section)]">
      <div className="col-span-12 lg:col-span-7 lg:col-start-4">
        {project.body.map((block, i) => {
          if (block.kind === 'heading') {
            return (
              <h2
                key={i}
                className="text-h2 u-wide mt-16 first:mt-0"
              >
                {block.text[locale]}
              </h2>
            )
          }

          if (block.kind === 'para') {
            return (
              <p key={i} className="text-lead text-chalk-200 mt-6">
                {block.text[locale]}
              </p>
            )
          }

          return (
            <ul key={i} className="text-body text-chalk-200 mt-6 space-y-3">
              {block.items.map((item) => (
                <li key={item[locale]} className="flex gap-3">
                  <span aria-hidden className="text-accent shrink-0">
                    /
                  </span>
                  {item[locale]}
                </li>
              ))}
            </ul>
          )
        })}
      </div>
    </div>
  )
}
