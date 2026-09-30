import type { Localized } from "@/i18n/t";

export type Testimonial = {
	code: string;
	quote: Localized;
	name: Localized;
	role: Localized;
	company: Localized;
	/** Public link to the original (LinkedIn recommendation, email screenshot, etc.). */
	source?: string;
};

/**
 * The Testimonials section renders nothing while this list is empty.
 * Add each quote only with written approval and real attribution, e.g.:
 *
 * {
 *   code: "R-01",
 *   quote: { es: "…", en: "…" },
 *   name: { es: "Nombre Apellido", en: "Nombre Apellido" },
 *   role: { es: "Cargo", en: "Role" },
 *   company: { es: "Empresa", en: "Company" },
 *   source: "https://linkedin.com/…",
 * },
 */
export const testimonials: readonly Testimonial[] = [
	// TODO: PLACEHOLDER quotes for layout testing. Replace with approved ones before deploy.
	{
		code: "R-01",
		quote: {
			es: "Elmer no se quedó en el ticket. Entendió el negocio, cuestionó lo necesario y convirtió una idea ambigua en una solución que el equipo podía mantener.",
			en: "Elmer did not stop at the ticket. He understood the business, challenged what mattered, and turned an ambiguous idea into a solution the team could maintain.",
		},
		name: { es: "Nombre de prueba", en: "Sample name" },
		role: { es: "Liderazgo técnico", en: "Technical leadership" },
		company: { es: "Empresa de prueba", en: "Sample company" },
	},
	{
		code: "R-02",
		quote: {
			es: "Tomó ownership de principio a fin: arquitectura, implementación y despliegue. Siempre supimos qué estaba pasando y cuál era la siguiente decisión.",
			en: "He took ownership from end to end: architecture, implementation, and deployment. We always knew what was happening and which decision came next.",
		},
		name: { es: "Nombre de prueba", en: "Sample name" },
		role: { es: "Product manager", en: "Product manager" },
		company: { es: "Empresa de prueba", en: "Sample company" },
	},
	{
		code: "R-03",
		quote: {
			es: "La comunicación fue tan sólida como el código. Detectó riesgos temprano, propuso alternativas claras y entregó sin convertir cada cambio en una sorpresa.",
			en: "The communication was as solid as the code. He surfaced risks early, proposed clear alternatives, and delivered without turning every change into a surprise.",
		},
		name: { es: "Nombre de prueba", en: "Sample name" },
		role: { es: "Fundador de producto", en: "Product founder" },
		company: { es: "Empresa de prueba", en: "Sample company" },
	},
];
