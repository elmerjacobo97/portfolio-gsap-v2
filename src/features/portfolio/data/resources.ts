import type { Localized } from "@/shared/i18n/t";

export type Resource = {
	slug: string;
	category: string;
	title: Localized;
	description: Localized;
	tags: readonly string[];
	/** Path under `public/`. */
	file: string;
	sizeKb: number;
	pages: number;
};

export const resources: readonly Resource[] = [
	{
		slug: "claude-code-cheatsheet",
		category: "Claude Code",
		title: {
			es: "Claude Code: guía de comandos",
			en: "Claude Code: command cheatsheet",
		},
		description: {
			es: "Referencia rápida con slash commands, atajos de teclado, modos de permisos, skills, hooks y MCP para trabajar con Claude Code desde la terminal.",
			en: "Quick reference with slash commands, keyboard shortcuts, permission modes, skills, hooks, and MCP for working with Claude Code from the terminal.",
		},
		tags: ["CLI", "Slash commands", "Skills", "MCP"],
		file: "/resources/claude-code-cheatsheet.pdf",
		sizeKb: 238,
		pages: 3,
	},
	{
		slug: "opencode-cheatsheet",
		category: "OpenCode",
		title: {
			es: "OpenCode: guía de comandos",
			en: "OpenCode: command cheatsheet",
		},
		description: {
			es: "Referencia rápida con slash commands, atajos del prompt, agentes y permisos, configuración y flujo recomendado para trabajar con OpenCode desde la terminal.",
			en: "Quick reference with slash commands, prompt shortcuts, agents and permissions, configuration, and a recommended workflow for working with OpenCode from the terminal.",
		},
		tags: ["CLI", "Slash commands", "Agents", "Config"],
		file: "/resources/opencode-cheatsheet.pdf",
		sizeKb: 227,
		pages: 3,
	},
	{
		slug: "laravel-13-cheatsheet",
		category: "Laravel",
		title: {
			es: "Laravel 13: guía rápida",
			en: "Laravel 13: cheatsheet",
		},
		description: {
			es: "Referencia rápida con comandos Artisan, rutas, Eloquent, validación, colas y testing para trabajar con Laravel 13.",
			en: "Quick reference with Artisan commands, routing, Eloquent, validation, queues, and testing for working with Laravel 13.",
		},
		tags: ["PHP", "Artisan", "Eloquent", "Testing"],
		file: "/resources/laravel-13-cheatsheet.pdf",
		sizeKb: 148,
		pages: 3,
	},
];
