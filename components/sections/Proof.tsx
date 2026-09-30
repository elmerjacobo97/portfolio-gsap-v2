"use client";

import { useRef } from "react";

import type { Dictionary } from "@/i18n/dictionary";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, OK } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

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
						0,
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
			aria-label={dict.title}
		>
			<div className="grid-page py-[var(--spacing-section)]">
				<SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />

				<div className="border-rule bg-surface-inset relative col-span-12 mt-16 overflow-hidden border md:mt-20">
					<span aria-hidden className="plate-bed absolute inset-0 opacity-40" />
					<dl className="relative z-10 p-6 sm:p-10 lg:p-12">
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
			</div>
		</section>
	);
}
