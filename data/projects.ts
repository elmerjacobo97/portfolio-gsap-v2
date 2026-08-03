import type { Localized } from '@/i18n/t'

export type CaseBlock =
  | { kind: 'heading'; text: Localized }
  | { kind: 'para'; text: Localized }
  | { kind: 'list'; items: readonly Localized[] }

export type Project = {
  /** Not translated on purpose — the locale switcher stays a segment swap. */
  slug: string
  featured: boolean
  order: number
  year: number
  client: string
  liveUrl?: string
  repoUrl?: string
  /** Language-neutral. */
  stack: readonly string[]
  role: Localized
  title: Localized
  tagline: Localized
  summary: Localized
  metrics: readonly { value: string; label: Localized }[]
  /** Undefined renders the CSS-only <MediaPlate/> instead of an <Image/>. */
  cover?: { src: string; width: number; height: number; alt: Localized }
  gallery: readonly {
    src: string
    width: number
    height: number
    alt: Localized
  }[]
  body: readonly CaseBlock[]
}

/**
 * PLACEHOLDERS. Swapping in the real work (Tarjetly, the Flutter water app)
 * means editing this array — nothing about a project lives in JSX.
 */
export const projects: readonly Project[] = [
  {
    slug: 'plataforma-suscripciones',
    featured: true,
    order: 1,
    year: 2025,
    client: 'Proyecto demo',
    stack: ['Next.js', 'Laravel', 'PostgreSQL', 'Stripe', 'Tailwind'],
    role: { es: 'Tech lead · Full stack', en: 'Tech lead · Full stack' },
    title: {
      es: 'Plataforma de suscripciones',
      en: 'Subscription platform',
    },
    tagline: {
      es: 'SaaS multiusuario con cobros recurrentes y panel de métricas.',
      en: 'Multi-tenant SaaS with recurring billing and a metrics dashboard.',
    },
    summary: {
      es: 'Producto completo: registro, planes, cobro mensual con Stripe, panel administrativo y reportes de ingresos.',
      en: 'A complete product: sign-up, plans, monthly billing through Stripe, an admin panel and revenue reporting.',
    },
    metrics: [
      { value: '3', label: { es: 'meses a producción', en: 'months to production' } },
      { value: '99.9%', label: { es: 'uptime', en: 'uptime' } },
      { value: '<1s', label: { es: 'carga inicial', en: 'first load' } },
    ],
    gallery: [],
    body: [
      {
        kind: 'heading',
        text: { es: 'El problema', en: 'The problem' },
      },
      {
        kind: 'para',
        text: {
          es: 'El cobro era manual: alguien revisaba transferencias a mano y activaba cuentas una por una. No escalaba y se perdía dinero en renovaciones olvidadas.',
          en: 'Billing was manual: someone reviewed transfers by hand and activated accounts one at a time. It did not scale and money leaked through forgotten renewals.',
        },
      },
      {
        kind: 'heading',
        text: { es: 'Qué construí', en: 'What I built' },
      },
      {
        kind: 'list',
        items: [
          {
            es: 'Autenticación con roles y control de acceso por plan',
            en: 'Authentication with roles and per-plan access control',
          },
          {
            es: 'Integración con Stripe para suscripciones y webhooks de estado',
            en: 'Stripe integration for subscriptions and status webhooks',
          },
          {
            es: 'Panel administrativo con ingresos, churn y altas por periodo',
            en: 'Admin panel with revenue, churn and sign-ups per period',
          },
          {
            es: 'API REST en Laravel con tests de integración en Pest',
            en: 'Laravel REST API with integration tests in Pest',
          },
        ],
      },
    ],
  },
  {
    slug: 'panel-operaciones',
    featured: true,
    order: 2,
    year: 2024,
    client: 'Proyecto demo',
    stack: ['React', 'TypeScript', 'Laravel', 'MySQL'],
    role: { es: 'Full stack', en: 'Full stack' },
    title: {
      es: 'Panel de operaciones',
      en: 'Operations dashboard',
    },
    tagline: {
      es: 'Herramienta interna que reemplazó catorce hojas de cálculo.',
      en: 'An internal tool that replaced fourteen spreadsheets.',
    },
    summary: {
      es: 'Gestión de usuarios, inventario y reportes en un solo lugar, con permisos por área y exportación a Excel.',
      en: 'User management, inventory and reporting in one place, with per-area permissions and Excel export.',
    },
    metrics: [
      { value: '14', label: { es: 'hojas eliminadas', en: 'spreadsheets removed' } },
      { value: '6h', label: { es: 'ahorradas por semana', en: 'saved per week' } },
      { value: '40+', label: { es: 'usuarios internos', en: 'internal users' } },
    ],
    gallery: [],
    body: [
      {
        kind: 'heading',
        text: { es: 'El problema', en: 'The problem' },
      },
      {
        kind: 'para',
        text: {
          es: 'Cada área tenía su propia hoja de cálculo y ninguna coincidía con las demás. Los reportes mensuales se armaban a mano y siempre llegaban tarde.',
          en: 'Every area had its own spreadsheet and none of them agreed. Monthly reports were assembled by hand and always arrived late.',
        },
      },
      {
        kind: 'heading',
        text: { es: 'Qué construí', en: 'What I built' },
      },
      {
        kind: 'list',
        items: [
          {
            es: 'Modelo de datos único con migraciones versionadas',
            en: 'A single data model with versioned migrations',
          },
          {
            es: 'Permisos granulares por área y por acción',
            en: 'Granular permissions per area and per action',
          },
          {
            es: 'Reportes generados en el servidor y exportables',
            en: 'Server-generated, exportable reports',
          },
        ],
      },
    ],
  },
  {
    slug: 'app-movil-campo',
    featured: true,
    order: 3,
    year: 2024,
    client: 'Proyecto demo',
    stack: ['Flutter', 'Laravel', 'PostgreSQL'],
    role: { es: 'Desarrollo móvil', en: 'Mobile development' },
    title: {
      es: 'App móvil de campo',
      en: 'Field mobile app',
    },
    tagline: {
      es: 'Cálculos técnicos sin señal, sincronizados al volver.',
      en: 'Technical calculations offline, synced on return.',
    },
    summary: {
      es: 'Aplicación para trabajo en zonas sin cobertura: guarda todo en el dispositivo y sincroniza con el servidor cuando hay red.',
      en: 'An app for work in areas with no coverage: it stores everything on device and syncs with the server when the network returns.',
    },
    metrics: [
      { value: '100%', label: { es: 'funcional sin red', en: 'functional offline' } },
      { value: '2', label: { es: 'plataformas', en: 'platforms' } },
      { value: '1', label: { es: 'base de código', en: 'codebase' } },
    ],
    gallery: [],
    body: [
      {
        kind: 'heading',
        text: { es: 'El problema', en: 'The problem' },
      },
      {
        kind: 'para',
        text: {
          es: 'El trabajo ocurre donde no hay señal. Las mediciones se anotaban en papel y se transcribían días después, con errores.',
          en: 'The work happens where there is no signal. Measurements were written on paper and transcribed days later, with errors.',
        },
      },
      {
        kind: 'heading',
        text: { es: 'Qué construí', en: 'What I built' },
      },
      {
        kind: 'list',
        items: [
          {
            es: 'Almacenamiento local y cola de sincronización',
            en: 'Local storage and a sync queue',
          },
          {
            es: 'Motor de cálculo validado contra la hoja original',
            en: 'A calculation engine validated against the original spreadsheet',
          },
          {
            es: 'Publicación en Google Play y builds firmados',
            en: 'Google Play release and signed builds',
          },
        ],
      },
    ],
  },
]

export const featured = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order)

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)

export const projectSlugs = () => projects.map((p) => ({ slug: p.slug }))

export const nextProject = (slug: string) => {
  const list = featured()
  const i = list.findIndex((p) => p.slug === slug)
  return list[(i + 1) % list.length]
}
