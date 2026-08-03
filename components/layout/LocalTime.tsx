'use client'

import { useEffect, useState } from 'react'

import { site } from '@/data/site'
import { localeTag, type Locale } from '@/i18n/config'

/**
 * Renders nothing until mounted. Server and client clocks never agree, so this
 * is read exclusively inside an effect — the documented hydration-safe shape.
 */
export function LocalTime({ locale }: { locale: Locale }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat(localeTag[locale], {
      timeZone: site.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [locale])

  return (
    <span suppressHydrationWarning className="tabular-nums">
      {time ?? '--:--:--'}
    </span>
  )
}
