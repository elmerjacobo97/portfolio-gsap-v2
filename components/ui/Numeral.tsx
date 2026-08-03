import { cn } from '@/lib/cn'

/** Oversized outlined index number used behind process steps. */
export function Numeral({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span aria-hidden className={cn('text-numeral u-wide u-outline block', className)}>
      {children}
    </span>
  )
}
