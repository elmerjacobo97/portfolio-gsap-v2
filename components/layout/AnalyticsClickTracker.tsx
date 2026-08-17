'use client'

import { useEffect } from 'react'

import { isAnalyticsEvent, trackEvent } from '@/lib/analytics'

/** Tracks declarative data attributes from both Server and Client Components. */
export function AnalyticsClickTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return

      const trigger = target.closest<HTMLElement>('[data-analytics-event]')
      const name = trigger?.dataset.analyticsEvent
      if (!trigger || !isAnalyticsEvent(name)) return

      const source = trigger.dataset.analyticsSource
      trackEvent(name, source ? { source } : undefined)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
