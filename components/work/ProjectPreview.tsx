import type { Project } from '@/data/projects'
import type { Locale } from '@/i18n/config'
import { t } from '@/i18n/t'
import { cn } from '@/lib/cn'

export function ProjectPreview({
  project,
  locale,
  className,
}: {
  project: Project
  locale: Locale
  className?: string
}) {
  const title = t(project.title, locale)
  const stack = project.stack.slice(0, 4)

  return (
    <span
      aria-hidden
      className={cn(
        'project-preview plate-bed absolute inset-0 block overflow-hidden',
        className,
      )}
    >
      <span className="preview-chrome border-rule bg-ink-900 absolute inset-[6%] block overflow-hidden border">
        <span className="border-rule flex h-9 items-center justify-between border-b px-3">
          <span className="flex gap-1.5">
            <span className="bg-ink-600 block size-1.5 rounded-full" />
            <span className="bg-ink-600 block size-1.5 rounded-full" />
            <span className="bg-accent block size-1.5 rounded-full" />
          </span>
          <span className="font-mono text-[8px] tracking-[0.18em] text-chalk-400 uppercase">
            {project.slug}
          </span>
        </span>

        {project.slug === 'plataforma-suscripciones' ? (
          <span className="grid h-[calc(100%-2.25rem)] grid-cols-[22%_1fr]">
            <span className="border-rule flex flex-col justify-between border-r p-[10%]">
              <span className="space-y-2">
                {stack.map((item, index) => (
                  <span
                    key={item}
                    className={cn(
                      'block h-1',
                      index === 0 ? 'bg-accent w-full' : 'bg-ink-600 w-2/3',
                    )}
                  />
                ))}
              </span>
              <span className="u-wide text-[clamp(0.7rem,2.5cqw,1.5rem)] leading-none text-chalk-400">
                SaaS
              </span>
            </span>
            <span className="grid grid-rows-[auto_1fr] gap-[7%] p-[7%]">
              <span className="grid grid-cols-3 gap-[4%]">
                {project.metrics.map((metric) => (
                  <span
                    key={metric.value}
                    className="border-rule bg-ink-850 block border p-[9%]"
                  >
                    <span className="u-wide text-[clamp(0.65rem,2.6cqw,1.6rem)] text-text">
                      {metric.value}
                    </span>
                    <span className="mt-2 block h-px w-3/4 bg-ink-600" />
                  </span>
                ))}
              </span>
              <span className="border-rule relative block overflow-hidden border p-[6%]">
                <span className="absolute inset-x-[6%] bottom-[16%] flex h-[60%] items-end gap-[4%]">
                  {[34, 48, 42, 67, 58, 82, 74, 92].map((height, index) => (
                    <span
                      key={index}
                      className={cn(
                        'block flex-1',
                        index === 7 ? 'bg-accent' : 'bg-ink-600',
                      )}
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </span>
              </span>
            </span>
          </span>
        ) : null}

        {project.slug === 'panel-operaciones' ? (
          <span className="grid h-[calc(100%-2.25rem)] grid-rows-[24%_1fr]">
            <span className="border-rule flex items-center justify-between border-b px-[6%]">
              <span className="u-wide text-[clamp(0.75rem,2.8cqw,1.7rem)] text-text">
                OPS / 14
              </span>
              <span className="flex items-center gap-2 font-mono text-[8px] tracking-widest text-chalk-400 uppercase">
                <span className="bg-accent block size-1.5 rounded-full" /> Live
              </span>
            </span>
            <span className="grid grid-cols-[1fr_28%] gap-[5%] p-[5%]">
              <span className="border-rule block border">
                {[0, 1, 2, 3, 4].map((row) => (
                  <span
                    key={row}
                    className="border-rule grid h-1/5 grid-cols-[12%_1fr_22%] items-center gap-[6%] border-b px-[5%] last:border-b-0"
                  >
                    <span className={cn('block size-1.5 rounded-full', row < 3 ? 'bg-accent' : 'bg-ink-600')} />
                    <span className="bg-ink-600 block h-1" />
                    <span className="border-rule block h-3 border" />
                  </span>
                ))}
              </span>
              <span className="flex flex-col justify-between">
                {project.metrics.map((metric, index) => (
                  <span key={metric.value} className="border-rule border-b pb-[8%]">
                    <span className={cn('u-wide block text-[clamp(0.7rem,2.5cqw,1.4rem)]', index === 0 ? 'text-accent' : 'text-text')}>
                      {metric.value}
                    </span>
                    <span className="mt-1 block h-px w-full bg-ink-600" />
                  </span>
                ))}
              </span>
            </span>
          </span>
        ) : null}

        {project.slug === 'app-movil-campo' ? (
          <span className="relative flex h-[calc(100%-2.25rem)] items-center justify-center">
            <span className="u-wide absolute top-[10%] left-[7%] text-[clamp(0.75rem,3cqw,1.8rem)] leading-none text-chalk-400">
              OFF<br />LINE
            </span>
            <span className="border-rule bg-ink-950 relative block h-[82%] w-[31%] min-w-24 overflow-hidden rounded-[1.5rem] border-2 p-[5%] shadow-[12px_12px_0_var(--color-accent)]">
              <span className="bg-ink-700 absolute top-2 left-1/2 block h-1 w-1/3 -translate-x-1/2 rounded-full" />
              <span className="mt-[18%] block">
                <span className="u-wide text-[clamp(0.65rem,2.4cqw,1.35rem)] text-text">24.8</span>
                <span className="mt-[14%] grid grid-cols-2 gap-[8%]">
                  {[62, 38, 82, 54].map((height, index) => (
                    <span key={index} className="border-rule bg-ink-850 block border p-[12%]">
                      <span className="bg-accent block h-1" style={{ width: `${height}%` }} />
                      <span className="bg-ink-600 mt-2 block h-px w-full" />
                    </span>
                  ))}
                </span>
                <span className="border-rule mt-[16%] flex items-center gap-2 border-t pt-[10%] font-mono text-[7px] tracking-widest text-chalk-400 uppercase">
                  <span className="bg-accent block size-1.5 rounded-full" /> Sync ready
                </span>
              </span>
            </span>
            <span className="u-meta absolute right-[6%] bottom-[8%] text-chalk-400">
              100% / offline
            </span>
          </span>
        ) : null}
      </span>

      <span
        className="plate-mass bg-accent absolute right-0 bottom-0 block h-[2.5%] w-full origin-right"
        style={{ transform: 'scaleX(0.26)' }}
      />
      <span className="plate-meta u-meta text-chalk-400 absolute bottom-[4%] left-[2%]">
        {project.year} · {title}
      </span>
    </span>
  )
}
