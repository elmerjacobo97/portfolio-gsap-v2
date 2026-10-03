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
    activityLabel: "GitHub activity",
    activitySummary: "contributions in the last year",
    activityCta: "View GitHub profile",
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
      "I have spent more than {years} years building web and mobile products in production: dashboards, SaaS products, APIs, payments, and internal tools. In my current work I have led architecture decisions for a SaaS platform with more than 200 active users, migrated its backend from Laravel 9 to 12, and integrated Stripe.",
      "I can join to define a first scope, improve a product that already has users, or prepare a backend that has become hard to change. You do not need everything figured out; you do need to explain what you want to build or what is slowing the product down.",
    ],
    stats: [
      { value: "{years}+", label: "years building" },
      { value: "380+", label: "active users across products" },
      { value: "2+", label: "products in production" },
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

  process: {
    index: "05",
    title: "Process",
    lead: "I show you the work as it happens. We discuss changes before they become code, and every week you have something you can open.",
  },

  testimonials: {
    index: "06",
    title: "What they say",
    lead: "References from people I have worked with: what they saw in my work, how we collaborated, and what changed in the projects we built together.",
    source: "View original",
  },

  faq: {
    index: "06",
    title: "Questions",
    lead: "What people usually ask before we start: how I work, how long it takes, what I need from you, and how we agree on scope and delivery.",
  },

  contact: {
    index: "07",
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
      privacyNote: "I use your details only to reply. Nothing is shared.",
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
        expired: "The form session expired. Please submit again.",
        rateLimit: "Too many submissions. Try again later.",
      },
    },
  },

  footer: {
    marquee: [
      "Tell me about your case",
      "New or existing product",
      "One session to unblock",
      "Reply within 24 hours",
      "Remote from Trujillo",
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
    allCategories: "All",
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
