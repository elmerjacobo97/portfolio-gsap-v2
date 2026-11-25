"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import type { Locale } from "@/shared/i18n/config";
import { cn } from "@/shared/lib/cn";
import type { NavLink } from "./nav-types";
import { ScrollSmoother, ScrollTrigger, useGSAP } from "@/shared/lib/gsap";
import { TransitionLink } from "@/shared/components/motion/transition-link";
import { BrandMark } from "./brand-mark";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";

// ScrollSmoother owns scrolling, so native anchor jumps would fight it. If the
// Section is absent on nested routes, so leave navigation to the browser and let
// the absolute href return to the home page.
function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
	const hashIndex = href.indexOf("#");
	if (hashIndex === -1) return;

	const target = document.getElementById(href.slice(hashIndex + 1));
	if (!target) return;

	e.preventDefault();
	window.history.replaceState(null, "", href);
	const smoother = ScrollSmoother.get();

	if (smoother) {
		smoother.scrollTo(target, true, "top top");
	} else {
		target.scrollIntoView();
	}
}

export function Nav({
	locale,
	links,
	switchLabel,
	themeLabel,
	lightThemeLabel,
	darkThemeLabel,
	menuLabel,
	closeLabel,
}: {
	locale: Locale;
	links: readonly NavLink[];
	switchLabel: string;
	themeLabel: string;
	lightThemeLabel: string;
	darkThemeLabel: string;
	menuLabel: string;
	closeLabel: string;
}) {
	const [open, setOpen] = useState(false);
	const [activeSectionHref, setActiveSectionHref] = useState<string | null>(null);
	const pathname = usePathname();

	// Scroll-spy: highlight the link whose home-page section crosses 60% of the
	// viewport. Sections missing from the page (blog, 404) are skipped.
	useGSAP(
		() => {
			const triggers = links.flatMap((link) => {
				const sectionId = link.href.split("#")[1];
				const section = sectionId && document.getElementById(sectionId);
				if (!section) return [];

				return ScrollTrigger.create({
					trigger: section,
					start: "top 60%",
					end: "bottom 60%",
					onToggle: ({ isActive }) =>
						setActiveSectionHref((current) =>
							isActive ? link.href : current === link.href ? null : current,
						),
				});
			});

			return () => {
				triggers.forEach((trigger) => trigger.kill());
				setActiveSectionHref(null);
			};
		},
		{ dependencies: [pathname] },
	);

	const isActive = (href: string) =>
		href.includes("#")
			? activeSectionHref === href
			: pathname.startsWith(href);

	return (
		<>
			<header
				data-nav
				className="bg-canvas/80 border-rule fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md"
			>
				<div className="grid-page items-center py-4">
					{/* `py-2` on every nav control: the 11–13px mono type gives a ~19px
              hit box, under the 24px minimum touch target (axe: target-size). */}
					<TransitionLink
						href={`/${locale}`}
						className="group col-span-6 inline-flex w-fit items-center py-1 xl:col-span-3"
					>
						<BrandMark />
					</TransitionLink>

					<nav
						aria-label="Primary"
						className="col-span-6 hidden justify-center gap-4 xl:flex"
					>
						{links.map((link) => (
							<TransitionLink
								key={link.href}
								href={link.href}
								aria-current={isActive(link.href) ? "location" : undefined}
								className={cn(
									"u-label hover:text-accent focus-visible:text-accent inline-flex items-center px-2 py-2 whitespace-nowrap transition-colors duration-200",
									isActive(link.href) ? "text-accent" : "text-text-dim",
								)}
							>
								[&nbsp;{link.label}&nbsp;]
							</TransitionLink>
						))}
					</nav>

					<div className="col-span-6 flex items-center justify-end gap-4 xl:col-span-3">
						<LocaleSwitcher locale={locale} label={switchLabel} />
						<ThemeToggle
							label={themeLabel}
							lightLabel={lightThemeLabel}
							darkLabel={darkThemeLabel}
						/>
						<button
							type="button"
							onClick={() => setOpen(true)}
							aria-expanded={open}
							className={cn(
								"u-label text-text hover:text-accent inline-flex items-center gap-2 py-2 transition-colors duration-200 xl:hidden",
							)}
						>
							{menuLabel}
							<Menu
								aria-hidden
								size={14}
								strokeWidth={1.5}
								strokeLinecap="square"
								strokeLinejoin="miter"
							/>
						</button>
					</div>
				</div>
			</header>

			<MobileMenu
				open={open}
				onCloseAction={() => setOpen(false)}
				onNavigateAction={(e, href) => {
					handleAnchor(e, href);
					setOpen(false);
				}}
				links={links}
				label={menuLabel}
				closeLabel={closeLabel}
			/>
		</>
	);
}
