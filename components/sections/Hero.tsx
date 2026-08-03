import { Pill } from '@/components/ui/Pill'
import { Rule } from '@/components/ui/Rule'
import type { Dictionary } from '@/i18n/dictionary'

export function Hero({ dict }: { dict: Dictionary['hero'] }) {
  return (
    <section
      data-hero
      className="relative flex min-h-svh flex-col justify-between pt-28 pb-8"
    >
      <div className="hero-inner grid-page flex-1 content-center">
        <div className="col-span-12 lg:col-span-9">
          <h1 className="text-mega u-wide text-text">
            {/* Each line is its own block so SplitText can mask per line. */}
            <span className="hero-line block">{dict.lineOne}</span>
            <span className="hero-line block">{dict.lineTwo}</span>
          </h1>
        </div>

        <div className="hero-meta col-span-12 mt-12 lg:col-span-3 lg:mt-0 lg:self-end lg:text-right">
          <p className="u-label text-accent mb-4">{dict.role}</p>
          <ul className="u-meta text-text-dim space-y-1.5">
            {dict.meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="text-lead text-chalk-200 col-span-12 mt-14 max-w-[24ch] lg:col-span-6">
          {dict.statement}
        </p>
      </div>

      <div className="grid-page">
        <Rule className="hero-rule col-span-12 mb-6" />
        <div className="col-span-12 flex items-center justify-between">
          <Pill>{dict.available}</Pill>
          <span className="u-label flex items-center gap-2">
            {dict.scroll}
            <span aria-hidden>↓</span>
          </span>
        </div>
      </div>
    </section>
  )
}
