"use client";

import { useRef } from "react";

import { testimonials } from "@/data/testimonials";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, OK } from "@/lib/motion";

export function Testimonials({
	dict,
	locale,
}: {
	dict: Dictionary["testimonials"];
	locale: Locale;
}) {
	const rootRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(OK, () => {
				gsap.utils.toArray<HTMLElement>(".testimonial-row").forEach((row) => {
					gsap
						.timeline({ scrollTrigger: { trigger: row, start: "top 82%" } })
						.from(row.querySelector(".testimonial-rule"), {
							scaleX: 0,
							transformOrigin: "left center",
							duration: DUR.base,
							ease: EASE.sweep,
							immediateRender: false,
						})
						.from(
							row.querySelector(".testimonial-quote"),
							{
								opacity: 0,
								y: 48,
								duration: DUR.slow,
								ease: EASE.brutal,
								immediateRender: false,
							},
							"-=0.35",
						)
						.from(
							row.querySelector(".testimonial-attribution"),
							{
								opacity: 0,
								y: 16,
								duration: DUR.base,
								ease: EASE.settle,
								immediateRender: false,
							},
							"-=0.65",
						);
				});
			});

			return () => mm.revert();
		},
		{ scope: rootRef },
	);

	if (testimonials.length === 0) return null;

	return (
		<section
			id="testimonials"
			ref={rootRef}
			aria-labelledby="testimonials-title"
			className="border-rule border-t"
		>
			<header className="grid-page py-[var(--spacing-section)]">
				<div className="col-span-12 lg:col-span-7">
					<p className="u-label text-accent mb-5">{dict.index}</p>
					<h2 id="testimonials-title" className="text-h1 u-wide max-w-[12ch]">
						{dict.title}
					</h2>
					<p className="text-lead text-text-secondary mt-8 max-w-[44ch]">
						{dict.lead}
					</p>
				</div>
			</header>

			<div className="pb-[var(--spacing-section)]">
				{testimonials.map((testimonial) => (
					<figure
						key={testimonial.code}
						className="testimonial-row grid-page relative py-14 md:py-20"
					>
						<span
							aria-hidden
							className="testimonial-rule bg-rule absolute inset-x-[var(--spacing-gutter)] top-0 h-px origin-left"
						/>

						<span
							aria-hidden
							className="u-wide text-accent absolute top-14 left-[var(--spacing-gutter)] text-[4.5rem] leading-[0.62] opacity-35 md:static md:col-span-2 md:text-[clamp(4.5rem,10vw,10rem)]"
						>
							“
						</span>

						<div className="col-span-12 pl-14 md:col-span-9 md:pl-0 lg:col-span-8 lg:col-start-4">
							<blockquote>
								<p className="testimonial-quote font-display text-[clamp(1.7rem,3.8vw,4.5rem)] leading-[1.03] font-semibold tracking-[-0.035em] text-balance">
									{t(testimonial.quote, locale)}
								</p>
							</blockquote>

							<figcaption className="testimonial-attribution border-rule mt-10 grid gap-4 border-t pt-5 md:grid-cols-[1fr_auto] md:items-end">
								<div>
									<p className="u-meta">{t(testimonial.name, locale)}</p>
									<p className="text-body text-text-secondary mt-2">
										{t(testimonial.role, locale)} ·{" "}
										{t(testimonial.company, locale)}
									</p>
								</div>
								{testimonial.source ? (
									<a
										href={testimonial.source}
										target="_blank"
										rel="noopener noreferrer"
										className="u-label text-accent md:text-right"
									>
										{dict.source}
									</a>
								) : null}
							</figcaption>
						</div>
					</figure>
				))}
			</div>
		</section>
	);
}
