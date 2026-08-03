import type { Localized } from '@/i18n/t'

export type ProcessStep = {
  code: string
  title: Localized
  body: Localized
}

export const processSteps: readonly ProcessStep[] = [
  {
    code: '01',
    title: { es: 'Entender el negocio', en: 'Understand the business' },
    body: {
      es: 'Una llamada de 30 minutos para saber qué vendes, a quién y qué te está frenando. Salgo de ahí con el alcance escrito y un precio cerrado, no con una estimación vaga.',
      en: 'A 30-minute call to learn what you sell, to whom, and what is holding you back. I leave with the scope written down and a closed price, not a vague estimate.',
    },
  },
  {
    code: '02',
    title: { es: 'Decidir la arquitectura', en: 'Decide the architecture' },
    body: {
      es: 'Elijo el stack según lo que el producto tiene que aguantar, no según lo que está de moda. Te explico cada decisión en un lenguaje que puedas repetirle a tu socio.',
      en: 'I pick the stack based on what the product has to withstand, not on what is trending. I explain every decision in language you can repeat to your business partner.',
    },
  },
  {
    code: '03',
    title: { es: 'Construir a la vista', en: 'Build in the open' },
    body: {
      es: 'Entregas cada semana en un enlace que puedes abrir. Nada de desaparecer dos meses y reaparecer con una sorpresa. Si algo cambia, lo hablamos antes de escribirlo.',
      en: 'Weekly deliveries on a link you can open. No disappearing for two months and coming back with a surprise. If something changes, we discuss it before it gets written.',
    },
  },
  {
    code: '04',
    title: { es: 'Entregar y sostener', en: 'Ship and support' },
    body: {
      es: 'Despliegue, dominio, monitoreo y el código documentado en tu repositorio. Queda tuyo. Si quieres que siga, sigo; si quieres que lo tome tu equipo, puede.',
      en: 'Deployment, domain, monitoring, and documented code in your repository. It is yours. If you want me to stay, I stay; if you want your team to take over, they can.',
    },
  },
]
