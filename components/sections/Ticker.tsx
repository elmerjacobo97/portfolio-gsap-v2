import { site } from '@/data/site'

/**
 * The track content is duplicated exactly twice so a -50% xPercent loop in
 * Phase 2 is seamless. `aria-hidden` on the copy keeps it out of the a11y tree.
 */
export function Ticker() {
  const items = site.stack

  return (
    <section className="border-rule overflow-hidden border-y py-6">
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="u-meta text-text-dim flex shrink-0 items-center"
          >
            {items.map((item) => (
              <li key={item} className="flex items-center">
                <span className="px-6">{item}</span>
                <span aria-hidden className="text-accent">
                  ✳
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
