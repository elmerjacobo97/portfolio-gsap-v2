import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";

import { hasLocale, locales, localeTag } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { site } from "@/data/site";
import { formatPostDate, getPost, getPostSlugs, postExists } from "@/lib/blog";
import { buildAlternates } from "@/lib/seo";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { mdxComponents } from "@/components/blog/mdx-components";

type Params = Promise<{ locale: string; slug: string }>;

export async function generateStaticParams() {
	const byLocale = await Promise.all(
		locales.map(async (locale) => ({
			locale,
			slugs: await getPostSlugs(locale),
		})),
	);
	return byLocale.flatMap(({ locale, slugs }) =>
		slugs.map((slug) => ({ locale, slug })),
	);
}

export async function generateMetadata({
	params,
}: {
	params: Params;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	if (!hasLocale(locale)) return {};

	const post = await getPost(locale, slug);
	if (!post) return {};

	// hreflang only for locales where the post actually exists — the slug is
	// shared across locales, but a post may ship in one language first.
	const present = await Promise.all(locales.map((l) => postExists(l, slug)));
	const alternates = present.every(Boolean)
		? buildAlternates(locale, `/blog/${slug}`)
		: { canonical: `/${locale}/blog/${slug}` };

	const ogImage = post.cover
		? [{ url: post.cover, alt: post.coverAlt ?? post.title }]
		: [
				{
					url: `/${locale}/blog/opengraph-image`,
					width: 1200,
					height: 630,
					alt: post.title,
				},
			];

	return {
		title: post.title,
		description: post.description,
		alternates,
		openGraph: {
			type: "article",
			url: `/${locale}/blog/${slug}`,
			locale: localeTag[locale].replace("-", "_"),
			title: post.title,
			description: post.description,
			publishedTime: post.date.toISOString(),
			authors: [site.name],
			images: ogImage,
		},
		twitter: {
			card: "summary_large_image",
			images: ogImage,
		},
	};
}

function serializeJsonLd(value: unknown) {
	return JSON.stringify(value)
		.replace(/</g, "\\u003c")
		.replace(/>/g, "\\u003e")
		.replace(/&/g, "\\u0026");
}

export default async function BlogArticle({ params }: { params: Params }) {
	const { locale: raw, slug } = await params;
	if (!hasLocale(raw)) notFound();
	const locale = raw;

	const post = await getPost(locale, slug);
	if (!post) notFound();

	const dict = await getDictionary(locale);
	const isoDate = post.date.toISOString();
	const tags = post.tags.filter(
		(tag) => tag.toLowerCase() !== post.category?.toLowerCase(),
	);

	const jsonLd = serializeJsonLd({
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		inLanguage: localeTag[locale],
		datePublished: isoDate,
		dateModified: isoDate,
		author: { "@type": "Person", name: site.name, url: site.url },
		mainEntityOfPage: `${site.url}/${locale}/blog/${slug}`,
	});

	return (
		<main id="main" className="pt-32 pb-[var(--spacing-section)] md:pt-44">
			<article className="grid-page">
				<div className="col-span-12 lg:col-span-8 lg:col-start-3">
					<TransitionLink
						href={`/${locale}/blog`}
						className="u-label text-text-dim hover:text-accent inline-flex items-center gap-2 transition-colors duration-200"
					>
						<ArrowLeft
							aria-hidden
							size={14}
							strokeWidth={1.5}
							strokeLinecap="square"
							strokeLinejoin="miter"
						/>
						{dict.blog.backToBlog}
					</TransitionLink>

					<header className="mt-10">
						<div className="u-meta text-text-dim flex flex-wrap gap-x-3 gap-y-1">
							<time dateTime={isoDate} className="text-accent">
								{formatPostDate(post.date, locale)}
							</time>
							{post.category ? (
								<span className="inline-flex gap-x-3">
									<span aria-hidden className="text-outline">
										/
									</span>
									<span>{post.category}</span>
								</span>
							) : null}
							{tags.map((tag) => (
								<span key={tag} className="inline-flex gap-x-3">
									<span aria-hidden className="text-outline">
										/
									</span>
									<span>{tag}</span>
								</span>
							))}
							<span className="inline-flex gap-x-3">
								<span aria-hidden className="text-outline">
									/
								</span>
								<span>
									{post.readingMinutes} {dict.blog.readingUnit}
								</span>
							</span>
						</div>

						<h1 className="text-h1 u-wide mt-6">{post.title}</h1>
						<p className="text-lead text-text-secondary mt-6 max-w-[58ch]">
							{post.description}
						</p>
					</header>

					{post.cover ? (
						<img
							src={post.cover}
							alt={post.coverAlt ?? ""}
							className="border-rule mt-10 w-full border"
						/>
					) : null}

					<div className="post-body mt-12">
						<MDXRemote
							source={post.content}
							components={mdxComponents}
							options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
						/>
					</div>

					<aside className="border-rule mt-16 border-t pt-8">
						<h2 className="text-h2 u-wide">{dict.blog.ctaTitle}</h2>
						<p className="text-body text-text-secondary mt-4 max-w-[58ch]">
							{dict.blog.ctaBody}
						</p>
						<ArrowLink
							href={`mailto:${site.email}?subject=${encodeURIComponent(
								dict.blog.ctaSubject,
							)}&body=${encodeURIComponent(dict.blog.ctaPrefill)}`}
							external
							tone="action"
							analyticsEvent="contact_cta_click"
							analyticsSource="blog-article"
							className="u-meta mt-8"
						>
							{dict.blog.cta}
						</ArrowLink>
					</aside>
				</div>
			</article>

			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: jsonLd }}
			/>
		</main>
	);
}
