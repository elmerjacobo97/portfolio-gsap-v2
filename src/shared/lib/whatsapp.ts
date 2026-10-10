import { site } from "@/shared/lib/site";

export function whatsappUrl(prefill: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(prefill)}`;
}
