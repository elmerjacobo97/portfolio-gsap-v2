import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/shared/lib/cn'
import { site } from '@/shared/lib/site'

export function SocialLinks({
  source,
  className,
}: {
  source: 'footer'
  className?: string
}) {
  return (
    <ul className={cn('flex flex-wrap gap-x-6 gap-y-2', className)}>
      {site.social.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event={
              item.label === 'LinkedIn' ? 'linkedin_click' : undefined
            }
            data-analytics-source={item.label === 'LinkedIn' ? source : undefined}
            className="u-meta text-text-dim hover:text-accent inline-flex items-center py-2 transition-colors duration-200"
          >
            {item.label}
            <ArrowUpRight
              aria-hidden
              size={16}
              strokeWidth={1.5}
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="ml-1 inline-block align-[-0.2em]"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}
