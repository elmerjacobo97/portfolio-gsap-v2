import type { Dictionary } from "../dictionary";

const en = {
	meta: {
		title: "Elmer Jacobo — Product engineer · Full stack",
		description:
			"I build digital products that make it to production. I work across frontend, backend, payments, and deployment.",
		ogAlt: "Elmer Jacobo — Product engineer · Full stack",
	},

	nav: {
		services: "What I build",
		work: "Work",
		now: "Now",
		process: "How I work",
		about: "About",
		contact: "Contact",
		collaborate: "Collaborate",
		menu: "Menu",
		close: "Close",
		skipToContent: "Skip to content",
		switchTo: "View in Spanish",
		theme: "Change theme",
		activateLight: "Activate light mode",
		activateDark: "Activate dark mode",
	},

	hero: {
		lineOne: "Elmer",
		lineTwo: "Jacobo",
		role: "Product engineer · Full stack",
		statement: "I build digital products that make it to production.",
		supporting:
			"I work across frontend, backend, payments, and deployment. The point is to make the product work after it stops being a demo.",
		meta: ["Trujillo, PE", "4+ years", "React · Next.js · Laravel"],
		available: "Let's talk about your product",
		projectsCta: "View projects",
		contactCta: "Tell me about your project",
		scroll: "Explore",
		artifactLabel: "From problem to deploy",
		artifactKind: "Method",
		artifactStatus: "Each step leaves a visible decision",
		artifactSteps: ["Problem", "Decision", "Code", "Deploy"],
	},

	ticker: {
		label: "Stack",
	},

	work: {
		index: "01",
		title: "Selected work",
		lead: "These are products I have built, maintained, or taken to production. Each case explains what I did and why I made those decisions.",
		viewCase: "View case",
		role: "Role",
		year: "Year",
		client: "Context",
		stack: "Stack",
		caseLabel: "Case",
		liveSite: "Live site",
		repository: "Repository",
		nextCase: "Next case",
		backWork: "Back to work",
	},

	now: {
		index: "02",
		title: "Now / Lab",
		lead: "A few things I am building or maintaining outside client work.",
		openLink: "Open project",
	},

	about: {
		index: "03",
		title: "About",
		bio: [
			"I have spent more than four years building web and mobile applications. I have worked on products with users, payments, and operations that cannot simply stop.",
			"In my current work I tech-lead a digital business-card SaaS platform: I review PRs, make architecture decisions, and coordinate directly with technical leadership.",
			"I migrated that backend from Laravel 9 to 12, redesigned its architecture, integrated Stripe for recurring subscriptions, and built the admin dashboards that hold up the business metrics.",
			"I am interested in products where a business decision has to become an interface, an API, and a deployment someone else can maintain.",
			"I work best when there is a concrete problem, access to the context, and a willingness to discuss decisions before code is written.",
		],
		stats: [
			{ value: "4+", label: "years building products" },
			{ value: "200+", label: "active users on Tarjetly" },
			{ value: "Laravel 9 → 12", label: "backend migration" },
		],
		portraitAlt: "Portrait of Elmer Jacobo Otiniano",
	},

	services: {
		index: "04",
		title: "What I build",
		lead: "I can join when the product still needs direction, when it is already running, or when the backend starts slowing the team down. We work directly, with the decisions on the table.",
		modeLabel: "Mode",
		deliverables: "What stays",
		fitTitle: "A good fit if...",
		fit: [
			"You can explain the problem you want to solve.",
			"There is context and unfinished decisions to review together.",
			"You want to speak directly with the person building it.",
		],
	},

	process: {
		index: "05",
		title: "How I work",
		lead: "I show you the work as it happens. We discuss changes before they become code, and every week you have something you can open.",
	},

	principles: {
		index: "06",
		title: "Working principles",
		lead: "These are the rules I use when working with product and code.",
		items: [
			{
				title: "I put decisions on the table",
				body: "I explain what changes, what risk I see, and which alternative I am ruling out before it becomes code.",
			},
			{
				title: "I deliver something you can open",
				body: "I work in visible deliveries so you can review the product instead of receiving only a summary at the end.",
			},
			{
				title: "I separate my work from the team’s",
				body: "I say what I did, what the team solved, and where responsibility for each decision sits.",
			},
			{
				title: "I leave the next step clear",
				body: "At the end of a delivery, I leave the code, deployment, and decisions documented so the next change has a starting point.",
			},
		],
	},

	proof: {
		index: "07",
		title: "Evidence",
		lead: "These are concrete responsibilities: architecture, migrations, payments, and day-to-day product work.",
		facts: [
			{
				label: "Architecture and PRs",
				detail:
					"I review PRs, make architecture decisions, and coordinate directly with technical leadership.",
			},
			{
				label: "Laravel 9 → 12",
				detail:
					"I migrated Tarjetly’s backend and redesigned its architecture while the product kept moving.",
			},
			{
				label: "Recurring Stripe",
				detail:
					"I implemented subscriptions, payment states, and admin dashboards connected to the business.",
			},
			{
				label: "200+ active users",
				detail:
					"Tarjetly has more than 200 active users; the case explains what I built and which decisions I made.",
			},
		],
	},

	contact: {
		index: "08",
		title: "Tell me about your project",
		lead: "Tell me what you want to build. I reply within 24 hours.",
		channelsTitle: "Direct channels",
		whatsapp: "WhatsApp",
		booking: "Book 30 min",
		email: "contacto@elmerjacobo.dev",
		whatsappPrefill:
			"Hi Elmer, I saw your portfolio and I would like to talk about a project.",
		form: {
			name: "Name",
			email: "Email",
			company: "Company",
			scope: "What needs solving",
			scopeOptions: [
				"New product",
				"Existing product",
				"Backend and architecture",
				"I am still defining it",
			],
			message: "Tell me what you want to solve",
			submit: "Send message",
			sending: "Sending message",
			sendingHint: "Secure delivery is in progress",
			successTitle: "Message sent",
			successBody:
				"I will get back to you within 24 hours. Thanks for writing.",
			responseLabel: "Next step",
			responseValue:
				"You will receive a personal reply, not an automated sequence.",
			errorGeneric:
				"The message could not be sent. Reach me on WhatsApp or email.",
			errors: {
				nameMin: "Enter your name",
				emailInvalid: "Invalid email",
				messageMin: "Tell me a bit more (20 characters minimum)",
				tooFast: "Too fast. Please try again.",
				rateLimit: "Too many submissions. Try again later.",
			},
		},
	},

	footer: {
		marquee: "Let's talk about your product",
		localTime: "Local time",
		social: "Social",
		rights: "All rights reserved",
		builtWith: "Next.js · GSAP · Tailwind",
	},

	notFound: {
		title: "Page not found",
		body: "The route you are looking for does not exist or was renamed.",
		cta: "Back home",
	},
} as const satisfies Dictionary;

export default en;
