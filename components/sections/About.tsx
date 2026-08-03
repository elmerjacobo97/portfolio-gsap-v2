import { site } from '@/data/site'
import type { Dictionary } from '@/i18n/dictionary'
import { SectionHeader } from './SectionHeader'

export function About({ dict }: { dict: Dictionary['about'] }) {
  return (
    <section id="about" className="py-[var(--spacing-section)]">
      <div className="grid-page">
        <SectionHeader index={dict.index} title={dict.title} />

        {/* Portrait well. A real <Image> lands here once there is a photo. */}
        <div
          aria-hidden
          className="bg-ink-850 border-rule relative col-span-12 mt-16 aspect-4/5 overflow-hidden border sm:col-span-6 lg:col-span-5"
        >
          <span className="bg-accent/70 absolute top-1/2 -left-1/4 h-px w-[150%] origin-center -rotate-45" />
          <span className="u-meta text-chalk-400/25 absolute right-5 bottom-5">
            {site.city}, {site.country}
          </span>
        </div>

        <div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-16">
          <div className="about-bio space-y-6">
            {dict.bio.map((para) => (
              <p key={para} className="text-lead text-chalk-200">
                {para}
              </p>
            ))}
          </div>

          <dl className="border-rule mt-14 grid grid-cols-3 gap-6 border-t pt-10">
            {dict.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="text-h1 u-wide text-accent block">
                    {stat.value}
                  </span>
                  <span className="u-label mt-2 block">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
