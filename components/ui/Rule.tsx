import { cn } from '@/lib/cn'

/** The hard hairline motif. Phase 2 gives `.rule-draw` a scaleX reveal. */
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden className={cn('rule-h rule-draw', className)} />
}
