'use client'

import { useRef, useState } from 'react'

import { site } from '@/data/site'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/cn'
import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'
import { TransitionLink } from '@/components/motion/TransitionLink'
import { LocaleSwitcher } from './LocaleSwitcher'
import { MobileMenu } from './MobileMenu'

export type NavLink = { href: string; label: string }

export function Nav({
  locale,
  links,
  switchLabel,
  menuLabel,
  closeLabel,
}: {
  locale: Locale
  links: readonly NavLink[]
  switchLabel: string
  menuLabel: string
  closeLabel: string
}) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(OK, () => {
      const header = headerRef.current
      if (!header) return

      const trigger = ScrollTrigger.create({
        onUpdate: (self) =>
          gsap.to(header, {
            yPercent: self.direction === 1 && self.scroll() > 240 ? -100 : 0,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: true,
          }),
      })

      return () => trigger.kill()
    })

    return () => mm.revert()
  })

  // ScrollSmoother owns scrolling, so native anchor jumps would fight it.
  // If the section is not on this page (a case study, say), we do nothing and
  // let the browser follow the absolute href back to the home page.
  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.slice(href.indexOf('#'))
    const target = document.querySelector(hash)
    if (!target) return

    e.preventDefault()
    const smoother = ScrollSmoother.get()

    if (smoother) {
      smoother.scrollTo(target, true, 'top top')
    } else {
      target.scrollIntoView()
    }
  }

  return (
    <>
      <header
        ref={headerRef}
        data-nav
        className="bg-canvas/80 border-rule fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      >
        <div className="grid-page items-center py-4">
          {/* `py-2` on every nav control: the 11–13px mono type gives a ~19px
              hit box, under the 24px minimum touch target (axe: target-size). */}
          <TransitionLink
            href={`/${locale}`}
            className="u-meta text-text hover:text-accent col-span-6 inline-flex items-center py-2 transition-colors duration-200 md:col-span-4"
          >
            {site.shortName}
          </TransitionLink>

          <nav
            aria-label="Primary"
            className="col-span-4 hidden justify-center gap-8 md:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                className="u-label text-text-dim hover:text-text inline-flex items-center px-2 py-2 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="col-span-6 flex items-center justify-end gap-6 md:col-span-4">
            <LocaleSwitcher locale={locale} label={switchLabel} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              className={cn(
                'u-label text-text hover:text-accent inline-flex items-center py-2 transition-colors duration-200 md:hidden',
              )}
            >
              {menuLabel}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        links={links}
        closeLabel={closeLabel}
      />
    </>
  )
}
