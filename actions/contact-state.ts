/**
 * Kept OUT of `contact.ts`: a `'use server'` module may only export async
 * functions. Exporting this object from there compiles fine and fails at
 * runtime with "A 'use server' file can only export async functions".
 */
export type ContactValues = {
  name: string
  email: string
  company: string
  scope: string
  message: string
}

export type ContactState = {
  ok: boolean
  /** Per-field messages, keyed by input name. */
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
  formError?: string
  /**
   * Echoed back so the form can repopulate itself. React 19 resets an
   * uncontrolled form once its action completes, so without this a validation
   * error would wipe everything the visitor typed.
   */
  values?: ContactValues
}

export const initialContactState: ContactState = { ok: false }
