'use client'

import { useRef } from 'react'

import { cn } from '@/lib/cn'
import { gsap, useGSAP } from '@/lib/gsap'
import { OK } from '@/lib/motion'

/**
 * Underline field. GSAP draws the accent underline on focus; the CSS
 * transition on the same element is the reduced-motion / pre-hydration floor,
 * so the field is never visually dead.
 */
export function Field({
  name,
  label,
  type = 'text',
  required,
  textarea,
  options,
  error,
  className,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  textarea?: boolean
  options?: readonly string[]
  error?: string
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const id = `field-${name}`
  const errorId = `${id}-error`

  // Shake + recolour when the server rejects this field.
  useGSAP(
    () => {
      if (!error) return
      const mm = gsap.matchMedia()

      mm.add(OK, () => {
        gsap.fromTo(
          rootRef.current,
          { x: -6 },
          { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' },
        )
      })

      return () => mm.revert()
    },
    { scope: rootRef, dependencies: [error] },
  )

  const control =
    'peer text-body text-text placeholder:text-chalk-600 w-full bg-transparent pt-2 pb-3 outline-none'

  return (
    <div ref={rootRef} className={cn('field group relative', className)}>
      <label htmlFor={id} className="u-label block">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={name}
          required={required}
          rows={4}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={control}
        />
      ) : options ? (
        <select
          id={id}
          name={name}
          required={required}
          className={cn(control, 'appearance-none')}
        >
          {options.map((option) => (
            <option key={option} value={option} className="bg-ink-850">
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={control}
        />
      )}

      <span
        aria-hidden
        className={cn('block h-px w-full', error ? 'bg-alert-500' : 'bg-rule')}
      />
      <span
        aria-hidden
        className={cn(
          'field-underline absolute bottom-0 left-0 block h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-(--ease-brutal) peer-focus:scale-x-100',
          error ? 'bg-alert-500' : 'bg-accent',
        )}
      />

      {error ? (
        <p id={errorId} className="u-label text-alert-500 mt-2">
          {error}
        </p>
      ) : null}
    </div>
  )
}
