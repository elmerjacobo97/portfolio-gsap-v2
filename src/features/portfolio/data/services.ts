import type { Localized } from "@/shared/i18n/t";

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
			es: "Landing pages y sitios web",
			en: "Landing pages and websites",
		},
		pitch: {
			es: "Páginas que presentan tu negocio, captan contactos y cargan rápido en el celular.",
			en: "Pages that present your business, capture leads, and load fast on mobile.",
		},
		deliverables: {
			es: [
				"Diseño responsive para móvil y escritorio",
				"SEO técnico básico y metadatos para buscadores",
				"Formulario o botón de WhatsApp conectado",
				"Publicación y dominio configurados",
			],
			en: [
				"Responsive design for mobile and desktop",
				"Basic technical SEO and search metadata",
				"Contact form or WhatsApp button connected",
				"Deployment and domain setup",
			],
		},
	},
	{
		code: "02",
		title: {
			es: "Apps móviles",
			en: "Mobile apps",
		},
		pitch: {
			es: "Apps para iOS y Android con una sola base de código, conectadas a tu backend.",
			en: "iOS and Android apps from one codebase, connected to your backend.",
		},
		deliverables: {
			es: [
				"App iOS y Android con React Native o Flutter",
				"Autenticación y conexión con tu API",
				"Pagos o notificaciones si el negocio los necesita",
				"Preparación para publicar en App Store y Google Play",
			],
			en: [
				"iOS and Android app with React Native or Flutter",
				"Authentication and API integration",
				"Payments or notifications when the business needs them",
				"Preparation for App Store and Google Play release",
			],
		},
	},
	{
		code: "03",
		title: {
			es: "Sistemas a medida",
			en: "Custom systems",
		},
		pitch: {
			es: "Paneles, herramientas internas y SaaS que reemplazan hojas de cálculo y procesos manuales.",
			en: "Panels, internal tools, and SaaS products that replace spreadsheets and manual processes.",
		},
		deliverables: {
			es: [
				"Panel de administración con roles y permisos",
				"Base de datos con migraciones versionadas",
				"Reportes y exportación de datos",
				"Documentación para que tu equipo lo mantenga",
			],
			en: [
				"Admin panel with roles and permissions",
				"Database with versioned migrations",
				"Reports and data export",
				"Documentation so your team can maintain it",
			],
		},
	},
	{
		code: "04",
		title: {
			es: "Backend, APIs y pagos",
			en: "Backend, APIs, and payments",
		},
		pitch: {
			es: "APIs seguras y pagos con Stripe, listas para crecer. También ordeno un backend que ya es difícil de cambiar.",
			en: "Secure APIs and Stripe payments, ready to grow. I also bring order to a backend that has become hard to change.",
		},
		deliverables: {
			es: [
				"Migraciones de Laravel y base de datos",
				"Tests de API con Pest",
				"Pagos con Stripe si el modelo de negocio los requiere",
				"Revisión de límites y responsabilidades",
			],
			en: [
				"Laravel and database migrations",
				"API tests with Pest",
				"Stripe payments when the business model requires them",
				"Review of boundaries and responsibilities",
			],
		},
	},
	{
		code: "05",
		title: {
			es: "IA y automatización",
			en: "AI and automation",
		},
		pitch: {
			es: "IA para una tarea concreta de tu negocio. Primero definimos la tarea; después elegimos la solución más simple.",
			en: "AI for one concrete task in your business. We define the task first, then choose the simplest solution.",
		},
		deliverables: {
			es: [
				"Asistentes, generación o extracción de datos dentro del producto",
				"Agentes con límites claros y revisión antes de actuar",
				"Skills versionadas con contexto para tu equipo",
				"Documentación para mantenerlo sin depender de un prompt suelto",
			],
			en: [
				"Assistants, generation, or data extraction inside the product",
				"Agents with clear limits and review before they act",
				"Versioned skills with context for your team",
				"Documentation to maintain it without relying on a loose prompt",
			],
		},
	},
];
