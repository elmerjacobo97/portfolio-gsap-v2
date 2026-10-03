import type { BlogPostMeta } from "../services/posts";
import { formatPostDate } from "../services/posts";
import type { Locale } from "@/shared/i18n/config";
import { cn } from "@/shared/lib/cn";
import { TransitionLink } from "@/shared/components/motion/transition-link";
import { ArrowLink } from "@/shared/components/ui/arrow-link";

/** Editorial post link. Motion belongs to the list entrance, not hover. */
const WIDE = "lg:col-span-10 lg:col-start-2";
const LEFT = "lg:col-span-6 lg:col-start-1";
const RIGHT = "lg:col-span-6 lg:col-start-7";

function placement(index: number) {
	if (index === 0) return WIDE;
	return index % 2 === 1 ? LEFT : RIGHT;
}

export function PostCard({
	post,
	locale,
	index,
	readLabel,
	readingUnit,
}: {
	post: BlogPostMeta;
	locale: Locale;
	index: number;
	readLabel: string;
	readingUnit: string;
}) {
	const href = `/${locale}/blog/${post.slug}`;
	const tags = post.tags
		.filter((tag) => tag.toLowerCase() !== post.category?.toLowerCase())
		.slice(0, 3);

	return (
		<article
			className={cn("post-card group col-span-12", placement(index))}
			data-post-search={[post.title, post.description, post.category, post.slug, ...post.tags]
				.filter(Boolean)
				.join(" ")}
		>
			<div className="flex items-baseline justify-between gap-6 border-rule border-y py-3">
				<div className="u-meta text-text-dim flex min-w-0 flex-wrap gap-x-3 gap-y-1">
					<span className="text-accent">
						{String(index + 1).padStart(2, "0")}
					</span>
					<span>{formatPostDate(post.date, locale)}</span>
				</div>
				<span className="u-label text-text-dim hidden shrink-0 sm:block">
					{post.category ? `${post.category} · ` : ""}
					{post.readingMinutes} {readingUnit}
				</span>
			</div>

			<div className="mt-5">
				<h3 className="text-h2 u-wide line-clamp-3">
					<TransitionLink
						href={href}
						className="transition-colors duration-300 group-hover:text-accent"
					>
						{post.title}
					</TransitionLink>
				</h3>
				<p className="text-body text-text-secondary mt-3 line-clamp-3 max-w-[58ch]">
					{post.description}
				</p>
			</div>

			<div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-rule border-t pt-3">
				<ArrowLink
					href={href}
					analyticsEvent="post_view"
					analyticsSource={post.slug}
					className="u-meta"
				>
					{readLabel}
				</ArrowLink>
				{tags.length > 0 && (
					<ul className="u-label text-text-dim flex flex-wrap gap-x-3 gap-y-1">
						{tags.map((tag) => (
							<li key={tag}>{tag}</li>
						))}
					</ul>
				)}
			</div>
		</article>
	);
}
