import type { MetadataRoute } from 'next'

import { getPosts } from '@/lib/blog'
import { site } from '@/data/site'
import { defaultLocale, locales, type Locale } from '@/i18n/config'

const url = (path: string) => new URL(path, site.url).toString()

/**
 * Every entry carries its own hreflang alternates, per Google's guidance.
 * Posts may ship in one language first, so callers narrow `available`.
 */
function alternates(path: string, available: readonly Locale[] = locales) {
  return {
    languages: {
      ...Object.fromEntries(available.map((l) => [l, url(`/${l}${path}`)])),
      ...(available.includes(defaultLocale)
        ? { 'x-default': url(`/${defaultLocale}${path}`) }
        : {}),
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1 },
    { path: '/blog', changeFrequency: 'weekly' as const, priority: 0.8 },
  ]

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: url(`/${locale}${path}`),
      changeFrequency,
      priority,
      alternates: alternates(path),
    })),
  )

  const postsByLocale = await Promise.all(
    locales.map(async (locale) => ({ locale, posts: await getPosts(locale) })),
  )
  const slugsByLocale = new Map(
    postsByLocale.map(({ locale, posts }) => [
      locale,
      new Set(posts.map((post) => post.slug)),
    ]),
  )
  const allSlugs = [...new Set(postsByLocale.flatMap(({ posts }) => posts.map((post) => post.slug)))]

  const postEntries = allSlugs.flatMap((slug) => {
    const available = locales.filter((l) => slugsByLocale.get(l)?.has(slug))
    const path = `/blog/${slug}`

    return postsByLocale.flatMap(({ locale, posts }) => {
      const post = posts.find((entry) => entry.slug === slug)
      if (!post) return []
      return [
        {
          url: url(`/${locale}${path}`),
          lastModified: post.date,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
          alternates: alternates(path, available),
        },
      ]
    })
  })

  return [...staticEntries, ...postEntries]
}
