/**
 * Label above value, not beside it. A long value (the email) would otherwise
 * push the arrow past the column edge at the widest breakpoints.
 */
export function ChannelRow({
  label,
  value,
  href,
  external,
}: {
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="channel-row border-rule group relative block overflow-hidden border-t py-6"
    >
      {/* Phase 3 sweeps this fill with GSAP; the CSS transition is the floor. */}
      <span
        aria-hidden
        className="bg-accent absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-(--ease-brutal) group-hover:scale-x-100"
      />
      <span className="relative block px-1">
        <span className="u-label group-hover:!text-ink-950/60 block transition-colors duration-300">
          {label}
        </span>
        <span className="text-h3 u-wide group-hover:text-ink-950 mt-2 flex items-baseline justify-between gap-3 break-all transition-colors duration-300">
          {value}
          <span aria-hidden className="arrow shrink-0">
            ↗
          </span>
        </span>
      </span>
    </a>
  )
}
