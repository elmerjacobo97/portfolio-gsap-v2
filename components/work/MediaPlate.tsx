import Image from 'next/image'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { PlateFill } from '@/components/ui/PlateFill'
import { t } from '@/i18n/t'
import { cn } from '@/lib/cn'

/**
 * The media well for a project. Falls back to <PlateFill/> while
 * `project.cover` is undefined — swapping in a real screenshot is a
 * `data/projects.ts` edit, no JSX changes anywhere.
 */
export function MediaPlate({
  project,
  locale,
  className,
}: {
  project: Project
  locale: Locale
  className?: string
}) {
  return (
    <div
      className={cn(
        // @container: PlateFill sizes its type against the plate's own width,
        // which tracks the card's column span rather than the viewport.
        'bg-ink-850 border-rule @container relative aspect-16/10 overflow-hidden border',
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          width={project.cover.width}
          height={project.cover.height}
          alt={project.cover.alt[locale]}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="case-media size-full object-cover"
        />
      ) : (
        <PlateFill
          lines={project.stack.slice(0, 4)}
          meta={`${project.year} · ${t(project.role, locale)}`}
        />
      )}
    </div>
  )
}
