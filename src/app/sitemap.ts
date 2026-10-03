import type { MetadataRoute } from 'next'

import { getPosts } from '@/features/blog/services/posts'
import { site } from '@/shared/lib/site'
import { defaultLocale, locales, type Locale } from '@/shared/i18n/config'

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
  const postsByLocale = await Promise.all(
    locales.map(async (locale) => ({ locale, posts: await getPosts(locale) })),
  )
  const newestPost = postsByLocale
    .flatMap(({ posts }) => posts.map((post) => post.updated ?? post.date))
    .sort((a, b) => b.getTime() - a.getTime())[0]

  const staticPaths = [
    { path: '', changeFrequency: 'monthly' as const, priority: 1 },
    {
      path: '/blog',
      lastModified: newestPost,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map(({ path, ...entry }) => ({
      url: url(`/${locale}${path}`),
      ...entry,
      alternates: alternates(path),
    })),
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
          lastModified: post.updated ?? post.date,
          changeFrequency: 'weekly' as const,
          priority: 0.7,
          alternates: alternates(path, available),
        },
      ]
    })
  })

  return [...staticEntries, ...postEntries]
}
