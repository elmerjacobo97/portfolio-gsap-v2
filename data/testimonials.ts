import type { Localized } from "@/i18n/t";

export type Testimonial = {
	code: string;
	quote: Localized;
	name: Localized;
	role: Localized;
	company: Localized;
	source?: string;
};

/** Keep this collection empty until every quote has approval and attribution. */
export const testimonials: readonly Testimonial[] = [];
