import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "../globals.css";

import { getDictionary } from "@/i18n/get-dictionary";
import { defaultLocale, hasLocale, locales, localeTag } from "@/i18n/config";
import { site } from "@/data/site";
import { Footer } from "@/components/layout/Footer";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { Nav } from "@/components/layout/Nav";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/layout/JsonLd";
import { buildAlternates } from "@/lib/seo";
import { Curtain } from "@/components/motion/Curtain";
import { Cursor } from "@/components/motion/Cursor";
import { Intro } from "@/components/motion/Intro";
import { RouteMotion } from "@/components/motion/RouteMotion";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothProvider } from "@/components/motion/SmoothProvider";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemedToaster } from "@/components/layout/ThemedToaster";

/**
 * Archivo carries the whole display voice. It is one of the very few Google
 * fonts with a real `wdth` axis (62–125), so `wdth 118 / wght 800` gives the
 * expanded grotesque for headlines and `wdth 100 / wght 400` gives body copy —
 * from a single variable file. See the `u-wide` utility in globals.css.
 */
const archivo = Archivo({
	variable: "--font-archivo",
	subsets: ["latin", "latin-ext"],
	axes: ["wdth"],
	display: "swap",
});

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin", "latin-ext"],
	weight: ["400", "700"],
	display: "swap",
});

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!hasLocale(locale)) return {};

	const dict = await getDictionary(locale);

	return {
		metadataBase: new URL(site.url),
		title: {
			default: dict.meta.title,
			template: `%s — ${site.shortName}`,
		},
		description: dict.meta.description,
		applicationName: site.shortName,
		authors: [{ name: site.name, url: site.url }],
		creator: site.name,
		keywords: [...site.stack],
		alternates: buildAlternates(locale),
		openGraph: {
			type: "website",
			siteName: site.shortName,
			title: dict.meta.title,
			description: dict.meta.description,
			url: `/${locale}`,
			locale: localeTag[locale].replace("-", "_"),
			alternateLocale: locales.flatMap((l) =>
				l === locale ? [] : [localeTag[l].replace("-", "_")],
			),
		},
		twitter: {
			card: "summary_large_image",
			title: dict.meta.title,
			description: dict.meta.description,
		},
		robots: {
			index: true,
			follow: true,
			googleBot: { index: true, follow: true, "max-image-preview": "large" },
		},
	};
}

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale: requestedLocale } = await params;

	// Keep this root layout renderable for an invalid locale. The page or
	// catch-all below can then throw `notFound()` and reach `[locale]/not-found`.
	const locale = hasLocale(requestedLocale) ? requestedLocale : defaultLocale;
	const dict = await getDictionary(locale);

	// Absolute, not bare hashes: on a case-study page these sections do not
	// exist, and a bare hash link would silently do nothing. Nav intercepts
	// these for a smooth scroll only when the target is on the current page.
	const navLinks = [
		{ href: `/${locale}#work`, label: dict.nav.work },
		{ href: `/${locale}#now`, label: dict.nav.now },
		{ href: `/${locale}#about`, label: dict.nav.about },
		{ href: `/${locale}#contact`, label: dict.nav.collaborate },
	];

	return (
		// The font variables MUST sit on <html>. `--font-sans` is declared at
		// `:root`, and custom-property substitution happens where the property is
		// declared — putting them on <body> makes `var(--font-archivo)` resolve to
		// the guaranteed-invalid value and the whole type system falls back.
		<html
			lang={localeTag[locale]}
			className={`${archivo.variable} ${spaceMono.variable}`}
			// Extensions (LanguageTool, Grammarly…) stamp attributes on <html> before
			// React hydrates. Suppressing here covers only this element.
			suppressHydrationWarning
		>
			<body className="bg-canvas text-text">
				<ThemeProvider>
					{/*
					 * Guarantees content for no-JS visitors and for the window before
					 * hydration. The intro is server-rendered so it covers the page from
					 * the first paint — without JS to dismiss it, it must not render.
					 */}
					<noscript>
						<style>{`.intro{display:none!important}`}</style>
					</noscript>

					{/*
					 * Everything down to (and including) <Cursor/> is `position: fixed`
					 * chrome. It MUST stay a sibling of <SmoothProvider/> — the transform
					 * ScrollSmoother applies to #smooth-content creates a containing
					 * block, so a fixed element nested inside it would scroll with the
					 * page instead of staying pinned to the viewport.
					 */}
					<JsonLd locale={locale} description={dict.meta.description} />

					<SkipLink label={dict.nav.skipToContent} />
					<GridOverlay />
					<Nav
						locale={locale}
						links={navLinks}
						switchLabel={dict.nav.switchTo}
						themeLabel={dict.nav.theme}
						lightThemeLabel={dict.nav.activateLight}
						darkThemeLabel={dict.nav.activateDark}
						menuLabel={dict.nav.menu}
						closeLabel={dict.nav.close}
					/>
					<ScrollProgress />
					<Cursor />
					<Curtain />
					<Intro />

					<SmoothProvider>
						<div className="relative z-10">
							{children}
							<Footer dict={dict.footer} locale={locale} />
						</div>
					</SmoothProvider>

					<RouteMotion />
					<ThemedToaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
