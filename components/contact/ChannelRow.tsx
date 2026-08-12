"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, hoverDuration } from "@/lib/motion";

/**
 * Label above value, not beside it — a long value (the email) would otherwise
 * push the arrow past the column edge at the widest breakpoints.
 *
 * `onActivate` turns the row into a button-like control that still carries a
 * real href, so it works without JS and on middle-click.
 */
export function ChannelRow({
	label,
	value,
	href,
	icon: Icon,
	external,
	onActivateAction,
}: {
	label: string;
	value: string;
	href: string;
	icon?: LucideIcon;
	external?: boolean;
	onActivateAction?: () => void;
}) {
	const rootRef = useRef<HTMLAnchorElement>(null);
	const { contextSafe } = useGSAP({ scope: rootRef });

	const handleEnter = contextSafe((row: HTMLElement) => {
		gsap.to(row.querySelectorAll(".channel-fill"), {
			scaleX: 1,
			transformOrigin: "left center",
			duration: hoverDuration(DUR.base - 0.1),
			ease: EASE.sweep,
			overwrite: "auto",
		});
		gsap.to(row.querySelectorAll(".channel-arrow"), {
			x: 8,
			y: -8,
			duration: hoverDuration(DUR.fast),
			ease: EASE.sweep,
			overwrite: "auto",
		});
	});

	const handleLeave = contextSafe((row: HTMLElement) => {
		gsap.to(row.querySelectorAll(".channel-fill"), {
			scaleX: 0,
			transformOrigin: "right center",
			duration: hoverDuration(DUR.fast),
			ease: EASE.retreat,
			overwrite: "auto",
		});
		gsap.to(row.querySelectorAll(".channel-arrow"), {
			x: 0,
			y: 0,
			duration: hoverDuration(DUR.fast),
			ease: EASE.sweep,
			overwrite: "auto",
		});
	});

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!onActivateAction) return;
		if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
			return;
		e.preventDefault();
		onActivateAction();
	};

	return (
		<a
			ref={rootRef}
			href={href}
			onClick={handleClick}
			onMouseEnter={(e) => handleEnter(e.currentTarget)}
			onMouseLeave={(e) => handleLeave(e.currentTarget)}
			onFocus={(e) => handleEnter(e.currentTarget)}
			onBlur={(e) => handleLeave(e.currentTarget)}
			{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
			className="channel-row border-rule group relative block overflow-hidden border-t py-6"
		>
			{/* Hidden via transform (not Tailwind's scale-*, which writes the
          independent CSS `scale` property and would fight GSAP). */}
			<span
				aria-hidden
				className="channel-fill bg-accent-fill absolute inset-0"
				style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
			/>
			<span className="relative block px-1">
				<span className="u-label flex items-center gap-2 transition-colors duration-300 group-hover:!text-on-accent/60 group-focus-visible:!text-on-accent/60">
					{Icon ? (
						<Icon
							aria-hidden
							size={14}
							strokeWidth={1.5}
							strokeLinecap="square"
							strokeLinejoin="miter"
							className="shrink-0"
						/>
					) : null}
					{label}
				</span>
				<span className="text-h3 u-wide group-hover:text-on-accent group-focus-visible:text-on-accent mt-2 flex items-baseline justify-between gap-3 break-all transition-colors duration-300">
					{value}
					<ArrowUpRight
						aria-hidden
						size={16}
						strokeWidth={1.5}
						strokeLinecap="square"
						strokeLinejoin="miter"
						className="channel-arrow shrink-0"
					/>
				</span>
			</span>
		</a>
	);
}
