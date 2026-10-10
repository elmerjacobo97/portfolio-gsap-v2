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
				"Diseño que se ve bien en celular y computadora",
				"Preparada para aparecer en Google (títulos, descripciones y velocidad)",
				"Formulario o botón de WhatsApp conectado a tu contacto",
				"Publicada con tu propio dominio",
			],
			en: [
				"Design that looks right on phone and desktop",
				"Ready to appear on Google (titles, descriptions, and speed)",
				"Contact form or WhatsApp button connected to your inbox",
				"Published on your own domain",
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
			es: "Una app para iOS y Android con un solo desarrollo, conectada a los datos de tu negocio.",
			en: "One app for iOS and Android, built once and connected to your business data.",
		},
		deliverables: {
			es: [
				"App para iOS y Android (React Native o Flutter)",
				"Registro e inicio de sesión de usuarios",
				"Pagos o notificaciones si tu negocio los necesita",
				"Ayuda para publicarla en App Store y Google Play",
			],
			en: [
				"iOS and Android app (React Native or Flutter)",
				"User sign-up and login",
				"Payments or notifications if your business needs them",
				"Help publishing it on the App Store and Google Play",
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
			es: "Paneles, herramientas internas y plataformas con suscripción que reemplazan hojas de cálculo y trabajo manual.",
			en: "Panels, internal tools, and subscription platforms that replace spreadsheets and manual work.",
		},
		deliverables: {
			es: [
				"Panel de administración con usuarios y permisos",
				"Tus datos guardados y organizados de forma segura",
				"Reportes y exportación de datos",
				"Documentación para que tu equipo lo pueda mantener",
			],
			en: [
				"Admin panel with users and permissions",
				"Your data stored and organized securely",
				"Reports and data export",
				"Documentation so your team can maintain it",
			],
		},
	},
	{
		code: "04",
		title: {
			es: "Pagos, conexiones y sistema interno",
			en: "Payments, integrations, and internal systems",
		},
		pitch: {
			es: "Cobros con Stripe, conexión con otros sistemas y un sistema interno ordenado, listo para crecer. También arreglo sistemas que ya cuesta cambiar.",
			en: "Stripe payments, connections to other systems, and a well-organized internal system, ready to grow. I also fix systems that have become hard to change.",
		},
		deliverables: {
			es: [
				"Pasar tus datos a un sistema nuevo sin perderlos (Laravel, PostgreSQL)",
				"Pruebas automáticas que detectan errores antes de que los vea un usuario",
				"Cobros con Stripe si tu negocio los necesita",
				"Revisión de qué parte hace qué, para que cambiar algo no rompa otra cosa",
			],
			en: [
				"Moving your data to a new system without losing it (Laravel, PostgreSQL)",
				"Automated tests that catch errors before a user sees them",
				"Stripe payments if your business needs them",
				"A review of which part does what, so changing one thing does not break another",
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
				"Asistentes que responden, generan texto o extraen datos dentro de tu producto",
				"Asistentes de IA con límites claros y revisión humana antes de actuar",
				"Instrucciones guardadas con historial de cambios para que tu equipo las reutilice",
				"Documentación para mantenerlo sin depender de una instrucción suelta",
			],
			en: [
				"Assistants that answer, generate text, or extract data inside your product",
				"AI assistants with clear limits and human review before they act",
				"Saved instructions with change history for your team to reuse",
				"Documentation to maintain it without depending on a single loose prompt",
			],
		},
	},
];
