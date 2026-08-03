import { cn } from '@/lib/cn'

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn('u-label', className)}>{children}</p>
}
