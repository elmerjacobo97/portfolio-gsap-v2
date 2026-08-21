import { track } from '@vercel/analytics'

export const ANALYTICS_EVENTS = [
  'linkedin_click',
  'project_view',
  'post_view',
  'contact_submit',
  'contact_cta_click',
] as const

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number]
export type AnalyticsData = Record<
  string,
  string | number | boolean | null | undefined
>

const analyticsEvents = new Set<AnalyticsEvent>(ANALYTICS_EVENTS)

export function isAnalyticsEvent(
  value: string | undefined,
): value is AnalyticsEvent {
  return value !== undefined && analyticsEvents.has(value as AnalyticsEvent)
}

/** Analytics must never block navigation or form feedback. */
export function trackEvent(name: AnalyticsEvent, data?: AnalyticsData) {
  if (typeof window === 'undefined') return

  try {
    track(name, data)
  } catch {
    // Analytics is optional infrastructure, not application state.
  }
}
