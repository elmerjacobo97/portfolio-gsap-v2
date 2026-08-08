import { defaultLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { NotFoundContent } from '@/components/layout/NotFoundContent'

/**
 * `not-found.tsx` renders without route params, so it cannot know the locale.
 * It falls back to the default one — the same choice the root redirect makes.
 */
export default async function NotFound() {
  const dict = await getDictionary(defaultLocale)

  return <NotFoundContent copy={dict.notFound} href={`/${defaultLocale}`} />
}
