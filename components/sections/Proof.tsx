"use client";

import { useRef } from "react";

import type { Dictionary } from "@/i18n/dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, OK } from "@/lib/motion";

export function Proof({ dict }: { dict: Dictionary["proof"] }) {
	const rootRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add(OK, () => {
				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: rootRef.current,
						start: "top 72%",
						once: true,
					},
				});

				timeline
					.from(".proof-copy > *", {
						opacity: 0,
						y: 20,
						stagger: 0.08,
						duration: DUR.base,
						ease: EASE.settle,
						immediateRender: false,
					})
					.from(
						".proof-row",
						{
							opacity: 0,
							x: 24,
							stagger: 0.1,
							duration: DUR.base,
							ease: EASE.brutal,
							immediateRender: false,
						},
						"-=0.25",
					);
			});

			return () => mm.revert();
		},
		{ scope: rootRef },
	);

	return (
		<section
			ref={rootRef}
			className="border-rule border-t"
			aria-labelledby="proof-title"
		>
			<div className="grid-page py-[var(--spacing-section)]">
				<div className="proof-copy col-span-12 lg:col-span-4">
					<p className="u-label text-accent mb-5">{dict.index}</p>
					<h2 id="proof-title" className="text-h1 u-wide max-w-[9ch]">
						{dict.title}
					</h2>
					<p className="text-body text-text-secondary mt-6 max-w-[34ch]">
						{dict.lead}
					</p>
				</div>

				<dl className="border-rule col-span-12 mt-16 border-t lg:col-span-7 lg:col-start-6 lg:mt-0">
					{dict.facts.map((fact, index) => (
						<div
							key={fact.label}
							className="proof-row border-rule grid grid-cols-[3rem_1fr] gap-5 border-b py-7 md:grid-cols-[4rem_1fr_1.3fr] md:items-baseline"
						>
							<span aria-hidden className="u-meta text-accent">
								{String(index + 1).padStart(2, "0")}
							</span>
							<dt className="text-h3 u-wide">{fact.label}</dt>
							<dd className="text-body text-text-secondary col-start-2 mt-3 max-w-[46ch] md:col-start-auto md:mt-0">
								{fact.detail}
							</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}
