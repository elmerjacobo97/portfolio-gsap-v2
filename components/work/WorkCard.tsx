"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, hoverDuration } from "@/lib/motion";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { MediaPlate } from "./MediaPlate";

/** Column placement alternates so the grid never reads as a table of cards. */
const PLACEMENT = [
	"lg:col-span-10 lg:col-start-2",
	"lg:col-span-6 lg:col-start-1",
	"lg:col-span-6 lg:col-start-7",
	"lg:col-span-6 lg:col-start-1",
	"lg:col-span-6 lg:col-start-7",
] as const;

export function WorkCard({
	project,
	locale,
	index,
	viewLabel,
}: {
	project: Project;
	locale: Locale;
	index: number;
	viewLabel: string;
}) {
	const rootRef = useRef<HTMLElement>(null);
	const { contextSafe } = useGSAP({ scope: rootRef });

	// The card element comes from the event, not the ref — reading a ref inside
	// a function created during render is exactly what react-hooks/refs forbids.
	//
	// scale used to be 1.02, which on an 800px-wide plate is a 16px change over
	// 0.6s: technically running, visually nothing. The plate's acid mass doing
	// the work is what makes the card feel live.
	//
	// overwrite MUST stay 'auto', never true. Scrolling a card up under a
	// stationary pointer fires mouseenter mid-reveal, and `true` kills every
	// other tween of the same target — including Work.tsx's clipPath wipe on
	// this exact element, which then freezes half-drawn. 'auto' only clears the
	// properties that actually collide, and scale never collides with clipPath.
	const handleEnter = contextSafe((card: HTMLElement) => {
		gsap.to(card.querySelectorAll(".work-media"), {
			scale: 1.06,
			duration: hoverDuration(DUR.base + 0.2),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".plate-mass"), {
			scaleX: 1,
			duration: hoverDuration(DUR.base),
			ease: EASE.brutal,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".preview-chrome"), {
			y: -8,
			duration: hoverDuration(DUR.base),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		// The mass sweeps right over the meta line; it has to change ink with it.
		gsap.to(card.querySelectorAll(".plate-meta"), {
			color: "var(--color-ink-950)",
			duration: hoverDuration(DUR.fast),
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".work-arrow"), {
			x: 8,
			y: -8,
			duration: hoverDuration(DUR.fast),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".work-rule"), {
			scaleX: 1,
			duration: hoverDuration(DUR.base),
			ease: EASE.brutal,
			overwrite: "auto",
		});
	});

	const handleLeave = contextSafe((card: HTMLElement) => {
		gsap.to(card.querySelectorAll(".work-media"), {
			scale: 1,
			duration: hoverDuration(DUR.base),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".plate-mass"), {
			scaleX: 0.26,
			duration: hoverDuration(DUR.fast + 0.05),
			ease: EASE.retreat,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".preview-chrome"), {
			y: 0,
			duration: hoverDuration(DUR.fast + 0.1),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".plate-meta"), {
			color: "",
			duration: hoverDuration(DUR.fast),
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".work-arrow"), {
			x: 0,
			y: 0,
			duration: hoverDuration(DUR.fast),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		gsap.to(card.querySelectorAll(".work-rule"), {
			scaleX: 0,
			duration: hoverDuration(DUR.fast),
			ease: EASE.retreat,
			overwrite: "auto",
		});
	});

	return (
		<article
			ref={rootRef}
			onMouseEnter={(e) => handleEnter(e.currentTarget)}
			onMouseLeave={(e) => handleLeave(e.currentTarget)}
			className={cn(
				"work-card col-span-12",
				PLACEMENT[index % PLACEMENT.length],
			)}
		>
			<TransitionLink
				href={`/${locale}/work/${project.slug}`}
				// Keyboard users reach the card through this link, never through the
				// <article>, so the pointer handlers on the wrapper alone left tabbing
				// with no feedback beyond the focus ring.
				onFocus={(e) => handleEnter(e.currentTarget.closest("article")!)}
				onBlur={(e) => handleLeave(e.currentTarget.closest("article")!)}
				className="group block"
			>
				<div className="u-meta text-text-dim work-meta flex flex-wrap gap-x-4 gap-y-1">
					<span>{t(project.client, locale)}</span>
					<span aria-hidden className="text-ink-600">
						/
					</span>
					<span>{project.year}</span>
					<span aria-hidden className="text-ink-600">
						/
					</span>
					<span>{t(project.role, locale)}</span>
					<span aria-hidden className="text-ink-600">
						/
					</span>
					<span>{project.stack.slice(0, 3).join(" · ")}</span>
				</div>

				<MediaPlate
					project={project}
					locale={locale}
					wide={index === 0}
					className="work-media mt-5"
				/>

				{/* items-end, not items-baseline: on a two-line title the label used
            to sit against the first line, floating in the middle of the card
            with nothing under it. It belongs to the last line. */}
				<div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
					<h3
						className={cn(
							"u-wide work-title group-hover:text-accent min-w-0 transition-colors duration-300",
							index === 0 ? "text-h1" : "text-h2",
						)}
					>
						{t(project.title, locale)}
					</h3>
					<span className="work-close u-label text-accent flex shrink-0 items-baseline gap-2 sm:self-auto">
						{viewLabel}
						<ArrowUpRight
							aria-hidden
							size={16}
							strokeWidth={1.5}
							strokeLinecap="square"
							strokeLinejoin="miter"
							className="work-arrow inline-block"
						/>
					</span>
				</div>

				{/* Draws under the whole card on hover — the gesture that says "this
            entire block is one link", which three separate hover tweens on
            three separate children never quite did. */}
				<span
					aria-hidden
					className="work-rule bg-accent mt-4 block h-px w-full origin-left"
					style={{ transform: "scaleX(0)" }}
				/>

				<p className="work-close text-body text-chalk-200 mt-4 max-w-[46ch]">
					{t(project.tagline, locale)}
				</p>
			</TransitionLink>
		</article>
	);
}
