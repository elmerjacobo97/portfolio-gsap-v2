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
    <ChannelRow label={label} value={site.phone} href={href} external />
  )
}
