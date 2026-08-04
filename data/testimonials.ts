import type { Localized } from '@/i18n/t'

export type Testimonial = {
  code: string
  quote: Localized
  name: Localized
  role: Localized
  company: Localized
}

/** Draft copy only. Replace every record with an approved, attributable quote. */
export const testimonials: readonly Testimonial[] = [
  {
    code: 'R-01',
    quote: {
      es: 'Elmer no se quedó en el ticket. Entendió el negocio, cuestionó lo necesario y convirtió una idea ambigua en una solución que el equipo podía mantener.',
      en: 'Elmer did not stop at the ticket. He understood the business, challenged what mattered, and turned an ambiguous idea into a solution the team could maintain.',
    },
    name: { es: 'Nombre por confirmar', en: 'Name to be confirmed' },
    role: { es: 'Liderazgo técnico', en: 'Technical leadership' },
    company: { es: 'Empresa por confirmar', en: 'Company to be confirmed' },
  },
  {
    code: 'R-02',
    quote: {
      es: 'Tomó ownership de principio a fin: arquitectura, implementación y despliegue. Siempre supimos qué estaba pasando y cuál era la siguiente decisión.',
      en: 'He took ownership from end to end: architecture, implementation, and deployment. We always knew what was happening and which decision came next.',
    },
    name: { es: 'Nombre por confirmar', en: 'Name to be confirmed' },
    role: { es: 'Product manager', en: 'Product manager' },
    company: { es: 'Empresa por confirmar', en: 'Company to be confirmed' },
  },
  {
    code: 'R-03',
    quote: {
      es: 'La comunicación fue tan sólida como el código. Detectó riesgos temprano, propuso alternativas claras y entregó sin convertir cada cambio en una sorpresa.',
      en: 'The communication was as solid as the code. He surfaced risks early, proposed clear alternatives, and delivered without turning every change into a surprise.',
    },
    name: { es: 'Nombre por confirmar', en: 'Name to be confirmed' },
    role: { es: 'Fundador de producto', en: 'Product founder' },
    company: { es: 'Empresa por confirmar', en: 'Company to be confirmed' },
  },
]
