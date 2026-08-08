import { Asterisk } from 'lucide-react'

import { site } from '@/data/site'
import { Marquee } from '@/components/motion/Marquee'

export function Ticker() {
  return (
    <section className="border-rule border-y py-6">
      <Marquee duration={30}>
        {site.stack.map((item) => (
          <span key={item} className="u-meta text-text-dim flex items-center">
            <span className="px-6">{item}</span>
            <Asterisk
              aria-hidden
              size={14}
              strokeWidth={1.5}
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="text-accent"
            />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
