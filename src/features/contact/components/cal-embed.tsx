"use client";

import Cal from "@calcom/embed-react";
import { useTheme } from "next-themes";

import { site } from "@/shared/lib/site";
import type { Locale } from "@/shared/i18n/config";

/** Split out so next/dynamic can code-split the whole Cal bundle away. */
export default function CalEmbed({ locale }: { locale: Locale }) {
	const { resolvedTheme } = useTheme();
	const theme = resolvedTheme === "light" ? "light" : "dark";

	return (
		<Cal
			key={`${locale}-${theme}`}
			calLink={site.calLinks[locale]}
			style={{ width: "100%", height: "100%", minHeight: "620px" }}
			config={{ theme }}
		/>
	);
}
