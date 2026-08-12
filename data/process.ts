import type { Localized } from "@/i18n/t";

export type ProcessStep = {
	code: string;
	title: Localized;
	body: Localized;
};

export const processSteps: readonly ProcessStep[] = [
	{
		code: "01",
		title: { es: "Entender el problema", en: "Understand the problem" },
		body: {
			es: "Hablamos de lo que vendes, de quién lo usa y de qué está frenando el producto. Salgo de esa conversación con el alcance escrito y las preguntas que todavía tenemos que resolver.",
			en: "We talk about what you sell, who uses it, and what is holding the product back. I leave that conversation with the scope written down and the questions we still need to answer.",
		},
	},
	{
		code: "02",
		title: { es: "Decidir la arquitectura", en: "Decide the architecture" },
		body: {
			es: "Elijo el stack según lo que el producto tiene que soportar. Te explico cada decisión, el coste que tiene y qué dejaría preparado para después.",
			en: "I choose the stack based on what the product needs to support. I explain each decision, its cost, and what I would leave ready for later.",
		},
	},
	{
		code: "03",
		title: { es: "Construir a la vista", en: "Build in the open" },
		body: {
			es: "Te enseño el trabajo mientras ocurre. Hablamos de los cambios antes de convertirlos en código y cada semana tienes algo que puedes abrir.",
			en: "I show you the work as it happens. We discuss changes before they become code, and every week you have something you can open.",
		},
	},
	{
		code: "04",
		title: { es: "Entregar y sostener", en: "Ship and support" },
		body: {
			es: "Dejo el deploy, el dominio, el monitoreo y el código documentado en tu repositorio. Después acordamos si sigo manteniéndolo o si lo toma tu equipo.",
			en: "I leave the deployment, domain, monitoring, and documented code in your repository. Then we agree on whether I keep maintaining it or your team takes over.",
		},
	},
];
