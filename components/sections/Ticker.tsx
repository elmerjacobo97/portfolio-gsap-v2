import { site } from '@/data/site'
import { Marquee } from '@/components/motion/Marquee'

export function Ticker() {
  return (
    <section className="border-rule border-y py-6">
      <Marquee duration={30}>
        {site.stack.map((item) => (
          <span key={item} className="u-meta text-text-dim flex items-center">
            <span className="px-6">{item}</span>
            <span aria-hidden className="text-accent">
              ✳
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
