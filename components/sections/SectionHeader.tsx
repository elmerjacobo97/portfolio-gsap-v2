import { Rule } from '@/components/ui/Rule'

export function SectionHeader({
  index,
  title,
  lead,
}: {
  index: string
  title: string
  lead?: string
}) {
  return (
    <header className="col-span-12">
      {/* The index sits on its own line: baseline-aligning an 11px mono label
          against a 68px display title reads as a collision, not a pairing. */}
      <p className="u-label text-accent mb-5">{index}</p>
      <h2 className="text-h1 u-wide">{title}</h2>

      <Rule className="mt-8" />

      {lead ? (
        <p className="text-lead text-chalk-200 mt-8 max-w-[46ch]">{lead}</p>
      ) : null}
    </header>
  )
}
