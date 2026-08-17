"use client";

import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { cn } from "@/lib/cn";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { MediaPlate } from "./MediaPlate";

/** Editorial project link. Motion belongs to the section entrance, not hover. */
const PLACEMENT = [
	"lg:col-span-10 lg:col-start-2",
	"lg:col-span-6 lg:col-start-1",
	"lg:col-span-6 lg:col-start-7",
	"lg:col-span-6 lg:col-start-1",
	"lg:col-span-6 lg:col-start-7",
] as const;

export function ProjectCard({
	project,
	locale,
	index,
	openLabel,
}: {
	project: Project;
	locale: Locale;
	index: number;
	openLabel: string;
}) {
	const href = project.liveUrl ?? project.repoUrl;
	const title = t(project.title, locale);
	const linkLabel = `${openLabel}: ${title}`;

	return (
		<article
			className={cn(
				"project-card group col-span-12",
				PLACEMENT[index % PLACEMENT.length],
			)}
		>
			<div className="flex items-baseline justify-between gap-6 border-rule border-y py-3">
				<div className="u-meta text-text-dim flex min-w-0 flex-wrap gap-x-3 gap-y-1">
					<span className="text-accent">
						{String(index + 1).padStart(2, "0")}
					</span>
					<span>{t(project.client, locale)}</span>
					<span aria-hidden className="text-outline">
						/
					</span>
					<span>{project.year}</span>
				</div>
				<span className="u-label text-text-dim hidden shrink-0 sm:block">
					{t(project.role, locale)}
				</span>
			</div>

			<MediaPlate
				project={project}
				locale={locale}
				wide={index === 0}
				className="project-card-media mt-5 border-rule-strong transition-[border-color] duration-300 group-hover:border-accent"
			/>

			<div className="mt-5 grid grid-cols-12 items-end gap-x-[var(--spacing-gutter)] gap-y-4">
				<div className="col-span-12 lg:col-span-8">
					<h3 className="text-h1 u-wide transition-colors duration-300 group-hover:text-accent">
						{title}
					</h3>
					<p className="text-body text-text-secondary mt-3 max-w-[48ch]">
						{t(project.tagline, locale)}
					</p>
					<p className="text-body text-text-secondary mt-3 max-w-[58ch]">
						{t(project.summary, locale)}
					</p>
				</div>

				{href ? (
					<ArrowLink
						href={href}
						external
						tone="action"
						className="u-meta col-span-12 lg:col-span-4 lg:justify-self-end"
					>
						{linkLabel}
					</ArrowLink>
				) : null}
			</div>

			<div className="mt-5 border-rule border-t pt-3">
				<p className="u-label text-text-dim truncate">
					{project.stack.slice(0, 4).join(" · ")}
				</p>
			</div>
		</article>
	);
}
