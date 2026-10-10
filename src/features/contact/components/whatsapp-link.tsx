import { MessageCircle } from 'lucide-react'

import { site } from '@/shared/lib/site'
import { whatsappUrl } from '@/shared/lib/whatsapp'
import { ChannelRow } from './channel-row'

export function WhatsAppLink({
  label,
  prefill,
}: {
  label: string
  prefill: string
}) {
  return (
    <ChannelRow
      label={label}
      value={site.phone}
      href={whatsappUrl(prefill)}
      icon={MessageCircle}
      external
      analyticsEvent="contact_cta_click"
      analyticsSource="whatsapp"
    />
  )
}
