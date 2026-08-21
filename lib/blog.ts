import 'server-only'

import { readdir, readFile } from 'fs/promises'
import path from 'path'

import { format } from 'date-fns'
import type { Locale as DateFnsLocale } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import matter from 'gray-matter'
import { z } from 'zod'

import type { Locale } from '@/i18n/config'

const frontmatterSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.coerce.date(),
	category: z.string().optional(),
	tags: z.array(z.string()).default([]),
	cover: z.string().optional(),
	coverAlt: z.string().optional(),
	draft: z.boolean().default(false),
})

export type BlogPostMeta = { slug: string; readingMinutes: number } & z.infer<
	typeof frontmatterSchema
>

export interface BlogPost extends BlogPostMeta {
	content: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog')
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const WORDS_PER_MINUTE = 200

function dirFor(locale: Locale) {
	return path.join(CONTENT_ROOT, locale)
}

function toMeta(
	slug: string,
	data: z.infer<typeof frontmatterSchema>,
	content: string,
): BlogPostMeta {
	const words = content.trim().split(/\s+/).length
	return {
		slug,
		title: data.title,
		description: data.description,
		date: data.date,
		category: data.category,
		tags: data.tags,
		cover: data.cover,
		coverAlt: data.coverAlt,
		draft: data.draft,
		readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
	}
}

async function parsePost(locale: Locale, slug: string): Promise<{ meta: BlogPostMeta; content: string } | null> {
	const raw = await readFile(path.join(dirFor(locale), `${slug}.mdx`), 'utf8')
	const { data, content } = matter(raw)
	const parsed = frontmatterSchema.parse(data)
	if (parsed.draft) return null
	return { meta: toMeta(slug, parsed, content), content }
}

/** Every published post for a locale, newest first. */
export async function getPosts(locale: Locale): Promise<BlogPostMeta[]> {
	const files = await readdir(dirFor(locale)).catch(() => [] as string[])
	const slugs = files
		.filter((file) => file.endsWith('.mdx'))
		.map((file) => file.slice(0, -4))
	const parsed = await Promise.all(slugs.map((slug) => parsePostSafe(locale, slug)))
	return parsed
		.filter((post): post is { meta: BlogPostMeta; content: string } => post !== null)
		.map((post) => post.meta)
		.sort((a, b) => b.date.getTime() - a.date.getTime())
}

async function parsePostSafe(locale: Locale, slug: string) {
	if (!SLUG_PATTERN.test(slug)) return null
	try {
		return await parsePost(locale, slug)
	} catch {
		return null
	}
}

/** One post with its MDX body, or null when missing, malformed, or a draft. */
export async function getPost(locale: Locale, slug: string): Promise<BlogPost | null> {
	const post = await parsePostSafe(locale, slug)
	return post ? { ...post.meta, content: post.content } : null
}

export async function getPostSlugs(locale: Locale): Promise<string[]> {
	const posts = await getPosts(locale)
	return posts.map((post) => post.slug)
}

export async function postExists(locale: Locale, slug: string): Promise<boolean> {
	return (await getPost(locale, slug)) !== null
}

const DATE_PATTERN: Record<Locale, string> = {
	es: 'd MMM yyyy',
	en: 'MMM d, yyyy',
}

const DATE_LOCALE: Record<Locale, DateFnsLocale> = { es, en: enUS }

/** Locale-aware date for meta rails and JSON-LD, e.g. "18 ago 2026" / "Aug 18, 2026". */
export function formatPostDate(date: Date, locale: Locale) {
	return format(date, DATE_PATTERN[locale], { locale: DATE_LOCALE[locale] })
}
