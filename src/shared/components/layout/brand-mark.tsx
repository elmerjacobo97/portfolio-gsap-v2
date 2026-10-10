import { site } from '@/shared/lib/site'
import { brandMarkPaths, brandMarkViewBox } from '@/shared/lib/brand-mark'

export function BrandMark() {
  return (
    <span className="inline-flex items-center">
      <svg
        aria-hidden
        viewBox={brandMarkViewBox}
        className="h-8 w-auto overflow-visible"
      >
        {brandMarkPaths.map((path) => (
          <path
            key={path.transform}
            d={path.d}
            transform={path.transform}
            className="fill-accent transition-colors duration-300 group-hover:fill-text group-focus-visible:fill-text"
          />
        ))}
      </svg>
      <span className="sr-only">{site.name}</span>
    </span>
  )
}
