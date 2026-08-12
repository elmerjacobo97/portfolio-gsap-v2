import type { Localized } from "@/i18n/t";

export type NowItem = {
	code: string;
	slug: string;
	kind: Localized;
};

/** Projects and activities that are real, public, and current enough to show. */
export const now: readonly NowItem[] = [
	{
		code: "01",
		slug: "spec-flow-skills",
		kind: { es: "Open source", en: "Open source" },
	},
	{
		code: "02",
		slug: "driftwatch",
		kind: { es: "Open source", en: "Open source" },
	},
];
