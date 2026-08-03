'use server'

import { headers } from 'next/headers'
import { Resend } from 'resend'
import { z } from 'zod'

import type { ContactState, ContactValues } from './contact-state'
import { defaultLocale, hasLocale, type Locale } from '@/i18n/config'
import { getDictionary } from '@/i18n/get-dictionary'
import { rateLimit } from '@/lib/rate-limit'

const MIN_ELAPSED_MS = 3_000
const MAX_ELAPSED_MS = 2 * 60 * 60 * 1000

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const rawLocale = String(formData.get('locale') ?? '')
  const locale: Locale = hasLocale(rawLocale) ? rawLocale : defaultLocale
  const dict = await getDictionary(locale)
  const messages = dict.contact.form.errors

  const values: ContactValues = {
    name: String(formData.get('name') ?? ''),
    email: String(formData.get('email') ?? ''),
    company: String(formData.get('company') ?? ''),
    scope: String(formData.get('scope') ?? ''),
    message: String(formData.get('message') ?? ''),
  }

  // 1. Honeypot. A filled hidden field means a bot. Return success and send
  //    nothing — a visible failure just teaches the bot to retry.
  if (String(formData.get('company_website') ?? '').length > 0) {
    return { ok: true }
  }

  // 2. Time trap. `mountedAt` is stamped by an effect when the form mounts,
  //    so a script that POSTs directly has no plausible value for it.
  const mountedAt = Number(formData.get('mountedAt') ?? 0)
  const elapsed = Date.now() - mountedAt
  if (!mountedAt || elapsed < MIN_ELAPSED_MS || elapsed > MAX_ELAPSED_MS) {
    return { ok: false, formError: messages.tooFast, values }
  }

  // 3. Per-IP rate limit. `headers()` is safe here: a Server Action is a
  //    separate POST endpoint, not a render path, so it cannot opt the
  //    statically generated page into dynamic rendering.
  const forwardedFor = (await headers()).get('x-forwarded-for')
  const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(ip).ok) {
    return { ok: false, formError: messages.rateLimit, values }
  }

  const schema = z.object({
    name: z.string().trim().min(2, messages.nameMin),
    email: z.email(messages.emailInvalid),
    company: z.string().trim().max(200).optional(),
    scope: z.string().trim().max(200).optional(),
    message: z.string().trim().min(20, messages.messageMin).max(5000),
  })

  const parsed = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') ?? undefined,
    scope: formData.get('scope') ?? undefined,
    message: formData.get('message'),
  })

  if (!parsed.success) {
    const errors: ContactState['errors'] = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if (field === 'name' || field === 'email' || field === 'message') {
        errors[field] ??= issue.message
      }
    }
    return { ok: false, errors, values }
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
  const from = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !to || !from) {
    console.error('[contact] Missing RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL')
    return { ok: false, formError: dict.contact.form.errorGeneric, values }
  }

  const { name, email, company, scope, message } = parsed.data

  const rows = [
    ['Nombre', name],
    ['Email', email],
    ['Empresa', company || '—'],
    ['Tipo', scope || '—'],
    ['Idioma', locale],
  ]
    .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
    .join('')

  try {
    // Plain HTML string, no @react-email/render — Resend declares it as an
    // optional peer, so we skip the dependency entirely.
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto — ${name}`,
      html: `<table>${rows}</table><hr><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return { ok: false, formError: dict.contact.form.errorGeneric, values }
    }
  } catch (err) {
    console.error('[contact] Send failed:', err)
    return { ok: false, formError: dict.contact.form.errorGeneric, values }
  }

  // Deliberately NO revalidatePath/updateTag — the page is statically
  // generated and must stay that way.
  return { ok: true }
}
