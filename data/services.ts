import type { Localized } from "@/i18n/t";

export type Service = {
	code: string;
	title: Localized;
	pitch: Localized;
	deliverables: Localized<readonly string[]>;
};

export const services: readonly Service[] = [
	{
		code: "01",
		title: {
			es: "Construir un producto nuevo",
			en: "Build a new product",
		},
		pitch: {
			es: "Si tienes una idea concreta y necesitas llegar al primer cobro, puedo llevar frontend, backend, pagos y deploy en el mismo proyecto.",
			en: "If you have a concrete idea and need to reach the first payment, I can handle the frontend, backend, payments, and deployment in the same project.",
		},
		deliverables: {
			es: [
				"Frontend y backend del primer alcance",
				"Autenticación y roles cuando el producto los necesite",
				"Pagos con Stripe si el modelo los requiere",
				"Deploy y documentación para el siguiente paso",
			],
			en: [
				"Frontend and backend for the first scope",
				"Authentication and roles when the product needs them",
				"Stripe payments when the business model requires them",
				"Deployment and documentation for the next step",
			],
		},
	},
	{
		code: "02",
		title: {
			es: "Mejorar un producto que ya existe",
			en: "Improve an existing product",
		},
		pitch: {
			es: "Si el producto ya tiene usuarios pero cada cambio cuesta más, reviso dónde se está acumulando el problema y trabajo desde ahí.",
			en: "If the product already has users but every change costs more, I look at where the problem is accumulating and start there.",
		},
		deliverables: {
			es: [
				"Revisión del flujo y los puntos de fricción",
				"Cambios en frontend y backend",
				"Integración o ajuste de pagos",
				"Entregas por partes que puedas abrir y revisar",
			],
			en: [
				"Review of the flow and its points of friction",
				"Frontend and backend changes",
				"Payment integration or adjustments",
				"Incremental deliveries you can open and review",
			],
		},
	},
	{
		code: "03",
		title: {
			es: "Ordenar el backend y la arquitectura",
			en: "Bring order to the backend",
		},
		pitch: {
			es: "Si el backend necesita una migración, tests o una arquitectura más clara, dejo el sistema preparado para que el siguiente cambio sea más sencillo.",
			en: "If the backend needs a migration, tests, or a clearer architecture, I prepare the system so the next change is easier to make.",
		},
		deliverables: {
			es: [
				"Migraciones de Laravel y base de datos",
				"Tests de API con Pest",
				"Revisión de límites y responsabilidades",
				"Documentación de decisiones y siguiente paso",
			],
			en: [
				"Laravel and database migrations",
				"API tests with Pest",
				"Review of boundaries and responsibilities",
				"Decision notes and a clear next step",
			],
		},
	},
	{
		code: "04",
		title: {
			es: "Destrabar un producto",
			en: "Unblock a product",
		},
		pitch: {
			es: "Si no sabes qué construir después, una decisión técnica se ha quedado atascada o necesitas una segunda opinión, revisamos el contexto y definimos un siguiente paso ejecutable.",
			en: "If you are unsure what to build next, a technical decision is stuck, or you need a second opinion, we review the context and define an executable next step.",
		},
		deliverables: {
			es: [
				"Lectura del contexto y del problema concreto",
				"Decisión de producto o técnica documentada",
				"Plan priorizado para el siguiente paso",
				"Acompañamiento opcional para implementar lo decidido",
			],
			en: [
				"Review of the context and concrete problem",
				"Documented product or technical decision",
				"Prioritized plan for the next step",
				"Optional support to implement the decision",
			],
		},
	},
];
