import { Asterisk } from 'lucide-react'

import packageJson from '../../../../package.json'
import { site } from '@/shared/lib/site'
import type { Locale } from '@/shared/i18n/config'
import type { Dictionary } from '@/shared/i18n/dictionary'
import { Marquee } from '@/shared/components/motion/marquee'
import { SocialLinks } from '@/shared/components/ui/social-links'
import { LocalTime } from './local-time'

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
        <div className="hidden border-rule border-b py-8 md:block">
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

          <SocialLinks
            source="footer"
            className="col-span-6 md:col-span-6 md:justify-center"
          />

          <div className="u-label col-span-12 md:col-span-3 md:text-right">
            <span className="block">
              &copy; {new Date().getFullYear()} {site.shortName}
            </span>
            <span className="text-text-dim mt-1 block">v{packageJson.version}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
