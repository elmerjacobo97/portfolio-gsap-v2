"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { defaultLocale, hasLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

type NotFoundContentProps = {
	copy: Dictionary["notFound"];
	href: string;
};

type LocalizedNotFoundContentProps = {
	copies: Record<Locale, Dictionary["notFound"]>;
};

export function NotFoundContent({ copy, href }: NotFoundContentProps) {
	return (
		<main
			id="main"
			className="grid-page min-h-svh content-center py-[var(--spacing-section)] text-center"
		>
			<p className="text-numeral u-wide u-outline col-span-12">404</p>

			<div className="col-span-12 mt-10 lg:col-span-6 lg:col-start-4">
				<h1 className="text-h1 u-wide">{copy.title}</h1>
				<p className="text-lead text-text-secondary mt-6">{copy.body}</p>
				<Link
					href={href}
					className="u-meta text-accent mt-10 inline-block hover:underline"
				>
					{copy.cta}
				</Link>
			</div>
		</main>
	);
}

export function LocalizedNotFoundContent({
	copies,
}: LocalizedNotFoundContentProps) {
	const pathname = usePathname();
	const requestedLocale = pathname?.split("/")[1] ?? defaultLocale;
	const locale = hasLocale(requestedLocale) ? requestedLocale : defaultLocale;

	return <NotFoundContent copy={copies[locale]} href={`/${locale}`} />;
}
