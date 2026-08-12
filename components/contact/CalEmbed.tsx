"use client";

import Cal from "@calcom/embed-react";
import { useTheme } from "next-themes";

import { site } from "@/data/site";

/** Split out so next/dynamic can code-split the whole Cal bundle away. */
export default function CalEmbed() {
	const { resolvedTheme } = useTheme();
	const theme = resolvedTheme === "light" ? "light" : "dark";

	return (
		<Cal
			key={theme}
			calLink={site.calLink}
			style={{ width: "100%", height: "100%", minHeight: "620px" }}
			config={{ theme }}
		/>
	);
}
