import { brandMarkPaths, brandMarkViewBox } from '@/shared/lib/brand-mark'

/** Satori-safe copy of the nav mark: plain acid fill, no classes or CSS. */
export function OgLogo() {
  return (
    <svg width={44} height={54} viewBox={brandMarkViewBox}>
      {brandMarkPaths.map((path) => (
        <path key={path.transform} d={path.d} transform={path.transform} fill="#D4FF3F" />
      ))}
    </svg>
  )
}
