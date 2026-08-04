import { cn } from '@/lib/cn'

/**
 * The hard hairline motif. Callers that want it to draw pass a class and
 * animate that — `.svc-rule` in Services does. It used to carry a `.rule-draw`
 * hook with no CSS rule and no tween behind it anywhere.
 */
export function Rule({ className }: { className?: string }) {
  return <span aria-hidden className={cn('rule-h', className)} />
}
