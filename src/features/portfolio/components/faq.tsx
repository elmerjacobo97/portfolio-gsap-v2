"use client";

import { useId, useRef, useState } from "react";
import { Plus } from "lucide-react";

import { faq } from "../data/faq";
import type { Dictionary } from "@/shared/i18n/dictionary";
import type { Locale } from "@/shared/i18n/config";
import { t } from "@/shared/i18n/t";
import { gsap, useGSAP } from "@/shared/lib/gsap";
import { DUR, EASE, OK } from "@/shared/lib/motion";
import { SectionHeader } from "@/shared/components/ui/section-header";

export function Faq({
	dict,
	locale,
}: {
	dict: Dictionary["faq"];
	locale: Locale;
}) {
	const rootRef = useRef<HTMLElement>(null);
	const baseId = useId();
	const [open, setOpen] = useState<string | null>(faq[0]?.code ?? null);

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
					{faq.map((item) => {
						const isOpen = open === item.code;
						const btnId = `${baseId}-${item.code}-btn`;
						const panelId = `${baseId}-${item.code}-panel`;
						return (
							<div
								key={item.code}
								data-open={isOpen}
								className="faq-item border-rule group relative border-b"
							>
								<span
									aria-hidden
									className="bg-accent absolute top-0 bottom-[-1px] left-0 w-0.5 origin-top scale-y-0 transition-transform duration-500 ease-[var(--ease-brutal)] group-data-[open=true]:scale-y-100 motion-reduce:transition-none"
								/>
								<h3>
									<button
										type="button"
										id={btnId}
										aria-expanded={isOpen}
										aria-controls={panelId}
										onClick={() => setOpen(isOpen ? null : item.code)}
										className="focus-visible:outline-accent grid w-full cursor-pointer grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 text-left outline-offset-[-2px] focus-visible:outline-2 md:grid-cols-[4rem_1fr_auto] md:py-7"
									>
										<span
											className={`u-meta pl-4 transition-colors duration-300 ${isOpen ? "text-accent" : "text-text-dim group-hover:text-text-secondary"}`}
										>
											{item.code}
										</span>
										<span
											className={`text-h3 u-wide transition-colors duration-300 ${isOpen ? "text-text" : "text-text-secondary group-hover:text-text"}`}
										>
											{t(item.question, locale)}
										</span>
										<span
											aria-hidden
											className={`border-rule grid size-10 place-items-center border transition-colors duration-300 ${isOpen ? "border-accent bg-accent text-on-accent" : "text-text-dim group-hover:border-rule-strong"}`}
										>
											<Plus
												size={16}
												strokeWidth={1.5}
												className={`transition-transform duration-300 motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`}
											/>
										</span>
									</button>
								</h3>
								<div
									id={panelId}
									role="region"
									aria-labelledby={btnId}
									className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-brutal)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
								>
									<div className="overflow-hidden" inert={!isOpen}>
										<p
											className={`text-body text-text-secondary max-w-[60ch] pt-1 pb-8 pl-[4rem] transition-[opacity,transform] duration-500 ease-[var(--ease-brutal)] motion-reduce:transition-none md:pl-[5rem] ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"}`}
										>
											{t(item.answer, locale)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
