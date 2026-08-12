"use client";

import Image from "next/image";
import { useRef } from "react";

import type { Dictionary } from "@/i18n/dictionary";
import { Counter } from "@/components/motion/Counter";
import { gsap, useGSAP } from "@/lib/gsap";
import { DUR, EASE, OK } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

export function About({ dict }: { dict: Dictionary["about"] }) {
	const rootRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			mm.add(OK, () => {
				const entrance = gsap.timeline({
					scrollTrigger: {
						trigger: rootRef.current,
						start: "top 72%",
						once: true,
					},
				});

				entrance
					.from(".about-portrait", {
						clipPath: "inset(0% 0% 100% 0%)",
						duration: DUR.slow,
						ease: EASE.brutal,
						immediateRender: false,
					})
					.from(
						".about-bio p",
						{
							opacity: 0,
							y: 24,
							stagger: 0.12,
							duration: DUR.base,
							ease: EASE.settle,
							immediateRender: false,
						},
						"-=0.55",
					);

				// Cross-fade only ever touches opacity — never `filter: grayscale()`,
				// which forces a full repaint of the layer on every frame on mobile.
				gsap.to(".about-portrait-color", {
					opacity: 1,
					ease: "none",
					scrollTrigger: {
						trigger: rootRef.current,
						start: "top 60%",
						end: "bottom center",
						scrub: true,
					},
				});
			});

			return () => mm.revert();
		},
		{ scope: rootRef },
	);

	return (
		<section
			id="about"
			ref={rootRef}
			className="border-rule border-t py-[var(--spacing-section)]"
		>
			<div className="grid-page">
				<SectionHeader index={dict.index} title={dict.title} />

				<div className="about-portrait bg-surface border-rule @container relative col-span-12 mt-16 aspect-4/5 overflow-hidden border sm:col-span-8 sm:col-start-3 lg:col-span-5 lg:col-start-1">
					<Image
						src="/images/profile/elmer-jacobo-portrait.png"
						alt={dict.portraitAlt}
						fill
						sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw"
						className="object-cover grayscale"
					/>
					<Image
						src="/images/profile/elmer-jacobo-portrait.png"
						alt=""
						fill
						sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 42vw"
						className="about-portrait-color object-cover opacity-0"
					/>
				</div>

				<div className="col-span-12 mt-12 lg:col-span-6 lg:col-start-7 lg:mt-16">
					<div className="about-bio space-y-6">
						{dict.bio.map((para) => (
							<p key={para} className="text-lead text-text-secondary">
								{para}
							</p>
						))}
					</div>

					{/* gap-x-10 and min-w-0: at three equal columns inside a six-column
              band, "100%" at text-h1 all but touched the next cell and pushed
              its own label into the page gutter. */}
					<dl className="border-rule mt-14 grid border-t sm:grid-cols-3 sm:gap-x-10 sm:gap-y-8 sm:pt-10">
						{dict.stats.map((stat) => (
							<div
								key={stat.label}
								className="border-rule grid min-w-0 grid-cols-[6rem_1fr] items-baseline border-b py-5 sm:block sm:border-b-0 sm:py-0"
							>
								<dt className="u-label col-start-2 row-start-1 sm:mt-3 sm:block">
									{stat.label}
								</dt>
								<dd className="col-start-1 row-start-1">
									<Counter
										value={stat.value}
										className="text-h2 u-wide text-accent block"
									/>
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</section>
	);
}
