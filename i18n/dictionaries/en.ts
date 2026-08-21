import type { Dictionary } from "../dictionary";

const en = {
  meta: {
    title: "Elmer Jacobo — Product engineer · Full-stack developer",
    description:
      "Product engineer and full-stack developer in Trujillo, Peru. I build digital products across frontend, backend, payments, deployment, and applied AI.",
    ogAlt: "Elmer Jacobo, product engineer and full-stack developer",
  },

  nav: {
    services: "What I build",
    projects: "Projects",
    experience: "Experience",
    process: "How I work",
    about: "About",
    contact: "Contact",
    collaborate: "Collaborate",
    blog: "Blog",
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
    statement: "I build digital products that move from idea to real use.",
    supporting:
      "I work with you from product definition to launch: interface, product logic, payments, and a foundation your team can maintain. I use AI when it solves a concrete task.",
    meta: ["Trujillo, PE", "Remote · UTC−5"],
    available: "Let's talk about your product",
    projectsCta: "View projects",
    scroll: "Explore",
    artifactLabel: "From problem to product",
    artifactKind: "Method",
    artifactStatus: "Each step leaves a visible decision",
    artifactSteps: ["Problem", "Decision", "Build", "Launch"],
  },

  ticker: {
    label: "Stack",
  },

  projects: {
    index: "01",
    title: "Projects",
    lead: "These are products I built by my own initiative or published as open source. They show how I think and how I work.",
    openProject: "Open project",
  },

  experience: {
    index: "02",
    title: "Experience",
    lead: "Products I have contributed to professionally. I show my responsibility and context without presenting them as personal property.",
    contribution: "Professional contribution",
    role: "Role",
    openProject: "Open project",
  },

  about: {
    index: "03",
    title: "Approach",
    bio: [
      "I work with people who need to build, improve, or put an existing digital product in order. I connect a business decision to a clear interface and a technical foundation the team can maintain.",
      "I have spent more than four years building web and mobile products in production. I have worked on admin dashboards, SaaS products, APIs, payments, and internal tools. I like working close to the person who knows the business, not only the codebase.",
      "In my current work, I have led architecture decisions for a SaaS platform with more than 200 active users. I migrated a Laravel backend from version 9 to 12, integrated Stripe, and built dashboards the team uses to run the business.",
      "I have also worked directly with clients to turn requirements into UI improvements without making the existing code harder to work with. I can join to define a first scope, improve a product that already has users, or prepare a backend that has become difficult to change.",
      "I like to start with a concrete problem and enough context to discuss decisions. You do not need everything figured out. You do need to explain what you want to build or what is slowing the product down.",
    ],
    stats: [
      { value: "4+", label: "years building" },
      { value: "380+", label: "active users" },
      { value: "2", label: "products in production" },
    ],
    portraitAlt: "Portrait of Elmer Jacobo Otiniano",
  },

  services: {
    index: "04",
    title: "Services",
    lead: "I can join when the product still needs direction, when it is already running, or when a technical decision is slowing the team down. We can also start with a focused session to define the next step.",
    modeLabel: "Mode",
    deliverables: "What stays",
    fitTitle: "A good fit if...",
    fit: [
      "You can explain the problem you want to solve.",
      "There is context and unfinished decisions to review together.",
      "You want a clear decision before committing to development.",
    ],
  },

	ai: {
		index: "06",
		title: "AI",
		lead: "AI makes sense when it improves one concrete part of the product or the team's work. We define the task first, then choose between an integration, an agent, or a skill.",
		positionLabel: "How I work",
		positionTitle: "I start with the task",
		positionBody:
			"If you already have a product, I look for a step where AI can remove work or improve a response. If the work is internal, I design the agent or skill with context, limits, and review.",
		cta: "Tell me what you want to improve",
		items: [
			{
				title: "AI inside the product",
				body: "I integrate assistants, content generation, or data extraction into the steps your customer already uses. The result belongs inside the product, not in a separate demo.",
			},
			{
				title: "Agents for operations",
				body: "I build agents that find information, use tools, or prepare a first response. Each action has clear limits and a review step before it affects the system.",
			},
			{
				title: "Skills for your team",
				body: "I turn repeated tasks into versioned skills with context and review steps. The team can work with agents without relying on a prompt lost in chat.",
			},
    ],
  },

  process: {
    index: "07",
    title: "Process",
    lead: "I show you the work as it happens. We discuss changes before they become code, and every week you have something you can open.",
  },

  principles: {
    index: "08",
    title: "Principles",
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
    index: "09",
    title: "Evidence",
    lead: "These are concrete responsibilities: architecture, migrations, payments, and day-to-day product work.",
    facts: [
      {
        label: "Architecture and PRs",
        detail:
          "I review PRs, make architecture decisions, and coordinate directly with technical leadership.",
      },
      {
        label: "Change without slowing down",
        detail:
          "At Tarjetly, I migrated the backend from Laravel 9 to 12 and reworked its architecture while the product kept moving.",
      },
      {
        label: "Recurring Stripe",
        detail:
          "I implemented subscriptions, payment states, and admin dashboards connected to the business.",
      },
      {
        label: "AI applied in SaaS",
        detail:
          "I integrated Groq into Tarjetly to generate bios and suggestions from structured data inside the product's real workflow.",
      },
      {
        label: "200+ active users",
        detail:
          "Tarjetly has more than 200 active users; this experience explains what I built and which decisions I made.",
      },
    ],
  },

  contact: {
    index: "10",
    title: "Contact",
    lead: "Tell me what you want to build, improve, or unblock. I reply within 24 hours.",
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
        "Product unblock session",
        "AI in a product or automation",
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
    marquee: [
      "Let's talk about your product",
      "From idea to production",
      "Improve what already exists",
      "Bring order to the backend",
      "Clear decisions, code that holds up",
    ],
    localTime: "Local time",
    social: "Social",
    rights: "All rights reserved",
    builtWith: "Next.js · GSAP · Tailwind",
  },

  blog: {
    index: "05",
    title: "Blog",
    lead: "I write about how digital products get built and kept alive: decisions, costs, and process for small and mid-sized businesses.",
    searchLabel: "Search articles",
    searchPlaceholder: "Title, topic, or technology...",
    clearSearch: "Clear search",
    noResults: "No articles match that search.",
    empty: "No posts yet.",
    readPost: "Read article",
    backToBlog: "Back to blog",
    readingUnit: "min read",
    ctaTitle: "Let's talk about your product?",
    ctaBody:
      "If you want to build, improve, or review a digital product, tell me about your case and I will reply within 24 hours.",
    cta: "Tell me about your case",
    ctaSubject: "I read your blog and want to talk about my product",
    ctaPrefill:
      "Hi Elmer,\n\nI found your blog and I'd like to talk about a product I want to build or improve.\n\n",
    ogAlt: "Elmer Jacobo's blog on digital products for businesses",
  },

  notFound: {
    title: "Page not found",
    body: "The route you are looking for does not exist or was renamed.",
    cta: "Back home",
  },
} as const satisfies Dictionary;

export default en;
