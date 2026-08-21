import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { ArrowLink } from "@/components/ui/ArrowLink";

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
	const tags = post.tags.filter(
		(tag) => tag.toLowerCase() !== post.category?.toLowerCase(),
	);

	return (
		<article
			className={cn("post-card group col-span-12", placement(index))}
		>
			<div className="flex items-baseline justify-between gap-6 border-rule border-y py-3">
				<div className="u-meta text-text-dim flex min-w-0 flex-wrap gap-x-3 gap-y-1">
					<span className="text-accent">
						{String(index + 1).padStart(2, "0")}
					</span>
					<span>{formatPostDate(post.date, locale)}</span>
					{tags.map((tag) => (
						<span key={tag} className="inline-flex gap-x-3">
							<span aria-hidden className="text-outline">
								/
							</span>
							<span>{tag}</span>
						</span>
					))}
				</div>
				<span className="u-label text-text-dim hidden shrink-0 sm:block">
					{post.category ? `${post.category} · ` : ""}
					{post.readingMinutes} {readingUnit}
				</span>
			</div>

			<div className="mt-5">
				<h3 className="text-h2 u-wide">
					<TransitionLink
						href={href}
						className="transition-colors duration-300 group-hover:text-accent"
					>
						{post.title}
					</TransitionLink>
				</h3>
				<p className="text-body text-text-secondary mt-3 max-w-[58ch]">
					{post.description}
				</p>
			</div>

			<div className="mt-5 border-rule border-t pt-3">
				<ArrowLink
					href={href}
					analyticsEvent="post_view"
					analyticsSource={post.slug}
					className="u-meta"
				>
					{readLabel}
				</ArrowLink>
			</div>
		</article>
	);
}
