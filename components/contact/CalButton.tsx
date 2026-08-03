'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import { site } from '@/data/site'
import { ChannelRow } from './ChannelRow'

/**
 * The Cal embed is the heaviest thing on the page and almost nobody clicks it
 * on a first visit, so it costs 0 KB until they do.
 *
 * `ssr: false` is only legal inside a 'use client' module in Next 16 — this
 * file is exactly that boundary.
 */
const CalEmbed = dynamic(() => import('./CalEmbed'), { ssr: false })

export function CalButton({ label, closeLabel }: { label: string; closeLabel: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <ChannelRow
        label={label}
        value="cal.com"
        href={`https://cal.com/${site.calLink}`}
        onActivate={() => setOpen(true)}
      />

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          className="bg-canvas/95 fixed inset-0 z-[95] flex flex-col backdrop-blur-md"
        >
          <div className="page-pad flex justify-end py-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="u-meta text-text hover:text-accent transition-colors duration-200"
            >
              {closeLabel} ✕
            </button>
          </div>
          <div className="page-pad flex-1 overflow-auto pb-8">
            <CalEmbed />
          </div>
        </div>
      ) : null}
    </>
  )
}
