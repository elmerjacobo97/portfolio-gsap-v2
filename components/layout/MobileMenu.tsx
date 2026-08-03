'use client'

import { useEffect } from 'react'

import type { NavLink } from './Nav'

export function MobileMenu({
  open,
  onClose,
  links,
  closeLabel,
}: {
  open: boolean
  onClose: () => void
  links: readonly NavLink[]
  closeLabel: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="bg-accent text-ink-950 fixed inset-0 z-[60] flex flex-col md:hidden"
    >
      <div className="grid-page items-center py-4">
        <button
          type="button"
          onClick={onClose}
          className="u-label col-span-12 text-right !text-current"
        >
          {closeLabel}
        </button>
      </div>

      <nav
        aria-label="Primary"
        className="page-pad flex flex-1 flex-col justify-center gap-2"
      >
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-h1 u-wide flex items-baseline gap-4"
          >
            <span className="u-label !text-ink-950/60 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
