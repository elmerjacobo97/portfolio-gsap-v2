import type { Dictionary } from '../dictionary'

const en = {
  meta: {
    title: 'Elmer Jacobo — Full Stack Developer',
    description:
      'I design and build web products that make money: end-to-end SaaS with authentication, Stripe subscriptions, admin dashboards and deployment. React, Next.js and Laravel.',
    ogAlt: 'Elmer Jacobo — Full Stack Developer',
  },

  nav: {
    services: 'Services',
    work: 'Work',
    process: 'Process',
    about: 'About',
    contact: 'Contact',
    menu: 'Menu',
    close: 'Close',
    skipToContent: 'Skip to content',
    switchTo: 'View in Spanish',
  },

  hero: {
    lineOne: 'Elmer',
    lineTwo: 'Jacobo',
    role: 'Full Stack Developer',
    statement: 'I build web products that make money.',
    meta: ['Trujillo, PE', '4+ years', 'React — Next — Laravel'],
    available: 'Available for work',
    scroll: 'Scroll',
  },

  ticker: {
    label: 'Stack',
  },

  services: {
    index: '01',
    title: 'Services',
    lead: 'Four ways to work together. No templates, no agency middleman — you talk straight to the person writing the code.',
    expand: 'See deliverables',
    collapse: 'Close',
    deliverables: 'Includes',
  },

  work: {
    index: '02',
    title: 'Selected work',
    lead: 'Products running in production, not weekend experiments.',
    viewCase: 'View case',
    allProjects: 'All projects',
    role: 'Role',
    year: 'Year',
    client: 'Client',
    stack: 'Stack',
    liveSite: 'Live site',
    repository: 'Repository',
    nextCase: 'Next case',
    backHome: 'Back home',
  },

  process: {
    index: '03',
    title: 'How I work',
    lead: 'A short, honest process. You always know exactly where we are.',
  },

  about: {
    index: '04',
    title: 'About',
    bio: [
      'For over four years I have been building web and mobile applications that live in production, with real users and real money on the line.',
      'Today I tech-lead a digital business-card SaaS platform: I review PRs, make the architecture calls, and work autonomously coordinating directly with technical leadership.',
      'I migrated that backend from Laravel 9 to 12, redesigned its architecture, integrated Stripe for recurring subscriptions, and built the admin dashboards that hold up the business metrics.',
    ],
    stats: [
      { value: '4+', label: 'years in production' },
      { value: '2', label: 'countries, working remote' },
      { value: '100%', label: 'end-to-end, design to deploy' },
    ],
    portraitAlt: 'Portrait of Elmer Jacobo Otiniano',
  },

  contact: {
    index: '05',
    title: "Let's talk",
    lead: 'Tell me what you want to build. I reply within 24 hours.',
    channelsTitle: 'Direct channels',
    whatsapp: 'WhatsApp',
    booking: 'Book 30 min',
    email: 'contacto@elmerjacobo.dev',
    whatsappPrefill:
      'Hi Elmer, I saw your portfolio and I would like to talk about a project.',
    form: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      scope: 'Project type',
      scopeOptions: [
        'End-to-end SaaS product',
        'Website or conversion landing',
        'API / Laravel backend',
        'Mobile app',
        'Something else',
      ],
      message: 'Tell me about the project',
      submit: 'Send',
      sending: 'Sending',
      successTitle: 'Message sent',
      successBody: 'I will get back to you within 24 hours. Thanks for writing.',
      errorGeneric: 'Something went wrong. Reach me on WhatsApp or email.',
      errors: {
        nameMin: 'Enter your name',
        emailInvalid: 'Invalid email',
        messageMin: 'Tell me a bit more (20 characters minimum)',
        tooFast: 'Too fast. Please try again.',
        rateLimit: 'Too many submissions. Try again later.',
      },
    },
  },

  footer: {
    marquee: 'Available for work',
    localTime: 'Local time',
    social: 'Social',
    rights: 'All rights reserved',
    builtWith: 'Next.js · GSAP · Tailwind',
  },

  notFound: {
    title: 'Page not found',
    body: 'The route you are looking for does not exist or was renamed.',
    cta: 'Back home',
  },
} as const satisfies Dictionary

export default en
