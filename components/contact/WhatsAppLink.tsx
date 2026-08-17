import { MessageCircle } from 'lucide-react'

import { site } from '@/data/site'
import { ChannelRow } from './ChannelRow'

export function WhatsAppLink({
  label,
  prefill,
}: {
  label: string
  prefill: string
}) {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(prefill)}`

  return (
    <ChannelRow
      label={label}
      value={site.phone}
      href={href}
      icon={MessageCircle}
      external
      analyticsEvent="contact_cta_click"
      analyticsSource="whatsapp"
    />
  )
}
