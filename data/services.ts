import type { Localized } from '@/i18n/t'

export type Service = {
  code: string
  title: Localized
  pitch: Localized
  deliverables: Localized<readonly string[]>
}

export const services: readonly Service[] = [
  {
    code: '01',
    title: {
      es: 'Producto SaaS end-to-end',
      en: 'End-to-end SaaS product',
    },
    pitch: {
      es: 'De la idea al primer cobro. Yo me encargo del frontend, del backend, de los pagos y del despliegue.',
      en: 'From idea to first payment. I handle the frontend, the backend, the payments and the deployment.',
    },
    deliverables: {
      es: [
        'Autenticación, roles y permisos',
        'Suscripciones recurrentes con Stripe',
        'Panel administrativo con métricas de negocio',
        'API REST documentada',
        'Despliegue, dominio y monitoreo',
      ],
      en: [
        'Authentication, roles and permissions',
        'Recurring subscriptions with Stripe',
        'Admin dashboard with business metrics',
        'Documented REST API',
        'Deployment, domain and monitoring',
      ],
    },
  },
  {
    code: '02',
    title: {
      es: 'Web y landing de conversión',
      en: 'Website and conversion landing',
    },
    pitch: {
      es: 'Sitios rápidos que cargan en menos de un segundo y están hechos para que la gente haga clic donde importa.',
      en: 'Fast sites that load in under a second and are built so people click where it matters.',
    },
    deliverables: {
      es: [
        'Diseño y desarrollo en Next.js',
        'SEO técnico y datos estructurados',
        'Analítica y eventos de conversión (GA4)',
        'Animación e interacción a medida',
        'Core Web Vitals en verde',
      ],
      en: [
        'Design and development in Next.js',
        'Technical SEO and structured data',
        'Analytics and conversion events (GA4)',
        'Custom animation and interaction',
        'Core Web Vitals in the green',
      ],
    },
  },
  {
    code: '03',
    title: {
      es: 'API y backend Laravel',
      en: 'API and Laravel backend',
    },
    pitch: {
      es: 'El backend que sostiene tu producto: ordenado, probado y listo para que otro equipo lo tome sin sufrir.',
      en: 'The backend that holds your product up: tidy, tested, and ready for another team to pick up without pain.',
    },
    deliverables: {
      es: [
        'API REST con Laravel y Eloquent',
        'Modelado de base de datos y migraciones',
        'Tests de API con Pest',
        'Migración y actualización de versiones',
        'Rediseño de arquitectura en proyectos existentes',
      ],
      en: [
        'REST API with Laravel and Eloquent',
        'Database modelling and migrations',
        'API tests with Pest',
        'Version migration and upgrades',
        'Architecture redesign on existing projects',
      ],
    },
  },
  {
    code: '04',
    title: {
      es: 'Aplicación móvil',
      en: 'Mobile application',
    },
    pitch: {
      es: 'Una app publicada en las tiendas, conectada a tu backend y con el mismo cuidado que el resto del producto.',
      en: 'An app published on the stores, wired to your backend, built with the same care as the rest of the product.',
    },
    deliverables: {
      es: [
        'Desarrollo en Flutter o React Native',
        'Integración con la API del producto',
        'Publicación en Google Play y App Store',
        'Notificaciones push',
        'Builds y versionado',
      ],
      en: [
        'Development in Flutter or React Native',
        'Integration with the product API',
        'Publishing to Google Play and the App Store',
        'Push notifications',
        'Builds and versioning',
      ],
    },
  },
]
