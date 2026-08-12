import type { Localized } from "@/i18n/t";

export type CaseBlock =
	| { kind: "heading"; text: Localized }
	| { kind: "para"; text: Localized }
	| { kind: "list"; items: readonly Localized[] };

export type Project = {
	/** The locale switcher stays a segment swap, but visible context is translated. */
	slug: string;
	category: "project" | "experience";
	order: number;
	year: number;
	client: Localized;
	liveUrl?: string;
	repoUrl?: string;
	stack: readonly string[];
	role: Localized;
	title: Localized;
	tagline: Localized;
	summary: Localized;
	metrics: readonly { value: string; label: Localized }[];
	cover?: {
		src: string;
		width: number;
		height: number;
		alt: Localized;
		fit?: "cover" | "contain";
	};
	gallery: readonly {
		src: string;
		width: number;
		height: number;
		alt: Localized;
	}[];
	body: readonly CaseBlock[];
};

export const projects: readonly Project[] = [
		{
			slug: "spec-flow-skills",
			category: "project",
		order: 1,
		year: 2026,
		client: { es: "Open source · Individual", en: "Open source · Individual" },
		repoUrl: "https://github.com/elmerjacobo97/spec-flow-skills",
		stack: ["Claude Code", "Agent Skills", "Markdown", "Cursor", "Spec-driven"],
		role: { es: "Autor · Mantenedor", en: "Author · Maintainer" },
		title: { es: "Spec Flow Skills", en: "Spec Flow Skills" },
		tagline: {
			es: "Diseño guiado por specs para agentes de código.",
			en: "Spec-driven design for coding agents.",
		},
		summary: {
			es: "Dos skills open source que separan la planificación, aprobación humana e implementación para evitar decisiones improvisadas por el agente.",
			en: "Two open-source skills that separate planning, human approval, and implementation so agents cannot improvise product decisions.",
		},
		metrics: [
			{ value: "2", label: { es: "skills", en: "skills" } },
			{ value: "5+", label: { es: "agentes", en: "agents" } },
			{ value: "MIT", label: { es: "licencia", en: "license" } },
		],
		cover: {
			src: "/images/projects/spec-flow-skills.png",
			width: 3796,
			height: 1924,
			alt: {
				es: "README de Spec Flow Skills con el flujo de especificación e implementación",
				en: "Spec Flow Skills README showing the specification and implementation flow",
			},
		},
		gallery: [],
		body: [
			{
				kind: "heading",
				text: { es: "Por qué existe", en: "Why it exists" },
			},
			{
				kind: "para",
				text: {
					es: "Un prompt amplio deja decenas de decisiones invisibles en el chat. En la siguiente sesión el agente puede olvidar esas decisiones o improvisar en otra dirección.",
					en: "A broad prompt leaves dozens of product decisions hidden in chat. In the next session, an agent can forget them or improvise in a different direction.",
				},
			},
			{
				kind: "heading",
				text: { es: "El contrato", en: "The contract" },
			},
			{
				kind: "list",
				items: [
					{
						es: "spec hace preguntas, documenta decisiones y guarda un Draft versionado en git.",
						en: "spec asks questions, documents decisions, and saves a Draft versioned in git.",
					},
					{
						es: "La aprobación ocurre fuera del chat y requiere que una persona cambie el estado a Approved.",
						en: "Approval happens outside chat and requires a person to change the status to Approved.",
					},
					{
						es: "spec-impl valida ese estado, crea una rama e implementa con pausas para revisar cada diff.",
						en: "spec-impl validates that state, creates a branch, and implements with pauses to review each diff.",
					},
					{
						es: "El instalador cubre Claude Code, Cursor, Codex, Antigravity y OpenCode.",
						en: "The installer supports Claude Code, Cursor, Codex, Antigravity, and OpenCode.",
					},
				],
			},
		],
	},
		{
			slug: "driftwatch",
			category: "project",
		order: 2,
		year: 2026,
		client: { es: "Open source · Individual", en: "Open source · Individual" },
		liveUrl: "https://www.npmjs.com/package/@codigoconelmer/driftwatch",
		repoUrl: "https://github.com/elmerjacobo97/driftwatch",
		stack: [
			"TypeScript",
			"Node.js",
			"Telegram API",
			"Slack API",
			"Discord API",
			"Docker",
		],
		role: { es: "Autor · Mantenedor", en: "Author · Maintainer" },
		title: { es: "DriftWatch", en: "DriftWatch" },
		tagline: {
			es: "Detecta cambios de schema antes de que rompan tu app.",
			en: "Detect schema changes before they break your app.",
		},
		summary: {
			es: "CLI y daemon que monitorea endpoints HTTP y alerta por Telegram, Slack o Discord cuando cambia la estructura de una respuesta.",
			en: "A CLI and daemon that monitors HTTP endpoints and alerts through Telegram, Slack, or Discord when a response structure changes.",
		},
		metrics: [
			{ value: "Node.js", label: { es: "runtime", en: "runtime" } },
			{ value: "3", label: { es: "canales de alerta", en: "alert channels" } },
			{ value: "MIT", label: { es: "licencia", en: "license" } },
		],
		cover: {
			src: "/images/projects/driftwatch-showcase.png",
			width: 1586,
			height: 992,
			alt: {
				es: "Paquete npm de DriftWatch junto a su alerta de cambios de schema e instalación",
				en: "DriftWatch npm package beside its schema-change alert and installation guide",
			},
		},
		gallery: [],
		body: [
			{
				kind: "heading",
				text: { es: "El problema", en: "The problem" },
			},
			{
				kind: "para",
				text: {
					es: "Una API externa puede renombrar una key o cambiar un tipo sin aviso. La aplicación falla en producción antes de que el equipo se entere.",
					en: "An external API can rename a key or change a type without notice. The application fails in production before the team finds out.",
				},
			},
			{
				kind: "heading",
				text: { es: "Cómo funciona", en: "How it works" },
			},
			{
				kind: "list",
				items: [
					{
						es: "Extrae keys y tipos de cada respuesta, nunca sus valores.",
						en: "It extracts keys and types from each response, never their values.",
					},
					{
						es: "Compara snapshots y muestra exactamente qué se añadió, eliminó o cambió.",
						en: "It compares snapshots and shows exactly what was added, removed, or changed.",
					},
					{
						es: "Corre como daemon, proceso en background o contenedor Docker sin SDK en la app.",
						en: "It runs as a daemon, background process, or Docker container without an SDK in the app.",
					},
					{
						es: "Envía el diff por Telegram, Slack o Discord.",
						en: "It sends the diff through Telegram, Slack, or Discord.",
					},
				],
			},
		],
	},
		{
			slug: "tarjetly",
			category: "experience",
		order: 3,
		year: 2025,
		client: { es: "Tarjetly · SaaS B2B", en: "Tarjetly · B2B SaaS" },
		liveUrl: "https://tarjetly.com",
		stack: ["React", "TypeScript", "Laravel", "MySQL", "Groq", "Stripe", "GCP"],
		role: { es: "Full Stack Developer", en: "Full Stack Developer" },
		title: { es: "Tarjetly", en: "Tarjetly" },
		tagline: {
			es: "Tarjetas digitales corporativas con pagos e IA aplicada.",
			en: "Corporate digital cards with payments and applied AI.",
		},
		summary: {
			es: "Dashboard para crear y gestionar tarjetas digitales, con suscripciones Stripe y generación de contenido mediante Groq a partir de datos reales.",
			en: "A dashboard for creating and managing digital cards, with Stripe subscriptions and Groq-powered content generated from real profile data.",
		},
		metrics: [
			{ value: "200+", label: { es: "usuarios activos", en: "active users" } },
			{
				value: "2024",
				label: { es: "en producción desde", en: "in production since" },
			},
			{
				value: "2",
				label: { es: "integraciones clave", en: "core integrations" },
			},
		],
		cover: {
			src: "/images/projects/tarjetly-showcase.png",
			width: 1586,
			height: 992,
			alt: {
				es: "Landing de Tarjetly junto a una tarjeta digital mostrada en un teléfono",
				en: "Tarjetly landing page beside a digital card displayed on a phone",
			},
		},
		gallery: [],
		body: [
			{
				kind: "heading",
				text: { es: "Contexto", en: "Context" },
			},
			{
				kind: "para",
				text: {
					es: "Tarjetly permite a profesionales y empresas crear tarjetas digitales, administrar prospectos y reemplazar tarjetas físicas. Es un SaaS B2B con usuarios y pagos reales.",
					en: "Tarjetly lets professionals and companies create digital cards, manage leads, and replace physical cards. It is a B2B SaaS with real users and payments.",
				},
			},
			{
				kind: "heading",
				text: { es: "Responsabilidad", en: "Responsibility" },
			},
			{
				kind: "list",
				items: [
					{
						es: "Dashboard React y TypeScript con editor, onboarding y estados de checkout.",
						en: "React and TypeScript dashboard with an editor, onboarding, and checkout states.",
					},
					{
						es: "API Laravel con Sanctum, roles de equipo y webhooks idempotentes de Stripe.",
						en: "Laravel API with Sanctum, team roles, and idempotent Stripe webhooks.",
					},
					{
						es: "Groq usa datos estructurados del perfil para generar bios y sugerencias predecibles.",
						en: "Groq uses structured profile data to generate predictable bios and suggestions.",
					},
					{
						es: "Playwright cubre los caminos críticos de registro y pago.",
						en: "Playwright covers the critical registration and payment paths.",
					},
				],
			},
			{
				kind: "heading",
				text: { es: "Resultado", en: "Outcome" },
			},
			{
				kind: "para",
				text: {
					es: "Más de 200 usuarios activos, suscripciones de punta a punta e IA aplicada a un problema concreto del producto.",
					en: "More than 200 active users, end-to-end subscriptions, and AI applied to a concrete product problem.",
				},
			},
		],
	},
		{
			slug: "gastly",
			category: "project",
		order: 4,
		year: 2025,
		client: { es: "Producto personal", en: "Personal product" },
		repoUrl: "https://github.com/elmerjacobo97/Gastly",
		stack: [
			"Next.js",
			"React",
			"TypeScript",
			"Supabase",
			"TanStack Query",
			"Tailwind CSS",
			"Recharts",
			"Zod",
		],
		role: { es: "Solo founder · Full Stack", en: "Solo founder · Full Stack" },
		title: { es: "Gastly", en: "Gastly" },
		tagline: {
			es: "Finanzas personales diseñadas alrededor de uso diario real.",
			en: "Personal finance designed around real daily use.",
		},
		summary: {
			es: "Aplicación para controlar transacciones, presupuestos, préstamos, cuotas, ahorro y pagos recurrentes en un solo sistema.",
			en: "An application for managing transactions, budgets, loans, installments, savings, and recurring payments in one system.",
		},
		metrics: [
			{
				value: "11",
				label: { es: "módulos financieros", en: "finance modules" },
			},
			{ value: "Vercel", label: { es: "deploy", en: "deployment" } },
			{
				value: "Diario",
				label: { es: "frecuencia de uso", en: "usage frequency" },
			},
		],
		cover: {
			src: "/images/projects/gastly.png",
			width: 3794,
			height: 1928,
			alt: {
				es: "Dashboard oscuro de Gastly con resumen mensual, pagos y gráficos financieros",
				en: "Gastly dark dashboard with a monthly summary, payments, and finance charts",
			},
		},
		gallery: [],
		body: [
			{
				kind: "heading",
				text: { es: "Motivación", en: "Motivation" },
			},
			{
				kind: "para",
				text: {
					es: "Las apps existentes requerían demasiada configuración o no representaban cómo organizo cuotas, préstamos, gastos fijos y presupuestos por categoría. Construí la herramienta que necesitaba usar.",
					en: "Existing apps required too much setup or did not match how I manage installments, loans, fixed expenses, and category budgets. I built the tool I needed to use.",
				},
			},
			{
				kind: "heading",
				text: { es: "Arquitectura", en: "Architecture" },
			},
			{
				kind: "list",
				items: [
					{
						es: "Next.js 16 con App Router y estructura feature-based por dominio.",
						en: "Next.js 16 with App Router and a domain-based feature structure.",
					},
					{
						es: "Supabase para base de datos y autenticación, separado entre browser, server y proxy.",
						en: "Supabase for database and authentication, split across browser, server, and proxy clients.",
					},
					{
						es: "TanStack Query para estado del servidor y Zod en formularios y acceso a datos.",
						en: "TanStack Query for server state and Zod in forms and the data-access layer.",
					},
					{
						es: "Sistema de diseño propio con tokens documentados para color, tipografía y espaciado.",
						en: "A custom design system with documented color, typography, and spacing tokens.",
					},
				],
			},
		],
	},
		{
			slug: "sismol",
			category: "experience",
		order: 5,
		year: 2024,
		client: { es: "ABEHA · Operaciones", en: "ABEHA · Operations" },
		liveUrl: "https://sismol.c2e.mx/",
		stack: ["React", "TypeScript", "Laravel", "PostgreSQL"],
		role: { es: "Full Stack Developer", en: "Full Stack Developer" },
		title: { es: "Sismol", en: "Sismol" },
		tagline: {
			es: "Panel operativo para sistemas de captación de agua.",
			en: "Operations dashboard for water harvesting systems.",
		},
		summary: {
			es: "Dashboard interno con sensores, métricas, alertas y reportes para centralizar la operación del sistema de captación pluvial de ABEHA.",
			en: "An internal dashboard with sensors, metrics, alerts, and reports that centralizes operations for ABEHA rainwater harvesting systems.",
		},
		metrics: [
			{
				value: "Interno",
				label: { es: "tipo de producto", en: "product type" },
			},
			{
				value: "4",
				label: { es: "tecnologías núcleo", en: "core technologies" },
			},
			{ value: "Producción", label: { es: "estado", en: "status" } },
		],
		cover: {
			src: "/images/projects/sismol.png",
			width: 1288,
			height: 650,
			alt: {
				es: "Dashboard de Sismol con tabla y mapa de sistemas de captación de agua",
				en: "Sismol dashboard with a table and map of water harvesting systems",
			},
		},
		gallery: [],
		body: [
			{
				kind: "heading",
				text: { es: "Necesidad operativa", en: "Operational need" },
			},
			{
				kind: "para",
				text: {
					es: "El equipo técnico necesitaba una vista central de sensores, alertas, métricas de flujo y reportes por período. Mostrar datos no era suficiente: debían servir para tomar decisiones.",
					en: "The technical team needed one view of sensors, alerts, flow metrics, and period reports. Showing data was not enough: it had to support decisions.",
				},
			},
			{
				kind: "heading",
				text: { es: "Qué construí", en: "What I built" },
			},
			{
				kind: "list",
				items: [
					{
						es: "Interfaz React y TypeScript para monitoreo operativo.",
						en: "A React and TypeScript interface for operational monitoring.",
					},
					{
						es: "API Laravel con alertas configurables por umbral.",
						en: "A Laravel API with configurable threshold alerts.",
					},
					{
						es: "Reportes exportables por fechas y sensor.",
						en: "Reports exportable by date range and sensor.",
					},
					{
						es: "Autenticación por roles para diferentes niveles del equipo.",
						en: "Role-based authentication for different team access levels.",
					},
				],
			},
		],
	},
];

export const personalProjects = () =>
	projects
		.filter((project) => project.category === "project")
		.sort((a, b) => a.order - b.order);

export const professionalProjects = () =>
	projects
		.filter((project) => project.category === "experience")
		.sort((a, b) => a.order - b.order);
