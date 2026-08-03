'use client'

import { useActionState, useEffect, useRef } from 'react'

import { submitContact } from '@/actions/contact'
import { initialContactState } from '@/actions/contact-state'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionary'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'
import { Field } from './Field'

export function ContactForm({
  dict,
  locale,
}: {
  dict: Dictionary['contact']['form']
  locale: Locale
}) {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const mountedAtRef = useRef<HTMLInputElement>(null)

  // Written straight to the DOM, not through state: a one-way write to an
  // external system needs no re-render (and setState in an effect would
  // trigger a cascading one). Stamping it client-side is the point — a script
  // POSTing directly to the action has no plausible value for it.
  //
  // Re-stamped on every `state` change because React 19 resets the form once
  // its action completes, which restores this input to its empty defaultValue.
  // Without the re-stamp the form is stuck rejecting every retry as "too fast".
  useEffect(() => {
    if (mountedAtRef.current) {
      mountedAtRef.current.value = String(Date.now())
    }
  }, [state])

  useGSAP(
    () => {
      if (!state.ok) return
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        gsap.from('.success-panel', {
          autoAlpha: 0,
          y: 24,
          duration: 0.6,
          ease: 'power3.out',
        })
        gsap.from('.success-rule', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'expo.out',
        })
      })

      // The panel swap changes page height — every ScrollTrigger below this
      // point is measuring against the old layout until this runs.
      ScrollTrigger.refresh()

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [state.ok] },
  )

  return (
    <div ref={rootRef}>
      {state.ok ? (
        <div className="success-panel">
          <span aria-hidden className="success-rule bg-accent block h-px w-full" />
          <h3 className="text-h2 u-wide mt-8">{dict.successTitle}</h3>
          <p className="text-lead text-chalk-200 mt-4 max-w-[38ch]">
            {dict.successBody}
          </p>
        </div>
      ) : (
        <form action={formAction} className="form-panel space-y-8">
          <input type="hidden" name="locale" value={locale} />
          <input ref={mountedAtRef} type="hidden" name="mountedAt" defaultValue="" />

          {/* Honeypot. Hidden from sight, from tab order and from a11y. */}
          <div aria-hidden className="sr-only">
            <label htmlFor="company_website">Website</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* defaultValue echoes the last submission back: React 19 resets an
              uncontrolled form when its action completes, so a validation
              error would otherwise wipe everything the visitor typed. */}
          <div className="grid gap-8 sm:grid-cols-2">
            <Field
              name="name"
              label={dict.name}
              required
              error={state.errors?.name}
              defaultValue={state.values?.name}
            />
            <Field
              name="email"
              label={dict.email}
              type="email"
              required
              error={state.errors?.email}
              defaultValue={state.values?.email}
            />
            <Field
              name="company"
              label={dict.company}
              defaultValue={state.values?.company}
            />
            <Field
              name="scope"
              label={dict.scope}
              options={dict.scopeOptions}
              defaultValue={state.values?.scope}
            />
          </div>

          <Field
            name="message"
            label={dict.message}
            textarea
            required
            error={state.errors?.message}
            defaultValue={state.values?.message}
          />

          {state.formError ? (
            <p role="alert" className="u-label text-alert-500">
              {state.formError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="u-meta border-accent text-accent hover:bg-accent hover:text-ink-950 border px-8 py-4 transition-colors duration-300 disabled:opacity-50"
          >
            {pending ? dict.sending : dict.submit} <span aria-hidden>↗</span>
          </button>
        </form>
      )}
    </div>
  )
}
