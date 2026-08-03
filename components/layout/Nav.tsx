'use client'

import { useState } from 'react'

import { site } from '@/data/site'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/cn'
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

  return (
    <>
      <header
        data-nav
        className="bg-canvas/80 border-rule fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
      >
        <div className="grid-page items-center py-4">
          <a
            href={`/${locale}`}
            className="u-meta text-text hover:text-accent col-span-6 transition-colors duration-200 md:col-span-4"
          >
            {site.shortName}
          </a>

          <nav
            aria-label="Primary"
            className="col-span-4 hidden justify-center gap-8 md:flex"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="u-label text-text-dim hover:text-text transition-colors duration-200"
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
                'u-label text-text hover:text-accent transition-colors duration-200 md:hidden',
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
