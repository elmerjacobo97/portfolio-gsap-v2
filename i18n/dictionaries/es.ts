const es = {
	meta: {
		title: "Elmer Jacobo — Product engineer · Full stack",
		description:
			"Construyo productos digitales que llegan a producción. Trabajo en frontend, backend, pagos y despliegue.",
		ogAlt: "Elmer Jacobo — Product engineer · Full stack",
	},

	nav: {
		services: "Qué construyo",
		work: "Trabajo",
		now: "Ahora",
		process: "Cómo trabajo",
		about: "Sobre mí",
		contact: "Contacto",
		collaborate: "Colaborar",
		menu: "Menú",
		close: "Cerrar",
		skipToContent: "Saltar al contenido",
		switchTo: "Ver en inglés",
	},

	hero: {
		lineOne: "Elmer",
		lineTwo: "Jacobo",
		role: "Product engineer · Full stack",
		statement: "Construyo productos digitales que llegan a producción.",
		supporting:
			"Trabajo en frontend, backend, pagos y despliegue. La idea es que el producto funcione cuando deja de ser una demo.",
		meta: ["Trujillo, PE", "+4 años", "React · Next.js · Laravel"],
		available: "Hablemos de tu producto",
		projectsCta: "Ver proyectos",
		contactCta: "Cuéntame tu proyecto",
		scroll: "Explorar",
		artifactLabel: "De problema a deploy",
		artifactKind: "Método",
		artifactStatus: "Cada paso deja una decisión visible",
		artifactSteps: ["Problema", "Decisión", "Código", "Deploy"],
	},

	ticker: {
		label: "Stack",
	},

	work: {
		index: "01",
		title: "Trabajo seleccionado",
		lead: "Aquí reúno productos que he construido, mantenido o llevado a producción. En cada caso cuento qué hice y qué decisiones tomé.",
		viewCase: "Ver caso",
		role: "Rol",
		year: "Año",
		client: "Contexto",
		stack: "Stack",
		caseLabel: "Caso",
		liveSite: "Sitio en vivo",
		repository: "Repositorio",
		nextCase: "Siguiente caso",
		backWork: "Volver al trabajo",
	},

	now: {
		index: "02",
		title: "Ahora / Laboratorio",
		lead: "Algunas cosas que estoy construyendo o manteniendo fuera del trabajo de clientes.",
		openLink: "Abrir proyecto",
	},

	about: {
		index: "03",
		title: "Sobre mí",
		bio: [
			"Llevo más de cuatro años construyendo aplicaciones web y móviles. He trabajado con productos que tienen usuarios, pagos y operaciones que no pueden detenerse.",
			"En mi trabajo actual lidero técnicamente el desarrollo de una plataforma SaaS de tarjetas digitales: reviso PRs, tomo decisiones de arquitectura y coordino directamente con el liderazgo técnico.",
			"Migré ese backend de Laravel 9 a 12, rediseñé su arquitectura, integré Stripe para suscripciones recurrentes y construí los paneles administrativos que sostienen las métricas del negocio.",
			"Me interesan los productos donde hay que conectar una decisión de negocio con una interfaz, una API y un deploy que alguien pueda mantener.",
			"Trabajo mejor cuando hay un problema concreto, acceso al contexto y disposición para hablar de decisiones antes de escribir código.",
		],
		stats: [
			{ value: "4+", label: "años construyendo producto" },
			{ value: "200+", label: "usuarios activos en Tarjetly" },
			{ value: "Laravel 9 → 12", label: "migración de backend" },
		],
		portraitAlt: "Retrato de Elmer Jacobo Otiniano",
	},

	services: {
		index: "04",
		title: "Qué construyo",
		lead: "Puedo entrar cuando todavía hay que decidir qué construir, cuando el producto ya existe o cuando el backend empieza a frenar al equipo. Trabajamos directo, con las decisiones sobre la mesa.",
		modeLabel: "Modo",
		deliverables: "Qué queda",
		fitTitle: "Buen encaje si...",
		fit: [
			"Puedes explicar qué problema quieres resolver.",
			"Hay contexto y decisiones pendientes para revisar juntos.",
			"Quieres hablar directamente con quien va a construirlo.",
		],
	},

	process: {
		index: "05",
		title: "Cómo trabajo",
		lead: "Te enseño el trabajo mientras ocurre. Hablamos de los cambios antes de convertirlos en código y cada semana tienes algo que puedes abrir.",
	},

	principles: {
		index: "06",
		title: "Principios de trabajo",
		lead: "Son las reglas que uso para trabajar con producto y código.",
		items: [
			{
				title: "Pongo las decisiones sobre la mesa",
				body: "Explico qué cambia, qué riesgo veo y qué alternativa descarto antes de convertirlo en código.",
			},
			{
				title: "Entrego algo que puedas abrir",
				body: "Trabajo en entregas visibles para que puedas revisar el producto, no solo recibir un resumen al final.",
			},
			{
				title: "Distingo mi trabajo del del equipo",
				body: "Digo qué hice yo, qué resolvió el equipo y dónde queda la responsabilidad de cada decisión.",
			},
			{
				title: "Dejo el siguiente paso claro",
				body: "Al cerrar una entrega, dejo el código, el deploy y las decisiones documentadas para que el próximo cambio tenga un punto de partida.",
			},
		],
	},

	proof: {
		index: "07",
		title: "Evidencia",
		lead: "Lo que aparece aquí son responsabilidades concretas: arquitectura, migraciones, pagos y trabajo diario con producto.",
		facts: [
			{
				label: "Arquitectura y PRs",
				detail:
					"Reviso PRs, tomo decisiones de arquitectura y coordino directamente con el liderazgo técnico.",
			},
			{
				label: "Laravel 9 → 12",
				detail:
					"Migré el backend de Tarjetly y rediseñé su arquitectura mientras el producto seguía avanzando.",
			},
			{
				label: "Stripe recurrente",
				detail:
					"Implementé suscripciones, estados de pago y paneles administrativos conectados al negocio.",
			},
			{
				label: "200+ usuarios activos",
				detail:
					"Tarjetly tiene más de 200 usuarios activos; el caso explica qué construí y qué decisiones tomé.",
			},
		],
	},

	contact: {
		index: "08",
		title: "Cuéntame tu proyecto",
		lead: "Cuéntame qué quieres construir. Respondo en menos de 24 horas.",
		channelsTitle: "Canales directos",
		whatsapp: "WhatsApp",
		booking: "Agendar 30 min",
		email: "contacto@elmerjacobo.dev",
		whatsappPrefill:
			"Hola Elmer, vi tu portafolio y quiero conversar sobre un proyecto.",
		form: {
			name: "Nombre",
			email: "Email",
			company: "Empresa",
			scope: "Qué necesitas resolver",
			scopeOptions: [
				"Producto nuevo",
				"Producto existente",
				"Backend y arquitectura",
				"Todavía lo estoy definiendo",
			],
			message: "Cuéntame qué quieres resolver",
			submit: "Enviar mensaje",
			sending: "Enviando mensaje",
			sendingHint: "El envío seguro está en curso",
			successTitle: "Mensaje enviado",
			successBody: "Te respondo en menos de 24 horas. Gracias por escribir.",
			responseLabel: "Siguiente paso",
			responseValue:
				"Recibirás una respuesta personal, no una secuencia automática.",
			errorGeneric:
				"No pudimos enviar el mensaje. Escríbeme por WhatsApp o email.",
			errors: {
				nameMin: "Escribe tu nombre",
				emailInvalid: "Email inválido",
				messageMin: "Cuéntame un poco más (mínimo 20 caracteres)",
				tooFast: "Muy rápido. Intenta de nuevo.",
				rateLimit: "Demasiados envíos. Intenta más tarde.",
			},
		},
	},

	footer: {
		marquee: "Hablemos de tu producto",
		localTime: "Hora local",
		social: "Redes",
		rights: "Todos los derechos reservados",
		builtWith: "Next.js · GSAP · Tailwind",
	},

	notFound: {
		title: "Página no encontrada",
		body: "La ruta que buscas no existe o cambió de nombre.",
		cta: "Volver al inicio",
	},
} as const;

export default es;
