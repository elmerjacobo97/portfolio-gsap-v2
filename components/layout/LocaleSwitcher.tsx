"use client";

import { usePathname } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { TransitionLink } from "@/components/motion/TransitionLink";

/**
 * Slugs are deliberately not translated, so switching locale is a pure swap of
 * path segment 0 — it works identically on `/es` and on `/es/work/<slug>`.
 */
export function LocaleSwitcher({
	locale,
	label,
}: {
	locale: Locale;
	label: string;
}) {
	const pathname = usePathname();
	const other = locales.find((l) => l !== locale) ?? locale;

	const segments = pathname.split("/");
	segments[1] = other;
	const href = segments.join("/") || `/${other}`;

	return (
		<TransitionLink
			href={href}
			prefetch
			className="u-meta text-text-dim hover:text-accent inline-flex items-center py-2 transition-colors duration-200"
		>
			{/*
			 * No aria-label here. An aria-label that does not contain the visible
			 * text ("ES / EN") makes the accessible name diverge from what a voice
			 * -control user would say (axe: label-content-name-mismatch). The
			 * sr-only suffix appends the intent instead of replacing the label.
			 */}
			<span className={locale === "es" ? "text-text" : undefined}>ES</span>
			<span aria-hidden className="text-outline mx-1">
				/
			</span>
			<span className={locale === "en" ? "text-text" : undefined}>EN</span>
			<span className="sr-only"> — {label}</span>
		</TransitionLink>
	);
}
