import type { Localized } from "@/shared/i18n/t";

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
			es: "Hablamos de lo que vendes, de quién lo usa y de qué te está frenando. Salgo de esa conversación con el alcance por escrito y las preguntas que aún faltan por resolver.",
			en: "We talk about what you sell, who uses it, and what is slowing you down. I leave that conversation with the scope in writing and the questions we still need to answer.",
		},
	},
	{
		code: "02",
		title: { es: "Decidir cómo se construye", en: "Decide how it gets built" },
		body: {
			es: "Elijo las tecnologías según lo que tu proyecto necesita soportar. Te explico cada decisión, cuánto cuesta y qué queda preparado para después.",
			en: "I choose the technologies based on what your project needs to handle. I explain each decision, what it costs, and what I would leave ready for later.",
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
		title: { es: "Entregar y acompañar", en: "Deliver and support" },
		body: {
			es: "Dejo el proyecto publicado con tu dominio, con seguimiento para que siga funcionando y el código documentado en tu cuenta. Después acordamos si sigo dando mantenimiento o si lo toma tu equipo.",
			en: "I leave the project published on your domain, monitored so it keeps working, with the code documented in your account. Then we agree on whether I keep maintaining it or your team takes over.",
		},
	},
];
