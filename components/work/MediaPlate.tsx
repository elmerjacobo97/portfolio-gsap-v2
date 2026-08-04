import Image from 'next/image'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/cn'
import { ProjectPreview } from './ProjectPreview'

/** Project media with a CSS fallback for records without a screenshot. */
export function MediaPlate({
  project,
  locale,
  className,
  wide = false,
}: {
  project: Project
  locale: Locale
  className?: string
  wide?: boolean
}) {
  return (
    <div
      className={cn(
        // @container: ProjectPreview sizes its type against the plate's own width,
        // which tracks the card's column span rather than the viewport.
        'bg-ink-850 border-rule @container relative overflow-hidden border',
        wide ? 'aspect-16/10 sm:aspect-[16/8]' : 'aspect-16/10',
        className,
      )}
    >
      {project.cover ? (
        <Image
          src={project.cover.src}
          width={project.cover.width}
          height={project.cover.height}
          alt={project.cover.alt[locale]}
          loading={wide ? 'eager' : 'lazy'}
          sizes="(max-width: 768px) 100vw, 60vw"
          className={cn(
            'case-media size-full',
            project.cover.fit === 'contain' ? 'object-contain' : 'object-cover',
          )}
        />
      ) : (
        <ProjectPreview project={project} locale={locale} />
      )}
    </div>
  )
}
