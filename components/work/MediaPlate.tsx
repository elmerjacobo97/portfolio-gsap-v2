import Image from 'next/image'

import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/cn'

/**
 * CSS-only stand-in while `project.cover` is undefined. Swapping in a real
 * screenshot is a `data/projects.ts` edit — no JSX changes anywhere.
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
        'bg-ink-850 border-rule relative aspect-16/10 overflow-hidden border',
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
        <>
          <span
            aria-hidden
            className="bg-accent/70 absolute top-1/2 -left-1/4 h-px w-[150%] origin-center -rotate-12"
          />
          {/* Caption on the placeholder plate. aria-hidden is the honest
              semantic (it is not content), but axe still audits its contrast,
              so it uses chalk-400 — ~5.4:1 on ink-850 — rather than a faint
              watermark tone. Goes away entirely once real covers land. */}
          <span
            aria-hidden
            className="u-meta text-chalk-400 absolute right-5 bottom-5"
          >
            {project.slug}
          </span>
        </>
      )}
    </div>
  )
}
