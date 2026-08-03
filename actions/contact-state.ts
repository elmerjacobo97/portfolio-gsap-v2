/**
 * Kept OUT of `contact.ts`: a `'use server'` module may only export async
 * functions. Exporting this object from there compiles fine and fails at
 * runtime with "A 'use server' file can only export async functions".
 */
export type ContactState = {
  ok: boolean
  /** Per-field messages, keyed by input name. */
  errors?: Partial<Record<'name' | 'email' | 'message', string>>
  formError?: string
}

export const initialContactState: ContactState = { ok: false }
