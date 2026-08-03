import { site } from '@/data/site'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { LocalTime } from './LocalTime'

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary['footer']
  locale: Locale
}) {
  const marqueeItems = Array.from({ length: 4 }, (_, i) => i)

  return (
    <footer className="border-rule overflow-hidden border-t">
      <div className="footer-inner">
        <div className="border-rule overflow-hidden border-b py-8">
          <div className="footer-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 items-center"
              >
                {marqueeItems.map((i) => (
                  <span key={i} className="text-h1 u-wide flex items-center">
                    <span className="px-8">{dict.marquee}</span>
                    <span aria-hidden className="text-accent">
                      ✳
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="grid-page items-baseline gap-y-8 py-10">
          <div className="u-meta text-text-dim col-span-6 md:col-span-3">
            <span className="block">{dict.localTime}</span>
            <span className="text-text mt-1 block">
              <LocalTime locale={locale} /> · {site.city}
            </span>
          </div>

          <ul className="col-span-6 flex gap-6 md:col-span-6 md:justify-center">
            {site.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-meta text-text-dim hover:text-accent transition-colors duration-200"
                >
                  {item.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="u-label col-span-12 md:col-span-3 md:text-right">
            <span className="block">
              © {new Date().getFullYear()} {site.name}
            </span>
            <span className="mt-1 block">{dict.builtWith}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
