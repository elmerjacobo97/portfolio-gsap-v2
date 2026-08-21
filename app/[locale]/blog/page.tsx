import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, localeTag } from "@/i18n/config";
import { getPosts } from "@/lib/blog";
import { buildAlternates } from "@/lib/seo";
import { PostCard } from "@/components/blog/PostCard";
import { PostList } from "@/components/blog/PostList";
import { SectionHeader } from "@/components/sections/SectionHeader";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!hasLocale(locale)) return {};

	const dict = await getDictionary(locale);

	return {
		title: dict.blog.title,
		description: dict.blog.lead,
		alternates: buildAlternates(locale, "/blog"),
		openGraph: {
			type: "website",
			url: `/${locale}/blog`,
			locale: localeTag[locale].replace("-", "_"),
			title: dict.blog.title,
			description: dict.blog.lead,
			images: [
				{
					url: `/${locale}/blog/opengraph-image`,
					width: 1200,
					height: 630,
					alt: dict.blog.ogAlt,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			images: [
				{ url: `/${locale}/blog/opengraph-image`, alt: dict.blog.ogAlt },
			],
		},
	};
}

export default async function BlogIndex({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(locale)) notFound();

	const dict = await getDictionary(locale);
	const posts = await getPosts(locale);

	return (
		<main id="main" className="pt-32 pb-[var(--spacing-section)] md:pt-44">
			<h1 className="sr-only">{dict.blog.title}</h1>

			<div className="grid-page">
				<SectionHeader
					index={dict.blog.index}
					title={dict.blog.title}
					lead={dict.blog.lead}
				/>
			</div>

			{posts.length === 0 ? (
				<div className="grid-page mt-16 md:mt-20">
					<p className="text-body text-text-secondary col-span-12 lg:col-span-6 lg:col-start-2">
						{dict.blog.empty}
					</p>
				</div>
			) : (
				<PostList>
					{posts.map((post, i) => (
						<PostCard
							key={post.slug}
							post={post}
							locale={locale}
							index={i}
							readLabel={dict.blog.readPost}
							readingUnit={dict.blog.readingUnit}
						/>
					))}
				</PostList>
			)}
		</main>
	);
}
