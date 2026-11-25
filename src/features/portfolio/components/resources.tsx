"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Eye, FileText, X } from "lucide-react";

import { resources, type Resource } from "../data/resources";
import type { Dictionary } from "@/shared/i18n/dictionary";
import type { Locale } from "@/shared/i18n/config";
import { t } from "@/shared/i18n/t";
import { trackEvent } from "@/shared/lib/analytics";
import { gsap, ScrollSmoother, useGSAP } from "@/shared/lib/gsap";
import { DUR, EASE, OK } from "@/shared/lib/motion";
import { ArrowLink } from "@/shared/components/ui/arrow-link";
import { SectionHeader } from "@/shared/components/ui/section-header";

const ICON_PROPS = {
	"aria-hidden": true,
	size: 16,
	strokeWidth: 1.5,
	strokeLinecap: "square",
	strokeLinejoin: "miter",
} as const;

export function Resources({
	dict,
	locale,
}: {
	dict: Dictionary["resources"];
	locale: Locale;
}) {
	const rootRef = useRef<HTMLElement>(null);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [active, setActive] = useState<Resource | null>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(OK, () => {
				gsap.from(".resource-item", {
					opacity: 0,
					y: 20,
					stagger: 0.08,
					duration: DUR.base,
					ease: EASE.settle,
					immediateRender: false,
					scrollTrigger: {
						trigger: ".resource-list",
						start: "top 85%",
						once: true,
					},
				});
			});

			return () => mm.revert();
		},
		{ scope: rootRef },
	);

	// ScrollSmoother owns the page scroll, so a modal has to pause it explicitly.
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (active && !dialog.open) dialog.showModal();
		if (!active && dialog.open) dialog.close();
		ScrollSmoother.get()?.paused(Boolean(active));

		return () => {
			ScrollSmoother.get()?.paused(false);
		};
	}, [active]);

	const openPreview = (resource: Resource) => {
		trackEvent("resource_view", { source: resource.slug });
		setActive(resource);
	};

	const actionClasses =
		"u-meta inline-flex min-h-11 items-center justify-center gap-2 px-4 py-3 whitespace-nowrap transition-[background-color,color,border-color] duration-200";

	return (
		<section
			id="resources"
			ref={rootRef}
			aria-label={dict.title}
			className="border-rule border-t py-[var(--spacing-section)]"
		>
			<div className="grid-page">
				<SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
			</div>

			<div className="grid-page mt-16 md:mt-20">
				<div className="resource-list border-rule col-span-12 border-t lg:col-span-10 lg:col-start-2">
					{resources.map((resource, index) => (
						<article
							key={resource.slug}
							className="resource-item border-rule grid grid-cols-12 gap-x-[var(--spacing-gutter)] gap-y-6 border-b py-8 md:py-10"
						>
							<div className="col-span-12 md:col-span-3">
								<p className="u-meta text-accent">
									{String(index + 1).padStart(2, "0")}
								</p>
								<p className="u-label text-text-dim mt-2 flex items-center gap-2">
									<FileText {...ICON_PROPS} size={14} />
									{dict.formatLabel} · {resource.sizeKb} KB · {resource.pages}{" "}
									{dict.pagesUnit}
								</p>
							</div>

							<div className="col-span-12 md:col-span-9">
								<p className="u-label text-accent">{resource.category}</p>
								<h3 className="text-h2 u-wide mt-3">
									{t(resource.title, locale)}
								</h3>
								<p className="text-body text-text-secondary mt-4 max-w-[58ch]">
									{t(resource.description, locale)}
								</p>
								<ul className="u-label text-text-dim mt-5 flex flex-wrap gap-x-4 gap-y-1">
									{resource.tags.map((tag) => (
										<li key={tag}>#{tag}</li>
									))}
								</ul>

								<div className="mt-8 flex flex-wrap gap-3">
									{/* iOS Safari cannot scroll an embedded PDF, so the preview is desktop-only. */}
									<button
										type="button"
										onClick={() => openPreview(resource)}
										className={`${actionClasses} border-rule-strong text-text hover:border-accent hover:text-accent hidden border md:inline-flex`}
									>
										<Eye {...ICON_PROPS} />
										{dict.previewLabel}
									</button>
									<ArrowLink
										href={resource.file}
										external
										analyticsEvent="resource_view"
										analyticsSource={resource.slug}
										className={`${actionClasses} border-rule-strong text-text hover:border-accent hover:text-accent border`}
									>
										{dict.openLabel}
									</ArrowLink>
									<a
										href={resource.file}
										download
										data-analytics-event="resource_download"
										data-analytics-source={resource.slug}
										className={`${actionClasses} bg-accent-fill !text-on-accent hover:bg-accent-fill/90`}
									>
										<Download {...ICON_PROPS} />
										{dict.downloadLabel}
									</a>
								</div>
							</div>
						</article>
					))}
				</div>
			</div>

			<dialog
				ref={dialogRef}
				aria-label={active ? t(active.title, locale) : dict.previewLabel}
				onClose={() => setActive(null)}
				className="bg-surface border-rule-strong text-text backdrop:bg-scrim/80 fixed inset-0 z-[60] m-auto h-[90dvh] w-[min(64rem,92vw)] max-w-none flex-col border p-0 open:flex"
			>
				<div className="border-rule flex items-center justify-between gap-4 border-b px-4 py-3">
					<p className="u-label text-text-dim truncate">
						{active ? t(active.title, locale) : null}
					</p>
					<button
						type="button"
						onClick={() => setActive(null)}
						className="u-label text-text hover:text-accent inline-flex items-center gap-2 py-2 transition-colors duration-200"
					>
						{dict.closeLabel}
						<X {...ICON_PROPS} />
					</button>
				</div>
				{active ? (
					<iframe
						src={`${active.file}#toolbar=1&navpanes=0`}
						title={t(active.title, locale)}
						className="min-h-0 w-full flex-1 border-0"
					/>
				) : null}
			</dialog>
		</section>
	);
}
