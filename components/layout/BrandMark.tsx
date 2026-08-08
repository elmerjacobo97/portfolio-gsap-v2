import { site } from '@/data/site'

export function BrandMark() {
  return (
    <span className="inline-flex items-center">
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        className="h-8 w-10 overflow-visible"
        fill="none"
      >
        {/* E owns the left stem; its top arm continues into the J. */}
        <path
          d="M4 4V28M4 4H18M4 16H14M4 28H14"
          className="stroke-text transition-colors duration-300 group-hover:stroke-accent group-focus-visible:stroke-accent"
          strokeWidth="5"
          strokeLinecap="square"
        />
        <path
          d="M18 4H28V21C28 25.5 24.5 28 19.5 28"
          className="stroke-accent transition-colors duration-300 group-hover:stroke-text group-focus-visible:stroke-text"
          strokeWidth="5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
      <span className="sr-only">{site.name}, {site.role}</span>
    </span>
  )
}
