import type { Dictionary } from '@/i18n/dictionary'
import { Field } from './Field'

/**
 * Phase 1 markup only — no action wired yet. Phase 5 turns this into a client
 * component driven by `useActionState` against `actions/contact.ts`, keeping
 * this exact field set plus the honeypot and time-trap inputs.
 */
export function ContactForm({ dict }: { dict: Dictionary['contact']['form'] }) {
  return (
    <form className="form-panel space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field name="name" label={dict.name} required />
        <Field name="email" label={dict.email} type="email" required />
        <Field name="company" label={dict.company} />
        <Field name="scope" label={dict.scope} options={dict.scopeOptions} />
      </div>

      <Field name="message" label={dict.message} textarea required />

      <button
        type="submit"
        className="u-meta border-accent text-accent hover:bg-accent hover:text-ink-950 border px-8 py-4 transition-colors duration-300"
      >
        {dict.submit} <span aria-hidden>↗</span>
      </button>
    </form>
  )
}
