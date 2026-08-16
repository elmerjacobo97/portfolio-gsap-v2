import { ArrowUpRight, Asterisk } from 'lucide-react'

import { site } from '@/data/site'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { Marquee } from '@/components/motion/Marquee'
import { LocalTime } from './LocalTime'

export function Footer({
  dict,
  locale,
}: {
  dict: Dictionary['footer']
  locale: Locale
}) {
  return (
    <footer className="border-rule overflow-hidden border-t">
      <div className="footer-inner">
        <div className="border-rule border-b py-8">
          <Marquee duration={34}>
            {dict.marquee.map((phrase) => (
              <span key={phrase} className="text-h1 u-wide flex items-center">
                <span className="px-8">{phrase}</span>
                <Asterisk
                  aria-hidden
                  size={24}
                  strokeWidth={1.5}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  className="text-accent"
                />
              </span>
            ))}
          </Marquee>
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
                  className="u-meta text-text-dim hover:text-accent inline-flex items-center py-2 transition-colors duration-200"
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden
                    size={16}
                    strokeWidth={1.5}
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    className="ml-1 inline-block align-[-0.2em]"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="u-label col-span-12 md:col-span-3 md:text-right">
            <span className="block">
              &copy; {new Date().getFullYear()} {site.shortName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
