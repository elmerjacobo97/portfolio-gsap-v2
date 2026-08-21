"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, OK } from "@/lib/motion";

/**
 * List entrance only: staggered fade-up once the grid scrolls into view.
 * Same bail-out as Projects — content already on screen stays server-painted.
 */
export function PostList({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(OK, () => {
				const container = containerRef.current;
				if (
					!container ||
					container.getBoundingClientRect().top <= window.innerHeight
				)
					return;

				const cards = Array.from(
					container.querySelectorAll<HTMLElement>(".post-card"),
				);

				gsap.fromTo(
					cards,
					{ opacity: 0, y: 24 },
					{
						opacity: 1,
						y: 0,
						duration: DUR.slow,
						ease: EASE.brutal,
						stagger: 0.12,
						scrollTrigger: {
							trigger: container,
							start: "top 82%",
							once: true,
						},
					},
				);
			});

			return () => mm.revert();
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="grid-page mt-16 gap-y-16 md:mt-20 md:gap-y-24 lg:gap-y-[12vh]"
		>
			{children}
		</div>
	);
}
