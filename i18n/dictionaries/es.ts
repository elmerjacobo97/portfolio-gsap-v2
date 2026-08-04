const es = {
  meta: {
    title: 'Elmer Jacobo — Full Stack Developer',
    description:
      'Diseño y construyo productos web que cobran dinero: SaaS end-to-end con autenticación, suscripciones Stripe, paneles admin y despliegue. React, Next.js y Laravel.',
    ogAlt: 'Elmer Jacobo — Full Stack Developer',
  },

  nav: {
    services: 'Servicios',
    work: 'Trabajo',
    process: 'Proceso',
    about: 'Sobre mí',
    contact: 'Contacto',
    menu: 'Menú',
    close: 'Cerrar',
    skipToContent: 'Saltar al contenido',
    switchTo: 'Ver en inglés',
  },

  hero: {
    lineOne: 'Elmer',
    lineTwo: 'Jacobo',
    role: 'Full Stack Developer',
    statement: 'Construyo productos web que cobran dinero.',
    meta: ['Trujillo, PE', '+4 años', 'React — Next — Laravel'],
    available: 'Disponible para proyectos',
    scroll: 'Scroll',
    artifactLabel: 'Ruta a producción',
    artifactStatus: 'Sistema entregado, medido y mantenible',
    artifactSteps: ['Producto', 'Arquitectura', 'Código', 'Deploy'],
  },

  ticker: {
    label: 'Stack',
  },

  services: {
    index: '01',
    title: 'Servicios',
    lead: 'Cuatro formas de trabajar juntos. Sin plantillas, sin agencia intermediaria: hablas directo con quien escribe el código.',
    expand: 'Ver entregables',
    collapse: 'Cerrar',
    deliverables: 'Incluye',
  },

  work: {
    index: '02',
    title: 'Trabajo seleccionado',
    lead: 'Productos en producción, no experimentos de fin de semana.',
    viewCase: 'Ver caso',
    allProjects: 'Todos los proyectos',
    role: 'Rol',
    year: 'Año',
    client: 'Cliente',
    stack: 'Stack',
    liveSite: 'Sitio en vivo',
    repository: 'Repositorio',
    nextCase: 'Siguiente caso',
    backHome: 'Volver al inicio',
  },

  proof: {
    index: '03',
    title: 'Evidencia de producción',
    lead: 'Sin logos prestados ni cifras decorativas. Responsabilidades que ya sostienen producto real.',
    facts: [
      {
        label: 'Liderazgo técnico',
        detail: 'Revisión de PR, decisiones de arquitectura y coordinación directa con liderazgo técnico.',
      },
      {
        label: 'Laravel 9 → 12',
        detail: 'Migración de backend y rediseño de arquitectura sin detener la evolución del producto.',
      },
      {
        label: 'Stripe recurrente',
        detail: 'Suscripciones, estados de pago y paneles administrativos conectados al negocio.',
      },
      {
        label: '4+ años',
        detail: 'Aplicaciones web y móviles en producción, con usuarios y dinero real de por medio.',
      },
    ],
  },

  process: {
    index: '04',
    title: 'Cómo trabajo',
    lead: 'Un proceso corto y honesto. Sabes en qué punto estamos en todo momento.',
  },

  about: {
    index: '05',
    title: 'Sobre mí',
    bio: [
      'Llevo más de cuatro años construyendo aplicaciones web y móviles que viven en producción, con usuarios reales y dinero real de por medio.',
      'Hoy lidero técnicamente el desarrollo de una plataforma SaaS de tarjetas digitales: reviso PRs, tomo las decisiones de arquitectura y trabajo de forma autónoma coordinando directo con el liderazgo técnico.',
      'Migré ese backend de Laravel 9 a 12, rediseñé su arquitectura, integré Stripe para suscripciones recurrentes y construí los paneles administrativos que sostienen las métricas del negocio.',
    ],
    stats: [
      { value: '4+', label: 'años en producción' },
      { value: '2', label: 'países, trabajo remoto' },
      { value: '100%', label: 'end-to-end, de diseño a deploy' },
    ],
    portraitAlt: 'Retrato de Elmer Jacobo Otiniano',
  },

  contact: {
    index: '06',
    title: 'Hablemos',
    lead: 'Cuéntame qué quieres construir. Respondo en menos de 24 horas.',
    channelsTitle: 'Canales directos',
    whatsapp: 'WhatsApp',
    booking: 'Agendar 30 min',
    email: 'contacto@elmerjacobo.dev',
    whatsappPrefill:
      'Hola Elmer, vi tu portafolio y quiero conversar sobre un proyecto.',
    form: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      scope: 'Tipo de proyecto',
      scopeOptions: [
        'Producto SaaS end-to-end',
        'Web o landing de conversión',
        'API / backend Laravel',
        'App móvil',
        'Otro',
      ],
      message: 'Cuéntame del proyecto',
      submit: 'Enviar',
      sending: 'Enviando',
      sendingHint: 'Envío seguro en curso',
      successTitle: 'Mensaje enviado',
      successBody: 'Te respondo en menos de 24 horas. Gracias por escribir.',
      responseLabel: 'Siguiente paso',
      responseValue: 'Recibirás una respuesta personal, no una secuencia automática.',
      errorGeneric: 'Algo falló al enviar. Escríbeme por WhatsApp o email.',
      errors: {
        nameMin: 'Escribe tu nombre',
        emailInvalid: 'Email inválido',
        messageMin: 'Cuéntame un poco más (mínimo 20 caracteres)',
        tooFast: 'Muy rápido. Intenta de nuevo.',
        rateLimit: 'Demasiados envíos. Intenta más tarde.',
      },
    },
  },

  footer: {
    marquee: 'Disponible para proyectos',
    localTime: 'Hora local',
    social: 'Redes',
    rights: 'Todos los derechos reservados',
    builtWith: 'Next.js · GSAP · Tailwind',
  },

  notFound: {
    title: 'Página no encontrada',
    body: 'La ruta que buscas no existe o cambió de nombre.',
    cta: 'Volver al inicio',
  },
} as const

export default es
