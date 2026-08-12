"use client";

import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Deliberately NOT gated behind prefers-reduced-motion. The bar has no
 * duration and no easing — it is a 1:1 readout of scroll position, the same
 * category as the native scrollbar. Hiding it from users who asked for less
 * motion would remove orientation feedback, not animation.
 */
export function ScrollProgress() {
	const barRef = useRef<HTMLSpanElement>(null);

	useGSAP(() => {
		const bar = barRef.current;
		if (!bar) return;

		const setProgress = gsap.quickSetter(bar, "scaleX");
		const trigger = ScrollTrigger.create({
			start: 0,
			end: "max",
			onUpdate: (self) => setProgress(self.progress),
		});

		return () => trigger.kill();
	});

	return (
		<div aria-hidden className="bg-rule fixed inset-x-0 top-0 z-[70] h-0.5">
			<span
				ref={barRef}
				className="bg-accent-fill block h-full w-full origin-left"
				style={{ transform: "scaleX(0)" }}
			/>
		</div>
	);
}
