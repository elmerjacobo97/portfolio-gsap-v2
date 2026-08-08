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

  const details = [
    ['Nombre', name],
    ['Email', email],
    ['Empresa', company || '—'],
    ['Tipo', scope || '—'],
    ['Idioma', locale],
  ]
    .map(([label, value]) => {
      const safeValue = escapeHtml(value)
      const renderedValue =
        label === 'Email'
          ? `<a href="mailto:${safeValue}" style="color:#d4ff3f;text-decoration:underline">${safeValue}</a>`
          : safeValue

      return `<tr>
        <td width="120" valign="top" style="box-sizing:border-box;padding:14px 24px 14px 0;border-bottom:1px solid #242424;color:#8a8a82;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;vertical-align:top;width:120px">${label}</td>
        <td valign="top" style="padding:14px 0;border-bottom:1px solid #242424;color:#f7f7f2;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;vertical-align:top">${renderedValue}</td>
      </tr>`
    })
    .join('')

  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
  const replyUrl = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: tu consulta para ${name}`)}`
  const text = `NUEVO CONTACTO\n\nNombre: ${name}\nEmail: ${email}\nEmpresa: ${company || '—'}\nTipo: ${scope || '—'}\nIdioma: ${locale}\n\nMENSAJE\n${message}`
  const html = `<!doctype html>
<html lang="${locale}">
  <body style="margin:0;padding:0;background:#050505;color:#f7f7f2">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">Nuevo contacto de ${escapeHtml(name)} desde el portfolio.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#050505;margin:0;padding:0;width:100%">
      <tr>
        <td style="padding:32px 16px">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#101010;border:1px solid #242424;margin:0 auto;max-width:640px;width:100%">
            <tr>
              <td style="background:#d4ff3f;padding:8px 28px;color:#050505;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase">Elmer Jacobo / Contacto</td>
            </tr>
            <tr>
              <td style="padding:32px 28px 24px">
                <p style="color:#8a8a82;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:1.5px;margin:0 0 14px;text-transform:uppercase">Nuevo mensaje / ${locale.toUpperCase()}</p>
                <h1 style="color:#f7f7f2;font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:700;letter-spacing:-0.7px;line-height:1.05;margin:0">${escapeHtml(name)} quiere conversar.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed">${details}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#161616;border-left:3px solid #d4ff3f">
                  <tr>
                    <td style="padding:20px 22px">
                      <p style="color:#8a8a82;font-family:monospace;font-size:11px;font-weight:700;letter-spacing:1.5px;margin:0 0 12px;text-transform:uppercase">Mensaje</p>
                      <p style="color:#f7f7f2;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;margin:0">${safeMessage}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 32px">
                <a href="${replyUrl}" style="background:#d4ff3f;color:#050505;display:inline-block;font-family:monospace;font-size:12px;font-weight:700;letter-spacing:1px;padding:14px 18px;text-decoration:none;text-transform:uppercase">Responder a ${escapeHtml(name)}</a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #242424;padding:18px 28px">
                <p style="color:#55554f;font-family:monospace;font-size:10px;letter-spacing:1px;line-height:1.5;margin:0;text-transform:uppercase">Enviado desde el formulario de elmerjacobo.dev</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nuevo contacto — ${name}`,
      html,
      text,
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
