"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import type { NavLink } from "./nav-types";
import { ScrollSmoother } from "@/lib/gsap";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { BrandMark } from "./BrandMark";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

// ScrollSmoother owns scrolling, so native anchor jumps would fight it. If the
// section is absent (for example, on a case-study route), leave navigation to
// the browser so the absolute href returns to the home page.
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
						className="group col-span-6 inline-flex w-fit items-center py-1 md:col-span-4"
					>
						<BrandMark />
					</TransitionLink>

					<nav
						aria-label="Primary"
						className="col-span-4 hidden justify-center gap-8 md:flex"
					>
						{links.map((link) => (
							<TransitionLink
								key={link.href}
								href={link.href}
								className="u-label text-text-dim hover:text-text inline-flex items-center px-2 py-2 whitespace-nowrap transition-colors duration-200"
							>
								{link.label}
							</TransitionLink>
						))}
					</nav>

					<div className="col-span-6 flex items-center justify-end gap-4 md:col-span-4">
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
								"u-label text-text hover:text-accent inline-flex items-center gap-2 py-2 transition-colors duration-200 md:hidden",
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
