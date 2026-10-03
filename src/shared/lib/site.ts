const CAREER_START_YEAR = 2022;

export function getYearsOfExperience() {
	return new Date().getFullYear() - CAREER_START_YEAR;
}

export const site = {
	name: "Elmer Augusto Jacobo Otiniano",
	shortName: "Elmer Jacobo",
	role: "Product engineer · Full stack",
	email: "contacto@elmerjacobo.dev",
	phone: "+51 927 347 691",
	city: "Trujillo",
	country: "PE",
	timeZone: "America/Lima",
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://elmerjacobo.dev",
	whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "51927347691",
	/** One Cal.com event type per locale: title/description live in Cal, not here. */
	calLinks: {
		es: process.env.NEXT_PUBLIC_CAL_LINK ?? "elmer-jacobo-ck9x20/30min",
		en: process.env.NEXT_PUBLIC_CAL_LINK_EN ?? "elmer-jacobo-ck9x20/30min-en",
	},
	social: [
		{ label: "LinkedIn", href: "https://linkedin.com/in/elmerjacobo97" },
		{ label: "GitHub", href: "https://github.com/elmerjacobo97" },
	],
	/** Shared technology vocabulary for metadata and project context. */
	stack: [
		"React",
		"Next.js",
		"TypeScript",
		"Laravel",
		"PHP",
		"Node.js",
		"React Native",
		"Flutter",
		"PostgreSQL",
		"MySQL",
		"Prisma",
		"Eloquent",
		"Stripe",
		"Tailwind CSS",
		"Vitest",
		"Pest",
		"GSAP",
		"Generative AI",
		"AI Agents",
		"Agent Skills",
	],
} as const;
