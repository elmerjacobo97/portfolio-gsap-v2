import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist_Mono, Sora } from "next/font/google";

import "./globals.css";

import { site } from "@/shared/lib/site";
import { defaultLocale, localeTag } from "@/shared/i18n/config";
import { getDictionary } from "@/shared/i18n/get-dictionary";
import { NotFoundContent } from "@/shared/components/layout/not-found-content";
import { ThemeProvider } from "@/shared/components/layout/theme-provider";
import { ThemedToaster } from "@/shared/components/layout/themed-toaster";

const sora = Sora({
	variable: "--font-sora",
	subsets: ["latin", "latin-ext"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin", "latin-ext"],
	display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
	const dict = await getDictionary(defaultLocale);

	return {
		title: `${dict.notFound.title} — ${site.shortName}`,
		description: dict.notFound.body,
	};
}

/**
 * The global 404 bypasses `[locale]/layout.tsx`, so it owns the document shell,
 * fonts, and global stylesheet instead of relying on the localized layout.
 */
export default async function GlobalNotFound() {
	const dict = await getDictionary(defaultLocale);

	return (
		<html
			lang={localeTag[defaultLocale]}
			className={`${sora.variable} ${geistMono.variable}`}
			suppressHydrationWarning
		>
			<body className="bg-canvas text-text">
				<ThemeProvider>
					<NotFoundContent copy={dict.notFound} href={`/${defaultLocale}`} />
					<ThemedToaster />
				</ThemeProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
