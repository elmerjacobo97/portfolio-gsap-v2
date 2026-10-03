import type { Localized } from "@/shared/i18n/t";

export type FaqItem = {
	code: string;
	question: Localized;
	answer: Localized;
};

export const faq: readonly FaqItem[] = [
	{
		code: "01",
		question: {
			es: "¿Cómo trabajamos juntos?",
			en: "How do we work together?",
		},
		answer: {
			es: "Hay tres formas de empezar: una sesión puntual para destrabar una decisión, un alcance cerrado para construir o mejorar algo concreto, o trabajo continuo por semanas cuando el producto ya está en marcha. Lo definimos en la primera conversación.",
			en: "There are three ways to start: a focused session to unblock a decision, a fixed scope to build or improve something specific, or ongoing weekly work when the product is already moving. We define it in the first conversation.",
		},
	},
	{
		code: "02",
		question: {
			es: "¿Cuánto cuesta y cuánto tarda?",
			en: "How much does it cost and how long does it take?",
		},
		answer: {
			es: "Depende del alcance, por eso no publico tarifas fijas. Después de la primera conversación te envío un alcance escrito con tiempos y costo antes de empezar. Si algo cambia en el camino, lo hablamos antes de escribir código.",
			en: "It depends on scope, so I do not publish fixed rates. After the first conversation I send a written scope with timing and cost before starting. If something changes along the way, we discuss it before writing code.",
		},
	},
	{
		code: "03",
		question: {
			es: "¿Qué necesito tener listo para escribirte?",
			en: "What do I need before reaching out?",
		},
		answer: {
			es: "Solo poder explicar qué quieres construir o qué está frenando tu producto. No necesitas diseños, especificaciones ni stack definido; eso lo ordenamos juntos.",
			en: "You only need to explain what you want to build or what is holding your product back. You do not need designs, specs, or a chosen stack; we sort that out together.",
		},
	},
	{
		code: "04",
		question: {
			es: "¿Puedes trabajar sobre un producto que ya existe?",
			en: "Can you work on a product that already exists?",
		},
		answer: {
			es: "Sí. Empiezo revisando el flujo y el código para ver dónde se acumula el problema, y entrego los cambios por partes para que puedas revisarlos.",
			en: "Yes. I start by reviewing the flow and the code to see where the problem accumulates, and I deliver changes in parts so you can review them.",
		},
	},
	{
		code: "05",
		question: {
			es: "¿Qué pasa cuando termina el proyecto?",
			en: "What happens when the project ends?",
		},
		answer: {
			es: "Recibes el código en tu repositorio, el deploy funcionando y las decisiones documentadas. Después acordamos si sigo dando mantenimiento o si lo toma tu equipo.",
			en: "You get the code in your repository, a working deployment, and the decisions documented. Then we agree on whether I keep maintaining it or your team takes over.",
		},
	},
	{
		code: "06",
		question: {
			es: "¿En qué idioma y horario trabajas?",
			en: "What language and hours do you work in?",
		},
		answer: {
			es: "Atiendo en español y trabajo en remoto desde Trujillo, Perú (UTC−5). Si tu equipo trabaja en inglés, escríbeme y vemos cómo coordinarnos por escrito.",
			en: "I work in Spanish and remotely from Trujillo, Peru (UTC−5). If your team works in English, write to me and we will work out how to coordinate in writing.",
		},
	},
];
