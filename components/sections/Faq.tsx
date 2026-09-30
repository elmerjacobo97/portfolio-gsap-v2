"use client";

import { useRef } from "react";
import { Plus } from "lucide-react";

import { faq } from "@/data/faq";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, OK } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

export function Faq({
	dict,
	locale,
}: {
	dict: Dictionary["faq"];
	locale: Locale;
}) {
	const rootRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(OK, () => {
				gsap.from(".faq-item", {
					opacity: 0,
					y: 20,
					stagger: 0.07,
					duration: DUR.base,
					ease: EASE.settle,
					immediateRender: false,
					scrollTrigger: {
						trigger: ".faq-list",
						start: "top 80%",
						once: true,
					},
				});
			});

			return () => mm.revert();
		},
		{ scope: rootRef },
	);

	return (
		<section
			id="faq"
			ref={rootRef}
			aria-label={dict.title}
			className="border-rule border-t py-[var(--spacing-section)]"
		>
			<div className="grid-page">
				<SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
			</div>

			<div className="grid-page mt-16 md:mt-20">
				<div className="faq-list border-rule col-span-12 border-t lg:col-span-10 lg:col-start-2">
					{faq.map((item) => (
						<details
							key={item.code}
							className="faq-item border-rule group border-b"
						>
							<summary className="grid cursor-pointer list-none grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[4rem_1fr_auto] [&::-webkit-details-marker]:hidden">
								<span className="u-meta text-accent">{item.code}</span>
								<span className="text-h3 u-wide">
									{t(item.question, locale)}
								</span>
								<Plus
									aria-hidden
									size={16}
									strokeWidth={1.5}
									className="text-text-dim transition-transform duration-300 group-open:rotate-45"
								/>
							</summary>
							<p className="text-body text-text-secondary max-w-[60ch] pb-8 pl-[3rem] md:pl-[4rem]">
								{t(item.answer, locale)}
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
