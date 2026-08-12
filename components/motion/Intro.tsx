"use client";

import { useRef } from "react";

import { gsap, ScrollSmoother, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { markIntroDone } from "@/lib/intro";

const SEEN_KEY = "intro-seen";

/**
 * Preloader. Rendered on the server so it covers the page from the first
 * paint — a mount-gated overlay would flash the content underneath first.
 * The effect below removes it instantly when it should be skipped, and the
 * <noscript> rule in the layout hides it entirely without JS.
 */
export function Intro() {
	const rootRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const root = rootRef.current;
			if (!root) return;
			const count = root.querySelector<HTMLElement>(".intro-count");
			const bar = root.querySelector<HTMLElement>(".intro-bar");

			const skip =
				window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
				sessionStorage.getItem(SEEN_KEY) === "1";

			if (skip) {
				gsap.set(root, { autoAlpha: 0, display: "none" });
				markIntroDone();
				return;
			}

			const smoother = ScrollSmoother.get();
			smoother?.paused(true);

			let tl: gsap.core.Timeline | undefined;
			let cancelled = false;

			// SplitText in the hero measures against the real font. Waiting for
			// document.fonts.ready here is what buys that measurement time.
			document.fonts.ready.then(() => {
				if (cancelled) return;

				const counter = { v: 0 };
				tl = gsap.timeline({
					defaults: { ease: "power2.inOut" },
					onComplete: () => {
						sessionStorage.setItem(SEEN_KEY, "1");
						ScrollSmoother.get()?.paused(false);
						ScrollTrigger.refresh();
						gsap.set(root, { display: "none" });
						markIntroDone();
					},
				});

				tl.to(
					counter,
					{
						v: 100,
						duration: 1.5,
						snap: { v: 1 },
						onUpdate: () => {
							if (count)
								count.textContent = String(Math.round(counter.v)).padStart(
									3,
									"0",
								);
						},
					},
					0,
				)
					.fromTo(
						bar,
						{ scaleX: 0 },
						{ scaleX: 1, duration: 1.5, transformOrigin: "left center" },
						0,
					)
					.to(bar, {
						scaleX: 0,
						transformOrigin: "right center",
						duration: 0.35,
						ease: "power3.in",
					})
					.to(count, { yPercent: -110, duration: 0.5, ease: "power4.in" }, "<")
					.to(
						root,
						{ yPercent: -100, duration: 0.9, ease: "expo.inOut" },
						"-=0.1",
					);
			});

			return () => {
				cancelled = true;
				tl?.kill();
				// Never leave the page unscrollable if this unmounts mid-timeline.
				ScrollSmoother.get()?.paused(false);
			};
		},
		{ scope: rootRef },
	);

	return (
		<div
			ref={rootRef}
			aria-hidden
			className="intro bg-canvas fixed inset-0 z-[100] flex flex-col justify-end"
		>
			<div className="page-pad pb-10">
				<span className="intro-count text-display u-wide text-text block">
					000
				</span>
			</div>
			<span
				aria-hidden
				className="intro-bar bg-accent-fill block h-0.5 w-full origin-left"
				style={{ transform: "scaleX(0)" }}
			/>
		</div>
	);
}
