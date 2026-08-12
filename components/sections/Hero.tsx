"use client";

import { useRef, type RefObject } from "react";
import { ArrowDown } from "lucide-react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Pill } from "@/components/ui/Pill";
import { Rule } from "@/components/ui/Rule";
import type { Dictionary } from "@/i18n/dictionary";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { introDone } from "@/lib/intro";
import { DUR, EASE, OK } from "@/lib/motion";

export function Hero({ dict }: { dict: Dictionary["hero"] }) {
	const rootRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const mm = gsap.matchMedia();

			// Reduced-motion visitors get nothing in this branch at all — the
			// server-rendered lines stay exactly as painted, fully visible.
			mm.add(OK, () => {
				const root = rootRef.current;
				if (!root) return;

				const entrance = gsap.timeline({ paused: true });

				entrance
					.from(
						".hero-rule",
						{
							scaleX: 0,
							transformOrigin: "left center",
							duration: 1.2,
							ease: "expo.out",
						},
						0.15,
					)
					.from(
						".hero-meta > *, .hero-copy > *",
						{
							autoAlpha: 0,
							y: 14,
							stagger: 0.06,
							duration: 0.6,
							ease: "power2.out",
						},
						0.5,
					)
					.from(
						".hero-artifact",
						{
							clipPath: "inset(100% 0% 0% 0%)",
							duration: 0.9,
							ease: "expo.out",
						},
						0.58,
					)
					.from(
						".hero-artifact-step",
						{
							xPercent: -18,
							autoAlpha: 0,
							stagger: 0.07,
							duration: 0.5,
							ease: "power3.out",
						},
						0.72,
					);

				// The split is created only once the preloader is gone. Creating it
				// earlier would run the onSplit tween behind the intro overlay, and
				// the headline would already be settled by the time it lifts.
				let split: SplitText | undefined;
				let ambient: gsap.core.Timeline | undefined;
				let cancelled = false;
				let hasRevealed = false;
				let heroVisible = true;

				const visibilityTrigger = ScrollTrigger.create({
					trigger: root,
					start: "top bottom",
					end: "bottom top",
					onToggle: (self) => {
						heroVisible = self.isActive;
						if (self.isActive) ambient?.play();
						else ambient?.pause();
					},
				});
				heroVisible = visibilityTrigger.isActive;

				const restingY = (index: number) => {
					const offset = window.innerWidth < 768 ? 3 : 7;
					return index % 2 === 0 ? -offset : offset;
				};

				const startAmbientMotion = (characters: Element[]) => {
					ambient?.kill();
					gsap.set(characters, {
						y: restingY,
						yPercent: 0,
						scaleY: 1,
					});

					ambient = gsap
						.timeline({
							paused: !heroVisible,
							repeat: -1,
							repeatDelay: 1.6,
							delay: 0.8,
						})
						.to(characters, {
							y: (index) => {
								const offset = window.innerWidth < 768 ? 5 : 11;
								return index % 2 === 0 ? -offset : offset;
							},
							scaleY: 1.012,
							duration: 0.42,
							stagger: { each: 0.055, from: "start" },
							ease: "sine.inOut",
						})
						.to(
							characters,
							{
								y: restingY,
								scaleY: 1,
								duration: DUR.base,
								stagger: { each: 0.045, from: "start" },
								ease: EASE.brutal,
							},
							">-0.12",
						);
				};

				introDone.then(() => {
					if (cancelled) return;

					// autoSplit re-splits (and re-runs onSplit) when Archivo finishes
					// loading or the line width changes — the documented fix for
					// SplitText measuring against a fallback font.
					split = SplitText.create(
						rootRef.current?.querySelectorAll(".hero-line") ?? [],
						{
							type: "chars,words,lines",
							mask: "lines",
							charsClass: "hero-char",
							autoSplit: true,
							// NOT 'auto': that puts `aria-label` on the split <span>, and a
							// span has no implicit role, so aria-label is prohibited there
							// (axe: aria-prohibited-attr). The markup carries an sr-only copy
							// of the name instead, with the animated lines aria-hidden.
							aria: "none",
							onSplit(self) {
								ambient?.kill();
								self.chars.forEach((character) => {
									character.setAttribute(
										"data-char",
										character.textContent ?? "",
									);
								});
								gsap.set(self.chars, {
									transformPerspective: 900,
									transformOrigin: "50% 50%",
									backfaceVisibility: "hidden",
								});

								if (hasRevealed) {
									gsap.set(self.chars, {
										y: restingY,
										yPercent: 0,
										rotationX: 0,
										opacity: 1,
										color: "var(--color-text)",
									});
									startAmbientMotion(self.chars);
									return;
								}

								hasRevealed = true;
								const reveal = gsap
									.timeline()
									.from(self.chars, {
										yPercent: (index) => (index % 2 === 0 ? 115 : -115),
										rotationX: (index) => (index % 2 === 0 ? -90 : 90),
										opacity: 0,
										duration: 1.15,
										stagger: { each: 0.028, from: "start" },
										ease: "power4.out",
									})
									.to(
										self.chars,
										{
											color: "var(--color-accent)",
											duration: 0.12,
											stagger: { each: 0.025, from: "start" },
										},
										"-=0.34",
									)
									.to(
										self.chars,
										{
											color: "var(--color-text)",
											duration: 0.24,
											stagger: { each: 0.025, from: "start" },
										},
										"<0.1",
									)
									.to(
										self.chars,
										{
											y: restingY,
											duration: DUR.fast,
											stagger: { each: 0.025, from: "start" },
											ease: EASE.settle,
										},
										"<",
									);

								reveal.call(() => startAmbientMotion(self.chars));
								return reveal;
							},
						},
					);

					entrance.play();
				});

				gsap.to(".pill-dot", {
					scale: 2.2,
					opacity: 0,
					repeat: 2,
					duration: 1.6,
					ease: "power1.out",
				});

				gsap.to(".hero-inner", {
					yPercent: -18,
					autoAlpha: 0.2,
					ease: "none",
					scrollTrigger: {
						trigger: rootRef.current,
						start: "top top",
						end: "bottom top",
						scrub: true,
					},
				});

				return () => {
					cancelled = true;
					visibilityTrigger.kill();
					ambient?.kill();
					gsap.killTweensOf(root.querySelectorAll(".hero-char"));
					split?.revert();
				};
			});

			return () => mm.revert();
		},
		{ scope: rootRef, dependencies: [] },
	);

	return <HeroView dict={dict} rootRef={rootRef} />;
}

function HeroView({
	dict,
	rootRef,
}: {
	dict: Dictionary["hero"];
	rootRef: RefObject<HTMLElement | null>;
}) {
	return (
		<section
			ref={rootRef}
			data-hero
			className="relative flex min-h-svh flex-col justify-between pt-28 pb-8"
		>
			<div className="hero-inner grid-page flex-1 content-center">
				{/*
				 * Full 12 columns: `whitespace-nowrap` below means the longest line
				 * cannot reflow, and SplitText's line mask clips anything that
				 * overflows its box. Narrower here and the headline loses letters.
				 */}
				<div className="col-span-12">
					<h1 className="hero-name text-mega u-wide text-text">
						{/* The only copy assistive tech reads: the split version below is
                broken into per-character elements, which screen readers would
                otherwise spell out letter by letter. */}
						<span className="sr-only">
							{dict.lineOne} {dict.lineTwo}
						</span>
						{/*
						 * Each line is its own block so SplitText can mask per line.
						 * `whitespace-nowrap` is load-bearing: splitting into chars wraps
						 * every character in its own element, and without it the browser
						 * happily breaks a line mid-word (JACOBO → JAC / OBO).
						 */}
						<span aria-hidden className="hero-line block whitespace-nowrap">
							{dict.lineOne}
						</span>
						<span aria-hidden className="hero-line block whitespace-nowrap">
							{dict.lineTwo}
						</span>
					</h1>
				</div>

				<div className="hero-meta order-2 col-span-12 mt-10 lg:order-none lg:col-span-3 lg:col-start-10 lg:mt-12 lg:text-right">
					<p className="u-label text-accent mb-4">{dict.role}</p>
					<ul className="u-meta text-text-dim space-y-1.5">
						{dict.meta.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

				<div className="hero-copy order-1 col-span-12 mt-10 max-w-[42ch] lg:order-none lg:col-span-6 lg:mt-14">
					<p className="text-lead text-text-secondary max-w-[24ch]">
						{dict.statement}
					</p>
					<p className="text-body text-text-secondary mt-5 max-w-[44ch]">
						{dict.supporting}
					</p>
					<div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
						<ArrowLink href="#work" className="text-accent">
							{dict.projectsCta}
						</ArrowLink>
						<ArrowLink href="#contact">{dict.contactCta}</ArrowLink>
					</div>
				</div>

				<div className="hero-artifact border-rule bg-surface-inset order-3 col-span-12 mt-10 border lg:order-none lg:col-span-5 lg:col-start-8 lg:mt-14">
					<div className="border-rule flex items-center justify-between border-b px-4 py-3">
						<span className="u-label text-accent">{dict.artifactLabel}</span>
						<span className="u-label text-text-muted">{dict.artifactKind}</span>
					</div>
					<ol className="grid grid-cols-2 md:grid-cols-4">
						{dict.artifactSteps.map((step, index) => (
							<li
								key={step}
								className="hero-artifact-step border-rule flex flex-col border-r border-b p-4 last:border-r-0 md:border-b-0"
							>
								<span className="u-label text-outline block">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="mt-8 flex items-end justify-between gap-3">
									<span className="u-meta">{step}</span>
									<span
										aria-hidden
										className="bg-accent-fill border-on-accent mb-0.5 block size-2 shrink-0 rounded-full border"
									/>
								</span>
							</li>
						))}
					</ol>
					<p className="u-label border-rule text-text-muted border-t px-4 py-3">
						{dict.artifactStatus}
					</p>
				</div>
			</div>

			<div className="grid-page">
				<Rule className="hero-rule col-span-12 mb-6" />
				<div className="col-span-12 flex items-center justify-between">
					<Pill>{dict.available}</Pill>
					<span className="u-label flex items-center gap-2">
						{dict.scroll}
						<ArrowDown
							aria-hidden
							size={14}
							strokeWidth={1.5}
							strokeLinecap="square"
							strokeLinejoin="miter"
						/>
					</span>
				</div>
			</div>
		</section>
	);
}
