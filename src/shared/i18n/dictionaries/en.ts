import type { Dictionary } from "../dictionary";

const en = {
  meta: {
    title: "Elmer Jacobo — Full-stack developer · Web, apps & software",
    description:
      "Freelance full-stack developer in Trujillo, Peru, working with clients in Latin America and remotely. I build landing pages, websites, mobile apps, and custom software.",
    ogAlt: "Elmer Jacobo, freelance full-stack developer: websites, mobile apps, and software",
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
    role: "Full-stack developer",
    statement: "I build landing pages, websites, mobile apps, and custom software for businesses.",
    supporting:
      "I work with you from idea to launch: design, development, payments, and a foundation your team can maintain. Freelance, remote from Peru.",
    meta: ["Trujillo, PE", "Remote · UTC−5"],
    available: "Available for projects",
    whatsappCta: "Message me on WhatsApp",
    projectsCta: "View projects",
    trust: [
      { value: "{years}+", label: "years building" },
      { value: "380+", label: "active users" },
      { value: "3", label: "countries with an app" },
    ],
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
    index: "04",
    title: "Projects",
    lead: "Personal and open-source projects. They show how I think and work when I build software.",
    openProject: "Open project",
    activityLabel: "GitHub activity",
    activitySummary: "contributions in the last year",
    activityCta: "View GitHub profile",
  },

  experience: {
    index: "03",
    title: "Experience",
    lead: "Products from companies and clients I worked on. I explain what I did in each one.",
    contribution: "Professional contribution",
    role: "Role",
    openProject: "Open project",
  },

  about: {
    index: "05",
    title: "About",
    bio: [
      "I work with businesses and founders who need a website, an app, or a system. I connect a business decision to a clear interface and a technical foundation the team can maintain.",
      "I have spent more than {years} years building web and mobile products that people use every day: dashboards, subscription platforms, payments, and internal tools. In my current work I led technical decisions for a platform with more than 200 active users, updated its technical base, and integrated Stripe payments.",
      "I can join to define a first version, improve something that already has users, or bring order to a system that keeps getting harder to change. You do not need everything figured out; just tell me what you want to achieve or what is slowing you down.",
    ],
    stats: [
      { value: "{years}+", label: "years building" },
      { value: "380+", label: "active users" },
      { value: "2+", label: "products in production" },
    ],
    portraitAlt: "Portrait of Elmer Jacobo Otiniano",
  },

  services: {
    index: "01",
    title: "Services",
    lead: "I choose the delivery based on what your business needs: from a landing page to a custom system. We can also start with a short session to define what will be done.",
    modeLabel: "Service",
    deliverables: "What is included",
    fitTitle: "A good fit if...",
    fit: [
      "You can explain the problem you want to solve.",
      "There is context and unfinished decisions to review together.",
      "You want to be clear on what will be built before paying for development.",
    ],
  },

  process: {
    index: "02",
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
    lead: "What people usually ask before we start: how I work, how long it takes, what I need from you, and how we agree on what gets delivered and when.",
  },

  contact: {
    index: "07",
    title: "Contact",
    lead: "Tell me what you want to build, improve, or fix. I reply within 24 hours.",
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
        "Landing page or website",
        "Mobile app",
        "Custom system",
        "Payments, integrations, and internal systems",
        "AI or automation",
        "Consulting session",
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
      "Landing, website, app, or system",
      "Consulting session",
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
    ctaTitle: "Let's talk about your project?",
    ctaBody:
      "If you need a website, an app, or a system, tell me about your case and I will reply within 24 hours.",
    cta: "Tell me about your case",
    ctaSubject: "I read your blog and want to talk about my project",
    ctaPrefill:
      "Hi Elmer,\n\nI found your blog and I'd like to talk about a project I want to build or improve.\n\n",
    ogAlt: "Elmer Jacobo's blog on websites, apps, and software for businesses",
  },

  notFound: {
    title: "Page not found",
    body: "The route you are looking for does not exist or was renamed.",
    cta: "Back home",
  },
} as const satisfies Dictionary;

export default en;
