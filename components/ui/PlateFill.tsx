import { cn } from '@/lib/cn'

/**
 * What fills a media well while there is no photograph in it.
 *
 * The previous stand-in — a 1px acid diagonal across an empty box — read as a
 * broken image rather than a decision. This one is composed: the hairline bed
 * continues the page grid, a solid acid block anchors the corner, and the
 * type is the project's stack, set large and clipped by the plate edge.
 *
 * The stack specifically, not the title: the title is already set as an <h3>
 * directly under the plate, and repeating it at watermark size just reads as a
 * duplicate. The stack is the one fact about a build that isn't printed
 * anywhere else at this size, and a column of technology names is what a
 * developer's spec plate should say.
 *
 * Purely decorative — every string here is also rendered as real text beside
 * the plate, so the whole thing is `aria-hidden`.
 */
export function PlateFill({
  lines,
  meta,
  className,
}: {
  lines: readonly string[]
  meta?: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn('absolute inset-0 overflow-hidden', className)}
    >
      <span className="plate-bed absolute inset-0" />

      {/* The one solid mass in the composition. Bottom-right, so it sits
          opposite the type and never collides with the meta line. Cards
          animate it on hover (`.plate-mass`) — the composition's anchor is
          also its interaction, which beats bolting a separate overlay on. */}
      <span
        className="plate-mass bg-accent absolute right-0 bottom-0 block h-[14%] w-full origin-right"
        style={{ transform: 'scaleX(0.26)' }}
      />

      {/*
       * No `data-speed` here, tempting as it is. The drift ScrollSmoother
       * applies grows with distance scrolled, and this layer is pinned
       * inset-0 inside an overflow-hidden well — far enough down the page the
       * meta line slides under the plate's bottom edge and gets clipped.
       */}
      <span className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
        <span className="block">
          {lines.map((line) => (
            <span
              key={line}
              /* nowrap on purpose: a name that outruns the plate should be cut
                 by the edge, not broken across two lines mid-word. */
              className="u-wide text-ink-600 block text-[clamp(1.5rem,5cqw,3.5rem)] leading-[0.9] whitespace-nowrap"
            >
              {line}
            </span>
          ))}
        </span>

        {/* `.plate-meta` so a hovering card can flip it to ink: the acid mass
            sweeps the full width of the plate and would otherwise leave this
            line at chalk-400 on acid. */}
        {/* max-w-[70%] keeps it clear of the acid block at rest: on a narrow
            plate the line was long enough to run under the mass and sit
            chalk-on-acid. */}
        {meta ? (
          <span className="plate-meta u-meta text-chalk-400 block max-w-[70%]">
            {meta}
          </span>
        ) : null}
      </span>
    </span>
  )
}
