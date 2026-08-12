import Image from "next/image";

import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** Project media plate shared by personal projects and professional experience. */
export function MediaPlate({
	project,
	locale,
	className,
	wide = false,
}: {
	project: Project;
	locale: Locale;
	className?: string;
	wide?: boolean;
}) {
	return (
		<div
			className={cn(
				// @container keeps the media plate tied to its card column, not the viewport.
				"bg-surface border-rule @container relative overflow-hidden border",
				wide ? "aspect-16/10 sm:aspect-[16/8]" : "aspect-16/10",
				className,
			)}
		>
			{project.cover ? (
				<Image
					src={project.cover.src}
					width={project.cover.width}
					height={project.cover.height}
					alt={project.cover.alt[locale]}
					loading={wide ? "eager" : "lazy"}
					sizes="(max-width: 768px) 100vw, 60vw"
					className={cn(
						"project-media size-full",
						project.cover.fit === "contain" ? "object-contain" : "object-cover",
					)}
				/>
			) : null}
		</div>
	);
}
