import { notFound } from 'next/navigation'

/**
 * Catch-all so deep unknown paths (`/es/foo/bar`) resolve inside the `[locale]`
 * subtree and render the styled `not-found.tsx` instead of Next's bare 404.
 * There is no `app/layout.tsx` — the root layout lives at `app/[locale]/`.
 */
export default function CatchAll(): never {
  notFound()
}
